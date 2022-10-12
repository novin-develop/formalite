import { Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
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

export const Index5Builder = () => {
  return (
    <Grid container justifyContent={"center"} justifyItems={"center"} spacing={2}>
      <Grid item xs={12} style={{textAlign:"center"}}>
        <Typography variant={"h3"} marginBottom={"32px"}> Code Builder </Typography>
      </Grid>
      <Grid container spacing={2}>
        <DragDropContext onDragEnd={()=>{}}>
        <Grid item xs={12} md={2}>
          <PerfectScrollbar onScroll={event => event.preventDefault()}>
            <DropComponent droppableId={"source"} isDropDisabled={true} >
              <div/>
              <DragItem num={1} icon={<ShortTextIcon color={"primary"}/>} text={"TextView"}/>
              <DragItem num={2} icon={<CheckBoxIcon color={"primary"}/>} text={"Check Group View"}/>
              <DragItem num={3} icon={<HdrAutoIcon color={"primary"}/>} text={"Auto Complete View"}/>
              <DragItem num={4} icon={<RadioButtonCheckedIcon color={"primary"}/>} text={"Big Radio Group View"}/>
              <DragItem num={5} icon={<CreditCardIcon color={"primary"}/>} text={"Card Number View"}/>
              <DragItem num={6} icon={<ColorLensIcon color={"primary"}/>} text={"Color Picker View"}/>
              <DragItem num={7} icon={<RectangleIcon color={"primary"}/>} text={"Component View"}/>
              <DragItem num={8} icon={<CalendarMonthIcon color={"primary"}/>} text={"Date Picker View"}/>
              <DragItem num={9} icon={<DateRangeIcon color={"primary"}/>} text={"Date Time Picker View"}/>
              <DragItem num={10} icon={<QueryBuilderIcon color={"primary"}/>} text={"Time Picker View"}/>
            </DropComponent>
          </PerfectScrollbar>
        </Grid>
          <Grid item xs={12} md={2}>
            <PerfectScrollbar onScroll={event => event.preventDefault()}>
              <DropComponent droppableId={"source"} isDropDisabled={true} >
                <div/>
                <DragItem num={11} icon={<AccountCircleIcon color={"primary"}/>} text={"Avatar DropZone View"}/>
                <DragItem num={12} icon={<PermMediaIcon color={"primary"}/>} text={"Multi DropZone View"}/>
                <DragItem num={13} icon={<PanoramaIcon color={"primary"}/>} text={"Single DropZone View"}/>
                <DragItem num={14} icon={<ArtTrackIcon color={"primary"}/>} text={"Text DropZone View"}/>
                <DragItem num={15} icon={<TitleIcon color={"primary"}/>} text={"Editor View"}/>
                <DragItem num={17} icon={<AttachMoneyIcon color={"primary"}/>} text={"Price View"}/>
                <DragItem num={18} icon={<RadioButtonUncheckedIcon color={"primary"}/>} text={"Radio Group View"}/>
                <DragItem num={19} icon={<RepeatOnIcon color={"primary"}/>} text={"Repeater View"}/>
                <DragItem num={20} icon={<ArrowDropDownCircleIcon color={"primary"}/>} text={"Select View"}/>
                <DragItem num={21} icon={<ToggleOnIcon color={"primary"}/>} text={"Switch Group View"}/>
              </DropComponent>
            </PerfectScrollbar>
          </Grid>
        <Grid item xs={12} md={8} >
          <Grid sx={{marginTop:"15px"}}/>
            <Button
              variant={"contained"}
              fullWidth
              color={"secondary"}
              startIcon={<AddIcon />}>
              Add Layout
            </Button>
            <DropComponent droppableId={"form"}>

            </DropComponent>
          </Grid>
        </DragDropContext>
      </Grid>
    </Grid>
  )
}
