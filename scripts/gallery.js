import imageSources from './gallery-items.js';

const allList = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightbox__image = document.querySelector('.lightbox__image');
const lightbox__button = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const lightbox__overlay = document.querySelector('.lightbox__overlay');

allList.addEventListener('click', maximizeImg);
lightbox__button.addEventListener('click', closeAction);
lightbox__overlay.addEventListener('click', closeAction);
window.addEventListener('keydown', escapeFunction);
window.addEventListener('keydown', goRight);
window.addEventListener('keydown', goLeft);

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
  lightbox__image.alt = target.alt;
}
function closeAction() {
  allList.style.visibility = 'visible';
  document.body.style.overflow = 'visible';
  lightbox__image.src = '';
  lightbox__image.alt = '';
  lightbox.classList.remove('is-open');
}
function escapeFunction({ key }) {
  if (key === 'Escape') {
    closeAction();
  }
}
function goRight({ key }) {
  if (key === 'ArrowRight') {
    console.log(`Entering ${key}`);
    let elemInFocus = imageSources.find(
      elem => elem.original === lightbox__image.src,
    );
    console.log(elemInFocus);
    let index = imageSources.indexOf(elemInFocus);
    console.log(index);
    if (index === imageSources.length - 1) {
      lightbox__image.src = imageSources[0].original;
      lightbox__image.alt = imageSources[0].description;
    } else {
      lightbox__image.src = imageSources[index + 1].original;
      lightbox__image.alt = imageSources[index + 1].description;
    }
  }
}
function goLeft({ key }) {
  if (key === 'ArrowLeft') {
    console.log(`Entering ${key}`);
    let elemInFocus = imageSources.find(
      elem => elem.original === lightbox__image.src,
    );
    console.log(elemInFocus);
    let index = imageSources.indexOf(elemInFocus);
    console.log(index);
    if (index === 0) {
      lightbox__image.src = imageSources[imageSources.length - 1].original;
      lightbox__image.alt = imageSources[imageSources.length - 1].description;
    } else {
      lightbox__image.src = imageSources[index - 1].original;
      lightbox__image.alt = imageSources[index - 1].description;
    }
  }
}

const markupArray = imageSources.map(elem => {
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
  listItem.append(linkOfItem);
  linkOfItem.append(image);
  return listItem;
});
allList.append(...markupArray);
