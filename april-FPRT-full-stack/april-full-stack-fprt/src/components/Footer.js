import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <React.Fragment>
            <div id="footer" style={{ clear: 'both' }}>
                <br />
                <br />
                <center>
                    &copy; Form Creator
                    <br />
                    <img src="https://img.icons8.com/dusk/64/000000/google-forms.png" width="80" height="80" className="d-inline-block align-bottom" alt="logo" loading="lazy" />
                </center>
            </div>
        </React.Fragment>
    )
}
export default Footer;