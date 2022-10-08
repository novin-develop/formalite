import { BaseViewType, ViewTypes } from "@components/Formalite/Formalite.type";

export interface ComponentViewType extends BaseViewType {
  type: ViewTypes.ComponentView;

  /**
   * A callback function that return a React component or jsx element
   */
  render: (
    /**
     * name of input in form to validate and error
     */
    name: string,
    /**
     * value of input
     */
    value: any,
    /**
     * onChange function, set value to Frmalite
     */
    onChange: (value: any) => void,
    /**
     * string of error
     */
    error: string,
    /**
     * shows is component touched
     */
    isTouched: boolean
  ) => JSX.Element;

  /**
   * use this for dependant fields
   */
  dependency?: string;
}
