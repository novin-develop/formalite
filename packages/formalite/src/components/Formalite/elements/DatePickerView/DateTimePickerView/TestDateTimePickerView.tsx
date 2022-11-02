import React, { useMemo } from "react";
import * as Yup from "yup";

import { Language } from "@components/base/model";
import { Formalite, MainType, ViewTypes } from "@components/Formalite";
import { useFormaliteRef } from "@components/Formalite/config/useFormaliteRef";
import type { DateTimePickerViewType } from "./DateTimePickerView.type";

const validation = Yup.object({
  title: Yup.mixed().required(),
}).required();
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: new Date(),
};

type TestDateTimePickerViewProps = Omit<DateTimePickerViewType, "type"> & {
  lang?: Language;
};

export const TestDateTimePickerView = ({
  lang = "en",
  ...props
}: TestDateTimePickerViewProps) => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString: MainType = useMemo(() => {
    return {
      title: {
        type: ViewTypes.DateTimePickerView,
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
