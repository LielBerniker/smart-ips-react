
// script file path
export const SMART_DPI_CONFIG = "$FWDIR/bin/smart_dpi_config.pyc";

// Command paths for Smart DPI configuration
export const SMART_DPI_PYTHON_CONFIG = "python3 " + SMART_DPI_CONFIG;

// find the code on GW
export const SMART_DPI_FIND_GW_CODE = "if test -f " + SMART_DPI_CONFIG + "; then echo 1; else echo 0; fi;"

// adaptive ips mods
export const DISABLE_MODE = 1 /* Send report to cloud only */
export const MONITOR_MODE = 2 /* Monitor + send log to smart console */
export const ACTION_MODE = 3 /* Completely enabled */

// Status Strings
export const MONITOR_STR = "Monitor"
export const ACTION_STR = "Action"
export const ENABLED_STR = "Enabled"
export const DISABLED_STR = "Disabled"

// Update Descriptions
export const MODE_UPDATE = "Mode update"
export const STATE_UPDATE = "State update"
export const SMART_DPI_INFORMATION = "smart_dpi_information"

// found code on GW result
export const FOUND_GW_CODE = 1;
export const NOT_FOUND_GW_CODE = 0;

// time in minutes
export const GET_NEW_REPORT_TIME = 20;
export const GET_NEW_GW_CODE_TIME = 720;