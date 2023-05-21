import mongoose, { Schema } from "mongoose"

interface INote{
  content:string,
  important:boolean,
  date:Date
}


if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://ac5295:${password}@cluster0.jql0diz.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new Schema<INote>({
  content: String,
  important: Boolean,
  date:Date
})

const Note = mongoose.model<INote>('Note', noteSchema)

const readNotes = Note
  .find()
  .then((response:INote[])=>{
    if(response.length === 0){
      console.log('Collection is empty, adding documents...');
      insertData();
      return;
    }

    console.log('--- Notes collection ---');
    response.forEach((note:INote) =>{
      console.log(JSON.stringify(note));
    })
    console.log('------------------------');
  })
  .catch((e)=>console.log(e));

const insertData = () =>{
  Note
  .insertMany([
    {
      content:"HTML is hard",
      important:true,
      date:Date()
    },
    {
      content:'CSS is hard',
      important:true,
      date:Date()
    },
    {
      content:'Mongoose makes things easy',
      important:false,
      date:Date()
    }
  ])
  .then(()=>{
    console.log('data inserted');
  })
  .catch((e)=>console.log(e)); 
}
