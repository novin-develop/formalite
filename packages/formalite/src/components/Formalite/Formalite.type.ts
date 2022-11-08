import { TextViewType } from "@components/Formalite/elements/TextView/TextView.type";
import { FormikContextType, FormikProps, FormikValues } from "formik";
import { RefObject } from "react";

import { FetchingDataEnum, Language } from "@components/base/model";
import { PriceViewType } from "@components/Formalite/elements/PriceView/PriceView.type";
import { CardNumberViewType } from "@components/Formalite/elements/CardNumberView/CardNumberView.type";
import { SelectViewType } from "@components/Formalite/elements/SelectView/SelectView.type";
import { ComponentViewType } from "@components/Formalite/elements/ComponentView/ComponentView.type";
import { RepeaterViewType } from "@components/Formalite/elements/RepeaterView/RepeaterView.type";
import {
  MultiDropZoneViewProps,
  MultiDropZoneViewType,
} from "@components/Formalite/elements/DropZoneView/MultiDropZoneView/MultiDropZoneView.type";
import {
  TextDropZoneViewProps,
  TextDropZoneViewType,
} from "@components/Formalite/elements/DropZoneView/TextDropZoneView/TextDropZoneView.type";
import { ColorPickerViewType } from "@components/Formalite/elements/ColorPickerView/ColorPickerView.type";
import { RadioGroupViewType } from "@components/Formalite/elements/RadioGroupView/RadioGroupView.type";
import { CheckGroupViewType } from "@components/Formalite/elements/CheckGroupView/CheckGroupView.type";
import { GridProps } from "@mui/material";
import { GroupViewType } from "@components/Formalite/elements/GroupView/GroupView.type";
import { AvatarDropZoneViewType } from "@components/Formalite/elements/DropZoneView/AvatarDropZoneView/AvatarDropZoneView.type";
import { ObjectSchema } from "yup";
import { TextViewProps } from "@components/Formalite/elements/TextView/TextView";
import { SelectViewProps } from "@components/Formalite/elements/SelectView/SelectView";
import { SwitchGroupViewProps } from "@components/Formalite/elements/SwitchGroupView/SwitchGroupView";
import { RepeaterViewProps } from "@components/Formalite/elements/RepeaterView/RepeaterView";
import { RadioGroupViewProps } from "@components/Formalite/elements/RadioGroupView/RadioGroupView";
import { PriceViewProps } from "@components/Formalite/elements/PriceView/PriceView";
import { GroupViewProps } from "@components/Formalite/elements/GroupView/GroupView";
import { EditorViewProps } from "@components/Formalite/elements/EditorView/EditorView";
import { AvatarDropZoneViewProps } from "@components/Formalite/elements/DropZoneView/AvatarDropZoneView/AvatarDropZoneView";
import { DatePickerViewProps } from "@components/Formalite/elements/DatePickerView/DatePickerView/DatePickerView";
import { TimePickerViewProps } from "@components/Formalite/elements/DatePickerView/TimePickerView/TimePickerView";
import { DateTimePickerViewProps } from "@components/Formalite/elements/DatePickerView/DateTimePickerView/DateTimePickerView";
import { ComponentViewProps } from "@components/Formalite/elements/ComponentView/ComponentView";
import { ColorPickerViewProps } from "@components/Formalite/elements/ColorPickerView/ColorPickerView";
import { CheckGroupViewProps } from "@components/Formalite/elements/CheckGroupView/CheckGroupView";
import { CartNumberViewProps } from "@components/Formalite/elements/CardNumberView/CardNumberView";
import { BigRadioGroupViewProps } from "@components/Formalite/elements/BigRadioGroupView/BigRadioGroupView";
import { AutoCompleteViewProps } from "@components/Formalite/elements/AutoCompleteView/AutoCompleteView";
import { en } from "@components/Formalite/translations/default-en";
import {
  SingleDropZoneViewProps,
  SingleDropZoneViewType,
} from "./elements/DropZoneView/SingleDropZoneView/SingleDropZoneView.type";
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
  refetchDependency?: string[];
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

export type FormalitePropsType<T extends FormikValues> = {
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
  validationSchema: ObjectSchema<any>;
  initialValues: T;
  formRef: RefObject<ReferenceType<T>>;
  formMustRegex?: RegExp;
  translator?: Function;
  onFormChange?: OnFormChangeType<T>;
  localization?: {
    [key: string]: Record<keyof typeof en, string>;
  };
  components?: {
    [ViewTypes.TextView]?: <Z>(props: TextViewProps<T>) => JSX.Element;
    [ViewTypes.SelectView]?: (props: SelectViewProps<T>) => JSX.Element;
    [ViewTypes.SwitchGroupView]?: (
      props: SwitchGroupViewProps<T>
    ) => JSX.Element;
    [ViewTypes.RepeaterView]?: (props: RepeaterViewProps<T>) => JSX.Element;
    [ViewTypes.RadioGroupView]?: (props: RadioGroupViewProps<T>) => JSX.Element;
    [ViewTypes.PriceView]?: (props: PriceViewProps<T>) => JSX.Element;
    [ViewTypes.GroupView]?: (props: GroupViewProps<T>) => JSX.Element;
    [ViewTypes.EditorView]?: (props: EditorViewProps<T>) => JSX.Element;
    [ViewTypes.SingleDropZoneView]?: (
      props: SingleDropZoneViewProps<T>
    ) => JSX.Element;
    [ViewTypes.MultiDropZoneView]?: (
      props: MultiDropZoneViewProps<T>
    ) => JSX.Element;
    [ViewTypes.AvatarDropZoneView]?: (
      props: AvatarDropZoneViewProps<T>
    ) => JSX.Element;
    [ViewTypes.TextDropZoneView]?: (
      props: TextDropZoneViewProps<T>
    ) => JSX.Element;
    [ViewTypes.DatePickerView]?: (props: DatePickerViewProps<T>) => JSX.Element;
    [ViewTypes.TimePickerView]?: (props: TimePickerViewProps<T>) => JSX.Element;
    [ViewTypes.DateTimePickerView]?: (
      props: DateTimePickerViewProps<T>
    ) => JSX.Element;
    [ViewTypes.ComponentView]?: (props: ComponentViewProps<T>) => JSX.Element;
    [ViewTypes.ColorPickerView]?: (
      props: ColorPickerViewProps<T>
    ) => JSX.Element;
    [ViewTypes.CheckGroupView]?: (props: CheckGroupViewProps<T>) => JSX.Element;
    [ViewTypes.CardNumberView]?: (props: CartNumberViewProps<T>) => JSX.Element;
    [ViewTypes.BigRadioGroupView]?: (
      props: BigRadioGroupViewProps<T>
    ) => JSX.Element;
    [ViewTypes.AutoCompleteView]?: (
      props: AutoCompleteViewProps<T>
    ) => JSX.Element;
  };
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

  /**
   * Changing this prop cause rerenders in related view
   */
  renderDependency?: string[];
}
