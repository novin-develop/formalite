import { useEffect } from "react";
import { useFormikContext, FormikErrors } from "formik";

type PropTypes = {
  offsetScroll: number;
  scrollReferenceId?: string;
};

type GetElementPropsType<T> = {
  keys: (keyof T)[];
  errors: FormikErrors<T>;
};

const getElement = <T>({ keys, errors }: GetElementPropsType<T>) => {
  let errorElement: Element | null;

  if (keys.length && Array.isArray(errors[keys[0]])) {
    let newKey: string = "";
    for (let i = 0; i < (errors[keys[0]] as typeof errors[]).length; i += 1) {
      try {
        newKey = `${keys[0]}.${i}.${
          Object.keys((errors[keys[0]] as any[])?.[i])?.[0]
        }`;
        break;
      } catch (e) {
        // continue regardless of error
      }
    }
    errorElement =
      document.querySelector(`input[name="${newKey}"]`) ||
      document.querySelector(`textarea[name="${newKey}"]`) ||
      document.querySelector(`#formalite div[id="${newKey}"]`);
  } else {
    errorElement =
      document.querySelector(`input[name="${keys[0]}"]`) ||
      document.querySelector(`textarea[name="${keys[0]}"]`) ||
      document.querySelector(`#formalite div[id="${keys[0]}"]`);
  }

  return errorElement;
};

const ErrorFocus = <T>(props: PropTypes) => {
  // Get the context for the Formik form this component is rendered into.
  const { isSubmitting, isValidating, errors } = useFormikContext<T>();

  useEffect(() => {
    // Get all keys of the error messages.
    const keys = Object.keys(errors) as Array<keyof typeof errors>;
    // Whenever there are errors and the form is submitting but finished validating.
    if (keys.length > 0 && isSubmitting && !isValidating) {
      // We grab the first input element that error by its name.

      const errorElement = getElement<T>({ keys, errors });

      if (errorElement) {
        const offsetPosition =
          errorElement.getBoundingClientRect().top +
          window.pageYOffset -
          props.offsetScroll;
        // When there is an input, scroll this input into view.
        // console.log(offsetPosition);
        if (props.scrollReferenceId) {
          document.getElementById(props.scrollReferenceId)!.scrollTo({
            top:
              offsetPosition +
              document.getElementById(props.scrollReferenceId)!.scrollTop,
            behavior: "smooth",
          });
        } else {
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }

        // errorElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isSubmitting, isValidating, errors, props.offsetScroll]);

  // This component does not render anything by itself.
  return null;
};

export default ErrorFocus;
