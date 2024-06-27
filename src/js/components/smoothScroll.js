export const smoothScroll = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery').firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

  /* second variant
    const element = refs.loadMoreBtn;
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    */
};