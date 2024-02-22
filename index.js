const express = require('express')
const cors = require('cors')

const moment =  require('moment-timezone')
const app = express();
app.use(cors())
const PORT = process.env.PORT || 5000

app.get('/api/:date?',(req,res)=>{


  try {
    const dateInput = req.params.date || req.query.date;
    const results = unixAndUtc(dateInput);
    res.json(results);
  } catch (error) {
    res.status(400).json({ error: error.message }); // Return 400 Bad Request with error message
  }
  
})



function unixAndUtc(input){
  let unix
  let utc

  if(!input){
    return getCurrentTime()
  }
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/

  if (dateRegex.test(input)){
    input +="T00:00:00"
  }
  const parsedDate = moment(input).utc()

  if (parsedDate.isValid()) {
    unix = parsedDate.valueOf();
    utc = parsedDate.toDate();
  }
  else {
    return { error : "Invalid Date" }
  }
return {
  unix:unix,
  utc: utc.toUTCString()
}

}


function getCurrentTime(){

    const currentTimestamp = Date.now();
    const currentUtcTime = new Date(currentTimestamp).toUTCString();

  return {
      unix: currentTimestamp,
      utc: currentUtcTime
  };



}






app.listen(PORT,()=>console.log(`listening to port ${PORT}`))