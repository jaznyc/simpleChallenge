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
    const obj = this.state.candidate
    const candidate = this.state.candidate.singleCandidate;
    const percentile = this.state.candidate.percentile
    console.log('obbj', obj)
    if(candidate !== undefined){
      console.log(candidate.title);
      console.log(percentile.comPercentile * 100)
    }

    return (
      <div>
        <h1>What's My Coding Percentile ?</h1>
        <h3>Enter your Candidate ID below to see how you rank compared to other engineers at similar companies with the same title.</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="id"> Enter Your Candidate Id Here: </label>
          <input name="id" type="text" onChange={this.handleChange} />
          <button>Submit</button>
        </form>
        <div> {candidate ?
        <h2>Title: {candidate.title}</h2>
        : <div></div>} </div>
         <div>
          { percentile ? (<h3>Your Communication Percentile: {(percentile.comPercentile * 100).toFixed(2)}%</h3>) : <div></div>}
          {percentile ? (<h3>Your Coding Percentile: {(percentile.codePercentile * 100).toFixed(2)}%</h3>) : <div></div>}
        </div>
      </div>
    );
  }
}

export default Home;
