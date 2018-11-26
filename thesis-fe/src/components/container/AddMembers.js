import React, { Component } from 'react';
import { cx, css } from 'emotion';
import styled from 'react-emotion'
import { fontFamily } from '../../helpers/constants';
import { List } from './List';


export class AddMembers extends Component {
  state = {
    error: '',
    input: '',
  }

  handleInput = (event) => {
    this.setState({ input: event.target.value, error: '' });
  }

  handleAddClick = () => {
    const member = this.state.input;
    if (!this.validateEmail(member)) return this.setState({ error: 'Not an email' });

    const parentMembers = this.props.members;
    let members;

    //check if we already have some suggestions
    if (parentMembers) {
      if (parentMembers.includes(member)) return this.setState({ error: 'Already added' });
      members = parentMembers.slice();
    } else members = [];
    
    members.push(member);
    this.setState({ input: '' });
    this.props.setMembers(members);
  }

  validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  renderError = () => {
    return <Error>{this.state.error}</Error>;
  }

  deleteItem = (item) => {
    const members = this.props.members.filter(el => el !== item);
    this.props.setMembers(members);
  }

  render() {
    let inputClasses = cx(
      standarInput,
      { [errorInput]: this.state.error.length },
    );
    return (
      <Container>
        <Title>Invite your friends:</Title>
        <ErrorDiv>
          {!!this.state.error.length && this.renderError()}
        </ErrorDiv>
        <input className={inputClasses} type="text" placeholder="" value={this.state.input} onChange={this.handleInput}></input>
        <Button onClick={this.handleAddClick}>Add</Button>
        {this.props.members && <List items={this.props.members} deleteItem={(item) => this.deleteItem(item)} />}
      </Container>
    );
  }
}

const Container = styled('div')`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction column;
  justify-content: flex-start;
  align-items: center;

  Input:focus{
    outline: none;
  }
`
const Title = styled('p')`
color: #afafaf;
font-family: ${fontFamily};
font-size: 1.5rem;
`
const Button = styled('button')`
width: 20vw;
height: 5vh;
border-width: 2px;
border-color: #afafaf;
border-radius: 10px;
background-color: rgb(255, 255, 255);
font-family: ${fontFamily};
`
const standarInput = css`
  width: 70vw;
  height: 5vh;
  font-family: ${fontFamily};
  padding: 0 10px;
  border-width: 0 0 2px 0;
`
const errorInput = css`
  border-color: #ff7151;
`
const ErrorDiv = styled('div')`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction column;
  justify-content: center;
  align-items: center;
`
const Error = styled('p')`
  color: red;
  font-size: 1rem;
`