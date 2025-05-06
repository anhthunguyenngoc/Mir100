import { useState, useEffect, createContext, useContext } from 'react';
import { ConfirmDialog } from '../components';
import * as api from '../api';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState({});

  /** @type {[api.TGetStatus, Function]} */
  const [robotStatus, setRobotStatus] = useState(null);

  const fetchRobotStatus = async () => {
    try {
      const { data } = await api.getStatus();
      setRobotStatus(data);
    } catch (err) {
      console.error('Error fetching robot status:', err);
    }
  };

  useEffect(() => {
    // Gọi lần đầu
    fetchRobotStatus();

    // Gọi lại sau mỗi 10 giây (10000 ms)
    const interval = setInterval(fetchRobotStatus, 10000);

    // Dọn dẹp khi unmount component
    return () => clearInterval(interval);
  }, []);

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
    <AppContext.Provider value={{ showDialog, robotStatus, fetchRobotStatus }}>
      {children}
      <ConfirmDialog
        open={open}
        title={options.title}
        content={options.content}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </AppContext.Provider>
  );
};
