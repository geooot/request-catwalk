import { Command, flags } from '@oclif/command'
import { StringConfigurableInterface, StringConfigurable } from '../configurables/stringConfigurable';
import * as fs from 'fs';
import { ResolverInterface, Resolver } from '../resolvers/resolver';
import * as http from 'http';
import view from '../views/view';
import Build from './build';

export default class Server extends Command {
    static description = 'build a request page for a request definition json file then serve it on a page'

    static examples = [
        `$ catwalk server definition.json`,
    ]
    
    static flags = {
        help: flags.help({ char: 'h' }),
        port: flags.integer({char: 'p', description: "Output file to write generated HTML (if not specified, output will be stdout)"}) 
    }

    static args = [{ name: 'file' }]

    async run() {
        const { args, flags } = this.parse(Server)

        if(!args.file){
            console.error("ERROR: Please file name to read");
            return;
        }

        let manifest = JSON.parse(fs.readFileSync(args.file).toString());

        let outputHtml = Build.generateHtml(manifest);

        let PORT = flags.port || 8080;


        http.createServer((req, res) => {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(outputHtml);
            res.end();
        }).listen(PORT);

        console.log(`Serving catwalk on http://localhost:8080/${args.file.split("/")[args.file.split("/").length - 1]}`);
    }
}