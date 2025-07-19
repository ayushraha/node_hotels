const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/MenuItem');

//Post method MenuItems
router.post('/',async (req,res) =>{
  try {
    const data = req.body

    //create new menuitem document using mongodb model
    const newmenuitem = new MenuItem(data);

    //save the newmenuitem to db
    const response = await newmenuitem.save();
    console.log('data saved');
    res.status(200).json(response);
  }
  catch(err){
    console.error('error occured',err.message);
    res.status(500).json({error : err.message});
  }
})

//Get method for menuItem
router.get('/',async (req,res) =>{
  try{
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  }
  catch(err){
    console.error('error occured',err.message);
    res.status(500).json({error : err.message});
  }
})

//Api parameterized call
router.get('/:tastetype',async (req,res) =>{
  try{
    const tastetype = req.params.tastetype;
    if(tastetype =='sweet' || tastetype == 'sour' || tastetype == 'spicy'){
      const response = await MenuItem.find({taste : tastetype
      });
      console.log('data fenced');
      res.status(200).json(response);
    }
    else{
      res.status(404).json({error:'invalid taste type'});
    }

  }
  catch(err){
    console.error('error occurred',err.message);
    res.status(500).json({error: error.message});
  }
})


module.exports = router;