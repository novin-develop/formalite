import { styled } from "@mui/material/styles";
import {alpha, CircularProgress} from "@mui/material";

export const RootStyle = styled("div")(({ theme }) => ({
  width: 144,
  height: 144,
  margin: "auto",
  borderRadius: "50%",
  padding: theme.spacing(1),
  border: `1px dashed ${alpha(theme.palette.grey[500],0.32)}`,
}));

export const DropZoneStyle = styled("div")({
  zIndex: 0,
  width: "100%",
  height: "100%",
  outline: "none",
  display: "flex",
  overflow: "hidden",
  borderRadius: "50%",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  "& > *": { width: "100%", height: "100%" },
  "&:hover": {
    cursor: "pointer",
    "& .placeholder": {
      zIndex: 9,
    },
  },
});

export const PlaceholderStyle = styled("div")(({ theme }) => ({
  display: "flex",
  position: "absolute",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.grey[theme.palette.mode === "light"?200:800],
  transition: theme.transitions.create("opacity", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&:hover": { opacity: 0.72 },
}));

// eslint-disable-next-line no-empty-pattern
export const CustomCircularProgress = styled(CircularProgress)(({}) => ({
  "&": {
    width: "100% !important",
    height: "100% !important",
    position: "absolute !important",
    top: 0,
    left: 0,
  },
}));
