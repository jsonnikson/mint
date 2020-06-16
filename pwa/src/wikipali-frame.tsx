import React, { ReactNode } from 'react';
import { styled, Theme } from '@material-ui/core/styles';
import { WikipaliTopbar } from './wikipali-topbar';
import { WikipaliNavbar } from './wikipali-navbar';
import {Drawer, Toolbar, Box, makeStyles} from '@material-ui/core';
import { LoggedInUser } from './logged-in-user';

export type WikipaliFrameProps = {
  locale: string
  onChangeLocale: (value: string) => void
  loggedInUser: LoggedInUser|null
  children: ReactNode
}

export function WikipaliFrame(props: WikipaliFrameProps) {
  const { locale, onChangeLocale, loggedInUser } = props
  return (
    <Box display="flex">
      <WikipaliTopbar {...{locale, onChangeLocale, loggedInUser}} />
      <Drawer variant="permanent">
        <Toolbar /> {/* padding */}
        <WikipaliNavbar />
      </Drawer>
      <Box flexGrow={1} p={3}>
        <Toolbar /> {/* padding */}
        {props.children}
      </Box>
    </Box>
  )
}
