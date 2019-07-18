import { Configurable } from './configurable';
import { StringConfigurable, StringConfigurableInterface } from './stringConfigurable';
import { objectToArray } from '../utils/utils';
import { BoolConfigurable } from './boolConfigurable';

export interface JsonConfigurableInterface extends Configurable {
    data?: Configurable[]
}

export class JsonConfigurable implements JsonConfigurableInterface {
    readonly type = "JSON";
    readonly key: string;
    public name?: string;
    public data?: Configurable[];

    constructor(key: string){
        this.key = key;
    }

    public static build(obj: any): JsonConfigurableInterface{
        let tmp = new JsonConfigurable(obj["key"]);
        tmp.name = obj["name"];
        if(obj["data"] != null){
            let data = objectToArray(obj["data"]);
            if(data != null){
                tmp.data = data.map(c => {
                    if(c["type"] == "JSON"){
                        return JsonConfigurable.build(c);
                    }if (c["type"] == "BOOL"){
                        return BoolConfigurable.build(c);
                    }else{
                        return StringConfigurable.build(c);
                    }
                });
            }else{
                tmp.data = [];
            }
        }else
            tmp.data = [];
        return tmp;
    }

    public generateHtml(){
        var configurablesHtml = ""
        try {
            if(this.data){
                configurablesHtml += this.data.map(c => c.generateHtml()).join("");
            }
            return `<div id="jsonConfigurable_${this.key}" class="border-1"><p><small>${this.name || this.key}</small></p>${configurablesHtml}</div>`;
        }catch(error){
            console.error(`Error generating HTML for JsonConfigurable: "${this.key}"`);
            throw error;
        }
    }

    public generateJavascriptToReturnValue(){
        var configurableJsonData = "";
        if(this.data)
            configurableJsonData += this.data.map((c: Configurable) => `"${c.key}":${c.generateJavascriptToReturnValue()}`).join(",");
        return `{${configurableJsonData}}`;
    }
}