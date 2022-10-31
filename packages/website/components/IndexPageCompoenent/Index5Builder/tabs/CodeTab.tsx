import { Button, Grid, ThemeProvider, useTheme } from "@mui/material";
import dynamic from "next/dynamic";
import "@uiw/react-code-preview/esm/index.css"
import { layoutViewType } from "../Index5Builder";
import { Formalite as FormaliteOriginal, useFormaliteRef, ViewTypes } from "@novin-dev/formalite";
import * as Yup from "yup";
import { fillFormString, getFromString, getInitialFromString, getValidationFromString } from "./utils";

type CodeTabType ={
  layoutView:layoutViewType
}


const code = (validation:string,ini:string,formString:string) =>
`import { Button } from "@mui/material";
import { Formalite, useFormaliteRef, ViewTypes } from "@novin-dev/formalite";
import * as Yup from "yup";


const builderForm = Yup.object(${validation});

const ini =${ini}

const formString =${formString}


const MainComponent = () => {
  const formRef = useFormaliteRef()

  return (
    <div>
      <Formalite
        formString={formString}
        onSubmit={(values)=>{
          console.log(values)
        }}
        validationSchema={builderForm}
        initialValues={ini}
        formRef={formRef}
      />
    <br/>
    <Button
      type="primary"
      variant={"contained"}
      onClick={()=>{
        formRef.current.callSubmit()
      }}>
        Submit
    </Button>
  </div>
  )
}

ReactDOM.createRoot(_mount_).render(
  <MainComponent/>,
);
`;



const CodeTab = ({ layoutView }: CodeTabType) => {
  const theme = useTheme();
  console.log(fillFormString(layoutView))
  const Formalite = (props:any) => {
    return (
      <ThemeProvider theme={theme}>
        <FormaliteOriginal {...props}/>
      </ThemeProvider>
    )
  }

  const CodePreview = dynamic(
    () => import("@uiw/react-code-preview").then((mod) => mod.default),
    { ssr: false }
  );

  return (
    <Grid sx={{display:"flex",pt:6,width:"100%"}}>
      <CodePreview
        theme={theme.palette.mode}
        code={code(
          getValidationFromString(layoutView),
          getInitialFromString(layoutView),
          getFromString(layoutView)
        )}
        dependencies={{ Button,Formalite,useFormaliteRef,ViewTypes,Yup }}
        style={{display:"flex",width:"100%",minHeight:"250px"}}
      />
    </Grid>
  );

}
export default CodeTab;
