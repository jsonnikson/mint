import React from 'react';
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
import { WikipaliBranding } from '../theme/wikipali-branding';
import { FormattedMessage, useIntl } from 'react-intl';
import { ISupportedLocale, SupportedLocales } from '../../lib/supported-locales';
import { LoggedInUser } from '../../lib/logged-in-user';
import useStyles from './wikipali-frame.styles'

const SignOutButton = () => {
  return (
    <Button color="inherit">
      <FormattedMessage id="topbar.sign-out" />  
    </Button>
  );
};

interface ILocaleMenuProps {
  locale: string
  supportedLocales: ISupportedLocale[]
  onChangeLocale?: (value: string) => void
}

const LocaleMenu = (props: ILocaleMenuProps) => {
  const { locale, supportedLocales, onChangeLocale } = props
  const currentLocaleName = supportedLocales.find(x=>x.locale===locale)?.text
  const popupState = usePopupState({ variant: 'popover', popupId: 'localeMenu' })
  function selectLocale(locale: string) {
    if (onChangeLocale) onChangeLocale(locale)
    popupState.close()
  }
  return (
    <div>
      <Button color="inherit" {...bindTrigger(popupState)}>
        <LanguageIcon />
        {currentLocaleName}
        <ExpandMoreIcon fontSize="small" />
      </Button>

      <Popper {...bindPopper(popupState)} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener onClickAway={popupState.close}>
                <MenuList>
                  {supportedLocales.map(locale => (
                    <MenuItem key={locale.locale} onClick={() => selectLocale(locale.locale)}>{locale.text}</MenuItem>
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
  supportedLocales: ISupportedLocale[]
  onChangeLocale?: (value: string) => void
  onClickDrawerButton?: () => void
}

export function WikipaliTopbar(props: WikipaliTopbarProps&AppBarProps) {
  const classes = useStyles()
  const {
    loggedInUser,
    locale,
    supportedLocales,
    onChangeLocale,
    onClickDrawerButton,
    ...appBarProps} = props
  return (
    <AppBar position="fixed" className={classes.topbar} {...appBarProps}>
      <Toolbar>
        <Box display="flex" flex={1} justifyContent="flex-start" alignItems="center">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            className={classes.navbarButton}
            onClick={onClickDrawerButton}
          >
            <MenuIcon />
          </IconButton>
          <WikipaliBranding />
        </Box>
        <Box alignItems="center">
          <WikipaliSearchBox />
        </Box>
        <Box display="flex" flex={1} justifyContent="flex-end" alignItems="center">
          <LocaleMenu {...{locale, supportedLocales, onChangeLocale}}/>
          {props.loggedInUser ? <AccountMenu loggedInUser={loggedInUser as LoggedInUser} /> : <SignOutButton />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
