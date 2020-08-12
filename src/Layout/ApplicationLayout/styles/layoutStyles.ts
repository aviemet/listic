import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 240

export default makeStyles((theme) => ({
  
  appBarSpacer: theme.mixins.toolbar,

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))
