import { TextViewType } from "@components/Formalite/elements/TextView/TextView.type";
import { FormikContextType, FormikProps } from "formik";
import { RefObject } from "react";
import { OptionalObjectSchema } from "yup/lib/object";

import { FetchingDataEnum, Language } from "@components/base/model";
import { PriceViewType } from "@components/Formalite/elements/PriceView/PriceView.type";
import { CardNumberViewType } from "@components/Formalite/elements/CardNumberView/CardNumberView.type";
import { SelectViewType } from "@components/Formalite/elements/SelectView/SelectView.type";
import { ComponentViewType } from "@components/Formalite/elements/ComponentView/ComponentView.type";
import { RepeaterViewType } from "@components/Formalite/elements/RepeaterView/RepeaterView.type";
import { MultiDropZoneViewType } from "@components/Formalite/elements/DropZoneView/MultiDropZoneView/MultiDropZoneView.type";
import { TextDropZoneViewType } from "@components/Formalite/elements/DropZoneView/TextDropZoneView/TextDropZoneView.type";
import { ColorPickerViewType } from "@components/Formalite/elements/ColorPickerView/ColorPickerView.type";
import { RadioGroupViewType } from "@components/Formalite/elements/RadioGroupView/RadioGroupView.type";
import { CheckGroupViewType } from "@components/Formalite/elements/CheckGroupView/CheckGroupView.type";
import { GridProps } from "@mui/material";
import { GroupViewType } from "@components/Formalite/elements/GroupView/GroupView.type";
import { AvatarDropZoneViewType } from "@components/Formalite/elements/DropZoneView/AvatarDropZoneView/AvatarDropZoneView.type";
import { SingleDropZoneViewType } from "./elements/DropZoneView/SingleDropZoneView/SingleDropZoneView.type";
import { AutoCompleteViewType } from "./elements/AutoCompleteView/AutoCompleteView.type";
import { DatePickerViewType } from "./elements/DatePickerView/DatePickerView/DatePickerView.type";
import { DateTimePickerViewType } from "./elements/DatePickerView/DateTimePickerView/DateTimePickerView.type";
import { TimePickerViewType } from "./elements/DatePickerView/TimePickerView/TimePickerView.type";
import { SwitchGroupViewType } from "./elements/SwitchGroupView/SwitchGroupView.type";
import { BigRadioGroupViewType } from "./elements/BigRadioGroupView/BigRadioGroupView.type";
import { EditorViewType } from "./elements/EditorView/EditorView.type";

export enum ViewTypes {
  TextView = "TextView",
  PriceView = "PriceView",
  CardNumberView = "CardNumberView",
  SelectView = "SelectView",
  ComponentView = "ComponentView",
  RepeaterView = "RepeaterView",
  SingleDropZoneView = "SingleDropZoneView",
  AvatarDropZoneView = "AvatarDropZoneView",
  MultiDropZoneView = "MultiDropZoneView",
  TextDropZoneView = "TextDropZoneView",
  ColorPickerView = "ColorPickerView",
  RadioGroupView = "RadioGroupView",
  AutoCompleteView = "AutoCompleteView",
  DatePickerView = "DatePickerView",
  DateTimePickerView = "DateTimePickerView",
  TimePickerView = "TimePickerView",
  CheckGroupView = "CheckGroupView",
  SwitchGroupView = "SwitchGroupView",
  BigRadioGroupView = "BigRadioGroupView",
  EditorView = "EditorView",
  GroupView = "GroupView",
}

export type MainType = {
  [key: string]:
    | TextViewType
    | PriceViewType
    | CardNumberViewType
    | SelectViewType
    | ComponentViewType
    | RepeaterViewType
    | SingleDropZoneViewType
    | AvatarDropZoneViewType
    | MultiDropZoneViewType
    | TextDropZoneViewType
    | ColorPickerViewType
    | RadioGroupViewType
    | AutoCompleteViewType
    | DatePickerViewType
    | DateTimePickerViewType
    | TimePickerViewType
    | CheckGroupViewType
    | SwitchGroupViewType
    | BigRadioGroupViewType
    | EditorViewType
    | GroupViewType;
};

export type AutomaticFetchingType<T> = {
  type: FetchingDataEnum.AUTOMATIC;
  options: () => Promise<T>;
  dependency?: string;
};
export type ManualFetchingType<T> = {
  type: FetchingDataEnum.MANUAL;
  data: T | null | undefined;
  loading: boolean;
  error: boolean;
  onRetry: () => void;
};

export type FetchingDataType<T> =
  | AutomaticFetchingType<T>
  | ManualFetchingType<T>;

export type ReferenceType<T> = {
  callSubmit: (
    resolve?: (value: unknown) => void,
    reject?: (reason?: any) => void | undefined
  ) => void;
  callRest: () => void;
  formik: FormikProps<T>;
  addRow: (name: string) => void;
};

export type OnFormChangeType<T> = (formik: FormikContextType<T>) => void;

export type FormalitePropsType<T> = {
  offsetScroll?: number;
  scrollReferenceId?: string;
  formString: MainType;
  onSubmit: (
    values: T,
    GResolve: (value: unknown) => void,
    GReject: (reason?: any) => void,
    resetForm: () => void
  ) => void;
  reIni?: boolean;
  lang?: Language;
  loading?: boolean;
  isUpdateMode?: boolean;
  validationSchema: OptionalObjectSchema<any>;
  initialValues: T;
  formRef: RefObject<ReferenceType<T>>;
  formMustRegex?: RegExp;
  translator?: Function;
  onFormChange?: OnFormChangeType<T>;
};

export interface BaseViewType {
  /**
   * Show only on update (edit) mode
   */
  showOnUpdate?: boolean;

  /**
   * Specify props that passed to grid layout
   * @see [Mui GridProps](https://mui.com/material-ui/api/grid/)
   */
  layoutProps: GridProps;
}
