import React,{useState} from 'react';

// core styles
import { makeStyles } from '@material-ui/core/styles';

// page header
import PageHeader from './PageHeader';

// core elements
import {Button,Grid,TextField,Typography,ButtonBase,Paper,CssBaseline,MenuItem} from '@material-ui/core';

// Icons
import EditLocationIcon from '@material-ui/icons/EditLocation';
import SaveIcon from '@material-ui/icons/Save';


// toastify for custom messages
import {ToastContainer,toast} from 'react-toastify';

import {updateLogEntry} from './API';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50ch',
      flexGrow: 1,
      [theme.breakpoints.down('sm')]:{
        margin: theme.spacing(1),
        width: '50ch',
        flexGrow: 1
      }
    }

  },
  button: {
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]:{
      margin: theme.spacing(1)
    }
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 800,
    [theme.breakpoints.down('sm')]:{
      maxWidth: 200,
    }
  },
  image: {
    width: 200,
    height: 200,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
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
  const [loading,setLoading]=useState(false);
  const [tblapikey,setKEYTBL]=useState();

  const handleTagChange= e =>{
    setTagUpdate(e.target.value);
    //console.log(e.target.value);
  }
  const handleRatingChange= e =>{
    setRatingUpdate(e.target.value);
    //console.log(e.target.value);
  }
  const handleCommentChange= e =>{
    setCommentUpdate(e.target.value);
    //console.log(e.target.value);
  }

  const handleapikey= e =>{
    setKEYTBL(e.target.value);
    //console.log(e.target.value);
  }


  // Sending Updated Data to Backend
  const handleSubmit=async(e)=>{

    try{
      e.preventDefault();
      setLoading(true);
      const sendData={ratingupdate,commentupdate,tagupdate,tblapikey,updateid:travelentryid._id};
      if(!tblapikey){
        toast.error('🐱‍🚀401 Unauthorized!! Invalid API Key');
        setTimeout(()=>{setLoading(false);},2000);
        return console.error('Update Failed!!');
      }
      if(!ratingupdate || !commentupdate || !tagupdate){
        toast.error('🐱‍🚀Tag, Rating, Comments Field Cannot Be Empty!!');
        setTimeout(()=>{setLoading(false);},2000);
        return console.error('Update Failed!!');
      }
      if(commentupdate.length>40){
        toast.error('🐱‍🚀Comments Max Limit is 40 Characters!!');
        setTimeout(()=>{setLoading(false);},2000);
        return console.error('Update Failed!!');
      }


      //call the backend api with the updated data
      const response=await updateLogEntry(sendData);
      console.log(response);

      setLoading(false);
      toast.info('🐱‍👤 Redirecting...');



      //to reload the App component
      // set here some smooth transition like the cat giphy
      setTimeout(()=>{window.location.reload();},2000);


    }catch(error){
      console.error(error);
      toast.error('💀 Update Failed!!')
    }
    setLoading(false);
    return;
  }


  return(
    <>
      {window.screen.width<=600||window.screen.height<=1100?
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      :
      <ToastContainer
        position="bottom-center"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />}
      {window.screen.width<=600||window.screen.height<=1100?null:<PageHeader
        title="Updating Travel Entry ID"
        subTitle={travelentryid._id}
        icon={<EditLocationIcon fontSize="large" />}
      />}
      <br />
      {window.screen.width<=600||window.screen.height<=1100?
      <div className={classes.root}>
        <Grid container>
          <Grid item xs= {0}>
            {/*================ ACTUAL UPDATE FORM GOES HERE==================*/}
            <form onSubmit={handleSubmit}>
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
                  label="Your comments max limit 40 characters.."
                  placeholder={travelentryid.comments}
                  onChange={handleCommentChange}
                  value={commentupdate}
                  row={10}
                  multiline
                />
                <TextField
                  type="password"
                  variant="filled"
                  label="Enter Travel Bucket List API Key"
                  helperText="Contact devs.us.1984@gmail.com for API KEY"
                  onChange={handleapikey}
                  value={tblapikey}
                />
                <Paper>
                  {!loading?<Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                  :
                  <Button
                    disabled
                    variant="outlined"
                    color="primary"
                    size="large"
                    className={classes.button}
                  >
                    🥜 🦨Updating..
                  </Button>
                }
                </Paper>
              </Paper>
            </form>
            <CssBaseline />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={1}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                 Updating:
                </Typography>
                <hr />
                <Typography variant="body2" color="gutterBottom">
                  {!ratingupdate?`${travelentryid.rating}`:`${ratingupdate}`}
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
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">ID:{travelentryid._id}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
      :
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
            <form onSubmit={handleSubmit}>
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
                  label="Your comments max limit 40 characters.."
                  placeholder={travelentryid.comments}
                  onChange={handleCommentChange}
                  value={commentupdate}
                  row={10}
                  multiline
                />
                <TextField
                  type="password"
                  variant="filled"
                  label="Enter Travel Bucket List API Key"
                  helperText="Contact devs.us.1984@gmail.com for API KEY"
                  onChange={handleapikey}
                  value={tblapikey}
                />
                <Paper>
                  {!loading?<Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                  :
                  <Button
                    disabled
                    variant="outlined"
                    color="primary"
                    size="large"
                    className={classes.button}
                  >
                    🥜 🦨Updating..
                  </Button>
                }
                </Paper>
              </Paper>
            </form>
            <CssBaseline />
          </Grid>
        </Grid>
      </div>
      }


    </>
  )
}

export default LogUpdateEntryForm;
