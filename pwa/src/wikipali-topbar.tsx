import React from 'react';
import { styled } from '@material-ui/core/styles';
import { AppBar, AppBarProps, Button, Popper, Fade, Paper, Toolbar, IconButton, ClickAwayListener, MenuList, MenuItem, makeStyles, Box, useTheme } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import LanguageIcon from '@material-ui/icons/Language';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  usePopupState,
  bindTrigger,
  bindPopper,
} from 'material-ui-popup-state/hooks'
import { WikipaliSearchBox } from './wikipali-searchbox';
import { WikipaliBranding } from './wikipali-branding';
import { FormattedMessage, useIntl } from 'react-intl';
import { supportedLocales } from './supported-locales';
import { LoggedInUser } from './logged-in-user';

const SignOutButton = () => {
  return (
    <Button color="inherit">
      <FormattedMessage id="topbar.sign-out" />  
    </Button>
  );
};

interface ILocaleMenuProps {
  locale: string
  onChangeLocale?: (value: string) => void
}

const LocaleMenu = (props: ILocaleMenuProps) => {
  const intl = useIntl()
  const { locale, onChangeLocale } = props
  const popupState = usePopupState({ variant: 'popover', popupId: 'localeMenu' })
  function selectLocale(locale: string) {
    if (onChangeLocale) onChangeLocale(locale)
    popupState.close()
  }
  return (
    <div>
      <Button color="inherit" {...bindTrigger(popupState)}>
        <LanguageIcon />
        {intl.formatDisplayName(locale)}
        <ExpandMoreIcon fontSize="small" />
      </Button>

      <Popper {...bindPopper(popupState)} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener onClickAway={popupState.close}>
                <MenuList>
                  {supportedLocales.map(locale => (
                    <MenuItem onClick={() => selectLocale(locale.locale)}>{locale.text}</MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  )
}

interface IAccountMenuProps {
  loggedInUser: LoggedInUser
}

const AccountMenu = (props: IAccountMenuProps) => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })
  return (
    <div>
      <IconButton color="inherit" {...bindTrigger(popupState)}>
        <AccountCircleIcon />
      </IconButton>
      <Popper {...bindPopper(popupState)} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener onClickAway={popupState.close}>
                <MenuList>
                  <MenuItem onClick={popupState.close}>Log out</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  )
}

export type WikipaliTopbarProps = {
  loggedInUser: LoggedInUser|null
  locale: string
  onChangeLocale?: (value: string) => void
}

export function WikipaliTopbar(props: WikipaliTopbarProps&AppBarProps) {
  const theme = useTheme()
  const {loggedInUser, locale, onChangeLocale, ...appBarProps} = props
  return (
    <Box zIndex={theme.zIndex.drawer+1} clone>
      <AppBar position="fixed" {...appBarProps}>
        <Toolbar>
          <Box display="flex" flex={1} justifyContent="flex-start" alignItems="center">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <WikipaliBranding />
          </Box>
          <Box alignItems="center">
            <WikipaliSearchBox />
          </Box>
          <Box display="flex" flex={1} justifyContent="flex-end" alignItems="center">
            <LocaleMenu {...{locale, onChangeLocale}}/>
            {props.loggedInUser ? <AccountMenu loggedInUser={loggedInUser as LoggedInUser} /> : <SignOutButton />}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
