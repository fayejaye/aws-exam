import { createMuiTheme }  from '@material-ui/core/styles'
const theme = createMuiTheme({
  palette: {
    primary: { 500: '#2E8B57' },
  },
  overrides: {
    MuiSvgIcon:{
      fontSizeLarge: {
        fontSize:'4rem'
      }
    }
  }
})
export default theme