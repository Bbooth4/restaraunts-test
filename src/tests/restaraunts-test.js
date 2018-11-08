const expect = require("chai").expect;
const assert = require("chai").assert;
const getCuisineType = require('../actions/restaraunts');
const getRestaraunts = require('../actions/restaraunts');
const request = require('supertest');

const array = [
  {
    address: "1 Benvenuto Place",
    area: "Toronto / SW Ontario",
    city: "Toronto",
    country: "CA",
    cuisine_type: "italian",
    id: 21307,
    image_url: "https://www.opentable.com/img/restimages/21307.jpg",
    lat: 43.68207,
    lng: -79.40041,
    mobile_reserve_url: "http://mobile.opentable.com/opentable/?restId=21307",
    name: "Scaramouche Restaurant",
    phone: "4169618011",
    postal_code: "M4V 2L1",
    price: 4,
    reserve_url: "http://www.opentable.com/single.aspx?rid=21307",
    state: "ON"
  }
];

describe('Array', function() {
  it('it should contain keys name, country, postal_code, city, address, state', function(done) {
    expect(array[0]).to.have.any.keys('name', 'country', 'postal_code', 'city', 'address', 'state');
    done();
  });
});

describe('loading express', function() {
  let app;
  beforeEach(function() {
    app = require('../../server');
  });
  it('responds to /', function testSlash(done) {
  request(app.app)
    .get('/')
    .expect(200, done);
  });
  it('responds to /cuisine', function testSlash(done) {
    request(app.app)
      .get('/cuisine?url=http://www.opentable.com/single.aspx?rid=21307')
      .expect(200, done);
    });
  it('404 everything else', function testPath(done) {
    request(app.app)
      .get('/foo')
      .expect(404, done);
  });
});
