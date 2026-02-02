import { css } from "@emotion/css";
import { tokens } from "@fluentui/react-components";

export const usePalettePickerStyles = (): {
  styles: {
    color: string;
    palettePickerContainer: string;
    optionsContainer: string;
  };
} => {
  const styles = {
    color: css({
      display: "inline-block",
      width: "20px",
      height: "20px",
      margin: "2px",
      border: `1px solid ${tokens.colorNeutralStroke1}`,
    }),
    palettePickerContainer: css({
      width: "100%",
      paddingTop: "10px",
    }),
    optionsContainer: css({
      display: "flex",
      marginTop: "0px",
      flexWrap: "wrap",
    }),
  };
  return {
    styles,
  };
};
