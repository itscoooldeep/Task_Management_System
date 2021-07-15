import types from "./types"

export const setUserToken = ( userInfo) => ( {
    type: types.SET_USER_TOKEN,
    payload: userInfo
} )
export const setAllTasks = ( tasks ) => ( {
    type: types.SET_ALL_TASKS,
    payload: tasks
} )
export const openSnackbar = ( details ) => ( {
    type: types.OPEN_SNACKBAR,
    payload: details
} )

export const closeSnackbar = ( ) => ( {
    type: types.CLOSE_SNACKBAR,
} )
