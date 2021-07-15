import axios from "axios"
import { store } from "../redux/store"
import {openSnackbar, setUserToken} from "../redux/actions"

export const loginAsync = async ( email ) =>
{
    try {
        const response = await axios.post( "http://localhost:5000/api/auth/login", { email } )
        if ( !response.message ) {
            const payload = response.data.payload
            await store.dispatch( setUserToken( { token: payload.jwtToken, id: payload.id, department: payload.department, name: payload.name } ) )
            axios.defaults.headers.common[ 'Authorization' ] =
                'Bearer ' + response.data.payload.jwtToken;
            await store.dispatch( openSnackbar( { isError: false, message: "Login success!" } ) )
            return true
        }
        else {
            await store.dispatch( openSnackbar( { isError: true, message: `${ response.code }, ${ response.message }` } ) )
            return null
        }
    }
    catch ( error ) {
        await store.dispatch( openSnackbar( { isError: true, message: `An error occured! Check your email and try again!` } ) )
    }
}

export const getAllTasksAsync = async () =>
{
    try {
        const response = await axios.get( "http://localhost:5000/api/task" )
        if ( !response.message ) {
            return { data: [...response.data.payload]}
        }
        else {
            await store.dispatch( openSnackbar( { isError: true, message: `${ response.code }, ${ response.message }` } ) )
            return null
        }
    }
    catch (error) {
            await store.dispatch( openSnackbar( { isError: true, message: `Can not be reached to server, try again later...` } ) )
    }
}

export const getMyTasksAsync = async () =>
{
    try {
        const response = await axios.get( "http://localhost:5000/api/task/my-tasks" )
        if ( !response.message ) {
            return { data: [...response.data.payload]}
        }
        else {
            await store.dispatch( openSnackbar( { isError: true, message: `${ response.code }, ${ response.message }` } ) )
            return null
        }
    }
    catch ( error ) {
        await store.dispatch( openSnackbar( { isError: true, message: `Can not be reached to server, try again later...` } ) )
    }
}

export const getPendingTasksAsync = async () =>
{
    try {
        const response = await axios.get( "http://localhost:5000/api/task/pendings" )
        if ( !response.message ) {
            return { data: [...response.data.payload] }
        }
        else {
            await store.dispatch( openSnackbar( { isError: true, message: `${ response.code }, ${ response.message }` } ) )
            return null
        }
    }
    catch ( error ) {
        await store.dispatch( openSnackbar( { isError: true, message: `Can not be reached to server, try again later...` } ) )
        
    }
}
export const getTaskDetailsAsync = async (id) =>
{
    try {
        const response = await axios.get( `http://localhost:5000/api/task/${id}` )
        if ( !response.message ) {

            return { data: response.data.payload }
        }
        else {
            await store.dispatch( openSnackbar( { isError: true, message: `${ response.code }, ${ response.message }` } ) )
            return null
        }
    }
    catch (error) {
        await store.dispatch( openSnackbar( { isError: true, message: `Can not be reached to server, try again later...` } ) )
    }
}
export const createTaskAsync = async ({title, description, assignedDepartment}) =>
{
    try {
            const response = await axios.post( "http://localhost:5000/api/task", {title, description, assignedDepartment} )
    if ( !response.message ) {
        return true
    }
    else {
        await store.dispatch( openSnackbar( { isError: true, message: `${ response.code }, ${ response.message }` } ) )
        return null
    }
    }
    catch ( error ) {
        await store.dispatch( openSnackbar( { isError: true, message: `Check your inputs and try again later...` } ) )
    }
}

export const editTaskAsync = async ( id, { task: { title, description } }) =>
{
    try {
        const response = await axios.put( `http://localhost:5000/api/task/${id}`, {title, description} )
    if ( !response.message ) {
        return true
    }
    else {
        await store.dispatch( openSnackbar( { isError: true, message: `${ response.code }, ${ response.message }` } ) )
        return null
    }
    }
    catch ( error ) {
        await store.dispatch( openSnackbar( { isError: true, message: `Check your inputs and try again later...` } ) )
    }
}

export const deleteTaskAsync = async (id) =>
{
    try {
            const response = await axios.delete( `http://localhost:5000/api/task/${id}` )
    if ( !response.message ) {
        return true
    }
    else {
        await store.dispatch( openSnackbar( { isError: true, message: `${ response.code }, ${ response.message }` } ) )
        return null
    }
    }
    catch ( error ) {
        await store.dispatch( openSnackbar( { isError: true, message: `Can not be reached to server! Try again later...` } ) )
    }
}

export const completeTaskAsync = async (id) =>
{
    try {
            const response = await axios.get( `http://localhost:5000/api/task/complete/${id}` )
    if ( !response.message ) {
        return true
    }
    else {
        await store.dispatch( openSnackbar( { isError: true, message: `${ response.code }, ${ response.message }` } ) )
        return null
    }
    }
    catch ( error ) {
        await store.dispatch( openSnackbar( { isError: true, message: `Can not be reached to server! Try again later...` } ) )
    }
}

export const rejectTaskAsync = async (id) =>
{
    try {
        const response = await axios.get( `http://localhost:5000/api/task/reject/${id}` )
    if ( !response.message ) {
        return true
    }
    else {
        await store.dispatch( openSnackbar( { isError: true, message: `${ response.code }, ${ response.message }` } ) )
        return null
    }
    }
        catch ( error ) {
        await store.dispatch( openSnackbar( { isError: true, message: `Can not be reached to server! Try again later...` } ) )
    }
}


export const resetDataAsync = async () =>
{
    try {
            const response = await axios.get( `http://localhost:5000/api/task/reset-data` )
    if ( !response.message ) {
        return true
    }
    else {
        await store.dispatch( openSnackbar( { isError: true, message: `${ response.code }, ${ response.message }` } ) )
        return null
    }
    }
            catch ( error ) {
        await store.dispatch( openSnackbar( { isError: true, message: `Can not be reached to server! Try again later...` } ) )
    }
}