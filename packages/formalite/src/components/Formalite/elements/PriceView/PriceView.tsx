import React, { useMemo } from "react";
import { FormikProps, FormikValues } from "formik";
import { OptionalObjectSchema } from "yup/lib/object";
import NumberFormat from "react-number-format";
import { Grid } from "@mui/material";
import { PriceViewType } from "@components/Formalite/elements/PriceView/PriceView.type";
import { baseMemo } from "@components/Formalite/elements/Bases/functions/memo";
import { TextFieldBase } from "@components/Formalite/elements/Bases/TextFieldBase";

type PriceViewProps<T> = {
  allData: PriceViewType;
  name: string;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: OptionalObjectSchema<any>;
  translator: Function;
  formMustRegex?: RegExp;
};

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const PriceView = <T extends FormikValues>(props: PriceViewProps<T>) => {
  const {
    allData,
    name,
    formik,
    loading,
    validationSchema,
    translator,
    formMustRegex,
  } = props;
  const { onChange, ...inputProps } = allData.inputProps;

  const NumberFormatCustom = useMemo(
    () =>
      React.forwardRef<NumberFormat<any>, CustomProps>(
        (numberFormatProps, ref) => {
          const { onChange: numberOnChange, ...other } = numberFormatProps;
          return (
            <NumberFormat
              {...other}
              isAllowed={(values) => {
                if (allData.mustRegex instanceof RegExp) {
                  return allData.mustRegex.test(values.value);
                }
                return true;
              }}
              getInputRef={ref}
              onValueChange={(values) => {
                numberOnChange({
                  target: {
                    name: numberFormatProps.name,
                    value: values.value,
                  },
                });
              }}
              thousandSeparator
              isNumericString
              {...(allData.numberFormatProps ? allData.numberFormatProps : {})}
            />
          );
        }
      ),
    /* eslint-disable react-hooks/exhaustive-deps */
    [
      JSON.stringify(allData.mustRegex),
      JSON.stringify(allData.numberFormatProps),
    ]
    /* eslint-enable react-hooks/exhaustive-deps */
  );

  return (
    <Grid item {...allData.layoutProps}>
      <TextFieldBase
        formik={formik}
        loading={loading}
        validationSchema={validationSchema}
        translator={translator}
        name={name}
        mustRegex={[allData.mustRegex, formMustRegex]}
        {...inputProps}
        onChange={(value) => {
          if (typeof onChange === "function") {
            onChange(parseFloat(value || "0"));
          }
        }}
        InputProps={{
          inputComponent: NumberFormatCustom as any,
          ...(inputProps.InputProps || {}),
        }}
      />
    </Grid>
  );
};
export default React.memo(PriceView, (prevProps, nextProps) => {
  try {
    return baseMemo(prevProps, nextProps);
  } catch (e) {
    return true;
  }
}) as typeof PriceView;
