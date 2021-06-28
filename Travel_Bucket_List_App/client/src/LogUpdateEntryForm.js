import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PageHeader from './PageHeader';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import {Grid,TextField,Divider,Typography,ButtonBase,Paper,CssBaseline,MenuItem} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50ch',
      flexGrow: 1
    }

  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 800,
  },
  image: {
    width: 200,
    height: 200,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  }
}));

const tagoptions=[
  {
    value:'The Weekend Break',
    label: 'The Weekend Break'
  },
  {
    value:'The Package Holiday',
    label:'The Package Holiday'
  },
  {
    value:'The Group Tour',
    label:'The Group Tour'
  },
  {
    value:'The Caravan/RV Road',
    label:'The Caravan/RV Road'
  },
  {
    value:'Volunteer Travel Trip',
    label:'Volunteer Travel Trip'
  },
  {
    value:'Long Term Slow Travel',
    label:'Long Term Slow Travel'
  },
  {
    value:'The Gap Year',
    label:'The Gap Year'
  },
  {
    value:'Visiting Friends or Relatives',
    label:'Visiting Friends or Relatives'
  },
  {
    value:'Event Travel',
    label:'Event Travel'
  },
  {
    value:'Business Travel',
    label:'Business Travel'
  }
]

const ratingoptions=[
  {
    value:'⭐',
    label: '⭐'
  },
  {
    value:'⭐⭐',
    label:'⭐⭐'
  },
  {
    value:'⭐⭐⭐',
    label:'⭐⭐⭐'
  },
  {
    value:'⭐⭐⭐⭐',
    label:'⭐⭐⭐⭐'
  },
  {
    value:'⭐⭐⭐⭐⭐',
    label:'⭐⭐⭐⭐⭐'
  }
]


const LogUpdateEntryForm=({travelentryid})=>{

  // Travel Entry Old Data to be updated
  //console.log('Inside updateform component')
  //console.log(travelentryid);




  const classes = useStyles();

  const [tagupdate,setTagUpdate]=useState();
  const [ratingupdate,setRatingUpdate]=useState();
  const [commentupdate,setCommentUpdate]=useState();

  const handleTagChange= e =>{
    setTagUpdate(e.target.value);
    console.log(e.target.value);
  }
  const handleRatingChange= e =>{
    setRatingUpdate(e.target.value);
    console.log(e.target.value);
  }
  const handleCommentChange= e =>{
    setCommentUpdate(e.target.value);
    console.log(e.target.value);
  }


  return(
    <>
      <PageHeader
        title="Updating Travel Entry ID"
        subTitle={travelentryid._id}
        icon={<EditLocationIcon fontSize="large" />}
      />
      <Divider />
      <br />
      <div className={classes.root}>
        <Grid container>
          <Grid item xs= {6}>
                  <Paper className={classes.paper}>
               <Grid container spacing={2}>
                 <Grid item>
                   <ButtonBase className={classes.image}>
                     <img className={classes.img} alt="complex" src={travelentryid.image} />
                   </ButtonBase>
                 </Grid>
                 <Grid item xs={12} sm container>
                   <Grid item xs container direction="column" spacing={2}>
                     <Grid item xs>
                       <Typography gutterBottom variant="subtitle1">
                        📝 Description:
                       </Typography>
                       <Typography variant="body2" color="gutterBottom">
                         {travelentryid.description}
                       </Typography>
                       <hr />
                       <Typography variant="body2" color="gutterBottom">
                        {!tagupdate?`🏷️  ${travelentryid.title}`
                         :
                         `🏷️  ${tagupdate}`
                        }
                       </Typography>
                       <hr />
                       <Typography variant="body2" color="gutterBottom">
                        {!commentupdate?`✏️ ${travelentryid.comments}`:`✏️ ${commentupdate}`}
                       </Typography>
                       <hr />
                       <Typography variant="body2" color="textSecondary">
                         🎯 lat: {travelentryid.latitude}
                       </Typography>
                       <Typography variant="body2" color="textSecondary">
                         🎯 long: {travelentryid.longitude}
                       </Typography>
                       <Typography variant="body2" color="textSecondary">
                        📅  {travelentryid.visitDate}
                       </Typography>
                     </Grid>
                   </Grid>
                   <Grid item>
                     <Typography variant="subtitle1">{!ratingupdate?`${travelentryid.rating}`:`${ratingupdate}`}</Typography>
                   </Grid>
                 </Grid>
               </Grid>
             </Paper>
          </Grid>
          <Grid item xs= {6}>
            <CssBaseline />
            {/*================ ACTUAL UPDATE FORM GOES HERE==================*/}
            <form>
              <Paper>
                <TextField
                  select
                  helperText="Please select type of travel"
                  onChange={handleTagChange}
                  value={tagupdate}
                  variant="filled"
                  label="Tag" >

                  {tagoptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}

                </TextField>
                <TextField
                  select
                  helperText="Please give rating"
                  onChange={handleRatingChange}
                  value={ratingupdate}
                  variant="filled"
                  label="Rating" >
                  {ratingoptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </ TextField>
                <TextField
                  variant="filled"
                  helperText="Hint: If you are a Window user then press Windows logo key + . (period) on your keyboard for emojis..."
                  label="Your comments"
                  placeholder={travelentryid.comments}
                  onChange={handleCommentChange}
                  value={commentupdate}
                  row={10}
                  multiline
                  maxlength={10}
                />
              </Paper>
            </form>
            <CssBaseline />
          </Grid>
        </Grid>
      </div>

    </>
  )
}

export default LogUpdateEntryForm;
