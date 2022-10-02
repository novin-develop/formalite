export const AutomaticallySelectCode = `
import React, { useMemo } from "react";
import * as Yup from "yup";

import {
  Formalite,
  ViewTypes,
  useFormaliteRef
  FetchingDataEnum,
} from "@novin-dev/formalite";
import type { MainType } from "@novin-dev/formalite";

const validation = Yup.object({
  title: Yup.string().required(),
});
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: "1",
};

export const SelectView = () => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString = useMemo<MainType>(() => {
    return {
      title: {
        type: ViewTypes.SelectView,
        layoutProps: {
          md: 6,
          xs: 12,
        },
        dataFetching: {
          type: "AUTOMATIC",
          options: () => new Promise((resolve, reject) => {
            fetch("https://reqres.in/api/users?page=1",{method:"get"})
              .then((response) => response.json())
              .then(res=>{
                const data = res.data
                const result = {}
                data.map(item => {
                  result[item.id] = {
                    label : item.first_name+ " " +item.last_name
                  }
                })
                resolve(result)
              })
              .catch (err => reject(err))
          })
        },
        inputProps: {
          label: "Select Title",
          helperText: "HelperText",
        },
      },
    };
  }, []);

  return (
    <Formalite<ValidationType>
      lang="en"
      formString={formString}
      initialValues={iniValues}
      validationSchema={validation}
      formRef={formRef}
      onSubmit={(values) => {
        console.log(values);
      }}
    />
  );
};
`;
