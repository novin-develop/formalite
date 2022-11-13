import { CardContent, Drawer, Grid, Stack, TextField, Typography } from "@mui/material";
import { Dispatch, MutableRefObject, SetStateAction, useImperativeHandle, useRef, useState } from "react";
import { layoutViewType } from "../../Index5Builder";

type DrawerStateType= {
  open:boolean,
  type:string
}
export type RefDrawer = {
  setDrawerState:Dispatch<SetStateAction<DrawerStateType>>
}
type DrawerComponentProps = {
  layoutView:layoutViewType
  setLayoutView:Dispatch<SetStateAction<layoutViewType>>
  drawerRef: MutableRefObject<RefDrawer | undefined>
}

export const DrawerComponent = (props:DrawerComponentProps) => {
  const [drawerState,setDrawerState] = useState<DrawerStateType>({
    open:false,
    type:"",
  });

  useImperativeHandle(props.drawerRef,()=>({
    setDrawerState
  }))

  return (
    <Drawer
      anchor={"right"}
      open={drawerState.open}
      onClose={()=>{
        setDrawerState(pre=>({
          ...pre,
          open: false,
        }))
      }}>
      <div style={{width:"350px",padding:"16px"}}>
        <Typography variant={"h5"} color={"primary"} textAlign={"center"} >
          {drawerState.type}
        </Typography>
        <hr style={{margin:"16px"}}/>
        <Stack spacing={2} overflow={"hidden auto"}>
          <TextField variant={"filled"} label={"Label"} fullWidth/>
          <TextField variant={"filled"} label={"Helper Text"} fullWidth/>
          <TextField variant={"filled"} label={"mustRegex"} fullWidth/>
          <TextField variant={"filled"} label={"renderDependency"} fullWidth/>
          <h4>inputProps</h4>
          <h4>layoutProps</h4>

        </Stack>
      </div>
    </Drawer>
  )
}
