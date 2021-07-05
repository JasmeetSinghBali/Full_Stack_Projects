import React from 'react';
import {Grid,Grow} from '@material-ui/core';

import useStyles from './styles.js';
import SMACard from '../SMACard/SMACard';

const SMACards=({sma_data,sma_symbol})=>{
  const classes = useStyles();


  if(!sma_data){
    return(
      <>
      </>
    );
  }

  return(
    <Grow in>
      <Grid className={classes.container} container alignItems="strech" spacing={3}>
        <SMACard sma_clean_data={sma_data} sma_symbol={sma_symbol} />
      </Grid>
    </Grow>
  );
}



export default SMACards;
