import './GroupColour.css';
import { ChangeEvent, useContext, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { GroupsContext, GroupsDispatchContext } from '../../services/Context';
import { isValidColourHexCode } from '../../util/Parsing';
import { DispatchSetGroupColour, GroupsReducerActionType } from '../../services/Reducer';

export default function GroupColour() {
  const { groupId } = useParams();
  const groups = useContext(GroupsContext);

  const currentGroup = groups.find(g => Number.parseInt(groupId ?? '') === g.id);

  const [colourCode, setColourCode] = useState<string>(currentGroup?.colour ?? '');
  const [isColourInvalid, setIsColourInvalid] = useState<boolean>(false);
  const groupsDispatch = useContext(GroupsDispatchContext);
  const navigate = useNavigate();

  if (groupId === undefined || currentGroup === undefined) {
    console.error('Error in Colour component: invalid groupId', groupId);
    return <h1>Invalid group</h1>;
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setIsColourInvalid(false);
    const transformedColourCode = `#${event.target.value.substring(1)}`;
    setColourCode(transformedColourCode);
  }

  function onConfirmColour() {
    const isValid = isValidColourHexCode(colourCode);

    if (!isValid) {
      setIsColourInvalid(true);
      return;
    }

    groupsDispatch({
      type: GroupsReducerActionType.SetGroupColour,
      groupId: Number.parseInt(groupId!),
      colour: colourCode,
    } as DispatchSetGroupColour);

    navigate(`/groups/${groupId}`);
  }
 
  function getErrorTextClass(): string {
    return `colour-error-text${isColourInvalid ? '' : ' hidden'}`;
  }

  return (
    <div
      className='colour-main-content'
      style={{ backgroundColor: currentGroup.colour }}
    >
      <div className='colour-panel'>
        <h1>Set Group Colour</h1>
        <div className='colour-input'>
          <TextField
            value={colourCode}
            onChange={onChange}
            slotProps={{
              htmlInput: { maxLength: 7 }
            }}
          />
        </div>
        <p className={getErrorTextClass()}>Invalid colour code!</p>
        <div className='colour-button-container'>
          <span className='colour-button'>
            <Button
              variant='contained'
              onClick={() => navigate(`/groups/${groupId}`)}
            >
              <ArrowBackIcon />
            </Button>
          </span>
          <span
            className='colour-button'
          >
            <Button
              variant='contained'
              color='success'
              onClick={onConfirmColour}
            >
              <CheckIcon />
            </Button>
          </span>
        </div>
      </div>
    </div>
  )
}