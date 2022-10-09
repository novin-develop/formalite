import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
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
import { DragItem } from "./components/DragItem";
import PerfectScrollbar from "react-perfect-scrollbar"
import 'react-perfect-scrollbar/dist/css/styles.css';

export const Index5Builder = () => {
  return (
    <Grid container justifyContent={"center"} justifyItems={"center"} spacing={2}>
      <Grid item xs={12} style={{textAlign:"center"}}>
        <Typography variant={"h3"} marginBottom={"32px"}> Code Builder </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <PerfectScrollbar style={{height:"500px"}} onScroll={event => event.preventDefault()}>
          <Stack spacing={2}>
            <DragItem icon={<ShortTextIcon color={"primary"}/>} text={"TextView"}/>
            <DragItem icon={<CheckBoxIcon color={"primary"}/>} text={"Check Group View"}/>
            <DragItem icon={<HdrAutoIcon color={"primary"}/>} text={"Auto Complete View"}/>
            <DragItem icon={<RadioButtonCheckedIcon color={"primary"}/>} text={"Big Radio Group View"}/>
            <DragItem icon={<CreditCardIcon color={"primary"}/>} text={"Card Number View"}/>
            <DragItem icon={<ColorLensIcon color={"primary"}/>} text={"Color Picker View"}/>
            <DragItem icon={<RectangleIcon color={"primary"}/>} text={"Component View"}/>
            <DragItem icon={<CalendarMonthIcon color={"primary"}/>} text={"Date Picker View"}/>
            <DragItem icon={<DateRangeIcon color={"primary"}/>} text={"Date Time Picker View"}/>
            <DragItem icon={<QueryBuilderIcon color={"primary"}/>} text={"Time Picker View"}/>
            <DragItem icon={<AccountCircleIcon color={"primary"}/>} text={"Avatar DropZone View"}/>
            <DragItem icon={<PermMediaIcon color={"primary"}/>} text={"Multi DropZone View"}/>
            <DragItem icon={<PanoramaIcon color={"primary"}/>} text={"Single DropZone View"}/>
            <DragItem icon={<ArtTrackIcon color={"primary"}/>} text={"Text DropZone View"}/>
            <DragItem icon={<TitleIcon color={"primary"}/>} text={"Editor View"}/>
            <DragItem icon={<ViewQuiltIcon color={"primary"}/>} text={"Group View"}/>
            <DragItem icon={<AttachMoneyIcon color={"primary"}/>} text={"Price View"}/>
            <DragItem icon={<RadioButtonUncheckedIcon color={"primary"}/>} text={"Radio Group View"}/>
            <DragItem icon={<RepeatOnIcon color={"primary"}/>} text={"Repeater View"}/>
            <DragItem icon={<ArrowDropDownCircleIcon color={"primary"}/>} text={"Select View"}/>
            <DragItem icon={<ToggleOnIcon color={"primary"}/>} text={"Switch Group View"}/>
          </Stack>
          </PerfectScrollbar>
        </Grid>
        <Grid item xs={12} md={9}>
          aaa
        </Grid>
      </Grid>
    </Grid>
  )
}
