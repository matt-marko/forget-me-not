import './ModalWrapper.css';
import { Modal } from '@mui/material';
import ExportModal from '../export-modal/ExportModal';
import ImportModal from '../import-modal/ImportModal';

export enum ModalType {
  Export,
  Import,
}

type ModalWrapperProps = {
  open: boolean;
  handleClose(): void;
  modalType: ModalType | null;
}

export default function ModalWrapper(props: ModalWrapperProps) {
  let modalContent = null;

  switch (props.modalType) {
    case ModalType.Export:
      modalContent = <ExportModal {...props}/>;
      break;
    case ModalType.Import:
      modalContent = <ImportModal {...props}/>;
      break;
    default:
      modalContent = null;
  }

  if (modalContent === null) {
    return null;
  }

  return (
    <Modal
      className='modal-wrapper'
      open={props.open}
      onClose={props.handleClose}
    >
      <div>
        {modalContent}
      </div>
    </Modal>
  )
}