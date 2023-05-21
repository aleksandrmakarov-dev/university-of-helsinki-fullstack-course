import mongoose, { Schema } from "mongoose";

export interface INote{
    id:string,
    content:string,
    important:boolean
}

const url = process.env.MONGODB_URI;
console.log('connecting to', url)
if(url === undefined){
    console.log('undefined url');
    process.exit(1);
}

mongoose.set('strictQuery',false);
mongoose
    .connect(url)
    .then(()=>console.log('connection established'))
    .catch((e) =>{
        console.log('connection error',e);
        process.exit(1);
    });

const noteSchema = new Schema<INote>({
    content:String,
    important:Boolean
})
    
noteSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
      
module.exports = mongoose.model('Note', noteSchema);