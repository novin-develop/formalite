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
import { checkIsMin, getData } from "@components/Formalite/config/utils";
import { alpha, styled, Theme } from "@mui/material/styles";
import { useDropzone } from "react-dropzone";
import BlockContent from "@components/Formalite/elements/DropZoneView/Components/BlockContent";
import RejectionFiles from "@components/Formalite/elements/DropZoneView/Components/RejectionFiles";
import { TextViewSkeleton } from "@components/Formalite/elements/Bases/SkeletonBase";
import { baseMemo } from "@components/Formalite/elements/Bases/functions/memo";
import { MultiDropZoneViewProps } from "@components/Formalite/elements/DropZoneView/MultiDropZoneView/MultiDropZoneView.type";
import {
  CustomFile,
  OutsideFile,
} from "@components/Formalite/elements/DropZoneView/Components/Global.type";
import MultiFilePreview from "@components/Formalite/elements/DropZoneView/Components/MultiFilePreview";
import SmallBlockContent from "@components/Formalite/elements/DropZoneView/Components/SmallBlockContent";
import { fixDropZoneDefaultValue } from "@components/Formalite/elements/DropZoneView/utils";
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
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
  "&:hover": {
    background: alpha(
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
      0.72
    ),
    cursor: "pointer",
  },
})) as any;

const MultiDropZoneView = <T extends FormikValues>(
  props: MultiDropZoneViewProps<T>
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  const { allData, name, formik, loading, validationSchema, translator } =
    props;
  const {
    onUpload,
    inputProps,
    layoutProps,
    onDelete,
    imageDownloader,
    showPreview = false,
    isSmallView = false,
  } = allData;
  const { dropZoneOptions = {}, helperText } = inputProps;
  const [file, setFile] = useState<(CustomFile | OutsideFile)[]>(
    fixDropZoneDefaultValue(
      getData({ source: formik.values, key: name }) || []
    ) || []
  );
  const ref = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const [isLessMd, setIsLessMd] = useState(false);

  useLayoutEffect(() => {
    setIsLessMd((ref.current?.offsetWidth || 0) < theme.breakpoints.values.sm);
  }, []);
  const isRequired = checkIsMin({
    schema: validationSchema,
    formikValues: formik.values,
    key: String(name),
  });
  const uploadController = new AbortController();

  const handleSetFile = (
    item: CustomFile | OutsideFile,
    newData: CustomFile | OutsideFile
  ) => {
    setFile((pre) => {
      const temp = [...pre];
      if (item.original === "default") {
        const index = pre.findIndex((i) => i?.uid === item?.uid);
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
          const index = pre.findIndex((i) => i?.uid === item?.uid);
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
          const index = pre.findIndex((i) => i?.uid === item?.uid);
          if (tempArray[index].original === "selected") {
            tempArray[index].uid =
              resId || `${Date.now()}*${tempArray[index].uid}`;
            tempArray[index].status = "done";
            (tempArray[index] as CustomFile).progress = 100;
          }
          formik.setFieldValue(String(name), tempArray);
          return tempArray;
        });
      })
      .catch((e) => {
        setFile((pre) => {
          const tempArray = [...pre];
          const index = pre.findIndex((i) => i?.uid === item?.uid);
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
          imageDownloader(item.preview || "", item.controller)
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
  }, [formik.values[name]]);

  const {
    inputRef,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: true,
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
          controller: new AbortController(),
        })
      );
      setFile((pre) => [...pre, ...(tempFile as CustomFile[])]);
      (tempFile as CustomFile[]).forEach((item) => uploadFunction(item));
    },
  });

  if (loading) {
    return (
      <Grid item {...allData.layoutProps}>
        <TextViewSkeleton
          height={isSmallView ? 126 : 253}
          hasHelper={!!helperText}
        />
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
        sx={() => ({
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject ||
            (getData({ source: formik.errors, key: name }) &&
              getData({ source: formik.touched, key: name }))) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
            padding: theme.spacing(isSmallView ? 3 : 5, 1),
          }),
        })}
      >
        <input {...getInputProps()} ref={inputRef} />
        {isSmallView ? (
          <SmallBlockContent required={isRequired} />
        ) : (
          <BlockContent
            file={null}
            setFile={() => {}}
            resetDropZone={() => {}}
            required={isRequired}
            uploadFunction={uploadFunction}
            isLessMd={isLessMd}
          />
        )}
      </DropZoneStyle>

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
          formik.setFieldValue(String(name), newValue);
        }}
        uploadFunction={uploadFunction}
        uploadController={uploadController}
      />

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

export default React.memo(MultiDropZoneView, (prevProps, nextProps) => {
  try {
    return baseMemo(prevProps, nextProps);
  } catch (e) {
    return true;
  }
}) as typeof MultiDropZoneView;
