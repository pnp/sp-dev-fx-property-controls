import * as React from 'react';
import styles from '../PropertyFieldCollectionDataHost.module.scss';
import { ICollectionColorFieldProps } from '.';
import { Callout, DirectionalHint, Target } from 'office-ui-fabric-react/lib/Callout';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';

interface ICollectionColorFieldState {
  isCalloutVisible: boolean;
  color:string;
}

export class CollectionColorField extends React.Component<ICollectionColorFieldProps, ICollectionColorFieldState> {

  private _colorElement = React.createRef<HTMLDivElement>();

  public constructor(props: ICollectionColorFieldProps, state: ICollectionColorFieldState) {
    super(props, state);
    const { field, item } = this.props;

    this.state = {
        isCalloutVisible: false,
        color: item[field.id] ? item[field.id] : "#0000ff"
    };
  }
  
  private _onCalloutDismiss = () => {
    this.setState({
      isCalloutVisible: false
    });
  }
  
  private _onCalloutToggle = () => {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  }

  public render(): React.ReactElement<ICollectionColorFieldProps> {
    const { field } = this.props;

    return (
      <div className={`PropertyFieldCollectionData__panel__color-field ${styles.colorField}`}>

        <div className={styles.colorIndicator} 
            style={{ backgroundColor: this.state.color, cursor:this.props.disableEdit ? 'default' : 'hand' }}
            ref={this._colorElement}
            onClick={() => { if(!this.props.disableEdit) this._onCalloutToggle(); }}>
        </div>

        <Callout
            gapSpace={0}
            target={this._colorElement.current}
            onDismiss={this._onCalloutDismiss}
            setInitialFocus={true}
            hidden={!this.state.isCalloutVisible}
            directionalHint={DirectionalHint.rightCenter}>

            <ColorPicker
                color={this.state.color}
                alphaSliderHidden={true}
                onColorChanged={(color) => { this.props.fOnValueChange(field.id, color); this.setState({color:color}); }}
              />

        </Callout>
      </div>
    );
  }
}
