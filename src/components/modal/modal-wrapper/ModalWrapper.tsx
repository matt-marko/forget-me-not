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
  switch (props.modalType) {
    case ModalType.Export:
      return <ExportModal {...props}/>;
    case ModalType.Import:
      return <ImportModal {...props} />;
    default:
      return null;
  }
}