import Button from '@mui/material/Button/Button';
import './ImportModal.css';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

type BackupModalProps = {
  open: boolean;
  handleClose(): void;
}

function ImportModal(props: BackupModalProps) {
  const importTasks = () => {
    console.log(atob(importCode));
  };

  const handleImportCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImportCode(event.target.value);
  };

  const [importCode, setImportCode] = useState<string>('');

  return (
    <Modal
      className='backup-modal'
      open={props.open}
      onClose={props.handleClose}
    >
      <div className='backup-modal-content'>
        <h1>Import tasks</h1>
        <textarea value={importCode} onChange={handleImportCodeChange}/>
        <p>Paste in here the code you received<br />when exporting your tasks</p>
        <Button onClick={importTasks}>Load</Button>
        <Button onClick={props.handleClose}>Nevermind!</Button>
      </div>
    </Modal>
  )
}

export default ImportModal;