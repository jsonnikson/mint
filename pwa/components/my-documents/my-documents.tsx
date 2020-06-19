import React from 'react'
import { Box, Link, List, ListItem, ListSubheader, ListItemIcon, ListItemText } from '@material-ui/core'
import { Folder as FolderIcon, Description as DocumentIcon, ChevronRight as ChevronRightIcon } from '@material-ui/icons'
import { FormattedMessage, useIntl } from 'react-intl'
import { UserDocumentStat, UserDocumentId } from '../../lib/user-document'
import { UserFolderStat } from '../../lib/user-folders'

export interface IMyDocumentsProps {
    path: string
    subfolders: UserFolderStat[]
    documents: UserDocumentStat[]
    onClickFolder?: (path: string) => void
    onClickDocument?: (id: UserDocumentId) => void
}

export const MyDocumentsView = (props: IMyDocumentsProps) => {
    const {
        path,
        subfolders,
        documents,
        onClickDocument = () => { },
        onClickFolder = () => { },
    } = props

    const intl = useIntl()

    const pathItemsArray = path.split('/')
    const pathItems = pathItemsArray.map((pathItem,i) => ({
        text: i===0
            ? intl.formatMessage({id:'app.my-documents'})
            : decodeURIComponent(pathItem),
        onClick: () => onClickFolder(pathItemsArray.slice(0,i+1).join('/'))
    }))

    const subheader = (
        <ListSubheader>
            <Box display="flex" alignItems="center">
                {pathItems.map((pathItem, i) => <>
                    {i>0 && <ChevronRightIcon />}
                    <Link
                        component="button"
                        color="inherit"
                        onClick={pathItem.onClick}>
                        {pathItem.text}
                    </Link>
                </>)}
            </Box>
        </ListSubheader>
    )

    const renderFolder = (folder: UserFolderStat) => {
        return (
            <ListItem button key={folder.path} onClick={() => onClickFolder(folder.path)}>
                <ListItemIcon><FolderIcon /></ListItemIcon>
                <ListItemText primary={folder.name} />
            </ListItem>
        )
    }

    const renderDoc = (doc: UserDocumentStat) => {
        return (
            <ListItem button key={doc.id} onClick={() => onClickDocument(doc.id)}>
                <ListItemIcon><DocumentIcon /></ListItemIcon>
                <ListItemText primary={doc.name} />
            </ListItem>
        )
    }

    return (
        <Box>
            <List subheader={subheader}>
                {subfolders.map(renderFolder)}
                {documents.map(renderDoc)}
            </List>
        </Box>
    )
}