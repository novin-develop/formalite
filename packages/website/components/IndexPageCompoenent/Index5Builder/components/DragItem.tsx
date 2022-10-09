import { Card, Grid, Stack, Typography } from "@mui/material";
import ShortTextIcon from "@mui/icons-material/ShortText";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";

type DragItemProps = {
  text: string,
  icon: JSX.Element,
  num: number
}

export const DragItem = (props:DragItemProps) => {
  return (
    <Draggable draggableId={props.text} index={props.num}>
      {(provided, snapshot) => (
        <Card sx={{p:2,flexShrink:0,cursor:"pointer"}} ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
          <Stack direction={"row"} spacing={2} alignItems={"center"} justifyContent={"center"}>
            <Grid item xs={2} sx={{display:"flex",alignItems:"center",justifyContent:"center"}} >
              {props.icon}
            </Grid>
            <Grid item xs={10}>
              <Typography variant={"body1"}>
                {props.text}
              </Typography>
            </Grid>
          </Stack>
        </Card>
      )}
    </Draggable>
  )
}
