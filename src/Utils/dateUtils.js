// src/utils/dateUtils.js

export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  export const getNextDayFormatted = (date) => {
    let prevDateObj = new Date(date);
    prevDateObj.setDate(prevDateObj.getDate() + 1);
    return prevDateObj.toISOString().split('T')[0];
  };
  
  export const convertDateFormat = (dateStr) => {
    const months = {
        Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
        Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };
    const [day, month, year] = dateStr.split(' ').slice(0, 3);
    return `20${year}-${months[month]}-${day.padStart(2, '0')}`;
  };
  