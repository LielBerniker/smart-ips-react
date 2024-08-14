import { SMART_DPI_INFORMATION, DISABLED_STR, ENABLED_STR, FOUND_GW_CODE, NOT_FOUND_GW_CODE } from '../constants';
import { GatewayConfigInfo, ProtectionInformation } from './GatewayConfigModels';
import { receiveGWCodeCli } from '../utils/cliUtils';
import { isGWCodeTimePass, getGWCodeResult } from '../utils/verificationUtils';
import { updateGWCodeLocalStorge } from '../utils/localStorageUtils';
import SmartConsoleInteractions from "smart-console-interactions";


var interactions = new SmartConsoleInteractions();

const gatewayConfigState = {
  gatewayName: null,
  smartDpiInformationKey: SMART_DPI_INFORMATION,
  smartDpiGWCodeKey: SMART_DPI_INFORMATION,
  // Add other shared properties as needed
};

async function updateAndReturnGWCodeStatus(isGWCode){
  if (isGWCode){
    console.log("GW have the needed code for the smart ips extension")
    updateGWCodeLocalStorge(FOUND_GW_CODE, gatewayConfigState.smartDpiGWCodeKey);
    return true;
  }
  else{
    console.log("GW do not have the needed code for the smart ips extension")
    updateGWCodeLocalStorge(NOT_FOUND_GW_CODE, gatewayConfigState.smartDpiGWCodeKey);
    return false;
  }
}

async function isUpdateCodeOnGW() {
  try {
    if (!localStorage.hasOwnProperty(gatewayConfigState.smartDpiGWCodeKey) || await isGWCodeTimePass(gatewayConfigState.smartDpiGWCodeKey)) {
      console.log("smartDpiGWCodeKey is not in local storage, or the timestamp has expired.")
      const gwCodeCli = receiveGWCodeCli(gatewayConfigState.gatewayName);
      var result = await interactions.requestCommit([gwCodeCli]);
      const GWCodeResult = await getGWCodeResult(result);
      const gwCodeStatus = await updateAndReturnGWCodeStatus(GWCodeResult);
      return gwCodeStatus
    } else {
      const storedData = localStorage.getItem(gatewayConfigState.smartDpiGWCodeKey);
      const parsedData = JSON.parse(storedData);
      if (Number(parsedData.isCodeOnGW) === FOUND_GW_CODE){
        console.log("GW have the needed code for the smart ips extension")
        return true;
      }
      else{
        console.log("GW do not have the needed code for the smart ips extension")
        return false;
      }
    }
  } catch (error) {
    console.error("Error while serchong for smart ips GW code: ", error);
    throw new Error("Error while serchong for smart ips GW code:", error.message);
  }
}

async function updateGWConfigParams() {
  try {
    const result = await interactions.getContextObject();
    // Destructure to safely access the nested properties
    const { event } = result;
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
    throw new Error("Error updating gateway configuration:", error.message);
  }
}

// Main function to create the GatewayConfigInstance
export const createGatewayConfigInstance = async () => {
  const gatewayConfigInstance = new GatewayConfigInfo(false, 'monitor', 50);
  try {
    await updateGWConfigParams();
    const updateCodeOnGW = await isUpdateCodeOnGW();
    if (!updateCodeOnGW){
      console.log("no needed gw code");
      gatewayConfigInstance.threshold = 33;
    }

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

