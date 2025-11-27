'use strict';

const links = document.querySelectorAll('.titles a');
const posts = document.querySelectorAll('.post');

function titleClickHandler(event) {
	event.preventDefault();
	const clickedElement = this;
	for (let post of posts) {
		post.classList.remove('active');
	}
	for (let link of links) {
		link.classList.remove('active');
	}
	clickedElement.classList.add('active');
	const articleSelector = clickedElement.getAttribute('href');
	const targetArticle = document.querySelector(articleSelector);
	targetArticle.classList.add('active');
}

for (let link of links) {
	link.addEventListener('click', titleClickHandler);
}
