(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();
    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6 m3');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.Title
      });
      $title.tooltip({ delay: 50 }).text(movie.Title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.Poster,
        alt: `${movie.imdbID} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.imdbID}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.imdbID);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.Title);
      const $movieYear = $('<h6>').text(`Released in ${movie.Year}`);
      const $modalText = $('<p>').text(movie.Plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  var button = document.querySelector('button[type=submit]');
  var search = document.querySelector('#search');
  button.addEventListener('click', function(e){
    e.preventDefault();
    if(search.value === "") {
      return;
    } else {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function() {
        if (xhr.status !== 200) {
          return;
        }
        var data = JSON.parse(xhr.responseText);
        for(var i = 0; i<data.Search.length; i++) {
          movies.push(data.Search[i]);
        }
        renderMovies();
      });

      xhr.open('GET', 'https://omdb-api.now.sh/?s=star%20wars');
      xhr.send();
      search.value = "";
    }
  })
  
})();
