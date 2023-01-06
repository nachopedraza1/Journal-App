import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        savedMessage: "",
        notes: [],
        active: null,
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, { payload }) => {
            state.notes.push(payload);
            state.isSaving = false;
        },
        setActiveNote: (state, { payload }) => {
            state.active = payload;
        },
        setNotes: (state, { payload }) => {
            state.notes = payload;
        },
        setSaving: (state, { payload }) => {
            state.isSaving = true;
        },
        updateNote: (state, { payload }) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if (note.id === payload.id) {
                    return payload
                }
                return note;
            })
        },
        setPhotosToActiveNote: (state, { payload }) => {
            state.active.imageUrls = [...state.active.imageUrls, ...payload]
            state.isSaving = false;
        },
        deleteNoteById: (state, { payload }) => {

        }
    }
});


// Action creators are generated for each case reducer function
export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, savingNewNote, setPhotosToActiveNote } = journalSlice.actions;