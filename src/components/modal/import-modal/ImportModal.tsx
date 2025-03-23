import Button from '@mui/material/Button/Button';
import './ImportModal.css';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Group } from '../../../interfaces/group';
import { useNavigate } from 'react-router-dom';

type BackupModalProps = {
  open: boolean;
  handleClose(): void;
  updateGroups(groups: Group[]): void;
}

function ImportModal(props: BackupModalProps) {
  const importTasks = () => {
    try {
      const decodedTasks = atob(importCode);

      // parse as JSON for the purpose of very basic data validation
      const parsedTasks = JSON.parse(decodedTasks);

      localStorage.setItem('groups', JSON.stringify(parsedTasks));

      props.updateGroups(parsedTasks);
      props.handleClose();
      navigate('/');
    } catch (error) {
      console.warn('An error occurred while importing tasks:', error); 
      setIsError(true);
    }
  };

  const handleImportCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImportCode(event.target.value);
  };

  const getErrorTextClass = (): string => {
    return `error-text${isError ? '' : ' hidden'}`;
  }

  const [importCode, setImportCode] = useState<string>('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  return (
    <Modal
      className='backup-modal'
      open={props.open}
      onClose={props.handleClose}
    >
      <div className='backup-modal-content'>
        <h1>Import tasks</h1>
        <textarea value={importCode} onChange={handleImportCodeChange}/>
        <p className={getErrorTextClass()}>Error importing tasks</p>
        <p>Paste in here the code you received<br />when exporting your tasks</p>
        <Button 
          className='load-button'
          onClick={importTasks}
          variant='contained'
          color='success'
        >
          Load
        </Button>
        <Button
          onClick={props.handleClose}
          variant='contained'
        >
          Nevermind!
        </Button>
      </div>
    </Modal>
  )
}

export default ImportModal;