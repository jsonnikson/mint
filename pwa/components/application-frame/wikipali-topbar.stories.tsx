import React from 'react';
import {WikipaliTopbar} from './wikipali-topbar';
import { action } from '@storybook/addon-actions';
import { container } from 'tsyringe';
import { SupportedLocales } from '../../lib/supported-locales';

export default {
  title: 'Application Frame/Topbar',
  component: WikipaliTopbar,
};

const supportedLocales = container.resolve(SupportedLocales).locales

export const LoggedIn = () => <WikipaliTopbar locale="en" supportedLocales={supportedLocales} loggedInUser={{id: 'a', name: 'John Doe'}} />;
export const LoggedOut = () => <WikipaliTopbar locale="en" supportedLocales={supportedLocales}  loggedInUser={null} />;