var audioObject = new Audio();

$('body').on('click', '.album', function (e) { 
	console.log(this);
	console.log($(this).data('album-id'))

	let album = $(this).data('album-id')
	let artist = $(this).data('artist-name')
	let preview = $(this).data('')

	let data = {
	    album: album,
	    artist: artist
	}
	console.log(data);

	$.post("/tracks", data, function(result){
        	console.log(result);
        	//$('.results').html(result.data);
        	//loopThroughVid(result.data);
        	audioObject.pause();
        	audioObject = new Audio(result.data[0].preview_url); //create a new audio object using the data returned from Spotify.com
			audioObject.play(); //play the song!!!
    	});   
    });


//functionality to toggle the play button
$('.results').on('click', '.js-play-toggle', function(){

	/*let playing = false;
	if(playing === false){
		playing = true;
		audioObject.play();
	}else{
		playing = false;
		audioObject.pause();
		console.log('toggle is set to true');
	}
	console.log('play button clicked');*/

});

//functionality to list previously searched countries
	//track and log country codes based on the user's Input history
	//create an array
	//on submission, pass country string and push to array
	//display array items in a list on webpage

$(function(){
	const recentSearch = [];

    /*$("form").submit(function(event) {
	    event.preventDefault();
	    
	    const userInput = $(".searchBox").val();
	    let historyHTML= '';
	    
	    
	    //clear the text from input box
	    $(".searchBox").val('');
	    
	    //add item to list
	    console.log(`add ${userInput} to list`);
	    console.log('Submit Event Listener is working!');
	    recentSearch.push(userInput);
	    console.log(recentSearch);
	    historyHTML += `${recentSearch}`;
  	});*/
 
});

//<iframe src="https://open.spotify.com/embed?uri=${data[i].uri}" width="300" height="380" frameborder="0" allowtransparency="true"></iframe><br>`;