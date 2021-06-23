import React, { useState } from 'react';
import clsx from 'clsx';
import { Card, CardContent, CardMedia, LinearProgress, withStyles, makeStyles, Typography, useTheme, CardActions, IconButton } from '@material-ui/core';
import FullScreenDialog from './FullScreenDialog';
import DeleteDialog from './DialogDelete';
import EditTrash from './EditTrash';
import { Favorite, Share } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    cardRoot: {
        width: '100%',
    },
    cardRootAmber: {
        backgroundColor: '#eb9534',
        color: '#ffffff',
    },
    cardRootRed: {
        backgroundColor: '#870000',
        color: '#ffffff',
    },
    cardRootwhite: {
        backgroundColor: '#FFFFFF',
        color: '#121212',
    },
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
    media: {
        height: 120,
    },
}));

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);

const TrashList = ({ trashid, dataValue }) => {
    const classes = useStyles();
    const themes = useTheme();
    let isAmber = dataValue.data_sensor_update > 70 && dataValue.data_sensor_update <= 80 ?
        classes.cardRootAmber : dataValue.data_sensor_update > 80 ?
            classes.cardRootRed : classes.cardRootwhite;

    const cardCondition = clsx(classes.cardRoot, isAmber);

    return (
        <Card className={cardCondition}>
            <CardMedia className={classes.media} image='./img/recycle.png' />
            <CardContent>
                <Typography component="h5" variant="h5">
                    Trash ID. {trashid}
                </Typography>
                <Typography variant="body2" component="p">
                    Trash Bin dengan nama "{dataValue.name}". Terletak di lantai {dataValue.floor_level}.
                </Typography>
                <BorderLinearProgress value={dataValue.data_sensor_update} variant="determinate" />
            </CardContent>
            <CardActions disableSpacing>
                <FullScreenDialog shouldAmber={isAmber} name={dataValue.name} trashid={dataValue.trash_id} />
                <EditTrash shouldAmber={isAmber} trashid={trashid} trashname={dataValue.name} trashfloor={dataValue.floor_level} />
                <DeleteDialog shouldAmber={isAmber} trashid={trashid} />
            </CardActions>
        </Card>
    )
};

export default TrashList;