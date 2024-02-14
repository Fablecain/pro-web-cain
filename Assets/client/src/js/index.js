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

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported and register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Updated path to match the output location after build
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered successfully.', reg))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
} else {
  console.error('Service workers are not supported in this browser.');
}
