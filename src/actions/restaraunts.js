const axios = require('axios');

const getCuisineType = (dispatch, data) => {
  data.restaurants.forEach((e, i) => {
    e.cuisine_type = '';
    axios.get(`http://localhost:9004/cuisine?url=${e.reserve_url}`)
      .then(res => {
        e.cuisine_type = res.data;
        if (i === data.restaurants.length-1) {
          dispatch({ type: 'COMPLETED' });
          return dispatch({ type: 'LOAD_RESTARAUNT', data });
        };
      })
      .catch(err => console.log(err));
  });
};

const getRestaraunts = params => dispatch => {
  axios.get(`http://opentable.herokuapp.com/api/restaurants?city=${params.city}`)
    .then(res => getCuisineType(dispatch, res.data))
    .catch(err => console.log(err));
};

module.exports = { getRestaraunts };