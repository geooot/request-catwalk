import { SelectOption } from '../configurables/stringConfigurable';

export function objectToArray(obj: any, storingKeyAs: string = "key") {
    if (obj == null || obj == undefined)
        return null;
    let arr = [];
    let keys = Object.keys(obj);
    for (let key of keys) {
        let tmp: any = {};
        if(typeof obj[key] === "string"){
            tmp["type"] = obj[key];
        }else{
            tmp = {...obj[key]}
        }
        tmp[storingKeyAs] = key;
        arr.push(tmp);
    }
    return arr;
}

export function stringArrayToSelectOption(arr: Array<any>){
    return arr.map((obj: any) => {
        if(Object.prototype.toString.call(obj) === "[object String]"){
            return {
                value: obj,
                name: obj
            } as SelectOption
        }
        return obj as SelectOption
    })
}