import * as Comp from '../../components';
import * as Const from '../../constant';
import * as Context from '../../context';

const styles = {
  tick: {
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDisplay: {
    display: 'flex',
    alignItems: 'center',
  },
};

// Create a specialized component for snap modes
const SnapModeSelector = ({ enabledSnapModes, onChange }) => {
  const handleSnapModeToggle = (item) => {
    const updatedModes = {
      ...enabledSnapModes,
      [item.id]: !enabledSnapModes[item.id],
    };
    onChange(updatedModes);
  };

  // Count enabled snap modes for display
  const enabledCount = Object.values(enabledSnapModes).filter(Boolean).length;

  return (
    <Comp.SelectionDropUp
      items={Object.values(Const.snapMode)}
      renderItem={(item) => (
        <div className="flex row gap-5px snap-mode-item">
          <div style={styles.tick}>
            {enabledSnapModes[item.id] && <CheckIcon />}
          </div>
          <div style={styles.icon}>{item.icon}</div>
          <div className="name">{item.name}</div>
        </div>
      )}
      renderSelectedDisplay={() => (
        <div className="snap-mode-container gap-5px" style={styles.selectedDisplay}>
          <div style={styles.icon}>
            {Const.snapMode.grid.icon} {/* Use grid icon as default */}
          </div>
          <span className="content">Snap Modes</span>
          <span>({enabledCount})</span>
        </div>
      )}
      onItemClick={handleSnapModeToggle}
      style={{
        selector: {
          backgroundColor: '#f9f9f9',
        },
        width: 'fit-content',
      }}
    />
  );
};

// Simple check icon component
const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const CanvasFooter = ({ setIsContinuosLine }) => {
  const { enabledSnapModes, setEnabledSnapModes } = Context.useCanvasContext();

  const handleSnapModesChange = (updatedModes) => {
    setEnabledSnapModes(updatedModes);
  };

  return (
    <div className="flex row align-center gap-10px">
      <SnapModeSelector
        enabledSnapModes={enabledSnapModes}
        onChange={handleSnapModesChange}
      />

      <Comp.Toggle label="Continuous line" />
    </div>
  );
};
