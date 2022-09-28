import React, { Dispatch, SetStateAction } from "react";
import {
  CustomCircularProgress,
  DropZoneStyle,
  PlaceholderStyle,
  RootStyle,
} from "@components/Formalite/elements/DropZoneView/AvatarDropZoneView/elements/AvatarElement";
import { getData } from "@components/Formalite/config/utils";
import { Typography } from "@mui/material";
import { Image } from "@components/Image";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { FormikProps, FormikValues } from "formik";
import { CustomFile, OutsideFile } from "@components/Formalite";
import { DropzoneRootProps } from "react-dropzone";
import { DeleteIconButton } from "@components/Formalite/elements/DropZoneView/AvatarDropZoneView/elements/DeleteIconButton";
import { useI18nContext } from "@components/base/I18nProvider";
import { Theme } from "@mui/material/styles";

type AvatarComponentPropsType<T> = {
  formik: FormikProps<T>;
  name: string;
  file: (CustomFile | OutsideFile)[];
  uploadController: AbortController;
  setFile: Dispatch<SetStateAction<(CustomFile | OutsideFile)[]>>;
  onDelete: (
    id: string,
    isFromDefault: boolean,
    isSuccess: boolean
  ) => Promise<void>;
  getRootProps: <K extends DropzoneRootProps>(props?: K) => K;
  getInputProps: <K extends DropzoneRootProps>(props?: K) => K;
  isDragActive: boolean;
  isDragReject: boolean;
};

export const AvatarComponent = <T extends FormikValues>(
  props: AvatarComponentPropsType<T>
) => {
  const {
    isDragReject,
    formik,
    name,
    file,
    uploadController,
    setFile,
    onDelete,
    getRootProps,
    getInputProps,
    isDragActive,
  } = props;
  const { t } = useI18nContext();
  return (
    <RootStyle
      sx={{
        position: "relative",
        ...((isDragReject ||
          !!getData({ source: formik.errors, key: name })) && {
          borderColor: "error.light",
        }),
      }}
    >
      <DeleteIconButton
        name={name}
        file={file}
        uploadController={uploadController}
        setFile={setFile}
        formik={formik}
        onDelete={onDelete}
      />

      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
        }}
      >
        <input {...getInputProps()} />

        {file[0] && (
          <Image alt="avatar" src={file[0]?.preview} sx={{ zIndex: 8 }} />
        )}

        <PlaceholderStyle
          className="placeholder"
          sx={(theme: Theme) => ({
            ...(file[0] && {
              opacity: `${0}`,
              color: `${theme.palette.common.white}`,
              bgcolor: `${theme.palette.grey[900]}`,
              "&:hover": { opacity: `${0.72}` },
            }),
            ...((isDragReject ||
              !!getData({ source: formik.errors, key: name })) && {
              bgcolor: `${theme.palette.error.light}`,
            }),
          })}
        >
          <AddAPhotoIcon sx={{ width: 24, height: 24, mb: 1 }} />
          <Typography variant="caption">
            {file[0]
              ? t("avatar_dropZone_update_photo")
              : t("avatar_dropZone_upload_photo")}
          </Typography>
        </PlaceholderStyle>
      </DropZoneStyle>
      {file[0]?.status === "deleting" && (
        <CustomCircularProgress
          thickness={1}
          color="error"
          variant="indeterminate"
        />
      )}
      {file[0]?.original === "selected" && file[0].status === "uploading" && (
        <CustomCircularProgress
          thickness={1}
          variant="determinate"
          value={file[0]?.original === "selected" ? file[0]?.progress : 0}
        />
      )}
    </RootStyle>
  );
};
