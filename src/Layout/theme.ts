import { createMuiTheme } from '@material-ui/core/styles'
import { orange, blue } from '@material-ui/core/colors'

interface CustomThemeProperties {
  drawerWidthOpen: number,
  drawerWidthClosed: number
}

// Cheaty workaround to avoid needing to delcare custom variables twice in type def
declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme extends CustomThemeProperties {}
  interface ThemeOptions extends CustomThemeProperties {}
}

const drawerWidthOpen = 240
const drawerWidthClosed = 60

const theme = createMuiTheme({
  drawerWidthOpen: drawerWidthOpen,
  drawerWidthClosed: drawerWidthClosed,
  palette: {
    primary: {
      main: blue[900]
    },
    secondary: {
      main: orange[500],
    }
  }
})

console.log({ theme })

export default theme