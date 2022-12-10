import { FormikProps, FormikValues } from "formik";
import { Language } from "@components/base/model";
import { FormControl, FormHelperText, Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { baseMemo } from "@components/Formalite/elements/Bases/functions/memo";
import { CustomFile, OutsideFile } from "@components/Formalite";
import { getData } from "@components/Formalite/config/utils";
import { useDropzone } from "react-dropzone";
import { AvatarViewSkeleton } from "@components/Formalite/elements/Bases/SkeletonBase";
import RejectionFiles from "@components/Formalite/elements/DropZoneView/Components/RejectionFiles";
import { AvatarComponent } from "@components/Formalite/elements/DropZoneView/AvatarDropZoneView/elements/AvatarComponent";
import { getNameFromUrl } from "@config/utils";
import { ObjectSchema } from "yup";
import { AvatarDropZoneViewType } from "./AvatarDropZoneView.type";

export type AvatarDropZoneViewProps<T> = {
  allData: AvatarDropZoneViewType;
  name: keyof T;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: ObjectSchema<any>;
  translator: Function;
  lang: Language;
  isUpdateMode: boolean;
  formMustRegex?: RegExp;
};

const AvatarDropZone = <T extends FormikValues>(
  props: AvatarDropZoneViewProps<T>
) => {
  const {
    allData,
    name,
    formik,
    loading,
    lang,
    validationSchema,
    translator,
    isUpdateMode,
    formMustRegex,
  } = props;
  const { onUpload, inputProps, layoutProps, onDelete, imageDownloader } =
    allData;
  const { dropZoneOptions = {}, helperText } = inputProps;
  const [file, setFile] = useState<(CustomFile | OutsideFile)[]>([]);
  const [preventDrop, setPreventDefault] = useState(false);
  const uploadController = new AbortController();

  const uploadFunction = useCallback((item: CustomFile) => {
    onUpload(
      item,
      (progress) => {
        setFile((pre) => {
          const tempArray = [...pre];
          if (
            tempArray.length &&
            tempArray[0].status &&
            tempArray[0].original === "selected"
          ) {
            tempArray[0].progress = progress;
            tempArray[0].status = "uploading";
          }
          return tempArray;
        });
      },
      uploadController
    )
      .then((resId) => {
        setFile((pre) => {
          const tempArray = [...pre];
          if (tempArray.length && tempArray[0].original === "selected") {
            tempArray[0].uid = resId;
            tempArray[0].status = "done";
            tempArray[0].progress = 100;
          }
          formik.setFieldValue(String(name), tempArray);
          return tempArray;
        });
      })
      .catch((e) => {
        setFile((pre) => {
          const tempArray = [...pre];
          if (
            tempArray.length &&
            tempArray[0].status &&
            tempArray[0].original === "selected"
          ) {
            tempArray[0].status = "error";
            tempArray[0].errorText = e.message;
          }
          return tempArray;
        });
      });
  }, []);

  useEffect(() => {
    if (
      getData({ source: formik.values, key: name }) &&
      getData({ source: formik.values, key: name }).length
    ) {
      const firstData = getData({ source: formik.values, key: name })[0];
      const controller = new AbortController();
      if (firstData.original !== "selected" && !!firstData.preview) {
        setPreventDefault(true);
        if (imageDownloader) {
          imageDownloader(firstData.preview, controller)
            .then((res) => {
              const data = Object.assign(firstData, {
                original: "default",
                status: "done",
                base64: res.base64,
                preview: res.base64,
                originalName: res.originalName,
                size: res.size,
                errorText: "",
                controller,
              });
              setFile([data]);
              setPreventDefault(false);
            })
            .catch((e) => {
              const data = Object.assign(firstData, {
                original: "default",
                status: "error",
                errorText: e.message,
              } as OutsideFile);
              setFile([data]);
              setPreventDefault(false);
            });
        } else {
          const data = Object.assign(firstData, {
            original: "default",
            status: "done",
            base64: firstData.preview,
            preview: firstData.preview,
            originalName: getNameFromUrl(firstData.preview),
            size: 0,
            errorText: "",
            controller,
          });
          setFile([data]);
          setPreventDefault(false);
        }
      }
    }
  }, [formik.values[name]]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    ...dropZoneOptions,
    disabled: preventDrop,
    onDrop: (acceptedFiles) => {
      const tempFile = Object.assign(acceptedFiles[0], {
        original: "selected",
        status: "uploading",
        progress: 0,
        uid: new Date().getTime().toString(),
        preview: URL.createObjectURL(acceptedFiles[0]),
        errorText: "",
        controller: new AbortController(),
      });
      setFile([tempFile as CustomFile]);
      uploadFunction(tempFile as CustomFile);
    },
  });

  if (loading || preventDrop) {
    return (
      <Grid item {...layoutProps}>
        <AvatarViewSkeleton height={126} hasHelper={!!helperText} />
      </Grid>
    );
  }

  return (
    <Grid item {...allData.layoutProps} id={String(name)}>
      <AvatarComponent<T>
        formik={formik}
        name={String(name)}
        file={file}
        uploadController={uploadController}
        setFile={setFile}
        onDelete={onDelete}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        isDragReject={isDragReject}
      />

      {(fileRejections.length > 0 ||
        (typeof file[0] === "object" && file[0].status === "error")) && (
        <RejectionFiles fileRejections={fileRejections} fileState={file[0]} />
      )}

      {helperText ||
      (getData({ source: formik.touched, key: name }) &&
        Boolean(getData({ source: formik.errors, key: name }))) ? (
        <FormControl sx={{ alignItems: "center", display: "flex" }}>
          <FormHelperText>
            {getData({ source: formik.touched, key: name }) &&
            getData({ source: formik.errors, key: name })
              ? translator(getData({ source: formik.errors, key: name }))
              : helperText}
          </FormHelperText>
        </FormControl>
      ) : null}
    </Grid>
  );
};

export default React.memo(AvatarDropZone, (prevProps, nextProps) => {
  return baseMemo(prevProps, nextProps);
}) as typeof AvatarDropZone;
