import React, { useMemo } from "react";
import * as Yup from "yup";

import { Language } from "@components/base/model";
import { Formalite, MainType, ViewTypes } from "@components/Formalite";
import { useFormaliteRef } from "@components/Formalite/config/useFormaliteRef";
import type { AvatarDropZoneViewType } from "./AvatarDropZoneView.type";

const validation = Yup.object({
  title: Yup.array().of(Yup.mixed()).nullable(),
}).required();
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: [
    {
      preview: "https://picsum.photos/200",
      uid: "123",
    },
  ],
};

type TestSingleDropZoneViewProps = Omit<AvatarDropZoneViewType, "type"> & {
  lang?: Language;
};

export const TestAvatarDropZoneView = ({
  lang = "en",
  ...props
}: TestSingleDropZoneViewProps) => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString: MainType = useMemo(() => {
    return {
      title: {
        type: ViewTypes.AvatarDropZoneView,
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
