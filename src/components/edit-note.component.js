import React, { Component } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'
import { FormattedMessage } from 'react-intl'

export default class EditNote extends Component {


    constructor(props) {
        super(props)

        this.onChangeHeadline = this.onChangeHeadline.bind(this)
        this.onChangeContent = this.onChangeContent.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)



        this.state = {
            headline: [],
            content: '',
            date: new Date()
        }
    }

    async componentDidMount() {
        let res = await axios.get(`http://localhost:5000/notes/${this.props.match.params.id}`)
        console.log(res)
        this.setState({
            headline: res.data.headline,
            content: res.data.content,
            date: new Date(res.data.date)
        })
    }

    onChangeHeadline(e) {
        this.setState({
            headline: e.target.value
        })
    }
    onChangeContent(e) {
        this.setState({
            content: e.target.value
        })
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

        console.log(note)

        axios.put(`http://localhost:5000/notes/update/${this.props.match.params.id}`, note)
            .then(res => console.log(res.data))

        window.location = '/'
    }

    render() {
        return (
            <div>
                <h3><FormattedMessage id='app.noteEditting' defaultMessage='Note Editting' /></h3>
                <form onSubmit={this.onSubmit}>
                    <br />
                    <div className="form-group">
                        <label><FormattedMessage id='app.headline' defaultMessage='Note Name' />:</label>
                        <input
                            className="form-control"
                            value={this.state.headline}
                            onChange={this.onChangeHeadline}>
                        </input>
                    </div>

                    <div className="form-group">
                        <label><FormattedMessage id='app.content' defaultMessage='Content' />: </label>
                        <textarea
                            rows="5"
                            type="text"
                            className="form-control"
                            value={this.state.content}
                            onChange={this.onChangeContent}
                        />

                    </div>
                    <br />

                    <div className="form-group">
                        <label><FormattedMessage id='app.date' defaultMessage='Date' />: </label>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />

                    </div>
                    <br />

                    <div className="form-group">
                        <button type="Submit" className="btn btn-primary" readOnly> <FormattedMessage id='app.updateNote' defaultMessage='Update Note' /></button>

                    </div>
                </form>

            </div>
        )
    }
}