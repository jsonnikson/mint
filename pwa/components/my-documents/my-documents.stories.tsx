import React from 'react';
import { MyDocumentsView, IMyDocumentsProps } from './my-documents';
import { action } from '@storybook/addon-actions';

export default {
  title: 'My Documents',
  component: MyDocumentsView,
};

const props: IMyDocumentsProps = {
  path: '/foo/bar',
  subfolders: [
    {
      path: '/foo/bar/some%20folder',
      name: 'some folder'
    }
  ],
  documents: [
    {
      id: 'some document',
      name: 'some document'
    }
  ]
}

const actions = {
  onClickFolder: action('clicked folder'),
  onClickDocument: action('clicked document')
}

export const Basic = () => (
    <MyDocumentsView {...props} {...actions} />
)

export const Empty = () => (
  <MyDocumentsView path="/foo/bar" subfolders={[]} documents={[]} {...actions} />
)