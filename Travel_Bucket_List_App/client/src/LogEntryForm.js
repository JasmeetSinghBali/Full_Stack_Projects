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
      console.error(err);
      setError(err.message);
      setLoading(false);// so that when form data new log entry is handled the loading state is disabled.
    }

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {/*To show the error message if error occurs while new log entry form submission to backend*/}
      { error ? <h3 className="error">{error}</h3> : null}
      <label htmlFor="title">Title</label>
      <input name="title" required {...register('title')}/>
      <label hmtlFor="comments">Comments</label>
      <textarea name="comments" rows={3} {...register('comments')}></textarea>
      <label htmlFor="description">Description</label>
      <textarea name="description" rows={3} {...register('description')}></textarea>
      <label htmlFor="image">Image</label>
      <input name="image" {...register('image')} />
      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" required {...register('visitDate')} />
      <label htmlFor="rating">Rating</label>
      <input name="rating" type="number" max={5} min={1} {...register('rating')} />
      {/*the moment we hit the button mark it the button will be disabled and show loading else it will show mark it*/}
      <button disabled={loading} type="submit">{loading? ' Please Wait.. Taking Off🚀 ' : ' Mark It!👍 ' }</button>
    </form>
  )
};

export default LogEntryForm;
