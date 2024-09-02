
import Utils from "./src/services/utils";
import Logger from "./src/services/logger";

import serviceHost from "./src/services/checker-host";
import serviceImage from "./src/services/checker-image";
import servicePentest from "./src/services/checker-pentest";
import serviceRage from "./src/services/checker-rage";

import endpoints from "./src/configs/endpoints.json";

const serviceLogger = new Logger();
const serviceUtils = new Utils();

serviceLogger.log("Carregando sistema.");
serviceUtils.setTitle("=============================================");

class loadSystem {

    //warnings: { chalk: boolean };

    constructor() {
        //this.chalk = null;
        //this.warnings = {
        //    chalk: false
        //};
        this.start();
    };

    async start() {
        try {

            const checkerHost = new serviceHost({ console: serviceLogger, utils: serviceUtils, endpoints }, true);
            const checkerImage = new serviceImage({ console: serviceLogger, utils: serviceUtils, endpoints });
            const checkerPentest = new servicePentest({ console: serviceLogger, utils: serviceUtils, endpoints });
            const checkerRage = new serviceRage({ console: serviceLogger, utils: serviceUtils, endpoints });

            checkerHost.test();
            checkerImage.version();
            checkerPentest.start();
            checkerRage.start();
        } catch (error) {
            serviceLogger.error(`- LOAD ERROR -> ` + error);
        };
    };
};

try {
    new loadSystem();
} catch (error) {
    serviceLogger.error(`- SYSTEM ERROR -> ` + error);  
};
