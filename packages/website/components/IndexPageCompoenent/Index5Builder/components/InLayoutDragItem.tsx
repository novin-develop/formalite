import ShortTextIcon from "@mui/icons-material/ShortText";
import { DragItem } from "./DragItem";
import * as React from "react";
import { Grid } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { ReactNode } from "react";
import HdrAutoIcon from "@mui/icons-material/HdrAuto";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DateRangeIcon from "@mui/icons-material/DateRange";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import PanoramaIcon from "@mui/icons-material/Panorama";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import TitleIcon from "@mui/icons-material/Title";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";


const InLayoutDragItem = (props:{type:string,id:string}) => {
  const num = parseInt(props.id.split("_")[0])*1000 + parseInt(props.id.split("_")[1])*100;
    switch (props.type.split(".")[0]) {
      case "TextView":
        return (
          <Wrapper>
            <DragItem num={num+1} icon={<ShortTextIcon color={"primary"}/>} text={"TextView"}/>
          </Wrapper>
        )
      case "Check Group":
        return (
          <Wrapper>
            <DragItem num={num+2} icon={<CheckBoxIcon color={"primary"}/>} text={"Check Group"}/>
          </Wrapper>
        )
      case "Auto Complete":
        return (
          <Wrapper>
            <DragItem num={num+3} icon={<HdrAutoIcon color={"primary"}/>} text={"Auto Complete"}/>
          </Wrapper>
        )
      case "Big Radio Group":
        return (
          <Wrapper>
            <DragItem num={num+4} icon={<RadioButtonCheckedIcon color={"primary"}/>} text={"Big Radio Group"}/>
          </Wrapper>
        )
      case "Card Number":
        return (
          <Wrapper>
            <DragItem num={num+5} icon={<CreditCardIcon color={"primary"}/>} text={"Card Number"}/>
          </Wrapper>
        )
      case "Color Picker":
        return (
          <Wrapper>
            <DragItem num={num+6} icon={<CreditCardIcon color={"primary"}/>} text={"Color Picker"}/>
          </Wrapper>
        )
      case "Date Picker":
        return (
          <Wrapper>
            <DragItem num={num+8} icon={<CalendarMonthIcon color={"primary"}/>} text={"Date Picker"}/>
          </Wrapper>
        )
      case "Date Time Picker":
        return (
          <Wrapper>
            <DragItem num={num+9} icon={<DateRangeIcon color={"primary"}/>} text={"Date Time Picker"}/>
          </Wrapper>
        )
      case "Time Picker":
        return (
          <Wrapper>
            <DragItem num={num+10} icon={<QueryBuilderIcon color={"primary"}/>} text={"Time Picker"}/>
          </Wrapper>
        )
      case "Avatar DropZone":
        return (
          <Wrapper>
            <DragItem num={num+11} icon={<AccountCircleIcon color={"primary"}/>} text={"Avatar DropZone"}/>
          </Wrapper>
        )
      case "Multi DropZone":
        return (
          <Wrapper>
            <DragItem num={num+12} icon={<PermMediaIcon color={"primary"}/>} text={"Multi DropZone"}/>
          </Wrapper>
        )
      case "Single DropZone":
        return (
          <Wrapper>
            <DragItem num={num+13} icon={<PanoramaIcon color={"primary"}/>} text={"Single DropZone"}/>
          </Wrapper>
        )
      case "Text DropZone":
        return (
          <Wrapper>
            <DragItem num={num+14} icon={<ArtTrackIcon color={"primary"}/>} text={"Text DropZone"}/>
          </Wrapper>
        )
      case "Editor":
        return (
          <Wrapper>
            <DragItem num={num+15} icon={<TitleIcon color={"primary"}/>} text={"Editor"}/>
          </Wrapper>
        )
      case "Price":
        return (
          <Wrapper>
            <DragItem num={num+17} icon={<AttachMoneyIcon color={"primary"}/>} text={"Price"}/>
          </Wrapper>
        )
      case "Radio Group":
        return (
          <Wrapper>
            <DragItem num={num+18} icon={<RadioButtonUncheckedIcon color={"primary"}/>} text={"Radio Group"}/>
          </Wrapper>
        )
      case "Select":
        return (
          <Wrapper>
            <DragItem num={num+20} icon={<ArrowDropDownCircleIcon color={"primary"}/>} text={"Select"}/>
          </Wrapper>
        )
      case "Switch Group":
        return (
          <Wrapper>
            <DragItem num={num+21} icon={<ToggleOnIcon color={"primary"}/>} text={"Switch Group"}/>
          </Wrapper>
        )
      default:
        return <>{props.type}</>
    }
}
export default InLayoutDragItem;

const Wrapper= (props:{children:ReactNode}) => {
  return <Grid sx={{width:"99%"}}>{props.children}</Grid>
}
