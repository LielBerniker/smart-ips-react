// src/contexts/GatewayConfigContext.js
import React, { createContext, useState, useEffect } from 'react';
import { SMART_DPI_INFORMATION, DISABLED_STR, ENABLED_STR } from '../constants'; // Import the constants

// Create the context
const GatewayConfigContext = createContext();

// ProtectionInformation class
class ProtectionInformation {
  constructor(name, date, status) {
    this.name = name;
    this.date = date;
    this.status = status;
  }
}

// GatewayConfigInfo class
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
  const [gatewayConfig, setGatewayConfig] = useState(null); // Initialize as null to indicate loading
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate data loading
    const gatewayConfigInstance = new GatewayConfigInfo(false, 'monitor', 50);

    // Add sample data to protections and history
    gatewayConfigInstance.protections.push(
      new ProtectionInformation('Protection 1', '2024-08-01', DISABLED_STR),
      new ProtectionInformation('Protection 2', '2024-08-02', DISABLED_STR)
    );

    gatewayConfigInstance.history.push(
      new ProtectionInformation('Microsoft Edge asm.js Type Confusion', '05 Aug 24 05:18:23 PM', ENABLED_STR),
      new ProtectionInformation('Microsoft Edge asm.js Type Confusion', '05 Aug 24 05:22:23 PM', DISABLED_STR)
    );

    // Set the gatewayConfigInstance and stop loading
    setGatewayConfig(gatewayConfigInstance);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Replace with your loading spinner or component
  }

  return (
    <GatewayConfigContext.Provider value={{ gatewayConfig, setGatewayConfig }}>
      {children}
    </GatewayConfigContext.Provider>
  );
};

export { GatewayConfigContext, GatewayConfigProvider };
