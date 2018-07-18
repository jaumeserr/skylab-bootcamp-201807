// my presentation logic

// optional, reduce the size of the restaurants loaded in memory
// restaurants.splice(100);

var search = new SearchPanel();

search.onSearch(function (query) {
    logic.searchArtists(query)
        .then(function (artists) {
            results.updateResults(artists.map(function (artist) {
                return {
                    id: artist.id,
                    text: artist.name
                };
            }));

            detailContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });

});

var results = new ResultsList();

//var DEFAULT_IMAGE = 'https://i.pinimg.com/originals/37/2a/2d/372a2d5e8a32991bb19982271d0762fe.jpg';

results.onItemClick(function (id) {
    logic.retrieveAlbumsByArtistId(id)
        .then(function (albums) {
            albumsResults.updateResults(albums.map(function (album) {
                return {
                    id: album.id,
                    text: album.name
                };
            }));

            detailContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });

});
var albumsResults = new ResultsList();

albumsResults.onItemClick(function (id) {
    logic.retrieveTracksByAlbumId(id)
        .then(function (tracks) {
            tracksResults.updateResults(tracks.map(function (track) {
                return {
                    id: track.id,
                    text: track.name,
                 
                };
            }));

            detailContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });


});

var tracksResults = new ResultsList();


tracksResults.onItemClick(function (id) {
    logic.retrieveTrackById(id, function (tracks) {
        
        var detail = new DetailPanel(tracks.name, tracks.preview_url);

        //detailContainer.clear();
        //detailContainer.appendChild(detail.element);
        var player= new DetailPanel(track.id);

        

    });


});




var detailContainer = document.createElement('div');

detailContainer.clear = function () {
    this.innerHTML = '';
};



document.body.appendChild(search.element);
document.body.appendChild(results.element);
document.body.appendChild(detailContainer);
document.body.appendChild(albumsResults.element);
document.body.appendChild(tracksResults.element);


