// spotify.js
console.log('spotify.js OK');
const CLIENT_ID = '937353f06aef460ba7f081e75d4dd0bf';
const SCOPE = 'user-read-private%20user-read-email';
const RESPONSE_TYPE = 'token';
const REDIRECT_URI = 'http://localhost:8080/callback/';
const URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=${RESPONSE_TYPE}`;

document.querySelector('button#login').addEventListener('click', function(e) {
    window.location = URL;
});

if (sessionStorage['token']) {
    const BEARER = sessionStorage['token'];
    const HEADERS = new Headers({
        'Authorization': `Bearer ${BEARER}`
    });
    const OPTIONS = {headers: HEADERS};
    const ENDPOINT = 'https://api.spotify.com/v1/me';
    fetch(ENDPOINT, OPTIONS).then(function(response) {
        return response.json();
    }).then(function(json) {
        console.dir(json);
        document.querySelector('div#usuario').textContent = json.display_name;
    });
}

const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const artista = form.artista.value;
    console.log(artista);
    const BEARER = sessionStorage['token'];
    if ( ! BEARER) throw new Error('não está logado');
    const HEADERS = new Headers({
        'Authorization': `Bearer ${BEARER}`
    });
    const OPTIONS = {headers: HEADERS};
    const ENDPOINT = `https://api.spotify.com/v1/artists/${artista}`;
    fetch(ENDPOINT, OPTIONS).then(function(response) {
        return response.json();
    }).then(function(json) {
        const img = json.images[2].url;
        document.querySelector('img').src = img;
    });
});
