import { Command, flags } from '@oclif/command'
import { StringConfigurableInterface, StringConfigurable } from '../configurables/stringConfigurable';
import * as fs from 'fs';
import { ResolverInterface, Resolver } from '../resolvers/resolver';
import view from '../views/view';

export default class Build extends Command {
    static description = 'build a request page for a request definition json file'

    static examples = [
        `$ catwalk build definition.json`,
    ]

    static flags = {
        help: flags.help({ char: 'h' }),
        output: flags.string({char: 'o', description: "Output file to write generated HTML (if not specified, output will be stdout)"}) 
    }

    static args = [{ name: 'file' }]
    
    static generateHtml(manifest: any): string{
        let resolver = Resolver.build(manifest);

        var fullPage = view;
        fullPage = fullPage.replace("{form}", resolver.generateHtml());
        fullPage = fullPage.replace("{javascript}", resolver.generateFullJavascript());
        fullPage = fullPage.replace("{url}", resolver.url);

        return fullPage;
    }


    async run() {
        const { args, flags } = this.parse(Build)

        if(!args.file){
            console.error("ERROR: Please file name to read");
            return;
        }

        let manifest = JSON.parse(fs.readFileSync(args.file).toString());

        let outputHtml = Build.generateHtml(manifest);

        if(flags.output){
            console.log("Writing output to", flags.output)
            fs.writeFileSync(flags.output, outputHtml);
        }else{
            console.log(outputHtml);
        }
    }
}