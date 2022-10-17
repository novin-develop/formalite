import { Card, Grid, Stack, Typography } from "@mui/material";
import ShortTextIcon from "@mui/icons-material/ShortText";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "@mui/material/styles";

type DragItemProps = {
  text: string,
  icon: JSX.Element,
  num: number
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
            sx={{p:1,flexShrink:0,cursor:"pointer",...snapshot.isDragging?{marginTop:"0!important"}:{transform:"none!important"}}}
          >
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
          {snapshot.isDragging && (
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
