import { layoutViewType } from "../Index5Builder";
import {cloneDeep} from "lodash"



export const fillFormString = (layoutView:layoutViewType) =>{
  return cloneDeep(layoutView).map(
    (item,index) =>
      item.map((innerItem,innerIndex) => {
        if (innerItem.type === ""){
          return {...innerItem,type:`Component View.${index+1}${innerIndex+1}`}
        }
        return innerItem;
      })
    )
}

export const getValidationFromString = (layoutView:layoutViewType) => {

 return "a"
}
