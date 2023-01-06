import { SaveOutlined, Upload } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startSaveNote, startUploadingFiles } from '../../store/journal/thunks';
import { ImageGallery } from '../components'


export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: note, isSaving } = useSelector(state => state.journal);

    const { tittle, body, date, onInputChange, formState } = useForm(note)

    const fileInputRef = useRef();

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date])

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState]);

    const saveNote = () => {
        dispatch(startSaveNote())
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;

        dispatch(startUploadingFiles(target.files))
    }

    return (
        <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ mb: 1 }}
            className='animate__animated animate__fadeIn animate__faster'
        >
            <Grid item>
                <Typography fontSize={39} fontWeight='light' > {dateString} </Typography>
            </Grid>
            <Grid item>

                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{ display: "none" }}
                />

                <IconButton
                    color='primary'
                    onClick={() => fileInputRef.current.click()}
                >
                    <Upload />
                </IconButton>

                <Button
                    disabled={isSaving}
                    onClick={saveNote}
                    color="primary"
                    sx={{ padding: 2 }}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    name='tittle'
                    value={tittle}
                    onChange={onInputChange}
                    sx={{ border: 'none', mb: 1 }}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            {/* Image gallery */}
            <ImageGallery />

        </Grid >
    )
}
