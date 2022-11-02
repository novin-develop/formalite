import React, { useMemo } from "react";
import * as Yup from "yup";

import { Language } from "@components/base/model";
import { Formalite, MainType, ViewTypes } from "@components/Formalite";
import { useFormaliteRef } from "@components/Formalite/config/useFormaliteRef";
import type { ColorPickerViewType } from "./ColorPickerView.type";

const validation = Yup.object({
  title: Yup.string(),
}).required();
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: "",
};

type TestColorPickerViewProps = Omit<ColorPickerViewType, "type"> & {
  lang?: Language;
};

export const TestColorPickerView = ({
  lang = "en",
  ...props
}: TestColorPickerViewProps) => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString: MainType = useMemo(() => {
    return {
      title: {
        type: ViewTypes.ColorPickerView,
        ...props,
      },
    };
  }, [props]);

  return (
    <Formalite<ValidationType>
      lang={lang}
      formString={formString}
      initialValues={iniValues}
      validationSchema={validation}
      formRef={formRef}
      onSubmit={(values) => {
        console.log(values);
      }}
    />
  );
};
