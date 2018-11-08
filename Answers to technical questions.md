The only thing provided by the api http://opentable.herokuapp.com/api/restaurants is the following:

{
  address: "1 Benvenuto Place"
  area: "Toronto / SW Ontario"
  city: "Toronto"
  country: "CA"
  id: 21307
  image_url: "https://www.opentable.com/img/restimages/21307.jpg"
  lat: 43.68207
  lng: -79.40041
  mobile_reserve_url: "http://mobile.opentable.com/opentable/?restId=21307"
  name: "Scaramouche Restaurant"
  phone: "4169618011"
  postal_code: "M4V 2L1"
  price: 4
  reserve_url: "http://www.opentable.com/single.aspx?rid=21307"
  state: "ON"
}

As you can see, cuisine_type is not found within the retreived data and so it is not available.

I was created a GET call to grad data from reverse_url but was blocked by the
selected sites CORS policy, so was unable retreive the daya. The plan was to use
regex to search for a list of possible cuisine types within the stringified html
such as chinese, thai, italian, bbq, etc.

1. I spent around 4 hours on this project. I wasted at least 1 hour of that trying figure out why I was being rejected by the originally provided api ( https://public.je-apis.com/restaurants) but trying postman, axios and fetch. Same error related to insufficient credentials