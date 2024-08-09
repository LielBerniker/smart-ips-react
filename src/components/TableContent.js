import React, { useContext } from 'react';
import { GatewayConfigContext } from '../contexts/GatewayConfigContext';
import { MODE_UPDATE, STATE_UPDATE } from '../constants';

function TableContent({ tableType }) {
  const { gatewayConfig } = useContext(GatewayConfigContext);
  
  // Determine which array to use based on the tableType
  const tableInformationList = tableType === 'Critical Impact Protections'
    ? gatewayConfig.protections
    : gatewayConfig.history;

  return (
    <table className="protection-table">
      <colgroup>
        <col style={{ width: '50%' }} />
        <col style={{ width: '25%' }} />
        <col style={{ width: '25%' }} />
      </colgroup>
      <thead>
        <tr>
          <th className="protection-table-th">Name</th>
          <th className="protection-table-th">Date</th>
          <th className="protection-table-th">Status</th>
        </tr>
      </thead>
      <tbody className="protection-table-tbody">
        {tableInformationList.map((row, index) => {
          let tdClassStatus = 'protection-table-td-status-';

          // Use constants to determine the status class
          if (row.status === MODE_UPDATE || row.status === STATE_UPDATE) {
            tdClassStatus += 'Update';
          } else {
            tdClassStatus += row.status;
          }

          return (
            <tr key={index}>
              <td className="protection-table-td">{row.name}</td>
              <td className="protection-table-td">{row.date}</td>
              <td className={tdClassStatus}>{row.status}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableContent;
