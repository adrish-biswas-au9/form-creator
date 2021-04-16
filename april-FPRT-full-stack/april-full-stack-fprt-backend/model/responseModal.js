const mongoose=require('mongoose');
const responseSchema=new mongoose.Schema({   
    "form_responses":Array,
    "form_id": String,
    "form_name" : String,
    "user_email" : String
})
//mongoose.model('collection','schema)
mongoose.model('response',responseSchema);
module.exports=mongoose.model('response');