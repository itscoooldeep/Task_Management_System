import { ListItemIcon } from "@material-ui/core"
import React from "react"
import { AddBox, Assignment, Person, Timelapse} from '@material-ui/icons';

const NavbarItems = [
    {
        title: "All Tasks",
        link: "/",
        id: 1,
        icon: <ListItemIcon><Assignment style={{ color:"#2c387e"}}/></ListItemIcon>
    },
    {
        title: "My Tasks",
        link: "/mytasks",
        id: 2,
        icon: <ListItemIcon><Person style={{ color:"#2c387e"}}/></ListItemIcon>
    },
    {
        title: "Pending Tasks",
        link: "/pendingtasks",
        id: 3,
        icon: <ListItemIcon><Timelapse style={{ color:"#2c387e"}}/></ListItemIcon>
    },
    {
        title: "Create New Task",
        link: "/newtask",
        id: 4,
        icon: <ListItemIcon><AddBox style={{ color:"#2c387e"}}/></ListItemIcon>
    },

]

export default NavbarItems