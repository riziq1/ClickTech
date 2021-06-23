import React, {useState} from 'react';
import { Typography, Button, AppBar, Toolbar, IconButton, makeStyles } from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import FormDialog from './AddNewDialog';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    backgroundColor: '#1976d2',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <AppBar position="absolute">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title} >
          Smart Trash
            </Typography>
            <FormDialog />
      </Toolbar> 
    </AppBar>
  );
}

export default Header;
