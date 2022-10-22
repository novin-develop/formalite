import { Button, Grid, useTheme } from "@mui/material";
import dynamic from "next/dynamic";
import "@uiw/react-code-preview/esm/index.css"
import { layoutViewType } from "../Index5Builder";
import { Formalite, MainType, useFormaliteRef, ViewTypes } from "@novin-dev/formalite";
import { useMemo, useRef } from "react";
import * as Yup from "yup";

type CodeTabType ={
  layoutView:layoutViewType
}


const code =
`import { Button } from "@mui/material";

ReactDOM.createRoot(_mount_).render(
  <div>
    aaa
    <br/>
    <Button type="primary" variant={"contained"}>Submit</Button>
  </div>,
);
`;
///-------------------------------
const builderForm = Yup.object({
  title: Yup.string().required(),
});
type builderFormType = Yup.InferType<typeof builderForm>;
const ini:builderFormType ={
  title:"aaa"
}
const useFrom = () => {
  return useMemo<MainType>(
    () => ({
      title: {
        type: ViewTypes.TextView,
        layoutProps: {
          xs: 12,
        },
        inputProps: {
          label: "aaa",
        },
      },
    })
  ,[])
}
///-------------------------------

const CodeTab = ({ layoutView }: CodeTabType) => {
  const theme = useTheme();
  const formRef = useFormaliteRef<builderFormType>()
  const CodePreview = dynamic(
    () => import("@uiw/react-code-preview").then((mod) => mod.default),
    { ssr: false }
  );
  const form = useFrom();


  return (
    <Grid sx={{display:"flex",pt:6,width:"100%"}}>
      <Formalite<builderFormType>
        formString={form}
        onSubmit={()=>{}}
        validationSchema={builderForm}
        initialValues={ini}
        formRef={formRef}
      />
      <CodePreview
        theme={theme.palette.mode}
        code={code}
        dependencies={{ Button }}
        style={{display:"flex",width:"100%",minHeight:"250px"}}
      />
    </Grid>
  );

}
export default CodeTab;
