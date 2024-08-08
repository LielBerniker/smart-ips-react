import React, { useState } from 'react';
import StateToggle from './StateToggle';
import ModeSelection from './ModeSelection';
import ThresholdInput from './ThresholdInput';

function LeftTable() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [mode, setMode] = useState('monitor');

  const handleToggleChange = () => {
    setIsEnabled(!isEnabled);
  };

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <div className="left-table-wrapper">
      <table className="left-table">
        <thead>
          <tr>
            <th className="policy-header">Policy</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="config-container">
                <StateToggle isEnabled={isEnabled} handleToggleChange={handleToggleChange} />
                <ModeSelection isEnabled={isEnabled} mode={mode} handleModeChange={handleModeChange} />
                <ThresholdInput isEnabled={isEnabled} />
                <button type="submit">Submit</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LeftTable;
