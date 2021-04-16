import React, { Component } from 'react';
import axios from 'axios';
import FormRenderingComponent from '../components/FormRenderingComponent';
const formsUrl = 'http://localhost:7700/form/view';


class FormRendering extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: '',
      id: this.props.match.params.id
    }
  }

  async getMovieDetails() {
    const { data: resp } = await axios.get(`${formsUrl}/${this.props.match.params.id}`)
    this.setState({ form: resp })

  }
  render() {
    let isformLength = true;
    let renderingComponent = (<div></div>);
    console.log(this.state.form, 'inside render here');
    renderingComponent = (this.state.form.length===0) ?
      (
        <div className='empty_wishlist'>
          <center><h4 style={{ color: 'black', marginTop: '80px' }}>No more responses are being taken for this form!</h4></center>
        </div>
      ) :
      (<>
      
           <h4>Sharable link: http://localhost:3000/formsRendered/{this.props.match.params.id}</h4>
    
           <FormRenderingComponent form_id={this.props.match.params.id} formdetails={this.state.form[0]}  />
        
      </>)

    return (

      <>
        { renderingComponent }

      </>
    )
  }

  componentDidMount() {

    this.getMovieDetails()


  }

}



export default FormRendering;