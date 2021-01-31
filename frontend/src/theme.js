import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    body1: {
      fontSize: "1.7rem",
    }
  },
  MuiTextField: {
    root: {
      margin: 8
    }
  },
  MuiInputBase: {
    input: {
      height: 30
    }
  },
  palette: {
    primary: {
      main: "#903b0d",
    },
  }
  //
})

export default theme
