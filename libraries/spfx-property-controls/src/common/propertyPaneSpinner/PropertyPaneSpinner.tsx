import * as React from "react";
import { ISpinnerProps, Spinner } from "@fluentui/react/lib/Spinner";

export const PropertyPaneSpinner: React.FC<ISpinnerProps> = (props) => {
  return (
    <Spinner style={{
              top: "50%",
              position: "relative"
            }} {...props} />
  );
};
