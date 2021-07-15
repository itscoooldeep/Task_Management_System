import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { closeSnackbar } from '../redux/actions';
import { connect } from 'react-redux';

function SnackBar ( { snackbar, closeSnackbar } )
{
    const {isOpen, isError, message} = snackbar

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    closeSnackbar();
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={message}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
const mapStateToProps = state => ( {
   snackbar: state.snackbar
})
const mapDispatchToProps = dispatch => ( {
    closeSnackbar: () => dispatch(closeSnackbar())
})
export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);
