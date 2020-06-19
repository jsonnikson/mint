import React from 'react'
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { AddCircle as AddCircleIcon, LibraryBooks as LibraryBooksIcon, Group as GroupIcon, Delete as DeleteIcon } from '@material-ui/icons'
import { useIntl } from 'react-intl'

export type WikipaliNavbarProps = {
  onAddDocument?: () => void
  onMyDocuments?: () => void
  onGroups?: () => void
  onTrash?: () => void
}

type Link = {
  id: string
  icon: React.ElementType
  onClick: keyof WikipaliNavbarProps
}
const links: Link[] = [
  {
    id: 'navbar.add-document',
    icon: AddCircleIcon,
    onClick: 'onAddDocument'
  },
  {
    id: 'navbar.my-documents',
    icon: LibraryBooksIcon,
    onClick: 'onMyDocuments'
  },
  {
    id: 'navbar.groups',
    icon: GroupIcon,
    onClick: 'onGroups'
  },
  {
    id: 'navbar.trash',
    icon: DeleteIcon,
    onClick: 'onTrash'
  }
]

export function WikipaliNavbar(props: WikipaliNavbarProps) {
  const intl = useIntl();
  return (
    <List>
      {links.map(link => (
        <ListItem button onClick={props[link.onClick]}>
          <ListItemIcon><link.icon /></ListItemIcon>
          <ListItemText primary={intl.formatMessage({ id: link.id })} />
        </ListItem>

      ))}
    </List>
  );
}
