import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import React from "react";

type TextViewSkeletonProps = {
  hasHelper: boolean;
  height?: number;
};

type GroupViewSkeletonProps = {
  hasHelper: boolean;
};

const roundedRectSX = {
  borderRadius: "8px",
};

const helperTextSX = {
  marginLeft: "10px",
  marginTop: "2px",
};

export const TextViewSkeleton = (props: TextViewSkeletonProps) => {
  return (
    <>
      <Skeleton
        variant="rectangular"
        animation="wave"
        height={props.height || 56}
        sx={roundedRectSX}
      />
      {props.hasHelper && (
        <Skeleton animation="wave" width={150} sx={helperTextSX} />
      )}
    </>
  );
};

export const GroupViewSkeleton = ({ hasHelper }: GroupViewSkeletonProps) => {
  return (
    <>
      <Skeleton animation="wave" width={150} />
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Skeleton variant="rectangular" animation="wave" sx={roundedRectSX} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton variant="rectangular" animation="wave" sx={roundedRectSX} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton variant="rectangular" animation="wave" sx={roundedRectSX} />
        </Grid>
      </Grid>
      {hasHelper && <Skeleton animation="wave" width={150} sx={helperTextSX} />}
    </>
  );
};

export const AvatarViewSkeleton = ({
  hasHelper,
  height,
}: TextViewSkeletonProps) => {
  return (
    <Grid
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Skeleton
        variant="circular"
        animation="wave"
        width={height || 126}
        height={height || 126}
      />
      {hasHelper && (
        <>
          <Skeleton
            animation="wave"
            width={150}
            sx={{ ...helperTextSX, marginTop: 2 }}
          />
          <Skeleton animation="wave" width={100} sx={helperTextSX} />
        </>
      )}
    </Grid>
  );
};
