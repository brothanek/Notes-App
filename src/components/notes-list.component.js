import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FormattedMessage, FormattedDate } from 'react-intl'

const Note = props => (

    <tr>
        <td><b>{props.note.headline.substring(0,25)}</b></td>
        <td width="50%">{props.note.content.substring(0,70)}</td>
        <td><FormattedDate value={props.note.date} year='numeric' month='long' day='numeric' /></td>
        <td>
            <Link to={`/display/${props.note._id}`}><FormattedMessage id='app.display' defaultMessage='display'/> </Link>|<Link to={`/edit/${props.note._id}`}> <FormattedMessage id='app.edit' defaultMessage='edit'/></Link> | <a href="#" onClick={() => props.deleteNote(props.note._id)}><FormattedMessage id='app.delete' defaultMessage='delete'/></a>
        </td>
    </tr>
)

export default class NotesList extends Component {
    constructor(props) {
        super(props)

        this.deleteNote = this.deleteNote.bind(this)

        this.state = { notes: [] }
    }

    async componentDidMount() {
        try {
            let notes = await axios.get('http://localhost:5000/notes')
            this.setState({
                notes: notes.data
            })

        } catch (e) {
            console.error(e)
        }

    }

    async deleteNote(id) {
        if(window.confirm('Are you sure you want to delete this note?')){
            let res = await axios.delete(`http://localhost:5000/notes/delete/${id}`)
            console.log(res.data)
    
            this.setState({
                notes: this.state.notes.filter(note => note._id !== id)
            })
        }

    }

    NotesList() {
        return this.state.notes.map(note => {
            return <Note deleteNote={this.deleteNote} note={note} key={note._id} />
        })
    }

    render() {
        return (
            <div>
                <h3><FormattedMessage id='app.notesList' defaultMessage='Notes List'/></h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th><FormattedMessage id='app.headline' defaultMessage='Note Name'/></th>
                            <th><FormattedMessage id='app.content' defaultMessage='Content'/></th>
                            <th><FormattedMessage id='app.date' defaultMessage='Date'/></th>
                            <th></th>
                        </tr>

                    </thead>
                    <tbody>
                        {this.NotesList()}
                    </tbody>
                </table>
            </div>
        )
    }
}