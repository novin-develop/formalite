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

const oneRepeaterValidation = Yup.object({
  friends: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Required"),
        family: Yup.string().required("Required"),
      })
    )
    .required("Must have friends")
    .min(2, "Minimum of 2 friends"),
}).required("Required");

type OneRepeaterValidationType = Yup.InferType<typeof oneRepeaterValidation>;

type OneRepeaterExtraProps = {
  themeMode: Theme;
  lang?: Language;
  direction?: "ltr" | "rtl";
  resolve?: (value: unknown) => void;
  reject?: () => void;
} & Partial<FormalitePropsType<OneRepeaterValidationType>>;

const OneRepeaterExtra = ({
  themeMode,
  lang = "en",
  resolve,
  reject,
  ...props
}: OneRepeaterExtraProps) => {
  const formRef = useFormaliteRef<OneRepeaterValidationType>();
  const [result, setResult] = useState("");
  const iniValues: OneRepeaterValidationType = {
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
  };

  return (
    <ThemeProvider
      themeMode={themeMode}
      themeDirection={props.direction || "ltr"}
    >
      <RTL direction={props.direction || "ltr"}>
        <PaddingContainer>
          <Container>
            <span>{result}</span>
            <Formalite<OneRepeaterValidationType>
              lang={lang}
              isUpdateMode
              formString={useFromString()}
              initialValues={iniValues}
              validationSchema={oneRepeaterValidation}
              formRef={formRef}
              formMustRegex={
                /^[a-zA-Z0-9 /?\n><;:,{}[\]\-_+=!@#$%^&*|'.\\()~`"]*$/
              }
              onSubmit={(values, GResolve, GReject) => {
                console.log("123");
                if (GResolve) {
                  GResolve("");
                }
                if (GReject) {
                  GReject();
                }
              }}
              {...props}
            />
            <Button
              onClick={() => {
                formRef.current?.addRow("friends");
              }}
            >
              addRow
            </Button>
            <Button
              onClick={() => {
                formRef.current?.callSubmit(resolve, reject);
              }}
            >
              submit
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
    };
  }, []);
}
const OneRepeaterTemplate: ComponentStory<typeof OneRepeaterExtra> = (
  args,
  { globals }
) => {
  // @ts-ignore
  return <OneRepeaterExtra {...args} lang={globals?.locale || "en"} />;
};

export const OneRepeaterExtraComponent = OneRepeaterTemplate.bind({});
