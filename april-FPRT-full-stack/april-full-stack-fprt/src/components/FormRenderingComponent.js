import React, { Component } from 'react';
import './MovieComponent.css';
import { HashLink } from 'react-router-hash-link';
import { withRouter } from "react-router";
const response_create_url = 'http://localhost:7700/response/create';
let formdetails_length = 0;
let changeHandlerCalled_g = 0;
let fields_set_flag = false;
class FormRenderingComponent extends Component {
    constructor() {
        super()

        this.state = {
            formResponse: {}
        }
    }
    handleSubmit = () => {
        fetch(response_create_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.props.formdetails.user_email, formName: this.props.formdetails.form_name, form_responses: [this.state.formResponse], form_id: this.props.form_id })
        })

        alert("Your response has been submitted!")
        this.props.history.push('/formsubmitted');
    }
    
    changeHandler = (event) => {
        
        //console.log(this.state.formResponse, 'formResponse')
        //console.log(event, 'event')
        let oldFormResponse = this.state.formResponse;
        console.log(event.target.type, 'inside if')
        if (event.target.type == 'text') {
            //console.log(event.target.attributes['type'],'inside if')
            oldFormResponse[event.target.placeholder] = event.target.value
            this.setState({ formResponse: oldFormResponse })
        }
        if (event.target.type == 'checkbox') {
            oldFormResponse[event.target.placeholder] = event.target.checked
            this.setState({ formResponse: oldFormResponse })
        }
        let changeHandlerCalled = 0;
        
        this.props.formdetails.field_data.map((item, index) => {
            if (Object.keys(this.state.formResponse).includes(item.field_name)) {
                changeHandlerCalled += 1;
            }
        })
        changeHandlerCalled_g = changeHandlerCalled;
    }

    form_info = ({ formdetails }) => {
        if (formdetails) {
            return formdetails.field_data.map((item, index) => {
                //console.log("got field...", item);
                return (
                    <center>
                        <label for={item.field_name} class="form-label">{item.field_name}</label>
                        <br />
                        <input className={item.field_type} type={item.field_type} placeholder={item.field_name} onChange={this.changeHandler} id={item.field_type + "_" + item.field_name} ></input>
                        <br /><br /><br />
                    </center>
                )
            })
        }
    }


    render() {

        console.log(changeHandlerCalled_g, 'changehandlercalls');
        console.log(this.props, 'component props');
        if (this.props.formdetails) {
            formdetails_length = this.props.formdetails.field_data.length;
        }
        return (
            <>
            
                {
                    this.props.formdetails ?
                        <center><h4>{this.props.formdetails.form_name}</h4></center> : null

                }
                <div >{this.form_info(this.props)}</div>
                {
                        formdetails_length <= changeHandlerCalled_g ?
                        <center><button type="button" onClick={this.handleSubmit} class="btn btn-primary">Submit Response</button><br /><br /></center> : <center><button type="button" disabled onClick={this.handleSubmit} class="btn btn-primary">Submit Response</button><br /><br /></center>
                }

                {/* <div style={{ margin: '10px' }}> */}

            </>

        )
    }


}


export default withRouter(FormRenderingComponent);