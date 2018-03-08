//Initialize firebase
var config = {
  apiKey: "AIzaSyAWGMdRh9ilJ6IqAM2fp4pU6pA9JoYKibE",
  authDomain: "comehome-22679.firebaseapp.com",
  databaseURL: "https://comehome-22679.firebaseio.com",
  projectId: "comehome-22679",
  storageBucket: "",
  messagingSenderId: "458156685398"
};

firebase.initializeApp(config);

//Pulls infro from form in order to build an apicall URL
function FormApiPull(number, name, city, zipcode) {
  var numSet = number.split(" ").join("+") + ',';
  var nameSet = name.split(" ").join("+") + ',+';
  var citySet = city.split(" ").join("+") + ',+';
  var zipSet = zipcode.split(" ").join("+");
  address = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
    numSet +
    nameSet +
    citySet +
    'NC+' +
    zipSet +
    '&key=AIzaSyCF_LnSPL7yY5VIDbPCbBo9e03StuCuTTs';
  console.log(address);
  return address;
}

//On submittion of form
$(document).on('submit', '#entireForm', function (event) {
  //prevent reloading of page
  event.preventDefault();
  //create url pieces
  var number = $('#lostNumAddInput').val();
  var name = $('#lostNameAddInput').val();
  var city = $('#lostCityAddInput').val();
  var zip = $('#lostZipAddInput').val();
  //call previous sleeping function
  FormApiPull(number, name, city, zip);

  //ajax call to built URL
  $.ajax({
    url: address,
    //on callback response...
    success: function (response) {
      //...save coordinates to address
      var lat = response.results[0].geometry.location.lat;
      var lng = response.results[0].geometry.location.lng;
    }
  })
})