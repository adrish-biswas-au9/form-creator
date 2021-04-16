import React, { Component } from 'react';
import Header from '../components/Header';
import { HashLink } from 'react-router-hash-link';


const password_change = 'http://localhost:7700/api/auth/editPassword';
const name_change = 'http://localhost:7700/api/auth/editName';
const profile_photo_change = 'http://localhost:7700/api/auth/images_upload';
class ProfilePage extends Component {
    constructor() {
        super()

        this.state = {
            name: '',
            password: '',
            profilePhoto: null,
            error: '',
            allowSignupName: false,
            allowSignupPassword: false,
            allowSignupPhoto: false
        }
    }

    handleChangeName = (event) => {
        this.setState({ name: event.target.value })
    }
    handleChangePassword = (event) => {
        this.setState({ password: event.target.value })
    }
    componentDidUpdate() {
        if (this.state.name && !this.state.allowSignupName) {
            this.setState({ allowSignupName: true })
        }
        if ((!this.state.name) && this.state.allowSignupName) {
            this.setState({ allowSignupName: false })
        }
        if (this.state.password && !this.state.allowSignupPassword) {
            this.setState({ allowSignupPassword: true })
        }
        if ((!this.state.password) && this.state.allowSignupPassword) {
            this.setState({ allowSignupPassword: false })
        }
    }
    
    handlePasswordChange = () => {
        console.log({ Password: this.state.password })
        
        fetch(`${password_change}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },

            body: JSON.stringify({ email: sessionStorage.getItem('email'), password: this.state.password })
        });
        localStorage.removeItem('userGhibli')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('name')
        sessionStorage.removeItem('role')
        localStorage.setItem("isloggedinGhibli", false);
        this.props.history.push('/')
    }

    handleNameChange = () => {
        console.log({ Name: this.state.name })
        
        fetch(`${name_change}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },

            body: JSON.stringify({ email: sessionStorage.getItem('email'), name: this.state.name })
        });
        localStorage.removeItem('userGhibli')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('name')
        sessionStorage.removeItem('role')
        localStorage.setItem("isloggedinGhibli", false);
        this.props.history.push('/')
    }
    handleChangePhoto = (event) => {
        this.setState({allowSignupPhoto: true})
        this.setState({ profilePhoto: event.target.files[0] })
    }
    handlePhotoChange = (event) => {
        let fd = new FormData();
        fd.append("profilePhoto", this.state.profilePhoto)
        fd.append("email", sessionStorage.getItem('email'))
        fetch(`${profile_photo_change}`, {
            method: 'PUT',

            body: fd
        });
        localStorage.removeItem('userGhibli')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('name')
        sessionStorage.removeItem('role')
        localStorage.setItem("isloggedinGhibli", false);
        this.props.history.push('/')
    }
    render() {
        if (sessionStorage.getItem('email') == null) {
            this.props.history.push('/')
        }

        return (
            <>
                <Header />

                <div className='row main' style={{ padding: '50px' }} >
                    <div className='col-sm-9'>
                        <center><h2 style={{ color: '#1daeed' }} className='wishlist_heading main'>{sessionStorage.getItem('name')}'s Profile Page</h2>
                        <img style={{height:'120px', width: '120px', borderRadius:'60px'}} alt='profilePhoto' src={sessionStorage.getItem('profilePhoto')} /></center>
                        
                    </div>

                </div>
                <div className="container-fluid">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">New Password</label>
                        <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.handleChangePassword} />
                    </div>
                    { this.state.allowSignupPassword ?
                        <button onClick={() => { this.handlePasswordChange() }} class="btn btn-primary">Update Password</button> : null
                    }
                    
                    <br />  <br />  <br />
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">New Name</label>
                        <input type="text" class="form-control" onChange={this.handleChangeName} />
                    </div>
                    {this.state.allowSignupName ?
                        <button onClick={() => { this.handleNameChange() }} class="btn btn-primary">Update Name</button> : null
                    }
                    <br />  <br />  <br />

                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">New Profile Photo</label>
                        <input type="file" class="form-control" onChange={ this.handleChangePhoto.bind(this) } />
                    </div>
                    { this.state.allowSignupPhoto ?
                        <button value="Save" onClick={ this.handlePhotoChange.bind(this) } class="btn btn-primary">Update Profile Photo</button> : null
                    }
                    
                    <br />  <br />  <br />
                </div>
            </>
        )
    }
}

export default ProfilePage;