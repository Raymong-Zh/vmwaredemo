import React, { Component } from 'react';



class Preform extends Component {
	constructor(props) {
		super(props);
		this.initialState={
			hostnum: '',
			vchost: '',
			sys_level: ''
		};
		this.state = this.initialState;
	}

	handleChange = event => {
    const {name, value } = event.target;
    this.setState({
      [name] : value
    });
  } 


	submitForm = () => {
		const {hostnum, vchost, sys_level} = this.state;
		fetch('/', {
  			method: 'POST',
  			headers: {
    			'Accept': 'application/json',
    			'Content-Type': 'application/json'
  			},
  			body: JSON.stringify({
    			hostnum: hostnum,
    			vchost: vchost,
    			sys_level: sys_level,
  			})
  		}).then((res)=>{ 
          if(res.ok){
              res.json().then((data)=>{  
              console.log(data); 
              this.props.handleSubmit(data);
              })
          }else{ 
              console.log(res.status); 
          } 
      }).catch((res)=>{  
          console.log(res.status); 
      })

      this.setState(this.initialState);

	}

	render(){
		const {hostnum, vchost, sys_level} = this.state;
		return(
			<form>
				<label>Number of hosts</label>
				<input 
					type="text"
					name="hostnum"
					value={hostnum}
					onChange={this.handleChange} />
				<label>vchost</label>
				<input 
					type="text"
					name="vchost"
					value={vchost}
					onChange={this.handleChange} />
				<label>system level</label>
				<input
					type="text"
					name="sys_level"
					value={sys_level}
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