import React, { useEffect } from 'react';
import { addDecorator } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import { themes, create } from '@storybook/theming';
import addons from '@storybook/addons';
import { DocsContainer } from '@storybook/addon-docs';
import {
  DARK_MODE_EVENT_NAME, useDarkMode,
} from 'storybook-dark-mode';
import {getDirectionFromLang} from "@config/utils";
import { RTL } from "@components/base/RTL";
import ThemeProvider from "@themes/index";
import { useGlobals } from '@storybook/api';


addDecorator((storyFn, context) => withConsole()(storyFn)(context));

const createTheme = (mode) => create({
  base: mode,
  brandTitle: 'Formalite',
  // brandUrl: 'https://formalite.com/',
  // brandImage: '/formalite.svg',
});



const channel = addons.getChannel();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewMode: "docs",
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    values: [
      { name: 'light', value: '#f9f8f8' },
      { name: 'dark', value: '#1e1f21' },
    ],
  },
  darkMode: {
    dark: {
      ...createTheme("dark"),
    },
    light: {
      ...createTheme("light"),
    },
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Intro',
        ['Introduction', 'Quick Start','Formalite Props','Ref Object', 'Formalite Theming', 'Fetching Content','Connect To Outside' , 'Changelog'],
        'Components',
        [
          'Formalite',
          ['*', 'Examples'],
        ]
      ],
      locales: '',
    },
  },
  docs: {
    theme: createTheme("dark"),
    container: props => {
      const [isDark, setIsDark] = React.useState(false);

      useEffect(() => {
        channel.on(DARK_MODE_EVENT_NAME, setIsDark);
        return () => channel.removeListener(DARK_MODE_EVENT_NAME, setIsDark);
      }, [channel, setIsDark]);

      const { id: storyId, storyById } = props.context;
      const {
        parameters: { docs = {} },
      } = storyById(storyId);
      docs.theme = isDark ? themes.dark : themes.light;

      return <DocsContainer {...props} />;
    }
  }
}

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: 'US', title: 'English' },
        { value: 'fa', right: 'IR', title: 'Persian' },
      ],
    },
  },
};

const withaaa=(Story,context)=>{
  const { globals } = context;
  const isDark = useDarkMode();
  const direction = getDirectionFromLang(globals?.locale);

  return (
    <ThemeProvider themeMode={isDark?"dark":"light"} themeDirection={direction}>
      <RTL direction={direction}>
        <Story {...context} />
      </RTL>
    </ThemeProvider>
  )
}
export const decorators = [withaaa];
