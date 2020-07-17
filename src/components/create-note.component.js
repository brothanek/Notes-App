import React, { Component } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'
import { FormattedMessage } from 'react-intl'

export default class CreateNote extends Component {


    constructor(props) {
        super(props)

        this.onChangeHeadline = this.onChangeHeadline.bind(this)
        this.onChangeContent = this.onChangeContent.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onChangeButton = this.onChangeButton.bind(this)
        this.onSubmit = this.onSubmit.bind(this)


        this.state = {
            headline: '',
            content: '',
            date: new Date(),
            button: 'disabled'
        }
    }

    async onChangeHeadline(e) {

        await this.setState({
            headline: e.target.value
        })
        this.onChangeButton()
    }
    async onChangeContent(e) {
        await this.setState({
            content: e.target.value
        })
        this.onChangeButton()
    }
    onChangeButton(e) {
        if (this.state.content !== '' && this.state.headline !== '') {
            this.setState({
                button: ''
            })
        } else {
            this.setState({
                button: 'disabled'
            })
        }
    }
    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault()
        const note = {
            headline: this.state.headline,
            content: this.state.content,
            date: this.state.date
        }
        axios.post('http://localhost:5000/notes/add', note)
            .then(res => console.log(res.data))

        window.location = '/'


    }

    render() {
        return (
            <div>
                <h3><FormattedMessage id='app.createNewNote' defaultMessage='Create new note' /></h3>
                <form onSubmit={this.onSubmit}>
                    <br />
                    <div className="form-group">
                        <label><FormattedMessage id='app.headline' defaultMessage='Note Name' />:</label>
                        <input
                            id='headline'
                            className="form-control"
                            placeholder="Please enter a note name"
                            value={this.state.headline}
                            onChange={this.onChangeHeadline}>
                        </input>
                    </div>

                    <div className="form-group">
                        <label><FormattedMessage id='app.content' defaultMessage='Content' />: </label>
                        <textarea
                            id='content'
                            rows="5"
                            placeholder="Please enter a text"
                            type="text"
                            className="form-control"
                            value={this.state.content}
                            onChange={this.onChangeContent}
                        />

                    </div>
                    <br />

                    <div className="form-group">
                        <label><FormattedMessage id='app.date' defaultMessage='Date' />:</label>
                        <DatePicker
                            className='form-control'
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />

                    </div>
                    <br />

                    <div className="form-group">
                        <button id='createBtn' type="Submit" className="btn btn-primary" disabled={this.state.button}> <FormattedMessage id='app.createNote' defaultMessage='Create Note' /></button>

                    </div>
                </form>

            </div>
        )
    }
}