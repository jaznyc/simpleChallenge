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

    return (
      <div>
        <div className="headContainer">
          <div className="header">
            <h1>What's My Coding Percentile ?</h1>
          </div>
          <div className="intro">
            <h3>
              Enter your Candidate ID below to see how you rank compared to
              other engineers at similar companies with the same title.
            </h3>
          </div>
          <div className="formNScore">
            <div className="formCont">
              <div className="form">
                <form onSubmit={this.handleSubmit}>
                  <label htmlFor="id"> Enter Your Candidate Id Here: </label>
                  <input name="id" type="text" onChange={this.handleChange} />
                  <button>Submit</button>
                </form>
              </div>
            </div>
            <div className="scoresCont">
              <div className="scores">
                <div>
                  {' '}
                  {candidate.title ? (
                    <h2>Compared to other {candidate.title}s:</h2>
                  ) : (
                    <div></div>
                  )}{' '}
                </div>
                <div>
                  {candidate.comPercentile !== undefined ? (
                    <h3>
                      Your Communication Percentile Is:{' '}
                      {(candidate.comPercentile * 100).toFixed(2)}%
                    </h3>
                  ) : (
                    <div></div>
                  )}
                  {candidate.comPercentile !== undefined ? (
                    <div className="progress-div" style={{ width: 300 }}>
                      <div
                        style={{ width: `${candidate.comPercentile * 300}px` }}
                        className="progress"
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {candidate.codePercentile !== undefined ? (
                    <h3>
                      Your Coding Percentile Is:{' '}
                      {(candidate.codePercentile * 100).toFixed(2)}%
                    </h3>
                  ) : (
                    <div></div>
                  )}
                  {candidate.codePercentile !== undefined ? (
                    <div className="progress-div" style={{ width: 300 }}>
                      <div
                        style={{ width: `${candidate.codePercentile * 300}px` }}
                        className="progress"
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
