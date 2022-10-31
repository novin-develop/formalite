import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, ButtonBase, Card, ClickAwayListener, Divider, Grid, Stack, Typography } from "@mui/material";
import * as React from "react";

type AddLayoutButtonProps = {
  onLayoutSelected:(value:number) => void
}

const AddLayoutButton = ({onLayoutSelected}:AddLayoutButtonProps) => {
  const [addLayout,setAddLayout] = useState<boolean>(false);
  if (!addLayout) {
    return (
      <Button
        variant={"contained"}
        fullWidth
        color={"secondary"}
        startIcon={<AddIcon />}
        onClick={()=>setAddLayout(true)}>
        Add item in Row
      </Button>
    )
  }else {
    return (
      <ClickAwayListener onClickAway={()=>{
        setAddLayout(false)
      }}>
        <Card>
          <Stack direction={"row"} sx={{height:"70px"}} divider={<Divider orientation="vertical" flexItem sx={{width:"8px"}} />}>
            <Grid item xs={3} spacing={1}>
              <ButtonBase component="div" sx={{height:"100%",width:"100%"}} onClick={()=> {
                setAddLayout(false);
                onLayoutSelected(1)
              }}>
                <Stack spacing={1} direction={"row"} sx={{height:"100%",width:"100%",p:1}}>
                  <LayoutViewBtnItem />
                </Stack>
              </ButtonBase>
            </Grid >
            <Grid item xs={3}>
              <ButtonBase component="div" sx={{height:"100%",width:"100%"}} onClick={()=> {
                setAddLayout(false);
                onLayoutSelected(2)
              }}>
                <Stack spacing={1} direction={"row"} sx={{height:"100%",width:"100%",p:1}}>
                  <LayoutViewBtnItem />
                  <LayoutViewBtnItem />
                </Stack>
              </ButtonBase>
            </Grid>
            <Grid item xs={3}>
              <ButtonBase component="div" sx={{height:"100%",width:"100%"}} onClick={()=> {
                setAddLayout(false);
                onLayoutSelected(3)
              }}>
                <Stack spacing={1} direction={"row"} sx={{height:"100%",width:"100%",p:1}}>
                  <LayoutViewBtnItem />
                  <LayoutViewBtnItem />
                  <LayoutViewBtnItem />
                </Stack>
              </ButtonBase>
            </Grid>
            <Grid item xs={3}>
              <ButtonBase component="div" sx={{height:"100%",width:"100%"}} onClick={()=> {
                setAddLayout(false);
                onLayoutSelected(4)
              }}>
                <Stack spacing={1} direction={"row"} sx={{height:"100%",width:"100%",p:1}}>
                  <LayoutViewBtnItem />
                  <LayoutViewBtnItem />
                  <LayoutViewBtnItem />
                  <LayoutViewBtnItem />
                </Stack>
              </ButtonBase>
            </Grid>
          </Stack>
        </Card>
      </ClickAwayListener>
    )
  }
}

export default AddLayoutButton;

const LayoutViewBtnItem = () => (
  <Grid
    sx={theme=>({
      background:theme.palette.grey[400],
      width:"100%",
      border:"dashed 1px gray",
      borderRadius:"8px",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      color:theme.palette.grey[500]
    })}>
    <Typography variant={"subtitle2"}>
      view
    </Typography>
  </Grid>
)
