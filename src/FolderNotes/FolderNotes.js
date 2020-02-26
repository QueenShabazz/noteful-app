import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import ApiContext from "../ApiContext";
import "./Folder.css";

export default class FolderNotes extends React.Component {
  static defaultProps = {
    
  };
  static contextType = ApiContext;
  
  render() {
    const { name, id, modified } = this.props
    let i_d = this.props.id
    let id2 = parseInt(this.props.params)
    let id3 = i_d.indexOf(id2)
    let content = this.props.content
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/notes/${id[id3]}`}>
            {name[id3]}
          </Link>
        </h2>
        <p> {content[id3]}</p>
        <button
          className='Note__delete'
          type='button'
          onClick={()=>{this.props.onDeleteNote(this.props.id[id3]); this.props.history.push("/")}}
        >
          Remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(new Date(), "MM/dd/yyyy HH:mm:ss", modified)}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
