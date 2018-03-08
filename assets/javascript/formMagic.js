


function FormApiPull(number, name, city, zipcode) {
  var numSet = number;
  var nameSet = name.split(" ").join("+");
  var citySet = city.split(" ").join("+");
  var zipSet = zipcode;
  url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
    numSet +
    nameSet.replace(" ", "+") +
    citySet.replace(" ", "+") +
    'NC' +
    zipSet +
    '&key=AIzaSyCF_LnSPL7yY5VIDbPCbBo9e03StuCuTTs';

}
  num.replace(" ", "+")
$('#entireForm').on('submit', function () {
  var number = $('#lostNumAddInput').val();
  var name = $('#lostNameAddInput').val();
  var city = $('#lostCityAddInput').val();
  var zip = $('#lostZipAddInput').val();
  FormApiPull(number, name, city, zip);
})