import React from 'react';
import {WikipaliTopbar} from './wikipali-topbar';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Application Frame/Topbar',
  component: WikipaliTopbar,
};

export const LoggedIn = () => <WikipaliTopbar locale="en" loggedInUser={{id: 'a', name: 'John Doe'}} />;
export const LoggedOut = () => <WikipaliTopbar locale="en" loggedInUser={null} />;