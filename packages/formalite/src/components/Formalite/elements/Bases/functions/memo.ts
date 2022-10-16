import { PropsWithChildren } from "react";
import compare from "react-fast-compare";
import {
  generateNestedKeyForYup,
  getData,
} from "@components/Formalite/config/utils";
import get from "lodash-es/get";

export const baseMemo = (
  prevProps: Readonly<PropsWithChildren<any>>,
  nextProps: Readonly<PropsWithChildren<any>>
) =>
  getData({ source: prevProps.formik.touched, key: prevProps.name }) ===
    getData({ source: nextProps.formik.touched, key: nextProps.name }) &&
  getData({ source: prevProps.formik.errors, key: prevProps.name }) ===
    getData({ source: nextProps.formik.errors, key: prevProps.name }) &&
  getData({ source: prevProps.formik.values, key: prevProps.name }) ===
    getData({ source: nextProps.formik.values, key: prevProps.name }) &&
  (
    get(
      prevProps.validationSchema,
      `${generateNestedKeyForYup(prevProps.name)}.deps`
    ) || []
  ).every(
    (item: string) =>
      getData({ source: prevProps.formik.values, key: item }) ===
      getData({ source: nextProps.formik.values, key: item })
  ) &&
  prevProps.allData?.inputProps?.disabled ===
    nextProps.allData?.inputProps?.disabled &&
  prevProps.loading === nextProps.loading && compare(
    prevProps.allData?.renderDependency,
    nextProps.allData?.renderDependency
  );
