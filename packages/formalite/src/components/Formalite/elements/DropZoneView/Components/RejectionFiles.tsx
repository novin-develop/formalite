import React from "react";
import { FileRejection } from "react-dropzone";
// @mui
import { alpha } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";
// utils
import {
  CustomFile,
  OutsideFile,
} from "@components/Formalite/elements/DropZoneView/Components/Global.type";
import { fData } from "../../../config/utils";

// ----------------------------------------------------------------------

type Props = {
  fileRejections: FileRejection[];
  fileState?: CustomFile | OutsideFile;
};

export default function RejectionFiles({ fileRejections, fileState }: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 1,
        borderColor: "error.light",
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileState && fileState.errorText && (
        <Box sx={{ my: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {fileState.original === "default"
              ? fileState.originalName
              : fileState.name}{" "}
            - {fData(fileState.size || 0)}
          </Typography>
          <Typography variant="caption" component="p">
            - {fileState.errorText}
          </Typography>
        </Box>
      )}
      {fileRejections.map(({ file, errors }) => {
        return (
          <Box key={file.name} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {file.name} - {fData(file.size)}
            </Typography>
            {errors.map((error) => (
              <Typography key={error.code} variant="caption" component="p">
                - {error.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );
}
