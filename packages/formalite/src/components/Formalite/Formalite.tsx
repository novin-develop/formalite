import React, {
  ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import { Grid } from "@mui/material";
import { FormikProps, FormikProvider, FormikValues, useFormik } from "formik";
import {
  getDefaultValue,
  showErrorMessage,
} from "@components/Formalite/config/utils";
import { I18nProvider, Resources } from "@components/base/I18nProvider";
import {
  FormalitePropsType,
  MainType,
  ViewTypes,
} from "@components/Formalite/Formalite.type";
import { Language } from "@components/base/model";
import ErrorBoundaryWrapper from "@components/base/ErrorBoundary";

import PriceView from "@components/Formalite/elements/PriceView/PriceView";
import CardNumberView from "@components/Formalite/elements/CardNumberView/CardNumberView";
import SelectView from "@components/Formalite/elements/SelectView/SelectView";
import ComponentView from "@components/Formalite/elements/ComponentView/ComponentView";
import RepeaterView from "@components/Formalite/elements/RepeaterView/RepeaterView";
import SingleDropZoneView from "@components/Formalite/elements/DropZoneView/SingleDropZoneView/SingleDropZoneView";
import MultiDropZoneView from "@components/Formalite/elements/DropZoneView/MultiDropZoneView/MultiDropZoneView";
import TextDropZoneView from "@components/Formalite/elements/DropZoneView/TextDropZoneView/TextDropZoneView";
import ColorPickerView from "@components/Formalite/elements/ColorPickerView/ColorPickerView";
import RadioGroupView from "@components/Formalite/elements/RadioGroupView/RadioGroupView";
import CheckGroupView from "@components/Formalite/elements/CheckGroupView/CheckGroupView";
import AutoCompleteView from "@components/Formalite/elements/AutoCompleteView/AutoCompleteView";
import TextView from "@components/Formalite/elements/TextView/TextView";
import DatePickerView from "@components/Formalite/elements/DatePickerView/DatePickerView/DatePickerView";
import DateTimePickerView from "@components/Formalite/elements/DatePickerView/DateTimePickerView/DateTimePickerView";
import TimePickerView from "@components/Formalite/elements/DatePickerView/TimePickerView/TimePickerView";
import SwitchGroupView from "@components/Formalite/elements/SwitchGroupView/SwitchGroupView";
import BigRadioGroupView from "@components/Formalite/elements/BigRadioGroupView/BigRadioGroupView";
import ErrorFocus from "@components/Formalite/elements/ErrorFocus";
import EditorView from "@components/Formalite/elements/EditorView/EditorView";
import GroupView from "@components/Formalite/elements/GroupView/GroupView";
import AvatarDropZoneView from "@components/Formalite/elements/DropZoneView/AvatarDropZoneView/AvatarDropZoneView";
import { ObjectSchema } from "yup";
import { en } from "./translations/default-en";
import { fa } from "./translations/default-fa";
import FormObserver from "./components/FormObserver";

const resources: Resources = {
  en,
  fa,
};

const ViewComponentMap = {
  [ViewTypes.TextView.toString()]: TextView,
  [ViewTypes.PriceView.toString()]: PriceView,
  [ViewTypes.CardNumberView.toString()]: CardNumberView,
  [ViewTypes.SelectView.toString()]: SelectView,
  [ViewTypes.ComponentView.toString()]: ComponentView,
  [ViewTypes.RepeaterView.toString()]: RepeaterView,
  [ViewTypes.SingleDropZoneView.toString()]: SingleDropZoneView,
  [ViewTypes.AvatarDropZoneView.toString()]: AvatarDropZoneView,
  [ViewTypes.MultiDropZoneView.toString()]: MultiDropZoneView,
  [ViewTypes.TextDropZoneView.toString()]: TextDropZoneView,
  [ViewTypes.ColorPickerView.toString()]: ColorPickerView,
  [ViewTypes.RadioGroupView.toString()]: RadioGroupView,
  [ViewTypes.AutoCompleteView.toString()]: AutoCompleteView,
  [ViewTypes.DatePickerView.toString()]: DatePickerView,
  [ViewTypes.DateTimePickerView.toString()]: DateTimePickerView,
  [ViewTypes.TimePickerView.toString()]: TimePickerView,
  [ViewTypes.CheckGroupView.toString()]: CheckGroupView,
  [ViewTypes.SwitchGroupView.toString()]: SwitchGroupView,
  [ViewTypes.BigRadioGroupView.toString()]: BigRadioGroupView,
  [ViewTypes.EditorView.toString()]: EditorView,
  [ViewTypes.GroupView.toString()]: GroupView,
};
let newComponents: FormalitePropsType<any>["components"] = {};

let GResolve: (value: unknown) => void;
let GReject: (reason?: any) => void;

const gridStyle = { overflow: "hidden" };
const defaultTranslator = (input: string | { [key: string]: unknown }) =>
  typeof input === "object" ? input?.key : input;
const Formalite = <T extends FormikValues>(props: FormalitePropsType<T>) => {
  const {
    offsetScroll = 0,
    scrollReferenceId,
    formString,
    onSubmit,
    reIni = false,
    lang = "en",
    loading = false,
    isUpdateMode = false,
    initialValues,
    validationSchema,
    formMustRegex,
    translator = defaultTranslator,
    onFormChange,
    components = {},
  } = props;

  newComponents = components;
  const formik = useFormik<T>({
    enableReinitialize: reIni,
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      try {
        onSubmit(values, GResolve, GReject, resetForm);
      } catch (e) {
        showErrorMessage(e);
      }
    },
  });

  useImperativeHandle(props.formRef, () => ({
    callSubmit: (resolve, reject) => {
      if (resolve && reject) {
        GResolve = resolve;
        GReject = reject;
      }

      formik
        .validateForm()
        .then((res) => {
          if (Object.keys(res).length && reject) {
            reject("Form Data Is Not Valid");
          }
          formik.handleSubmit();
        })
        .catch((e) => {
          showErrorMessage(e);
        });
    },
    callRest: () => {
      formik.resetForm({ values: {} as T });
      // formik.setValues({} as T);
      // TODO check if works
    },
    formik,
    addRow: (name) => {
      const repeatValue = formik.values[name];
      const data: { [key: string]: any } = {};
      try {
        Object.keys((formString[name] as any).options).forEach((item) => {
          data[item] = getDefaultValue(
            (formString[name] as any).options![item].type
          );
        });
      } catch (e) {
        // Do noting
      }
      repeatValue.push(data);
      formik.setFieldValue(name, repeatValue);
    },
  }));

  useEffect(() => {
    if (!loading) {
      formik.setValues(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <I18nProvider targetLang={lang} resources={resources}>
      <ErrorBoundaryWrapper>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <FormObserver<T> onFormChange={onFormChange} />
            <Grid
              container
              direction="row"
              spacing={3}
              style={gridStyle}
              id="formalite"
            >
              {itemRenderer<T>({
                form: formString,
                formik,
                loading,
                lang,
                isUpdateMode,
                validationSchema,
                formMustRegex,
                translator,
              })}
              <ErrorFocus<T>
                offsetScroll={offsetScroll}
                scrollReferenceId={scrollReferenceId}
              />
            </Grid>
          </form>
        </FormikProvider>
      </ErrorBoundaryWrapper>
    </I18nProvider>
  );
};

export function itemRenderer<T extends FormikValues>({
  form,
  formik,
  loading,
  lang,
  isUpdateMode,
  validationSchema,
  repItem,
  formMustRegex,
  translator,
}: {
  form: MainType;
  formik: FormikProps<T>;
  loading: boolean;
  lang: Language;
  isUpdateMode: boolean;
  validationSchema: ObjectSchema<any>;
  repItem?: { name: string; index: number };
  formMustRegex?: RegExp;
  translator: Function;
}) {
  const NewViewComponentMap = { ...ViewComponentMap, ...newComponents };
  return Object.entries(form).map(([keyOriginal, value]) => {
    const key = repItem
      ? `${repItem.name}.${repItem.index}.${keyOriginal}`
      : keyOriginal;
    if ((!!value.showOnUpdate && isUpdateMode) || !value.showOnUpdate) {
      const TargetComponent = NewViewComponentMap[value.type];
      if (TargetComponent) {
        return (
          <TargetComponent<T>
            key={key}
            name={key}
            allData={value as never}
            formik={formik}
            loading={loading}
            validationSchema={validationSchema}
            isUpdateMode={isUpdateMode}
            lang={lang}
            formMustRegex={formMustRegex}
            translator={translator}
          />
        );
      }
    }
    return null;
  });
}

export default React.memo(Formalite, (prevProps, nextProps) => {
  try {
    return (
      prevProps.formString === nextProps.formString &&
      prevProps.loading === nextProps.loading
    );
  } catch (e) {
    return true;
  }
}) as typeof Formalite;
