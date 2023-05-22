import mongoose, { Schema, models } from "mongoose";

export interface IPerson{
    id:string,
    name:string,
    number:string
}

const url = process.env.MONGODB_URI;

if(url === undefined){
    console.log(`url is undefined`);
    process.exit(1);
}

mongoose.set('strictQuery', false);
mongoose
    .connect(url)
    .then(()=>{
        console.log('connection established');
    })
    .catch((e)=>{
        console.log('connection error',e);
        process.exit(1);
    });

const personSchema:Schema<IPerson> = new Schema<IPerson>({
    name:String,
    number:String
})

personSchema.set('toJSON',{
    transform:(doc, ret) =>{
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    },
})

module.exports = mongoose.model<IPerson>('Person',personSchema);


