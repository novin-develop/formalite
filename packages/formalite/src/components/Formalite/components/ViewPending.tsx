import { Box, FormLabel, LinearProgress } from "@mui/material";
import React from "react";

interface ViewPendingProps {
  label: React.ReactNode;
}

const ViewPending = (props: ViewPendingProps) => {
  const { label } = props;
  return (
    <Box>
      <FormLabel>{label}</FormLabel>
      <LinearProgress
        sx={{
          margin: "8px 0",
        }}
      />
    </Box>
  );
};

export default React.memo(ViewPending);
