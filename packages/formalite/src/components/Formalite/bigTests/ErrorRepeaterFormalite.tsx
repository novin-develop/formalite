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
  friends: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Required"),
        family: Yup.string().required("Required"),
      })
    )
    .required("Must have friends"),
  avatar: Yup.array().of(Yup.mixed()).nullable().min(1, "Required"),
}).required("Required");
type ValidationType = Yup.InferType<typeof validation>;

type ErrorRepeaterFormaliteProps = {
  themeMode: Theme;
  lang?: Language;
  direction?: "ltr" | "rtl";
} & Partial<FormalitePropsType<ValidationType>>;

export const ErrorRepeaterFormalite = ({
  themeMode,
  lang = "en",
  ...props
}: ErrorRepeaterFormaliteProps) => {
  const formRef = useFormaliteRef<ValidationType>();
  const iniValues: ValidationType = {
    friends: [
      {
        name: "",
        family: "",
      },
    ],
    avatar: [],
  };

  return (
    <ThemeProvider
      themeMode={themeMode}
      themeDirection={props.direction || "ltr"}
    >
      <RTL direction={props.direction || "ltr"}>
        <PaddingContainer>
          <Container id="aaa">
            <Formalite<ValidationType>
              offsetScroll={50}
              scrollReferenceId="aaa"
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
            <Button
              onClick={() => {
                formRef.current?.formik.setSubmitting(true);
                formRef.current?.callSubmit();
              }}
            >
              Submit
            </Button>
          </Container>
        </PaddingContainer>
      </RTL>
    </ThemeProvider>
  );
};

function useFromString() {
  return useMemo<MainType>(() => {
    return {
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
        },
        showPreview: false,
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
    };
  }, []);
}
