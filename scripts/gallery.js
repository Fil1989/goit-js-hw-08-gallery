import imageSources from './gallery-items.js';

const allList = document.querySelector('.js-gallery');

imageSources.forEach(elem => {
  const listItem = document.createElement('li');
  listItem.classList.add('gallery__item');
  const linkOfItem = document.createElement('a');
  linkOfItem.classList.add('gallery__link');
  linkOfItem.href = elem.original;
  const image = document.createElement('img');
  image.classList.add('gallery__image');
  image.src = elem.preview;
  image.setAttribute('data-source', elem.original);
  image.alt = elem.description;
  allList.append(listItem);
  listItem.append(linkOfItem);
  linkOfItem.append(image);
});
const lightbox = document.querySelector('.js-lightbox');

const lightbox__overlay = document.querySelector('.lightbox__overlay');

const lightbox__content = document.querySelector('.lightbox__content');

const lightbox__image = document.querySelector('.lightbox__image');

allList.addEventListener('click', maximizeImg);
function maximizeImg(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== 'IMG') return;
  lightbox.classList.add('is-open');
  allList.style.visibility = 'hidden';
  document.body.style.overflow = 'hidden';

  setActiveLink(target);
}
function setActiveLink(target) {
  lightbox__image.src = target.dataset.source;
}
const lightbox__button = document.querySelector(
  'button[data-action="close-lightbox"]',
);

lightbox__button.addEventListener('click', event => {
  allList.style.visibility = 'visible';
  document.body.style.overflow = 'visible';

  lightbox.classList.remove('is-open');
});
