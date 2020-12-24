import { RootState } from '~core/store'

export const getShowLayout = (state: RootState) => state.app.showLayout

export const getShowCode = (state: RootState) => state.app.showCode

export const getShowTheme = (state: RootState) => state.app.showTheme

export const getTheme = (state: RootState) => state.app.theme

export const getFocusedComponent = (id: IComponent['id']) => (
  state: RootState,
) => state.app.inputTextFocused && state.components.present.selectedId === id

export const getInputTextFocused = (state: RootState) =>
  state.app.inputTextFocused
