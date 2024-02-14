import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
    <div class="loading-spinner"></div>
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

// No need to check if editor is undefined here, as you're creating a new instance above.
// if (typeof editor === 'undefined') {
//   loadSpinner();
// }

// Check if service workers are supported and register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Make sure the path to 'service-worker.js' is correct based on your server setup.
    // This path assumes your server serves the 'dist' directory at the root ('/').
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered successfully.', reg.scope))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
} else {
  console.error('Service workers are not supported in this browser.');
}

