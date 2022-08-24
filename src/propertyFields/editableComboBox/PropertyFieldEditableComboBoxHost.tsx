import * as React from 'react';
import { ComboBox, IComboBox, IComboBoxOption } from 'office-ui-fabric-react/lib/ComboBox';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';

import { IPropertyFieldEditableComboBoxHostProps, IPropertyFieldEditableComboBoxHostState } from './IPropertyFieldEditableComboBoxHost';
import styles from './PropertyFieldEditableComboBoxHost.module.scss';
import * as telemetry from '../../common/telemetry';

/**
 * @class PropertyFieldEditableComboBoxHost
 * @description Core JSX Element for displaying and managing an editable combo box
 */
export default class PropertyFieldEditableComboBoxHost extends React.Component<IPropertyFieldEditableComboBoxHostProps, IPropertyFieldEditableComboBoxHostState> {
  private readonly logStyle: string = "background: crimson; padding: 5px; border-radius: 5px; color: white";
  protected box: React.RefObject<IComboBox>;

  constructor(props: IPropertyFieldEditableComboBoxHostProps, state: IPropertyFieldEditableComboBoxHostState) {
		super(props);

    this.box = React.createRef();

		telemetry.track('PropertyFieldEditableComboBox', {
			disabled: props.disabled
    });

		this.state = {
			options: props.options,
      selectedText: props.selectedText
		};
	}

  /**
   * @function optionChanged
   * @param event
   * @param option
   * @param index
   * @param value
   * @description Handles when the selected option has changed or whether a new option has been added
   */
  public optionChanged(event: React.FormEvent<IComboBox>, option?: IComboBoxOption | undefined, index?: number | undefined, value?: string | undefined) : void {
    //Determine if the option was selected or if a new value was added
    let txt: string | undefined;
    let wasAdded: boolean = false;
    if (option !== undefined) {
      //An option was selected
      txt = option.text;

      this.setState({selectedText: txt});
    } else {
      //A new option was provided
      txt = value;

      //Add the new category to the list, if it is not undefined and then reload the list
      if (txt !== undefined && txt !== '') {
        //this.log(`${val} is being added to the list of categories...`);
        this.setState({
          options: [...this.state.options, { key: txt, text: txt }]
        });
        this.setState({
          selectedText: txt
        });
        wasAdded = true;
      } else if (txt === '') {
        this.setState({selectedText: txt});
        //this.log(`Selected category state blanked out`);
      }
    }
    //this.log(`${val} was selected!`);
    this.props.onOptionChanged(txt, wasAdded);
  }

  /**
   * @function onKeyDown
   * @param event the keyboard event incoming
   * @description monitors the keystrokes to stop the user from exceeding the `maxFillInLength`
   */
  protected onKeyDown(event: React.KeyboardEvent<IComboBox>): void {
    if (this.props.maxFillInLength !== undefined) {
      if (event.key.toLowerCase() !== 'backspace') {
        const text = (event.target as HTMLInputElement).value;
        if (text !== undefined && text !== null) {
          if (text.length >= this.props.maxFillInLength) {
            this.log(`Max character length hit!!! [${this.props.maxFillInLength.toString()}] : Stopping new characters.`);
            event.preventDefault();
          }
        }
      }
    }
  }

  /**
   * @function log
   * @param val the string to write out to the console
   * @description lightweight logging to the console, with just a little custom styling
   */
  private log(val: string): void {
    console.log(`%c>> ${val}`, this.logStyle);
  }

  /**
   * @function render
   * @description Renders out the Fluent UI `ComboBox` along with some labeling and tooltip components
   */
  public render(): JSX.Element {
    return (
      <>
        <div className={styles.catLabelContainer}>
          <Label>{this.props.label}</Label>
          {(this.props.showTooltip ?
          <TooltipHost
            content={this.props.tooltipText}
            className={styles.tooltip}
          >
            <FontIcon iconName="Info" className={styles.fontIcon} />
          </TooltipHost>
            : null)}
        </div>
        <ComboBox
          componentRef={this.box}
          onChange={(event, option, index, value) => this.optionChanged(event, option, index, value)}
          text={this.state.selectedText}
          allowFreeform
          autoComplete="on"
          onKeyDown={(event) => this.onKeyDown(event)}
          options={this.state.options}
          disabled={this.props.disabled} />
      </>
    );
  }
}
