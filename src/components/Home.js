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

const THeader = ({ text, onClick }) => (
  <th style={header} onClick={onClick}>{text}</th>
);

const dollarSigns = num => ({
  1: '$',
  2: '$$',
  3: '$$$',
  4: '$$$$'
})[num];

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
                style={reservation}
                href={vals.mobile_reserve_url}
                target='_blank'
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
        <td style={rowDataCenter}>{vals.price}</td>
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
    // const { restaraunts } = this.props;
    const restaraunts = [
      {
      "id":138946,
      "name":"Tapas 218",
      "address":"218 Court Ave. NW",
      "city":"Canton",
      "state":"OH",
      "area":"Cleveland / Akron / Canton",
      "postal_code":"44702",
      "country":"US",
      "phone":"3304563888",
      "lat":40.799485,
      "lng":-81.375328,
      "price":2,
      "reserve_url":"http://www.opentable.com/single.aspx?rid=138946",
      "mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=138946",
      "image_url":"https://www.opentable.com/img/restimages/138946.jpg",
      "cuisine_type":"other"
    },{"id":112465,"name":"Lolita - A Michael Symon Restaurant","address":"900 Literary Rd","city":"Cleveland","state":"OH","area":"Cleveland / Akron / Canton","postal_code":"44113","country":"US","phone":"2167715652","lat":41.481689,"lng":-81.687116,"price":3,"reserve_url":"http://www.opentable.com/single.aspx?rid=112465","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=112465","image_url":"https://www.opentable.com/img/restimages/112465.jpg","cuisine_type":"other"},{"id":138901,"name":"Twiisted Bar & Grill","address":"985 Boardman Alley","city":"Medina","state":"OH","area":"Cleveland / Akron / Canton","postal_code":"44256","country":"US","phone":"330-661-0606x","lat":41.153419,"lng":-81.864608,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=138901","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=138901","image_url":"https://www.opentable.com/img/restimages/138901.jpg","cuisine_type":"other"},{"id":96892,"name":"Ken Stewart's Tre Belle","address":"1911 N. Cleveland Massillon Road","city":"Bath","state":"OH","area":"Cleveland / Akron / Canton","postal_code":"44333","country":"US","phone":"3306669990x","lat":41.187298,"lng":-81.635277,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=96892","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=96892","image_url":"https://www.opentable.com/img/restimages/96892.jpg","cuisine_type":"italian"},{"id":108532,"name":"Culinary Arts Restaurant","address":"492 McClurg Road","city":"Boardman","state":"OH","area":"Cleveland / Akron / Canton","postal_code":"44512","country":"US","phone":"3309655899","lat":40.995733,"lng":-80.64484,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=108532","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=108532","image_url":"https://www.opentable.com/img/restimages/108532.jpg","cuisine_type":"other"},{"id":25840,"name":"SASA","address":"13120 Shaker Square","city":"Cleveland","state":"OH","area":"Cleveland / Akron / Canton","postal_code":"44120","country":"US","phone":"2167671111","lat":41.483445,"lng":-81.591102,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=25840","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=25840","image_url":"https://www.opentable.com/img/restimages/25840.jpg","cuisine_type":"japanese"},{"id":136147,"name":"Spaghetti Warehouse - Akron","address":"510 S. Main St.","city":"Akron","state":"OH","area":"Cleveland / Akron / Canton","postal_code":"44311","country":"US","phone":"3303740025","lat":41.072751,"lng":-81.524823,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=136147","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=136147","image_url":"https://www.opentable.com/img/restimages/136147.jpg","cuisine_type":"italian"},{"id":106828,"name":"Bay Harbor","address":"1 Cedar Point Drive","city":"Sandusky","state":"OH","area":"Cleveland / Akron / Canton","postal_code":"44870","country":"US","phone":"4196256373x","lat":41.477769,"lng":-82.679062,"price":3,"reserve_url":"http://www.opentable.com/single.aspx?rid=106828","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=106828","image_url":"https://www.opentable.com/img/restimages/106828.jpg","cuisine_type":"italian"},{"id":110065,"name":"LAGO Cucina Enotecca and Birreria","address":"1091 W. 10th St.","city":"Cleveland","state":"OH","area":"Cleveland / Akron / Canton","postal_code":"44113","country":"US","phone":"2168628065","lat":41.500809,"lng":-81.703332,"price":3,"reserve_url":"http://www.opentable.com/single.aspx?rid=110065","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=110065","image_url":"https://www.opentable.com/img/restimages/110065.jpg","cuisine_type":"italian"},{"id":90433,"name":"D'Agnese's at White Pond","address":"566 White Pond Drive","city":"Akron","state":"OH","area":"Cleveland / Akron / Canton","postal_code":"44320","country":"US","phone":"2346783612x","lat":41.101381,"lng":-81.586795,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=90433","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=90433","image_url":"https://www.opentable.com/img/restimages/90433.jpg","cuisine_type":"italian"},{"id":107134,"name":"Crush - Sandusky","address":"145 Columbus Ave.","city":"Sandusky","state":"OH","area":"Cleveland / Akron / Canton","postal_code":"44870","country":"US","phone":"4195029463x2","lat":41.45646,"lng":-82.712392,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=107134","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=107134","image_url":"https://www.opentable.com/img/restimages/107134.jpg","cuisine_type":"italian"},{"id":112477,"name":"Nighttown","address":"12387 Cedar Ave","city":"Cleveland Heights","state":"OH","area":"Cleveland / Akron / Canton","postal_code":"44106","country":"US","phone":"2167950550","lat":41.501006,"lng":-81.59614,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=112477","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=112477","image_url":"https://www.opentable.com/img/restimages/112477.jpg","cuisine_type":"italian"},{"id":103036,"name":"North Coast Cafe","address":"9801 Carnegie Avenue","city":"Cleveland","state":"OH","area":"Cleveland / Akron / Canton","postal_code":"44106","country":"US","phone":"2167074051x","lat":41.501782,"lng":-81.619722,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=103036","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=103036","image_url":"https://www.opentable.com/img/restimages/103036.jpg","cuisine_type":"italian"},{"id":90835,"name":"D.B.A.","address":"21 Furnace Street","city":"Akron","state":"OH","area":"Cleveland / Akron / Canton","postal_code":"44308","country":"US","phone":"3303755050x","lat":41.088834,"lng":-81.515739,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=90835","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=90835","image_url":"https://www.opentable.com/img/restimages/90835.jpg","cuisine_type":"italian"},{"id":29239,"name":"Parallax Restaurant & Lounge","address":"2179 W. Eleventh St.","city":"Cleveland","state":"OH","area":"Cleveland / Akron / Canton","postal_code":"44113","country":"US","phone":"2165839999","lat":41.482446,"lng":-81.689343,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=29239","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=29239","image_url":"https://www.opentable.com/img/restimages/29239.jpg","cuisine_type":"japanese"},{"id":4465,"name":"Pier W","address":"12700 Lake Avenue","city":"Cleveland","state":"OH","area":"Cleveland / Akron / Canton","postal_code":"44107","country":"US","phone":"2162282250","lat":41.492507,"lng":-81.779029,"price":3,"reserve_url":"http://www.opentable.com/single.aspx?rid=4465","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=4465","image_url":"https://www.opentable.com/img/restimages/4465.jpg","cuisine_type":"japanese"},{"id":86371,"name":"Shuhei","address":"23360 Chagrin Blvd","city":"Beachwood","state":"OH","area":"Cleveland / Akron / Canton","postal_code":"44122","country":"US","phone":"2164641720","lat":41.463769,"lng":-81.514266,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=86371","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=86371","image_url":"https://www.opentable.com/img/restimages/86371.jpg","cuisine_type":"japanese"},{"id":93931,"name":"Crave - Akron","address":"57 E. Market St.","city":"Akron","state":"OH","area":"Cleveland / Akron / Canton","postal_code":"44308","country":"US","phone":"3302531234","lat":41.085025,"lng":-81.515763,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=93931","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=93931","image_url":"https://www.opentable.com/img/restimages/93931.jpg","cuisine_type":"other"},{"id":106723,"name":"3 Point","address":"45 East Market Street","city":"Akron","state":"OH","area":"Cleveland / Akron / Canton","postal_code":"44308","country":"US","phone":"3305356410x","lat":41.084979,"lng":-81.516162,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=106723","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=106723","image_url":"https://www.opentable.com/img/restimages/106723.jpg","cuisine_type":"other"},{"id":148297,"name":"The Barn","address":"1370 East Johnstown Road","city":"Gahanna","state":"OH","area":"Columbus","postal_code":"43230","country":"US","phone":"6148559840x","lat":40.053247,"lng":-82.842592,"price":3,"reserve_url":"http://www.opentable.com/single.aspx?rid=148297","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=148297","image_url":"https://www.opentable.com/img/restimages/148297.jpg","cuisine_type":"italian"},{"id":148096,"name":"Hinkley's","address":"318 E. 5th Street","city":"Marysville","state":"OH","area":"Columbus","postal_code":"43040","country":"US","phone":"9375539030x","lat":40.236685,"lng":-83.36356,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=148096","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=148096","image_url":"https://www.opentable.com/img/restimages/148096.jpg","cuisine_type":"other"},{"id":140680,"name":"The Inn at Cedar Falls","address":"21190 State Route 374","city":"Logan","state":"OH","area":"Columbus","postal_code":"43138","country":"US","phone":"7403807489","lat":39.424712,"lng":-82.525425,"price":3,"reserve_url":"http://www.opentable.com/single.aspx?rid=140680","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=140680","image_url":"https://www.opentable.com/img/restimages/140680.jpg","cuisine_type":"other"},{"id":93331,"name":"Ella Restaurant + Bar","address":"266 East Main St","city":"New Albany","state":"OH","area":"Columbus","postal_code":"43054","country":"US","phone":"6148554600x","lat":40.084033,"lng":-82.804884,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=93331","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=93331","image_url":"https://www.opentable.com/img/restimages/93331.jpg","cuisine_type":"other"},{"id":117997,"name":"Hudson 29","address":"1600 West Lane Ave","city":"Upper Arlington","state":"OH","area":"Columbus","postal_code":"43221","country":"US","phone":"6144870622x","lat":40.00714,"lng":-83.052257,"price":3,"reserve_url":"http://www.opentable.com/single.aspx?rid=117997","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=117997","image_url":"https://www.opentable.com/img/restimages/117997.jpg","cuisine_type":""},{"id":113356,"name":"Rickshaw Thai","address":"11310 Jackson Dr.","city":"The Plains","state":"OH","area":"Columbus","postal_code":"45780","country":"US","phone":"7408569502x","lat":39.364218,"lng":-82.117676,"price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=113356","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=113356","image_url":"https://www.opentable.com/img/restimages/113356.jpg","cuisine_type":"other"}]
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
