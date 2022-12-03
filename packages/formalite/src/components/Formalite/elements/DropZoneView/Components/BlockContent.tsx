import React, { Dispatch, SetStateAction } from "react";
// @mui
import { Box, Typography, Stack, LinearProgress, Fade } from "@mui/material";
// assets
import { Image } from "@components/Image";
import CloseIcon from "@mui/icons-material/Close";
import { fData } from "@components/Formalite/config/utils";
import {
  CustomFile,
  OutsideFile,
} from "@components/Formalite/elements/DropZoneView/Components/Global.type";
import ReplayIcon from "@mui/icons-material/Replay";
import DownloadIcon from "@mui/icons-material/Download";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import { useI18nContext } from "@components/base/I18nProvider";
import { downloadBase64 } from "@components/Formalite/elements/DropZoneView/utils";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { getExtensionFromUrl } from "@config/utils";
import DOC from "./svg/files/doc.svg";
import MP4 from "./svg/files/mp4.svg";
import PDF from "./svg/files/pdf.svg";
import ZIP from "./svg/files/zip.svg";
import FILE from "./svg/files/file.svg";

// ----------------------------------------------------------------------
const FileIcon = (props: { type: string; preview: JSX.Element }) => {
  switch (props.type.toLowerCase()) {
    case "mp4":
      return <img src={MP4 as any} alt="aa" />;
    case "doc":
    case "docs":
      return <img src={DOC as any} alt="aa" />;
    case "pdf":
      return <img src={PDF as any} alt="aa" />;
    case "zip":
    case "rar":
      return <img src={ZIP as any} alt="aa" />;
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "bmp":
    case "ico":
    case "tif":
    case "tiff":
    case "svg":
      return props.preview;
    default:
      return <img src={FILE as any} alt="aa" />;
  }
};

type BlockContentType = {
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
  isLessMd: boolean;
};

type HelperSectionType = Pick<BlockContentType, "file" | "required">;

const HelperSection = ({ required, file }: HelperSectionType) => {
  const { t } = useI18nContext();

  return (
    <Box sx={{ p: 3 }}>
      <Typography gutterBottom variant="h5">
        {file
          ? `${file.original === "selected" ? file.name : file.originalName} ${
              file?.size ? ` - ${fData(file?.size)}` : ""
            }`
          : `${t("fg-dropzone-drop-or-select-file")} ${required ? "*" : ""}`}
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {t("fg-dropzone-drop-files-here-or-click")}&nbsp;
        <Typography
          variant="body2"
          component="span"
          sx={{ color: "primary.main", textDecoration: "underline" }}
        >
          {t("fg-dropzone-browse")}
        </Typography>
        &nbsp;{t("fg-dropzone-select-thorough-your-machine")}
      </Typography>
    </Box>
  );
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function BlockContent(props: BlockContentType) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: "column", md: props.isLessMd ? "column" : "row" }}
      sx={{
        width: 1,
        textAlign: { xs: "center", md: props.isLessMd ? "center" : "left" },
      }}
    >
      {props.file ? (
        <Box width={220} sx={{ position: "relative" }}>
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
            <CloseIcon sx={{ padding: "4px", boxSizing: "border-box" }} />
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
              <ReplayIcon sx={{ padding: "4px", boxSizing: "border-box" }} />
            </Box>
          )}
          {props.file.status !== "error" && props.file.original === "default" && (
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
              <DownloadIcon sx={{ padding: "4px", boxSizing: "border-box" }} />
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
            type={getExtensionFromUrl(props.file)}
            preview={
              <Image
                alt="file preview"
                src={
                  props.file.original === "selected"
                    ? `${props.file.preview.toString()}`
                    : `${(props.file.base64 || "").toString()}`
                }
                sx={{
                  top: 8,
                  left: 8,
                  borderRadius: 1,
                  width: 220,
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
        <CloudUploadOutlinedIcon
          color="primary"
          style={{ width: "80px", height: "150px" }}
        />
      )}

      <HelperSection required={props.required} file={props.file} />
    </Stack>
  );
}
