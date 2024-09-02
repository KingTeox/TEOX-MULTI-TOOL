
import Logger from "../services/logger";
import Utils from "../services/utils";
import endpoints from "../configs/endpoints.json";

export type typeDDD = {
    status: string,
    message: string,
    continent: string,
    continentCode: string,
    country: string,
    countryCode: string,
    region: string,
    regionName: string,
    city: string,
    zip: string,
    timezone: string,
    currency: string,
    isp: string,
    org: string,
    as: string,
    asname: string,
    mobile: boolean,
    proxy: boolean,
    hosting: boolean,
    query: string
};

export type responseNodes = {
    host: string, 
    ip: string, 
    asn: string, 
    location: Array<string>
};

export type nodes = {
    host: string, 
    ip: string, 
    asn: string, 
    location: { 
        country: string, 
        city: string
    }
};

export type systemLoad = {
    warnings: {
        chalk: boolean;
    }
}

export type checkerHostMethods = ["tcp", "http", "result", "dns", "ping"];

export type config = {
    endpoints: typeof endpoints;
    utils: Utils;
    console: Logger;
};
