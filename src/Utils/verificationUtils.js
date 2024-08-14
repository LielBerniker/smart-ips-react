import { FOUND_GW_CODE, GET_NEW_GW_CODE_TIME } from '../constants';
import { isTimePass } from './dateAndTimeUtils';

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
            else{
                return false;
            }
    } catch (error) {
        console.log("Error parsing JSON(isCodeOnGW):" + error.message);
        throw new Error("Error parsing JSON(isCodeOnGW):", error.message);
    }
}

export async function isGWCodeTimePass(smartDpiGWCodeKey) {
    try {
        const storedData = localStorage.getItem(smartDpiGWCodeKey);
        if (!storedData) {
            console.error('No data found in local storage for key:', smartDpiGWCodeKey);
            throw new Error('No data found in local storage for key:', smartDpiGWCodeKey);
        }

        const parsedData = JSON.parse(storedData);
        if (!parsedData || !parsedData.timestamp) {
            console.error('Invalid data format for key:', smartDpiGWCodeKey);
            throw new Error('Invalid data format for key:', smartDpiGWCodeKey);
        }

        const storedTime = new Date(parsedData.timestamp);
        if (isNaN(storedTime.getTime())) {
            console.error('Invalid timestamp in the stored data:', parsedData.timestamp);
            throw new Error('Invalid timestamp in the stored data:', parsedData.timestamp);
        }

        return isTimePass(storedTime, GET_NEW_GW_CODE_TIME);
    } catch (error) {
        console.error('Error checking if GW code time has passed:', error.message);
        throw new Error('Error checking if GW code time has passed:', error.message);
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