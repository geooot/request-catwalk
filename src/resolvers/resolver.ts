import { Configurable } from '../configurables/configurable';
import { JsonConfigurable, JsonConfigurableInterface } from '../configurables/jsonConfigurable';
import { StringConfigurable, StringConfigurableInterface } from '../configurables/stringConfigurable';
import { objectToArray } from '../utils/utils';
import { BoolConfigurable } from '../configurables/boolConfigurable';

export interface ResolverInterface {
    requestType: string,
    url: string
    queryParams?: Configurable[],
    body?: Configurable[],
    bodyContentType?: "URL_ENCODED_FORM" | "MULTIPART_FORM" | "JSON" | null,
    generateHtml(): string,
    generateFullJavascript(): string
}

export class Resolver implements ResolverInterface {
    readonly requestType: string;
    readonly url: string;
    public queryParams?: Configurable[];
    public body?: Configurable[];
    public bodyContentType?: "URL_ENCODED_FORM" | "MULTIPART_FORM" | "JSON" | null;

    constructor(requestType: string, url: string){
        this.requestType = requestType;
        this.url = url;
    }

    public static build(obj: any): Resolver{
        let tmp = new Resolver(obj["requestType"], obj["url"]);
        if(obj["queryParams"]){
            let queryParams = objectToArray(obj["queryParams"])
            if(queryParams){
                tmp.queryParams = queryParams.map((qp:any) => {
                    if(qp["type"] == "JSON"){
                        return JsonConfigurable.build(qp);
                    }else if(qp["type"] == "BOOL"){
                        return BoolConfigurable.build(qp);
                    }else{
                        return StringConfigurable.build(qp);
                    }
                })
            }else{
                tmp.queryParams = [];
            }
        }else{
            tmp.queryParams = [];
        }

        if(obj["body"]){
            let body = objectToArray(obj["body"])
            if(body){
                tmp.body = body.map((b:any) => {
                    if(b["type"] == "JSON"){
                        return JsonConfigurable.build(b);
                    }else if(b["type"] == "BOOL"){
                        return BoolConfigurable.build(b);
                    }else{
                        return StringConfigurable.build(b);
                    }
                })
            }else{
                tmp.body = [];
            }
        }else{
            tmp.body = [];
        }

        tmp.bodyContentType = obj["bodyContentType"];
        return tmp;
    }

    generateHtml(){
        var configurablesHtml = ""
        if(this.queryParams)
            configurablesHtml += this.queryParams.map(c => c.generateHtml()).join("");
        if(this.body)
            configurablesHtml += this.body.map(c => c.generateHtml()).join("");

        return `<form id="queryForm">${configurablesHtml}</br><input type="submit"/></form>`;
    }

    generateFullJavascript(){
        var queryParamsJavascriptSnippet = `""`
        if(this.queryParams)
            queryParamsJavascriptSnippet = this.queryParams.map(item => {
                if(item.type == "JSON"){
                    return `"${item.key}="+encodeURIComponent(JSON.stringify(${item.generateJavascriptToReturnValue()}))`
                }

                return `"${item.key}="+encodeURIComponent(${item.generateJavascriptToReturnValue()})`

            }).join(" +\"&\"+ ");


        // TODO: Implement Body Parsing
        return `
        document.querySelector("form").onsubmit = function(e) {
            e.preventDefault();
            var iframe = document.querySelector("iframe")
            var queryString = ${queryParamsJavascriptSnippet};
            console.log(queryString)
            iframe.src = "${this.url}?" + queryString
        }
        `
    }
}