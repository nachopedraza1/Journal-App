import { collection, doc, getDocs, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { fileUpload } from "../../journal/helpers/fileUpload";
import { addNewEmptyNote, savingNewNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote())
        const { uid } = getState().auth;

        const newNote = {
            tittle: "",
            body: "",
            date: new Date().getTime(),
            imageUrls: []
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
    }
}


export const startLoadingNotes = () => {
    return async (dispath, getState) => {
        const { uid } = getState().auth;

        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
        const { docs } = await getDocs(collectionRef);

        const notes = docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        })

        dispath(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const updatedNote = { ...note };
        delete updatedNote.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await setDoc(docRef, updatedNote, { merge: true });
        dispatch(updateNote(note))
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        const photosUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrls))
    }
}