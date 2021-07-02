import React from 'react';
import {Card,CardActions,CardActionArea,CardContent,CardMedia,Button,Typography} from '@material-ui/core';
import useStyles from './styles.js';

const CompanyCard=({company,i})=>{
  const classes=useStyles();
  return(
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image="https://images.unsplash.com/photo-1567449303098-6dc0cc40a275?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{(new Date()).toDateString()}</Typography>
          <Typography variant="body2" color="textSecondary" component="h2">{company['9. matchScore']}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5">{company['1. symbol']}</Typography>
        <CardContent>
          <Typography  variant="body2" color="textSecondary" component="p">{company["1. symbol"]} located in the region of {company['4. region']} which is  {company['3. type']} capital based company, the market here opens at {company['5. marketOpen']} while closes at {company['6. marketClose']} the currency they deal in is {company['8. currency']}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="textSecondary" >{company['7. timezone']}</Button>
        <Typography variant="h5" color="primary">{i+1}</Typography>
      </CardActions>
    </Card>
  );
}



export default CompanyCard;
