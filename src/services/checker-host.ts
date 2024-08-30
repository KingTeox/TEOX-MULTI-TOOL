
import { config } from "../types";

export class checkerHost {

    config: config;

    constructor(config: config) {
        this.config = config;
    };

    async start() {
        return this.config.console.log(`FERRAMENTA DE HOST EM MANUNTENÇÂO.`);
    };
};

export default checkerHost;
