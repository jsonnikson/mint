import React, { ReactNode, useState, useCallback } from 'react';
import clsx from 'clsx'
import { WikipaliTopbar } from './wikipali-topbar';
import { WikipaliNavbar } from './wikipali-navbar';
import {Drawer, Toolbar, Box} from '@material-ui/core';
import { LoggedInUser } from '../../lib/logged-in-user';
import useStyles from './wikipali-frame.styles'

export type WikipaliFrameViewProps = {
  locale: string
  onChangeLocale: (value: string) => void
  loggedInUser: LoggedInUser|null
  children: ReactNode
}

export function WikipaliFrameView(props: WikipaliFrameViewProps) {
  const classes = useStyles()
  const { locale, onChangeLocale, loggedInUser } = props
  const [navbarOpen, setIsNavbarOpen] = useState(false)
  const onClickDrawerButton = useCallback(() => setIsNavbarOpen(x=>!x), [])
  return (
    <Box display="flex">
      <WikipaliTopbar {...{locale, onChangeLocale, onClickDrawerButton, loggedInUser}} />
      <Drawer variant="permanent" className={clsx(classes.navbar, { [classes.navbarOpen]: navbarOpen })}>
        <Toolbar /> {/* padding */}
        <Box>
          <WikipaliNavbar  />
        </Box>
      </Drawer>
      <Box flexGrow={1} p={3}>
        <Toolbar /> {/* padding */}
        {props.children}
      </Box>
    </Box>
  )
}
