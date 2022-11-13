import { Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
import * as React from "react";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRef, useState } from "react";
import BuilderTab from "./tabs/BuilderTab";
import CodeTab from "./tabs/CodeTab";
import { DrawerComponent, RefDrawer } from "./components/editDrower/DrawerComponent";

export type layoutViewType = {
  id:string,
  type:string
}[][]

enum BuilderTabEnum  {
  BUILDER = "builder",
  CODE = "code"
}

export const Index5Builder = () => {
  const [layoutView,setLayoutView] = useState<layoutViewType>([]);
  const [selectedTab,setSelectedTab] = useState<BuilderTabEnum>(BuilderTabEnum.BUILDER)

  return (
    <Grid container justifyContent={"center"} justifyItems={"center"} spacing={2} >
      <Grid item xs={12} style={{textAlign:"center"}}>
        <Typography variant={"h3"} marginBottom={"32px"}> Code Builder </Typography>
      </Grid>
      <Grid item xs={12}>
        <Tabs
          centered
          value={selectedTab}
          onChange={(event,newValue)=>{
            setSelectedTab(newValue)
          }}
        >
          <Tab value={BuilderTabEnum.BUILDER} label="Builder" />
          <Grid sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <KeyboardDoubleArrowRightIcon fontSize={"large"}/>
          </Grid>
          <Tab value={BuilderTabEnum.CODE} label="Code / View"  disabled={layoutView.length === 0}/>
        </Tabs>
        <Divider/>
      </Grid>
      <Grid sx={{minHeight:"540px",width:"100%"}}>
        <Grid sx={{display:selectedTab === BuilderTabEnum.BUILDER ?"block":"none"}}>
          <BuilderTab layoutView={layoutView} setLayoutView={setLayoutView} />
        </Grid>
        <Grid sx={{display:selectedTab === BuilderTabEnum.CODE ?"block":"none"}}>
          <CodeTab layoutView={layoutView}/>
        </Grid>
      </Grid>

    </Grid>
  )
}
