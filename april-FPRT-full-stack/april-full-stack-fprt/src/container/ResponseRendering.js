import React, { Component } from 'react';
import axios from 'axios';
import ResponseRenderingComponent from '../components/ResponseRenderingComponent';
import Header from '../components/Header';
const formsUrl = 'http://localhost:7700/form/view';
const response_url = 'http://localhost:7700/response/created';

class ResponseRendering extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: '',
            responses: '',
            id: this.props.match.params.id
        }
    }

    async getMovieDetails() {
        const { data: resp } = await axios.get(`${formsUrl}/${this.props.match.params.id}`)
        this.setState({ form: resp })

    }
    render() {
        if (sessionStorage.getItem('email') == null) {
            this.props.history.push('/')
        }
        //console.log(this.state, 'inside render here')
        let filtering='';
        if (this.state.responses && this.state.form[0]) {
            filtering = this.state.responses.filter((item) => {
                return this.state.form[0].form_name === item.form_name
            })
        }
        return (
            <>
                <Header />
                <ResponseRenderingComponent responsedetails={filtering} form_id={this.props.match.params.id} formdetails={this.state.form[0]} />
            </>
        )
    }

    componentDidMount() {

        this.getMovieDetails()
        fetch(response_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: sessionStorage.getItem('email') })
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    responses: data
                })
            })
            .catch((err, data) => {
                this.setState({
                    error: err
                })
            })

    }

}



export default ResponseRendering;