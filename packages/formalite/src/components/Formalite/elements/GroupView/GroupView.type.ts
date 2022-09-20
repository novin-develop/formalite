import { BaseViewType, MainType, ViewTypes } from "../../Formalite.type";

export interface GroupViewType extends BaseViewType {
  type: ViewTypes.GroupView;

  /**
   * An object of children that repeater accepts
   * @extends MainType
   */
  options: MainType;
}
