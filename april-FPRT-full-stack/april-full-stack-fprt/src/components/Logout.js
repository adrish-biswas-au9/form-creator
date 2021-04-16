import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from "react-router";

const Logout = (props) => {
    const logout = () => {
        localStorage.removeItem('userGhibli')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('name')
        sessionStorage.removeItem('profilePhoto')
        localStorage.setItem("isloggedinGhibli", false);
        props.history.push('/')
    }
    return (
        <>

            <button type="button" className="btn btn-warning" onClick={logout} style={{ width: '95px', height: '46px', fontFamily: 'Nora', color: 'black' }}>Logout</button>

        </>
    )
}

export default withRouter(Logout);