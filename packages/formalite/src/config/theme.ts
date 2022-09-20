import { Theme } from "@components/base/model";

export const light = {
  colors: {
    board: {
      listDraggingBg: "#efefef",
      listBorderColor: "#f5f5f5",
      listBorderHoverColor: "#edeae9",

      textColor: "#1e1f21",

      buttonBg: "transparent",
      buttonHoverBg: "#37171708",

      scrollbarBg: "#f1f1f1",
      scrollThumbBG: "#c1c1c1",

      cardBg: "#fff",

      inputBg: "#fff",
    },
  },
  shadow: {
    elevationSmall: "0 0 0 1px #edeae9, 0 1px 4px 0 rgba(109, 110, 111, 0.08)",
    elevationMedium:
      "0 0 0 1px #edeae9, 0 2px 10px 0 rgba(109, 110, 111, 0.08)",
    elevationMediumHover:
      "0 0 0 1px #afabac, 0 2px 10px 0 rgba(109, 110, 111, 0.08)",
  },
};

export const dark = {
  colors: {
    board: {
      listDraggingBg: "#282a2c",
      listBorderColor: "#424244",
      listBorderHoverColor: "#7e7e7e",

      textColor: "#f5f4f3",

      buttonBg: "transparent",
      buttonHoverBg: "#ffffff0f",

      scrollbarBg: "#424242",
      scrollThumbBG: "#686868",

      cardBg: "#2a2b2d",

      inputBg: "#2a2b2d",
    },
  },
  shadow: {
    elevationSmall: "0 0 0 1px #424244",
    elevationMedium: "0 0 0 1px #424244",
    elevationMediumHover: "0 0 0 1px #6a696a",
  },
};

export const getTheme = (mode: Theme) => (mode === "dark" ? dark : light);
