import * as Yup from "yup";
import { Language, Theme } from "@components/base/model";
import {
  FormalitePropsType,
  FormaliteTextView,
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
import { Simulate } from "react-dom/test-utils";
import input = Simulate.input;

const customComponentValidation = Yup.object({
  title: Yup.string().required("Required"),
}).required("Required");

type CustomComponentValidationType = Yup.InferType<
  typeof customComponentValidation
>;

type CustomComponentExtraProps = {
  themeMode: Theme;
  lang?: Language;
  direction?: "ltr" | "rtl";
} & Partial<FormalitePropsType<CustomComponentValidationType>>;

const CustomComponentExtra = ({
  themeMode,
  lang = "en",
  ...props
}: CustomComponentExtraProps) => {
  const formRef = useFormaliteRef<CustomComponentValidationType>();
  const iniValues: CustomComponentValidationType = {
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
            <Formalite<CustomComponentValidationType>
              loading={loading}
              isUpdateMode
              formString={useFromString()}
              initialValues={iniValues}
              validationSchema={customComponentValidation}
              formRef={formRef}
              components={{
                // eslint-disable-next-line react/no-unstable-nested-components
                TextView: (props1) => (
                  <div style={{ backgroundColor: "#042859" }}>
                    <FormaliteTextView {...props1} />
                  </div>
                ),
              }}
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
const CustomComponentTemplate: ComponentStory<typeof CustomComponentExtra> = (
  args,
  { globals }
) => {
  // @ts-ignore
  return <CustomComponentExtra {...args} lang={globals?.locale || "en"} />;
};

export const CustomComponentExtraComponent = CustomComponentTemplate.bind({});
