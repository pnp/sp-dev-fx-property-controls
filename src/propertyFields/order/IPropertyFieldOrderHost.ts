/**
 * PropertyFieldOrderHost properties interface
 */
export interface IPropertyFieldOrderHostProps {
	label: string;
	disabled: boolean;
	items: Array<any>;
	textProperty?: string;
	moveUpIconName: string;
	moveDownIconName: string;
	disableDragAndDrop: boolean;
	removeArrows: boolean;
	maxHeight?: number;
	valueChanged: (newValue:Array<any>) => void;
	onRenderItem?: (item:any, index:number) => JSX.Element;
}

/**
 * PropertyFieldOrderHost state interface
 */
export interface IPropertyFieldOrderHostState {
	items: Array<any>;
}
