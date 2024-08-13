import { SMART_DPI_INFORMATION, DISABLED_STR, ENABLED_STR } from '../constants';
import { GatewayConfigInfo, ProtectionInformation } from './GatewayConfigModels';
import SmartConsoleInteractions from "smart-console-interactions";


var interactions = new SmartConsoleInteractions();

const gatewayConfigState = {
    gatewayName: null,
    smartDpiInformationKey: SMART_DPI_INFORMATION,
    smartDpiGWCodeKey: SMART_DPI_INFORMATION,
    // Add other shared properties as needed
  };


async function updateGWConfigParams(obj) {
  try {
    // Destructure to safely access the nested properties
    const { event } = obj;
    const { objects } = event || {};

    // Ensure that objects[0] exists and has a 'name' property
    if (!objects || !objects[0] || !objects[0].name) {
      throw new Error("Invalid object structure or missing 'name' property.");
    }

    // Safely retrieve the gateway name
    const gatewayName = objects[0].name;

    // Update the global gatewayConfigState
    gatewayConfigState.gatewayName = gatewayName;
    gatewayConfigState.smartDpiInformationKey += `_${gatewayName}`;
    gatewayConfigState.smartDpiGWCodeKey += `_${gatewayName}`;

    // Log the updated keys for debugging purposes
    console.log(gatewayConfigState.smartDpiInformationKey);
    console.log(gatewayConfigState.smartDpiGWCodeKey);
  } catch (error) {
    console.error("Error updating gateway configuration:", error);
    // Handle the error or rethrow it, depending on your application's needs
  }
}

// async function isNeededGWCodeAvailable(obj) {

//   if (!localStorage.hasOwnProperty(smartDpiGWCodeKey)) {
//     receiveGWCode()
//     console.log("smartDpiGWCodeKey not in local storge")
//   } else {
//     console.log("smartDpiGWCodeKey is in local storge")
//     const storedData = localStorage.getItem(smartDpiGWCodeKey);
//     const parsedData = JSON.parse(storedData);
//     const storedTime = new Date(parsedData.timestamp);
//     if (isTimePass(storedTime, GET_NEW_GW_CODE_TIME)) {
//       receiveGWCode()
//     } else {
//       if (Number(parsedData.isCodeOnGW) === 1) {
//         console.log("gw got the needed code for the extension")
//         handleGWInformation()
//       }
//     }
//   }
// }

// Main function to create the GatewayConfigInstance
export const createGatewayConfigInstance = async () => {
  const gatewayConfigInstance = new GatewayConfigInfo(false, 'monitor', 50);
  try {
    const result = await interactions.getContextObject();
    await updateGWConfigParams(result);

  } catch (error) {
    console.error("Failed to update gateway configuration:", error);
  }

  gatewayConfigInstance.protections.push(
    new ProtectionInformation('Protection 1', '2024-08-01', DISABLED_STR),
    new ProtectionInformation('Protection 2', '2024-08-02', DISABLED_STR)
  );

  gatewayConfigInstance.history.push(
    new ProtectionInformation('Microsoft Edge asm.js Type Confusion', '05 Aug 24 05:18:23 PM', ENABLED_STR),
    new ProtectionInformation('Microsoft Edge asm.js Type Confusion', '05 Aug 24 05:22:23 PM', DISABLED_STR)
  );

  return gatewayConfigInstance;
};
  
