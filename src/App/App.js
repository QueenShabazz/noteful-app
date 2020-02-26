import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Note from "../Note/Note";
import PageMain from "../PageMain/PageMain";
import NoteList from "../NoteList/NoteList";
import NoteNav from "../NoteNav/NoteNav";
import AddFolder from "../AddFolder/AddFolder";
import AddNote from "../AddNote/AddNote";
import "./App.css";
import ApiContext from "../ApiContext";
import config from "../config";
import AddFolderError from "../AddFolderError/AddFolderError";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: [],
      id:this.notes,
      name: "",
      content: "",
      folderid: "",
      nameError: "",
      folderError: ""
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onfolderChange = this.onfolderChange.bind(this);
    this.newFolder = this.newFolder.bind(this);
    this.validate = this.validate.bind(this);
  }
  //FOLDER + NOTE CREATION
  newFolder(e) {
    e.preventDefault();
    this.setState({
      folder: e.target.value
    });
  }
  onNameChange(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    });
  }
  onContentChange(e) {
    e.preventDefault();
    this.setState({
      content: e.target.value
    });
  }
  onfolderChange(e) {
    e.preventDefault();
    this.setState({
      folderid: e.target.value
    });
  }
//VALIDATE IF USER DATA PASSES REQUIREMENTS
validate = () => {
  let nameError 
  let folderError
  if(this.state.name===""){
    nameError = <p style={{color:'red'}}> Name required</p>
    this.setState({nameError});
    return false
  } 
  if(this.state.folderid==="..." || this.state.folderid===""){
    folderError = <p style={{color:'red'}}> Folder required</p>
    this.setState({folderError});
    return false;
  } 
  this.setState({ folderError: "" });
  return true;
};

  //FETCH NOTES + FOLDERS FOR MAIN DISPLAY
  componentDidMount() {
    let fetchData = () => {
      const endpts = [
        `${config.API_ENDPOINT}/api/notes`,
        `${config.API_ENDPOINT}/api/folders`
      ];
      //map each endpoint to the promise of the fetch
      let requests = endpts.map(endpt =>
        fetch(endpt).then(response => response.json())
      );
      //promise.all will wait until all jobs are executed
      return Promise.all(requests);
    };
    fetchData().then(res => {
      this.setState({
        notes: res[0],
        folders: res[1]
      });
    });
  }


  folderSubmit = e => {
    e.preventDefault();
    if (this.state.folder) {
      const folder = { name: this.state.folder };
      fetch(`${config.API_ENDPOINT}/api/folders`, {
        method: "POST",
        body: JSON.stringify(folder),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("Something is wrong, try again");
          }
          return res.json();
        })
        .then(data => {
          if (data.name !== "") {
            this.setState({ nameError: "", folderError:""});
          }
          let newFolder = this.state.folders;
          newFolder.push(data);
          this.setState({ folders: newFolder });
        })

        .catch(error => console.log(error));
    }
    this.setState({ folder: "" });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const isValid = this.validate();
    if (!isValid) {
      console.log("error")
      alert("check connection")
    } else if (this.state.folder !== "" || this.state.folder!== "...") {
      const { name, content, folderid } = this.state;
      const newNote = { name, content, folderid };
      if (this.state.content === "") {
        alert("Note must include content");
      } else {
        fetch(`${config.API_ENDPOINT}/api/notes`, {
          method: "POST",
          body: JSON.stringify(newNote),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            if (!res.ok) {
              console.log('RES', res)
              throw new Error(`Your note was not added, try again ${res.json()}`);
            }
            return res.json();
          })
          .then(data => {
            let tempNotes = this.state.notes;
            tempNotes.push(newNote);

            this.setState({
              id: data.id,
              name: data.name,
              content: data.content,
              folderid: data.folderid,
              notes: tempNotes
            });
          })
          .catch(error => console.log(error));
      }
    }
  };

  handleClickDelete = (id) => {
    fetch(`${config.API_ENDPOINT}/api/notes/${id}`,{
      method: 'DELETE',
      headers:{
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if(!res.ok)
        return res.json()
      })
      .then(()=> {
           alert(`note ${id} deleted!`)
           this.setState({notes: this.state.notes.filter(i => i.id !== id)})
      })
      .catch(error => {
        console.error({error})
      })
  };


  renderFolder() {
    const { notes } = this.state;
    return (
      <>
        <Route exact key="/" path="/" render={props=> <NoteList {...props} folders={this.state.folders}/>} />
        <Route path="/notes/:noteId" component={NoteNav} />
        <Route path="/notes/:noteId" render={props=>
        <PageMain {...props}
          notes={this.state.notes}
          onDeleteNote={this.handleClickDelete}
        />} />
        <Route
          exact
          key="/folder/:folderid"
          path="/folder/:folderid"
          render={props=> <NoteList {...props} folders={this.state.folders}/>}
        />
        <Route path="/add-folder" component={NoteNav} />
        <Route
          path="/add-note"
          render={props => <NoteNav {...props} notes={notes} />}
        />
      </>
    );
  }
  renderFolderRoutes() {
    return (
      <>
        <Route
          key="/folder/:folderid"
          exact path="/folder/:folderid"
          render={props=>
            <Note {...props}
              handleClickDelete={this.handleClickDelete}
              notes={this.state.notes}
              id={this.state.id}
            />} 
        />
        <Route key="/" exact path="/" render={props=>
          <Note {...props}
            handleClickDelete={this.handleClickDelete}
            id={this.state.id}
          />} 
        />
        <Route
          path="/add-folder"
          render={props => (
            <AddFolderError>
              <AddFolder
                {...props}
                folderSubmit={this.folderSubmit}
                newFolder={this.newFolder}
                folder={this.state.folder}
                nameError={this.state.nameError}
              />
            </AddFolderError>
          )}
        />
        <Route
          path="/add-note"
          render={props => (
            <AddNote
              {...props}
              id={this.state.id}
              handleSubmit={this.handleSubmit}
              onContentChange={this.onContentChange}
              name={this.state.name}
              onNameChange={this.onNameChange}
              content={this.state.content}
              folder={this.state.folderid}
              onfolderChange={this.onfolderChange}
              nameError={this.state.nameError}
              folderError={this.state.folderError}
            />
          )}
        />
      </>
    );
  }
  //second render

  render() {
    console.log('fromappnotes', this.state.id)

    // final main render to bring it all together now
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
    };
    return (
      <ApiContext.Provider value={value}>
        <div className="body">
          <header>
            <h1>
              <Link to="/" className="link">
                {" "}
                Noteful
              </Link>
            </h1>
          </header>
          {/* folder Routes - folders */}
          <div className="main">
            {/* LEFT NAVIGATION : FOLDERS */}
            {this.renderFolder()}
            {/* RIGHT NOTES & FOLDERS NAVIGATION */}
            {this.renderFolderRoutes()}
          </div>
          {/* Render Notes */}
        </div>
      </ApiContext.Provider>
    );
  }
}
