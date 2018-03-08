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

$(document).on('submit', '#entireForm', function (event) {
  event.preventDefault();
  var number = $('#lostNumAddInput').val();
  var name = $('#lostNameAddInput').val();
  var city = $('#lostCityAddInput').val();
  var zip = $('#lostZipAddInput').val();
  FormApiPull(number, name, city, zip);

  $.ajax({
    url: address,
    success: function (response) {
      console.log(response.results[0].geometry.location);
    }
  })


})