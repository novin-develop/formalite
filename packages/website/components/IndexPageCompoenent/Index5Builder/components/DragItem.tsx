import { Card, Grid, IconButton, Stack, Typography } from "@mui/material";
import ShortTextIcon from "@mui/icons-material/ShortText";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type DragItemProps = {
  text: string,
  icon: JSX.Element,
  num: number,
  isFromLayout?: boolean,
  onDelete?:()=>void
  onClick?: (type:string)=>void
}


export const DragItem = (props:DragItemProps) => {
  return (
    <Draggable draggableId={`${props.text}.${props.num}`} index={props.num}>
      {(provided, snapshot) => (
        <>
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={
              provided.draggableProps
                .style
            }
            sx={{p:1,flexShrink:0,cursor:"pointer",position:"relative",...snapshot.isDragging?{marginTop:"0!important"}:{transform:"none!important"}}}
          >

            <Stack
              direction={"row"}
              spacing={2}
              alignItems={"center"}
              justifyContent={"center"}
              >
              <Grid item xs={2} sx={{display:"flex",alignItems:"center",justifyContent:"center"}} >
                {props.icon}
              </Grid>
              <Grid item xs={10}>
                <Typography variant={"body2"}>
                  {props.text}
                </Typography>
              </Grid>
              {
                props.isFromLayout &&
                <Stack direction={"row"} spacing={1}>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    color={"primary"}
                    onClick={(event)=>{
                      event.preventDefault();
                      if (props.onClick){
                        props.onClick(props.text)
                      }
                    }}>
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    size="small"
                    color={"error"}
                    onClick={(event)=>{
                      event.preventDefault();
                      if (props.onDelete){
                        props.onDelete()
                      }
                    }}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Stack>
              }

            </Stack>
          </Card>
          {!props.isFromLayout && snapshot.isDragging && (
            <Card sx={{p:1,flexShrink:0,cursor:"pointer"}}>
              <Stack direction={"row"} spacing={2} alignItems={"center"} justifyContent={"center"}>
                <Grid item xs={2} sx={{display:"flex",alignItems:"center",justifyContent:"center"}} >
                  {props.icon}
                </Grid>
                <Grid item xs={10}>
                  <Typography variant={"body2"}>
                    {props.text}
                  </Typography>
                </Grid>
              </Stack>
            </Card>
          )}
        </>
      )}
    </Draggable>
  )
}
