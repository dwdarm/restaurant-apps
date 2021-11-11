import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import './main-app';
import swRegister from './utils/sw-register';

const root = document.getElementById('app');
root.innerHTML = '';
root.appendChild(document.createElement('main-app'));

window.addEventListener('load', () => {
  swRegister();
});
