import React,{useState} from 'react';
import { useForm } from "react-hook-form";

// importing API endpoint to post new log entry to database via api
import {createLogEntry} from './API';




const LogEntryForm=({location,onClose})=>{
  // to load the form new log entry submission and then removing the pop up box.
  const [loading,setLoading]=useState(false);

  // useState to handle errors while filling form
  const [error,setError]=useState('');

  // from react-hook-form docs , can handle errors also refer docs
  const { register, handleSubmit } = useForm();


  // sending this data to backend server from frontend form.
  const onSubmit=async(data)=>{
    //console.log(data);
    try{

      // so to specify a loading state i.e the form data is processing
      setLoading(true);


      // passing data from front end as prop location and adding to  data JSON which will be post to database.
      data.latitude=location.latitude;
      data.longitude=location.longitude;

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



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {/*To show the error message if error occurs while new log entry form submission to backend*/}
      { error ?
         <div class="alert alert-danger" role="alert">
         {error}
         </div>:null}
      <small class="form-text text-muted">
      <b>Required : Title ,
                Image ,
                VisitDate</b>
      </small>
      <label htmlFor="title"><b>Title</b></label>
      <input name="title" required {...register('title')}/>
      <label hmtlFor="comments"><b>Comments</b></label>
      <textarea  placeholder="What did you feel about this place ?" name="comments" rows={3} {...register('comments')}></textarea>
      <label htmlFor="description"><b>Description</b></label>
      <textarea placeholder="Any specific details you wanna share about this place !" name="description" rows={3} {...register('description')}></textarea>
      <label htmlFor="image"><b>Image</b></label>
      <input aria-describedby="passwordHelpBlock" type="url" required name="image" {...register('image')} />
      <small id="passwordHelpBlock" class="form-text text-muted">
      Must be valid image url.
      </small>
      <label htmlFor="visitDate"><b>Visit Date</b></label>
      <input name="visitDate" type="date" required {...register('visitDate')} />
      <label htmlFor="rating"><b>Rating</b></label>
      <select required name="rating" {...register('rating')}>
        <option value="NaN">NaN</option>
        <option value="⭐">⭐</option>
        <option value="⭐⭐">⭐⭐</option>
        <option value="⭐⭐⭐">⭐⭐⭐</option>
        <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
        <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
      </select>
      {/*the moment we hit the button mark it the button will be disabled and show loading else it will show mark it*/}
      <button class="btn btn-outline-dark"  disabled={loading} type="submit">{loading? ' Please Wait.. Taking Off🚀 ' : ' Mark It!👍 ' }</button>
    </form>
  )
};

export default LogEntryForm;
