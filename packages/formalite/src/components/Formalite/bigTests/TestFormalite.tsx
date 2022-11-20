/* eslint-disable sonarjs/no-identical-functions */
import React, { useMemo, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import * as Yup from "yup";
import {
  FormalitePropsType,
  MainType,
  ViewTypes,
} from "@components/Formalite/Formalite.type";
import { ImageDownloaderPromise } from "@components/Formalite/elements/DropZoneView/Components/Global.type";
import { FetchingDataEnum, Language, Theme } from "@components/base/model";
import { RTL } from "@components/base/RTL";
import { getDirectionFromLang } from "@config/utils";
import { useFormaliteRef } from "@components/Formalite/config/useFormaliteRef";
import { PaddingContainer } from "@components/base/PaddingContainer";
import ThemeProvider from "@themes/index";
import Formalite from "../Formalite";

const validation = Yup.object({
  avatar: Yup.array().of(Yup.mixed()).nullable(),
  title: Yup.string().when("check", (selected, schema) =>
    selected?.includes("one") ? schema.required() : schema
  ),
  password: Yup.string(),
  price: Yup.string().required(),
  cardNumber: Yup.string(),
  selectView: Yup.string().required(),
  autoComplete: Yup.array().required("Required"),
  friends: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Required"),
        family: Yup.string().required("Required"),
      })
    )
    .required("Must have friends")
    .min(2, "Minimum of 2 friends"),
  singleDropZone: Yup.array().of(Yup.mixed()).min(1),
  MultiDropZone: Yup.array().min(2, "Aa").of(Yup.mixed()).nullable(),
  colorPicker: Yup.string(),
  radio: Yup.string().required(),
  datePicker: Yup.mixed().required(),
  dateTimePicker: Yup.mixed().required(),
  timePicker: Yup.mixed().required(),
  check: Yup.array().required().min(1, "At least select one item"),
  switch: Yup.array().required().min(1, "At least select one item"),
  bigRadio: Yup.string().required(),
  editor: Yup.string().required(),
  textDropZone: Yup.object({
    text: Yup.string().required("Required"),
    files: Yup.array().min(1),
  }),
}).required();
type ValidationType = Yup.InferType<typeof validation>;

type TestFormaliteProps = {
  themeMode: Theme;
  lang?: Language;
  direction?: "ltr" | "rtl";
} & Partial<FormalitePropsType<ValidationType>>;

export const TestFormalite = ({
  themeMode,
  lang = "en",
  ...props
}: TestFormaliteProps) => {
  const formRef = useFormaliteRef<ValidationType>();
  const iniValues: ValidationType = {
    avatar: [
      {
        preview: "https://picsum.photos/200",
        uid: "123",
      },
    ],
    title: "123",
    password: "",
    price: "",
    cardNumber: "",
    selectView: "one",
    friends: [
      {
        name: "1",
        family: "1",
      },
      {
        name: "2",
        family: "2",
      },
    ],
    singleDropZone: [
      {
        preview: "https://picsum.photos/300",
        uid: "123",
      },
    ],
    MultiDropZone: [
      {
        preview: "https://picsum.photos/200",
        uid: "123",
      },
      {
        preview: "https://picsum.photos/200",
        uid: "1231",
      },
    ],
    colorPicker: "",
    radio: "one",
    autoComplete: [],
    datePicker: new Date(),
    dateTimePicker: new Date(),
    timePicker: new Date(),
    check: ["one"],
    switch: ["two"],
    bigRadio: "two",
    editor: "123",
    textDropZone: {
      text: "aaaa123",
      files: [],
    },
  };

  return (
    <ThemeProvider
      themeMode={themeMode}
      themeDirection={props.direction || "ltr"}
    >
      <RTL direction={props.direction || "ltr"}>
        <PaddingContainer>
          <Container>
            <Formalite<ValidationType>
              offsetScroll={50}
              loading={props.loading || false}
              lang={lang}
              formString={useFromString()}
              initialValues={iniValues}
              validationSchema={validation}
              formRef={formRef}
              formMustRegex={
                /^[a-zA-Z0-9 /?\n><;:,{}[\]\-_+=!@#$%^&*|'.\\()~`"]*$/
              }
              onSubmit={(values) => {
                console.log(values);
              }}
              {...props}
            />
          </Container>
        </PaddingContainer>
      </RTL>
    </ThemeProvider>
  );
};

const imageDownloader = (filePath: string, controller: AbortController) =>
  new Promise<ImageDownloaderPromise>((resolve, reject) => {
    fetch(filePath)
      .then((resp) => resp.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolve({
            base64: reader.result,
            originalName: "original-name.jpg",
            size: 1234567,
          });
        };
      })
      .catch((e) => {
        reject(e);
      });
  });

function useFromString() {
  return useMemo<MainType>(() => {
    return {
      avatar: {
        type: ViewTypes.AvatarDropZoneView,
        layoutProps: {
          md: 3,
          xs: 12,
        },
        inputProps: {
          label: "aaa",
          dropZoneOptions: {
            maxSize: 3145728,
          },
          helperText: (
            <Typography
              variant="caption"
              sx={{
                mt: 2,
                mx: "auto",
                display: "block",
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              Allowed *.jpeg, *.jpg, *.png, *.gif <br /> max size of 5000{" "}
            </Typography>
          ),
        },
        showPreview: false,
        imageDownloader,
        onUpload: (file, progress) =>
          new Promise<string>((resolve, reject) => {
            setTimeout(() => {
              resolve("aaa");
            }, 1);
          }),
        onDelete: (id, isFromDefault, isSuccess) =>
          new Promise<void>((resolve, reject) => {
            setTimeout(() => {
              resolve();
            }, 1);
          }),
      },
      grouping2: {
        type: ViewTypes.GroupView,
        layoutProps: {
          md: 9,
          xs: 12,
        },
        options: {
          title: {
            type: ViewTypes.TextView,
            layoutProps: {
              xs: 12,
            },
            mustRegex:
              /^([1-9]\d*(\.)\d{1,4}|0?(\.)\d*[1-9]\d*|0?|[1-9]\d*|[1-9]\d*(\.))$/,
            inputProps: {
              label: "Title Input",
              helperText: "Aaa asdas d asd a dsd sad",
              placeholder: "some other title",
              onChange: (value) => {
                // console.log(value);
              },
            },
          },
          password: {
            type: ViewTypes.TextView,
            layoutProps: {
              xs: 12,
            },
            inputProps: {
              label: "Password",
              type: "password",
            },
          },
        },
      },

      price: {
        type: ViewTypes.PriceView,
        layoutProps: {
          md: 6,
          xs: 12,
        },
        numberFormatProps: {
          allowNegative: false,
        },
        inputProps: {
          label: "Price",
          onChange: (value) => {
            // console.log(value);
          },
        },
      },
      cardNumber: {
        type: ViewTypes.CardNumberView,
        layoutProps: {
          md: 6,
          xs: 12,
        },
        mask: "000 000",
        inputProps: {
          label: "CardNumber",
          onChange: (value) => {
            // console.log(value);
          },
        },
      },

      selectView: {
        type: ViewTypes.SelectView,
        layoutProps: {
          md: 6,
          xs: 12,
        },
        inputProps: {
          label: "SelectView",
          helperText: "Aaa asdas d asd a dsd sad",
          onChange: (value, additionalData) => {
            // console.log(value, additionalData);
          },
        },
        dataFetching: {
          type: FetchingDataEnum.MANUAL,
          loading: false,
          error: false,
          onRetry: () => {
            // console.log("fg forever");
          },
          data: {
            one: {
              label: "One",
            },
            two: {
              label: "Two",
            },
          },
        },
      },
      componentView: {
        type: ViewTypes.ComponentView,
        layoutProps: {
          md: 6,
          xs: 12,
        },
        render: (name) => {
          return <div>aaaa</div>;
        },
      },
      autoComplete: {
        type: ViewTypes.AutoCompleteView,
        layoutProps: {
          md: 6,
          xs: 12,
        },
        inputProps: {
          label: "Title of Simple view",
          helperText: "Helper text",
        },
        autoCompleteProps: {
          freeSolo: true,
          multiple: true,
        },
        dataFetching: {
          type: FetchingDataEnum.MANUAL,
          loading: false,
          error: false,
          onRetry: () => {
            // console.log("fg forever");
          },
          data: {
            one: {
              label: "one",
            },
            two: {
              label: "two",
            },
          },
        },
      },
      colorPicker: {
        type: ViewTypes.ColorPickerView,
        layoutProps: {
          md: 6,
          xs: 12,
        },
        inputProps: {
          label: "Color",
          helperText: "helper text",
        },
      },
      datePicker: {
        type: ViewTypes.DatePickerView,
        layoutProps: {
          md: 6,
          xs: 12,
        },
        inputProps: {
          label: "Date Picker",
          helperText: "helper text",
        },
        onChange: (date) => {
          // console.log("test datePicker onChange", date);
        },
      },
      dateTimePicker: {
        type: ViewTypes.DateTimePickerView,
        layoutProps: {
          md: 6,
          xs: 12,
        },
        inputProps: {
          label: "Date Time Picker",
          helperText: "helper text",
        },
        datePickerProps: {},
        onChange: (date) => {
          // console.log("test dateTimePicker onChange", date);
        },
      },
      timePicker: {
        type: ViewTypes.TimePickerView,
        layoutProps: {
          md: 6,
          xs: 12,
        },
        inputProps: {
          label: "Time Picker",
          helperText: "helper text",
        },
        timePickerProps: {},
        onChange: (date) => {
          // console.log("test timePicker onChange", date);
        },
      },
      editor: {
        type: ViewTypes.EditorView,
        layoutProps: {
          xs: 12,
        },
        editorProps: {
          isToolbarSimple: false,
          label: "Editor",
          helperText: "helper text",
          placeholder: "Placeholder...",
        },
      },
      friends: {
        type: ViewTypes.RepeaterView,
        layoutProps: {
          xs: 12,
        },
        removeAddBtn: false,
        buttonText: "Custom text",
        options: {
          name: {
            type: ViewTypes.TextView,
            layoutProps: {
              xs: 6,
            },
            inputProps: {
              label: "Name",
            },
          },
          family: {
            type: ViewTypes.TextView,
            layoutProps: {
              xs: 6,
            },
            inputProps: {
              label: "Family",
            },
          },
        },
      },
      singleDropZone: {
        type: ViewTypes.SingleDropZoneView,
        layoutProps: {
          md: 12,
          xs: 12,
        },
        inputProps: {
          label: "singleDropZone",
          dropZoneOptions: {
            maxSize: 3145728,
            accept: {
              "image/png": [".png"],
            },
          },
          helperText: `Allowed *.jpeg, *.jpg, *.png, *.gif `,
        },
        imageDownloader,
        onUpload: (file, progress) =>
          new Promise<string>((resolve, reject) => {
            setTimeout(() => {
              resolve(new Date().getTime().toString());
              // reject(new Error("aaaa"));
            }, 1);
          }),
        onDelete: (id, isFromDefault, isSuccess) =>
          new Promise<void>((resolve, reject) => {
            setTimeout(() => {
              resolve();
            }, 1);
          }),
      },
      MultiDropZone: {
        type: ViewTypes.MultiDropZoneView,
        layoutProps: {
          md: 12,
          xs: 12,
        },
        inputProps: {
          label: "",
          dropZoneOptions: {
            maxSize: 3145728,
          },
          helperText: `Allowed *.jpeg, *.jpg, *.png, *.gif`,
        },
        showPreview: false,
        imageDownloader,
        onUpload: (file, progress) =>
          new Promise<string>((resolve, reject) => {
            setTimeout(() => {
              // resolve(new Date().getTime().toString());
              reject(new Error("aaaa"));
            }, 1);
          }),
        onDelete: (id, isFromDefault, isSuccess) =>
          new Promise<void>((resolve, reject) => {
            setTimeout(() => {
              resolve();
            }, 1);
          }),
      },
      SmallDropZone: {
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
          helperText: `Allowed *.jpeg, *.jpg, *.png, *.gif`,
        },
        isSmallView: true,
        showPreview: true,
        imageDownloader,
        onUpload: (file, progress) =>
          new Promise<string>((resolve, reject) => {
            setTimeout(() => {
              resolve(new Date().getTime().toString());
              // reject(new Error("aaaa"));
            }, 1);
          }),
        onDelete: (id, isFromDefault, isSuccess) =>
          new Promise<void>((resolve, reject) => {
            setTimeout(() => {
              resolve();
            }, 1);
          }),
      },
      textDropZone: {
        type: ViewTypes.TextDropZoneView,
        layoutProps: {
          md: 6,
          xs: 12,
        },
        inputProps: {
          label: "aaa",
          placeholder: "bbb",
          dropZoneOptions: {
            maxSize: 3145728,
          },
          multiline: true,
          rows: 4,
          helperText: `Allowed *.jpeg, *.jpg, *.png, *.gif`,
        },
        showPreview: false,
        imageDownloader,
        onUpload: (file, progress) =>
          new Promise<string>((resolve, reject) => {
            setTimeout(() => {
              resolve(new Date().getTime().toString());
              // reject(new Error("aaaa"));
            }, 1);
          }),
        onDelete: (id, isFromDefault, isSuccess) =>
          new Promise<void>((resolve, reject) => {
            // console.log(isSuccess);
            setTimeout(() => {
              resolve();
            }, 1);
          }),
      },
      radio: {
        type: ViewTypes.RadioGroupView,
        labelProps: {
          // style: { color: "red" },
        },
        layoutProps: {
          md: 6,
          xs: 12,
        },
        dataFetching: {
          type: FetchingDataEnum.MANUAL,
          loading: false,
          error: false,
          onRetry: () => {
            // console.log("fg forever");
          },
          data: {
            one: {
              label: "one",
              additionalData: {
                x: 1,
                y: 2,
              },
            },
            two: {
              label: "two",
            },
          },
        },
        inputProps: {
          label: "RadioGroupView",
        },
      },
      check: {
        type: ViewTypes.CheckGroupView,
        labelProps: {
          // style: { color: "red" },
        },
        layoutProps: {
          md: 6,
          xs: 12,
        },
        dataFetching: {
          type: FetchingDataEnum.MANUAL,
          loading: false,
          error: false,
          onRetry: () => {
            // console.log("fg forever");
          },
          data: {
            one: {
              label: "one",
              description: "This is desc",
              additionalData: {
                x: 1,
                y: 2,
              },
            },
            two: {
              label: "two",
              description: "that is desc",
            },
          },
        },
        inputProps: {
          label: "CheckGroupView",
          onChange: (value, additionalData) => {
            // console.log(value, additionalData);
          },
        },
      },
      switch: {
        type: ViewTypes.SwitchGroupView,
        labelProps: {
          // style: { color: "red" },
        },
        layoutProps: {
          md: 6,
          xs: 12,
        },
        dataFetching: {
          type: FetchingDataEnum.MANUAL,
          loading: false,
          error: false,
          onRetry: () => {
            // console.log("fg forever");
          },
          data: {
            one: {
              label: "one",
            },
            two: {
              label: "two",
            },
          },
        },
        inputProps: {
          label: "SwitchGroupView",
        },
      },
      bigRadio: {
        type: ViewTypes.BigRadioGroupView,
        layoutProps: {
          md: 6,
          xs: 12,
        },
        dataFetching: {
          type: FetchingDataEnum.MANUAL,
          loading: false,
          error: false,
          onRetry: () => {
            // console.log("fg forever");
          },
          data: {
            one: {
              label: "one",
              description: "This is desc",
              additionalData: {
                x: 1,
                y: 2,
              },
            },
            two: {
              label: "two",
              description: "that is desc",
            },
          },
        },
        inputProps: {
          helperText: "BigRadioGroupView helperText",
        },
      },
    };
  }, []);
}
