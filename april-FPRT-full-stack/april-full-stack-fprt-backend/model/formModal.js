const mongoose=require('mongoose');
const formSchema=new mongoose.Schema(
    {
        user_email: String,
        form_name: String,
        field_data: Array
    }
)
//mongoose.model('collection','schema)
mongoose.model('form',formSchema);
module.exports=mongoose.model('form');