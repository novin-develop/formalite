import { FormikValues } from "formik";
import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { TextFieldBase } from "@components/Formalite/elements/Bases/TextFieldBase";
import React, { useCallback, useEffect, useState } from "react";
import { baseMemo } from "@components/Formalite/elements/Bases/functions/memo";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { TextDropZoneViewProps } from "@components/Formalite/elements/DropZoneView/TextDropZoneView/TextDropZoneView.type";
import {
  CustomFile,
  OutsideFile,
} from "@components/Formalite/elements/DropZoneView/Components/Global.type";
import { getData } from "@components/Formalite/config/utils";
import { useDropzone } from "react-dropzone";
import RejectionFiles from "@components/Formalite/elements/DropZoneView/Components/RejectionFiles";
import MultiFilePreview from "@components/Formalite/elements/DropZoneView/Components/MultiFilePreview";
import { fixDropZoneDefaultValue } from "@components/Formalite/elements/DropZoneView/utils";
import { getNameFromUrl } from "@config/utils";

const TextDropZoneView = <T extends FormikValues>(
  props: TextDropZoneViewProps<T>
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  const {
    allData,
    name,
    formik,
    loading,
    validationSchema,
    translator,
    formMustRegex,
  } = props;
  const {
    onChange,
    helperText,
    dropZoneOptions = {},
    ...inputProps
  } = allData.inputProps;
  const { onDelete, imageDownloader, onUpload, showPreview = false } = allData;
  const [file, setFile] = useState<(CustomFile | OutsideFile)[]>(
    fixDropZoneDefaultValue(
      getData({ source: formik.values, key: name })?.files || []
    )
  );
  const uploadController = new AbortController();

  const handleSetFile = (
    item: CustomFile | OutsideFile,
    newData: CustomFile | OutsideFile
  ) => {
    setFile((pre) => {
      const temp = [...pre];
      if (item.original === "default") {
        const index = pre.findIndex((i) => i.uid === item.uid);
        if (index > -1) {
          temp[index] = newData;
        }
      }
      return temp;
    });
  };

  const uploadFunction = useCallback((item: CustomFile) => {
    onUpload(
      item,
      (progress) => {
        setFile((pre) => {
          const tempArray = [...pre];
          const index = pre.findIndex((i) => i.uid === item.uid);
          if (tempArray[index].original === "selected") {
            (tempArray[index] as CustomFile).progress = progress;
            (tempArray[index] as CustomFile).status = "uploading";
          }
          return tempArray;
        });
      },
      uploadController
    )
      .then((resId) => {
        setFile((pre) => {
          const tempArray = [...pre];
          const index = pre.findIndex((i) => i.uid === item.uid);
          if (tempArray[index].original === "selected") {
            tempArray[index].uid =
              resId || `${Date.now()}*${tempArray[index].uid}`;
            tempArray[index].status = "done";
            (tempArray[index] as CustomFile).progress = 100;
          }
          formik.setFieldValue(`${name}.files`, tempArray);
          return tempArray;
        });
      })
      .catch((e) => {
        setFile((pre) => {
          const tempArray = [...pre];
          const index = pre.findIndex((i) => i.uid === item.uid);
          if (tempArray[index].original === "selected") {
            tempArray[index].status = "error";
            tempArray[index].errorText = e.message;
          }
          return tempArray;
        });
      });
  }, []);

  useEffect(() => {
    file.forEach((item) => {
      const controller = new AbortController();
      if (item.original === "default" && item.status === "not_downloaded") {
        if (imageDownloader) {
          const newDataForDefaults = Object.assign(item, {
            status: "downloading",
          } as OutsideFile);
          handleSetFile(item, newDataForDefaults);
          imageDownloader(item.preview, item.controller)
            .then((res) => {
              const newData = Object.assign(item, {
                original: "default",
                status: "done",
                base64: res.base64,
                preview: res.base64,
                originalName: res.originalName,
                size: res.size,
                errorText: "",
                controller,
              });
              handleSetFile(item, newData);
            })
            .catch((e) => {
              const newData = Object.assign(item, {
                original: "default",
                status: "error",
                errorText: e.message,
              } as OutsideFile);
              handleSetFile(item, newData);
            });
        } else {
          const newData = Object.assign(item, {
            original: "default",
            status: "done",
            base64: item.preview,
            preview: item.preview,
            originalName: getNameFromUrl(item.preview),
            size: 0,
            errorText: "",
            controller,
          });
          handleSetFile(item, newData);
        }
      }
    });
  }, [getData({ source: formik.values, key: name })?.files]);

  const {
    getRootProps,
    getInputProps,
    fileRejections,
    open,
    isDragActive,
    isDragReject,
    inputRef,
  } = useDropzone({
    multiple: true,
    noClick: true,
    noKeyboard: true,
    ...dropZoneOptions,
    onDrop: (acceptedFiles: File[]) => {
      const tempFile = acceptedFiles.map((item) =>
        Object.assign(item, {
          original: "selected",
          status: "uploading",
          progress: 0,
          uid: new Date().getTime().toString(),
          preview: URL.createObjectURL(item),
          errorText: "",
        })
      );
      setFile((pre) => [...pre, ...(tempFile as CustomFile[])]);
      (tempFile as CustomFile[]).forEach((item) => uploadFunction(item));
    },
  });

  return (
    <Grid item {...allData.layoutProps} {...getRootProps()} id={name}>
      <TextFieldBase
        formik={formik}
        loading={loading}
        validationSchema={validationSchema}
        translator={translator}
        name={`${name}.text`}
        mustRegex={[allData.mustRegex, formMustRegex]}
        {...inputProps}
        sx={(theme) => ({
          background: isDragActive
            ? theme.palette.grey[theme.palette.mode === "light" ? 200 : 800]
            : undefined,
          ...(typeof inputProps.sx === "function" ? inputProps.sx(theme) : {}),
        })}
        InputProps={{
          ...(inputProps.InputProps || {}),
          endAdornment: (
            <InputAdornment position="end">
              <input
                {...getInputProps()}
                ref={inputRef}
                data-testid="drop-input"
              />
              <IconButton
                sx={
                  allData.inputProps.multiline
                    ? {
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                      }
                    : {}
                }
                color={
                  getData({ source: formik.touched, key: name }) &&
                  getData({ source: formik.errors, key: `${name}.files` })
                    ? "error"
                    : "default"
                }
                onClick={open}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <AttachFileIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {!loading ? (
        <>
          {fileRejections.length > 0 ||
          (file.length && file.some((item) => item.status === "error")) ? (
            <RejectionFiles
              fileRejections={fileRejections}
              fileState={file.find((item) => item.status === "error")}
            />
          ) : null}

          <MultiFilePreview
            files={file}
            showPreview={showPreview}
            onRemove={onDelete}
            setFile={setFile}
            setToFormik={(newValue) => {
              formik.setFieldValue(`${name}.files`, newValue);
            }}
            uploadFunction={uploadFunction}
            uploadController={uploadController}
          />
        </>
      ) : null}
      {helperText ||
      (getData({ source: formik.touched, key: name }) &&
        Boolean(getData({ source: formik.errors, key: name }))) ? (
        <FormControl>
          <FormHelperText
            error={
              !!getData({ source: formik.touched, key: name }) &&
              !!getData({ source: formik.errors, key: `${name}.files` })
            }
          >
            {getData({ source: formik.touched, key: name }) &&
            getData({ source: formik.errors, key: `${name}.files` })
              ? translator(
                  getData({ source: formik.errors, key: `${name}.files` })
                )
              : helperText}
          </FormHelperText>
        </FormControl>
      ) : null}
    </Grid>
  );
};

export default React.memo(TextDropZoneView, (prevProps, nextProps) => {
  return baseMemo(prevProps, nextProps);
}) as typeof TextDropZoneView;
