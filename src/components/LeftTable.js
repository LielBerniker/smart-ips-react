import React from 'react';

function LeftTable() {
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
                <div className="state-wrapper">
                  <span className="state-text">State:</span>
                  <label className="switch">
                    <input type="checkbox" id="stateToggle" />
                    <span className="slider"></span>
                  </label>
                  <span className="state-status">Disabled</span>
                </div>
                <div className="mode-wrapper">
                  <span className="mode-text">Mode:</span>
                  <div className="radio-options">
                    <label>
                      <input type="radio" name="mode" value="monitor" disabled /> Monitor
                    </label>
                    <label>
                      <input type="radio" name="mode" value="action" disabled /> Action
                    </label>
                  </div>
                </div>
                <div className="threshold-wrapper">
                  <label htmlFor="threshold">Threshold (%):</label>
                  <input type="number" id="threshold" name="threshold" min="1" max="100" />
                </div>
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
