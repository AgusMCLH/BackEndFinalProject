let images = document.getElementsByTagName('img');

console.log(images);

if (images !== undefined) {
  let _src = '/img/placeholder/placeholder-image.webp';
  if (window.location.href.split('/')[4] === 'profile') {
    _src = '/img/placeholder/avatar-placeholder.png';
  }
  for (let j = 0; j < images.length; j++) {
    images[j].onerror = function () {
      this.src = _src;
    };
  }
}
