$('document').ready(function name(params) {
        var address = "https://dog.ceo/api/breeds/list"
        $.ajax({
            url: address,
            //on callback response...
            success: function(response) {
                console.log(response);
                //...save coordinates to address
                // var dogBreed = [];
                //for (var i=0; i < dogBreed.length; i++) {
                //append
                //}
            }
        })
    }
)