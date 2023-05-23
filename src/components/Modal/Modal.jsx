import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ children, onClose }) {
  const closeModal = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );
  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, [closeModal]);

  return createPortal(
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

export default Modal;

PropTypes.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
