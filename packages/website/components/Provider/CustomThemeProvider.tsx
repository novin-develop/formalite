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
    },
  });
  return (
    <ThemeProvider theme={mainTheme}>
      {props.children}
    </ThemeProvider>
  )
}
export default CustomThemeProvider;
