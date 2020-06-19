import fs from 'fs'
import jsdom from 'jsdom'
import importPcdsset from '../lib/import-pcdsset';

async function main(inFilename: string){
    const xmlText = await fs.promises.readFile(inFilename);
    const dom = new jsdom.JSDOM(xmlText, {
        contentType: 'application/xml'
    });
    const doc = importPcdsset(dom.window.document);
    process.stdout.write(JSON.stringify(doc))
}

const args = process.argv.slice(2)

if (!args[0]) {
    console.error('Filename expected')
    process.exit(-1)
}

main(args[0]).then(
    () => {
        process.exit(0)
    },
    err => {
        console.error(err)
        process.exit(-1)
    })