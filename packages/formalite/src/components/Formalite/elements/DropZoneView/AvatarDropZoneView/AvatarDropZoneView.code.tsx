export const AvatarDropZoneViewCode = `
import React, { useMemo } from "react";
import * as Yup from "yup";

import {
  Formalite,
  ViewTypes,
  useFormaliteRef
} from "@novin-dev/formalite";
import type { MainType } from "@novin-dev/formalite";

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

const iniValues: ValidationType = {
  title: [
    {
      preview: "https://picsum.photos/200",
      uid: "123",
    },
  ],
};

export const SingleDropZoneView = () => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString = useMemo<MainType>(() => {
    return {
      title: {
        type: ViewTypes.AvatarDropZoneView,
        layoutProps: {
          md: 12,
          xs: 12,
        },
        inputProps: {
          label: "aaa",
          dropZoneOptions: {
            maxSize: 3145728,
          },
          helperText: "Allowed *.jpeg, *.jpg, *.png, *.gif ",
        },
        imageDownloader: dropzoneImageDownloader,
        onUpload: (file, progress) =>
          new Promise<string>((resolve, reject) => {
            setTimeout(() => {
              progress(50);
            }, 1000);
            setTimeout(() => {
              progress(35);
            }, 500);
            setTimeout(() => {
              progress(70);
            }, 1000);
            setTimeout(() => {
              progress(100);
            }, 1500);
            setTimeout(() => {
              resolve(new Date().getTime().toString());
              // reject(new Error("aaaa"));
            }, 1700);
          }, 2000),
        onDelete: (id, isFromDefault) =>
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
