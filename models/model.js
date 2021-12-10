const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const todoShcema=new Schema({
    tittle:{
        type:String,
    required:true
    },
    description:String,
    completed:{
        type:Boolean,
        required:true,
    },
},{timestamps:true});

module.exports=mongoose.model('Todo',todoShcema);
