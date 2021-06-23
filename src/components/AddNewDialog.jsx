import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AddOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import SnackBarNotif from './Snackbar';

const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }));

export default function FormDialog({isOpen}) {
  const [open, setOpen] = React.useState(false);
  const [openNotif, setOpenNotif] = React.useState(false);
  const [trashName, setTrashname] = React.useState('');
  const [trashLevel, setTrashlevel] = React.useState(1);
  
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveNewTrash = () => {
    console.log(trashName, ' | ', trashLevel);
    axios.get(`http://localhost/SmartTrash/api/index.php?mode=trash_save&trashname=${trashName}&trashfloor=${trashLevel}`)
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
    <div>
        <Button
          style={{ color: '#fff' }}
          size="large"
          className={classes.button}
          startIcon={<AddOutlined />}
          onClick={handleClickOpen}
        >
          Add New
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Trash</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add New Smart Trash Bin
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="trashname"
            label="Trash Name"
            type="text"
            onChange={e => setTrashname(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="trashfloor"
            label="Trash Floor Level"
            type="number"
            onChange={e => setTrashlevel(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveNewTrash} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <SnackBarNotif openProps={openNotif} msg="succes saved" type="success" />
    </div>
  );
}
