import React,{useState} from 'react';
import { useForm } from "react-hook-form";
import ProgressBar from 'react-bootstrap/ProgressBar';

// importing API endpoint to post new log entry to database via api
import {createLogEntry} from './API';


// cludinary depedancy
import {Image} from 'cloudinary-react';
import axios from 'axios';
require('dotenv').config();
//console.log(process.env.REACT_APP_CLOUDINARY_URL);

const LogEntryForm=({location,onClose,locCountry,locDivision,locDescription})=>{
  // to load the form new log entry submission and then removing the pop up box.
  const [loading,setLoading]=useState(false);

  // useState to handle errors while filling form
  const [error,setError]=useState('');



  const [selectImage,setSelectImage]=useState();
  const [progressbar,setProgressBar]=useState();
  const [uploadloading,setUploadLoading]=useState(false);

  // from react-hook-form docs , can handle errors also refer docs
  const { register, handleSubmit } = useForm();



  // sending this data to backend server from frontend form for creation of new log entry
  const onSubmit=async(data)=>{
    //console.log(data);
    try{

      // so to specify a loading state i.e the form data is processing
      setLoading(true);


      // passing data from front end as prop location and adding to  data JSON which will be post to database.
      data.latitude=location.latitude;
      data.longitude=location.longitude;
      data.description=locDescription;
      data.image=selectImage;

      // send data to API to store in database
      const created=await createLogEntry(data);
      console.log(created);
      onClose();

    }catch(err){
      console.log(err);
      console.error(err);
      setError(err.message);
      setLoading(false);// so that when form data new log entry is handled the loading state is disabled.
    }

  }

  // to handle choose file area when a new Image file is selected
  const fileSelectHandler=(e)=>{

    // ============= CLIENT SIDE Single IMAGE UPLOAD VERSION ==================
      // setUploadLoading(true);
      // const imagesArray=e.target.files[0];
      // const formData=new FormData();
      // console.log(imagesArray);
      //
      // formData.append("file",imagesArray);
      // formData.append("upload_preset",process.env.REACT_APP_UPLOAD_PRESET);
      //
      // //console.log(formData);// remember the form data cannot be console.logged!
      //
      // // make the post request
      // const uploadUrl=`${process.env.REACT_APP_CLOUDINARY_URL}/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`;
      // console.log(uploadUrl);
      //
      // axios.post(uploadUrl,formData,{
      //   onUploadProgress:progressEvent=>{
      //     console.log('Upload Progress: '+ Math.round(progressEvent.loaded/progressEvent.total*100)+'%')
      //     var progress=Math.round(progressEvent.loaded/progressEvent.total*100);
      //     setProgressBar(progress);
      //     if(progress===100){
      //       setProgressBar(null);
      //     }
      //   }
      // })
      // .then((data)=>{
      //    console.log(data);
      //    console.log(data.data.secure_url);
      //    setSelectImage(data.data.secure_url);
      //    setUploadLoading(false);
      //  })
      //  .catch((err)=>{
      //    console.log(err);
      //  })




  // ============ Server side Image Upload NOT COMPLETED ==============
  const imagesArray=e.target.files;
  console.log(imagesArray);
  //
  //
  //  //Iterate over the imagesArray and convert each image as base64 encoded long string and then finally make an array of images of type string.
  //  //if(imagesArray){
  // // [].forEach.call(imagesArray,readFiles);
  //  //}
  //
  //  // function readFiles(file){
  //  //   if(/\.(jpe?g|png|gif)$/i.test(file.name) ){
  //  //     var reader=new FileReader();
  //  //     reader.readAsDataURL(file);
  //  //     reader.onloadend=()=>{
  //  //       //console.log(reader.result);// Grab each Image String and append them into 1 final string.
  //  //       setImagesString(imagesString.push(reader.result));
  //  //     }
  //  //   }
  //  // }
  //
  //  //console.log("Final Images Array in a String format!");
  //  //console.log(imagesString);
  //
  //  const reader=new FileReader();
  //  reader.readAsDataURL(imagesArray);
  //  reader.onloadend=()=>{
  //    //console.log(reader.result);
  //    imagesString[0]=reader.result
  //    setImagesString(...imagesString);
  //  }
  //  //console.log(imagesString);
  //  //console.log(JSON.stringify(imagesString));
  //
  //  uploadImage(imagesString);
  //
  //  // call the api to trigger the route at backend to upload image to cloudinary
  //
  //
  //
  //   // uploadImageToCloudinary(imagesString)
  //   // .then((data)=>{
  //   //   console.log(data);
  //   // })
  //   // .catch((err)=>{
  //   //   console.log(err);
  //   // });

}



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form" encType="multipart/form-data">
      {/*To show the error message if error occurs while new log entry form submission to backend*/}
      { error ?
         <div className="alert alert-danger" role="alert">
         {error}
         </div>:null}
      <small className="form-text text-muted">
      <b>💡 Marking...🎯:   {locDivision} , <i>{locCountry}</i>
      </b>
      </small>

      <label htmlFor="description"><b>Description</b></label>
      <input type="text" readOnly className="form-control-plaintext" value={!locDescription ? '🌎 NA Wiki was not able to find data for these coordinates!' : locDescription} required name="description" rows={3} {...register('description')} />
      <label htmlFor="title"><b>Select Type of Travel</b></label>
      <select name="title" required {...register('title')}>
        <option value="The Weekend Break">The Weekend Break</option>
        <option value="The Package Holiday">The Package Holiday</option>
        <option value="The Group Tour">The Group Tour</option>
        <option value="The Caravan/RV Road">The Caravan/RV Road</option>
        <option value="Volunteer Travel Trip">Volunteer Travel Trip</option>
        <option value="Long Term Slow Travel">Long Term Slow Travel</option>
        <option value="The Gap Year">The Gap Year</option>
        <option value="Visiting Friends or Relatives">Visiting Friends or Relatives</option>
        <option value="Event Travel">Event Travel</option>
        <option value="Business Travel">Business Travel</option>
      </select>
      <label hmtlFor="comments"><b>Comments</b></label>
      <textarea  placeholder="How did you feel about the trip?" name="comments" rows={3} {...register('comments')}></textarea>
      {progressbar?<ProgressBar animated now={progressbar} label={`${progressbar}%`} />:null}
      {selectImage?<Image cloudName={process.env.REACT_APP_CLOUDINARY_NAME} publicId={selectImage} style={{ width:"200px",crop:"scale" }} />:null}
      {!selectImage?<label htmlFor="image"><b>Image</b></label>:null}
      {!selectImage?<input aria-describedby="imageHelpBlock" type="file" required name="image" onChange={fileSelectHandler} disabled={uploadloading} multiple />:null}
      {progressbar?<small id="imageHelpBlock" className="form-text text-muted">
      'Say Cheese! 📷 Please Wait....'
      </small>:null}

      {/*<label htmlFor="image"><b>Image</b></label>
      <input aria-describedby="imageHelpBlock" type="file" required name="image" onChange={fileSelectHandler} disabled={uploadloading} multiple />
      <small id="imageHelpBlock" className="form-text text-muted">
      'Required'
      </small>*/}
      <label htmlFor="visitDate"><b>Visit Date</b></label>
      <input aria-describedby="visitdatehelp" name="visitDate" type="date" required {...register('visitDate')} />
      <small id="visitdatehelp" className="form-text text-muted">
      Required
      </small>
      <label htmlFor="rating"><b>⭐ Rating</b></label>
      <select aria-describedby="ratinghelp" required name="rating" {...register('rating')}>
        <option value="NaN">NaN</option>
        <option value="⭐">⭐</option>
        <option value="⭐⭐">⭐⭐</option>
        <option value="⭐⭐⭐">⭐⭐⭐</option>
        <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
        <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
      </select>
      <small id="ratinghelp" className="form-text text-muted">
      Default NaN for not rated (NR)
      </small>
      {/*the moment we hit the button mark it the button will be disabled and show loading else it will show mark it*/}
      <button className="btn btn-outline-dark"  disabled={loading} type="submit">{loading? ' Please Wait.. Taking Off🚀 ' : ' Mark It!👍 ' }</button>
    </form>
  )
};

export default LogEntryForm;
