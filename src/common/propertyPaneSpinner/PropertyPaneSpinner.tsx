import * as React from "react";
import { ISpinnerProps, Spinner } from "office-ui-fabric-react/lib/Spinner";

export const PropertyPaneSpinner: React.SFC<ISpinnerProps> = (props) => {
  return (
    <Spinner style={{
              top: "50%",
              position: "relative"
            }} {...props} />
  );
};
