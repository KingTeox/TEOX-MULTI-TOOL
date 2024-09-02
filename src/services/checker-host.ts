
import { config, responseNodes } from "../types";

import { checkerHostMethods, nodes } from "../types";

export class checkerHost {

    config: config;
    debug: boolean;
    nodes: Array<nodes>;
    requests: Array<any>;

    constructor(config: config, debug: boolean) {
        this.config = config;
        this.debug = debug;
        this.nodes = [{ host: "king.teox", ip: "192.168.0.0", asn: "Teox INC", location: { country: "Brazil", city: "Any" } }];
        this.requests = [{ host: "Teox", type: "http", requestId: "00000", locations: 1, ok: 1 }]
    };

    async getNodes(): Promise<Array<nodes> | void> {
        if (this.debug) this.config.console.log(`DEBUG CHECKERHOST: GETNODES RESQUEST.`);
        return fetch(this.config.endpoints?.["STATUS-NODES"]).then(async r => r.json().catch(err => this.config.console.log(`- STATUS NODE ERROR -> ` + err))).then(async (v) => {

            let nodes = v.nodes;
            
            if (this.debug) this.config.console.log(`DEBUG GETNODES RESPONSE: ${typeof v.nodes}.`);

            this.nodes = this.nodes.slice(1);

            for (const [key, value] of Object.entries<responseNodes>(nodes)) {
                this.nodes.push({
                    host: key,
                    ip: value.ip,
                    asn: value.asn,
                    location: {
                        country: value.location[1],
                        city: value.location[2]
                    }
                });
            };  return this.nodes;
        }).catch(err => this.config.console.log(`${err}`))
    };

    async checkResults(requestID: string): Promise<any | void> {
        if (this.debug) this.config.console.log(`DEBUG CHECKER-RESULTS: GET RESQUEST -> ${requestID}.`);        
        return fetch(`https://check-host.net/check-result/${requestID}`, {
            headers: {
                "Accept": "application/json"
            }
        }).then(r => r.json().catch(err => this.config.console.log(`- CHECKRESULT JSON ERROR -> ` + err))).then(json => {
            return json;
        }).catch(err => this.config.console.log(`- CHECKRESULTS ERROR -> `+ err));
    };

    async check(host: string, type: string | checkerHostMethods, locations?: number): Promise<{ host: string, status: 0 | 1, id: string } | void> {

        this.config.console.log(`DEBUG: Check-${type}: ${host}`);

        //if (!this.methods.includes(type)) return this.config.console.log(`Method not allowed use: ${this.methods.map((v) => v).join(",")}`);

        if (!locations || typeof locations === typeof "" || locations === 0) {
            if (this.debug) this.config.console.log("DEBUG: Number locations is invalid, using all!"); 
            locations = this.nodes.length;
        };

        if (this.requests.length != 0 && this.requests[0].host === "Teox") {
            this.requests = this.requests.slice(1);
        };

        this.config.console.log(`DEBUG: Total Requests: ${this.requests.length}`);

        return fetch(`${this.config.endpoints["STATUS-CHECKER"]}${type}?host=${host}&max_nodes=${locations}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }).then(r => r.json().catch(err => this.config.console.log(`- CHECK JSON -> ` + err))).then((json) => {
            this.config.console.log(`DEBUG: ${host}[${json.request_id}]`);
            this.requests.push({
                host,
                locations,
                requestId: json.request_id,
                ok: json.ok
            }); return { host, status: json.ok, id: json.request_id };
        }).catch(err => this.config.console.log(`- CHECK ERROR -> ` + err))
    };

    async test() {
        
        let nodesAtuais = await this.getNodes();

        nodesAtuais ? this.config.console.log(`- NODES TOTAIS ${nodesAtuais.length} -`) : this.config.console.log(`- NODES UNDEFINED -`);
    
        let hostTest = await this.check("felipekersch.com.br", "ping");
    
        hostTest ? this.config.console.log(`- PING TEST[${hostTest.host}](${hostTest.id}) - ${hostTest.status}`) : this.config.console.log(`- HOST_TEST UNDEFINED -`);

        setTimeout(async () => {

            let hostResultCheck = await this.checkResults(hostTest ? hostTest.id : "111");

            hostResultCheck ? console.log(JSON.stringify(hostResultCheck)) : this.config.console.log(`- HOST_RESULT UNDEFINED -`);    
        }, 1000);
        return this.config.console.log(`FERRAMENTA DE HOST EM TESTES.`);
    };
};

export default checkerHost;
