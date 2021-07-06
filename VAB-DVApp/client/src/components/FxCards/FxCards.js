import React from 'react';
import {Grid,Grow} from '@material-ui/core';

import useStyles from './styles.js';
import FxCard from '../FxCard/FxCard';

const FxCards=({fx_data,frmSymbol,toSymbol})=>{
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
        <Grid item xs={12} sm={12} md={12} lg={12} style={{display:'flex'}}>
          <FxCard fx_clean_data={fx_data} frmSymbol={frmSymbol} toSymbol={toSymbol}/>
        </Grid>
      </Grid>
    </Grow>
  );
}



export default FxCards;
