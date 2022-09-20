import React, { ReactNode } from "react";
import { Grid } from "@mui/material";

type FeaturesProps = {
  children: ReactNode[];
};

const Features = (props: FeaturesProps) => {
  return (
    <Grid container spacing={2}>
      {props.children.map((item) => (
        <Grid item xs={12} md={4}>
          {item}
        </Grid>
      ))}
    </Grid>
  );
};
export default Features;
