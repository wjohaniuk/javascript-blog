'use strict';

const posts = document.querySelectorAll('.post');
const titleList = document.querySelector('.titles');

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  for (let post of posts) {
    post.classList.remove('active');
  }
  const links = titleList.querySelectorAll('a');
  for (let link of links) {
    link.classList.remove('active');
  }

  clickedElement.classList.add('active');
  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  if (targetArticle) {
    targetArticle.classList.add('active');
  }
}

function generateTitleLinks() {
  console.log('Generating title links...');
  let html = '';
  titleList.innerHTML = '';
  for (let post of posts) {
    const postId = post.getAttribute('id');
    const postTitle = post.querySelector('.post-title').innerHTML;
    const linkHTML =
      '<li><a href="#' + postId + '"><span>' + postTitle + '</span></a></li>';
    html += linkHTML;
  }
  titleList.innerHTML = html;

  const links = titleList.querySelectorAll('a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();
