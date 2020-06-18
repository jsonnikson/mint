import React from 'react';
import { InputBase, Box } from "@material-ui/core";
import { Search as SearchIcon } from '@material-ui/icons';
import { useIntl } from 'react-intl';
import useStyles from '../styles/styles'

export const WikipaliSearchBox = () => {
    const intl = useIntl()
    const classes = useStyles()
    return (
        <Box className={classes.searchBox}>
            <Box className={classes.searchBoxIcon}>
                <SearchIcon />
            </Box>
            <InputBase
                className={classes.searchBoxInput}
                placeholder={intl.formatMessage({id: 'topbar.search'})}
            />
        </Box>
    )
}