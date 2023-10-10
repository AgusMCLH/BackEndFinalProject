let images = document.getElementsByTagName('img');

console.log(images);

if (images !== undefined) {
  let src = '';
  if (window.location.href.split('/')[4] === 'profile') {
    src = 'avatar-placeholder.png';
  } else {
    src = '/img/placeholder/placeholder-image.webp';
  }
  for (let j = 0; j < images.length; j++) {
    images[j].addEventListener('error', () => {
      images[j].src = src;
    });
  }
}
