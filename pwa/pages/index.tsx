import React from 'react'
import { FormattedMessage } from 'react-intl';
import { WikipaliFrameController } from '../components/application-frame/wikipali-frame.controller';
import { injectable, container } from 'tsyringe';

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

export default container.resolve(HomeController).render

export async function getServerSideProps(context) {
    return {
        props: {}
    }
}