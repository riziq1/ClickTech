import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {More} from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { useEffect } from 'react';
import Axios from 'axios';
import { useState } from 'react';
import TableMore from './TableMore';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({shouldAmber, trashid, name}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton className={shouldAmber} aria-label="share" onClick={handleClickOpen}>
          <More />
      </IconButton>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Semua data: {name}
            </Typography>
          </Toolbar>
        </AppBar>
        <Typography variant="h6">
          Trash ID: {trashid}
        </Typography>
        <List>
          <TableMore trashId={trashid} />
        </List>
      </Dialog>
    </div>
  );
}
