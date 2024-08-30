
import * as fs from "fs";
import path from "path";
import { exec } from "child_process";
import process from "process";

export class Utils {

    fs: typeof fs;
    path: typeof path;
    process: typeof process;
    exec: typeof exec;

    constructor() {
        this.fs = fs;
        this.path = path;
        this.process = process;
        this.exec = exec;
    };

    async test(): Promise<any> {
        return 1;
    };

    async updateSystem(check: boolean): Promise<any> {

        //(path.join(__dirname, "node_modules"));
        
        console.clear();

        if (check) {
            return this.exec(`yarn`, async (err, stdout, stderr) => {

                if (err) {
                    console.log(`[Teox] <IP> Aconteceu um erro execultando o atualizador Automatico.`);
                    this.setTitle("ERROR UPDATE");
                    process.exit(1);
                };
            
                console.log(`[Teox] <IP> Bibliotecas atualizadas com Sucesso.`);
                console.clear();
                this.setTitle("UPDATED");
                return true;
            });
        };  return true;
    };

    async setTitle(str: string) {
        return this.process.title = `[TX-1.5.0] ${str}`;
    };
};

export default Utils;
