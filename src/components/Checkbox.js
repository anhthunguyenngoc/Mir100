import { useState } from 'react';
import * as Const from '../constant';

// CSS styles defined inline
const styles = {
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '10px 0'
  },
  checkboxInput: {
    position: 'absolute',
    opacity: 0,
    cursor: 'pointer',
    height: 0,
    width: 0
  },
  checkboxLabel: {
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  checkboxCustom: {
    height: '20px',
    width: '20px',
    border: '2px solid #ccc',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  },
  checkboxCustomChecked: {
    backgroundColor: Const.Color.SELECTED_BUTTON,
    borderColor: Const.Color.SELECTED_BUTTON
  },
  checkmark: {
    color: 'white',
    fontSize: '12px',
    visibility: 'hidden'
  },
  checkmarkVisible: {
    visibility: 'visible'
  }
};

// Checkbox Component
export const Checkbox = ({ label, checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);
  
  const handleChange = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    if (onChange) {
      onChange(newState);
    }
  };
  
  return (
    <div style={styles.checkboxContainer}>
      <label style={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          style={styles.checkboxInput}
        />
        <span 
          style={{
            ...styles.checkboxCustom,
            ...(isChecked ? styles.checkboxCustomChecked : {})
          }}
        >
          <span 
            style={{
              ...styles.checkmark,
              ...(isChecked ? styles.checkmarkVisible : {})
            }}
          >
            ✓
          </span>
        </span>
        {label}
      </label>
    </div>
  );
};