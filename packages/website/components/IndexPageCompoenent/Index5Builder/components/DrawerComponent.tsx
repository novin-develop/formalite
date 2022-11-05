import { Drawer } from "@mui/material";
import { Dispatch, MutableRefObject, SetStateAction, useImperativeHandle, useRef, useState } from "react";
import { layoutViewType } from "../Index5Builder";

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
      {drawerState.type}
    </Drawer>
  )
}
