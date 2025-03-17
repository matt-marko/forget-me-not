import './BackupModal.css';
import Modal from '@mui/material/Modal';

type BackupModalProps = {
  open: boolean;
  handleClose(): void;
  backupType: BackupType | null;
}

function ExportModal(props: BackupModalProps) {
  // TODO fix error in textarea
  return (
    <Modal
      className='backup-modal'
      open={props.open}
      onClose={props.handleClose}
    >
      <div className='backup-modal-content'>
        <h1>Export tasks</h1>
        <textarea value={btoa(localStorage.getItem('groups') ?? '')} />
        <p>These are your tasks!<br />Copy the code and keep it somewhere safe</p>
      </div>
    </Modal>
  )
}

export default ExportModal;