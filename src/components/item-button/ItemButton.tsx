import './ItemButton.css';
import { ReactNode } from "react";
import { Task } from "../../interfaces/task";
import { Group } from '../../interfaces/group';

type ItemButtonProps = {
  item: Task | Group;
  clickHandler(itemId?: number): void;
  display: boolean,
  colour: string,
  children: ReactNode
}

function TaskItemButton(props: ItemButtonProps) {
  const getButtonClassName = () => {
    let name = `item-button ${props.colour} `;
    name += props.display ? 'visible' : 'hidden';
    return name;
  };

  return(
    <button 
      onClick={(e) => {
        e.stopPropagation();
        props.clickHandler(props.item.id)
      }} 
      className={getButtonClassName()}
    >
    {props.children}
    </button>
  );
}

export default TaskItemButton;