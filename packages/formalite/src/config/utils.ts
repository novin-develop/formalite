import { useEffect, useRef } from "react";
import { Direction, Language } from "@components/base/model";
import { CustomFile, OutsideFile } from "@components/Formalite";

export const removeUnnecessarySpaces = (text = "") => {
  return text.trim().replace(/\s+/g, " ");
};

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const ret: any = {};
  keys.forEach((key) => {
    ret[key] = obj[key];
  });
  return ret;
}

type LangDirMapType = {
  [key: string]: Language[];
};

export const getDirectionFromLang = (lang: Language): Direction => {
  const langDirMap: LangDirMapType = {
    rtl: ["fa"],
    ltr: ["en"],
  };

  if (langDirMap.ltr.includes(lang)) {
    return "ltr";
  }

  return "rtl";
};

export function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export const getNameFromUrl = (url: string | undefined): string => {
  return url?.split(/[#?]/)[0].trim().split("/").pop() || "";
};
export const removeUrlExtras = (url: string | undefined): string => {
  return url?.split(/[#?]/)[0].trim() || "";
};

export const getExtensionFromUrl = (file: CustomFile | OutsideFile) => {
  if (file.preview === "selected") {
    return (file as CustomFile).name.split(".")[1];
  }
  const lastPart =
    removeUrlExtras(file.preview)?.split("/")[
      (file.preview?.split("/").length || 1) - 1
    ] || "";
  if (lastPart.includes(".")) {
    return lastPart.split(".")[1];
  }
  return "jpg";
};
