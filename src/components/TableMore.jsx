import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useEffect, useState } from 'react';
import Axios from 'axios';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function TableMore({ trashId }) {
    const classes = useStyles();
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost/SmartTrash/api/index.php?mode=all&trashid=${trashId}`)
            .then(response => {
                response.data.data.map(value => setDataTable(state => [...state, value]))
                
            });
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Data Sensor</TableCell>
                        <TableCell align="right">Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataTable.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="left">
                {row.data_sensor}
              </TableCell>
              <TableCell align="right">{row.timestamp}</TableCell>
            </TableRow>
          ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
