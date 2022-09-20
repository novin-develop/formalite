import React from "react";
import { Box } from "@mui/material";

export const PaddingContainer = (props: { children: JSX.Element }) => (
  <Box p={3}>{props.children}</Box>
);
