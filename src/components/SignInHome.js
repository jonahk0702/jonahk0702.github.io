import React, { Component } from "react";
import {Container, Row, Col, ButtonToolbar, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import NavbarIn from "./navbar/NavbarIn";
import IndividaulBet from "./IndividaulBet/IndividaulBet";

 
let Holder = <div></div>; 

class SignInHome extends Component {
  constructor(props) {
    super(); 
    this.state = {
      //I know this is messy but hear me out. To reload a page we need a state change.
      //SO if I cannt change a (because it is used for sorting as well as reloads)
      //I will just change B
      a:'total',
      b:'1'
      
    };
  }

loadBets = () => {
  console.log("s");
}

reload = (num) => {
  this.props.reload(num);
}

  changeRoute = (name) => {
    this.props.changeRoute(name);
  }

  unloadUser = () => {
  this.props.unloadUser();
}

cheap = () => {
  this.makeItEfficieant('total');  
}

goodOdds = () => {
  this.makeItEfficieant('odds');  
}

expires = () => {
  this.makeItEfficieant('expiry');  
}

popular = () => {
  this.makeItEfficieant('popular');
}

makeItEfficieant = (sortBy) => {
  Holder = <div></div>; 
  this.grabbingBets(sortBy);
  this.setState({a:sortBy});

}

bought = () => {
  if(this.state.a === 'total'){
    this.makeItEfficieant('total');
  }
  if(this.state.a === 'popular'){
    this.makeItEfficieant('popular');
  }
  if(this.state.a === 'expiry'){
    this.makeItEfficieant('expiry');
  }
  if(this.state.a === 'odds'){
    this.makeItEfficieant('odds');
  }
}

 

componentDidMount(){  
  this.grabbingBets('total');
  console.log("id is " + this.props.userId);
}

grabbingBets = (sorter) => {

  fetch('http://localhost:3000/displayBet', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: this.props.email
    })
   })
   .then(response => response.json())
   .then(data => {
    //THis is just used to make sure that a bet was returned
      //console.log(data) 
   });

   fetch('http://localhost:3000/returnBets', {
     method: 'post',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({
      sorter:sorter
     })
    }) 
    .then(response => response.json())
    .then(data => {
    //  console.log(data);
        
       Holder = data.map((user, i) => { 
          return <IndividaulBet key={i} betid={data[i].id} name={data[i].description} amount={data[i].total}
                  Odds={(((data[i].amountfor + data[i].total)/(data[i].amountagainst + data[i].total) ))}
                  expiry={data[i].expiry} email={this.props.email} bought={this.bought} userId={this.props.userId}      />

        }) 
       if(this.state.b === '1'){
        this.setState({b:'2'});
       }else{
        this.setState({b: '1'});
       }
    });
   
    
}


  render() {  
    return (
      <div>
        <NavbarIn changeRoute={this.changeRoute} unloadUser={this.unloadUser} />
        <br />
        <br />
        <br />
        <h1 className="tc white i f1 font">Explore Open Bets!</h1>
        <br />
        <br />
        <Container>
          <Row>
            <Col className="tc f3 solidBR">
              How should we order all open Bets?
              <ButtonToolbar className="center mw5 mw7-ns center bg-light-gray pa3 ph5-ns">
                <ToggleButtonGroup
                  className="center "
                  type="radio"
                  name="options"
                  defaultValue={1}
                >

                  <ToggleButton className="ma3" value={1} onClick={this.cheap}>
                    Cheapest
                  </ToggleButton>
                  <ToggleButton className="ma3" value={2} onClick={this.goodOdds}>
                    Highest odds
                  </ToggleButton>
                  <ToggleButton className="ma3" value={3} onClick={this.expires}>
                    Expire Soonest
                  </ToggleButton>
                  <ToggleButton className="ma3" value={4} onClick={this.popular}>
                    Most Popular
                  </ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar> 

            
              <br />
              <hr />
              <br/> 
              <div className='tc'>
                <Container>
                  <Row>
                    <Col md className='f4 tc bl ma1'>A short descripton of bet</Col>
                    <Col xs={2} className='ma1'>The Odds</Col>
                    <Col xs={2} className=' ma1'>Amount (in B)</Col>
                    <Col xs={2} className='br ma1'>End date</Col>
                  </Row>   
                </Container>
              </div>
              <hr/>
              
              {Holder} 
              
            </Col>
          </Row>
        </Container>
        <br/>
      </div>
    );
  }
}

export default SignInHome;
