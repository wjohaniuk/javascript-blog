'use strict';

const posts = document.querySelectorAll('.post');
const titleList = document.querySelector('.titles');
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';

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

function calculateTagClass(count, params) {
  const classNumber = Math.floor(
    ((count - params.min) / (params.max - params.min)) *
      (optCloudClassCount - 1) +
      1
  );
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  const optTagsListSelector = '.list.tags';
  let allTags = {};
  for (let post of posts) {
    const tagsWrapper = post.querySelector('.post-tags .list');
    let html = '';
    const articleTags = post.getAttribute('data-tags');
    tagsWrapper.innerHTML = html;
    const articleTagsArray = articleTags.split(' ');
    for (let tag of articleTagsArray) {
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      html += linkHTML;

      if (!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagsWrapper.innerHTML = html;
  }

  const tagList = document.querySelector(optTagsListSelector);
  const tagsParams = calculateTagsParams(allTags);

  let allTagsHTML = '';
  for (let tag in allTags) {
    allTagsHTML +=
      '<li><a href="#tag-' +
      tag +
      '" class="' +
      calculateTagClass(allTags[tag], tagsParams) +
      '">' +
      tag +
      '</a> <span>(' +
      allTags[tag] +
      ')</span></li>';
  }
  tagList.innerHTML = allTagsHTML;
}

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;

  /*alternatywne rozwiązanie
    const tagsArray = Object.values(tags);
  return {
    min: Math.min(...tagsArray),
    max: Math.max(...tagsArray)
  };
  */
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
  const optAuthorsListSelector = '.list.authors';
  let allAuthors = {};
  for (let post of posts) {
    const author = post.getAttribute('data-author');
    if (!allAuthors.hasOwnProperty(author)) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    const authorWrapper = post.querySelector('.post-author');
    let html = '';
    const linkHTML = 'by <a href="#author-' + author + '">' + author + '</a>';
    html += linkHTML;
    authorWrapper.innerHTML = html;
  }
  console.log(allAuthors);
  const authorList = document.querySelector(optAuthorsListSelector);
  let allAuthorsHTML = '';
  for (let author in allAuthors) {
    allAuthorsHTML +=
      '<li><a href="#author-' +
      author +
      '">' +
      author +
      '</a> <span>(' +
      allAuthors[author] +
      ')</span></li>';
  }
  authorList.innerHTML = allAuthorsHTML;
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
