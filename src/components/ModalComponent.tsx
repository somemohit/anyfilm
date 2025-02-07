import {useEffect} from 'react';
import ReactDOM from 'react-dom';

import {AiOutlineCloseCircle} from 'react-icons/ai';
import {ModalComponentProps} from '../modules/types_file';
// import {BsFillXCircleFill} from 'react-icons/bs';

export default function ModalComponent({
  closeModal,
  children,
  isModalOpen,
}: ModalComponentProps) {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflowY = 'hidden';
      return () => {
        document.body.style.overflowY = 'scroll';
      };
    }
  }, [isModalOpen]);

  const modalContent = isModalOpen ? (
    <>
      <div
        className="fixed top-0 left-0 bottom-0 right-0 z-[1000] bg-black/50"
        onClick={closeModal}
      ></div>
      <button className={`fixed top-6 right-6 z-[1000] sm:hidden`} onClick={closeModal}>
        <AiOutlineCloseCircle className="text-4xl text-white" />
      </button>
      <div className="modal-content fixed p-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] shadow-lg overflow-y-auto w-full md:w-fit lg:w-fit max-w-[95vw] lg:max-w-[90vw] max-h-[80vh] lg:max-h-[95vh] bg-gray-900 rounded-lg">
        {children}
      </div>
    </>
  ) : null;

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById('modal-root')!
  );
}
