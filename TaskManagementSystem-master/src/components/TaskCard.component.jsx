import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {Card, CardActions, CardContent, Button, Typography} from "@material-ui/core"
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom"
import FunctionedButton from './FunctionedButton';

const useStyles = makeStyles({
    root: {
        width: 350,
        height: 200,
    },
    content: {
        cursor: "pointer",
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
});

function TaskCard({task, userInfo, history}) {
    const classes = useStyles();
    const departments = [ "HR", "Sales", "Marketing" ]
    const status = [ "Pending", "Completed", "Rejected" ]
    async function handleEdit ()
    {
        history.push({pathname:"/newtask", state: { task }})
    }
    function handleDetails ()
    {
        history.push({pathname:`/details/${task.id}`})
    }
    return (
        <Card className={classes.root}>
            <CardContent  onClick={ handleDetails } className={`${classes.content} cardHover`} >
                <Typography variant="h6" component="h2" style={{ color:"#2c387e"}}>
                    {task.title}
                </Typography>

                <Typography className={ classes.pos } style={ {color: "#525982"} } component="p" >
                    <br/>
                    Assigned To : { departments[ task.assignedDepartment - 1 ] }
                    <br />
                    Status: {status[task.status]}
                </Typography>
            </CardContent>
            <CardActions>
                {
                    userInfo.userId === task.user.id && (
                        <React.Fragment>
                            <Button size="small" color="primary" variant="outlined" disabled={task.status===2 || task.status===1} onClick={handleEdit}>Edit</Button>
                            <FunctionedButton type="Delete" id={task.id} disabled={task.status===2 || task.status===1} />
                        </React.Fragment>
                    )
                }
                {
                    userInfo.department === task.assignedDepartment && (
                        <React.Fragment>
                            <FunctionedButton type="Reject" id={task.id} disabled={task.status===2 || task.status===1} />
                            <FunctionedButton type="Complete" id={task.id} disabled={task.status===2 || task.status===1}/>
                        </React.Fragment> )
                }
                {/* <Button size="small" color="primary" variant="outlined" onClick={ handleDetails }>Details</Button> */}
            </CardActions>
        </Card>
    );
}

const mapStateToProps = state => ( {
    userInfo: state.userInfo,
} )

export default connect(mapStateToProps)(withRouter(TaskCard))