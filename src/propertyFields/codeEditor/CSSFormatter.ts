/**
 * Helper class to format the CSS code.
 * Based on code initially developed by: http://jsbeautifier.org/
 * 
 * Usage:
        css_beautify(source_text);
        css_beautify(source_text, options);

    The options are (default in brackets):
        indent_size (4)                   - indentation size,
        indent_char (space)               - character to indent with,
        selector_separator_newline (true) - separate selectors with newline or
                                            not (e.g. "a,\nbr" or "a, br")
        end_with_newline (false)          - end with a newline

    e.g:
    css_beautify(css_source_text, {
      'indent_size': 1,
      'indent_char': '\t',
      'selector_separator': ' ',
      'end_with_newline': false,
    });
 */

type CSSBeautifyOptions = {
  indent_size?: number;
  indent_char?: string;
  selector_separator?: string;
  end_with_newline?: boolean;
  selector_separator_newline?: boolean;
}

export class CSSFormatter {
  private ch: string;
  private pos: number = -1;
  private source_text: string;
  private whiteRe: RegExp = /^\s+$/; // tokenizer

  // printer
  private indentSize: number;
  private indentString: string;
  private singleIndent: string;
  private indentLevel = 0;
  private nestedLevel = 0;

  private output: string[] = [];
  private print: string[] = [];

  // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
  private cssBeautifyNestedAtRule = {
    "@page": true,
    "@font-face": true,
    "@keyframes": true,
    // also in cssBeautifyConditionalGroupRule below
    "@media": true,
    "@supports": true,
    "@document": true
  };

  private cssBeautifyConditionalGroupRule = {
    "@media": true,
    "@supports": true,
    "@document": true
  };

  private next(): string {
    this.ch = this.source_text.charAt(++this.pos);
    return this.ch;
  }

  private peek(): string {
    return this.source_text.charAt(this.pos + 1);
  }

  private eatString(endChar: string): string {
    const start: number = this.pos;

    while (this.next()) {
      if (this.ch === "\\") {
        this.next();
        this.next();
      }
      else if (this.ch === endChar) {
        break;
      }
      else if (this.ch === "\n") {
        break;
      }
    }

    return this.source_text.substring(start, this.pos + 1);
  }

  private eatWhitespace(): boolean {
    const start = this.pos;

    while (this.whiteRe.test(this.peek())) {
      this.pos++;
    }

    return this.pos !== start;
  }

  private skipWhitespace(): boolean {
    const start = this.pos;

    do {
      // no-op;
    } while (this.whiteRe.test(this.next()));

    return this.pos !== start + 1;
  }

  private eatComment(singleLine): string {
    const start = this.pos;
    this.next();

    while (this.next()) {
      if (this.ch === "*" && this.peek() === "/") {
        this.pos++;
        break;
      }
      else if (singleLine && this.ch === "\n") {
        break;
      }
    }

    return this.source_text.substring(start, this.pos + 1);
  }

  private lookBack(str): boolean {
    return this.source_text.substring(this.pos - str.length, this.pos).toLowerCase() === str;
  }

  private isCommentOnLine(): boolean {
    const endOfLine = this.source_text.indexOf('\n', this.pos);
    if (endOfLine === -1) {
      return false;
    }

    const restOfLine = this.source_text.substring(this.pos, endOfLine);
    return restOfLine.indexOf('//') !== -1;
  }

  private indent(): void {
    this.indentLevel++;
    this.indentString += this.singleIndent;
  }

  private outdent(): void {
    this.indentLevel--;
    this.indentString = this.indentString.slice(0, -this.indentSize);
  }

  private lastCharWhitespace(): boolean {
    return this.whiteRe.test(this.output[this.output.length - 1]);
  }

  private newLine(keepWhitespace): void {
    if (!keepWhitespace) {
      while (this.lastCharWhitespace()) {
        this.output.pop();
      }
    }

    if (this.output.length) {
      this.output.push('\n');
    }

    if (this.indentString) {
      this.output.push(this.indentString);
    }
  }

  private singleSpace(): void {
    if (this.output.length && !this.lastCharWhitespace()) {
      this.output.push(' ');
    }
  }

  public css_beautify(sourceText: string, options: CSSBeautifyOptions): string {
    options = options || {};
    this.source_text = sourceText;

    let indentSize: number = options.indent_size || 4;
    const indentCharacter: string = options.indent_char || ' ';
    const selectorSeparatorNewline: boolean = (options.selector_separator_newline === undefined) ? true : options.selector_separator_newline;
    const endWithNewline: boolean = (options.end_with_newline === undefined) ? false : options.end_with_newline;

    // compatibility
    if (typeof indentSize === "string") {
      indentSize = parseInt(indentSize, 10);
    }

    this.indentString = sourceText.match(/^[\r\n]*[\t ]*/)[0];
    this.singleIndent = new Array(indentSize + 1).join(indentCharacter);

    this.print["{"] = (chOpenBrace: string): void => {
      this.singleSpace();
      this.output.push(chOpenBrace);
      this.newLine(false);
    };

    this.print["}"] = (chCloseBrace: string): void => {
      this.newLine(false);
      this.output.push(chCloseBrace);
      this.newLine(false);
    };

    if (this.indentString) {
      this.output.push(this.indentString);
    }

    let insideRule = false;
    let enteringConditionalGroup = false;

    while (true) { // eslint-disable-line no-constant-condition
      const isAfterSpace = this.skipWhitespace();

      if (!this.ch) {
        break;
      }
      else if (this.ch === '/' && this.peek() === '*') {
        /* css comment */
        this.newLine(false);
        this.output.push(this.eatComment(true), "\n", this.indentString);
        const header = this.lookBack("");

        if (header) {
          this.newLine(false);
        }
      }
      else if (this.ch === '/' && this.peek() === '/') {
        // single line comment
        this.output.push(this.eatComment(true), this.indentString);
      }
      else if (this.ch === '@') {
        // strip trailing space, if present, for hash property checks
        const atRule = this.eatString(" ").replace(/ $/, '');

        // pass along the space we found as a separate item
        this.output.push(atRule, this.ch);

        // might be a nesting at-rule
        if (atRule in this.cssBeautifyNestedAtRule) {
          this.nestedLevel += 1;
          if (atRule in this.cssBeautifyConditionalGroupRule) {
            enteringConditionalGroup = true;
          }
        }
      }
      else if (this.ch === '{') {
        this.eatWhitespace();

        if (this.peek() === '}') {
          this.next();
          this.output.push(" {}");
        }
        else {
          this.indent();
          this.print["{"](this.ch);

          // when entering conditional groups, only rulesets are allowed
          if (enteringConditionalGroup) {
            enteringConditionalGroup = false;
            insideRule = (this.indentLevel > this.nestedLevel);
          }
          else {
            // otherwise, declarations are also allowed
            insideRule = (this.indentLevel >= this.nestedLevel);
          }
        }
      }
      else if (this.ch === '}') {
        this.outdent();
        this.print["}"](this.ch);
        insideRule = false;

        if (this.nestedLevel) {
          this.nestedLevel--;
        }
      }
      else if (this.ch === ":") {
        this.eatWhitespace();

        if (insideRule || enteringConditionalGroup) {
          // 'property: value' delimiter
          // which could be in a conditional group query
          this.output.push(this.ch, " ");
        }
        else {
          if (this.peek() === ":") {
            // pseudo-element
            this.next();
            this.output.push("::");
          }
          else {
            // pseudo-class
            this.output.push(this.ch);
          }
        }
      }
      else if (this.ch === '"' || this.ch === '\'') {
        this.output.push(this.eatString(this.ch));
      }
      else if (this.ch === ';') {
        if (this.isCommentOnLine()) {
          const beforeComment = this.eatString('/');
          const comment = this.eatComment(true);
          this.output.push(beforeComment, comment.substring(1, comment.length - 1), '\n', this.indentString);
        }
        else {
          this.output.push(this.ch, '\n', this.indentString);
        }
      }
      else if (this.ch === '(') {
        // may be a url
        if (this.lookBack("url")) {
          this.output.push(this.ch);
          this.eatWhitespace();

          this.ch = this.next();

          if (this.ch) {
            if (this.ch !== ')' && this.ch !== '"' && this.ch !== '\'') {
              this.output.push(this.eatString(')'));
            }
            else {
              this.pos--;
            }
          }
        }
        else {
          if (isAfterSpace) {
            this.singleSpace();
          }

          this.output.push(this.ch);
          this.eatWhitespace();
        }
      }
      else if (this.ch === ')') {
        this.output.push(this.ch);
      }
      else if (this.ch === ',') {
        this.eatWhitespace();
        this.output.push(this.ch);

        if (!insideRule && selectorSeparatorNewline) {
          this.newLine(false);
        }
        else {
          this.singleSpace();
        }
      }
      else if (this.ch === ']') {
        this.output.push(this.ch);
      }
      else if (this.ch === '[' || this.ch === '=') {
        // no whitespace before or after
        this.eatWhitespace();
        this.output.push(this.ch);
      }
      else {
        if (isAfterSpace) {
          this.singleSpace();
        }

        this.output.push(this.ch);
      }
    }

    let sweetCode = this.output.join('').replace(/[\n ]+$/, '');

    // establish end_with_newline
    const should = endWithNewline;
    const actually = /\n$/.test(sweetCode);

    if (should && !actually) {
      sweetCode += "\n";
    }
    else if (!should && actually) {
      sweetCode = sweetCode.slice(0, -1);
    }

    return sweetCode;
  }
}