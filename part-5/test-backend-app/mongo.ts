import mongoose, { Model } from 'mongoose';
import { Note } from './models/note';

const logger = require('./utils/logger');

const url = process.env.MONGODB_URI_TEST;

if (url === undefined) {
  logger.error('MongoDB url is undefined');
  process.exit(1);
}

mongoose.set('strictQuery', false);
mongoose.connect(url);

const NoteModel: Model<Note> = require('./models/note');

if (process.argv.length === 3) {
  NoteModel.find()
    .then((response: Note[]) => {
      logger.info('--- Notes ---');
      response.forEach((note: Note) => {
        logger.info(JSON.stringify(note));
      });
      logger.info('---------------');
    })
    .catch(e => logger.info(e))
    .finally(() => {
      mongoose.connection.close();
    });
} else {
  const note: Note = {
    id: '',
    content: process.argv[2],
    important: Boolean(process.argv[3]),
  };
  NoteModel.create(note)
    .then((result: Note) => {
      logger.info('Added:', JSON.stringify(result));
    })
    .finally(() => {
      mongoose.connection.close();
    });
}

// Code to start app with typescript
// npx ts-node-dev mongo.ts -- password param1 param2
//
