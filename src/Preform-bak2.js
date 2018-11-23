import React, { Component } from 'react';



class Preform extends Component {


	handleChange = event => {
		this.props.OnformChange(event);
	}

	submitForm = () => {
		const {hostnum, ref1, ref2} = this.props.state;
		fetch('/', {
  			method: 'POST',
  			headers: {
    			'Accept': 'application/json',
    			'Content-Type': 'application/json'
  			},
  			body: JSON.stringify({
    			hostnum: hostnum,
    			ref1: ref1,
    			ref2: ref2,
  			})
  		}).then((res)=>{ 
          if(res.ok){
              res.json().then((data)=>{  
              //console.log(data); 
              this.props.handleSubmit(data);
              })
          }else{ 
              console.log(res.status); 
          } 
      }).catch((res)=>{  
          console.log(res.status); 
      })

	}

	render(){
		const {hostnum, ref1, ref2} = this.props.state;
		return(
			<form>
				<label>Number of hosts</label>
				<input 
					type="text"
					name="hostnum"
					value={hostnum}
					onChange={this.handleChange} />
				<label>ref1</label>
				<input 
					type="text"
					name="ref1"
					value={ref1}
					onChange={this.handleChange} />
				<label>ref2</label>
				<input
					type="text"
					name="ref2"
					value={ref2}
					onChange={this.handleChange} />
				<input 
					type="button"
					value="Submit"
					onClick={this.submitForm} />
			</form>

		);
	}
}

export default Preform;