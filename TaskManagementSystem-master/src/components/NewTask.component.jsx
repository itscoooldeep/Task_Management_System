import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, CardContent, Card, CardActions,Typography} from '@material-ui/core';
import { FormControl, InputLabel, Input, FormHelperText, TextField } from '@material-ui/core';
import {Select, MenuItem} from "@material-ui/core"
import {withRouter} from "react-router-dom"
import {createTaskAsync, editTaskAsync} from "../data/AsyncFetching"
import { openSnackbar } from '../redux/actions';
import {connect} from "react-redux"
    
const useStyles = makeStyles((theme) =>({
    root: {
        width: 310,
    },
    formControl: {
        margin: theme.spacing(1),
        width: 270,
    },
    formControl2: {
        margin: theme.spacing(1),
        width: 270,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

function NewTask ( { task, history, location, openSnackbar } )
{
    
    const classes = useStyles();
    const [ newTask, setNewTask ] = useState( {
        title: "",
        description: "",
        assignedDepartment: 0,
    } )
        useEffect( () =>
        {
            location.state && setNewTask({...location.state.task})
        }, [location.state])
    function handleSelect (e)
    {
        setNewTask({...newTask, assignedDepartment: e.target.value})
    }
    function handleChange ( e )
    {
        setNewTask( { ...newTask, [ e.target.name ]: e.target.value } )
    }
    async function handleSubmit ()
    {
        let result;
        if ( location.state ) {
            result = await editTaskAsync( location.state.task.id, { task: { title: newTask.title, description: newTask.description } } )
            let snackbar = {isError:false, message: "Task is edited!"}
            openSnackbar(snackbar)
        }
        else {
            result = await createTaskAsync( { ...newTask } )
            let snackbar = {isError:false, message: "Task is added!"}
            openSnackbar( snackbar)
            
        }
            if ( result ) {
                setNewTask( {
                    title: "",
                    description: "",
                    assignedDepartment: 0,
                } )
                history.push( "/" )
            }
    
    }
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h6" component="h2" style={{ color:"#2c387e"}}>
                    {location.state ? "Edit Task" : "New Task"}
                </Typography>
                <FormControl required className={classes.formControl} >
                    <InputLabel id="demo-simple-select-required-label" style={{ color:"#2c387e"}}>Assigned Department</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={newTask.assignedDepartment}
                        onChange={ handleSelect }
                        style={{ color:"#2c387e"}}
                        className={ classes.selectEmpty }
                        disabled={location.state}
                    >
                        <MenuItem value={0} style={{ color:"#2c387e"}} disabled>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1} style={{ color:"#2c387e"}}>HR</MenuItem>
                        <MenuItem value={2} style={{ color:"#2c387e"}}>Sales</MenuItem>
                        <MenuItem value={3} style={{ color:"#2c387e"}}>Marketing</MenuItem>
                    </Select>
                <FormHelperText style={{ color:"#2c387e"}}>Required</FormHelperText>
                </FormControl>
                <br/>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="title" style={{ color:"#2c387e"}}>Title</InputLabel>
                    <Input id="title" aria-describedby="my-helper-text" style={{ color:"#2c387e"}} onChange={handleChange} value={newTask.title} name="title"/>
                    {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                </FormControl>
                <br/>
                <FormControl className={classes.formControl2}>
                    {/* <InputLabel htmlFor="desc" style={ { color: "#2c387e" } }>Description</InputLabel> */}
                     <TextField
                        id="desc"
                        label="Decription"
                        multiline
                    
                        rowsMax={ 4 }
                        style={{ color:"#2c387e"}}
                        onChange={ handleChange }
                        value={ newTask.description }
                        // variant="outlined"
                        name="description"
        />
                    {/* <Input id="desc" aria-describedby="my-helper-text"   /> */}
                    {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                </FormControl>
            </CardContent>
            <CardActions >

                <Button size="small" style={{ color:"#2c387e"}} variant="outlined" onClick={ handleSubmit }>{location.state ? "Save" : "Create"}</Button>
            </CardActions>
        </Card>
    );
}

const mapDispatchToProps = dispatch => ( {
    openSnackbar: ({...snackbar}) => dispatch(openSnackbar({...snackbar}))
})

export default connect(null, mapDispatchToProps)(withRouter(NewTask))