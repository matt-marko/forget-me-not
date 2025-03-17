import ExportModal from '../export-modal/ExportModal';
import ImportModal from '../import-modal/ImportModal';
import './BackupModal.css';

export enum ModalType {
  Export,
  Import,
}

type ModalWrapperProps = {
  open: boolean;
  handleClose(): void;
  modalType: ModalType | null;
}

function ModalWrapper(props: ModalWrapperProps) {
  switch (props.modalType) {
    case ModalType.Export:
      return <ExportModal open={props.open}/>;
    case ModalType.Import:
      return <ImportModal open={props.open} />;
    default:
      return null;
  }
}

export default ModalWrapper;