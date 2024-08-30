
export class Logger {

    verify: (n: number) => string;

    constructor() {
        this.verify = (n: number) => n.toFixed().length === 2 ? n.toFixed().toString() : "0" + n.toFixed().toString();
    };

    private format(text: string) {
        let date = new Date();
        return `[${this.verify(date.getHours())}:${this.verify(date.getMinutes())}:${this.verify(date.getSeconds())}] <TX> ${text.toUpperCase()}`;
    };

    public log(text: string): void {
        return console.log(this.format(text));
    };

    public info(text: string): void {
        return console.info(this.format(text));
    };

    public warn(text: string): void {
        return console.warn(this.format(text));
    };

    public error(text: string): void {
        return console.error(this.format(text));
    };
};

/*
old => log(type: string, message: string): void {
    
    if (this.chalk === null) {
        if (this.warnings.chalk) { 
            console.log(this.chalk.redBright(`[Teox] <Logger> CHALK FAILED: ${this.chalk}`));
            this.warnings.chalk = true;
        };
        return console.log(`[Teox] <${type}> ${message}`);
    };
    
    let logType = [ 
        { type: "VPS",   v: this.chalk.greenBright },
        { type: "MOBILE",   v: this.chalk.greenBright }, 
        { type: "HOST",   v: this.chalk.greenBright }, 
        { type: "INTERNET", v: this.chalk.redBright },
        { type: "Sucess",   v: this.chalk.greenBright }, 
        { type: "Failed",   v: this.chalk.redBright }, 
        { type: "Debug",    v: this.chalk.magentaBright }, 
        { type: "Message",  v: this.chalk.blueBright },
        { type: "Timeout",  v: this.chalk.redBright },
    ];  return logType.find((v) => v.type === type)?.v ? console.log(color(`[Teox] <${type}> ${message}`)) : console.log(this.chalk.yellowBright(`[Teox] <Warning> ${message}`));
};
*/

export default Logger;
