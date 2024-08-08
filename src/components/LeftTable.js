import React, { useState, useContext } from 'react';
import StateToggle from './StateToggle';
import ModeSelection from './ModeSelection';
import ThresholdInput from './ThresholdInput';
import { GatewayConfigContext } from '../contexts/GatewayConfigContext';
import './LeftTable.css';

function LeftTable() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [mode, setMode] = useState('monitor');
  const [threshold, setThreshold] = useState(60);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { gatewayConfig, setGatewayConfig } = useContext(GatewayConfigContext);

  const handleToggleChange = () => {
    setIsEnabled(prevState => {
      const newState = !prevState;
      if (!newState) {
        setMode('monitor'); // Change mode to 'monitor' when disabling
      }
      return newState;
    });
  };

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  const handleThresholdChange = (event) => {
    setThreshold(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    event.target.disabled = true;

    const thresholdValue = parseInt(threshold, 10);

    if (thresholdValue < 1 || thresholdValue > 100) {
      setErrorMessage('Please insert a valid threshold percentage, between 1 to 100.');
      setThreshold(60);
      setShowError(true);
      return;
    }

    setErrorMessage('');
    setShowError(false);

    // Update the existing gatewayConfig object
    setGatewayConfig(prevConfig => ({
      ...prevConfig,
      isEnabled,
      mode,
      threshold: thresholdValue,
    }));
  };

  const handleCloseError = () => {
    setShowError(false);
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
                <ThresholdInput isEnabled={isEnabled} threshold={threshold} handleThresholdChange={handleThresholdChange} />
                <button type="submit" onClick={handleSubmit}>Submit</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {showError && (
        <div className="error-modal">
          <div className="error-modal-content">
            <p>{errorMessage}</p>
            <button onClick={handleCloseError}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeftTable;
