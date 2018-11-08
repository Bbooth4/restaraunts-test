# SETUP

npm i
npm run dev - will run the express server as well as the frontend

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

To solve this, I created an express server (since the url CORS policy blocked 
incoming requests from the browser that were found within reserve_url) I then
used regex to search for a list of possible cuisine types within the stringified
html such as chinese, thai, italian, mediterranean, etc. Other means that the
link lead to a 404 page or was simply not provided. I know that simply searching
for keywords is rudimentary but it should suffice for the purposes of this project.

1. I spent around 6 hours on this project. I wasted at least 1 hour of that 
trying figure out why I was being rejected by the originally provided 
api (https://public.je-apis.com/restaurants) by trying postman, my server, axios 
and fetch. Same error related to insufficient credentials occurred with all of them.
It also took longer to complete due to the addition of the express server. I did 
style the site a little but to a very basic level. Inline was used for convenience.

I would improve the styling and enhance the api call from the server to be advanced
for cuisine types. I would also animate the LOADING placeholder as well as adding
popup notification for errors. I would also add pagination since some of the cities
return more than the default 25.

2. Async/Await is the most useful new feature in JavaScript. If wraps everything in
something that resembles a promise and forces every to function synchronously as
as long as the value returns a promise.

In the past, I have used Async/Await like so:

let result;
let result2;

try {
  result = await this.functionThatReturnsAPromise() // uneeded for this project unfortunately, standard promises works fine
  result2 = await this.otherFunction // it waits for this as well, they can be stacked, if one fails, they all fail
} catch(err) {
  console.log(err)
};

return { result, result2 };

3. If there are any console.logs remaining in the backend code, then I will check
those to see what is logged. I will also checkout the staging deployment and test
the supposed error to see if I can recreate it since there will be logs for certain
in that verison.

4. I would implement a theming system to keep the styles consistent throughout the application.

The table row would be a separate component which is rendered in the loop.

I would improve the regex for checking keywords and the total return value at the
/cuisine endpoint.

5. Myself described in JSON
{
  "Always": "striving to improve my code",
  "Learning": "new technologies to better improve my knowledge base",
  "Prefer": "single 'quotes'and `backticks` "
}


