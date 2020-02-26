import React from 'react'
import {Link} from 'react-router-dom'
import ApiContext from '../ApiContext'
import {getNotesForFolder} from '../notes-helper'

 export default class Note extends React.Component{
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = ApiContext
    render() {

        const foldid = this.props.match.params.folderid
        const {notes=[]} = this.context
        const notesForFolders = getNotesForFolder(notes, foldid)


        return (
            <section>
            
                <div className="note-main">
                        <ul className="note">
                            {notesForFolders.map(note =>
                                <li key={note.name}>
                                    <Link to={"/notes/" 
                                    + note.id} style={{fontSize: 24}}> {note.name}</Link>
                                    <p>{note.content.split("")} <br></br><br></br> <Link to={"/notes/" 
                                    + note.id} style={{fontStyle: 'italic', fontSize: 10}}> Read more</Link></p>
                                </li>
                            )}
                            <li>
                                <button
                                    type='button'>
                                    <Link
                                        to='/add-note'
                                    >
                                    Add Note
                                    </Link>
        
                                </button>
                            </li>
                        </ul>
                </div>
            </section>
            
        )
    }
    
}
