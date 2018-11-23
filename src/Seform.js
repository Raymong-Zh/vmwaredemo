import React, { Component } from 'react';

const cpumemlist = ['4C8G', '2C4G'];
const vmtemplatelist = [{ostype: 'windows', vmtemplates: ['wintemp1', 'wintemp2']},{ostype: 'linux', vmtemplates: ['linutmep1', 'linutmep2']}];

class Seform extends Component {
	constructor(props) {
		super(props);
		this.initialState={
			ostype: vmtemplatelist[0].ostype,
			vmtemplate: vmtemplatelist[0].vmtemplates[0],
			vchost: '',
			vcname: '',
			vcnameos: '',
			cpumem: cpumemlist[0],
			disksize: '',
			ip: '',
			subnet: '',
			gateway: '',
			ip2: '',
			subnet2: '',
			annotation: '',
		};
		this.state = this.initialState;
	}

	handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name] : value
    });
    }
    handleOstypeChange = event => {
    	this.setState({
    		ostype: event.target.value
    	});
    	vmtemplatelist.map((item, index) => {
    		if (event.target.value === item.ostype) {
    			this.setState({vmtemplate: item.vmtemplates[0] });
    		}
    		return true;
    	});
    }

    handleIpChange = event => {
    	const {name, value} = event.target;
    	if (name !=='') {
    		const ipBefore = value.split('.', 3);
    		ipBefore.push('0/24');
    		var sub = ipBefore.join('.');
    		if (name === 'ip') {
    			this.setState({
    				ip: value,
    				subnet: sub,
    			});
    		}
    		else {
    			this.setState({
    				ip2: value,
    				subnet2: sub,
    			}
    			);
    		}

    	}

    }

  	submitForm = () => {
  		const {datacenter, esxi_hostname, datastore} = this.props.onerow;
		const {ostype, vmtemplate, vchost, vcname, vcnameos, cpumem, disksize, ip, subnet, gateway, ip2, subnet2, annotation} = this.state;
		fetch('/create', {
  			method: 'POST',
  			headers: {
    			'Accept': 'application/json',
    			'Content-Type': 'application/json'
  			},
  			body: JSON.stringify({
  				datacenter: datacenter,
  				esxi_hostname: esxi_hostname,
  				datastore: datastore,
    			ostype: ostype,
				vmtemplate: vmtemplate,
				vchost: vchost,
				vcname: vcname,
				vcnameos: vcnameos,
				cpumem: cpumem,
				disksize: disksize,
				ip: ip,
				subnet: subnet,
				gateway: gateway,
				ip2: ip2,
				subnet2: subnet2,
				annotation: annotation,
  			})
  		}).then((res)=>{ 
          if(res.ok){
              res.json().then((data)=>{ 
              //alert(data); 
              console.log(data); 
              //this.props.handleSubmit(data);
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
		const cpumems = cpumemlist.map((item, index) => {
			return <option key={index}>{item}</option>
			
		});
		const ostypes = vmtemplatelist.map((item, index) => {
			return <option key={index}>{item.ostype}</option>
		});
		const vmtemplates = vmtemplatelist.map((item, index) => {
			if (this.state.ostype === item.ostype) {
			return item.vmtemplates.map((item, index) =>
				<option key={index} >{item}</option>
			)
			}
			return true;
		});
		const {datacenter, esxi_hostname, datastore }=this.props.onerow;
		const {ostype, vmtemplate, vchost, vcname, vcnameos, cpumem, disksize, ip, subnet, gateway, ip2, subnet2, annotation} = this.state;
		return(
			<form>
				<label>datacenter</label>
				<input 
					type="text"
					name="datacenter"
					value={datacenter}
					onChange={this.handleChange} />
				<label>esxi_hostname</label>
				<input 
					type="text"
					name="esxi_hostname"
					value={esxi_hostname}
					onChange={this.handleChange} />
				<label>datastore</label>
				<input 	
					type="text"
					name="datastore"
					value={datastore}
					onChange={this.handleChange} />
				<label>ostype</label>
				<select
					name="ostype"
					value={ostype}
					onChange={this.handleOstypeChange} >{ostypes}
				</select>
				<label>vmtemplate</label>
				<select
					name="vmtemplate"
					value={vmtemplate}
					onChange={this.handleChange} >{vmtemplates}
				</select>
				<label>vchost</label>
				<input
					type="text"
					name="vchost"
					value={vchost}
					onChange={this.handleChange} />
				<label>vcname</label>
				<input
					type="text"
					name="vcname"
					value={vcname}
					onChange={this.handleChange} />	
				<label>vcnameos</label>
				<input
					type="text"
					name="vcnameos"
					value={vcnameos}
					onChange={this.handleChange} />
				<label>cpumem</label>
				<select name='cpumem'
						value= {cpumem} 
						required
						onChange={this.handleChange}>{cpumems}</select>		
				<label>disksize</label>
				<input
					type="text"
					name="disksize"
					value={disksize}
					onChange={this.handleChange} />
				<label>ip</label>
				<input
					type="text"
					name="ip"
					value={ip}
					onChange={this.handleIpChange} />	
				<label>subnet</label>
				<input
					type="text"
					name="subnet"
					value={subnet}
					onChange={this.handleChange} />	
				<label>gateway</label>
				<input
					type="text"
					name="gateway"
					value={gateway}
					onChange={this.handleChange} />	
				<label>ip2</label>
				<input
					type="text"
					name="ip2"
					value={ip2}
					onChange={this.handleIpChange} />
				<label>subnet2</label>
				<input
					type="text"
					name="subnet2"
					value={subnet2}
					onChange={this.handleChange} />	
				<label>annotation</label>
				<input
					type="text"
					name="annotation"
					value={annotation}
					onChange={this.handleChange} />
				
				<input 
					type="button"
					value="Submit"
					onClick={this.submitForm} />
			</form>

		);
	}
}

export default Seform;