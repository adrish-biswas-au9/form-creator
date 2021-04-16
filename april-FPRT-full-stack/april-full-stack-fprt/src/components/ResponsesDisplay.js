import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import './HomeDisplay.css';
import { HashLink } from 'react-router-hash-link';

const HomeMovieGridDisplay = (props) => {
    
    const display = (filmslist) => {

        if (filmslist) {

            if (filmslist.length === 0) {
                return (
                    <div id="movie_first" className='movie_poster_container'>
                        <br />
                        <div className="overlay">
                            Sorry; no matches found.
                        </div>
                    </div>
                )
            }
            return filmslist.map((item, index) => {
                const formRoute = '/responseRendered/' + item._id + '#top';
                return (
                    <>
                        <center><HashLink to={formRoute}>{item.form_name}</HashLink></center>
                        <br />
                    </>

                )

            })
        }

    }

    return (

        <div className="Home_sub_containers main">


            <div className="container-fluid" >


                <div className="movie_grid">

                    {display(props.response_data)}
                </div>
            </div>
        </div>
    )
}

export default HomeMovieGridDisplay;