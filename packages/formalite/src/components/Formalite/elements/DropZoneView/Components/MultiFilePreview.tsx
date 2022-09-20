import React, { Fragment } from "react";
import ReplayIcon from "@mui/icons-material/Replay";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Stack,
  List,
  IconButton,
  ListItemText,
  ListItem,
  Collapse,
  CircularProgress,
  Grid,
  Fade,
  Skeleton,
} from "@mui/material";
import {
  CustomFile,
  OutsideFile,
} from "@components/Formalite/elements/DropZoneView/Components/Global.type";
import { UploadMultiFileProps } from "@components/Formalite/elements/DropZoneView/MultiDropZoneView/MultiDropZoneView.type";
import { TransitionGroup } from "react-transition-group";
import { Image } from "@components/Image";
import CloseIcon from "@mui/icons-material/Close";
import { fData } from "@components/Formalite/config/utils";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DownloadIcon from "@mui/icons-material/Download";
import {downloadBase64} from "@components/Formalite/elements/DropZoneView/utils";
// ----------------------------------------------------------------------

const getFileData = (file: CustomFile | string) => {
  if (typeof file === "string") {
    return {
      key: file,
    };
  }
  return {
    key: file.name,
    name: file.name,
    size: file.size,
    preview: file.preview,
  };
};

// ----------------------------------------------------------------------

export default function MultiFilePreview({
  showPreview = false,
  files,
  onRemove,
  setFile,
  setToFormik,
  uploadFunction,
  uploadController,
}: UploadMultiFileProps) {
  const hasFile = files.length > 0;

  const DeleteFunc = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: CustomFile | OutsideFile
  ) => {
    e.stopPropagation();
    uploadController.abort();
    setFile((pre) =>
      [...pre].map((item) => {
        if (item.uid === file.uid) {
          // eslint-disable-next-line no-param-reassign
          item.status = "deleting";
          return item;
        }
        return item;
      })
    );
    onRemove(
      file?.uid || "",
      file.original === "default",
      !file.errorText?.length
    )
      .then(() => {
        setFile((pre) => {
          const newValue = [...pre].filter((item) => item.uid !== file.uid);
          setToFormik(newValue.filter((item) => item.status !== "error"));
          return newValue;
        });
      })
      .catch((e1) => {
        setFile((pre) =>
          [...pre].map((item) => {
            if (item.uid === file.uid) {
              // eslint-disable-next-line no-param-reassign
              item.status = "error";
              // eslint-disable-next-line no-param-reassign
              item.errorText = e1.message;
              return item;
            }
            return item;
          })
        );
      });
  };

  const handleRetry = (file: CustomFile | OutsideFile) => {
    if (file.original === "selected") {
      uploadFunction(file);
    }
  };

  return (
    <>
      <List disablePadding sx={{ ...(hasFile && { my: 1 }) }}>
        <TransitionGroup>
          {/* eslint-disable-next-line sonarjs/cognitive-complexity */}
          {files.map((file, index) => {
            const { name, size, preview, progress, status, lastModified, uid } =
              file as CustomFile;
            if (showPreview) {
              return (
                <Collapse
                  key={lastModified || uid}
                  component={ListItem}
                  sx={{
                    p: 0,
                    m: 0.5,
                    width: 80,
                    height: 80,
                    borderRadius: 1.25,
                    overflow: "hidden",
                    position: "relative",
                    display: "inline-flex",
                    border: (theme) => `solid 1px ${theme.palette.divider}`,
                  }}
                >
                  <Fade in={["uploading", "deleting"].includes(status || "")}>
                    {status === "deleting" ? (
                      <CircularProgress
                        variant="indeterminate"
                        color="error"
                        sx={{
                          position: "absolute",
                          zIndex: 1,
                          top: "50%",
                          left: "50%",
                          marginLeft: "-20px",
                          marginTop: "-20px",
                        }}
                      />
                    ) : (
                      <CircularProgress
                        variant="determinate"
                        value={progress || 0}
                        sx={{
                          position: "absolute",
                          zIndex: 1,
                          top: "50%",
                          left: "50%",
                          marginLeft: "-20px",
                          marginTop: "-20px",
                        }}
                      />
                    )}
                  </Fade>
                  <Image alt="preview" src={preview} ratio="1/1" />
                  <Grid>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        DeleteFunc(e, file);
                      }}
                      sx={{
                        zIndex: 2,
                        top: 3,
                        p: "2px",
                        right: 3,
                        position: "absolute",
                        color: "common.white",
                        bgcolor: (theme) =>
                          alpha(theme.palette.grey[900], 0.72),
                        "&:hover": {
                          bgcolor: (theme) =>
                            alpha(theme.palette.grey[900], 0.48),
                        },
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    {status === "error" && (
                      <IconButton
                        size="small"
                        onClick={() => handleRetry(file)}
                        sx={{
                          zIndex: 2,
                          top: 3,
                          p: "2px",
                          left: 3,
                          position: "absolute",
                          color: "common.white",
                          bgcolor: (theme) =>
                            alpha(theme.palette.grey[900], 0.72),
                          "&:hover": {
                            bgcolor: (theme) =>
                              alpha(theme.palette.grey[900], 0.48),
                          },
                        }}
                      >
                        <ReplayIcon />
                      </IconButton>
                    )}
                  </Grid>
                </Collapse>
              );
            }

            return (
              <Collapse key={lastModified || uid}>
                {status === "downloading" ? (
                  <Skeleton
                    variant="rectangular"
                    height={54}
                    sx={{ borderRadius: 0.75, my: 1, px: 2, py: 0.75 }}
                  />
                ) : (
                <ListItem
                  sx={{
                    my: 1,
                    px: 2,
                    py: 0.75,
                    borderRadius: 0.75,
                    border: (theme) => `solid 1px ${theme.palette.divider}`,
                  }}
                >
                  <Grid
                    sx={{
                      position: "relative",
                      width: 28,
                      height: 28,
                      mr: 2,
                    }}
                  >
                    <Fade in={["uploading", "deleting"].includes(status || "")}>
                      {status === "deleting" ? (
                        <CircularProgress
                          variant="indeterminate"
                          color="error"
                          sx={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            marginTop: "-6px",
                            marginLeft: "-7px",
                          }}
                        />
                      ) : (
                        <CircularProgress
                          variant="determinate"
                          value={progress || 0}
                          sx={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            marginTop: "-6px",
                            marginLeft: "-7px",
                          }}
                        />
                      )}
                    </Fade>
                    {status === "error" ? (
                      <BrokenImageIcon
                        sx={{
                          position: "absolute",
                          color: "text.secondary",
                          width: 28,
                          height: 28,
                          left: 0,
                          right: 0,
                          top: 0,
                          bottom: 0,
                        }}
                      />
                    ) : (
                      <InsertDriveFileOutlinedIcon
                        sx={{
                          position: "absolute",
                          color: "text.secondary",
                          width: 28,
                          height: 28,
                          left: 0,
                          right: 0,
                          top: 0,
                          bottom: 0,
                        }}
                      />
                    )}
                  </Grid>

                  <ListItemText
                    primary={
                      file.original === "selected"
                        ? file.name
                        : file.originalName
                    }
                    secondary={fData(size || 0)}
                    primaryTypographyProps={{ variant: "subtitle2" }}
                    secondaryTypographyProps={{ variant: "caption" }}
                  />
                  <Stack spacing={1} direction="row-reverse">
                    {status === "error" && (
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => handleRetry(file)}
                      >
                        <ReplayIcon />
                      </IconButton>
                    )}
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={(e) => {
                        DeleteFunc(e, file);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    {status !== "error" && file.original === "default" && (
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => {
                          downloadBase64(
                            file.preview || "",
                            file.originalName || ""
                          );
                        }}
                      >
                        <DownloadIcon />
                      </IconButton>
                    )}
                  </Stack>
                </ListItem>
                )}
              </Collapse>
            );
          })}
        </TransitionGroup>
      </List>
    </>
  );
}
