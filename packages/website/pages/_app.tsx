import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import '../styles/globals.css';
import {AppProps} from "next/app";
import {SettingsProvider} from "../components/Provider/SettingsContext";
import CustomThemeProvider from "../components/Provider/CustomThemeProvider";


const MyApp = (props:AppProps) => {
  const { Component, pageProps } = props;
  return (
    <SettingsProvider configs={{themeMode:"light",themeDirection:"ltr"}}>
        <CustomThemeProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </CustomThemeProvider>
    </SettingsProvider>
  );
};

export default MyApp;
