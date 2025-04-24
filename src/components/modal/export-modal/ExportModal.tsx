import Button from '@mui/material/Button/Button';
import './ExportModal.css';
import Modal from '@mui/material/Modal';

type BackupModalProps = {
  open: boolean;
  handleClose(): void;
}

export default function ExportModal(props: BackupModalProps) {
  return (
    <Modal
      className='backup-modal'
      open={props.open}
      onClose={props.handleClose}
    >
      <div className='backup-modal-content'>
        <h1>Export tasks</h1>
        <textarea readOnly={true} value={btoa(localStorage.getItem('groups') ?? '')} />
        <p>These are your tasks!<br />Copy the code and keep it somewhere safe</p>
        <Button 
          onClick={props.handleClose}
          variant='contained'
        >
          Got it!
        </Button>
      </div>
    </Modal>
  )
}