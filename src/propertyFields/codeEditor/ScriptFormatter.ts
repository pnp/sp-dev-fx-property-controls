/**
 * Helper class to format the JavaScript code.
 * Based on code initially developed by: http://jsbeautifier.org/
 * 
 * Usage:
    js_beautify(js_source_text);
    js_beautify(js_source_text, options);

  The options are:
    indent_size (default 4)          - indentation size,
    indent_char (default space)      - character to indent with,
    preserve_newlines (default true) - whether existing line breaks should be preserved,
    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk,

    jslint_happy (default false) - if true, then jslint-stricter mode is enforced.

            jslint_happy   !jslint_happy
            ---------------------------------
             function ()      function()

    brace_style (default "collapse") - "collapse" | "expand" | "end-expand"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line.

    space_before_conditional (default true) - should the space before conditional statement be added, "if(true)" vs "if (true)",

    unescape_strings (default false) - should printable characters in strings encoded in \xNN notation be unescaped, "example" vs "\x65\x78\x61\x6d\x70\x6c\x65"

    wrap_line_length (default unlimited) - lines should wrap at next opportunity after this number of characters.
          NOTE: This is not a hard limit. Lines will continue until a point where a newline would
                be preserved if it were present.

    e.g

    js_beautify(js_source_text, {
      'indent_size': 1,
      'indent_char': '\t'
    });
 */
export class ScriptFormatter {
    private nonASCIIwhitespace: any = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
    private nonASCIIidentifierStartChars: any = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
    private nonASCIIidentifierChars: any = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
    private nonASCIIidentifierStart: RegExp = new RegExp("[" + this.nonASCIIidentifierStartChars + "]");
    private nonASCIIidentifier: RegExp = new RegExp("[" + this.nonASCIIidentifierStartChars + this.nonASCIIidentifierChars + "]");

    private input: any;
    private output_lines: any;
    private token_text: any;
    private token_type: any;
    private last_type: any;
    private last_last_text: any;
    private indent_string: any;
    private flags: any;
    private previous_flags: any;
    private flag_store: any;
    private whitespace: any;
    private wordchar: any;
    private punct: any;
    private parser_pos: any;
    private line_starters: any;
    private reserved_words: any;
    private digits: any;
    private prefix: any;
    private input_wanted_newline: any;
    private output_wrapped: any;
    private output_space_before_token: any;
    private input_length: any;
    private n_newlines: any;
    private whitespace_before_token: any;
    private opt: any;
    private preindent_string: string = '';

    private MODE: any = {
        BlockStatement: 'BlockStatement', // 'BLOCK'
        Statement: 'Statement', // 'STATEMENT'
        ObjectLiteral: 'ObjectLiteral', // 'OBJECT',
        ArrayLiteral: 'ArrayLiteral', //'[EXPRESSION]',
        ForInitializer: 'ForInitializer', //'(FOR-EXPRESSION)',
        Conditional: 'Conditional', //'(COND-EXPRESSION)',
        Expression: 'Expression' //'(EXPRESSION)'
    };

    private handlers: any = {
        'TK_START_EXPR': this.handle_start_expr,
        'TK_END_EXPR': this.handle_end_expr,
        'TK_START_BLOCK': this.handle_start_block,
        'TK_END_BLOCK': this.handle_end_block,
        'TK_WORD': this.handle_word,
        'TK_RESERVED': this.handle_word,
        'TK_SEMICOLON': this.handle_semicolon,
        'TK_STRING': this.handle_string,
        'TK_EQUALS': this.handle_equals,
        'TK_OPERATOR': this.handle_operator,
        'TK_COMMA': this.handle_comma,
        'TK_BLOCK_COMMENT': this.handle_block_comment,
        'TK_INLINE_COMMENT': this.handle_inline_comment,
        'TK_COMMENT': this.handle_comment,
        'TK_DOT': this.handle_dot,
        'TK_UNKNOWN': this.handle_unknown
    };

    // Whether a single character denotes a newline.
    private newline: any = /[\n\r\u2028\u2029]/;

    // Matches a whole line break (where CRLF is considered a single line break). Used to count lines.
    private lineBreak: any = /\r\n|[\n\r\u2028\u2029]/g;

    // Test whether a given character code starts an identifier.
    private isIdentifierStart = (code: any): boolean => {
        if (code < 65) return code === 36;
        if (code < 91) return true;
        if (code < 97) return code === 95;
        if (code < 123) return true;

        return code >= 0xaa && this.nonASCIIidentifierStart.test(String.fromCharCode(code));
    }

    // Test whether a given character is part of an identifier.
    private isIdentifierChar = (code: any): boolean => {
        if (code < 48) return code === 36;
        if (code < 58) return true;
        if (code < 65) return false;
        if (code < 91) return true;
        if (code < 97) return code === 95;
        if (code < 123) return true;

        return code >= 0xaa && this.nonASCIIidentifier.test(String.fromCharCode(code));
    }

    private create_flags(flags_base: any, mode: any) {
        let next_indent_level: number = 0;
        if (flags_base) {
            next_indent_level = flags_base.indentation_level;
            if (!this.just_added_newline() &&
                flags_base.line_indent_level > next_indent_level) {
                next_indent_level = flags_base.line_indent_level;
            }
        }

        let next_flags: any = {
            mode: mode,
            parent: flags_base,
            last_text: flags_base ? flags_base.last_text : '', // last token text
            last_word: flags_base ? flags_base.last_word : '', // last 'TK_WORD' passed
            declaration_statement: false,
            declaration_assignment: false,
            in_html_comment: false,
            multiline_frame: false,
            if_block: false,
            else_block: false,
            do_block: false,
            do_while: false,
            in_case_statement: false, // switch(..){ INSIDE HERE }
            in_case: false, // we're on the exact line with "case 0:"
            case_body: false, // the indented case-action block
            indentation_level: next_indent_level,
            line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
            start_line_index: this.output_lines.length,
            had_comment: false,
            ternary_depth: 0
        };

        return next_flags;
    }

    // Using object instead of string to allow for later expansion of info about each line
    private create_output_line(): any {
        return {
            text: []
        };
    }

    private trim_output(eat_newlines): void {
        eat_newlines = (eat_newlines === undefined) ? false : eat_newlines;

        if (this.output_lines.length) {
            this.trim_output_line(this.output_lines[this.output_lines.length - 1]);

            while (eat_newlines && this.output_lines.length > 1 &&
                this.output_lines[this.output_lines.length - 1].text.length === 0) {
                this.output_lines.pop();
                this.trim_output_line(this.output_lines[this.output_lines.length - 1]);
            }
        }
    }

    private trim_output_line(line): void {
        while (line.text.length &&
            (line.text[line.text.length - 1] === ' ' ||
                line.text[line.text.length - 1] === this.indent_string ||
                line.text[line.text.length - 1] === this.preindent_string)) {
            line.text.pop();
        }
    }

    private trim(s): string {
        return s.replace(/^\s+|\s+$/g, '');
    }

    // We could use just string.split, but IE doesn't like returning empty strings
    private split_newlines(s): any {
        s = s.replace(/\x0d/g, '');
        let out: any = [];
        let idx: any = s.indexOf("\n");

        while (idx !== -1) {
            out.push(s.substring(0, idx));
            s = s.substring(idx + 1);
            idx = s.indexOf("\n");
        }

        if (s.length) {
            out.push(s);
        }

        return out;
    }

    private just_added_newline(): boolean {
        let line: any = this.output_lines[this.output_lines.length - 1];
        return line.text.length === 0;
    }

    private just_added_blankline(): boolean {
        if (this.just_added_newline()) {
            if (this.output_lines.length === 1) {
                return true; // start of the file and newline = blank
            }

            let line: any = this.output_lines[this.output_lines.length - 2];
            return line.text.length === 0;
        }
        return false;
    }

    private allow_wrap_or_preserved_newline(force_linewrap: any): void {
        force_linewrap = (force_linewrap === undefined) ? false : force_linewrap;

        if (this.opt.wrap_line_length && !force_linewrap) {
            let line: any = this.output_lines[this.output_lines.length - 1];
            let proposed_line_length: number = 0;

            // never wrap the first token of a line.
            if (line.text.length > 0) {
                proposed_line_length = line.text.join('').length + this.token_text.length + (this.output_space_before_token ? 1 : 0);
                if (proposed_line_length >= this.opt.wrap_line_length) {
                    force_linewrap = true;
                }
            }
        }

        if (((this.opt.preserve_newlines && this.input_wanted_newline) || force_linewrap) && !this.just_added_newline()) {
            this.print_newline(false, true);

            // Expressions and array literals already indent their contents.
            if (!(this.is_array(this.flags.mode) || this.is_expression(this.flags.mode) || this.flags.mode === this.MODE.Statement)) {
                this.output_wrapped = true;
            }
        }
    }

    private print_newline(force_newline: boolean, preserve_statement_flags: boolean): any {
        this.output_wrapped = false;
        this.output_space_before_token = false;

        if (!preserve_statement_flags) {
            if (this.flags.last_text !== ';' && this.flags.last_text !== ',' && this.flags.last_text !== '=' && this.last_type !== 'TK_OPERATOR') {
                while (this.flags.mode === this.MODE.Statement && !this.flags.if_block && !this.flags.do_block) {
                    this.restore_mode();
                }
            }
        }

        if (this.output_lines.length === 1 && this.just_added_newline()) {
            return; // no newline on start of file
        }

        if (force_newline || !this.just_added_newline()) {
            this.flags.multiline_frame = true;
            this.output_lines.push(this.create_output_line());
        }
    }

    private print_token_line_indentation(): void {
        if (this.just_added_newline()) {
            let line: any = this.output_lines[this.output_lines.length - 1];

            if (this.opt.keep_array_indentation && this.is_array(this.flags.mode) && this.input_wanted_newline) {
                // prevent removing of this whitespace as redundant
                line.text.push('');
                for (let i: number = 0; i < this.whitespace_before_token.length; i += 1) {
                    line.text.push(this.whitespace_before_token[i]);
                }
            }
            else {
                if (this.preindent_string) {
                    line.text.push(this.preindent_string);
                }

                this.print_indent_string(this.flags.indentation_level + (this.output_wrapped ? 1 : 0));
            }
        }
    }

    private print_indent_string(level: any): void {
        // Never indent your first output indent at the start of the file
        if (this.output_lines.length > 1) {
            let line: any = this.output_lines[this.output_lines.length - 1];

            this.flags.line_indent_level = level;
            for (let i: number = 0; i < level; i += 1) {
                line.text.push(this.indent_string);
            }
        }
    }

    private print_token_space_before(): void {
        let line: any = this.output_lines[this.output_lines.length - 1];

        if (this.output_space_before_token && line.text.length) {
            let last_output: any = line.text[line.text.length - 1];
            if (last_output !== ' ' && last_output !== this.indent_string) {
                // prevent occassional duplicate space
                line.text.push(' ');
            }
        }
    }

    private print_token(printable_token): void {
        printable_token = printable_token || this.token_text;
        this.print_token_line_indentation();
        this.output_wrapped = false;
        this.print_token_space_before();
        this.output_space_before_token = false;
        this.output_lines[this.output_lines.length - 1].text.push(printable_token);
    }

    private indent(): void {
        this.flags.indentation_level += 1;
    }

    private deindent(): void {
        if (this.flags.indentation_level > 0 &&
            ((!this.flags.parent) || this.flags.indentation_level > this.flags.parent.indentation_level))
            this.flags.indentation_level -= 1;
    }

    private remove_redundant_indentation(frame: any): void {
        // This implementation is effective but has some issues:
        //     - less than great performance due to array splicing
        //     - can cause line wrap to happen too soon due to indent removal
        //           after wrap points are calculated
        // These issues are minor compared to ugly indentation.

        if (frame.multiline_frame) return;

        // remove one indent from each line inside this section
        let index: any = frame.start_line_index;
        let splice_index: number = 0;
        let line: any;

        while (index < this.output_lines.length) {
            line = this.output_lines[index];
            index++;

            // skip empty lines
            if (line.text.length === 0) {
                continue;
            }

            // skip the preindent string if present
            if (this.preindent_string && line.text[0] === this.preindent_string) {
                splice_index = 1;
            } else {
                splice_index = 0;
            }

            // remove one indent, if present
            if (line.text[splice_index] === this.indent_string) {
                line.text.splice(splice_index, 1);
            }
        }
    }

    private set_mode(mode): void {
        if (this.flags) {
            this.flag_store.push(this.flags);
            this.previous_flags = this.flags;
        }
        else {
            this.previous_flags = this.create_flags(null, mode);
        }

        this.flags = this.create_flags(this.previous_flags, mode);
    }

    private is_array(mode: any): boolean {
        return mode === this.MODE.ArrayLiteral;
    }

    private is_expression(mode: any): boolean {
        return this.in_array(mode, [this.MODE.Expression, this.MODE.ForInitializer, this.MODE.Conditional]);
    }

    private restore_mode(): void {
        if (this.flag_store.length > 0) {
            this.previous_flags = this.flags;
            this.flags = this.flag_store.pop();

            if (this.previous_flags.mode === this.MODE.Statement) {
                this.remove_redundant_indentation(this.previous_flags);
            }
        }
    }

    private start_of_object_property(): boolean {
        return this.flags.mode === this.MODE.ObjectLiteral && this.flags.last_text === ':' && this.flags.ternary_depth === 0;
    }

    private start_of_statement(): boolean {
        if (
            (this.last_type === 'TK_RESERVED' && this.in_array(this.flags.last_text, ['var', 'let', 'const']) && this.token_type === 'TK_WORD') ||
            (this.last_type === 'TK_RESERVED' && this.flags.last_text === 'do') ||
            (this.last_type === 'TK_RESERVED' && this.flags.last_text === 'return' && !this.input_wanted_newline) ||
            (this.last_type === 'TK_RESERVED' && this.flags.last_text === 'else' && !(this.token_type === 'TK_RESERVED' && this.token_text === 'if')) ||
            (this.last_type === 'TK_END_EXPR' && (this.previous_flags.mode === this.MODE.ForInitializer || this.previous_flags.mode === this.MODE.Conditional))) {

            this.set_mode(this.MODE.Statement);
            this.indent();

            if (this.last_type === 'TK_RESERVED' && this.in_array(this.flags.last_text, ['var', 'let', 'const']) && this.token_type === 'TK_WORD') {
                this.flags.declaration_statement = true;
            }

            // If starting a new statement with [if, for, while, do], push to a new line.
            // if (a) if (b) if(c) d(); else e(); else f();
            this.allow_wrap_or_preserved_newline(this.token_type === 'TK_RESERVED' && this.in_array(this.token_text, ['do', 'for', 'if', 'while']));
            this.output_wrapped = false;

            return true;
        }
        return false;
    }

    private all_lines_start_with(lines: any, c: any): boolean {
        for (let i: number = 0; i < lines.length; i++) {
            let line: any = this.trim(lines[i]);
            if (line.charAt(0) !== c) {
                return false;
            }
        }
        return true;
    }

    private is_special_word(word: string): boolean {
        return this.in_array(word, ['case', 'return', 'do', 'if', 'throw', 'else']);
    }

    private in_array(what: any, arr: any): boolean {
        for (let i: number = 0; i < arr.length; i += 1) {
            if (arr[i] === what) {
                return true;
            }
        }
        return false;
    }

    private unescape_string(s: string): string {
        let esc: boolean = false;
        let out: string = '';
        let pos: number = 0;
        let s_hex: string = '';
        let escaped: number = 0;
        let c: any;

        while (esc || pos < s.length) {
            c = s.charAt(pos);
            pos++;

            if (esc) {
                esc = false;
                if (c === 'x') {
                    // simple hex-escape \x24
                    s_hex = s.substr(pos, 2);
                    pos += 2;
                } else if (c === 'u') {
                    // unicode-escape, \u2134
                    s_hex = s.substr(pos, 4);
                    pos += 4;
                } else {
                    // some common escape, e.g \n
                    out += '\\' + c;
                    continue;
                }
                if (!s_hex.match(/^[0123456789abcdefABCDEF]+$/)) {
                    // some weird escaping, bail out,
                    // leaving whole string intact
                    return s;
                }

                escaped = parseInt(s_hex, 16);

                if (escaped >= 0x00 && escaped < 0x20) {
                    // leave 0x00...0x1f escaped
                    if (c === 'x') {
                        out += '\\x' + s_hex;
                    } else {
                        out += '\\u' + s_hex;
                    }
                    continue;
                }
                else if (escaped === 0x22 || escaped === 0x27 || escaped === 0x5c) {
                    // single-quote, apostrophe, backslash - escape these
                    out += '\\' + String.fromCharCode(escaped);
                }
                else if (c === 'x' && escaped > 0x7e && escaped <= 0xff) {
                    // we bail out on \x7f..\xff,
                    // leaving whole string escaped,
                    // as it's probably completely binary
                    return s;
                }
                else {
                    out += String.fromCharCode(escaped);
                }
            }
            else if (c === '\\') {
                esc = true;
            }
            else {
                out += c;
            }
        }
        return out;
    }

    private is_next(find: any): boolean {
        let local_pos = this.parser_pos;
        let c = this.input.charAt(local_pos);

        while (this.in_array(c, this.whitespace) && c !== find) {
            local_pos++;
            if (local_pos >= this.input_length) {
                return false;
            }

            c = this.input.charAt(local_pos);
        }
        return c === find;
    }


    private get_next_token(): any {
        let i: any;
        let resulting_string: any;

        this.n_newlines = 0;

        if (this.parser_pos >= this.input_length) {
            return ['', 'TK_EOF'];
        }

        this.input_wanted_newline = false;
        this.whitespace_before_token = [];

        let c: any = this.input.charAt(this.parser_pos);
        this.parser_pos += 1;

        while (this.in_array(c, this.whitespace)) {
            if (c === '\n') {
                this.n_newlines += 1;
                this.whitespace_before_token = [];
            }
            else if (this.n_newlines) {
                if (c === this.indent_string) {
                    this.whitespace_before_token.push(this.indent_string);
                } else if (c !== '\r') {
                    this.whitespace_before_token.push(' ');
                }
            }

            if (this.parser_pos >= this.input_length) {
                return ['', 'TK_EOF'];
            }

            c = this.input.charAt(this.parser_pos);
            this.parser_pos += 1;
        }

        // NOTE: because beautifier doesn't fully parse, it doesn't use acorn.isIdentifierStart.
        // It just treats all identifiers and numbers and such the same.
        if (this.isIdentifierChar(this.input.charCodeAt(this.parser_pos - 1))) {
            if (this.parser_pos < this.input_length) {
                while (this.isIdentifierChar(this.input.charCodeAt(this.parser_pos))) {
                    c += this.input.charAt(this.parser_pos);
                    this.parser_pos += 1;

                    if (this.parser_pos === this.input_length) {
                        break;
                    }
                }
            }

            // small and surprisingly unugly hack for 1E-10 representation
            if (this.parser_pos !== this.input_length && c.match(/^[0-9]+[Ee]$/) && (this.input.charAt(this.parser_pos) === '-' || this.input.charAt(this.parser_pos) === '+')) {
                let sign: any = this.input.charAt(this.parser_pos);
                this.parser_pos += 1;

                let t: any = this.get_next_token();
                c += sign + t[0];
                return [c, 'TK_WORD'];
            }

            if (!(this.last_type === 'TK_DOT' ||
                (this.last_type === 'TK_RESERVED' && this.in_array(this.flags.last_text, ['set', 'get'])))
                && this.in_array(c, this.reserved_words)) {
                if (c === 'in') { // hack for 'in' operator
                    return [c, 'TK_OPERATOR'];
                }
                return [c, 'TK_RESERVED'];
            }
            return [c, 'TK_WORD'];
        }

        if (c === '(' || c === '[') {
            return [c, 'TK_START_EXPR'];
        }

        if (c === ')' || c === ']') {
            return [c, 'TK_END_EXPR'];
        }

        if (c === '{') {
            return [c, 'TK_START_BLOCK'];
        }

        if (c === '}') {
            return [c, 'TK_END_BLOCK'];
        }

        if (c === ';') {
            return [c, 'TK_SEMICOLON'];
        }

        if (c === '/') {
            let comment: string = '';

            // peek for comment /* ... */
            let inline_comment: boolean = true;
            if (this.input.charAt(this.parser_pos) === '*') {
                this.parser_pos += 1;
                if (this.parser_pos < this.input_length) {
                    while (this.parser_pos < this.input_length && !(this.input.charAt(this.parser_pos) === '*' && this.input.charAt(this.parser_pos + 1) && this.input.charAt(this.parser_pos + 1) === '/')) {
                        c = this.input.charAt(this.parser_pos);
                        comment += c;

                        if (c === "\n" || c === "\r") {
                            inline_comment = false;
                        }

                        this.parser_pos += 1;
                        if (this.parser_pos >= this.input_length) {
                            break;
                        }
                    }
                }

                this.parser_pos += 2;
                if (inline_comment && this.n_newlines === 0) {
                    return ['/*' + comment + '*/', 'TK_INLINE_COMMENT'];
                } else {
                    return ['/*' + comment + '*/', 'TK_BLOCK_COMMENT'];
                }
            }

            // peek for comment // ...
            if (this.input.charAt(this.parser_pos) === '/') {
                comment = c;
                while (this.input.charAt(this.parser_pos) !== '\r' && this.input.charAt(this.parser_pos) !== '\n') {
                    comment += this.input.charAt(this.parser_pos);
                    this.parser_pos += 1;

                    if (this.parser_pos >= this.input_length) {
                        break;
                    }
                }
                return [comment, 'TK_COMMENT'];
            }
        }

        if (c === '`' || c === "'" || c === '"' || // string
            (
                (c === '/') || // regexp
                (this.opt.e4x && c === "<" && this.input.slice(this.parser_pos - 1).match(/^<([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])\s*([-a-zA-Z:0-9_.]+=('[^']*'|"[^"]*"|{[^{}]*})\s*)*\/?\s*>/)) // xml
            ) && ( // regex and xml can only appear in specific locations during parsing
                (this.last_type === 'TK_RESERVED' && this.is_special_word(this.flags.last_text)) ||
                (this.last_type === 'TK_END_EXPR' && this.in_array(this.previous_flags.mode, [this.MODE.Conditional, this.MODE.ForInitializer])) ||
                (this.in_array(this.last_type, ['TK_COMMENT', 'TK_START_EXPR', 'TK_START_BLOCK',
                    'TK_END_BLOCK', 'TK_OPERATOR', 'TK_EQUALS', 'TK_EOF', 'TK_SEMICOLON', 'TK_COMMA'
                ]))
            )) {

            let sep = c,
                esc = false,
                has_char_escapes = false;

            resulting_string = c;

            if (this.parser_pos < this.input_length) {
                if (sep === '/') {
                    //
                    // handle regexp
                    //
                    let in_char_class: boolean = false;
                    while (esc || in_char_class || this.input.charAt(this.parser_pos) !== sep) {
                        resulting_string += this.input.charAt(this.parser_pos);
                        if (!esc) {
                            esc = this.input.charAt(this.parser_pos) === '\\';
                            if (this.input.charAt(this.parser_pos) === '[') {
                                in_char_class = true;
                            }
                            else if (this.input.charAt(this.parser_pos) === ']') {
                                in_char_class = false;
                            }
                        }
                        else {
                            esc = false;
                        }

                        this.parser_pos += 1;
                        if (this.parser_pos >= this.input_length) {
                            // incomplete string/rexp when end-of-file reached.
                            // bail out with what had been received so far.
                            return [resulting_string, 'TK_STRING'];
                        }
                    }
                }
                else if (this.opt.e4x && sep === '<') {
                    //
                    // handle e4x xml literals
                    //
                    let xmlRegExp: RegExp = /<(\/?)([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])\s*([-a-zA-Z:0-9_.]+=('[^']*'|"[^"]*"|{[^{}]*})\s*)*(\/?)\s*>/g;
                    let xmlStr: any = this.input.slice(this.parser_pos - 1);
                    let match: RegExpExecArray = xmlRegExp.exec(xmlStr);

                    if (match && match.index === 0) {
                        let rootTag: string = match[2];
                        let depth: number = 0;

                        while (match) {
                            let isEndTag: boolean = !!match[1];
                            let tagName: string = match[2];
                            let isSingletonTag: boolean = (!!match[match.length - 1]) || (tagName.slice(0, 8) === "![CDATA[");

                            if (tagName === rootTag && !isSingletonTag) {
                                if (isEndTag) {
                                    --depth;
                                } else {
                                    ++depth;
                                }
                            }
                            if (depth <= 0) {
                                break;
                            }
                            match = xmlRegExp.exec(xmlStr);
                        }

                        let xmlLength: any = match ? match.index + match[0].length : xmlStr.length;
                        this.parser_pos += xmlLength - 1;
                        return [xmlStr.slice(0, xmlLength), "TK_STRING"];
                    }
                }
                else {
                    //
                    // handle string
                    //
                    while (esc || this.input.charAt(this.parser_pos) !== sep) {
                        resulting_string += this.input.charAt(this.parser_pos);

                        if (esc) {
                            if (this.input.charAt(this.parser_pos) === 'x' || this.input.charAt(this.parser_pos) === 'u') {
                                has_char_escapes = true;
                            }
                            esc = false;
                        }
                        else {
                            esc = this.input.charAt(this.parser_pos) === '\\';
                        }

                        this.parser_pos += 1;
                        if (this.parser_pos >= this.input_length) {
                            // incomplete string/rexp when end-of-file reached.
                            // bail out with what had been received so far.
                            return [resulting_string, 'TK_STRING'];
                        }
                    }
                }
            }

            this.parser_pos += 1;
            resulting_string += sep;

            if (has_char_escapes && this.opt.unescape_strings) {
                resulting_string = this.unescape_string(resulting_string);
            }

            if (sep === '/') {
                // regexps may have modifiers /regexp/MOD , so fetch those, too
                while (this.parser_pos < this.input_length && this.in_array(this.input.charAt(this.parser_pos), this.wordchar)) {
                    resulting_string += this.input.charAt(this.parser_pos);
                    this.parser_pos += 1;
                }
            }
            return [resulting_string, 'TK_STRING'];
        }

        if (c === '#') {
            if (this.output_lines.length === 1 && this.output_lines[0].text.length === 0 &&
                this.input.charAt(this.parser_pos) === '!') {
                resulting_string = c;

                while (this.parser_pos < this.input_length && c !== '\n') {
                    c = this.input.charAt(this.parser_pos);
                    resulting_string += c;
                    this.parser_pos += 1;
                }

                return [this.trim(resulting_string) + '\n', 'TK_UNKNOWN'];
            }

            // Spidermonkey-specific sharp variables for circular references
            // https://developer.mozilla.org/En/Sharp_variables_in_JavaScript
            // http://mxr.mozilla.org/mozilla-central/source/js/src/jsscan.cpp around line 1935
            let sharp: any = '#';
            if (this.parser_pos < this.input_length && this.in_array(this.input.charAt(this.parser_pos), this.digits)) {
                do {
                    c = this.input.charAt(this.parser_pos);
                    sharp += c;
                    this.parser_pos += 1;
                } while (this.parser_pos < this.input_length && c !== '#' && c !== '=');

                if (c === '#') {
                    //
                }
                else if (this.input.charAt(this.parser_pos) === '[' && this.input.charAt(this.parser_pos + 1) === ']') {
                    sharp += '[]';
                    this.parser_pos += 2;
                }
                else if (this.input.charAt(this.parser_pos) === '{' && this.input.charAt(this.parser_pos + 1) === '}') {
                    sharp += '{}';
                    this.parser_pos += 2;
                }
                return [sharp, 'TK_WORD'];
            }
        }

        if (c === '<' && this.input.substring(this.parser_pos - 1, this.parser_pos + 3) === '<!--') {
            this.parser_pos += 3;
            c = '<!--';

            while (this.input.charAt(this.parser_pos) !== '\n' && this.parser_pos < this.input_length) {
                c += this.input.charAt(this.parser_pos);
                this.parser_pos++;
            }

            this.flags.in_html_comment = true;
            return [c, 'TK_COMMENT'];
        }

        if (c === '-' && this.flags.in_html_comment && this.input.substring(this.parser_pos - 1, this.parser_pos + 2) === '-->') {
            this.flags.in_html_comment = false;
            this.parser_pos += 2;
            return ['-->', 'TK_COMMENT'];
        }

        if (c === '.') {
            return [c, 'TK_DOT'];
        }

        if (this.in_array(c, this.punct)) {
            while (this.parser_pos < this.input_length && this.in_array(c + this.input.charAt(this.parser_pos), this.punct)) {
                c += this.input.charAt(this.parser_pos);
                this.parser_pos += 1;

                if (this.parser_pos >= this.input_length) {
                    break;
                }
            }

            if (c === ',') {
                return [c, 'TK_COMMA'];
            }
            else if (c === '=') {
                return [c, 'TK_EQUALS'];
            }
            else {
                return [c, 'TK_OPERATOR'];
            }
        }

        return [c, 'TK_UNKNOWN'];
    }

    private handle_start_expr(): void {
        if (this.start_of_statement()) {
            // The conditional starts the statement if appropriate.
        }

        let next_mode: any = this.MODE.Expression;
        if (this.token_text === '[') {

            if (this.last_type === 'TK_WORD' || this.flags.last_text === ')') {
                // this is array index specifier, break immediately
                // a[x], fn()[x]
                if (this.last_type === 'TK_RESERVED' && this.in_array(this.flags.last_text, this.line_starters)) {
                    this.output_space_before_token = true;
                }

                this.set_mode(next_mode);
                this.print_token(null);
                this.indent();

                if (this.opt.space_in_paren) {
                    this.output_space_before_token = true;
                }

                return;
            }

            next_mode = this.MODE.ArrayLiteral;
            if (this.is_array(this.flags.mode)) {
                if (this.flags.last_text === '[' ||
                    (this.flags.last_text === ',' && (this.last_last_text === ']' || this.last_last_text === '}'))) {
                    // ], [ goes to new line
                    // }, [ goes to new line
                    if (!this.opt.keep_array_indentation) {
                        this.print_newline(false, true);
                    }
                }
            }
        }
        else {
            if (this.last_type === 'TK_RESERVED' && this.flags.last_text === 'for') {
                next_mode = this.MODE.ForInitializer;
            }
            else if (this.last_type === 'TK_RESERVED' && this.in_array(this.flags.last_text, ['if', 'while'])) {
                next_mode = this.MODE.Conditional;
            }
            else {
                // next_mode = MODE.Expression;
            }
        }

        if (this.flags.last_text === ';' || this.last_type === 'TK_START_BLOCK') {
            this.print_newline(false, true);
        }
        else if (this.last_type === 'TK_END_EXPR' || this.last_type === 'TK_START_EXPR' || this.last_type === 'TK_END_BLOCK' || this.flags.last_text === '.') {
            // TODO: Consider whether forcing this is required.  Review failing tests when removed.
            this.allow_wrap_or_preserved_newline(this.input_wanted_newline);
            this.output_wrapped = false;
            // do nothing on (( and )( and ][ and ]( and .(
        }
        else if (!(this.last_type === 'TK_RESERVED' && this.token_text === '(') && this.last_type !== 'TK_WORD' && this.last_type !== 'TK_OPERATOR') {
            this.output_space_before_token = true;
        }
        else if (this.last_type === 'TK_RESERVED' && (this.flags.last_word === 'function' || this.flags.last_word === 'typeof')) {
            // function() vs function ()
            if (this.opt.jslint_happy) {
                this.output_space_before_token = true;
            }
        }
        else if (this.last_type === 'TK_RESERVED' && (this.in_array(this.flags.last_text, this.line_starters) || this.flags.last_text === 'catch')) {
            if (this.opt.space_before_conditional) {
                this.output_space_before_token = true;
            }
        }

        // Support of this kind of newline preservation.
        // a = (b &&
        //     (c || d));
        if (this.token_text === '(') {
            if (this.last_type === 'TK_EQUALS' || this.last_type === 'TK_OPERATOR') {
                if (!this.start_of_object_property()) {
                    this.allow_wrap_or_preserved_newline(undefined);
                }
            }
        }

        this.set_mode(next_mode);
        this.print_token(null);

        if (this.opt.space_in_paren) {
            this.output_space_before_token = true;
        }

        // In all cases, if we newline while inside an expression it should be indented.
        this.indent();
    }

    private handle_end_expr(): void {
        // statements inside expressions are not valid syntax, but...
        // statements must all be closed when their container closes
        while (this.flags.mode === this.MODE.Statement) {
            this.restore_mode();
        }

        if (this.flags.multiline_frame) {
            this.allow_wrap_or_preserved_newline(this.token_text === ']' && this.is_array(this.flags.mode) && !this.opt.keep_array_indentation);
            this.output_wrapped = false;
        }

        if (this.opt.space_in_paren) {
            if (this.last_type === 'TK_START_EXPR' && !this.opt.space_in_empty_paren) {
                // () [] no inner space in empty parens like these, ever, ref #320
                this.trim_output(undefined);
                this.output_space_before_token = false;
            }
            else {
                this.output_space_before_token = true;
            }
        }

        if (this.token_text === ']' && this.opt.keep_array_indentation) {
            this.print_token(null);
            this.restore_mode();
        }
        else {
            this.restore_mode();
            this.print_token(null);
        }
        this.remove_redundant_indentation(this.previous_flags);

        // do {} while () // no statement required after
        if (this.flags.do_while && this.previous_flags.mode === this.MODE.Conditional) {
            this.previous_flags.mode = this.MODE.Expression;
            this.flags.do_block = false;
            this.flags.do_while = false;

        }
    }

    private handle_start_block(): void {
        this.set_mode(this.MODE.BlockStatement);

        let empty_braces: boolean = this.is_next('}');
        let empty_anonymous_function: boolean = empty_braces && this.flags.last_word === 'function' && this.last_type === 'TK_END_EXPR';

        if (this.opt.brace_style === "expand") {
            if (this.last_type !== 'TK_OPERATOR' &&
                (empty_anonymous_function ||
                    this.last_type === 'TK_EQUALS' ||
                    (this.last_type === 'TK_RESERVED' && this.is_special_word(this.flags.last_text) && this.flags.last_text !== 'else'))) {
                this.output_space_before_token = true;
            }
            else {
                this.print_newline(false, true);
            }
        }
        else { // collapse
            if (this.last_type !== 'TK_OPERATOR' && this.last_type !== 'TK_START_EXPR') {
                if (this.last_type === 'TK_START_BLOCK') {
                    this.print_newline(false, true);
                }
                else {
                    this.output_space_before_token = true;
                }
            }
            else {
                // if TK_OPERATOR or TK_START_EXPR
                if (this.is_array(this.previous_flags.mode) && this.flags.last_text === ',') {
                    if (this.last_last_text === '}') {
                        // }, { in array context
                        this.output_space_before_token = true;
                    }
                    else {
                        this.print_newline(false, true); // [a, b, c, {
                    }
                }
            }
        }

        this.print_token(null);
        this.indent();
    }

    private handle_end_block(): void {
        // statements must all be closed when their container closes
        while (this.flags.mode === this.MODE.Statement) {
            this.restore_mode();
        }

        let empty_braces: boolean = this.last_type === 'TK_START_BLOCK';

        if (this.opt.brace_style === "expand") {
            if (!empty_braces) {
                this.print_newline(false, true);
            }
        } else {
            // skip {}
            if (!empty_braces) {
                if (this.is_array(this.flags.mode) && this.opt.keep_array_indentation) {
                    // we REALLY need a newline here, but newliner would skip that
                    this.opt.keep_array_indentation = false;
                    this.print_newline(false, true);
                    this.opt.keep_array_indentation = true;
                }
                else {
                    this.print_newline(false, true);
                }
            }
        }

        this.restore_mode();
        this.print_token(null);
    }

    private handle_word(): void {
        if (this.start_of_statement()) {
            // The conditional starts the statement if appropriate.
        }
        else if (this.input_wanted_newline && !this.is_expression(this.flags.mode) &&
            (this.last_type !== 'TK_OPERATOR' || (this.flags.last_text === '--' || this.flags.last_text === '++')) &&
            this.last_type !== 'TK_EQUALS' &&
            (this.opt.preserve_newlines || !(this.last_type === 'TK_RESERVED' && this.in_array(this.flags.last_text, ['var', 'let', 'const', 'set', 'get'])))) {
            this.print_newline(false, true);
        }

        if (this.flags.do_block && !this.flags.do_while) {
            if (this.token_type === 'TK_RESERVED' && this.token_text === 'while') {
                // do {} ## while ()
                this.output_space_before_token = true;
                this.print_token(null);
                this.output_space_before_token = true;
                this.flags.do_while = true;
                return;
            }
            else {
                // do {} should always have while as the next word.
                // if we don't see the expected while, recover
                this.print_newline(false, true);
                this.flags.do_block = false;
            }
        }

        // if may be followed by else, or not
        // Bare/inline ifs are tricky
        // Need to unwind the modes correctly: if (a) if (b) c(); else d(); else e();
        if (this.flags.if_block) {
            if (!this.flags.else_block && (this.token_type === 'TK_RESERVED' && this.token_text === 'else')) {
                this.flags.else_block = true;
            }
            else {
                while (this.flags.mode === this.MODE.Statement) {
                    this.restore_mode();
                }

                this.flags.if_block = false;
                this.flags.else_block = false;
            }
        }

        if (this.token_type === 'TK_RESERVED' && (this.token_text === 'case' || (this.token_text === 'default' && this.flags.in_case_statement))) {
            this.print_newline(false, true);

            if (this.flags.case_body || this.opt.jslint_happy) {
                // switch cases following one another
                this.deindent();
                this.flags.case_body = false;
            }

            this.print_token(null);
            this.flags.in_case = true;
            this.flags.in_case_statement = true;
            return;
        }

        if (this.token_type === 'TK_RESERVED' && this.token_text === 'function') {
            if (this.in_array(this.flags.last_text, ['}', ';']) || (this.just_added_newline() && !this.in_array(this.flags.last_text, ['{', ':', '=', ',']))) {
                // make sure there is a nice clean space of at least one blank line
                // before a new function definition
                if (!this.just_added_blankline() && !this.flags.had_comment) {
                    this.print_newline(false, true);
                    this.print_newline(true, true);
                }
            }
            if (this.last_type === 'TK_RESERVED' || this.last_type === 'TK_WORD') {
                if (this.last_type === 'TK_RESERVED' && this.in_array(this.flags.last_text, ['get', 'set', 'new', 'return'])) {
                    this.output_space_before_token = true;
                }
                else {
                    this.print_newline(false, true);
                }
            }
            else if (this.last_type === 'TK_OPERATOR' || this.flags.last_text === '=') {
                // foo = function
                this.output_space_before_token = true;
            }
            else if (this.is_expression(this.flags.mode)) {
                // (function
            } else {
                this.print_newline(false, true);
            }
        }

        if (this.last_type === 'TK_COMMA' || this.last_type === 'TK_START_EXPR' || this.last_type === 'TK_EQUALS' || this.last_type === 'TK_OPERATOR') {
            if (!this.start_of_object_property()) {
                this.allow_wrap_or_preserved_newline(undefined);
            }
        }

        if (this.token_type === 'TK_RESERVED' && this.token_text === 'function') {
            this.print_token(null);
            this.flags.last_word = this.token_text;
            return;
        }

        this.prefix = 'NONE';

        if (this.last_type === 'TK_END_BLOCK') {
            if (!(this.token_type === 'TK_RESERVED' && this.in_array(this.token_text, ['else', 'catch', 'finally']))) {
                this.prefix = 'NEWLINE';
            }
            else {
                if (this.opt.brace_style === "expand" || this.opt.brace_style === "end-expand") {
                    this.prefix = 'NEWLINE';
                }
                else {
                    this.prefix = 'SPACE';
                    this.output_space_before_token = true;
                }
            }
        }
        else if (this.last_type === 'TK_SEMICOLON' && this.flags.mode === this.MODE.BlockStatement) {
            // TODO: Should this be for STATEMENT as well?
            this.prefix = 'NEWLINE';
        }
        else if (this.last_type === 'TK_SEMICOLON' && this.is_expression(this.flags.mode)) {
            this.prefix = 'SPACE';
        }
        else if (this.last_type === 'TK_STRING') {
            this.prefix = 'NEWLINE';
        }
        else if (this.last_type === 'TK_RESERVED' || this.last_type === 'TK_WORD') {
            this.prefix = 'SPACE';
        }
        else if (this.last_type === 'TK_START_BLOCK') {
            this.prefix = 'NEWLINE';
        }
        else if (this.last_type === 'TK_END_EXPR') {
            this.output_space_before_token = true;
            this.prefix = 'NEWLINE';
        }

        if (this.token_type === 'TK_RESERVED' && this.in_array(this.token_text, this.line_starters) && this.flags.last_text !== ')') {
            if (this.flags.last_text === 'else') {
                this.prefix = 'SPACE';
            }
            else {
                this.prefix = 'NEWLINE';
            }
        }

        if (this.token_type === 'TK_RESERVED' && this.in_array(this.token_text, ['else', 'catch', 'finally'])) {
            if (this.last_type !== 'TK_END_BLOCK' || this.opt.brace_style === "expand" || this.opt.brace_style === "end-expand") {
                this.print_newline(false, true);
            }
            else {
                this.trim_output(true);
                let line: any = this.output_lines[this.output_lines.length - 1];

                // If we trimmed and there's something other than a close block before us
                // put a newline back in.  Handles '} // comment' scenario.
                if (line.text[line.text.length - 1] !== '}') {
                    this.print_newline(false, true);
                }

                this.output_space_before_token = true;
            }
        }
        else if (this.prefix === 'NEWLINE') {
            if (this.last_type === 'TK_RESERVED' && this.is_special_word(this.flags.last_text)) {
                // no newline between 'return nnn'
                this.output_space_before_token = true;
            }
            else if (this.last_type !== 'TK_END_EXPR') {
                if ((this.last_type !== 'TK_START_EXPR' || !(this.token_type === 'TK_RESERVED' && this.in_array(this.token_text, ['var', 'let', 'const']))) && this.flags.last_text !== ':') {
                    // no need to force newline on 'var': for (var x = 0...)
                    if (this.token_type === 'TK_RESERVED' && this.token_text === 'if' && this.flags.last_word === 'else' && this.flags.last_text !== '{') {
                        // no newline for } else if {
                        this.output_space_before_token = true;
                    }
                    else {
                        this.print_newline(false, true);
                    }
                }
            }
            else if (this.token_type === 'TK_RESERVED' && this.in_array(this.token_text, this.line_starters) && this.flags.last_text !== ')') {
                this.print_newline(false, true);
            }
        }
        else if (this.is_array(this.flags.mode) && this.flags.last_text === ',' && this.last_last_text === '}') {
            this.print_newline(false, true); // }, in lists get a newline treatment
        }
        else if (this.prefix === 'SPACE') {
            this.output_space_before_token = true;
        }

        this.print_token(null);
        this.flags.last_word = this.token_text;

        if (this.token_type === 'TK_RESERVED' && this.token_text === 'do') {
            this.flags.do_block = true;
        }

        if (this.token_type === 'TK_RESERVED' && this.token_text === 'if') {
            this.flags.if_block = true;
        }
    }

    private handle_semicolon(): void {
        if (this.start_of_statement()) {
            // The conditional starts the statement if appropriate.
            // Semicolon can be the start (and end) of a statement
            this.output_space_before_token = false;
        }

        while (this.flags.mode === this.MODE.Statement && !this.flags.if_block && !this.flags.do_block) {
            this.restore_mode();
        }

        this.print_token(null);

        if (this.flags.mode === this.MODE.ObjectLiteral) {
            // if we're in OBJECT mode and see a semicolon, its invalid syntax
            // recover back to treating this as a BLOCK
            this.flags.mode = this.MODE.BlockStatement;
        }
    }

    private handle_string(): void {
        if (this.start_of_statement()) {
            // The conditional starts the statement if appropriate.
            // One difference - strings want at least a space before
            this.output_space_before_token = true;
        }
        else if (this.last_type === 'TK_RESERVED' || this.last_type === 'TK_WORD') {
            this.output_space_before_token = true;
        }
        else if (this.last_type === 'TK_COMMA' || this.last_type === 'TK_START_EXPR' || this.last_type === 'TK_EQUALS' || this.last_type === 'TK_OPERATOR') {
            if (!this.start_of_object_property()) {
                this.allow_wrap_or_preserved_newline(undefined);
            }
        }
        else {
            this.print_newline(false, true);
        }

        this.print_token(null);
    }

    private handle_equals(): void {
        if (this.flags.declaration_statement) {
            // just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
            this.flags.declaration_assignment = true;
        }

        this.output_space_before_token = true;
        this.print_token(null);
        this.output_space_before_token = true;
    }

    private handle_comma(): void {
        if (this.flags.declaration_statement) {
            if (this.is_expression(this.flags.parent.mode)) {
                // do not break on comma, for(var a = 1, b = 2)
                this.flags.declaration_assignment = false;
            }

            this.print_token(null);

            if (this.flags.declaration_assignment) {
                this.flags.declaration_assignment = false;
                this.print_newline(false, true);
            }
            else {
                this.output_space_before_token = true;
            }

            return;
        }

        if (this.last_type === 'TK_END_BLOCK' && this.flags.mode !== this.MODE.Expression) {
            this.print_token(null);

            if (this.flags.mode === this.MODE.ObjectLiteral && this.flags.last_text === '}') {
                this.print_newline(false, true);
            }
            else {
                this.output_space_before_token = true;
            }
        }
        else {
            if (this.flags.mode === this.MODE.ObjectLiteral) {
                this.print_token(null);
                this.print_newline(false, true);
            }
            else {
                // EXPR or DO_BLOCK
                this.print_token(null);
                this.output_space_before_token = true;
            }
        }
    }

    private handle_operator(): void {
        let space_before: boolean = true;
        let space_after: boolean = true;

        if (this.last_type === 'TK_RESERVED' && this.is_special_word(this.flags.last_text)) {
            // "return" had a special handling in TK_WORD. Now we need to return the favor
            this.output_space_before_token = true;
            this.print_token(null);
            return;
        }

        // hack for actionscript's import .*;
        if (this.token_text === '*' && this.last_type === 'TK_DOT' && !this.last_last_text.match(/^\d+$/)) {
            this.print_token(null);
            return;
        }

        if (this.token_text === ':' && this.flags.in_case) {
            this.flags.case_body = true;
            this.indent();
            this.print_token(null);
            this.print_newline(false, true);
            this.flags.in_case = false;
            return;
        }

        if (this.token_text === '::') {
            // no spaces around exotic namespacing syntax operator
            this.print_token(null);
            return;
        }

        // http://www.ecma-international.org/ecma-262/5.1/#sec-7.9.1
        // if there is a newline between -- or ++ and anything else we should preserve it.
        if (this.input_wanted_newline && (this.token_text === '--' || this.token_text === '++')) {
            this.print_newline(false, true);
        }

        // Allow line wrapping between operators
        if (this.last_type === 'TK_OPERATOR') {
            this.allow_wrap_or_preserved_newline(undefined);
        }

        if (this.in_array(this.token_text, ['--', '++', '!']) || (this.in_array(this.token_text, ['-', '+']) && (this.in_array(this.last_type, ['TK_START_BLOCK', 'TK_START_EXPR', 'TK_EQUALS', 'TK_OPERATOR']) || this.in_array(this.flags.last_text, this.line_starters) || this.flags.last_text === ','))) {
            // unary operators (and binary +/- pretending to be unary) special cases
            space_before = false;
            space_after = false;

            if (this.flags.last_text === ';' && this.is_expression(this.flags.mode)) {
                // for (;; ++i)
                //        ^^^
                space_before = true;
            }

            if (this.last_type === 'TK_RESERVED') {
                space_before = true;
            }

            if ((this.flags.mode === this.MODE.BlockStatement || this.flags.mode === this.MODE.Statement) && (this.flags.last_text === '{' || this.flags.last_text === ';')) {
                // { foo; --i }
                // foo(); --bar;
                this.print_newline(false, true);
            }
        }
        else if (this.token_text === ':') {
            if (this.flags.ternary_depth === 0) {
                if (this.flags.mode === this.MODE.BlockStatement) {
                    this.flags.mode = this.MODE.ObjectLiteral;
                }
                space_before = false;
            }
            else {
                this.flags.ternary_depth -= 1;
            }
        }
        else if (this.token_text === '?') {
            this.flags.ternary_depth += 1;
        }

        this.output_space_before_token = this.output_space_before_token || space_before;
        this.print_token(null);
        this.output_space_before_token = space_after;
    }

    private handle_block_comment(): void {
        let lines: any = this.split_newlines(this.token_text);
        let j: number; // iterator for this case
        let javadoc: boolean = false;

        // block comment starts with a new line
        this.print_newline(false, true);

        if (lines.length > 1) {
            if (this.all_lines_start_with(lines.slice(1), '*')) {
                javadoc = true;
            }
        }

        // first line always indented
        this.print_token(lines[0]);
        for (j = 1; j < lines.length; j++) {
            this.print_newline(false, true);

            if (javadoc) {
                // javadoc: reformat and re-indent
                this.print_token(' ' + this.trim(lines[j]));
            }
            else {
                // normal comments output raw
                this.output_lines[this.output_lines.length - 1].text.push(lines[j]);
            }
        }

        // for comments of more than one line, make sure there's a new line after
        this.print_newline(false, true);
    }

    private handle_inline_comment(): void {
        this.output_space_before_token = true;
        this.print_token(null);
        this.output_space_before_token = true;
    }

    private handle_comment(): void {
        if (this.input_wanted_newline) {
            this.print_newline(false, true);
        }
        else {
            this.trim_output(true);
        }

        this.output_space_before_token = true;
        this.print_token(null);
        this.print_newline(false, true);
    }

    private handle_dot(): void {
        if (this.last_type === 'TK_RESERVED' && this.is_special_word(this.flags.last_text)) {
            this.output_space_before_token = true;
        }
        else {
            // allow preserved newlines before dots in general
            // force newlines on dots after close paren when break_chained - for bar().baz()
            this.allow_wrap_or_preserved_newline(this.flags.last_text === ')' && this.opt.break_chained_methods);
        }

        this.print_token(null);
    }

    private handle_unknown(): void {
        this.print_token(null);

        if (this.token_text[this.token_text.length - 1] === '\n') {
            this.print_newline(false, true);
        }
    }

    private beautify(): string {
        /*jshint onevar:true */
        let t: any;
        let i: number;
        let keep_whitespace: any;
        let sweet_code: string;

        while (true) {
            t = this.get_next_token();
            this.token_text = t[0];
            this.token_type = t[1];

            if (this.token_type === 'TK_EOF') {
                // Unwind any open statements
                while (this.flags.mode === this.MODE.Statement) {
                    this.restore_mode();
                }
                break;
            }

            keep_whitespace = this.opt.keep_array_indentation && this.is_array(this.flags.mode);
            this.input_wanted_newline = this.n_newlines > 0;

            if (keep_whitespace) {
                for (i = 0; i < this.n_newlines; i += 1) {
                    this.print_newline(i > 0, true);
                }
            }
            else {
                if (this.opt.max_preserve_newlines && this.n_newlines > this.opt.max_preserve_newlines) {
                    this.n_newlines = this.opt.max_preserve_newlines;
                }

                if (this.opt.preserve_newlines) {
                    if (this.n_newlines > 1) {
                        this.print_newline(false, true);

                        for (i = 1; i < this.n_newlines; i += 1) {
                            this.print_newline(false, true);
                        }
                    }
                }
            }

            //this.handlers[this.token_type]();
            switch (this.token_type) {
                case 'TK_START_EXPR':
                    this.handle_start_expr();
                    break;
                case 'TK_END_EXPR':
                    this.handle_end_expr();
                    break;
                case 'TK_START_BLOCK':
                    this.handle_start_block();
                    break;
                case 'TK_END_BLOCK':
                    this.handle_end_block();
                    break;
                case 'TK_WORD': 
                    this.handle_word();
                    break;
                case 'TK_RESERVED': 
                    this.handle_word();
                    break;
                case 'TK_SEMICOLON': 
                    this.handle_semicolon();
                    break;
                case 'TK_STRING': 
                    this.handle_string();
                    break;
                case 'TK_EQUALS': 
                    this.handle_equals();
                    break;
                case 'TK_OPERATOR': 
                    this.handle_operator();
                    break;
                case 'TK_COMMA': 
                    this.handle_comma();
                    break;
                case 'TK_BLOCK_COMMENT': 
                    this.handle_block_comment();
                    break;
                case 'TK_INLINE_COMMENT': 
                    this.handle_inline_comment();
                    break;
                case 'TK_COMMENT': 
                    this.handle_comment();
                    break;
                case 'TK_DOT': 
                    this.handle_dot();
                    break;
                case 'TK_UNKNOWN': 
                    this.handle_unknown();
                    break;
            }

            // The cleanest handling of inline comments is to treat them as though they aren't there.
            // Just continue formatting and the behavior should be logical.
            // Also ignore unknown tokens.  Again, this should result in better behavior.
            if (this.token_type !== 'TK_INLINE_COMMENT' && this.token_type !== 'TK_COMMENT' &&
                this.token_type !== 'TK_BLOCK_COMMENT' && this.token_type !== 'TK_UNKNOWN') {
                this.last_last_text = this.flags.last_text;
                this.last_type = this.token_type;
                this.flags.last_text = this.token_text;
            }

            this.flags.had_comment = (this.token_type === 'TK_INLINE_COMMENT' || this.token_type === 'TK_COMMENT' || this.token_type === 'TK_BLOCK_COMMENT');
        }

        sweet_code = this.output_lines[0].text.join('');
        for (let line_index: number = 1; line_index < this.output_lines.length; line_index++) {
            sweet_code += '\n' + this.output_lines[line_index].text.join('');
        }

        sweet_code = sweet_code.replace(/[\r\n ]+$/, '');
        return sweet_code;
    }

    public js_beautify(js_source_text: string, options: any): string {
        this.whitespace = "\n\r\t ".split('');
        this.wordchar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$'.split('');
        this.digits = '0123456789'.split('');

        this.punct = '+ - * / % & ++ -- = += -= *= /= %= === === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! , : ? ^ ^= |= :: =>';
        this.punct += ' <%= <% %> <?= <? ?>'; // try to be a good boy and try not to break the markup language identifiers
        this.punct = this.punct.split(' ');

        // words which should always start on new line.
        this.line_starters = 'continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function'.split(',');
        this.reserved_words = this.line_starters.concat(['do', 'in', 'else', 'get', 'set', 'new', 'catch', 'finally', 'typeof']);

        // Some interpreters have unexpected results with foo = baz || bar;
        options = options ? options : {};
        this.opt = {};

        // compatibility
        if (options.space_after_anon_function !== undefined && options.jslint_happy === undefined) {
            options.jslint_happy = options.space_after_anon_function;
        }

        if (options.braces_on_own_line !== undefined) {
            // graceful handling of deprecated option
            this.opt.brace_style = options.braces_on_own_line ? "expand" : "collapse";
        }

        this.opt.brace_style = options.brace_style ? options.brace_style : (this.opt.brace_style ? this.opt.brace_style : "collapse");

        // graceful handling of deprecated option
        if (this.opt.brace_style === "expand-strict") {
            this.opt.brace_style = "expand";
        }

        this.opt.indent_size = options.indent_size ? parseInt(options.indent_size, 10) : 4;
        this.opt.indent_char = options.indent_char ? options.indent_char : ' ';
        this.opt.preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
        this.opt.break_chained_methods = (options.break_chained_methods === undefined) ? false : options.break_chained_methods;
        this.opt.max_preserve_newlines = (options.max_preserve_newlines === undefined) ? 0 : parseInt(options.max_preserve_newlines, 10);
        this.opt.space_in_paren = (options.space_in_paren === undefined) ? false : options.space_in_paren;
        this.opt.space_in_empty_paren = (options.space_in_empty_paren === undefined) ? false : options.space_in_empty_paren;
        this.opt.jslint_happy = (options.jslint_happy === undefined) ? false : options.jslint_happy;
        this.opt.keep_array_indentation = (options.keep_array_indentation === undefined) ? false : options.keep_array_indentation;
        this.opt.space_before_conditional = (options.space_before_conditional === undefined) ? true : options.space_before_conditional;
        this.opt.unescape_strings = (options.unescape_strings === undefined) ? false : options.unescape_strings;
        this.opt.wrap_line_length = (options.wrap_line_length === undefined) ? 0 : parseInt(options.wrap_line_length, 10);
        this.opt.e4x = (options.e4x === undefined) ? false : options.e4x;

        if (options.indent_with_tabs) {
            this.opt.indent_char = '\t';
            this.opt.indent_size = 1;
        }

        this.indent_string = '';
        while (this.opt.indent_size > 0) {
            this.indent_string += this.opt.indent_char;
            this.opt.indent_size -= 1;
        }

        while (js_source_text && (js_source_text.charAt(0) === ' ' || js_source_text.charAt(0) === '\t')) {
            this.preindent_string += js_source_text.charAt(0);
            js_source_text = js_source_text.substring(1);
        }

        this.input = js_source_text;

        // cache the source's length.
        this.input_length = js_source_text.length;

        this.last_type = 'TK_START_BLOCK'; // last token type
        this.last_last_text = ''; // pre-last token text
        this.output_lines = [this.create_output_line()];
        this.output_wrapped = false;
        this.output_space_before_token = false;
        this.whitespace_before_token = [];

        // Stack of parsing/formatting states, including MODE.
        // We tokenize, parse, and output in an almost purely a forward-only stream of token input
        // and formatted output.  This makes the beautifier less accurate than full parsers
        // but also far more tolerant of syntax errors.
        //
        // For example, the default mode is MODE.BlockStatement. If we see a '{' we push a new frame of type
        // MODE.BlockStatement on the the stack, even though it could be object literal.  If we later
        // encounter a ":", we'll switch to to MODE.ObjectLiteral.  If we then see a ";",
        // most full parsers would die, but the beautifier gracefully falls back to
        // MODE.BlockStatement and continues on.
        this.flag_store = [];
        this.set_mode(this.MODE.BlockStatement);

        this.parser_pos = 0;

        return this.beautify();
    }
}