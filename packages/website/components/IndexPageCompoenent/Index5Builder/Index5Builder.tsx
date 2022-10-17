import {
  Button,
  ButtonBase,
  ButtonGroup,
  Card,
  CardContent,
  ClickAwayListener,
  Divider,
  Grid,
  Stack,
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

type layoutViewType = {
  id:string,
  type:string
}[][]

export const Index5Builder = () => {
  const [layoutView,setLayoutView] = useState<layoutViewType>([]);
  const [countRow,setCountRow] = useState(1);
  return (
    <Grid container justifyContent={"center"} justifyItems={"center"} spacing={2}>
      <Grid item xs={12} style={{textAlign:"center"}}>
        <Typography variant={"h3"} marginBottom={"32px"}> Code Builder </Typography>
      </Grid>
      <Grid container spacing={2}>
        <DragDropContext onDragEnd={(result, provided)=>{
          const {source,destination,draggableId} = result;
          const id = destination?.droppableId.split(".")[1];
          if (id !== undefined ){
            setLayoutView(pre =>pre.map(item=>item.map(innerItem=>innerItem.id=== id?{...innerItem,type:draggableId}:innerItem)))
          }
        }}>
        <Grid item xs={12} md={2}>
          <PerfectScrollbar onScroll={event => event.preventDefault()}>
            <DropComponent droppableId={"source"} isDropDisabled={true} >
              <div/>
              <DragItem num={1} icon={<ShortTextIcon color={"primary"}/>} text={"TextView"}/>
              <DragItem num={2} icon={<CheckBoxIcon color={"primary"}/>} text={"Check Group"}/>
              <DragItem num={3} icon={<HdrAutoIcon color={"primary"}/>} text={"Auto Complete"}/>
              <DragItem num={4} icon={<RadioButtonCheckedIcon color={"primary"}/>} text={"Big Radio Group"}/>
              <DragItem num={5} icon={<CreditCardIcon color={"primary"}/>} text={"Card Number"}/>
              <DragItem num={6} icon={<ColorLensIcon color={"primary"}/>} text={"Color Picker"}/>
              <DragItem num={8} icon={<CalendarMonthIcon color={"primary"}/>} text={"Date Picker"}/>
              <DragItem num={9} icon={<DateRangeIcon color={"primary"}/>} text={"Date Time Picker"}/>
              <DragItem num={10} icon={<QueryBuilderIcon color={"primary"}/>} text={"Time Picker"}/>
            </DropComponent>
          </PerfectScrollbar>
        </Grid>
          <Grid item xs={12} md={2}>
            <PerfectScrollbar onScroll={event => event.preventDefault()}>
              <DropComponent droppableId={"source"} isDropDisabled={true} >
                <div/>
                <DragItem num={11} icon={<AccountCircleIcon color={"primary"}/>} text={"Avatar DropZone"}/>
                <DragItem num={12} icon={<PermMediaIcon color={"primary"}/>} text={"Multi DropZone"}/>
                <DragItem num={13} icon={<PanoramaIcon color={"primary"}/>} text={"Single DropZone"}/>
                <DragItem num={14} icon={<ArtTrackIcon color={"primary"}/>} text={"Text DropZone"}/>
                <DragItem num={15} icon={<TitleIcon color={"primary"}/>} text={"Editor"}/>
                <DragItem num={17} icon={<AttachMoneyIcon color={"primary"}/>} text={"Price"}/>
                <DragItem num={18} icon={<RadioButtonUncheckedIcon color={"primary"}/>} text={"Radio Group"}/>
                <DragItem num={20} icon={<ArrowDropDownCircleIcon color={"primary"}/>} text={"Select"}/>
                <DragItem num={21} icon={<ToggleOnIcon color={"primary"}/>} text={"Switch Group"}/>
              </DropComponent>
            </PerfectScrollbar>
          </Grid>
        <Grid item xs={12} md={8}>
          <Grid sx={{marginTop:"15px"}}/>
          {/* start layout builder */}
          <Stack spacing={2}>
            <Stack spacing={2}>
              {
                layoutView.map((item,index)=>(
                  <Stack direction={"row"} key={`${index}`} spacing={2} width={"100%"}>
                    {item.map(innerItem=> (
                      <Grid key={innerItem.id} xs={12/item.length}>
                        <DropComponent droppableId={`drop.${innerItem.id}`}>
                          <Grid sx={theme=>({
                            background:theme.palette.grey[200],
                            width:"100%",
                            height:"46px",
                            border:"dashed 1px gray",
                            borderRadius:"4px",
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"center",
                            color:theme.palette.grey[500],
                            cursor:"pointer"
                          })} onClick={()=>{
                            if (!innerItem.type) {
                              setLayoutView(pre=>{
                                const selectedRow= pre[index];
                                if (selectedRow.length ===1){
                                  return pre.filter((item,preIndex)=>index !== preIndex)
                                }else {
                                  const temp = selectedRow.filter(item=>item.id !== innerItem.id)
                                  return  pre.map((item,preIndex) => {
                                    if (preIndex === index){
                                      return temp
                                    }else {
                                      return item
                                    }
                                  })
                                }
                              })
                            }
                          }}>
                            <InLayoutDragItem type={innerItem.type} id={innerItem.id}/>
                          </Grid>
                        </DropComponent>
                      </Grid>
                      )
                    )}
                  </Stack>
                  )
                )
              }
            </Stack>
            <AddLayoutButton
              onLayoutSelected={(value)=>{
                setLayoutView(pre=>{
                  const temp = []
                  for (let i = 0; i < value; i++) {
                    temp.push({id:`${countRow}_${i}`,type:""})
                  }
                  pre.push(temp)
                  return [...pre]
                })
                setCountRow(pre=>pre+1)
              }}
            />
          </Stack>
          </Grid>
          <Grid mx={2}>
            + <code>ComponentView</code>, <code>RepeaterView</code>, <code>GroupView</code>
          </Grid>

        </DragDropContext>
      </Grid>
    </Grid>
  )
}

