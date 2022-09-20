import { BaseViewType, MainType, ViewTypes } from "../../Formalite.type";

export interface RepeaterViewType extends BaseViewType {
  type: ViewTypes.RepeaterView;

  /**
   * An object of children that repeater accepts
   * @extends MainType
   */
  options: MainType;

  /**
   * Text of the add new repeater button
   */
  buttonText?: string;

  /**
   * remove the add new repeater button
   */
  removeAddBtn?: boolean;

  /**
   * remove the add new repeater button
   */
  disableOfRemoveFunction?: (item: Object) => boolean;
}
