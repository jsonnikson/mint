import { observable } from 'mobx'
import { LoggedInUser } from './logged-in-user'
import { singleton } from 'tsyringe'

@singleton()
export class UIState {
    @observable locale = "en"
    @observable loggedInUser: LoggedInUser|null = null
}