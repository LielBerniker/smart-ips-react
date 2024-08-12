// src/utils/dateUtils.js

export const formatDate = (date) => {
    const year = date.getFullYear().toString().slice(-2); // last two digits of year
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // month
    const day = date.getDate().toString().padStart(2, '0'); // day
    return `20${year}-${month}-${day}`;
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
  