import React, { Component } from "react";
import SignIn from './SignIn/SignIn';
import Register from './Register/Register';

class signInReg extends Component {
  constructor(props) {
    super();
    this.state = {
      onCreateAccount: false,  

  };
}
   handleSwitch = (onCreateAccountPage) => {
   if(onCreateAccountPage){
    this.setState({ onCreateAccount: true });
   }else{
       this.setState({ onCreateAccount: false })
       }
  };


  render() {

    let current;
    if(this.state.createA){
      current = <Register handleSwitch={this.handleSwitch}/>;
    }else{
      current = <SignIn handleSwitch={this.handleSwitch}/>;
    }
    return (
     <div>
        {current}
      </div>
    );
  }
}

export default signInReg;  

