import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Header from '../components/Header';
import FormsDisplay from '../components/FormsDisplay';
import SearchBar from '../components/SearchBar';

const forms_url = "http://localhost:7700/form/created";

class Forms extends Component {
    constructor() {
        super()

        this.state = {
            form_data: '',
            form_data_filtered: '',
            error: ''
        }
    }

    changeHandler = (input) => { //a callback function which is called once it's triggered from the SearchBar.js, input conatins the input by the user inside the search bar
        const filtering = this.state.form_data.filter(//using filter to filter the data; it sees whether the input is present in any of the list's city_name
            (data) => {
                return data.form_name.toLowerCase().indexOf(input.toLowerCase()) > -1 //the returned value will always be true if input is present in any of the list's city_name as indexOf() will return a value greater than -1
            }
        )
        this.setState({ form_data_filtered: filtering });//changing state's value
    }
    render() {
        console.log(this.state.form_data);
        if (sessionStorage.getItem('email') == null) {
            this.props.history.push('/')
        }
        return (
            <>
                <Header />
                <center>
                    <SearchBar category='Form' filter={(input) => { this.changeHandler(input) }} />
                </center>
                <FormsDisplay form_data={this.state.form_data_filtered} />
            </>
        )
    }
    componentDidMount() {
        fetch(forms_url, {
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
                    form_data: data,
                    form_data_filtered: data
                })
            })
            .catch((err, data) => {
                this.setState({
                    error: err
                })
            })
    }
}

export default Forms;