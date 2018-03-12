$('document').ready(function () {
  var address = 'https://dog.ceo/api/breeds/list'

  $.ajax({
    url: address,
    //on callback response...
    success: function (response) {
      //log readable response
      console.log(response.message);
      // for every iteration...
      for (i = 0; i < response.message.length; i++) {
        //...assign a new breed...
        breed = response.message[i];
        //..call a new function...
        CreateBreedList(breed, i)
      }
    }
  })
})
// ...store the information of each iteration num & each breed...
function CreateBreedList(breed, i) {
  var picture;
  //...build a url for the new breed...
  var address2 = "https://dog.ceo/api/breed/" + breed + "/images";
  $.ajax({
    //...call the new breed picture...
    url: address2,
    success: function (response) {
      console.log(response.message[0]);
      //...find picture of the new breed...
      picture = response.message[0];
      //...build structure...
/*       var spawnBreedRow = "<div class='row'>" +
        "<div class='dogData' col s6>" +
        "<img class='importImg' src='" + picture + "' alt='photo" + i + "'>" +
        "<p class='dogDataName light-green darken-3 white-text'>" + breed + '</p>' +
        "</div>" +
        "</div>"; */

      var spawnBreedRow = "<div class='dogData col s6 m4 l3'>" +
        "<img class='importImg' src='" + picture + "' alt='Photo" + i + "'>" +
        "<p class='dogDataName light-green darken-3 white-text'>" + breed + "</p>" + 
        "</div>";

      //..and finally apppend each breed...
      div = document.getElementById('breedContainer');
      div.insertAdjacentHTML('beforeend', spawnBreedRow);
    }
  })
}