import { useEffect, memo } from "react";
import { FormikValues, useFormikContext } from "formik";
import { OnFormChangeType } from "../Formalite.type";

interface FormObserverProps<T> {
  onFormChange: OnFormChangeType<T> | undefined;
}

const FormObserver = <T extends FormikValues>({
  onFormChange,
}: FormObserverProps<T>) => {
  const formik = useFormikContext<T>();
  useEffect(() => {
    if (onFormChange) {
      onFormChange(formik);
    }
  }, [formik, onFormChange]);
  return null;
};
export default memo(FormObserver) as typeof FormObserver;
