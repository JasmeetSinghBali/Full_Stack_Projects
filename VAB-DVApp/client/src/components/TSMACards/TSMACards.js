import React from 'react';
import {Grid,Grow} from '@material-ui/core';

import useStyles from './styles.js';
import TSMACard from '../TSMACard/TSMACard';

const TSMACards=({tsma_data,tsma_symbol})=>{
  const classes = useStyles();


  if(!tsma_data){
    return(
      <>
      </>
    );
  }

  return(
    <Grow in>
      <Grid className={classes.container} container alignItems="strech" spacing={3}>
        <TSMACard tsma_clean_data={tsma_data} tsma_symbol={tsma_symbol} />
      </Grid>
    </Grow>
  );
}



export default TSMACards;
