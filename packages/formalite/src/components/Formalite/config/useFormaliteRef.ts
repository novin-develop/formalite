import { useRef } from "react";
import { ReferenceType } from "@components/Formalite";

export const useFormaliteRef = <T>() => {
  return useRef<ReferenceType<T>>(null);
};
