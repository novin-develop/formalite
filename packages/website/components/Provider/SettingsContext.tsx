import {ReactNode, useEffect, createContext, useState, useContext} from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
// hooks
// utils

// @type


// ----------------------------------------------------------------------
type SettingsContextProps = {
  themeMode : "dark" | "light",
  themeDirection : "rtl" | "ltr",

  onToggleMode: VoidFunction;
  onChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Direction
  onToggleDirection: VoidFunction;
  onChangeDirection: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDirectionByLang: (lang: string) => void;
}


const initialState: SettingsContextProps = {
  themeMode: "light",
  themeDirection: "ltr",

  // Mode
  onToggleMode: () => {},
  onChangeMode: () => {},

  // Direction
  onToggleDirection: () => {},
  onChangeDirection: () => {},
  onChangeDirectionByLang: () => {},
};

const SettingsContext = createContext(initialState);

// ----------------------------------------------------------------------

type SettingsProviderProps = {
  children: ReactNode;
  configs: Partial<SettingsContextProps>;
};

function SettingsProvider({ children, configs }: SettingsProviderProps) {
  const [store, setStore] = useState({...configs});
  const [settings, setSettings] = useLocalStorage("settings", { ...configs,...store });

  const setData = (newData:SettingsContextProps) => {
    setStore(newData);
    setSettings(newData);
  }

  // Mode

  const onToggleMode = () => {
    setData({
      ...settings,
      themeMode: settings.themeMode === "light" ? "dark" : "light",
    });
  };

  const onChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...settings,
      themeMode: (event.target as HTMLInputElement).value as  "light" | "dark",
    });
  };

  // Direction

  const onToggleDirection = () => {
    setData({
      ...settings,
      themeDirection: settings.themeDirection === "rtl" ? "ltr" : "rtl",
    });
  };

  const onChangeDirection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...settings,
      themeDirection: (event.target as HTMLInputElement)
        .value as "rtl" | "ltr",
    });
  };

  const onChangeDirectionByLang = (lang: string) => {
    setData({
      ...settings,
      themeDirection: ["ar"].includes(lang) ? "rtl" : "ltr",
    });
  };



  return (
    <SettingsContext.Provider
      value={{
        ...settings,

        // Mode
        onToggleMode,
        onChangeMode,

        // Direction
        onToggleDirection,
        onChangeDirection,
        onChangeDirectionByLang,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
const useSettings = () => useContext(SettingsContext);

export { SettingsProvider, SettingsContext,useSettings };
