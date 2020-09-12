import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Drawer, AppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
// import EditIcon from "@material-ui/icons/Edit";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import MobileMenu from "./MobileMenu";

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    //Hamburger
    marginLeft: 5,
    marginRight: 15,
  },
  hide: {
    display: "none",
  },
  drawer: {
    //Vertical Menu
    width: drawerWidth,
    whiteSpace: "nowrap", //Vertical Menu Item Text to be on 1 line
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8) + 1, //Hidden Drawer width
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    display: "flex",
    alignItems: "center",
  },
  listItemText: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  mobileMenu: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  desktopMenu: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  signOut: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

interface Props {
  appComp?: React.ReactNode;
}

const VerticalMenu = ({ appComp }: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    {
      icon: <HomeIcon />,
      text: "Home",
      link: "/",
    },
    {
      icon: <AddIcon />,
      text: "Add",
      link: "/addCard",
    },
    // {
    //   icon: <EditIcon />,
    //   text: "Edit",
    //   link: "/editCard",
    // },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar} disableGutters={true}>
          <div className={classes.desktopMenu}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
              <Typography style={{ marginLeft: "10px" }} variant="h6" noWrap>
                AWS Exam Preparation
              </Typography>
            </IconButton>
          </div>
          <div className={classes.mobileMenu}>
            <MobileMenu menuItems={menuItems} />
          </div>
          <div className={classes.signOut}>
            <AmplifySignOut />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuItems.map((item: any, index: number) => (
            <ListItem button key={index}>
              <Link to={item.link}>
                <ListItemIcon>{item.icon}</ListItemIcon>
              </Link>
              <Link to={item.link} className={classes.listItemText}>
                <ListItemText primary={item.text} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>{appComp}</div>
      </main>
    </div>
  );
};
export default VerticalMenu;
