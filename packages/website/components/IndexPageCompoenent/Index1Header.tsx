import * as React from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";


export const Index1Header = () => {
  return (
    <Grid container alignItems={"center"} sx={{height:"550px"}}>
      <Grid item  xs={6}>
        <Typography variant={"h1"} sx={{fontSize:"60",fontWeight:"800"}}>Formalite</Typography>
        <Typography variant={"subtitle1"} sx={{fontSize:"20"}}>A fast way to create MUI form</Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="left"
          spacing={2}
          mt={4}
        >
          <Link href="https://formalite-docs.novin.dev" target="_blank">
            <Button size={"large"} variant="contained">Document Page</Button>
          </Link>
          <Link href="https://github.com/novin-develop/formalite" target="_blank">
            <Button size={"large"} color={"primary"} variant={"outlined"}>Github</Button>
          </Link>
        </Stack>
      </Grid>
      <Grid item xs={6} sx={{textAlign:"right"}}>
        <IntegrationInstructionsIcon color={"primary"} sx={{width:"150px",height:"150px"}} />
      </Grid>
    </Grid>
  )
}
