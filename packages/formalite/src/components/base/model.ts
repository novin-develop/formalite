import { ReactNode } from "react";

export type Direction = "rtl" | "ltr";
export type Language = "en" | "fa" | string;
export type Theme = "dark" | "light";

export type WithChildren<T> = T & {
  children: ReactNode;
};

export enum FetchingDataEnum {
  AUTOMATIC = "AUTOMATIC",
  MANUAL = "MANUAL",
}
