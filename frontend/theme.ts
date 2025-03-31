import { createThemes, defaultComponentThemes } from '@tamagui/theme-builder'
import * as Colors from '@tamagui/colors'

const darkPalette = ['hsla(0, 0%, 1%, 1)','hsla(180, 2%, 7%, 1)','hsla(180, 2%, 12%, 1)','hsla(180, 2%, 18%, 1)','hsla(180, 2%, 23%, 1)','hsla(180, 2%, 29%, 1)','hsla(180, 2%, 34%, 1)','hsla(180, 2%, 39%, 1)','hsla(180, 2%, 45%, 1)','hsla(180, 2%, 50%, 1)','hsla(0, 15%, 93%, 1)','hsla(0, 15%, 99%, 1)']
const lightPalette = ['hsla(0, 0%, 100%, 1)','hsla(210, 6%, 98%, 1)','hsla(206, 6%, 92%, 1)','hsla(203, 5%, 86%, 1)','hsla(199, 5%, 80%, 1)','hsla(195, 4%, 74%, 1)','hsla(191, 4%, 68%, 1)','hsla(188, 3%, 62%, 1)','hsla(184, 3%, 56%, 1)','hsla(180, 2%, 50%, 1)','hsla(0, 15%, 15%, 1)','hsla(0, 15%, 1%, 1)']

const lightShadows = {
  shadow1: 'rgba(0,0,0,0.04)',
  shadow2: 'rgba(0,0,0,0.08)',
  shadow3: 'rgba(0,0,0,0.16)',
  shadow4: 'rgba(0,0,0,0.24)',
  shadow5: 'rgba(0,0,0,0.32)',
  shadow6: 'rgba(0,0,0,0.4)',
}

const darkShadows = {
  shadow1: 'rgba(0,0,0,0.2)',
  shadow2: 'rgba(0,0,0,0.3)',
  shadow3: 'rgba(0,0,0,0.4)',
  shadow4: 'rgba(0,0,0,0.5)',
  shadow5: 'rgba(0,0,0,0.6)',
  shadow6: 'rgba(0,0,0,0.7)',
}

// we're adding some example sub-themes for you to show how they are done, "success" "warning", "error":

const builtThemes = createThemes({
  componentThemes: defaultComponentThemes,

  base: {
    palette: {
      dark: darkPalette,
      light: lightPalette,
    },

    extra: {
      light: {
        ...Colors.green,
        ...Colors.red,
        ...Colors.yellow,
        ...lightShadows,
        shadowColor: lightShadows.shadow1,
      },
      dark: {
        ...Colors.greenDark,
        ...Colors.redDark,
        ...Colors.yellowDark,
        ...darkShadows,
        shadowColor: darkShadows.shadow1,
      },
    },
  },

  accent: {
    palette: {
      dark: ['hsla(133, 45%, 49%, 1)','hsla(133, 45%, 50%, 1)','hsla(133, 45%, 51%, 1)','hsla(133, 45%, 53%, 1)','hsla(133, 45%, 54%, 1)','hsla(133, 45%, 55%, 1)','hsla(133, 45%, 56%, 1)','hsla(133, 45%, 58%, 1)','hsla(133, 45%, 59%, 1)','hsla(133, 45%, 60%, 1)','hsla(250, 50%, 90%, 1)','hsla(250, 50%, 95%, 1)'],
      light: ['hsla(133, 45%, 57%, 1)','hsla(133, 45%, 59%, 1)','hsla(133, 45%, 61%, 1)','hsla(133, 45%, 63%, 1)','hsla(133, 45%, 65%, 1)','hsla(133, 45%, 68%, 1)','hsla(133, 45%, 70%, 1)','hsla(133, 45%, 72%, 1)','hsla(133, 45%, 74%, 1)','hsla(133, 45%, 76%, 1)','hsla(250, 50%, 95%, 1)','hsla(250, 50%, 95%, 1)'],
    },
  },

  childrenThemes: {
    warning: {
      palette: {
        dark: Object.values(Colors.yellowDark),
        light: Object.values(Colors.yellow),
      },
    },

    error: {
      palette: {
        dark: Object.values(Colors.redDark),
        light: Object.values(Colors.red),
      },
    },

    success: {
      palette: {
        dark: Object.values(Colors.greenDark),
        light: Object.values(Colors.green),
      },
    },
  },

  // optionally add more, can pass palette or template

  // grandChildrenThemes: {
  //   alt1: {
  //     template: 'alt1',
  //   },
  //   alt2: {
  //     template: 'alt2',
  //   },
  //   surface1: {
  //     template: 'surface1',
  //   },
  //   surface2: {
  //     template: 'surface2',
  //   },
  //   surface3: {
  //     template: 'surface3',
  //   },
  // },
})

export type Themes = typeof builtThemes

// the process.env conditional here is optional but saves web client-side bundle
// size by leaving out themes JS. tamagui automatically hydrates themes from CSS
// back into JS for you, and the bundler plugins set TAMAGUI_ENVIRONMENT. so
// long as you are using the Vite, Next, Webpack plugins this should just work,
// but if not you can just export builtThemes directly as themes:
export const themes: Themes =
  process.env.TAMAGUI_ENVIRONMENT === 'client' &&
  process.env.NODE_ENV === 'production'
    ? ({} as any)
    : (builtThemes as any)
