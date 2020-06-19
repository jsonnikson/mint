import React from 'react'
import { FormattedMessage } from 'react-intl';
import { WikipaliFrameController } from '../components/application-frame/wikipali-frame.controller';
import { injectable } from 'tsyringe';

@injectable()
export class HomeController {
    constructor(
        private frameController: WikipaliFrameController
    ) {}
    render() {
        return this.frameController.render(
            <FormattedMessage id="hello-world" />
        )
    }
}
