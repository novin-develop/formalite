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
      const nameType = `${realType.replaceAll(" ","")}_${innerItem.id}`
      if (["Check Group","Switch Group","Auto Complete"].includes(realType)){
        result += `\n\t${nameType}: Yup.array().required().min(1),`
      }else if (["Multi DropZone","Avatar DropZone","Single DropZone"].includes(realType)){
        result += `\n\t${nameType}: Yup.array().of(Yup.mixed()).min(1),`
      }else if ( realType === "Text DropZone") {
        result += `\n\t${nameType}: Yup.object({
      text: Yup.string().required("Required"),
      files: Yup.array().min(1),
    }),`
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
      const nameType = `${realType.replaceAll(" ","")}_${innerItem.id}`
      if (["Check Group","Switch Group","Auto Complete"].includes(realType)) {
        result += `\n\t${nameType}: [],`
      }else if(["Multi DropZone","Avatar DropZone","Single DropZone"].includes(realType)){
        result += `\n\t${nameType}: [{
      preview: "https://picsum.photos/200",
      uid: "123",
    }],`
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
  fillFormString(layoutView).forEach(item => {
    item.map(innerItem => {
      const realType= innerItem.type.split(".")[0]
      const nameType = `${realType.replaceAll(" ","")}_${innerItem.id}`
      result += getDefaultFormString(realType,nameType,item.length);
    })
  })
  return `{${result}
 }`
}

const getDefaultFormString = (type:string,name:string,countInRow:number) => {
  switch (type) {
    case "TextView":
      return `\n\t${name}: {
      type: ViewTypes.TextView,
      layoutProps: {
        sm: ${12/countInRow},
        xs: 12,
      },
      inputProps: {
        label: "Text View",
      },
    },`
    case "Check Group":
      return `\n\t${name}: {
        type: ViewTypes.CheckGroupView,
        layoutProps: {
          sm: ${12/countInRow},
          xs: 12,
        },
        dataFetching: {
          type: FetchingDataEnum.MANUAL,
          loading: false,
          error: false,
          onRetry: () => {},
          data: {
            one: {
              label: "one",
              description: "This is desc",
              additionalData: {
                x: 1,
                y: 2,
              },
            },
            two: {
              label: "two",
              description: "that is desc",
            },
          },
        },
        inputProps: {
          label: "Check Group View",
        },
      },`
    case "Auto Complete":
      return `\n\t${name}: {
        type: ViewTypes.AutoCompleteView,
        layoutProps: {
          sm: ${12/countInRow},
          xs: 12,
        },
        inputProps: {
          label: "Title of Auto Complete",
          helperText: "Helper text",
        },
        autoCompleteProps: {
          freeSolo: true,
          multiple: true,
        },
        dataFetching: {
          type: FetchingDataEnum.MANUAL,
          loading: false,
          error: false,
          onRetry: () => {},
          data: {
            one: {
              label: "one",
            },
            two: {
              label: "two",
            },
          },
        },
      },`
    case "Big Radio Group":
      return `\n\t${name}: {
        type: ViewTypes.BigRadioGroupView,
        layoutProps: {
          sm: ${12/countInRow},
          xs: 12,
        },
        dataFetching: {
          type: FetchingDataEnum.MANUAL,
          loading: false,
          error: false,
          onRetry: () => {},
          data: {
            one: {
              label: "one",
              description: "This is desc",
              additionalData: {
                x: 1,
                y: 2,
              },
            },
            two: {
              label: "two",
              description: "that is desc",
            },
          },
        },
        inputProps: {
          helperText: "BigRadioGroupView helperText",
        },
      },`
    case "Card Number":
      return `\n\t${name}: {
        type: ViewTypes.CardNumberView,
        layoutProps: {
          sm: ${12/countInRow},
          xs: 12,
        },
        mask: "000 000",
        inputProps: {
          label: "Card Number",
        },
      },`
    case "Color Picker":
      return `\n\t${name}: {
        type: ViewTypes.ColorPickerView,
        layoutProps: {
          sm: ${12/countInRow},
          xs: 12,
        },
        inputProps: {
          label: "Color",
          helperText: "helper text",
        },
      },`
    case "Date Picker":
      return `\n\t${name}: {
        type: ViewTypes.DatePickerView,
        layoutProps: {
          sm: ${12/countInRow},
          xs: 12,
        },
        inputProps: {
          label: "Date Picker",
          helperText: "helper text",
        },
      },`
    case "Date Time Picker":
      return `\n\t${name}: {
        type: ViewTypes.DateTimePickerView,
        layoutProps: {
          sm: ${12/countInRow},
          xs: 12,
        },
        inputProps: {
          label: "Date Time Picker",
          helperText: "helper text",
        },
      },`
    case "Time Picker":
      return `\n\t${name}: {
        type: ViewTypes.TimePickerView,
        layoutProps: {
          sm: ${12/countInRow},
          xs: 12,
        },
        inputProps: {
          label: "Time Picker",
          helperText: "helper text",
        },
      },`

    // second Column
    case "Avatar DropZone":
      return `\n\t${name}: {
        type: ViewTypes.AvatarDropZoneView,
        layoutProps: {
          sm: ${12/countInRow},
          xs: 12,
        },
        inputProps: {
          label: "Avatar",
          dropZoneOptions: {
            maxSize: 3145728,
          },
          helperText: "Allowed *.jpeg, *.jpg, *.png, *.gif",
        },
        showPreview: false,
        imageDownloader,
        onUpload: (file, progress) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              progress(50);
            }, 1000);
            setTimeout(() => {
              progress(35);
            }, 500);
            setTimeout(() => {
              progress(70);
            }, 1000);
            setTimeout(() => {
              progress(100);
            }, 1500);
            setTimeout(() => {
              resolve(new Date().getTime().toString());
              // reject(new Error("aaaa"));
            }, 1700);
          }),
        onDelete: (id, isFromDefault, isSuccess) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          }),
      },`
    case "Multi DropZone":
      return `\n\t${name}: {
        type: ViewTypes.MultiDropZoneView,
        layoutProps: {
          sm: ${12/countInRow},
          xs: 12,
        },
        inputProps: {
          label: "MultiDropZone",
          dropZoneOptions: {
            maxSize: 3145728,
          },
          helperText: \`Allowed *.jpeg, *.jpg, *.png, *.gif\`,
        },
        showPreview: false,
        imageDownloader,
        onUpload: (file, progress) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              progress(50);
            }, 1000);
            setTimeout(() => {
              // resolve(new Date().getTime().toString());
              reject(new Error("aaaa"));
            }, 2000);
          }),
        onDelete: (id, isFromDefault, isSuccess) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          }),
      },`
    case "Single DropZone":
      return `\n\t${name}: {
        type: ViewTypes.SingleDropZoneView,
        layoutProps: {
          sm: ${12/countInRow},
          xs: 12,
        },
        inputProps: {
          label: "singleDropZone",
          dropZoneOptions: {
            maxSize: 3145728,
            accept: {
              "image/png": [".png"],
            },
          },
          helperText: "Allowed *.jpeg, *.jpg, *.png, *.gif",
        },
        imageDownloader,
        onUpload: (file, progress) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              progress(50);
            }, 1000);
            setTimeout(() => {
              resolve(new Date().getTime().toString());
              // reject(new Error("aaaa"));
            }, 2000);
          }),
        onDelete: (id, isFromDefault, isSuccess) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          }),
      },`
    case "Text DropZone" :
      return `\n\t${name}: {
        type: ViewTypes.TextDropZoneView,
        layoutProps: {
          sm: ${12/countInRow},
          xs: 12,
        },
        inputProps: {
          label: "Text DropZone",
          placeholder: "Text DropZone",
          dropZoneOptions: {
            maxSize: 3145728,
          },
          multiline: true,
          rows: 4,
          helperText: \`Allowed *.jpeg, *.jpg, *.png, *.gif\`,
        },
        showPreview: false,
        imageDownloader,
        onUpload: (file, progress) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              progress(50);
            }, 1000);
            setTimeout(() => {
              resolve(new Date().getTime().toString());
              // reject(new Error("aaaa"));
            }, 2000);
          }),
        onDelete: (id, isFromDefault, isSuccess) =>
          new Promise((resolve, reject) => {
            console.log(isSuccess);
            setTimeout(() => {
              resolve();
            }, 2000);
          }),
      },`
    case "Editor" :
      return `\n\t${name}: {
        type: ViewTypes.EditorView,
        layoutProps: {
          sm: ${12/countInRow},
          xs: 12,
        },
        editorProps: {
          isToolbarSimple: false,
          label: "Editor",
          helperText: "helper text",
          placeholder: "Placeholder...",
        },
      },`
    case "Price" :
      return `\n\t${name}: {
        type: ViewTypes.PriceView,
        layoutProps: {
          sm: ${12/countInRow},
          xs: 12,
        },
        numberFormatProps: {
          allowNegative: false,
        },
        inputProps: {
          label: "Price",
        },
      },`
    case "Radio Group":
      return `\n\t${name}: {
        type: ViewTypes.RadioGroupView,
        layoutProps: {
          sm: ${12/countInRow},
          xs: 12,
        },
        dataFetching: {
          type: FetchingDataEnum.MANUAL,
          loading: false,
          error: false,
          onRetry: () => {},
          data: {
            one: {
              label: "one",
              additionalData: {
                x: 1,
                y: 2,
              },
            },
            two: {
              label: "two",
            },
          },
        },
        inputProps: {
          label: "Radio Group",
        },
      },`
    case "Select":
      return `\n\t${name}: {
        type: ViewTypes.SelectView,
        layoutProps: {
          sm: ${12/countInRow},
          xs: 12,
        },
        inputProps: {
          label: "SelectView",
          helperText: "SelectView helper",
        },
        dataFetching: {
          type: FetchingDataEnum.MANUAL,
          loading: false,
          error: false,
          onRetry: () => {},
          data: {
            one: {
              label: "One",
            },
            two: {
              label: "Two",
            },
          },
        },
      },`
    case "Switch Group" :
      return `\n\t${name}: {
        type: ViewTypes.SwitchGroupView,
        layoutProps: {
          sm: ${12/countInRow},
          xs: 12,
        },
        dataFetching: {
          type: FetchingDataEnum.MANUAL,
          loading: false,
          error: false,
          onRetry: () => {},
          data: {
            one: {
              label: "one",
            },
            two: {
              label: "two",
            },
          },
        },
        inputProps: {
          label: "SwitchGroupView",
        },
      },`
    case "Component View":
      return `\n\t${name}: {
        type: ViewTypes.ComponentView,
        layoutProps: {
          sm: ${12/countInRow},
          xs: 12,
        },
        render: (name, value, onChange, error, isTouched) => (
          <Typography sx={theme=>({ border: \`1px solid \${theme.palette.text.primary} \`, padding: "8px",color:theme.palette.text.primary })}>
            Can Render any component
          </Typography>
        ),
      },`
    default :
      return ""
  }
}
