import {createGlobalStyle} from 'styled-components'

import {color} from './color'
import * as size from './size'
import * as text from './text'

export const theme = {
    color,
    size,
    text,
}

export const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: 'Eina03-Semibold', serif;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`
