import React, { useEffect, useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@chakra-ui/theme'
import 'react-color-picker/index.css'
import { getTheme } from '~core/selectors/app'
import '@reach/combobox/styles.css'

import { wrapper } from '~core/store'
import { ErrorBoundary as BugsnagErrorBoundary } from '~utils/bugsnag'
import AppErrorBoundary from '~components/errorBoundaries/AppErrorBoundary'
import { AppProps } from 'next/app'
import { useSelector } from 'react-redux'

const Main = wrapper.withRedux(({ Component, pageProps }: AppProps) => {
  const appTheme = useSelector(getTheme)

  return (
    <BugsnagErrorBoundary>
      <ChakraProvider resetCSS theme={appTheme}>
        <AppErrorBoundary>
          <Component {...pageProps} />
        </AppErrorBoundary>
      </ChakraProvider>
    </BugsnagErrorBoundary>
  )
})

export default Main
