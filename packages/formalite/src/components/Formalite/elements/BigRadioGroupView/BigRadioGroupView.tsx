import React from "react";
import { FormikProps, FormikValues } from "formik";
import { OptionalObjectSchema } from "yup/lib/object";
import {
  BigRadioGroupViewOptionType,
  BigRadioGroupViewType,
} from "@components/Formalite/elements/BigRadioGroupView/BigRadioGroupView.type";
import { ViewTypes } from "@components/Formalite/Formalite.type";
import RadioGroupView from "@components/Formalite/elements/RadioGroupView/RadioGroupView";
import { FormatOptionFnType } from "@components/Formalite/elements/RadioGroupView/RadioGroupView.type";
import { Box } from "@mui/material";

type BigRadioGroupViewProps<T> = {
  allData: BigRadioGroupViewType;
  name: string;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: OptionalObjectSchema<any>;
  translator: Function;
};

const formatOptionFn: FormatOptionFnType<BigRadioGroupViewOptionType> = (
  option
) => {
  return {
    ...option,
    label: (
      <Box>
        <Box
          sx={{
            fontWeight: 600,
            fontSize: "1.1rem",
            lineHeight: "0.9",
          }}
        >
          {option.label}
        </Box>
        <Box
          sx={{
            fontSize: "1rem",
            color: "text.disabled",
          }}
        >
          {option.description}
        </Box>
      </Box>
    ),
  };
};

const BigRadioGroupView = <T extends FormikValues>(
  props: BigRadioGroupViewProps<T>
) => {
  const { allData, name, formik, loading, validationSchema, translator } =
    props;

  return (
    <RadioGroupView<T>
      key={name}
      name={name}
      allData={{
        ...allData,
        inputProps: {
          ...allData.inputProps,
          sx: {
            ...allData.inputProps.sx,
            "& .MuiFormControlLabel-root": {
              alignItems: "flex-start",
              marginBottom: 1.5,
              ".MuiRadio-root": {
                marginTop: -1,
              },
            },
          },
          row: false,
        },
        labelProps: {
          ...allData.labelProps,
          style: {
            ...allData.labelProps?.style,
            display: "none",
          },
        },
        type: ViewTypes.RadioGroupView,
      }}
      formik={formik}
      loading={loading}
      validationSchema={validationSchema}
      translator={translator}
      formatOptionFn={formatOptionFn}
    />
  );
};
export default React.memo(BigRadioGroupView) as typeof BigRadioGroupView;
