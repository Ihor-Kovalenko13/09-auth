import axios from 'axios';
import type { Note } from '@/types/note';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
});

export const fetchNotes = async () => {
  const { data } = await api.get<Note[]>('/notes');
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: Pick<Note, 'title' | 'content'>) => {
  const { data } = await api.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string) => {
  await api.delete(`/notes/${id}`);
};
