export interface Configurable {
    type: string,
    key: string,
    name?: string

    /**
     * Returns the form HTML of the Configurable
     * @return formElementHtml: string
     */
    generateHtml(): string,

    /**
     * Returns javascript that returns the value of the Configurable
     * Ex: `document.querySelector('#${this.key}').value`
     * @return javascriptString: string
     */
    generateJavascriptToReturnValue(): string
}