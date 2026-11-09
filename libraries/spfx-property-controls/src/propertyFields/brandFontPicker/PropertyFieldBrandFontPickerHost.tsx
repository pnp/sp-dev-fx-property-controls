import * as React from 'react';
import { 
  Dropdown, 
  IDropdownOption, 
  DropdownMenuItemType,
  Label, 
  Spinner, 
  SpinnerSize, 
  MessageBar, 
  MessageBarType,
  IDropdownStyles
} from '@fluentui/react';
import { 
  IPropertyFieldBrandFontPickerHostProps, 
  IPropertyFieldBrandFontPickerHostState 
} from './IPropertyFieldBrandFontPickerHost';
import { IBrandFontToken } from './IPropertyFieldBrandFontPicker';
import { BrandCenterService } from '../../services/BrandCenterService';

/**
 * Renders the controls for PropertyFieldBrandFontPicker component
 */
export default class PropertyFieldBrandFontPickerHost extends React.Component<IPropertyFieldBrandFontPickerHostProps, IPropertyFieldBrandFontPickerHostState> {
  private readonly brandCenterService: BrandCenterService;

  constructor(props: IPropertyFieldBrandFontPickerHostProps) {
    super(props);

    this.state = {
      loading: true,
      fontTokens: [],
      selectedToken: undefined,
      errorMessage: undefined
    };

    // Initialize the BrandCenterService
    this.brandCenterService = new BrandCenterService(this.props.context);
  }

  public componentDidMount(): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.loadFontTokens();
  }

  /**
   * Load font tokens from Brand Center or fallback
   */
  private async loadFontTokens(): Promise<void> {
    this.setState({ loading: true, errorMessage: undefined });

    try {
      let fontTokens: IBrandFontToken[] = [];

      console.log('🎨 Brand Center Font Picker: Starting font token loading...');

      // Check if custom font tokens are provided
      if (this.props.customFontTokens && this.props.customFontTokens.length > 0) {
        fontTokens = this.props.customFontTokens;
        console.log('🎨 Brand Center Font Picker: Using custom font tokens:', fontTokens.length);
      } else {
        // Try to load from Brand Center using the service
        console.log('🎨 Brand Center Font Picker: Loading from Brand Center service...');
        fontTokens = await this.brandCenterService.getFontTokens();
        console.log('🎨 Brand Center Font Picker: Loaded font tokens:', fontTokens.length, fontTokens);
      }

      // Set initial selected token
      let selectedToken: IBrandFontToken | undefined;
      if (this.props.initialValue) {
        selectedToken = fontTokens.find(token => token.value === this.props.initialValue);
      }

      this.setState({
        loading: false,
        fontTokens,
        selectedToken,
        errorMessage: undefined
      });

      // Notify parent component
      if (this.props.onFontTokensLoaded) {
        this.props.onFontTokensLoaded(fontTokens);
      }
    } catch (error) {
      console.error('Error loading font tokens:', error);
      const errorMessage = this.props.loadingErrorMessage || 'Failed to load font tokens';
      this.setState({
        loading: false,
        fontTokens: [],
        selectedToken: undefined,
        errorMessage
      });
    }
  }

  /**
   * Handle font selection change
   */
  private readonly onSelectionChanged = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
    if (option && option.itemType !== DropdownMenuItemType.Header) {
      const selectedToken = this.state.fontTokens.find(token => token.name === option.key);
      if (selectedToken) {
        this.setState({ selectedToken });
        
        if (this.props.onSelectionChanged) {
          this.props.onSelectionChanged(selectedToken);
        }
      }
    }
  };

  /**
   * Custom render for dropdown option to show font preview
   */
  private readonly onRenderOption = (option?: IDropdownOption): JSX.Element => {
    if (!option) {
      return <div />;
    }

    // Skip rendering for header items
    if (option.itemType === DropdownMenuItemType.Header) {
      return (
        <div style={{ 
          fontWeight: '600', 
          color: '#605e5c',
          padding: '8px 12px',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {option.text}
        </div>
      );
    }

    const fontToken = this.state.fontTokens.find(token => token.name === option.key);
    const fontValue = fontToken?.value || '';

    return (
      <div style={{ 
        padding: '8px 12px',
        minHeight: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{ 
          fontSize: '14px',
          color: '#323130',
          lineHeight: '20px',
          marginBottom: this.props.showPreview ? '2px' : '0'
        }}>
          {option.text}
        </div>
        {this.props.showPreview && (
          <div 
            style={{ 
              fontFamily: fontValue,
              fontSize: '12px',
              color: '#605e5c',
              lineHeight: '16px'
            }}
          >
            Sample text preview
          </div>
        )}
      </div>
    );
  };

  /**
   * Custom render for dropdown title to show selected font preview
   */
  private readonly onRenderTitle = (options?: IDropdownOption[]): JSX.Element => {
    if (!options || options.length === 0) {
      return <div />;
    }

    const option = options[0];
    const fontToken = this.state.fontTokens.find(token => token.name === option.key);
    const fontValue = fontToken?.value || '';

    return (
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '40px',
        paddingLeft: '12px',
        paddingRight: '12px'
      }}>
        <span style={{
          color: '#323130',
          fontSize: '14px',
          lineHeight: '20px'
        }}>
          {option.text}
        </span>
        {this.props.showPreview && (
          <span 
            style={{ 
              fontFamily: fontValue,
              fontSize: '12px',
              color: '#605e5c',
              lineHeight: '16px'
            }}
          >
            Sample text preview
          </span>
        )}
      </div>
    );
  };

  public render(): React.ReactElement<IPropertyFieldBrandFontPickerHostProps> {
    const { label, disabled } = this.props;
    const { loading, fontTokens, selectedToken, errorMessage } = this.state;

    // Group font tokens by category and convert to dropdown options
    const options: IDropdownOption[] = [];
    
    // Group fonts by category
    const categorizedFonts = {
      site: fontTokens.filter(token => token.category === 'site'),
      microsoft: fontTokens.filter(token => token.category === 'microsoft')
    };

    // Add "From this site" section
    if (categorizedFonts.site.length > 0) {
      options.push({
        key: 'site-header',
        text: 'From this site',
        itemType: DropdownMenuItemType.Header
      });
      categorizedFonts.site.forEach(token => {
        options.push({
          key: token.name,
          text: token.displayName
        });
      });
    }

    // Add "From Microsoft" section
    if (categorizedFonts.microsoft.length > 0) {
      options.push({
        key: 'microsoft-header',
        text: 'From Microsoft',
        itemType: DropdownMenuItemType.Header
      });
      categorizedFonts.microsoft.forEach(token => {
        options.push({
          key: token.name,
          text: token.displayName
        });
      });
    }

    const selectedKey = selectedToken ? selectedToken.name : undefined;

    const dropdownStyles: Partial<IDropdownStyles> = {
      dropdown: { 
        width: '100%'
      },
      title: {
        height: '40px',
        lineHeight: '40px'
      },
      callout: {
        maxHeight: '300px'
      }
    };

    return (
      <div>
        {label && <Label>{label}</Label>}
        
        {loading && (
          <div style={{ padding: '10px 0' }}>
            <Spinner size={SpinnerSize.small} label="Loading font tokens..." />
          </div>
        )}

        {errorMessage && (
          <MessageBar messageBarType={MessageBarType.error} style={{ marginBottom: '10px' }}>
            {errorMessage}
          </MessageBar>
        )}

        {!loading && !errorMessage && (
          <Dropdown
            options={options}
            selectedKey={selectedKey}
            onChange={this.onSelectionChanged}
            disabled={disabled}
            placeholder="Select a font..."
            styles={dropdownStyles}
            onRenderOption={this.props.showPreview ? this.onRenderOption : undefined}
            onRenderTitle={this.props.showPreview ? this.onRenderTitle : undefined}
          />
        )}
      </div>
    );
  }
}
