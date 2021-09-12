const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();

// get all stores
router.get('/',async(req,res)=>{
  try{
    // postgres query to get all stores
    // const results = await db.query("SELECT * FROM lappystores");
    
    // ======== IMPORTANT ==============
    // nested subquery to get avg & count for each shop along with the details for all the shop
    const shopRatingData = await db.query("select * from lappystores left join (select shop_id,count(*),trunc(avg(rating),1) as average_rating from reviews group by shop_id ) reviews on lappystores.id = reviews.shop_id;"); 
    // console.log("results",results);
    //console.log("ratingdata",shopRatingData);

    

    return res.status(200).json({
      status: "Up",
      message: "🦨 API works!!",
      resource: "GET all stores",
      results: shopRatingData.rows.length,
      data: {
        stores: shopRatingData.rows,
      }
    });
  }catch(err){
    if(process.env.NODE_ENV!=='production'){
      return res.status(422).json({
        status: "Up DevEnv",
        message: "🧐 Unprocessable Entity",
        debug: err
      });
    }
    return res.status(422).json({
      status: "Up Prod",
      message: "🧐 Unprocessable Entity",
      debug: "🐱‍🚀 error stack cannot be revealed!"
    });
  }
});

// get store by id
router.get('/:id',async(req,res)=>{
  try{

    const ID = req.params.id;
    // make sure to never use any type of string concatination or formating to avoid sql injections
    // bad approach
    // SELECT * FROM lappystores WHERE id=${ID}
    //good approach (Paramaterized queries) below [ID] the first item in the array i.e ID is replaced by $1 so $1 act as a placeholder
    const shops = await db.query("select * from lappystores left join (select shop_id,count(*),trunc(avg(rating),1) as average_rating from reviews group by shop_id ) reviews on lappystores.id = reviews.shop_id where id=$1;",[ID]);

    // DB query for reviews from reviewTable postgres
    const reviews = await db.query("SELECT * FROM reviews WHERE shop_id = $1",[ID]);
    
    return res.status(200).json({
      status: "Up",
      message: "🦨 API works!!",
      resource: "GET store by id",
      results: shops.rows.length,
      data: {
        store: shops.rows[0],
        reviews: reviews.rows
      }
    });

    

  }catch(err){
    if(process.env.NODE_ENV!=='production'){
      return res.status(422).json({
        status: "Up DevEnv",
        message: "🧐 Unprocessable Entity",
        debug: err
      });
    }
    return res.status(422).json({
      status: "Up Prod",
      message: "🧐 Unprocessable Entity",
      debug: "🐱‍🚀 error stack cannot be revealed!"
    });
  }
});



// add new store
router.post('/',async(req,res)=>{
  try{

    const newStore = await db.query("INSERT INTO lappystores (name,location,contact,price_range) values($1,$2,$3,$4) RETURNING *",[req.body.name,req.body.location,req.body.contact,req.body.price_range]);

    return res.status(201).json({
      status: "Up",
      message: "🦨 API works!!",
      resource: "POST add new store",
      success: true,
      data:{
        newStore: newStore.rows[0]
      }
    });

  }catch(err){
    if(process.env.NODE_ENV!=='production'){
      return res.status(422).json({
        status: "Up DevEnv",
        message: "🧐 Unprocessable Entity",
        success: false,
        debug: err
      });
    }
    return res.status(422).json({
      status: "Up Prod",
      message: "🧐 Unprocessable Entity",
      sucess: false,
      debug: "🐱‍🚀 error stack cannot be revealed!"
    });
  }
});

// update existing store by id
router.put('/:id',async(req,res)=>{
  try{

    const ID = req.params.id;
    const updatedStore = await db.query("UPDATE lappystores SET name = $1, location = $2 , contact = $3, price_range = $4 WHERE id = $5 RETURNING *",[req.body.name,req.body.location,req.body.contact,req.body.price_range,ID]);

    return res.status(200).json({
      status: "Up",
      message: "🦨 API works!!",
      resource: "PUT update store by id",
      success: true,
      data:{
        updatedStore: updatedStore.rows[0]
      }
    });

  }catch(err){
    if(process.env.NODE_ENV!=='production'){
      return res.status(422).json({
        status: "Up DevEnv",
        message: "🧐 Unprocessable Entity",
        success: false,
        debug: err
      });
    }
    return res.status(422).json({
      status: "Up Prod",
      message: "🧐 Unprocessable Entity",
      sucess: false,
      debug: "🐱‍🚀 error stack cannot be revealed!"
    });
  }
});

// delete store by id
router.delete('/:id',async(req,res)=>{
  try{


    const ID = req.params.id;
    const deleteEntry = await db.query("DELETE FROM lappystores WHERE id = $1 RETURNING *",[ID]);

    return res.status(200).json({
      status: "Up",
      message: "🦨 API works!!",
      resource: "DELETE delete store by id",
      success: true,
      data:{
        deletedStore: deleteEntry.rows[0]
      }
    });

  }catch(err){
    if(process.env.NODE_ENV!=='production'){
      return res.status(422).json({
        status: "Up DevEnv",
        message: "🧐 Unprocessable Entity",
        success: false,
        debug: err
      });
    }
    return res.status(422).json({
      status: "Up Prod",
      message: "🧐 Unprocessable Entity",
      sucess: false,
      debug: "🐱‍🚀 error stack cannot be revealed!"
    });
  }
});

// add a review to a shop
router.post('/:id/addReview',async(req,res)=>{
  try{

    const newReview = await db.query('INSERT INTO reviews (shop_id,name,review,rating) values ($1,$2,$3,$4) RETURNING *;',
    [req.params.id,req.body.name,req.body.review,req.body.rating]
    );

    console.log()

    return res.status(201).json({
      status: "Up",
      message: "🦨 API works!!",
      resource: "POST added new review",
      success: true,
      data:{
        newReview: newReview.rows[0]
      }
    });

  }catch(err){
    if(process.env.NODE_ENV!=='production'){
      return res.status(422).json({
        status: "Up DevEnv",
        message: "🧐 Unprocessable Entity",
        success: false,
        debug: err
      });
    }
    return res.status(422).json({
      status: "Up Prod",
      message: "🧐 Unprocessable Entity",
      sucess: false,
      debug: "🐱‍🚀 error stack cannot be revealed!"
    });
  }
});



module.exports = router;
