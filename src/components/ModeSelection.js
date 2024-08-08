import React from 'react';

function ModeSelection({ isEnabled, mode, handleModeChange }) {
  return (
    <div className="mode-wrapper">
      <span className="mode-text">Mode:</span>
      <div className="radio-options">
        <label>
          <input
            type="radio"
            name="mode"
            value="monitor"
            checked={mode === 'monitor'}
            disabled={!isEnabled}
            onChange={handleModeChange}
          />
          Monitor
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="action"
            checked={mode === 'action'}
            disabled={!isEnabled}
            onChange={handleModeChange}
          />
          Action
        </label>
      </div>
    </div>
  );
}

export default ModeSelection;