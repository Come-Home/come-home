function MarkerMaker(params) {
  $.ajax({
    url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=35.7796,-78.6382&radius=50000&keyword=animal+shelter&key=AIzaSyACOxLIpykmTiwDObiHTzYw1T3n2uCrCOI",
    success: function (response) {
      console.log(response)
      var location = response
      for (let i = 0; i < location.length; i++) {
        console.log(location.results[i].geometry.location);
        console.log(location.results[i.name]);
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: map
        })
      }
    }
  })
}