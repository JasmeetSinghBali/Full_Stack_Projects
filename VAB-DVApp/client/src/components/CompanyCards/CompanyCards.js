import React from 'react';
import CompanyCard from '../CompanyCard/CompanyCard';

const CompanyCards=({companydata})=>{
  return(
    <div>
      {companydata.map((item,i)=>(
        <CompanyCard />
      ))}
    </div>
  );
}



export default CompanyCards;
