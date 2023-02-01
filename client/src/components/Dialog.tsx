import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface PopUpDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onOkHandled: React.MouseEventHandler<HTMLButtonElement>;
  okButtonText: string;
  notOkButtonText: string;
}

const AlertDialog: React.FC<PopUpDialogProps> = (props) => {
  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle id='alert-dialog-title'>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}> {props.notOkButtonText}</Button>
          <Button onClick={props.onOkHandled} autoFocus>
            {props.okButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
