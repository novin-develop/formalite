import * as Yup from "yup";
import { Language, Theme } from "@components/base/model";
import {
  FormalitePropsType,
  MainType,
  useFormaliteRef,
  ViewTypes,
} from "@components/Formalite";
import ThemeProvider from "@themes/index";
import { RTL } from "@components/base/RTL";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { Button, Container } from "@mui/material";
import Formalite from "@components/Formalite/Formalite";
import React, { useMemo } from "react";
import { ComponentStory } from "@storybook/react";
import { ErrorTestFormalite } from "@components/Formalite/bigTests/ErrorTestFromalite";
import { ErrorRepeaterFormalite } from "@components/Formalite/bigTests/ErrorRepeaterFormalite";

/// ============================================== first EXTRA
const firstValidation = Yup.object({
  title: Yup.string().required("Required"),
}).required("Required");

type FirstValidationType = Yup.InferType<typeof firstValidation>;

type FirstExtraProps = {
  themeMode: Theme;
  lang?: Language;
  direction?: "ltr" | "rtl";
} & Partial<FormalitePropsType<FirstValidationType>>;

const FirstExtra = ({ themeMode, lang = "en", ...props }: FirstExtraProps) => {
  const formRef = useFormaliteRef<FirstValidationType>();
  const iniValues: FirstValidationType = {
    title: "aa",
  };

  return (
    <ThemeProvider
      themeMode={themeMode}
      themeDirection={props.direction || "ltr"}
    >
      <RTL direction={props.direction || "ltr"}>
        <PaddingContainer>
          <Container>
            <Formalite<FirstValidationType>
              loading={props.loading || false}
              lang={lang}
              isUpdateMode
              formString={useFromString()}
              initialValues={iniValues}
              validationSchema={firstValidation}
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
      avatar: {
        type: ViewTypes.TextView,
        layoutProps: {
          md: 3,
          xs: 12,
        },
        showOnUpdate: true,
        inputProps: {
          label: "aaa",
        },
      },
    };
  }, []);
}
const FirstTemplate: ComponentStory<typeof FirstExtra> = (
  args,
  { globals }
) => {
  // @ts-ignore
  return <FirstExtra {...args} lang={globals?.locale || "en"} />;
};

export const FirstExtraComponent = FirstTemplate.bind({});
// ---------------------------------------------------END OF FIRST
