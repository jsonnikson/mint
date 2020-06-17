import React from 'react'
import { FormattedMessage } from 'react-intl';
import { WikipaliFrame } from '../components/wikipali-frame';
import { UIState } from '../lib/ui-state';

export default (props: {uiState: UIState}) => {
    const {uiState} = props
    return (
        <WikipaliFrame locale={uiState.locale}
        onChangeLocale={value => uiState.locale = value}
        loggedInUser={uiState.loggedInUser}>
            <FormattedMessage id="hello-world" />
        </WikipaliFrame>
    )
}

