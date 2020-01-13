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

const rowDataCenter = {
  padding: '1rem',
  textAlign: 'center'
};

const label = { fontSize: '2.8rem' };

const header = { cursor: 'pointer' };

const rowFormatting = {
  display: 'flex',
  flexDirection: 'row'
};

const expandedRowData = {
  padding: '1rem',
  display: 'inline-flex',
  flexDirection: 'column'
};

const reservation = {
  color: '#fff',
  fontWeight: 700 
};

const dollarSigns = num => ({
  1: '$',
  2: '$$',
  3: '$$$',
  4: '$$$$'
})[num];

const THeader = ({ text, onClick }) => (
  <th style={header} onClick={onClick}>{text}</th>
);

const Row = ({ i, vals, selected, selectRow }) => {
  const rowStyle = i % 2 === 0 ? rowAlt : row;
  return (
    i === selected
      ? (
      <tr key={vals.id} onClick={selectRow(i)} style={rowStyle}>
        <td style={rowData} colspan="4">
          <div style={rowFormatting}>
            <img src={vals.image_url} alt='Image Not Found' height='200' width='200' />
            <div style={expandedRowData}>
              <h3>{vals.name} - {dollarSigns(vals.price)}</h3>
              <span>Cuisine: {vals.cuisine_type}</span>
              <span>Address: {vals.address}, {vals.city} {vals.state}, {vals.country}, {vals.postal_code}}</span>
              <a
                target='_blank'
                style={reservation}
                href={vals.mobile_reserve_url}
              >
                Make a Reservation Today
              </a>
            </div>
          </div>
        </td>
      </tr>
      ) : (
      <tr key={vals.id} onClick={selectRow(i)} style={rowStyle}>
        <td style={rowData}>{vals.name}</td>
        <td style={rowData}>
          {vals.address}, {vals.city} {vals.state}, {vals.country}, {vals.postal_code}
        </td>
        <td style={rowDataCenter}>{vals.cuisine_type}</td>
        <td style={rowDataCenter}>{dollarSigns(vals.price)}</td>
      </tr>
    )
  );
};

class Home extends Component {
  state = {
    city: '',
    filter: null,
    selected: null,
    restaraunts: []
  };

  loadRestaraunt = e => {
    e.preventDefault();
    this.props.dispatch({ type: 'LOADING' });
    this.props.dispatch(getRestaraunts({ city: this.state.city }));
  };

  filterResults = filter => () => {
    this.setState({ filter });
    const { restaraunts } = this.props;
    if (restaraunts) {
      return restaraunts.sort((a, b) => {
        if (a[filter] > b[filter]) return 1;
        if (a[filter] < b[filter]) return -1;
        return 0;
      });
    }
  }

  handleChange = e => this.setState({ city: e.target.value });

  selectRow = selected => ()  => this.setState({ selected });

  componentWillReceiveProps = ({ restaraunts }) => {
    const { filter } = this.state;
    if (restaraunts) {
      if (filter) {
        this.setState({
          restaraunts: restaraunts.sort((a, b) => {
            if (a[filter] > b[filter]) return 1;
            if (a[filter] < b[filter]) return -1;
            return 0;
          })
        });
      }
    }
  }

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
              <THeader
                text={'Name'}
                onClick={this.filterResults('name')}
              />
              <THeader
                text={'Address'}
                onClick={this.filterResults('address')}
              />
              <THeader
                text={'Cuisine'}
                onClick={this.filterResults('cuisine_type')}
              />
              <THeader
                text={'Price Level'}
                onClick={this.filterResults('price')}
              />
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
            : restaraunts && restaraunts.map((res, i) => (<Row
                i={i}
                vals={res}
                key={res.id}
                selectRow={this.selectRow}
                selected={this.state.selected}
              />))
          }
          </tbody>
        </table>
      </div>
    );
  };
};

const mapStateToProps = state => ({
  loading: state.loading.loading,
  restaraunts: state.restaraunts.restaurants
});

export default connect(mapStateToProps)(Home);
