var Trackster = {};
$(document).ready(function() {

  $('#search-button').click(function() {
    Trackster.searchTracksByTitle($('#search-text').val());
  });

  $('#search-text').keypress(function(e) {
    if(e.which === 13) {
      $('#search-button').click();
    }
  });
});


/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
$('#song-list').empty();
for (var trackList = 0; trackList < tracks.length; trackList++) {
var trackRow =
  '<div class="row list-row">' +
  '  <a href="' + tracks[trackList].preview_url + '"target="_blank">' +
  '    <i class="fa fa-play-circle-o fa-2x col-xs-1 col-xs-offset-1" aria-hidden="true"></i>' +
  '  </a>' +
  '  <h2 class="col-xs-4">' + tracks[trackList].name + '</h2>' +
  '  <h2 class="col-xs-2">' + tracks[trackList].artists[0].name + '</h2>' +
  '  <h2 class="col-xs-2">' + tracks[trackList].album.name + '</h2>' +
  '  <h2 class="col-xs-2">' + tracks[trackList].popularity + '</h2>' +
  '</div>';
  $('#song-list').append(trackRow);
}
};

/*
  Given a search term as a string, query the Spotify API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: 'https://api.spotify.com/v1/search?type=track&q=' + title,
    success: function(response) {
      Trackster.renderTracks(response.tracks.items);
    }
  });
};
