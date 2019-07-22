import { Configurable } from './configurable';
import { stringArrayToSelectOption } from '../utils/utils';

export class JsonArrayConfigurable implements Configurable {
    readonly type = "STRING";
    readonly key: string;
    public name?: string;

    constructor(key: string){
        this.key = key;
    }

    public static build(obj: any): JsonArrayConfigurable{
        let tmp = new JsonArrayConfigurable(obj["key"]);
        tmp.name = obj["name"];
        return tmp;
    }

    public generateHtml(){
        try {
            return `<p>${this.name || this.key}:</br><small>(enter comma sepperated values)</small></p><input type="text" name="${this.key}" id="${this.key}"/>`
        } catch(error) {
            console.error(`Error generating HTML for StringConfigurable: "${this.key}"`)
            throw error;
        }
    }

    public generateJavascriptToReturnValue(){
        try {
            return `document.querySelector("#${this.key}").value.split(",")`;
        } catch(error) {
            console.error(`Error JavaScript for StringConfigurable: "${this.key}"`);
            throw error;
        }
    }
}