// src/components/ProtectionTable.js
import React, { useState, useEffect } from 'react';
import TableContent from './TableContent';
import ProtectionsTimeline from './ProtectionsTimeline';

function ProtectionTable() {
  const [activeTab, setActiveTab] = useState('critical-impact-protections');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleContentLoaded = () => {
    setLoading(false); // Content has loaded, so stop showing the loader
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'critical-impact-protections':
        return <TableContent tableType="Critical Impact Protections" onLoad={handleContentLoaded} />;
      case 'log-history':
        return <TableContent tableType="Log History" onLoad={handleContentLoaded} />;
      case 'timeline-show':
        return <ProtectionsTimeline onLoad={handleContentLoaded} />;
      default:
        return <TableContent tableType="Critical Impact Protections" onLoad={handleContentLoaded} />;
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
        {loading ? (
          <div className="loading-icon">Loading...</div> // Replace with an actual spinner if needed
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
}

export default ProtectionTable;
