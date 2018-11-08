const axios = require('axios');

const getCuisineType = (dispatch, data) => {
  data.restaurants.forEach((e, i) => {
    e.cuisine_type = '';
    return axios.get(`http://localhost:9004/cuisine?url=${e.reserve_url}`)
    .then(res => {
      e.cuisine_type = res.data;
      if (i === data.restaurants.length-1) {
        dispatch({ type: 'COMPLETED' });
        return dispatch({ type: 'LOAD_RESTARAUNT', data: data });
      };
    })
    .catch(err => console.log(err));
  });
};

const getRestaraunts = params => {
  return dispatch => {
    axios.get(`http://opentable.herokuapp.com/api/restaurants?city=${params.city}`)
    .then(res => {
      // return dispatch({ type: 'LOAD_RESTARAUNT', data: res.data });
      return getCuisineType(dispatch, res.data)
    })
    .catch(err => console.log(err));
  };
};

// using es5 because of issues with mocha/testing
module.exports = { getRestaraunts };