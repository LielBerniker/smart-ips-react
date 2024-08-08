import React from 'react';

function ThresholdInput({ isEnabled }) {
  return (
    <div className="threshold-wrapper">
      <label htmlFor="threshold">Threshold (%):</label>
      <input
        type="number"
        id="threshold"
        name="threshold"
        min="1"
        max="100"
        disabled={!isEnabled}
      />
    </div>
  );
}

export default ThresholdInput;
