import React from 'react';
import {Grid,Grow,Typography} from '@material-ui/core';

import useStyles from './styles.js';
import CompanyCard from '../CompanyCard/CompanyCard';

const CompanyCards=({companydata})=>{
  const classes = useStyles();

  const infoCards=[
    { color: '#00838f', title: '🐱‍🚀 VCB-DV App?', text: 'What does this app do?' },
    { color: '#283593', title: 'Search by Company', info: 'Microsoft,Tracking,\nOregon,Gemini...', text: 'Search for Microsoft' },
    { color: '#1565c0', title: 'FX Prices Terms', info: 'ILS to USD,\nINR to USD', text: 'FXP from INR to USD' },
    { color: '#A052DD', title: '🧐 What is equity?', text: 'equity' },
    { color: '#4527a0', title: 'SMA by Company', info: 'MSFT,', text: 'SMA for MSFT' }
  ];

  if(!companydata.length){
    return(
      <Grow in>
        <Grid className={classes.container} container alignItems="strech" spacing={3}>
          {infoCards.map((infoCard)=>(
            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
              <div className={classes.card} style={{backgroundColor: infoCard.color }}>
                <Typography variant="h5">
                  {infoCard.title}
                </Typography>
                {
                  infoCard.info ?
                    (<Typography variant="h6">
                      <strong>
                        {infoCard.title.split(' ')[2]};
                      </strong>
                        <br />
                        {infoCard.info}
                    </Typography>):null}
                <Typography variant="h6">Try saying: <br /><i>{infoCard.text}</i></Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }

  return(
    <Grow in>
      <Grid className={classes.container} container alignItems="strech" spacing={3}>
        {companydata.map((company,i)=>(
          <Grid key={i} item xs={12} sm={6} md={4} lg={3} style={{display:'flex'}}>
            <CompanyCard company={company} i={i}/>
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
}



export default CompanyCards;
