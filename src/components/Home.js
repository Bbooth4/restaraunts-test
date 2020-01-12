import React, { Component } from "react";
import { connect } from "react-redux";
import { getRestaraunts } from '../actions/restaraunts';

const margin = { padding: '5rem', maxWidth: '100%' };

const button = {
  color: '#fff',
  padding: '1rem',
  cursor: 'pointer',
  marginBottom: '2rem',
  background: '#4286f4',
  border: '1px solid #4286f4',
  borderRadius: '0px 5px 5px 0px'
};

const search = {
  width: '100%',
  padding: '1rem',
  cursor: 'pointer',
  marginBottom: '2rem',
  border: '1px solid #4286f4',
  margin: '2rem 0rem 2rem 1rem',
  borderRadius: '5px 0px 0px 5px'
};

const form = {
  width: '100%',
  display: 'inline-flex',
  alignItems: 'baseline'
};

const row = {
  color: '#fff',
  borderRadius: 5,
  cursor: 'pointer',
  background: '#80b3ff',
  borderBottom: '1px solid #80b3ff'
};

const rowAlt = {
  color: '#fff',
  borderRadius: 5,
  cursor: 'pointer',
  marginBottom: '2rem',
  background: '#4d94ff',
  border: '1px solid #4d94ff'
};

const rowData = { padding: '1rem' };

const rowDataEnd = {
  padding: '1rem',
  textAlign: 'center'
};

const label = {
  fontSize: '2.8rem'
};

class Home extends Component {
  state = {
    city: ''
  };

  cuinsineType = e => {}

  loadRestaraunt = e => {
    e.preventDefault();
    this.props.dispatch({ type: 'LOADING' });
    this.props.dispatch(getRestaraunts({ city: this.state.city }));
  };

  handleChange = e => this.setState({ city: e.target.value });

  render() {
    const { restaraunts } = this.props;
    return (
      <div style={margin}>
        <form onSubmit={this.loadRestaraunt}>
          <div style={form}>
            <label style={label}>
              City:
            </label>
            <input style={search} type="text" value={this.state.city} onChange={this.handleChange} />
            <input type="submit" value="Submit" style={button} />
            { this.props.loading && <span style={{paddingLeft: '1rem'}}>LOADING</span> }
          </div>
        </form>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Cuisine</th>
              <th>Price Level</th>
            </tr>
          </thead>
          <tbody>
          {
            !restaraunts || (restaraunts && restaraunts.length < 0)
            ? <tr>
                <td></td>
                {
                  restaraunts && restaraunts.length < 0
                  ? <td>That city could not be found</td>
                  : <td>No city is selected</td>
                }
                <td></td>
              </tr>
            : restaraunts && restaraunts.map((res, i) => (
              <tr key={res.id} style={i % 2 === 0 ? rowAlt : row}>
                <td style={rowData}>{res.name}</td>
                <td style={rowData}>
                  {res.address}, {res.city} {res.state}, {res.country}, {res.postal_code}
                </td>
                <td style={rowData}>{res.cuisine_type}</td>
                <td style={rowDataEnd}>{res.price}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    restaraunts: state.restaraunts.restaurants,
    loading: state.loading.loading
  };
};

export default connect(mapStateToProps)(Home);
