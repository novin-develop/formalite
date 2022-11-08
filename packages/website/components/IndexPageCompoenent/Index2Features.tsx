import { Grid, Stack, Typography } from "@mui/material";
import * as React from "react";
import FactCheckIcon from '@mui/icons-material/FactCheckOutlined';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import CallMergeOutlinedIcon from '@mui/icons-material/CallMergeOutlined';
import ViewComfyAltOutlinedIcon from '@mui/icons-material/ViewComfyAltOutlined';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import FormatPaintOutlinedIcon from '@mui/icons-material/FormatPaintOutlined';

export const Index2Features = () => {
  return (
    <Grid container spacing={2} >
      <Grid item xs={12} md={4}>
        <Stack spacing={1} direction={"row"} alignItems={"center"}>
          <FactCheckIcon color={"primary"} />
          <Typography variant={"h6"}>Validation</Typography>
        </Stack>
        <p>
          forms can easily validate with Yup Library and prevents submitting form when form is Invalid
        </p>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={1} direction={"row"} alignItems={"center"}>
          <DeveloperBoardIcon color={"primary"} />
          <Typography variant={"h6"}>Performance</Typography>
        </Stack>
        <p>
          all components has been memoized and prevents extra renders
        </p>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={1} direction={"row"} alignItems={"center"}>
          <AutoFixHighOutlinedIcon color={"primary"} />
          <Typography variant={"h6"}>Flexibility</Typography>
        </Stack>
        <p>
          all inputs can be customized with MUI Document
        </p>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={1} direction={"row"} alignItems={"center"}>
          <CallMergeOutlinedIcon color={"primary"} />
          <Typography variant={"h6"}>Extendability</Typography>
        </Stack>
        <p>
          new components can be connected to Formalite. You can use form validation and it will submit with other Formalite inputs
        </p>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={1} direction={"row"} alignItems={"center"}>
          <ViewComfyAltOutlinedIcon color={"primary"} />
          <Typography variant={"h6"}>Design Layout</Typography>
        </Stack>
        <p>
          all inputs is inside MUI Grid and can be customized with MUI Document
        </p>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={1} direction={"row"} alignItems={"center"}>
          <DownloadForOfflineOutlinedIcon color={"primary"} />
          <Typography variant={"h6"}>Data Fetching</Typography>
        </Stack>
        <p>
          some input need data fetching from server it can be done MANUAL way or AUTOMATIC way
        </p>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={1} direction={"row"} alignItems={"center"}>
          <ChangeCircleOutlinedIcon color={"primary"} />
          <Typography variant={"h6"}>Components Overriding</Typography>
        </Stack>
        <p>
          All input in Formalite can be override with Custom Components
        </p>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={1} direction={"row"} alignItems={"center"}>
          <LanguageOutlinedIcon color={"primary"}/>
          <Typography variant={"h6"}>Localization</Typography>
        </Stack>
        <p>
          All Words are used by formalite can be override (default support language are EN and FA )
        </p>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={1} direction={"row"} alignItems={"center"}>
          <FormatPaintOutlinedIcon color={"primary"} />
          <Typography variant={"h6"}>Theming</Typography>
        </Stack>
        <p>
          By Wrapping Formalite in MUI ThemeProvider MUI theme will apply to it
        </p>
      </Grid>
    </Grid>
  )
}
