import { FormikProps, FormikValues } from "formik";
import { OptionalObjectSchema } from "yup/lib/object";
import { Grid, Skeleton, TextField } from "@mui/material";
import React, { useMemo } from "react";
import { getData, showErrorMessage } from "@components/Formalite/config/utils";
import { IMaskInput } from "react-imask";
import { CardNumberViewType } from "@components/Formalite/elements/CardNumberView/CardNumberView.type";
import { TextFieldBase } from "@components/Formalite/elements/Bases/TextFieldBase";
import { baseMemo } from "@components/Formalite/elements/Bases/functions/memo";
import { ObjectSchema } from "yup";

type CartNumberViewProps<T> = {
  allData: CardNumberViewType;
  name: string;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: ObjectSchema<any>;
  translator: Function;
  formMustRegex?: RegExp;
};

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const CartNumberView = <T extends FormikValues>(
  props: CartNumberViewProps<T>
) => {
  const {
    allData,
    name,
    formik,
    loading,
    validationSchema,
    translator,
    formMustRegex,
  } = props;
  const { onChange, placeholder, helperText, ...inputProps } =
    allData.inputProps;

  const TextMaskCustom = useMemo(
    () =>
      React.forwardRef<HTMLElement, CustomProps>((propsInner, ref) => {
        const { onChange: innerOnChange, ...other } = propsInner;
        return (
          <IMaskInput
            {...other}
            unmask
            mask={allData.mask}
            definitions={{
              "#": /[1-9]/,
            }}
            inputRef={ref as any}
            onAccept={(value: any) =>
              innerOnChange({ target: { name: propsInner.name, value } })
            }
            overwrite
          />
        );
      }),
    [allData.mask]
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
        InputProps={{
          inputComponent: TextMaskCustom as any,
          ...(inputProps.InputProps || {}),
        }}
      />
    </Grid>
  );
};
export default React.memo(CartNumberView, (prevProps, nextProps) => {
  try {
    return baseMemo(prevProps, nextProps);
  } catch (e) {
    return true;
  }
}) as typeof CartNumberView;
