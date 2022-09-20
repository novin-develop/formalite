export const TextDropZoneViewCode = `
import React, { useMemo } from "react";
import * as Yup from "yup";

import {
  Formalite,
  ViewTypes,
  useFormaliteRef
} from "@novin-dev/formalite";
import type { MainType } from "@novin-dev/formalite";

const validation = Yup.object({});

type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {};

export const TextDropZoneView = () => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString = useMemo<MainType>(() => {
    return {
      title: {
        type: ViewTypes.TextDropZoneView,
        layoutProps: {
          md: 6,
          xs: 12,
        },
        inputProps: {
          label: "aaa",
          dropZoneOptions: {
            maxSize: 3145728,
          },
          helperText: "Allowed *.jpeg, *.jpg, *.png, *.gif ",
        },
        showPreview: false,
        imageDownloader: dropzoneImageDownloader,
        onUpload: (file, progress) =>
          new Promise<string>((resolve, reject) => {
            setTimeout(() => {
              progress(50);
            }, 1000);
            setTimeout(() => {
              resolve(new Date().getTime().toString());
              // reject(new Error("aaaa"));
            }, 2000);
          }),
        onDelete: (id, isFromDefault,isSuccess) =>
          new Promise<void>((resolve, reject) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          }),
      },
    };
  }, []);

  return (
    <Formalite<ValidationType>
      lang="en"
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
`;
