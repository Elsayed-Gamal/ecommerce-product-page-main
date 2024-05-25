'use strict';

const smallImages = document.querySelector('.product .product-images-small');
const largeImage = document.querySelector('.product .product-image-large');

// handle clicks function
const handleClicks = function (e) {
  console.log(e.target);
  changeImage(e);

  showLightbox(e);
};

// Change large image when click on thumbnail
const changeImage = function (e) {
  if (
    e.target.classList.contains('product-image-small') &&
    e.target.parentElement.parentElement.classList.contains('product-images')
  ) {
    const src = e.target.querySelector('img').getAttribute('data-src');
    largeImage.querySelector('img').setAttribute('src', src);
    smallImages.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');
  }
};

// Show lightbox when click on large image
const showLightbox = function (e) {
  if (e.target === largeImage.querySelector('img')) {
    const elementClone = document
      .querySelector('.product-images')
      .cloneNode(true);
    elementClone.classList.remove('product-images');
    elementClone.classList.add('light-box');
    document
      .querySelector('.container')
      .insertAdjacentElement('beforeend', elementClone);
  }
};

document.addEventListener('click', handleClicks);
