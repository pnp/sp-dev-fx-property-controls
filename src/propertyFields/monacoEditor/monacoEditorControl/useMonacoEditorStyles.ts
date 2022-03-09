import React from 'react';

import { mergeStyleSets } from 'office-ui-fabric-react';

export const useMonacoEditorStyles = () => {
  const controlClasses =  React.useMemo(() =>{
      return mergeStyleSets({
        containerStyles:{
          height: "90vh",
        }
      });
  },[]);

  return {controlClasses };
};
