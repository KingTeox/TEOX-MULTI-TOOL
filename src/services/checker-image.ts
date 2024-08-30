
import { config } from "../types";

import { exiftool } from "exiftool-vendored";

export class imagemChecker {

    config: config;
    tool: typeof exiftool;

    constructor(config: config) {
        this.config = config;
        this.tool = exiftool;
    };

    async multiChecker() {

    };

    async version() {
        return this.tool.version().then((s) => this.config.console.log(`Ferramenta de imagem esta na versão: [${s}]`));
    };

    async metaDados(path: string) {
        return this.tool.read(path).then((tags) => {
            this.config.console.log(`CHECKER-IMAGE(${path}) METADADOS -> ` + tags);
        }).catch((reason) => {
            this.config.console.error(`CHECKER-IMAGE(${path}) ERROR -> ${reason}`)
        });
    };
};

export default imagemChecker;