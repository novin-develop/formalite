import { useEffect, useRef } from "react";
import { Direction, Language } from "@components/base/model";

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
