import React, { useEffect, useMemo, useRef, useState } from "react";
import { FormikProps, FormikValues } from "formik";
import { OptionalObjectSchema } from "yup/lib/object";
import { FormHelperText, Grid, InputLabel, useTheme } from "@mui/material";
import {
  checkIsRequired,
  getData,
  handleRandomClassNameOrId,
} from "@components/Formalite/config/utils";
import { css, Global } from "@emotion/react";
import { useEditorI18n } from "@components/Formalite/elements/EditorView/Editor/useEditorI18n";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { CustomFile } from "@components/Formalite";
import { baseMemo } from "../Bases/functions/memo";
import type { EditorViewType } from "./EditorView.type";
import { TextViewSkeleton } from "../Bases/SkeletonBase";
import { cssText } from "./editorCss";

/**
 * TODO add I18n
 * TODO remove and organize
 * TODO fix spreading Pops override
 * TODO fix and check upload image
 */
interface EditorViewProps<T> {
  allData: EditorViewType;
  name: string;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: OptionalObjectSchema<any>;
  translator: Function;
}

let Editor = (...props: any) => <>a</>;
let Toolbar = (...props: any) => <>b</>;
let i18nChangeLanguage = (a: string) => {};
let i18nAddResources = (a: string, b: Object) => {};

const EditorView = <T extends FormikValues>(props: EditorViewProps<T>) => {
  const { allData, name, formik, loading, validationSchema, translator } =
    props;
  const {
    helperText,
    label,
    editorConfig: editorConfigProps = {},
    toolbarConfig: toolbarConfigProps = {},
    toolbarComponentProps = {},
    editorComponentProps = {},
  } = allData.editorProps;
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [load, setLoad] = useState(false);
  const i18nObject = useEditorI18n();
  const theme = useTheme();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line global-require
    const editorReact = require("@wangeditor/editor-for-react");
    // eslint-disable-next-line global-require
    const newEditor = require("@wangeditor/editor");
    Editor = editorReact.Editor;
    Toolbar = editorReact.Toolbar;
    i18nChangeLanguage = newEditor.i18nChangeLanguage;
    i18nAddResources = newEditor.i18nAddResources;

    i18nAddResources("new", i18nObject);
    i18nChangeLanguage("new");

    if (document) {
      setLoad(true);
    }
  }, []);

  useEffect(() => {
    const r = document.querySelector<any>(":root")!;
    if (theme.palette.mode === "dark") {
      if (boxRef.current) {
        boxRef.current.style.border = "1px solid #ffffff3b";
      }
      // r.style.setProperty("--w-e-textarea-bg-color", "#333");
      r.style.setProperty("--w-e-textarea-color", "#fff");
      r.style.setProperty("--w-e-toolbar-bg-color", "#333");
      r.style.setProperty("--w-e-toolbar-color", "#fff");
      r.style.setProperty(
        "--w-e-toolbar-active-bg-color",
        theme.palette.grey[700]
      );
      r.style.setProperty(
        "--w-e-toolbar-active-color",
        theme.palette.grey[500]
      );
      r.style.setProperty("--w-e-toolbar-active-color_options", "#fff");
    } else {
      if (boxRef.current) {
        boxRef.current.style.border = "1px solid #0000003b";
      }
      // r.style.setProperty("--w-e-textarea-bg-color", "#fff");
      r.style.setProperty("--w-e-textarea-color", "#333");
      r.style.setProperty("--w-e-toolbar-bg-color", "#fff");
      r.style.setProperty("--w-e-toolbar-color", "#333");
      r.style.setProperty(
        "--w-e-toolbar-active-bg-color",
        theme.palette.grey[200]
      );
      r.style.setProperty(
        "--w-e-toolbar-active-color",
        theme.palette.grey[500]
      );
      r.style.setProperty("--w-e-toolbar-active-color_options", "#000");
    }
  }, [theme.palette.mode]);

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: ["uploadVideo", "fullScreen"],
    ...toolbarConfigProps,
  };

  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "Type here...",
    MENU_CONF: {
      fontFamily: {
        fontFamilyList: [
          "Arial",
          "Tahoma",
          "Verdana",
          { name: "Tahoma", value: "Tahoma" },
        ],
      },
      uploadImage: {
        async customUpload(file: File, insertFn: Function) {
          if (allData.onUpload) {
            allData.onUpload(file as CustomFile).then((res) => {
              insertFn(res.url, res.alt, res.href);
            });
          }
        },
      },
    },
    autoFocus: false,
    onFocus: () => {
      if (boxRef.current) {
        boxRef.current.style.border = `solid 2px ${theme.palette.primary.main}`;
      }
    },
    onBlur: () => {
      if (boxRef.current) {
        boxRef.current.style.border = `solid 1px ${
          theme.palette.mode === "dark" ? "#ffffff3b" : "#0000003b"
        }`;
      }
    },
    ...editorConfigProps,
  };

  if (loading || !load) {
    return (
      <Grid item {...allData.layoutProps}>
        <TextViewSkeleton height={253} hasHelper={!!helperText} />
      </Grid>
    );
  }
  return (
    <Grid id={name} item {...allData.layoutProps}>
      <Global styles={cssText} />
      {label && (
        <InputLabel
          required={checkIsRequired({
            schema: validationSchema,
            formikValues: formik.values,
            key: name,
          })}
          error={
            getData({ source: formik.touched, key: name }) &&
            Boolean(getData({ source: formik.errors, key: name }))
          }
        >
          {label}
        </InputLabel>
      )}
      <Grid
        ref={boxRef}
        sx={{
          border: `solid 1px ${
            theme.palette.mode === "dark" ? "#ffffff3b" : "#0000003b"
          }`,
          ":hover": {
            border: `solid 1px ${
              theme.palette.mode === "dark" ? "#fff" : "#000"
            }`,
          },
          borderRadius: "4px",
          overflow: "hidden",
        }}
        onMouseEnter={() => {
          if (boxRef.current && boxRef.current.style.borderWidth !== "2px") {
            boxRef.current.style.border = `solid 1px ${
              theme.palette.mode === "dark" ? "#fff" : "#000"
            }`;
          }
        }}
        onMouseLeave={() => {
          if (boxRef.current && boxRef.current.style.borderWidth !== "2px") {
            boxRef.current.style.border = `solid 1px ${
              theme.palette.mode === "dark" ? "#ffffff3b" : "#0000003b"
            }`;
          }
        }}
      >
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{
            borderBottom: `1px solid ${
              theme.palette.mode === "dark" ? "#ffffff3b" : "#0000003b"
            }`,
          }}
          {...toolbarComponentProps}
        />
        <Editor
          defaultConfig={editorConfig}
          value={getData({ source: formik.values, key: name })}
          onCreated={setEditor}
          onChange={(editorObj: any) => {
            formik.setFieldValue(name, editorObj.getHtml());
          }}
          mode="default"
          style={{ height: "300px" }}
          {...editorComponentProps}
        />
      </Grid>

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
