import { UserDocumentId } from "./user-document";

export interface UserFolder {
    path: string
    name: string
    documents: UserDocumentId[]
}

export type UserFolderStat = Pick<UserFolder,'path'|'name'>