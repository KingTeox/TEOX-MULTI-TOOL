
import { config } from "../types";

export class checkerRages {

    config: config;

    constructor(config: config) {
        this.config = config;
    };

    async start() {
        return this.config.console.log(`FERRAMENTA DE RAGES EM MANUNTENÇÂO.`);
    };
};

export default checkerRages;
