// src/contexts/GatewayConfigContext.js
import React, { createContext, useState } from 'react';
import { SMART_DPI_INFORMATION } from '../constants'; // Import the constants

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
    this.smartDpiKey = SMART_DPI_INFORMATION
  }
}

// Create a provider component
const GatewayConfigProvider = ({ children }) => {
  const [gatewayConfig, setGatewayConfig] = useState(new GatewayConfigInfo(false, 'monitor', 50));

  return (
    <GatewayConfigContext.Provider value={{ gatewayConfig, setGatewayConfig }}>
      {children}
    </GatewayConfigContext.Provider>
  );
};

export { GatewayConfigContext, GatewayConfigProvider };
