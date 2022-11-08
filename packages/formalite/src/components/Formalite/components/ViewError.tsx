import React from "react";
import { Box, FormLabel, IconButton, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { useI18nContext } from "@components/base/I18nProvider";

interface ViewErrorProps {
  label: React.ReactNode;
  error: Error | undefined;
  reloadFunction: () => void;
}

const ViewError = (props: ViewErrorProps) => {
  const { label, error, reloadFunction } = props;
  const { t } = useI18nContext();
  const handleClick = () => reloadFunction();
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box>
        <FormLabel>{label}</FormLabel>
        <Typography sx={(theme) => ({ color: theme.palette.error.main })}>
          {error?.message || t("general_something_went_wrong")}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <IconButton onClick={handleClick}>
          <ReplayIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default React.memo(ViewError);
