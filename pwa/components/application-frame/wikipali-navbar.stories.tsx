import React from 'react';
import {WikipaliNavbar} from './wikipali-navbar';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Application Frame/Navigation Bar',
  component: WikipaliNavbar,
};

export const Basic = () => (
  <WikipaliNavbar
    onAddDocument={action('add document clicked')}
    onGroups={action('groups clicked')}
    onMyDocuments={action('my documents clicked')}
    onTrash={action('trash clicked')}
  />
)