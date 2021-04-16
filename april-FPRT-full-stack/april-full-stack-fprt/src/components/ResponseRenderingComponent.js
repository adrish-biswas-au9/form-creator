import React, { Component } from 'react';
import './MovieComponent.css';
import { HashLink } from 'react-router-hash-link';

class ResponseRenderingComponent extends Component {
    // constructor() {
    //     super()

    //     this.state = {
    //         formResponse: []
    //     }
    // }


    response_info = (final_output) => {
        
        return final_output.map((item, index) => {
            
            return item.map((item2,index2)=>{
                //console.log(item2,'in inner function')
                if(item2.key==='Response'){
                    return (
                        <>
                            <br />
                            <center><h4>{item2.key}{"  " + item2.value}</h4></center>
                            <br />
                        </>
                    )
                }
                else{
                    return (
                        <>
                            <br />
                            <center>{item2.key}:{"  " + item2.value}</center>
                            <br />
                        </>
                    )
                }
                
            })
            
        })
    }


    render() {
        let final_output = [];
        if (this.props.responsedetails) {
            this.props.responsedetails.map((item, index) => {
                //console.log("got field...", item);
                let input = item.form_responses[0];
                let output = [];
                //console.log(input, 'input');
                //output= this.keyValue(input);
                Object.entries(input).forEach(([key, value]) => {
                    //console.log([{key:key,value: value}],"keyValue")
                    if (value === "") {
                        value = "null"
                    }
                    output = [...output, { key: key, value: value + '' }]
                    //console.log([{key:key,value: value}],"keyValue")

                })
                final_output = [...final_output, [{key:'Response', value:index+1},...output]];
                console.log(final_output,'final_output');
            })
        }
        //console.log(final_output,'final_output');
        return (
            <>
                {
                    this.props.formdetails ?
                        <center><h4>{this.props.formdetails.form_name}'s Response</h4></center> : null
                }

                {
                    final_output.length === 0?
                    <center> <br /> <h4>No responses yet.</h4></center> : null
                }

                <div >{this.response_info(final_output)}</div>

            </>

        )
    }

}


export default ResponseRenderingComponent;