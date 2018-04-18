import * as React from 'react';


/**
 * Custom rendering example for PropertyFieldOrder
 */
export const orderedItem = (item:any, index:number): JSX.Element => {
	return (
		<span>
			<i className={"ms-Icon ms-Icon--" + item.iconName} style={{paddingRight:'4px'}}/>
			{item.text}
		</span>
	);
};