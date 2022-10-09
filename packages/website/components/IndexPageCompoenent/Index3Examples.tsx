import { Grid, Typography } from "@mui/material";
import * as React from "react";


export const Index3Examples = () => {
  return (
    <Grid container justifyContent={"center"} spacing={2}>
      <Grid item xs={12} style={{textAlign:"center"}}>
        <Typography variant={"h3"} marginBottom={"32px"}> Simple Usage VS Full Usage </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <iframe src="https://codesandbox.io/embed/formalite-simple-3y170m?fontsize=14&hidenavigation=1&theme=dark"
                style={{width:"100%", height:"500px", border:0, borderRadius: "4px", overflow:"hidden"}}
                title="formalite-simple"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <iframe src="https://codesandbox.io/embed/formalite-full-66vffy?fontsize=14&hidenavigation=1&theme=dark"
                style={{width:"100%", height:"500px", border:0, borderRadius: "4px", overflow:"hidden"}}
                title="formalite-full"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
      </Grid>
    </Grid>
  )
}
