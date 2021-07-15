import React from "react"
import { Button } from "@material-ui/core"
import {deleteTaskAsync, rejectTaskAsync, completeTaskAsync} from "../data/AsyncFetching"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux";
import { openSnackbar } from "../redux/actions";

function FunctionedButton ({location, history, id, type, disabled, openSnackbar})
{
    async function handleClick()
    {
        let result;
        result = type === "Delete" ? await deleteTaskAsync( id ) : ( type === "Reject" ? await rejectTaskAsync( id ) : await completeTaskAsync( id ) )
        let message = type==="Delete" ? "Task deleted!" : (type==="Reject" ? "Task Rejected!" : "Task Completed!")
        
        if ( result ) {
            let snackbar = {isError:false, message}
            openSnackbar( snackbar)
            if ( location.pathname.includes("/details") ) {
                history.push("/")
            }
        }
    
    
    }
    return (
        <Button size="small" color="primary" variant="outlined" onClick={ handleClick } disabled={disabled}>
            {type}
        </Button>
    )
    
}
const mapDispatchToProps = dispatch => ( {
    openSnackbar: ({...snackbar}) => dispatch(openSnackbar({...snackbar}))
})

export default connect(null, mapDispatchToProps)(withRouter(FunctionedButton))