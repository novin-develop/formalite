import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  useTheme,
} from "@mui/material";
import { FormikValues } from "formik";
import { SingleDropZoneViewProps } from "@components/Formalite/elements/DropZoneView/SingleDropZoneView/SingleDropZoneView.type";
import { checkIsMin, getData } from "@components/Formalite/config/utils";
import { alpha, styled } from "@mui/material/styles";
import { useDropzone } from "react-dropzone";
import BlockContent from "@components/Formalite/elements/DropZoneView/Components/BlockContent";
import RejectionFiles from "@components/Formalite/elements/DropZoneView/Components/RejectionFiles";
import { TextViewSkeleton } from "@components/Formalite/elements/Bases/SkeletonBase";
import { baseMemo } from "@components/Formalite/elements/Bases/functions/memo";
import {
  CustomFile,
  OutsideFile,
} from "@components/Formalite/elements/DropZoneView/Components/Global.type";
import { getNameFromUrl } from "@config/utils";

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  overflow: "hidden",
  position: "relative",
  padding: theme.spacing(4, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor:
    theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  border: `1px dashed ${alpha(theme.palette.grey["500"], 0.32)}`,
  "&:hover": {
    background: alpha(
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
      0.72
    ),
    cursor: "pointer",
  },
})) as any;

const SingleDropZoneView = <T extends FormikValues>(
  props: SingleDropZoneViewProps<T>
) => {
  const { allData, name, formik, loading, validationSchema, translator } =
    props;
  const { onUpload, inputProps, layoutProps, onDelete, imageDownloader } =
    allData;
  const { dropZoneOptions = {}, helperText } = inputProps;
  const [file, setFile] = useState<(CustomFile | OutsideFile)[]>([]);
  const [preventDrop, setPreventDefault] = useState(false);
  const uploadController = new AbortController();
  const ref = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const [isLessMd, setIsLessMd] = useState(false);

  useLayoutEffect(() => {
    setIsLessMd((ref.current?.offsetWidth || 0) < theme.breakpoints.values.sm);
  }, []);

  const uploadFunction = useCallback((item: CustomFile) => {
    onUpload(
      item,
      (progress) => {
        setFile((pre) => {
          const tempArray = [...pre];
          if (
            tempArray.length &&
            tempArray[0]?.status &&
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
            tempArray[0]?.status &&
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
    const firstData = getData({ source: formik.values, key: name })[0];
    const controller = new AbortController();
    if (firstData?.original !== "selected" && !!firstData?.preview) {
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
  }, [formik.values]);

  const {
    inputRef,
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
      <Grid item {...allData.layoutProps}>
        <TextViewSkeleton height={253} hasHelper={!!helperText} />
      </Grid>
    );
  }

  return (
    <Grid item {...layoutProps} id={String(name)} ref={ref}>
      {inputProps.label && (
        <FormLabel
          component="legend"
          required={checkIsMin({
            schema: validationSchema,
            formikValues: formik.values,
            key: String(name),
          })}
        >
          {inputProps.label}
        </FormLabel>
      )}

      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject ||
            (!!getData({ source: formik.errors, key: name }) &&
              getData({ source: formik.touched, key: name }))) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
        }}
      >
        <input {...getInputProps()} ref={inputRef} />

        <BlockContent
          isLessMd={isLessMd}
          file={file[0]}
          onDelete={onDelete}
          setFile={setFile}
          resetDropZone={() => {
            formik.setFieldValue(String(name), []);
          }}
          required={checkIsMin({
            schema: validationSchema,
            formikValues: formik.values,
            key: String(name),
          })}
          uploadFunction={uploadFunction}
          uploadController={uploadController}
        />
      </DropZoneStyle>
      {(fileRejections.length > 0 ||
        (typeof file[0] === "object" && file[0]?.status === "error")) && (
        <RejectionFiles fileRejections={fileRejections} fileState={file[0]} />
      )}
      {helperText ||
      (getData({ source: formik.touched, key: name }) &&
        Boolean(getData({ source: formik.errors, key: name }))) ? (
        <FormControl>
          <FormHelperText
            error={
              getData({ source: formik.touched, key: name }) &&
              Boolean(getData({ source: formik.errors, key: name }))
            }
          >
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

export default React.memo(SingleDropZoneView, (prevProps, nextProps) => {
  try {
    return baseMemo(prevProps, nextProps);
  } catch (e) {
    return true;
  }
}) as typeof SingleDropZoneView;
