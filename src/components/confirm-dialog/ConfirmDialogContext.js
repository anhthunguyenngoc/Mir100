import { ConfirmDialog } from './ConfirmDialog';

import { createContext, useContext, useState } from 'react';

const ConfirmDialogContext = createContext();

export const useConfirmDialog = () => useContext(ConfirmDialogContext);

export const ConfirmDialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState({});

  const showDialog = (opts) => {
    setOptions(opts);
    setOpen(true);
  };

  const handleConfirm = () => {
    setOpen(false);
    options?.onConfirm?.();
  };

  const handleCancel = () => {
    setOpen(false);
    options?.onCancel?.();
  };

  return (
    <ConfirmDialogContext.Provider value={{ showDialog }}>
      {children}
      <ConfirmDialog
        open={open}
        title={options.title}
        content={options.content}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmDialogContext.Provider>
  );
};
