import * as Yup from "yup";
import { Language, Theme } from "@components/base/model";
import {
  FormalitePropsType,
  MainType,
  useFormaliteRef,
  ViewTypes,
} from "@components/Formalite";
import React, { useMemo, useState } from "react";
import ThemeProvider from "@themes/index";
import { RTL } from "@components/base/RTL";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { Button, Container } from "@mui/material";
import Formalite from "@components/Formalite/Formalite";
import { ComponentStory } from "@storybook/react";

const oneInputValidation = Yup.object({
  title: Yup.string().required("Required"),
}).required("Required");

type OneInputValidationType = Yup.InferType<typeof oneInputValidation>;

type OneInputExtraProps = {
  themeMode: Theme;
  lang?: Language;
  direction?: "ltr" | "rtl";
} & Partial<FormalitePropsType<OneInputValidationType>>;

const OneInputExtra = ({
  themeMode,
  lang = "en",
  ...props
}: OneInputExtraProps) => {
  const formRef = useFormaliteRef<OneInputValidationType>();
  const iniValues: OneInputValidationType = {
    title: "aa",
  };
  const [loading, setLoading] = useState(false);

  return (
    <ThemeProvider
      themeMode={themeMode}
      themeDirection={props.direction || "ltr"}
    >
      <RTL direction={props.direction || "ltr"}>
        <PaddingContainer>
          <Container>
            <Formalite<OneInputValidationType>
              loading={loading}
              isUpdateMode
              formString={useFromString()}
              initialValues={iniValues}
              validationSchema={oneInputValidation}
              formRef={formRef}
              translator={() => "aaa"}
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
            <Button
              onClick={() => {
                setLoading((pre) => !pre);
              }}
            >
              setLoading
            </Button>
            <Button
              onClick={() => {
                formRef.current?.callRest();
              }}
            >
              rest
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
      title: {
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
const OneInputTemplate: ComponentStory<typeof OneInputExtra> = (
  args,
  { globals }
) => {
  // @ts-ignore
  return <OneInputExtra {...args} lang={globals?.locale || "en"} />;
};

export const OneInputExtraComponent = OneInputTemplate.bind({});
