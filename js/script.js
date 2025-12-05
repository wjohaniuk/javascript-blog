'use strict';

const posts = document.querySelectorAll('.post');
const titleList = document.querySelector('.titles');
const optArticleTagsSelector = document.querySelectorAll('.post-tags .list');

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

function generateTitleLinks(customSelector = '') {
  let html = '';
  titleList.innerHTML = '';
  const articles = document.querySelectorAll('.post' + customSelector);
  for (let post of articles) {
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

function generateTags() {
  for (let post of posts) {
    const tagsWrapper = post.querySelector('.post-tags .list');
    let html = '';
    const articleTags = post.getAttribute('data-tags');
    tagsWrapper.innerHTML = html;
    const articleTagsArray = articleTags.split(' ');
    for (let tag of articleTagsArray) {
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      html += linkHTML;
    }

    tagsWrapper.innerHTML = html;
  }
}

generateTags();

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  console.log(href);
  const tag = href.replace('#tag-', '');
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  for (let activeTagLink of activeTagLinks) {
    activeTagLink.classList.remove('active');
  }
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let tagLink of tagLinks) {
    tagLink.classList.add('active');
  }
  const articlesSelector = '[data-tags~="' + tag + '"]';
  generateTitleLinks(articlesSelector);
}

function addClickListenersToTags() {
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  for (let tagLink of tagLinks) {
    tagLink.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

function generateAuthors() {
  for (let post of posts) {
    const authorWrapper = post.querySelector('.post-author');
    let html = '';
    const author = post.getAttribute('data-author');
    const linkHTML = 'by <a href="#author-' + author + '">' + author + '</a>';
    html += linkHTML;
    authorWrapper.innerHTML = html;
  }
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthorLinks = document.querySelectorAll(
    'a.active[href^="#author-"]'
  );

  for (let activeAuthorLink of activeAuthorLinks) {
    activeAuthorLink.classList.remove('active');
  }
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }
  const articlesSelector = '[data-author="' + author + '"]';
  generateTitleLinks(articlesSelector);
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
