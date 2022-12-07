import React, { useEffect, useMemo, useState } from "react";
import { FormikProps, FormikValues } from "formik";
import { OptionalObjectSchema } from "yup/lib/object";
import { FormHelperText, Grid, InputLabel } from "@mui/material";
import {
  checkIsRequired,
  getData,
  handleRandomClassNameOrId,
} from "@components/Formalite/config/utils";
import { Theme } from "@mui/material/styles/createTheme";
import { Global } from "@emotion/react";
import { ObjectSchema } from "yup";
import { baseMemo } from "../Bases/functions/memo";
import type { EditorViewType } from "./EditorView.type";
import { TextViewSkeleton } from "../Bases/SkeletonBase";
import EditorViewRootStyle from "./EditorViewStyle";
import EditorToolbar, {
  formats,
  redoChange,
  undoChange,
} from "./Editor/EditorToolbar";
import { cssText } from "./editorCss";

export interface EditorViewProps<T> {
  allData: EditorViewType;
  name: keyof T;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: ObjectSchema<any>;
  translator: Function;
}

let ReactQuill = (...props: any) => <>a</>;

const EditorView = <T extends FormikValues>(props: EditorViewProps<T>) => {
  const { allData, name, formik, loading, validationSchema, translator } =
    props;
  const { helperText, label, ...editorProps } = allData.editorProps;
  const [load, setLoad] = useState(false);
  const id = useMemo(() => `minimal-quill-${handleRandomClassNameOrId()}`, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: `#${id}`,
        handlers: {
          undo: undoChange,
          redo: redoChange,
          // image: quillImageHandler,
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
      syntax: false,
      clipboard: {
        matchVisual: false,
      },
    }),
    [id]
  );

  useEffect(() => {
    // eslint-disable-next-line global-require
    ReactQuill = require("react-quill");
    if (document) {
      setLoad(true);
    }
  }, []);

  if (loading && !load) {
    return (
      <Grid item {...allData.layoutProps}>
        <TextViewSkeleton height={253} hasHelper={!!helperText} />
      </Grid>
    );
  }
  return (
    <Grid id={String(name)} item {...allData.layoutProps}>
      <Global styles={cssText} />
      {label && (
        <InputLabel
          required={checkIsRequired({
            schema: validationSchema,
            formikValues: formik.values,
            key: String(name),
          })}
          error={
            getData({ source: formik.touched, key: name }) &&
            Boolean(getData({ source: formik.errors, key: name }))
          }
        >
          {label}
        </InputLabel>
      )}
      <EditorViewRootStyle
        sx={(theme: Theme) => ({
          ...(getData({ source: formik.touched, key: name }) &&
            Boolean(getData({ source: formik.errors, key: name })) && {
              border: `solid 1px ${theme.palette.error.main}`,
            }),
        })}
      >
        <EditorToolbar
          id={id}
          className={`class-${id}`}
          isSimple={allData.editorProps.isToolbarSimple}
        />
        <ReactQuill
          className={`class-${id}`}
          value={getData({ source: formik.values, key: name })}
          // value={editorValue}
          modules={modules}
          formats={formats}
          /* onChange={(value: string, _delta: any, _source: any, editor: any) => {
            formik.setFieldValue(
              String(name),
              editor.getLength() > 1 ? value : formik.initialValues[name]
            );
          }} */
          onChange={(value: string) =>
            formik.setFieldValue(String(name), value)
          }
          // onBlur={() => formik.setFieldValue(name, editorValue)}
          {...editorProps}
        />
      </EditorViewRootStyle>
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
    </Grid>
  );
};

export default React.memo(EditorView, (prevProps, nextProps) => {
  return baseMemo(prevProps, nextProps);
}) as typeof EditorView;
