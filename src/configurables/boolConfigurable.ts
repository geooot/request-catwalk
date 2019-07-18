import { Configurable } from './configurable';
import { stringArrayToSelectOption } from '../utils/utils';


export class BoolConfigurable implements Configurable {
    readonly type = "BOOL";
    readonly key: string;
    public name?: string;

    constructor(key: string){
        this.key = key;
    }

    public static build(obj: any): BoolConfigurable{
        let tmp = new BoolConfigurable(obj["key"]);
        tmp.name = obj["name"];
        return tmp;
    }

    public generateHtml(){
        try {
            return `<p>${this.name || this.key}:</p><input type="checkbox" name="${this.key}" id="${this.key}"/>`
        } catch(error) {
            console.error(`Error generating HTML for BoolConfigurable: "${this.key}"`)
            throw error;
        }
    }

    public generateJavascriptToReturnValue(){
        try {
            return `document.querySelector("#${this.key}").checked`;
        } catch(error) {
            console.error(`Error JavaScript for BoolConfigurable: "${this.key}"`);
            throw error;
        }
    }
}