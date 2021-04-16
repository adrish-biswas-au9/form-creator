import React, { Component } from 'react';
import './SearchBar.css';
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: `${this.props.category}s`,
            search: `${this.props.category} Search`
        }
    }
    inputHandler = (event) => {
        this.setState({search:event.target.value})
        this.props.filter(event.target.value);
    }
    focusHandler = (event) =>{
        if(event.target.value===`${this.props.category} Search`){
            this.setState({search:''})
        }
    }
    focusOutHandler = (event) => {
        if(event.target.value){
            this.setState({search:event.target.value})
        }
        else{
            this.setState({search:`${this.props.category} Search`})
        }
        
    }
    render() {
        return (
            <React.Fragment>
                <header id={`${this.props.category}_search`}>
                    <div className='Search_conatiner main' style={{textAlign:'left',paddingTop: '70px'}} id={`${this.props.category}s_heading`}>
                        <div>{this.state.title}</div>
                       
                        <input onFocus={this.focusHandler} onBlur={this.focusOutHandler} onChange={this.inputHandler} value={this.state.search} style={{
                            fontSize: '20px',
                            fontFamily: 'Times New Roman', color: '#111',
                            // border: '0.5px solid #0f78af',
                            borderBottom:'5px solid #0f78af',
                           
                            backgroundColor: '',
                            // borderRadius: '5px',
                            

                            outline: 'none',
                            padding: '15px',
                            marginTop: '10px',
                            width: '100%',
                            height: '45px'
                        }} />
                        


                    </div>

                </header>
            </React.Fragment>
        )
    }
}
export default SearchBar;