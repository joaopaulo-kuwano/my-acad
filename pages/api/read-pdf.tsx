import { NextApiRequest, NextApiResponse } from "next";
import pdf from 'pdf-parse'
import fs from 'fs'
import path from "path";
import axios from "axios";

import { getDocument } from 'pdfjs-dist'
import { TextItem, TextMarkedContent } from "pdfjs-dist/types/src/display/api";

function calculateByteLength(text: string) {
  let byteLength = 0;
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    if (charCode <= 0x007f) {
      byteLength += 1;
    } else if (charCode <= 0x07ff) {
      byteLength += 2;
    } else if (charCode <= 0xffff) {
      byteLength += 3;
    } else {
      byteLength += 4;
    }
  }
  return byteLength;
}

async function route (req: NextApiRequest, res: NextApiResponse) {

  const documentLoadingTask = getDocument('https://www.africau.edu/images/default/sample.pdf')
  const documentProxy = await documentLoadingTask.promise
  
  const list = new Array(documentProxy.numPages).fill('').map(async (_, i) => {
    const pageProxy = await documentProxy.getPage(i + 1) 
    const textContent = await pageProxy.getTextContent()
    const strTextContent = textContent.items.map(e => {
      const textItem = e as TextItem
      if (!textItem.str) return ''
      return textItem.str
    }).join(' ')

    return strTextContent
  })

  const api = await Promise.all(list)

  return res.status(202).json({})
}

export default route