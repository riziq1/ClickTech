import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AddOutlined, Edit } from '@material-ui/icons';
import { makeStyles, IconButton } from '@material-ui/core';
import axios from 'axios';
import SnackBarNotif from './Snackbar';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }));

export default function EditTrash({isOpen = false, trashname, trashfloor, trashid, shouldAmber}) {
  const [open, setOpen] = React.useState(false);
  const [openNotif, setOpenNotif] = React.useState(false);
  const [trashName, setTrashname] = React.useState(state => state = trashname);
  const [trashLevel, setTrashlevel] = React.useState(state => state = trashfloor);
  
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditTrash = () => {
    console.log(trashName, ' | ', trashLevel);
    axios.get(`http://localhost/SmartTrash/api/index.php?mode=trash_edit&trashname=${trashName}&trashfloor=${trashLevel}&trashid=${trashid}`)
    .then(response => {
      console.log(response.data.status);
      if (response.data.status === 'success')
      {
        setOpenNotif(true);
        handleClose();
        window.location.reload();
      }
    })
  };

  return (
    <>
      <IconButton className={shouldAmber} onClick={handleClickOpen}>
        <Edit />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ubah Properti Trash</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ubah Properti Trash
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="trashname"
            label="Trash Name"
            type="text"
            onChange={e => setTrashname(e.target.value)}
            value={trashName}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="trashfloor"
            label="Trash Floor Level"
            type="number"
            onChange={e => setTrashlevel(e.target.value)}
            value={trashLevel}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditTrash} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <SnackBarNotif openProps={openNotif} msg="succes updated" type="success" />
    </>
  );
}
