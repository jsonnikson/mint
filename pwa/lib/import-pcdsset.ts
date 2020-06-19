import { WikipaliDocument, Block, Analysis } from './wikipali-document';

export default function importPcdsset(xml: XMLDocument): WikipaliDocument {
    const title = xml.querySelector('set>head>doc_title')?.textContent || 'untitled';
    const blocks = new Array<Block>();
    const blocksByParagraph = new Map<string,Block>();
    function getOrCreateBlock(paragraph: string): Block {
        const existing = blocksByParagraph.get(paragraph);
        if (existing) return existing;
        const created = { id: paragraph, headings: [], tokens: []};
        blocks.push(created);
        blocksByParagraph.set(paragraph, created);
        return created;
    }
    function isPunctuation(text: string) {
        return !text.match(/\p{Letter}/u);
    }
    function readAnalysisComponent(node: Element | null): string {
        if (!node || !node.textContent || node.textContent === '?') return '';
        else return node.textContent;
    }
    for (const xmlBlock of Array.from(xml.querySelectorAll('set>body>block'))) {
        const book = xmlBlock.querySelector('info>book')?.textContent;
        const paragraph = xmlBlock.querySelector('info>paragraph')?.textContent;
        if (!book || !paragraph) throw 'Expected <book> and <paragraph>';
        const block = getOrCreateBlock(paragraph);
        const type = xmlBlock.querySelector('info>type')?.textContent;
        if (type === 'wbw') {
            for (const xmlWord of Array.from(xmlBlock.querySelectorAll('data>word'))) {
                if (xmlWord.querySelector('type')?.textContent === '.ctl.') continue;
                const text = xmlWord.querySelector('pali')?.textContent;
                const id = xmlWord.querySelector('id')?.textContent
                if (!id) throw 'Expected <id>';
                if (!text) throw 'Expected <pali>';
                if (isPunctuation(text)) block.tokens.push({
                    punc: { id, text }
                });
                else {
                    const gloss = readAnalysisComponent(xmlWord.querySelector('mean'));
                    const morphemes = readAnalysisComponent(xmlWord.querySelector('org'));
                    const morphemeGlosses = readAnalysisComponent(xmlWord.querySelector('om'));
                    const grammar = readAnalysisComponent(xmlWord.querySelector('gramma'));
                    
                    const analysis: Analysis = {
                        gloss, morphemes: morphemes, morphemeGlosses: morphemeGlosses, grammar
                    };

                    block.tokens.push({ 
                        word: {id, text, analysis}
                    });
                }
            }    
        } 
    }
    return {
        title, blocks
    }
}
