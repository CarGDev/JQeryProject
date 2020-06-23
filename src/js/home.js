// Definiendo las constantes
const $modal = document.getElementById('modal');
const $overlay = document.getElementById('overlay');
const $hideModal = document.getElementById('hide-modal');

const $actionContainer = document.querySelector('#action');
const $dramaContainer = document.querySelector('#drama');
const $animationContainer = document.querySelector('#animation');

const $featuringContainer = document.querySelector('featuring');
const $form = document.querySelector('form');
const $home = document.querySelector('#home');

const $modalTitle = $modal.querySelector('h1');
const $modalImage = $modal.querySelector('img');
const $modalDescription = $modal.querySelector('p');
// Terminando de definir las constantes

(async function load() {
  // await
  async function getData (url) {
    const response = await fetch(url);
    const data = await response.json()
    return data;
  }

  $form.addEventListener('submit', (event) => {
    // debugger
    event.preventDefault();
    $home.classList.add('search-active')
    const $loader = document.createElement('img');
  })

  const URLPAGE = 'https://yts.mx/api/v2/list_movies.json?genre='
  const actionList = await getData(URLPAGE + 'action')
  const dramaList = await getData(URLPAGE + 'drama')
  const animationList = await getData(URLPAGE + 'animation')
  console.log(actionList, dramaList, animationList);
  // debugger

  function videoTemplate(movie) {
    return (
      `<div class="primaryPlaylistItem">
      <div class="primaryPlaylistItem-image">
      <img src="${movie.medium_cover_img}">
      </div>
      <h4 class="primaryPlaylistItem-title">
      ${movie.title}
      </h4>
      </div>`
      )
  }

  function addEventListener($element){
    $element.addEventListener('click', function() {
      showModal()
    })
  }

  function createTemplate (HTMLString) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }

  function renderMovieList (list, $container) {
    // actionList.data.movies
    if($container.children[0]){
      $container.children[0].remove();
    }
    list.forEach((movie) => {
      const HTMLString = videoTemplate(movie);
      const movieElement = createTemplate(HTMLString);
      $container.append(movieElement);
      addEventListener(movieElement);
    })
  }

  renderMovieList(actionList.data.movies, $actionContainer)
  renderMovieList(dramaList.data.movies, $dramaContainer)
  renderMovieList(animationList.data.movies, $animationContainer)

  function showModal() {
    $overlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards';
  }

  $hideModal.addEventListener('click', hideModal);
  function hideModal() {
    $overlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards';
  }

}) ()