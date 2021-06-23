import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, IconButton, makeStyles, Typography, useTheme } from '@material-ui/core';
import {AddCircleOutline} from '@material-ui/icons'
const useStyles = makeStyles((theme) => ({
    controls: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

const AddTrashCard = () => {
    const classes = useStyles();
    const themes = useTheme();

    return (
        <Card>
            <CardContent>
                <Typography component="h5" variant="h5">
                    Tambahkan Tempat Sampah
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Smart Trash Bin
                </Typography>
            </CardContent>
            <div className={classes.controls}>
                <IconButton aria-label="play/pause">
                    <AddCircleOutline className={classes.playIcon} />
                </IconButton>
            </div>
        </Card>
    )
};

export default AddTrashCard;