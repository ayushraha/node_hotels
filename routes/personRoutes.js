//all information is related to person only
const express = require('express');
const router = express.Router();

const Person = require('./../models/Person');

//post method
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  const { username, password } = req.query;

  // Check if both query parameters are present
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Find person by username
    const person = await Person.findOne({ username });

    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    // Compare plain password with hashed password
    const isMatch = await bcrypt.compare(password, person.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Send back person data (without password)
    const { password: pwd, ...personData } = person.toObject();
    res.status(200).json(personData);

  } catch (err) {
    console.error("Error occurred:", err.message);
    res.status(500).json({ error: err.message });
  }
});


//parametrized API calling
router.get('/:workType',async(req,res) =>{
  try{
    const workType = req.params.workType;
    if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
      const response = await Person.find({work : workType});
      console.log('response fetched')
      res.status(200).json(response);
    }
    else{
      res.status(404).json({error:"Invalid work type"});
    }
  }
  catch(err){
    console.error('error occured',err.message);
    res.status(500).json({error : err.message});
  }
})




//update operation => put

router.put('/:id',async (req,res) =>{
  try{
    const personId = req.params.id;//extract id from the URL parameter
    const updatedPersonData = req.body;//updated data for the person

    const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
      new : true,//return the updated document
      runValidators : true,//run mongoose validation
    })

    if(!response){
      return res.status(404).json({error : 'Person not found'});
    }

    console.log('data updated');
    res.status(200).json(response);
  }
  catch(err){
    console.error('error occured',err.message);
    res.status(500).json({error : err.message});

  }
})


//delete peron data = >delete
router.delete('/:id',async (req,res)=>{
  try{
    const personId = req.params.id;//extract id from the URL parameter

    //Assuming you have Person model
    const response =  await Person.findByIdAndDelete(personId);

    if(!response){
      return res.status(404).json({error : 'Person not found'});
    }

    console.log('data deleted');
      res.status(200).json({message : 'Person Deleted successfully'});
    
  }
  catch(err){
    console.error('error occured',err.message);
    res.status(500).json({error : err.message});

  }
})

module.exports = router;