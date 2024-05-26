'use strict';

const smallImages = document.querySelector('.product .product-images-small');
const largeImage = document.querySelector('.product .product-image-large');

let currentImage = 0;

// handle clicks function
const handleClicks = function (e) {
  console.log(e.target);
  changeImage(e);

  showLightbox(e);

  changeLightboxImage(e);

  closeLightbox(e);

  addRemoveStock(e);
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

    document
      .querySelectorAll('.product .product-image-small')
      .forEach((image, i) => {
        if (e.target === image) {
          currentImage = i;
        }
      });
  }
};

// Change lightbox image
const changeLightboxImage = function (e) {
  if (
    e.target.classList.contains('product-image-small') &&
    e.target.parentElement.parentElement.classList.contains('light-box')
  ) {
    const src = e.target.querySelector('img').getAttribute('data-src');
    document
      .querySelector('.light-box .product-image-large img')
      .setAttribute('src', src);
    document
      .querySelector('.light-box .product-images-small .active')
      .classList.remove('active');
    e.target.classList.add('active');

    document
      .querySelectorAll('.light-box .product-image-small')
      .forEach((image, i) => {
        if (e.target === image) {
          currentImage = i;
        }
      });
  }

  if (
    e.target.classList.contains('next-btn') ||
    e.target === document.querySelector('.light-box .next-btn img')
  ) {
    goToImage(
      currentImage + 1,
      document.querySelectorAll('.light-box .product-image-small')
    );
  }

  if (
    e.target.classList.contains('prev-btn') ||
    e.target === document.querySelector('.light-box .prev-btn img')
  ) {
    goToImage(
      currentImage - 1,
      document.querySelectorAll('.light-box .product-image-small')
    );
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

    const closeButton = `<div class="close-lightbox">
                          <img src="src/images/icon-close-lightbox.svg" alt="Close">
                        </div>`;
    document
      .querySelector('.light-box')
      .insertAdjacentHTML('afterbegin', closeButton);

    const nextBtn = document.createElement('div');
    nextBtn.classList.add('next-btn');
    nextBtn.innerHTML = `<img src="/src/images/icon-next.svg" alt="Next">`;
    document
      .querySelector('.light-box .product-image-large')
      .insertAdjacentElement('beforeend', nextBtn);

    const prevBtn = document.createElement('div');
    prevBtn.classList.add('prev-btn');
    prevBtn.innerHTML = `<img src="/src/images/icon-previous.svg" alt="Previous">`;
    document
      .querySelector('.light-box .product-image-large')
      .insertAdjacentElement('beforeend', prevBtn);
  }
};

// Close lightbox when click on close button
const closeLightbox = function (e) {
  if (
    e.target === document.querySelector('.close-lightbox img') ||
    e.target === document.querySelector('.light-box')
  ) {
    document.querySelector('.light-box').remove();
  }
};

// create goToImage function
const goToImage = function (n, images) {
  images[currentImage].classList.remove('active');

  currentImage = (n + images.length) % images.length;

  images[currentImage].classList.add('active');
  document
    .querySelector('.light-box .product-image-large img')
    .setAttribute(
      'src',
      images[currentImage].querySelector('img').getAttribute('data-src')
    );
};

// Add or remove stock
const addRemoveStock = function (e) {
  if (e.target === document.querySelector('.product-info .input .plus')) {
    document.querySelector('.product-info input').value =
      parseInt(document.querySelector('.product-info input').value) + 1;
  }

  if (
    e.target === document.querySelector('.product-info .input .minus') &&
    parseInt(document.querySelector('.product-info input').value) > 1
  ) {
    document.querySelector('.product-info input').value =
      parseInt(document.querySelector('.product-info input').value) - 1;
  }
};

// Check if input value less than 1
const checkInputValue = function () {
  if (this.value < 1) {
    this.value = 1;
  }
};

// Add event listeners
document.addEventListener('click', handleClicks);
document
  .querySelector('.product-info input')
  .addEventListener('change', checkInputValue);
