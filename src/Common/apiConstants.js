import { Global } from './Global';

export const BASE_URL = Global.ipAddress;
export const PORT = Global.Url;
export const APIURL = `https://${BASE_URL}/${PORT}`;
