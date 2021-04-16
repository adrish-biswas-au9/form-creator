import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import './HomeDisplay.css';
import { HashLink } from 'react-router-hash-link';

const HomeMovieGridDisplay = (props) => {
    const handleDelete = (form_item) => {
        fetch(`http://localhost:7700/form/delete/${form_item._id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },


        })
        alert("form deleted!");
    }
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
                const formRoute = '/formsRendered/' + item._id + '#top';
                return (
                    <>
                        <center><HashLink to={formRoute}>{item.form_name}</HashLink><img alt='delete' onClick={() => { handleDelete(item) }} src="https://img.icons8.com/cute-clipart/64/000000/filled-trash.png" /></center>
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

                    {display(props.form_data)}
                </div>
            </div>
        </div>
    )
}

export default HomeMovieGridDisplay;