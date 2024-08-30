
import Logger from "../services/logger";
import Utils from "../services/utils";

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

export type systemLoad = {
    warnings: {
        chalk: boolean;
    }
}

export type config = {
    utils: Utils;
    console: Logger;
};
