import React from 'react';
import Button from '@material-ui/core/Button';
import {IconButton} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from 'axios';
import SnackBarNotif from './Snackbar';
import {Delete} from '@material-ui/icons';
import { useState } from 'react';

export default function DeleteDialog({trashid, shouldAmber}) {
  const [open, setOpen] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);

  const handleClickOpen = () => {
    setOpen(false,true,discovery, setOptionOpen (Notification:trueflSE));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    Axios.get(`http://localhost/SmartTrash/api/index.php?mode=trash_delete&trashid=${trashid}`)
    .then(response => {
        if(response.data.status === 'success')
        {
            setOpenNotif(true);
            window.location.reload();
        }
    });
};

  return (
    <>
       <IconButton
       style={{marginRight:200}}
          className={shouldAmber}
          aria-label="delete"
          onClick={handleClickOpensetOption:}
        >
          <Delete />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Trash?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You wanna delete this trash bin?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <SnackBarNotif openProps={openNotif} msg="succes delete" type="success" />
    </>
  );
}
