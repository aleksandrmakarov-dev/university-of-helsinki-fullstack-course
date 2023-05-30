import { Application } from 'express';
import mongoose, { Model } from 'mongoose';
import supertest from 'supertest';
import { Note } from '../models/note';

const app: Application = require('../app');
const NoteModel: Model<Note> = require('../models/note');
const helper = require('./test-helper');

beforeEach(async () => {
  await NoteModel.deleteMany();
  const promises: Promise<Note>[] = helper.initialNotes.map((note: Note) => NoteModel.create(note));

  await Promise.all(promises);
});

const api = supertest(app);

describe('notes api', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are two notes', async () => {
    const response = await helper.notesIdDb();
    expect(response).toHaveLength(2);
  });

  test('the first note is about HTML', async () => {
    const response = await helper.notesIdDb();
    expect(response[0].content).toBe('HTML is easy');
  });

  test('all notes are returned', async () => {
    const response = await helper.notesIdDb();
    expect(response).toHaveLength(helper.initialNotes.length);
  });

  test('a specific note is within the returned notes', async () => {
    const response = await helper.notesIdDb();
    const content: string[] = response.map((r: Note) => r.content);
    expect(content).toContain('HTML is easy');
  });

  test('a valid note can be added', async () => {
    const newNote: Note = {
      id: '',
      content: 'async/await simplifies making async calls',
      important: true,
    };

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await helper.notesIdDb();

    const contents = response.map((note: Note) => note.content);

    expect(response).toHaveLength(helper.initialNotes.length + 1);
    expect(contents).toContain('async/await simplifies making async calls');
  });

  test('note without content is not added', async () => {
    const newNote = {
      important: true,
    };

    await api.post('/api/notes').send(newNote).expect(400);

    const response = await helper.notesIdDb();

    expect(response).toHaveLength(helper.initialNotes.length);
  });

  test('a specifict note can be viewed', async () => {
    const notesAtStart: Note[] = await helper.notesIdDb();
    const noteToView: Note = notesAtStart[0];

    const response = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const foundNote: Note = response.body;
    expect(foundNote).toEqual(noteToView);
  });

  test('a note can be deleted', async () => {
    const notesBeforeDelete: Note[] = await helper.notesIdDb();
    const noteToDelete: Note = notesBeforeDelete[0];

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

    const notesAfterDelete: Note[] = await helper.notesIdDb();

    expect(notesAfterDelete).toHaveLength(helper.initialNotes.length - 1);

    const afterDeleteContent: string[] = notesAfterDelete.map((n: Note) => n.content);

    expect(afterDeleteContent).not.toContain(noteToDelete.content);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
