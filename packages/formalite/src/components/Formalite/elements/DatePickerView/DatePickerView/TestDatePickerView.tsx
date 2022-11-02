import React, { useMemo } from "react";
import * as Yup from "yup";

import { Language } from "@components/base/model";
import { Formalite, MainType, ViewTypes } from "@components/Formalite";
import { useFormaliteRef } from "@components/Formalite/config/useFormaliteRef";
import type { DatePickerViewType } from "./DatePickerView.type";

const validation = Yup.object({
  title: Yup.mixed().required(),
}).required();
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: new Date(),
};

type TestDatePickerViewProps = Omit<DatePickerViewType, "type"> & {
  lang?: Language;
};

export const TestDatePickerView = ({
  lang = "en",
  ...props
}: TestDatePickerViewProps) => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString: MainType = useMemo(() => {
    return {
      title: {
        type: ViewTypes.DatePickerView,
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
