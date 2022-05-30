const mongoose = require('mongoose')
const URL ='mongodb+srv://pos:mongodb@cluster0.rdcnf.mongodb.net/POS'
mongoose.connect(URL)

let connectionObj=mongoose.connection
connectionObj.on('connected',() =>{
    console.log('Mongodb success')
})
connectionObj.on('error',()=>{
    console.log('Mongo failed')
})