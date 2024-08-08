import React, { useState } from 'react';
import './App.css'; // Ensure this imports the CSS with the new styles

function ProtectionTable() {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'critical-impact-protections':
        return <h1>Critical Impact Protections Content</h1>;
      case 'log-history':
        return <h1>Log History Content</h1>;
      case 'timeline-show':
        return <h1>Timeline Content</h1>;
      default:
        return <h1>Select a tab to view content</h1>;
    }
  };

  return (
    <div className="protection-table-container">
      <div className="header-container">
        <h1
          id="critical-impact-protections"
          className={activeTab === 'critical-impact-protections' ? 'active' : ''}
          onClick={() => handleTabClick('critical-impact-protections')}
        >
          Critical Impact Protections
        </h1>
        <h1
          id="log-history"
          className={activeTab === 'log-history' ? 'active' : ''}
          onClick={() => handleTabClick('log-history')}
        >
          Log History
        </h1>
        <h1
          id="timeline-show"
          className={activeTab === 'timeline-show' ? 'active' : ''}
          onClick={() => handleTabClick('timeline-show')}
        >
          Timeline
        </h1>
      </div>
      <div className="protection-table-wrapper">
        {renderContent()}
      </div>
    </div>
  );
}

export default ProtectionTable;
