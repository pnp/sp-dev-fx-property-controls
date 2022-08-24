import React from 'react';

import { mergeStyleSets } from 'office-ui-fabric-react';

export const useMonacoEditorStyles = () => { // eslint-disable-line @typescript-eslint/explicit-function-return-type
  const controlClasses =  React.useMemo(() =>{
      return mergeStyleSets({
        containerStyles:{
          height: "90vh",
        }
      });
  },[]);

  return {controlClasses };
};
