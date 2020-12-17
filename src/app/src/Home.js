import React from 'react'
import {
  makeStyles,
  AppBar,
  Toolbar,
  Drawer,
  Button,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Grid,
  Hidden,
  Switch,
} from '@material-ui/core'

import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home'
import Whatshot from '@material-ui/icons/Whatshot'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.background.dark,
  },
  appBar: {
    //boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1
  },
  logo: {
    marginLeft: theme.spacing(3)
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: 'none',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  icons: {
    paddingRight: theme.spacing(5),
  },
  grow: {
    flexGrow: 1,
  },
  listItemText: {
    fontSize: 14,
  },
  listItem: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  subheader: {
    textTransform: 'uppercase',
  },
}))

function Home({ darkMode, setDarkMode }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar color='inherit' className={classes.appBar}>
        <Toolbar>
          <DashboardIcon color='secondary' className={classes.logo} />
          <Typography
            variant='subtitle1'
            color='textPrimary'
            style={{ paddingLeft: 10, fontWeight: 600}}
          >
            Dashboard
          </Typography>

          <div className={classes.grow} />
          <Switch
            value={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className={classes.icons}
          />
          <Button
            startIcon={<SettingsIcon />}
            variant='outlined'
            color='secondary'
          >
            Setup
          </Button>
        </Toolbar>
      </AppBar>
      <Box display='flex'>
        <Hidden mdDown>
          <Drawer
            className={classes.drawer}
            variant='permanent'
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              <List>
                <ListItem button classes={{ root: classes.listItem }}>
                  <ListItemIcon>{<HomeIcon />}</ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.listItemText,
                    }}
                    primary='Manage Sensors'
                  />
                </ListItem>
                <ListItem button classes={{ root: classes.listItem }}>
                  <ListItemIcon>{<Whatshot />}</ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.listItemText,
                    }}
                    primary='Watcher'
                  />
                </ListItem>
              </List>
            </div>
          </Drawer>
        </Hidden>

        <Box p={8}>
          <Toolbar />
          <Typography
            variant='h5'
            color='textPrimary'
            style={{ fontWeight: 600 }}
          >
            Buchassa
          </Typography>

          <Grid container spacing={4}>
            
          </Grid>
        </Box>
      </Box>
    </div>
  )
}

export default Home