import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import PageHeader from './PageHeader';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import {Grid} from '@material-ui/core';

const LogUpdateEntryForm=()=>{

  const { register, handleSubmit } = useForm();

  return(
    <>
      <PageHeader
        title="Update Travel Entry"
        subTitle="TBL Users Only"
        icon={<EditLocationIcon fontSize="large" />}
      />
      <Grid container>
        <Grid item xs= {6}>
          <h3>Something</h3>
        </Grid>
        <Grid item xs= {6}>
          <h3>Something</h3>
        </Grid>
      </Grid>
    </>
  )
}

export default LogUpdateEntryForm;
