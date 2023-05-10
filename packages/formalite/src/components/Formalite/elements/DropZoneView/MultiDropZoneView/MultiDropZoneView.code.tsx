export const MultiDropZoneViewCode = `
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
      preview: "https://picsum.photos/2000",
      uid: "123",
    },
    {
      preview: "https://picsum.photos/2000",
      uid: "1231",
    },
  ],
};

export const MultiDropZoneView = () => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString = useMemo<MainType>(() => {
    return {
      title: {
        type: ViewTypes.MultiDropZoneView,
        layoutProps: {
          md: 12,
          xs: 12,
        },
        inputProps: {
          label: "aaa",
          dropZoneOptions: {
            maxSize: 3145728,
          },
          helperText: "Allowed *.jpeg, *.jpg, *.png, *.gif",
        },
        showPreview: false,
        imageDownloader: dropzoneImageDownloader,
        onUpload: (_file, progress) =>
          new Promise<string>((_resolve, reject) => {
            setTimeout(() => {
              progress(50);
            }, 1000);
            setTimeout(() => {
              // resolve(new Date().getTime().toString());
              reject(new Error("aaaa"));
            }, 2000);
          }),
        onDelete: (_id, _isFromDefault) =>
          new Promise<void>((resolve, _reject) => {
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

export const SmallMultiDropZoneViewCode = `
import React, { useMemo } from "react";
import * as Yup from "yup";

import {
  Formalite,
  ViewTypes,
  useFormaliteRef
} from "@novin-dev/formalite";
import type { MainType } from "@novin-dev/formalite";

const validation = Yup.object({
  title: Yup.array().of(Yup.mixed()).nullable(),
});
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: [
    {
      preview: "https://picsum.photos/2000",
      uid: "123",
    },
    {
      preview: "https://picsum.photos/2000",
      uid: "1231",
    },
  ],
};

export const MultiDropZoneView = () => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString = useMemo<MainType>(() => {
    return {
      title: {
        type: ViewTypes.MultiDropZoneView,
        layoutProps: {
          md: 6,
          xs: 12,
        },
        inputProps: {
          label: "aaa",
          dropZoneOptions: {
            maxSize: 3145728,
          },
          helperText: "Allowed *.jpeg, *.jpg, *.png, *.gif",
        },
        isSmallView: true,
        showPreview: false,
        imageDownloader: dropzoneImageDownloader,
        onUpload: (_file, progress) =>
          new Promise<string>((_resolve, reject) => {
            setTimeout(() => {
              progress(50);
            }, 1000);
            setTimeout(() => {
              // resolve(new Date().getTime().toString());
              reject(new Error("aaaa"));
            }, 1000);
          }),
        onDelete: (_id, _isFromDefault) =>
          new Promise<void>((resolve, _reject) => {
            setTimeout(() => {
              resolve();
            }, 1000);
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
