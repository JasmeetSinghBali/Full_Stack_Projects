const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();

// get all stores
router.get('/',async(req,res)=>{
  try{
    // postgres query to get all stores
    const results = await db.query("SELECT * FROM lappystores");
    console.log(results);

    return res.status(200).json({
      status: "Up",
      message: "🦨 API works!!",
      resource: "GET all stores",
      results: results.rows.length,
      data: {
        stores: results.rows,
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
    const results = await db.query("SELECT * FROM lappystores WHERE id = $1",[ID]);

    return res.status(200).json({
      status: "Up",
      message: "🦨 API works!!",
      resource: "GET store by id",
      results:results.rows.length,
      data: {
        store: results.rows[0]
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

module.exports = router;
