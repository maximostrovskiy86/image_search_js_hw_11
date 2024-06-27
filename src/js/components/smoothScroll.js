export const smoothScroll = () => {
  const element = document.querySelector('.load-more-btn');
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });

  /* second variant
    const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
  // window.scrollBy({
  //   top: cardHeight * 3,
  //   behavior: 'smooth',
  // });
   */
};