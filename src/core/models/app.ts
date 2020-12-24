import theme, { Theme } from '@chakra-ui/theme'
import { createModel } from '@rematch/core'

type Overlay = undefined | { rect: DOMRect; id: string; type: ComponentType }

export type AppState = {
  showLayout: boolean
  showCode: boolean
  showTheme: boolean
  inputTextFocused: boolean
  overlay: undefined | Overlay
  theme: Theme
}

const app = createModel({
  state: {
    showLayout: true,
    showCode: false,
    showTheme: false,
    inputTextFocused: false,
    overlay: undefined,
    theme,
  } as AppState,
  reducers: {
    toggleBuilderMode(state: AppState): AppState {
      return {
        ...state,
        showLayout: !state.showLayout,
      }
    },
    toggleCodePanel(state: AppState): AppState {
      return {
        ...state,
        showTheme: false,
        showCode: !state.showCode,
      }
    },
    toggleTheme(state: AppState): AppState {
      return {
        ...state,
        showCode: false,
        showTheme: !state.showTheme,
      }
    },
    toggleInputText(state: AppState): AppState {
      return {
        ...state,
        inputTextFocused: !state.inputTextFocused,
      }
    },
    setOverlay(state: AppState, overlay: Overlay | undefined): AppState {
      return {
        ...state,
        overlay,
      }
    },
    setTheme(state: AppState, customTheme: Theme = {} as Theme): AppState {
      console.log('no state', {
        ...state,
        theme: {
          ...theme,
          ...customTheme,
        },
      })

      return {
        ...state,
        theme: {
          ...theme,
          ...customTheme,
        },
      }
    },
    'components/deleteComponent': (state: AppState): AppState => {
      return {
        ...state,
        overlay: undefined,
      }
    },
    '@@redux-undo/UNDO': (state: AppState): AppState => {
      return {
        ...state,
        overlay: undefined,
      }
    },
  },
})

export default app
