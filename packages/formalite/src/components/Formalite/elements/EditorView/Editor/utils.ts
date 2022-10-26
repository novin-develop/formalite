import { Theme } from "@mui/material/styles";
import { RefObject } from "react";

export const darkAndLightColors = (
  theme: Theme,
  boxRef: RefObject<HTMLDivElement>
) => {
  const r = document.querySelector<any>(":root")!;
  if (theme.palette.mode === "dark") {
    if (boxRef.current) {
      // eslint-disable-next-line no-param-reassign
      boxRef.current.style.border = "1px solid #ffffff3b";
    }
    // r.style.setProperty("--w-e-textarea-bg-color", "#333");
    r.style.setProperty("--w-e-textarea-color", "#fff");
    r.style.setProperty("--w-e-toolbar-bg-color", "#333");
    r.style.setProperty("--w-e-toolbar-color", "#fff");
    r.style.setProperty(
      "--w-e-toolbar-active-bg-color",
      theme.palette.grey[700]
    );
    r.style.setProperty("--w-e-toolbar-active-color", theme.palette.grey[500]);
    r.style.setProperty("--w-e-toolbar-active-color_options", "#fff");
  } else {
    if (boxRef.current) {
      // eslint-disable-next-line no-param-reassign
      boxRef.current.style.border = "1px solid #0000003b";
    }
    // r.style.setProperty("--w-e-textarea-bg-color", "#fff");
    r.style.setProperty("--w-e-textarea-color", "#333");
    r.style.setProperty("--w-e-toolbar-bg-color", "#fff");
    r.style.setProperty("--w-e-toolbar-color", "#333");
    r.style.setProperty(
      "--w-e-toolbar-active-bg-color",
      theme.palette.grey[200]
    );
    r.style.setProperty("--w-e-toolbar-active-color", theme.palette.grey[500]);
    r.style.setProperty("--w-e-toolbar-active-color_options", "#000");
  }
};
