import './ExportModal.css';
import Button from '@mui/material/Button/Button';
import { useContext, useEffect, useRef } from 'react';
import { GroupsContext } from '../../../services/Context';

type BackupModalProps = {
  open: boolean;
  handleClose(): void;
}

export default function ExportModal(props: BackupModalProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const groupsContext = useContext(GroupsContext);

  useEffect(() => {
    textareaRef.current?.select();
  }, []);

  return (
    <div className='backup-modal-content'>
      <h1>Export tasks</h1>
      <textarea 
        readOnly={true}
        value={btoa(JSON.stringify(groupsContext))}
        ref={textareaRef}
      />
      <p>These are your tasks!<br />Copy the code and keep it somewhere safe</p>
      <Button 
        onClick={props.handleClose}
        variant='contained'
      >
        Got it!
      </Button>
    </div>
  )
}