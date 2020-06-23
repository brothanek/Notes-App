import React, { Component } from 'react'
import axios from 'axios'
import { FormattedDate } from 'react-intl'

export default class DisplayNote extends Component {
    constructor(props) {
        super(props)

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

    render() {
        return (
            <div>
                <h1>{this.state.headline}</h1>
                <hr />
                <br />
                <h5>{this.state.content}</h5>
                <hr />
                <FormattedDate value={this.state.date} year='numeric' month='long' weekday='long'day='numeric' hour='numeric' minute='numeric' /><br></br>
            </div>
        )
    }
}