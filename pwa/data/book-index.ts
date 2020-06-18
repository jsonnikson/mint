import { ISourceText } from "../lib/source-text";

interface IBookIndexRaw {
  name: string
  row: string
  id: string
  folder: string
  title: string
  c1: string
  c2: string
  c3: string
  c4: string
}

const data = require('./book-index.json') as IBookIndexRaw[]
export const bookIndex: ISourceText[] = data.map(({name,id,title,c1,c2,c3,c4}) => ({
    name,
    id,
    title,
    index: [...function*(){
        for (const x of [c1,c2,c3,c4]) {
            if (x) yield x;
            else return;
        }
    }()]
}))