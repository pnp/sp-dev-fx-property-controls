import { IPropertyFieldRuleTreeHostProps } from "..";

export interface ITreeViewerProps extends IPropertyFieldRuleTreeHostProps {
  fOnSave: (items: any[]) => void;
  fOnClose: () => void;
}
