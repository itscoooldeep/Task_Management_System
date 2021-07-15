import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {Card, CardActions, CardContent, Button, Typography} from "@material-ui/core"
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom"
import FunctionedButton from './FunctionedButton';
import TimeFunction from "../data/TimeFunction"

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        height: 400,
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

function DetailCard({task, userInfo, history,}) {
    const classes = useStyles();
    const departments = [ "HR", "Sales", "Marketing" ]
    const status = [ "Pending", "Completed", "Rejected" ]
    async function handleEdit ()
    {
        history.push({pathname:"/newtask", state: { task }})
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h6" component="h2">
                    {task.title}
                </Typography>

                <Typography className={ classes.pos } color="textSecondary" component="p">
                    <br/>
                    Assigned To : { departments[ task.assignedDepartment - 1 ] }
                    <br/>
                    Assigned By: {task.user.name}
                    <br />
                    Status: {status[task.status]}
                </Typography>
               

                        <Typography className={ classes.pos } color="textSecondary" component="p">
                            {task.description}
                        </Typography>
              
            
                       
                            {task.logs.map(
                                log =>
                                {
                                    let time = TimeFunction( log.date )
                                    return (
                                            <Typography className={ classes.pos } color="textSecondary" key={log.date}>
                                            &#128338; {log.action} by {log.userName} {time}
                                            </Typography>
                                    )
                                    
                                }
                            )}
             
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
            </CardActions>
        </Card>
    );
}

const mapStateToProps = state => ( {
    userInfo: state.userInfo,
} )

export default connect(mapStateToProps)(withRouter(DetailCard))