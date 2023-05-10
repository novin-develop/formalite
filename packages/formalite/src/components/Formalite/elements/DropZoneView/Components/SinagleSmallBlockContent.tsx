import { Box, Fade, Grid, LinearProgress } from "@mui/material";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";
import React, { Dispatch, SetStateAction } from "react";
import { useI18nContext } from "@components/base/I18nProvider";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";
import DownloadIcon from "@mui/icons-material/Download";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import { Image } from "@components/Image";
import { CustomFile, OutsideFile } from "@components/Formalite";
import { downloadBase64 } from "@components/Formalite/elements/DropZoneView/utils";
import {
  FileIcon,
  HelperSection,
} from "@components/Formalite/elements/DropZoneView/Components/BlockContent";

type SingleSmallBlockContentProps = {
  file: CustomFile | OutsideFile | null;
  onDelete?: (
    id: string,
    isFromDefault: boolean,
    isSuccess: boolean
  ) => Promise<void>;
  setFile: Dispatch<SetStateAction<(CustomFile | OutsideFile)[]>>;
  resetDropZone: () => void;
  required: boolean;
  uploadFunction: (file: CustomFile) => void;
  uploadController?: AbortController;
};

const SingleSmallBlockContent = (props: SingleSmallBlockContentProps) => {
  const { t } = useI18nContext();

  return (
    <Grid container>
      <Grid
        item
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.file ? (
          <Box width={110} sx={{ position: "relative" }}>
            <Box
              sx={(theme) => ({
                position: "absolute",
                top: "-5px",
                right: "-5px",
                borderRadius: "6px",
                background: theme.palette.error.main,
                width: "24px",
                color: "white",
                height: "24px",
                zIndex: 5,
                "&:hover": {
                  background: theme.palette.error.dark,
                  cursor: "pointer",
                },
              })}
              onClick={(e) => {
                e.stopPropagation();
                props.uploadController?.abort();
                props.setFile((pre) => {
                  const tempArray = [...pre];
                  if (tempArray.length) {
                    tempArray[0].status = "deleting";
                  }
                  return tempArray;
                });
                try {
                  props.file?.controller.abort();
                } catch (e1) {
                  // Do nothing
                }
                if (props.onDelete) {
                  props
                    .onDelete(
                      props.file?.uid || "",
                      props.file?.original === "default",
                      !props.file?.errorText?.length
                    )
                    .then(() => {
                      props.resetDropZone();
                      props.setFile([]);
                    })
                    .catch((e1) => {
                      props.setFile((pre) => {
                        const tempArray = [...pre];
                        if (tempArray.length && tempArray[0]?.status) {
                          tempArray[0].status = "error";
                          tempArray[0].errorText = e1.message;
                        }
                        return tempArray;
                      });
                    });
                }
              }}
            >
              <CloseIcon sx={{ padding: "4px" }} />
            </Box>
            {props.file.status === "error" && (
              <Box
                sx={(theme) => ({
                  position: "absolute",
                  top: "-5px",
                  right: "25px",
                  borderRadius: "6px",
                  background: theme.palette.info.main,
                  width: "24px",
                  color: "white",
                  height: "24px",
                  zIndex: 5,
                  "&:hover": {
                    background: theme.palette.info.dark,
                    cursor: "pointer",
                  },
                })}
                onClick={(e) => {
                  e.stopPropagation();
                  props.uploadFunction(props.file as CustomFile);
                }}
              >
                <ReplayIcon sx={{ padding: "4px" }} />
              </Box>
            )}
            {props.file.status !== "error" &&
              props.file.original === "default" && (
                <Box
                  sx={(theme) => ({
                    position: "absolute",
                    top: "-5px",
                    right: "25px",
                    borderRadius: "6px",
                    background: theme.palette.primary.main,
                    width: "24px",
                    color: "white",
                    height: "24px",
                    zIndex: 5,
                    "&:hover": {
                      background: theme.palette.primary.dark,
                      cursor: "pointer",
                    },
                  })}
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadBase64(
                      props.file?.preview || "",
                      (props.file as OutsideFile)?.originalName || ""
                    );
                  }}
                >
                  <DownloadIcon sx={{ padding: "4px" }} />
                </Box>
              )}

            {props.file.status === "error" && (
              <Box
                sx={(theme) => ({
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.5)",
                  borderRadius: "8px",
                  color: theme.palette.grey["300"],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                })}
              >
                <BrokenImageIcon fontSize="large" />
              </Box>
            )}

            <FileIcon
              type={
                (props.file.original === "selected"
                  ? props.file.name
                  : props.file.originalName
                )?.split(".")[1] || ""
              }
              preview={
                <Image
                  alt="file preview"
                  src={
                    props.file.original === "selected"
                      ? props.file.preview
                      : `${props.file.base64}`
                  }
                  sx={{
                    top: 8,
                    left: 8,
                    borderRadius: 1,
                    width: 110,
                    "&:hover": {
                      // filter: "brightness(0.72)",
                      // cursor: "pointer",
                    },
                  }}
                />
              }
            />

            {props.file?.status && (
              <Fade in={["uploading", "deleting"].includes(props.file?.status)}>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    width: "100%",
                    padding: 2,
                  }}
                >
                  {props.file?.status === "deleting" ? (
                    <LinearProgress color="error" variant="indeterminate" />
                  ) : (
                    <LinearProgress
                      variant="determinate"
                      value={
                        props.file.original === "selected"
                          ? props.file?.progress
                          : 0
                      }
                    />
                  )}
                </Box>
              </Fade>
            )}
          </Box>
        ) : (
          <UploadFileTwoToneIcon
            color="primary"
            sx={{
              width: 45,
              height: 45,
              mx: 2,
            }}
          />
        )}
      </Grid>
      <HelperSection required={props.required} file={props.file} isSmall />
    </Grid>
  );
};
export default SingleSmallBlockContent;
