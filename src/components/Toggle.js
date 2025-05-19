import { useState } from 'react';
import * as Const from '../constant';

// CSS styles defined inline
const styles = {
  toggleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '10px 0',
  },
  toggleLabel: {
    fontSize: '14px',
    fontWeight: '500',
  },
  toggleButton: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: '44px',
    height: '24px',
    borderRadius: '12px',
    backgroundColor: Const.Color.LIGHT_BUTTON,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    border: 'none',
    padding: 0,
  },
  toggleButtonActive: {
    backgroundColor: Const.Color.SELECTED_BUTTON,
  },
  toggleThumb: {
    position: 'absolute',
    left: '4px',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: Const.Color.WHITE,
    transition: 'transform 0.3s',
    boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
  },
  toggleThumbActive: {
    transform: 'translateX(20px)',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '10px 0',
  },
  checkboxInput: {
    position: 'absolute',
    opacity: 0,
    cursor: 'pointer',
    height: 0,
    width: 0,
  },
  checkboxLabel: {
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  checkboxCustom: {
    height: '20px',
    width: '20px',
    border: '2px solid #ccc',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  checkboxCustomChecked: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  checkmark: {
    color: 'white',
    fontSize: '12px',
    visibility: 'hidden',
  },
  checkmarkVisible: {
    visibility: 'visible',
  },
};

// Toggle Component
export const Toggle = ({ label, isOn = false, onToggle }) => {
  const [toggleState, setToggleState] = useState(isOn);

  const handleToggle = () => {
    const newState = !toggleState;
    setToggleState(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div style={styles.toggleContainer}>
      <button
        onClick={handleToggle}
        style={{
          ...styles.toggleButton,
          ...(toggleState ? styles.toggleButtonActive : {}),
        }}
        aria-checked={toggleState}
        role="switch"
      >
        <span
          style={{
            ...styles.toggleThumb,
            ...(toggleState ? styles.toggleThumbActive : {}),
          }}
        />
      </button>
      {label && <span style={styles.toggleLabel}>{label}</span>}
    </div>
  );
};
