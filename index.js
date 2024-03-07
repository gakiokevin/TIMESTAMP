require('dotenv').config()
const  express = require('express');
const  app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000

app.use(cors({optionsSuccessStatus: 200}));


app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/:date?',(req,res)=>{
   const { date } = req.params
   if(date){
      const validDate = new Date(date)
      if(!isNaN(validDate.getTime())){
       res.json({unix:validDate.getTime(),utc:validDate.toUTCString()})
      } else {
         const milliseconds = Number(date)
         if(!isNaN(milliseconds)){
            const d = new Date(milliseconds)
            res.json({unix:milliseconds,utc:d.toUTCString()})
         } else {
            return res.json({ error : "Invalid Date" })
         }
                    
          
         }    
      
   }else {
      const currentTime =  new Date().toUTCString();
      return res.json({ unix: new Date().getTime(),utc:currentTime})

   }

})


app.listen(PORT,()=>console.log('server is ready'))
