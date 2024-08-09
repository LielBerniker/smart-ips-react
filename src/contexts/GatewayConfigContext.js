// src/contexts/GatewayConfigContext.js
import React, { createContext, useState } from 'react';
import { SMART_DPI_INFORMATION, DISABLED_STR, ENABLED_STR, MODE_UPDATE, STATE_UPDATE } from '../constants'; // Import the constants

// Create the context
const GatewayConfigContext = createContext();

// GatewayConfigInfo and ProtectionInformation classes
class ProtectionInformation {
  constructor(name, date, status) {
    this.name = name;
    this.date = date;
    this.status = status;
  }
}

class GatewayConfigInfo {
  constructor(isEnabled, mode, threshold) {
    this.isEnabled = isEnabled;
    this.mode = mode;
    this.threshold = threshold;
    this.protections = [];
    this.history = [];
    this.smartDpiKey = SMART_DPI_INFORMATION;
  }
}

// Create a provider component
const GatewayConfigProvider = ({ children }) => {
  // Create an instance of GatewayConfigInfo
  const gatewayConfigInstance = new GatewayConfigInfo(false, 'monitor', 50);

  // Add sample data to protections and history
  gatewayConfigInstance.protections.push(
    new ProtectionInformation('Protection 1', '2024-08-01', DISABLED_STR),
    new ProtectionInformation('Protection 2', '2024-08-02', DISABLED_STR)
  );

  gatewayConfigInstance.history.push(
    new ProtectionInformation('History 1', '2024-08-03', MODE_UPDATE),
    new ProtectionInformation('History 2', '2024-08-04', STATE_UPDATE),
    new ProtectionInformation('History 3', '2024-08-05', DISABLED_STR),
    new ProtectionInformation('History 4', '2024-08-06', STATE_UPDATE),
    new ProtectionInformation('History 5', '2024-08-07', ENABLED_STR),
    new ProtectionInformation('History 6', '2024-08-07', STATE_UPDATE)
  );

  // Initialize state with the updated gatewayConfigInstance
  const [gatewayConfig, setGatewayConfig] = useState(gatewayConfigInstance);

  return (
    <GatewayConfigContext.Provider value={{ gatewayConfig, setGatewayConfig }}>
      {children}
    </GatewayConfigContext.Provider>
  );
};

export { GatewayConfigContext, GatewayConfigProvider };
