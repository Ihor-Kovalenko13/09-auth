import { cookies } from 'next/headers';
import { api } from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

export type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
};

export type FetchNotesProps = {
  search?: string;
  page?: number;
  tag?: string;
};

export async function checkServerSession() {
  const cookieStore = cookies();
  const { data } = await api.get('/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}

export async function fetchNotes(
  { search, page, tag }: FetchNotesProps
): Promise<FetchNotesResponse> {
  const cookieStore = cookies();
  const { data } = await api.get('/notes', {
    params: { page, perPage: 12, search, tag },
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = cookies();
  const { data } = await api.get(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}

export async function getMe(): Promise<User> {
  const cookieStore = cookies();
  const { data } = await api.get('/users/me', {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}
