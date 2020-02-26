import React from 'react';
import FolderNotes from '../FolderNotes/FolderNotes'
import { findNote } from '../notes-helper'
import ApiContext from '../ApiContext'

export default class PageMain extends React.Component{

    static defaultProps ={
        match: {
            params: {}
        }
    }
   
    static contextType = ApiContext


    render(){
    
    const { notes = [] } = this.context
    const note = findNote(notes, this.props.match.params.noteId)
     || { content: '' }
    const noteId =this.props.match.params.noteId
       
        return (
            < section className='PageMain' >
              <FolderNotes
                params = {noteId}
                id={notes.map(id=> id.id)}
                name={notes.map(name=> name.name)}
                content={notes.map(content=> content.content)}
                modified={notes.map(m=> m.modified)}
                onDeleteNote={this.props.onDeleteNote}
                history={this.props.history}
              />
              <div>
                {note.content.split(/\n \r|\n/).map((para, i) =>
                  <p key={i}>{para}</p>
                )}
              </div>
            </section >
          )
        }
    }