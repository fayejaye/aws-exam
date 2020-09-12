import React from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

interface Props {
    appComp?: React.ReactNode;
    signOut?: React.ReactNode;
    user: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        logo: {
            marginRight: theme.spacing(2),
            cursor: 'pointer'
        },
        title: {
            display: 'flex',
            alignItems: 'center'
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        content: {
            padding: 20
        }
    }),
);

const MenuAppBar = (props: Props) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Typography onClick={() => history.push('/')} variant="h6" className={classes.logo}>AWS Exam Prep</Typography>
                    <div className={classes.title}>{props.user} <AccountCircleIcon style={{ paddingLeft: '5px' }} />{props.signOut}</div>
                </Toolbar>
            </AppBar>
            {/* <AppBar color="primary" position="static">
      <Toolbar style={{ paddingLeft: 0, position: 'relative' }}>
        <Typography style={{ padding: 10, fontSize: '16px' }} color="inherit">fff</Typography>
        <IconButton style={{ position: 'absolute', right: 0 }} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        {title}
      </Toolbar>
    </AppBar> */}
            <div className={classes.content}>
                {props.appComp}
            </div>
        </div>
    );
}

export default MenuAppBar
