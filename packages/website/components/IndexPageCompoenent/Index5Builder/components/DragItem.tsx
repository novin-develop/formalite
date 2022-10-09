import { Card, Grid, Stack, Typography } from "@mui/material";
import ShortTextIcon from "@mui/icons-material/ShortText";
import * as React from "react";

type DragItemProps = {
  text: string,
  icon: JSX.Element
}

export const DragItem = (props:DragItemProps) => {
  return (
    <Card sx={{p:2,flexShrink:0,cursor:"pointer"}}>
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
  )
}
