import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      candidate: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    const val = evt.target.value;
    this.setState({ id: +val });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    evt.persist();
    const id = this.state.id;
    try {
      const { data } = await axios.get(`/api/candidates/${id}`);
      this.setState({ candidate: data });
    } catch (err) {
      console.log('error submitting id:', err);
    }
  }

  render() {
    const candidate = this.state.candidate;
    console.log(candidate);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="id"> Enter Your Candidate Id Here: </label>
          <input name="id" type="text" onChange={this.handleChange} />
          <button>Submit</button>
        </form>
        <div> {candidate ? <h1>{candidate.title}</h1> : <div></div>} </div>
      </div>
    );
  }
}

export default Home;
