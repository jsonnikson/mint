import { observable } from 'mobx'
import { LoggedInUser } from 'logged-in-user'

export class UIState {
    @observable locale = "en"
    @observable loggedInUser: LoggedInUser|null = null
}