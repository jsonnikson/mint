import React, { useEffect, useState } from 'react';
import { DocumentEditorController } from './document-editor.controller';

const testDoc = require('../../data/sassatavado.json')

export default {
  title: 'Document Editor/Document Editor',
};

export const Basic = () => {
  return new DocumentEditorController().render(testDoc);
};