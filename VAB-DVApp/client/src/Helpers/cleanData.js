const cleanData=(api_data)=>{
  let rawData={};
  let clean_data=[];

  for(let [key,value] of Object.entries(api_data)){
      let newYear = key.substring(0,4);
      rawData[newYear]=value;
      clean_data.push(rawData);
  }
  const result = clean_data[0];
  return result;
}

export default cleanData;
