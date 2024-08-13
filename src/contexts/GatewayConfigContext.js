// src/contexts/GatewayConfigContext.js
import React, { createContext, useState, useEffect } from 'react';
import { createGatewayConfigInstance } from './GatewayConfigService';

// Create the context
const GatewayConfigContext = createContext();

// Create a provider component
const GatewayConfigProvider = ({ children }) => {
  const [gatewayConfig, setGatewayConfig] = useState(null); // Initialize as null to indicate loading
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gatewayConfigInstance = await createGatewayConfigInstance();
        console.log(gatewayConfigInstance.mode);
        console.log(gatewayConfigInstance.threshold);
        setGatewayConfig(gatewayConfigInstance);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <GatewayConfigContext.Provider value={{ gatewayConfig, setGatewayConfig }}>
      {children}
    </GatewayConfigContext.Provider>
  );
};

export { GatewayConfigContext, GatewayConfigProvider };
