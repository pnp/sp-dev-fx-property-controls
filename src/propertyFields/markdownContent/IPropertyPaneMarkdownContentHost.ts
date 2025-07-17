import { MarkdownToJSX } from 'markdown-to-jsx';

export interface IPropertyPaneMarkdownContentHostProps {
  className?: string;
  description?: string;
  markdown: string;
  markdownProps: MarkdownToJSX.Options;

}
