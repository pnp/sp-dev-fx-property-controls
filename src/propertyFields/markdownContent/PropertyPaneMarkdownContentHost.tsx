import * as React from 'react';
import { IPropertyPaneMarkdownContentHostProps } from './IPropertyPaneMarkdownContentHost';
import Markdown from 'markdown-to-jsx';

import * as telemetry from '../../common/telemetry';

export default class PropertyPaneMarkdownContentHost extends React.Component<IPropertyPaneMarkdownContentHostProps> {

  constructor(props: IPropertyPaneMarkdownContentHostProps) {
    super(props);

    telemetry.track('PropertyPaneMarkdownContent', {});
  }

  public render(): JSX.Element {
    return (
      <div className={this.props.className}>
        { this.props.description && this.props.description !== '' &&
          <div dangerouslySetInnerHTML={{ __html: this.props.description }}></div>
        }

        <Markdown
          options={this.props.markdownProps}
        >{this.props.markdown}</Markdown>
      </div>
    );
  }
}
