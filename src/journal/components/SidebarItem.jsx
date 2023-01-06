import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"


import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"
import { setActiveNote } from "../../store/journal/journalSlice"

export const SidebarItem = ({ id, tittle, body, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    const { notes } = useSelector(state => state.journal);

    const newTitle = useMemo(() => {
        return tittle.length > 17
            ? tittle.substring(0, 17) + "..."
            : tittle
    }, [tittle]);

    const onSetActiveNote = () => {
        dispatch(setActiveNote({ id, tittle, body, date, imageUrls }));
    }

    return (
        <ListItem disablePadding onClick={onSetActiveNote} >
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem >
    )
}
