import {
  BaseViewType,
  ViewTypes,
} from "@components/Formalite/Formalite.type";

export interface ComponentViewType extends BaseViewType {
  type: ViewTypes.ComponentView;

  /**
   * A callback function that return a React component or jsx element
   */
  render: (name: string) => JSX.Element;

  /**
   * use this for dependant fields
   */
  dependency?: string;
}
