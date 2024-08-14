import { SMART_DPI_FIND_GW_CODE } from '../constants';

export function receiveGWCodeCli(gatewayName) {
    // send API request
    const mgmtCli = `run-script script-name "smart_dpi_find_gw_code" script "${SMART_DPI_FIND_GW_CODE}" targets.1 "${gatewayName}" --format json`;
    return mgmtCli;
  }