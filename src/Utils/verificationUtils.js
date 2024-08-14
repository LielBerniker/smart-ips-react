import { FOUND_GW_CODE, MONITOR_MODE, ACTION_MODE, MONITOR_STR, ACTION_STR } from '../constants';
import { isTimePass } from './dateAndTimeUtils';
import { GatewayConfigInfo, ProtectionInformation } from '../contexts/GatewayConfigModels';

async function isTaskSucceeded(item) {
    try {
        const jsonString = item.substring(item.indexOf('{'), item.lastIndexOf('}') + 1);
        console.log(jsonString);
        const jsonData = JSON.parse(jsonString);
        console.log(jsonData);
        // Access the status of the first task directly
        if (!jsonData.tasks || jsonData.tasks.length === 0) {
            console.log('No tasks found in data.');
            throw new Error('No tasks found in data.');
        }
        console.log(jsonData.tasks);
        const taskStatus = jsonData.tasks[0].status;
        if (taskStatus === "succeeded") {
            return true;
        } else {
            console.log('Item task status is faliure.');
            return false;
        }
    } catch (error) {
        const errorMessage = error.message
        console.log("Error parsing JSON (isTaskSucceeded):" + errorMessage);
        throw new Error("Error parsing JSON (isTaskSucceeded): " + errorMessage);
    }
}

async function isCodeOnGW(item) {
    try {
        const jsonString = item.substring(item.indexOf('{'), item.lastIndexOf('}') + 1);
        const jsonData = JSON.parse(jsonString);
        // Access the status of the first task directly
        if (!jsonData.tasks || jsonData.tasks.length === 0) {
            console.log('No tasks found in data.');
            throw new Error('No tasks found in data.');
        }
        var responseMessage = jsonData.tasks[0]["task-details"][0].responseMessage;
        const decodedMessage = atob(responseMessage);
        console.log(decodedMessage);
        if (Number(decodedMessage) === FOUND_GW_CODE) {
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.log("Error parsing JSON(isCodeOnGW):" + error.message);
        throw new Error("Error parsing JSON(isCodeOnGW):", error.message);
    }
}

async function updateInfoList(parsedResponseArray, infoArray) {
    for (const parsedResponse of parsedResponseArray) {
      var protectionInfo = new ProtectionInformation(parsedResponse.protection_name, parsedResponse.date, parsedResponse.status);
      infoArray.push(protectionInfo);
    }
  }
  

async function getConfigurationData(item) {
    let gatewayConfigData = new GatewayConfigInfo(false, MONITOR_STR, 50);
    try {
        const jsonString = item.substring(item.indexOf('{'), item.lastIndexOf('}') + 1);
        const jsonData = JSON.parse(jsonString);
        if (!jsonData.tasks && jsonData.tasks.length === 0) {
            console.log('No tasks found in data.');
            throw new Error('No tasks found in data.');
        }
        var responseMessage = jsonData.tasks[0]["task-details"][0].responseMessage;
        const decodedMessage = atob(responseMessage);
        const parsedResponse = JSON.parse(decodedMessage);
        console.log(parsedResponse)
        var currentMode = Number(parsedResponse.mode);
        switch (currentMode) {
            case ACTION_MODE:
                gatewayConfigData.mode = ACTION_STR
                gatewayConfigData.isEnabled = true
                break;
            case MONITOR_MODE:
                gatewayConfigData.mode = MONITOR_STR
                gatewayConfigData.isEnabled = true
                break;

            default:
                gatewayConfigData.mode = MONITOR_STR
                gatewayConfigData.isEnabled = false
        }
        gatewayConfigData.threshold = Number(parsedResponse.threshold);
        await updateInfoList(parsedResponse.protections.reverse(), gatewayConfigData.protections)
        await updateInfoList(parsedResponse.history.reverse(), gatewayConfigData.history)
        console.log('successfully got gateway configuration information');
        return gatewayConfigData;
    } catch (error) {
        console.log("Error parsing JSON(getCongigurationData):" + error);
        throw new Error('Error parsing JSON(getCongigurationData):', error.message);
    }
}

export async function isKeyTimePass(smartDpiKey, neededTime) {
    try {
        const storedData = localStorage.getItem(smartDpiKey);
        if (!storedData) {
            console.error('No data found in local storage for key:', smartDpiKey);
            throw new Error('No data found in local storage for key:', smartDpiKey);
        }

        const parsedData = JSON.parse(storedData);
        if (!parsedData || !parsedData.timestamp) {
            console.error('Invalid data format for key:', smartDpiKey);
            throw new Error('Invalid data format for key:', smartDpiKey);
        }

        const storedTime = new Date(parsedData.timestamp);
        if (isNaN(storedTime.getTime())) {
            console.error('Invalid timestamp in the stored data:', parsedData.timestamp);
            throw new Error('Invalid timestamp in the stored data:', parsedData.timestamp);
        }

        return isTimePass(storedTime, neededTime);
    } catch (error) {
        console.error('Error checking if time has passed:', error.message);
        throw new Error('Error checking if time has passed:', error.message);
    }
}

export async function getGWCodeResult(value) {
    try {
        // Check if value is an array and has at least one element
        if (!Array.isArray(value) || value.length === 0) {
            throw new Error('Invalid input: value is not an array or is an empty array.');
        }
        var firstItem = value[0];
        // Check if the task succeeded
        const taskSucceeded = await isTaskSucceeded(firstItem);
        if (!taskSucceeded) {
            console.log('Fail to get report of Smart IPS code in the GW');
            throw new Error('Fail to get report of Smart IPS code in the GW');
        } else {
            // Check if the required GW code is available
            const codeOnGW = await isCodeOnGW(firstItem);
            if (!codeOnGW) {
                console.log('The needed GW code is not available');
                return false;
            } else {
                return true;
            }
        }
    } catch (error) {
        console.error("An error occurred:", error.message);
        throw new Error("An error occurred:", error.message);
    }
}

export async function getGWInformation(value) {
    try {
        // Check if value is an array and has at least one element
        if (!Array.isArray(value) || value.length === 0) {
            throw new Error('Invalid input: value is not an array or is an empty array.');
        }
        var firstItem = value[0];
        // Check if the task succeeded
        const taskSucceeded = await isTaskSucceeded(firstItem);
        if (!taskSucceeded) {
            console.log('Fail to get report of Smart IPS information report');
            throw new Error('Fail to get report of Smart IPS information report');
        } else {
            var gwConfigData = await getConfigurationData(firstItem)
            return gwConfigData;
        }
    } catch (error) {
        console.error("An error occurred:", error.message);
        throw new Error("An error occurred:", error.message);
    }
}

export async function isCurrentTaskSucceeded(value) {
    try {
        // Check if value is an array and has at least one element
        if (!Array.isArray(value) || value.length === 0) {
            throw new Error('Invalid input: value is not an array or is an empty array.');
        }
        var firstItem = value[0];
        // Check if the task succeeded
        const taskSucceeded = await isTaskSucceeded(firstItem);
        if (!taskSucceeded) {
            console.log('Fail, the current task has failed');
            throw new Error('Fail, the current task has failed');
        } else {
            return true
        }
    } catch (error) {
        console.error("An error occurred in isCurrentTaskSucceeded(): ", error.message);
        throw new Error("An error occurred in isCurrentTaskSucceeded(): ", error.message);
    }
}

  

