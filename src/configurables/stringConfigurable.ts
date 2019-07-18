import { Configurable } from './configurable';
import { stringArrayToSelectOption } from '../utils/utils';

export interface SelectOption {
    value: string,
    name?: string
}

export interface StringConfigurableInterface extends Configurable {
    options?: SelectOption[]
}

export class StringConfigurable implements StringConfigurableInterface {
    readonly type = "STRING";
    readonly key: string;
    public name?: string;
    public options?: SelectOption[];

    constructor(key: string){
        this.key = key;
    }

    public static build(obj: any): StringConfigurable{
        if(obj["options"] != null){
            obj["options"] = stringArrayToSelectOption(obj["options"]);
        }

        let tmp = new StringConfigurable(obj["key"]);
        tmp.name = obj["name"];
        tmp.options = obj["options"];
        return tmp;
    }

    public generateHtml(){
        try {
            if(this.options && this.options.length > 0){
                let optionsHtmlString = this.options.map(item => `<option value="${item.value}">${item.name || item.value}</option>`).join('');
                return `<p>${this.name || this.key}:</p><select name="${this.key}" id="${this.key}">${optionsHtmlString}</select>`
            }
            return `<p>${this.name || this.key}:</p><input type="text" name="${this.key}" id="${this.key}"/>`
        } catch(error) {
            console.error(`Error generating HTML for StringConfigurable: "${this.key}"`)
            throw error;
        }
    }

    public generateJavascriptToReturnValue(){
        try {
            return `document.querySelector("#${this.key}").value`;
        } catch(error) {
            console.error(`Error JavaScript for StringConfigurable: "${this.key}"`);
            throw error;
        }
    }
}