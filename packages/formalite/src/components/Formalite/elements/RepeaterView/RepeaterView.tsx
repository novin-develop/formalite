import React from "react";
import {
  Box,
  Button,
  Collapse,
  Divider,
  FormHelperText,
  Grid,
} from "@mui/material";
import { FieldArray, FormikProps, FormikValues } from "formik";
import { getData, getDefaultValue } from "@components/Formalite/config/utils";
import { itemRenderer } from "@components/Formalite/Formalite";
import { OptionalObjectSchema } from "yup/lib/object";
import { RepeaterViewType } from "@components/Formalite/elements/RepeaterView/RepeaterView.type";
import AddIcon from "@mui/icons-material/Add";
import { TransitionGroup } from "react-transition-group";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Language } from "@components/base/model";
import { useI18nContext } from "@components/base/I18nProvider";
import { ObjectSchema } from "yup";

type RepeaterViewProps<T> = {
  allData: RepeaterViewType;
  name: string;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: ObjectSchema<any>;
  translator: Function;
  lang: Language;
  isUpdateMode: boolean;
  formMustRegex?: RegExp;
};

const CustomDivider = () => {
  return (
    <Divider
      sx={(theme) => ({
        marginBottom: 1,
        borderStyle: "dashed",
        borderColor: theme.palette.mode === "light" ? "grey.400" : "grey.600",
      })}
    />
  );
};

const RepeaterView = <T extends FormikValues>(props: RepeaterViewProps<T>) => {
  const {
    allData,
    name,
    formik,
    loading,
    lang,
    validationSchema,
    translator,
    isUpdateMode,
    formMustRegex,
  } = props;
  const { t } = useI18nContext();

  return (
    <Grid item {...allData.layoutProps} id={name}>
      <Grid item xs={12}>
        <CustomDivider />
      </Grid>
      <FieldArray name={name}>
        {({ remove, push }) => (
          <Grid container direction="column">
            <TransitionGroup>
              {getData({ source: formik.values, key: name })?.length > 0 &&
                (getData({ source: formik.values, key: name }) as object[]).map(
                  (obj, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Collapse key={index}>
                      <Grid
                        item
                        container
                        spacing={1}
                        sx={(theme) => ({ marginTop: theme.spacing(1) })}
                      >
                        <Grid container item xs={12} spacing={3}>
                          {itemRenderer<T>({
                            formMustRegex,
                            form: allData.options,
                            formik,
                            loading,
                            lang,
                            isUpdateMode,
                            validationSchema,
                            translator,
                            repItem: {
                              name,
                              index,
                            },
                          })}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sx={{ display: "flex", justifyContent: "end" }}
                        >
                          <Button
                            color="error"
                            variant="text"
                            disabled={
                              loading ||
                              (allData.disableOfRemoveFunction
                                ? allData.disableOfRemoveFunction(obj)
                                : false)
                            }
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            <DeleteOutlineOutlinedIcon />
                            <Box component="span">
                              {t("fg-repeator-remove")}
                            </Box>
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <CustomDivider />
                        </Grid>
                      </Grid>
                    </Collapse>
                  )
                )}
            </TransitionGroup>

            {!allData.removeAddBtn && (
              <Grid item xs={12}>
                <Grid
                  sx={(theme) => ({ marginTop: theme.spacing(1) })}
                  style={{
                    width: "fit-content",
                    marginLeft: 0,
                    marginRight: 0,
                  }}
                >
                  <Button
                    disabled={loading}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "stretch",
                    }}
                    onClick={() => {
                      const data: { [key: string]: any } = {};
                      Object.keys(allData.options).forEach((item) => {
                        data[item] = getDefaultValue(
                          allData.options[item].type
                        );
                      });
                      push(data);
                    }}
                  >
                    <AddIcon />
                    {allData.buttonText || t("fg-repeator-add")}
                  </Button>
                </Grid>
              </Grid>
            )}

            {!Array.isArray(getData({ source: formik.errors, key: name })) &&
            getData({ source: formik.touched, key: name }) ? (
              <FormHelperText
                sx={(theme) => ({ color: theme.palette.error.main })}
              >
                {translator(getData({ source: formik.errors, key: name }))}
              </FormHelperText>
            ) : (
              ""
            )}
          </Grid>
        )}
      </FieldArray>
    </Grid>
  );
};
export default RepeaterView;
