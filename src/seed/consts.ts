import { v4 as uuidv4 } from 'uuid';

export const SETTING_APP_ID = `${process.env.APP_NAME}-setting-app-id`;

export const USER_DEFAULT_ID = process.env.USER_ID;
export const DATA_TYPE_TEXT = 'data-type-type-text';

export const REPORT_STATUS_ACTIVE_ID = uuidv4();
export const REPORT_STATUS_START_PARSER_ID = uuidv4();
export const REPORT_STATUS_FAILURE_PARSER_ID = uuidv4();
export const REPORT_STATUS_SUCCESS_PARSER_ID = uuidv4();