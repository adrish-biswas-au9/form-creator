import React, { Component } from 'react';
import Header from '../components/Header';
import { HashLink } from 'react-router-hash-link';


const form_create_url = 'http://localhost:7700/form/create';

class Home extends Component {
    constructor() {
        super()

        this.state = {
            field_data: [],
            checkBox: '',
            textField: '',
            formName: '',
            error: '',
            allowSignupCheckBox: false,
            allowSignupTextField: false
        }
    }

    handleChangeCheckBox = (event) => {
        this.setState({ checkBox: event.target.value })
    }
    handleChangeTextField = (event) => {
        this.setState({ textField: event.target.value })
    }
    handleChangeformName = (event) => {
        this.setState({ formName: event.target.value })
    }
    componentDidUpdate() {
        if (this.state.checkBox && !this.state.allowSignupCheckBox) {
            this.setState({ allowSignupCheckBox: true })
        }
        if ((!this.state.checkBox) && this.state.allowSignupCheckBox) {
            this.setState({ allowSignupCheckBox: false })
        }
        if (this.state.textField && !this.state.allowSignupTextField) {
            this.setState({ allowSignupTextField: true })
        }
        if ((!this.state.textField) && this.state.allowSignupTextField) {
            this.setState({ allowSignupTextField: false })
        }

    }

    handleTextFieldChange = () => {
        console.log({ TextField: this.state.textField })
        let new_field =
        {
            "field_type": "text",
            "field_name": this.state.textField
        }
        this.setState({ field_data: [...this.state.field_data, new_field] })
        this.setState({ textField: '' })
    }

    handleCheckBoxChange = () => {
        console.log({ CheckBox: this.state.checkBox })
        let new_field =
        {
            "field_type": "checkbox",
            "field_name": this.state.checkBox
        }
        this.setState({ field_data: [...this.state.field_data, new_field] })
        this.setState({ checkBox: '' })

    }



    handleDelete = (form_item) => {
        const filtered_data = this.state.field_data.filter(function (item) { //deleting the particular data in action.payload by using filter method
            return item !== form_item;
        });
        this.setState({ field_data: [...filtered_data] })
        alert("item deleted!");
    }

    handleSubmit = () => {
        fetch(form_create_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: sessionStorage.getItem('email'),formName: this.state.formName ,field_data: this.state.field_data })
        })
        this.setState({ field_data: [], formName: '' })
        alert("Form has been submitted!")
    }

    renderForm = (formData) => {
        console.log("rendering form...", formData);
        return formData.map((item, index) => {
            console.log("got field...", item);
            return (
                <center>
                    <label for={item.field_name} class="form-label">{item.field_name}</label>
                    <br />
                    <input type={item.field_type} id={item.field_type + "_" + item.field_name} ></input>
                    <img alt='delete' onClick={() => { this.handleDelete(item) }} src="https://img.icons8.com/metro/26/000000/delete-sign.png" />
                    <br /><br /><br />
                </center>
            )
        })
    }

    render() {
        if (sessionStorage.getItem('email') == null) {
            this.props.history.push('/')
        }
        console.log(this.state.field_data);
        let field_data_count = false;
        if (this.state.field_data.length > 0) {
            field_data_count = true;
        }
        return (
            <>
                <Header />

                <div id='Top' className='row main' style={{ padding: '50px' }} >
                    <div className='col-sm-9'>
                        <h2 style={{ color: '#1daeed' }} className='wishlist_heading main'>Create Form</h2>
                    </div>

                </div>
                <div className="container-fluid">
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Form name</label>
                        <input type="text" class="form-control" value={this.state.formName} onChange={this.handleChangeformName} />
                    </div>
                    {/* {this.state.allowSignupformName ?
                        <button onClick={() => { this.handleformNameChange() }} class="btn btn-primary">Add Form Name</button> : null
                    } */}
                    <br />  <br />  <br />
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Text field name</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.textField} onChange={this.handleChangeTextField} />
                    </div>
                    {this.state.allowSignupTextField ?
                        <a href='#Form_preview'><button onClick={() => { this.handleTextFieldChange() }} class="btn btn-primary">Add text field</button></a>
                         : null
                    }

                    <br />  <br />  <br />
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Checkbox name</label>
                        <input type="text" class="form-control" value={this.state.checkBox} onChange={this.handleChangeCheckBox} />
                    </div>
                    {this.state.allowSignupCheckBox ?
                        <a href='#Form_preview' ><button onClick={() => { this.handleCheckBoxChange() }} class="btn btn-primary">Add checkbox</button> </a>
                        : null
                    }



                </div>
                {
                    this.state.formName || field_data_count ?
                        <center><h4 id='Form_preview'>Form Preview</h4><br /><br /><h4>{this.state.formName}</h4></center> : null
                }

                {this.renderForm(this.state.field_data)}
                {
                    field_data_count ?
                        <center><button type="button" onClick={this.handleSubmit} class="btn btn-primary">Save Form</button><br /><br /><a href='#Top'><button type="button" class="btn btn-link">Back to top</button></a></center> : null
                        
                }
            </>
        )
    }
}

export default Home;