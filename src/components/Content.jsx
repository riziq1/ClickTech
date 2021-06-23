import React, {useState} from 'react';
import axios from 'axios';
import AddTrashCard from './AddTrashCard';
import { Grid } from '@material-ui/core';
import TrashList from './TrashList';
import { useEffect } from 'react';

const Content = () => {
    const [trash, setTrash] = useState([]);
    useEffect(() => {
      axios.get('http://localhost/SmartTrash/api/index.php?mode=trash_data',{
            method: 'GET',
            mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
          }).then((response)=>{
            response.data.data.map(value => {
              setTrash(state => [...state, value]);
            })
        });
    }, []);
  
    return (
      <>
      {trash.map((value, index)=> (
        <Grid xs={6} sm={3} item key={index}>
          <TrashList trashid={value.trash_id} dataValue={value} />
        </Grid>
      ))}
      </>
    );
};

export default Content;