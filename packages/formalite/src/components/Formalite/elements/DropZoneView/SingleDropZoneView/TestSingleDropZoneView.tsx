import React, { useMemo } from "react";
import * as Yup from "yup";

import { Language } from "@components/base/model";
import { Formalite, MainType, ViewTypes } from "@components/Formalite";
import { useFormaliteRef } from "@components/Formalite/config/useFormaliteRef";
import type { SingleDropZoneViewType } from "./SingleDropZoneView.type";

const validation = Yup.object({
  title: Yup.array()
    .of(
      Yup.object({
        preview: Yup.string().required(),
        uid: Yup.string().required(),
      })
    )
    .nullable(),
}).required();
type ValidationType = Yup.InferType<typeof validation>;

const iniValueNull = { title: [] };

const iniValues: ValidationType = {
  title: [
    {
      preview: "https://picsum.photos/200",
      uid: "123",
    },
  ],
};

type TestSingleDropZoneViewProps = Omit<SingleDropZoneViewType, "type"> & {
  lang?: Language;
  withIni?: boolean;
};

export const TestSingleDropZoneView = ({
  lang = "en",
  withIni = true,
  ...props
}: TestSingleDropZoneViewProps) => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString: MainType = useMemo(() => {
    return {
      title: {
        type: ViewTypes.SingleDropZoneView,
        ...props,
      },
    };
  }, [props]);

  return (
    <Formalite<ValidationType>
      lang={lang}
      formString={formString}
      initialValues={withIni ? iniValues : iniValueNull}
      validationSchema={validation}
      formRef={formRef}
      onSubmit={(values) => {
        console.log(values);
      }}
    />
  );
};
