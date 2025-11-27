'use strict';

const posts = document.querySelectorAll('.post');

function titleClickHandler() {
	for (let post of posts) {
        post.classList.remove('active');
    }
 
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
	link.addEventListener('click', titleClickHandler);
}
