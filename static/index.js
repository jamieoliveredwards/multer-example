const imagesEl = document.getElementById('images');

fetch('/images')
    .then(async response => await response.json())
    .then(imagePaths => {
        imagePaths.forEach(imagePath => {
            const imgElement = document.createElement('img');
            imgElement.setAttribute('src', `/images/${imagePath}`);
            imagesEl.appendChild(imgElement);
        });
    });