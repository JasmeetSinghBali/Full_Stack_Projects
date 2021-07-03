import React from 'react';
import {Grid,Grow,Typography} from '@material-ui/core';

import useStyles from './styles.js';
import FxCard from '../FxCard/FxCard';

const FxCards=({fx_data})=>{
  const classes = useStyles();


  if(!fx_data){
    return(
      <>
      </>
    );
  }

  return(
    <Grow in>
      <Grid className={classes.container} container alignItems="strech" spacing={3}>
        <FxCard fx_clean_data={fx_data}/>
      </Grid>
    </Grow>
  );
}



export default FxCards;
