//   ____    ____  _       ____  _____ __ __    ___  ____  
//  |    \  /    || |     /    |/ ___/|  |  |  /  _]|    \ 
//  |  o  )|  o  || |    |  o  (   \_ |  |  | /  [_ |  D  )
//  |    < |     || |___ |     |\__  ||  _  ||    _]|    / 
//  |  o  \|  _  ||     ||  _  |/  \ ||  |  ||   [_ |    \ 
//  |      |  |  ||     ||  |  |\    ||  |  ||     ||  .  \
//  |_____/|__|__||_____||__|__| \___||__|__||_____||__|\_|

// *******Giphy API Directive*******
// Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. 
// Save it to a variable called topics.

// We chose animals for our theme, but you can make a list to your own liking.

// Your app should take the topics in this array and create buttons in your HTML.
// Try using a loop that appends a button for each string in the array.

// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// Under every gif, display its rating (PG, G, so on).

// This data is provided by the GIPHY API.
// Only once you get images displaying with button presses should you move on to the next step.

// Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.


$(document).ready(function () {

  //Array of animals for
  let topics = ['cats', 'dogs', 'birds', 'elephant', 'seal', 'fish', 'lion', 'bison', 'deer', 'tiger'];
  
  //For loop to add buttons to the page using the values from topics array
  
  function createAnimalBtns() {
    for (let i = 0; i < topics.length; i++) {
      let animalBtn = $('<button>');
      animalBtn.addClass('btn btn-success m-2 animal-button');
      animalBtn.attr({'data-animal': topics[i], 'type': 'button'})
      animalBtn.text(topics[i]);
      $('#animal-buttons').append(animalBtn);
    }};

  createAnimalBtns();

  $('#add-animal').on('click', function(event) {
    event.preventDefault();
    let newAnimal = $('#animal-input').val();
    topics.push(newAnimal);
    $('#animal-buttons').empty();
    createAnimalBtns();
  });

  // On click function that gets data attribute 'data-animal' adds it to the queryURL
  $('#animal-buttons').on('click', '.animal-button', function() {
    $('#animal-images').empty();
    let btnChoice = ($(this).attr('data-animal'));
    let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=QJFjBGH5qeVc3rF8o3OfyPgHBTUGkJ0O&q=" + btnChoice + "&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(queryURL);
    console.log(response);
    console.log(btnChoice);
    
    for (let j = 0; j < (response.data).length; j++) {
      $('#animal-images').append(`    
        <div class="card m-2" style="width: 18rem;">
          <img class="card-img-top" src="${response.data[j].images.fixed_height_still.url}" alt="${response.data[j].title}" data-alt="${response.data[j].images.fixed_height.url}">
          <div class="card-body">
            <h5 class="card-title">${response.data[j].title}</h5>
            <p class="card-text">Rating: ${response.data[j].rating}</p>
            <p class="card-text">Score: ${response.data[j]._score}</p>
          </div>
        </div>`);
    };
  });
  });

    // On click function that replaces static image with animated image
    // **************************************************************************************************
  // Get the .gif images from the "data-alt".
	let getGif = function() {
		let gif = [];
		$('img').each(function() {
			let data = $(this).data('alt');
			gif.push(data);
		});
		return gif;
	}

	let gif = getGif();

	// Preload all the gif images.
	let image = [];

	$.each(gif, function(index) {
		image[index]     = new Image();
		image[index].src = gif[index];
	});

	// Change the image to .gif when clicked and vice versa.
	$('#animal-images').on('click', '.card', function() {

		let $this   = $(this),
				$index  = $this.index(),
				
				$img    = $this.children('img'),
				$imgSrc = $img.attr('src'),
				$imgAlt = $img.attr('data-alt'),
				$imgExt = $imgAlt.split('/');
        console.log($imgExt);
        
		if ($imgExt[5] === '200.gif') {
			$img.attr('src', $img.data('alt')).attr('data-alt', $imgSrc);
		} else {
			$img.attr('src', $imgAlt).attr('data-alt', $img.data('alt'));
		}

		// Add play class to help with the styling.
		$this.toggleClass('play');

	});

// **************************************************************************************************





});