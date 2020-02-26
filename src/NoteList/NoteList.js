import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { countNotesForFolder } from '../notes-helper'
import ApiContext from '../ApiContext'
import './NoteList.css'

export default class NoteList extends React.Component{
    static contextType = ApiContext;
    render () {  
        const { folders, notes} = this.context  
        console.log('props', this.props)
        return (
            <div className="leftNav">
                <ul>
                    {folders.map(folder =>
                        <li key={folder.id}>
                      <NavLink
                            to={`/folder/${folder.id}`}>
                                {folder.name}
                                <span> ({countNotesForFolder(notes, folder.id.toString())})
                                {console.log('foldid', countNotesForFolder(notes, folder.id.toString()))}
                                {console.log('foldid', folder.id)}
                                </span>
                        </NavLink>
                       </li> 
                        )}
                </ul>
                <button type="button">
                    <Link to="/add-folder">
                        Add Folder
                    </Link>

                </button>
            </div>
        )
    }
}

NoteList.defaultProps={
    folders: []
}
