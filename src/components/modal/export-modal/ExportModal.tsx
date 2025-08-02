import './ExportModal.css';
import Button from '@mui/material/Button/Button';
import { useContext, useEffect, useRef } from 'react';
import { GroupsContext } from '../../../services/Context';
import { Group } from '../../../interfaces/group';

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

  function encodeGroupsToBase64(groups: Group[]): string {
    const json = JSON.stringify(groups);
    const utf8bytes = new TextEncoder().encode(json);
    const base64 = btoa(String.fromCharCode(...utf8bytes));
    return base64;
  }

  return (
    <div className='backup-modal-content'>
      <h1>Export tasks</h1>
      <textarea 
        readOnly={true}
        value={encodeGroupsToBase64(groupsContext)}
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