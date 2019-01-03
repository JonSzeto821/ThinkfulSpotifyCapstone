var audioObject = new Audio();
let play = false;
let playingSong = null;


$('body').on('click', '.album', function(e) {
	if(!play){
		audioObject.pause();
		if(playingSong == $(this).data('album-id')){
			return;
		}
	}

	playingSong = $(this).data('album-id');

	let album = $(this).data('album-id')
	let artist = $(this).data('artist-name')
	let preview = $(this).data('')
	let t = this;

	let data = {
	    album: album,
	    artist: artist
	}

	$.post("/tracks", data, (result, status, xhr) => {
    for(let i = 0; i < result.data.length; i++){
			if(result.data[i].preview_url !== null){
    		audioObject.pause();
    		audioObject = new Audio(result.data[i].preview_url);
				audioObject.play();

				return;
			}
  	}

    play = false;
		var bar = new $.peekABar({
			html: 'Oh no! There\'s no Music!!!!!',
			backgroundColor: 'red',
			autohide: true,
		});
		bar.show();
		$(t).find('button').remove();
		window.t = t;
  	});
});

$('.results').on('click', '.js-play-toggle', () => {
	play = !play;
});

$(() => {
	const recentSearch = [];

  $("form").submit(event => {
    event.preventDefault();
    codeAddress();

    const userInput = $(".searchBox").val().toUpperCase();
    let titleDisplay = $(".searchBox").val().toLowerCase();
    let historyHTML= '';
		let titleRender= '';

    $(".searchBox").val('');

    titleRender += `<h2>Top Artists for <span class="capitalize">${titleDisplay}</span></h2>`;
    $('#countryRender').html(titleRender);

    recentSearch.push(userInput);
    for(let i=0; i < recentSearch.length; i++){
    	historyHTML += `<div class="js-recentCountry recentCountry">${recentSearch[i]}</div>`;
    }

    $('#previouslySearched').html(historyHTML);
	});

 	$('#previouslySearched').on('click', '.js-recentCountry', function(){
 		codeAddress($(this).text()).toUpperCase();
 	});
});

$(document).ready(function() {
  $('.results').on('click', '.button', function() {
    $(this).toggleClass("paused");
  });
});
