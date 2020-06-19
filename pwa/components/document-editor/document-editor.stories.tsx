import React from 'react';
import { DocumentEditorController } from './document-editor.controller';
import { container } from 'tsyringe'
const testDoc = require('../../data/sassatavado.json')

export default {
  title: 'Document Editor/Document Editor',
};

export const Basic = () => {
  return container.resolve(DocumentEditorController).render(testDoc);
};