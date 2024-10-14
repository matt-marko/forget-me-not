import './TaskItemButton.css';
import { ReactNode } from "react";
import { Task } from "../task";

const buttonStyle: React.CSSProperties = {
  appearance: 'none',
  width: '20px',
  height: '20px',
  color: 'white',
  borderRadius: '50%',
  border: 'none',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2) n, 0 1px 3px rgba(0, 0, 0, 0.15)',
  cursor: 'pointer',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '12px',
  userSelect: 'none',
};

type RemoveButtonProps = {
  task: Task;
  clickHandler: Function;
  display: boolean,
  colour: string,
  children: ReactNode
}

function TaskItemButton(props: RemoveButtonProps) {
  const calculatedStyle: React.CSSProperties = {
    ...buttonStyle,
    visibility: props.display ? 'visible' : 'hidden',
  }

  return(
    <button onClick={() => props.clickHandler(props.task.id)} style={calculatedStyle} className={props.colour}>
      {props.children}
    </button>
  );
}

export default TaskItemButton;