import {
  Box,
  Button,
  ButtonBase,
  ButtonGroup,
  Card,
  CardContent,
  ClickAwayListener,
  Divider,
  Grid,
  Stack, Tab, Tabs,
  Typography
} from "@mui/material";
import * as React from "react";
import ShortTextIcon from '@mui/icons-material/ShortText';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import HdrAutoIcon from '@mui/icons-material/HdrAuto';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import RectangleIcon from '@mui/icons-material/Rectangle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DateRangeIcon from '@mui/icons-material/DateRange';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import PanoramaIcon from '@mui/icons-material/Panorama';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import TitleIcon from '@mui/icons-material/Title';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import AddIcon from '@mui/icons-material/Add';
import PerfectScrollbar from "react-perfect-scrollbar"
import { DragDropContext,Droppable } from 'react-beautiful-dnd';
import { DragItem } from "./components/DragItem";

import 'react-perfect-scrollbar/dist/css/styles.css';
import { DropComponent } from "./components/DropComponent";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import { useState } from "react";
import AddLayoutButton from "./components/AddLayoutButton";
import InLayoutDragItem from "./components/InLayoutDragItem";
import BuilderTab from "./tabs/BuilderTab";
import CodeTab from "./tabs/CodeTab";

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
          <Tab value={BuilderTabEnum.CODE} label="Code / View" />
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
