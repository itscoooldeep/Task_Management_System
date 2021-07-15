import React from 'react';
import {Link} from "react-router-dom"
import PropTypes from 'prop-types';
import { AppBar, CssBaseline, Drawer, Hidden, IconButton, List } from '@material-ui/core';
import {Menu as MenuIcon, ExitToApp, Refresh, AssignmentTurnedIn} from "@material-ui/icons"
import {ListItem, ListItemText,ListItemIcon, Toolbar, Typography} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import NavbarItems from "../data/NavbarItems"
import { connect } from 'react-redux';
import { openSnackbar, setUserToken } from "../redux/actions"
import {resetDataAsync} from "../data/AsyncFetching"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
        width: "100%",
        height: "80px",
      },
      backgroundColor: "white",
      color: "#2c387e"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  toolbarMe:{
      color: "#2c387e"

  },
  drawerPaper: {
      width: drawerWidth,
      marginTop: "80px",

    [theme.breakpoints.up('sm')]: {
      marginTop: '0',
    },
  },
  content: {
      flexGrow: 1,
    //   34a0a4, 52b69a
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    };
    const handleLogOut = () =>
    {
        props.setUserToken( {
            token: "",
            userId: "",
            department: null,
            name: "",
        } )
        props.openSnackbar({isError: false, message: "Logged out!"})
        
    }
    const handleReset = async () =>
    {
        const result = await resetDataAsync()
        if ( !result.message ) {
            props.openSnackbar({isError: false, message: "Data is resetted!"})
        }
    }

  const drawer = (
    <div className={classes.toolbarMe}>
      <div className={classes.toolbar} />
            <List>
              <Hidden xsDown >
                    <Typography variant="h5" noWrap>
                      <AssignmentTurnedIn  style={{ color:"#2c387e"}}/> Task Manager
                    </Typography>
                  <br />
                  <br/>
              </Hidden>
        {NavbarItems.map((item) => (
          <ListItem button key={item.id}>
                <Link to={ item.link } style={ { textDecoration: "none", display:"flex" , color: "inherit"} }>
                    {item.icon}
                    <ListItemText primary={ item.title } />
                </Link>
          </ListItem>
        ) ) }
            <ListItem button onClick={handleReset}>
                <ListItemIcon><Refresh style={{ color:"#2c387e"}}/></ListItemIcon>
                <ListItemText primary="Reset Data" />
            </ListItem>
            <ListItem button onClick={handleLogOut}>
                <ListItemIcon><ExitToApp  style={{ color:"#2c387e"}}/></ListItemIcon>
                <ListItemText primary="Log Out" />
            </ListItem>

        </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
          <CssBaseline />
          <Hidden smUp>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
                      </IconButton>
                    
            
          <Typography variant="h6" noWrap>
            <AssignmentTurnedIn  style={{ color:"#2c387e"}}/> Task Manager
          </Typography>
        </Toolbar>
      </AppBar>
          </Hidden>

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            {props.children}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

const mapDispatchToProps = dispatch => ( {
    setUserToken: ( userInfo ) => dispatch( setUserToken( userInfo ) ),
    openSnackbar: ({...snackbar}) => dispatch(openSnackbar({...snackbar}))
})
export default connect(null, mapDispatchToProps)(ResponsiveDrawer);
