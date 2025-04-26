import './ImportModal.css';
import Button from '@mui/material/Button/Button';
import { useContext, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { GroupsDispatchContext } from '../../../services/Context';
import { DispatchSetAllGroups, GroupsReducerActionType } from '../../../services/Reducer';

type BackupModalProps = {
  open: boolean;
  handleClose(): void;
}

export default function ImportModal(props: BackupModalProps) {
  const [importCode, setImportCode] = useState<string>('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const groupsDispatch = useContext(GroupsDispatchContext);

  function importTasks(): void {
    try {
      const decodedTasks = atob(importCode);

      // parse as JSON for the purpose of very basic data validation
      const parsedTasks = JSON.parse(decodedTasks);

      localStorage.setItem('groups', JSON.stringify(parsedTasks));

      groupsDispatch({
        type: GroupsReducerActionType.SetAllGroups,
        groups: parsedTasks,
      } as DispatchSetAllGroups);

      props.handleClose();
      navigate('/');
    } catch (error) {
      console.warn('An error occurred while importing tasks:', error); 
      setIsError(true);
    }
  };

  function handleImportCodeChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    setImportCode(event.target.value);
  };

  function getErrorTextClass(): string {
    return `error-text${isError ? '' : ' hidden'}`;
  }

  return (
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
  )
}