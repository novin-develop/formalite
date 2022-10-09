import {ReactNode} from "react";
import {useSettings} from "./SettingsContext";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/system";


const CustomThemeProvider = (props:{children:ReactNode}) => {
  const {themeMode,themeDirection} = useSettings();

  const mainTheme = createTheme({
    direction:themeDirection,
    palette: {
      mode: themeMode,
      secondary:{
        light:"#834bff",
        main:"#651fff",
        dark:"#4615b2"
      }
    },
  });
  return (
    <ThemeProvider theme={mainTheme}>
      {props.children}
    </ThemeProvider>
  )
}
export default CustomThemeProvider;
