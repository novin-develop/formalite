import { layoutViewType } from "../Index5Builder";
import { cloneDeep, includes } from "lodash";



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
  let result = "";
  fillFormString(layoutView).forEach(item => {
    item.forEach(innerItem => {
      const realType= innerItem.type.split(".")[0]
      const nameType =  innerItem.type.replaceAll(" ","").replace(".","")
      if (["Check Group","Switch Group"].includes(realType)){
        result += `\n\t${nameType}: Yup.array().required().min(1),`
      }else if (["Multi DropZone","Avatar DropZone","Single DropZone"].includes(realType)){
        result += `\n\t${nameType}: Yup.array().of(Yup.mixed()).min(1),`
      }else if ( realType === "Text DropZone") {
        result += `\n\t${nameType}: Yup.object({
    text: Yup.string().required("Required"),
    files: Yup.array().min(1),
  })`
      }else if (realType === "Component View") {

      } else {
        result += `\n\t${nameType}: Yup.string().required(),`
      }
    })
  })
 return `{${result}
 }`
}

export const getInitialFromString = (layoutView:layoutViewType) => {
  let result = "";
  fillFormString(layoutView).forEach(item => {
    item.forEach(innerItem => {
      const realType= innerItem.type.split(".")[0]
      const nameType =  innerItem.type.replaceAll(" ","").replace(".","")
      if (["Check Group","Switch Group","Multi DropZone","Avatar DropZone","Single DropZone"].includes(realType)){
        result += `\n\t${nameType}: [],`
      }else if (["Date Picker","Date Time Picker","Time Picker"].includes(realType)){
        result += `\n\t${nameType}: null,`
      }else if ( realType === "Text DropZone") {
        result += `\n\t${nameType}: {
        text: "",
        files: [],
        },`
      }else if (realType === "Component View") {

      } else {
        result += `\n\t${nameType}: "",`
      }
    })
  })
  return `{${result}
 }`
}

export const getFromString = (layoutView:layoutViewType) => {
  let result = "";
  layoutView.forEach(item => {
    item.map(innerItem => {
      result += `\n\ttitle: {
      type: ViewTypes.TextView,
      layoutProps: {
        xs: 12,
      },
      inputProps: {
        label: "aaa",
      },
    },`
    })
  })
  return `{${result}
 }`
}
