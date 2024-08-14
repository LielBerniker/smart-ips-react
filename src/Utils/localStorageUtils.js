export function updateGWCodeLocalStorge(gwCodeState, smartDpiGWCodeKey) {
  console.log(smartDpiGWCodeKey);
  const currentTime = new Date().toISOString();
  const SmartDpiGWCodeObject = {
    isCodeOnGW: gwCodeState,
    timestamp: currentTime
  };
  localStorage.setItem(smartDpiGWCodeKey, JSON.stringify(SmartDpiGWCodeObject));
  console.log("Finish to update gw code local storage");
}