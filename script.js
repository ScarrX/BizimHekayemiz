document.addEventListener('DOMContentLoaded', () => {
  const book = document.querySelector('.book');
  const coverFront = document.querySelector('.cover-front');
  const coverBack = document.querySelector('.cover-back');
  const pages = Array.from(document.querySelectorAll('.page'));
  const btnNext = document.getElementById('next');
  const btnPrev = document.getElementById('prev');

  let current = 0;
  let isAnimating = false;
  const duration = 900; 

  function setupZIndexes() {
    coverFront.style.zIndex = 300;
    coverBack.style.zIndex = 0;
    pages.forEach((page, i) => {
      page.style.zIndex = 300 - (i + 1);
      page.style.transform = 'rotateY(0deg) translateZ(0px)';
    });
  }

  function updateCovers() {
    coverFront.style.transform = current > 0 ? 'translateZ(20px) rotateY(-160deg)' : 'translateZ(0px) rotateY(0deg)';
    coverFront.style.zIndex = current > 0 ? 50 : 300;

    coverBack.style.transform = current === pages.length ? 'translateZ(20px) rotateY(-180deg)' : 'translateZ(0px) rotateY(0deg)';
    coverBack.style.zIndex = current === pages.length ? 300 : 0;
  }

  function updateZIndexesNext() {
    pages.forEach((page, i) => {
      page.style.zIndex = i < current ? 200 + i : 100 - i;
    });
  }

  function updateZIndexesPrev() {
    const total = pages.length;
    pages.forEach((page, i) => {
      page.style.zIndex = i < current ? 100 + i : total - i + 150;
    });
  }

  function flipNext() {
    if (isAnimating || current >= pages.length) return;
    isAnimating = true;

    
    pages[current].style.transform = 'rotateY(-90deg) translateZ(0px)';

    setTimeout(() => {
      current++; 
      updateZIndexesNext();
      updateCovers();

      
      pages[current - 1].style.transform = 'rotateY(-180deg) translateZ(0px)';

      setTimeout(() => {
        isAnimating = false;
      }, duration / 2);
    }, duration / 2);
  }

  function flipPrev() {
    if (isAnimating || current <= 0) return;
    isAnimating = true;

    current--; 
    updateZIndexesPrev();
    updateCovers();

    
    pages[current].style.transform = 'rotateY(-90deg) translateZ(0px)';

    setTimeout(() => {
      
      pages[current].style.transform = 'rotateY(0deg) translateZ(0px)';

      setTimeout(() => {
        isAnimating = false;
      }, duration / 2);
    }, duration / 2);
  }

  btnNext.addEventListener('click', flipNext);
  btnPrev.addEventListener('click', flipPrev);

  setupZIndexes();
  updateCovers();
});

















const startDate = new Date("2025-10-30T00:00:00+04:00");
const timer = document.getElementById("timer");

function updateTimer() {
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  let hours = now.getHours() - startDate.getHours();
  let minutes = now.getMinutes() - startDate.getMinutes();
  let seconds = now.getSeconds() - startDate.getSeconds();

  // Saniyə, dəqiqə, saat mənfi olarsa düzəldirik
  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }

  // Gün mənfi olarsa
  if (days < 0) {
    months--; 
    // Keçən ayın gün sayını alırıq
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  // Ay mənfi olarsa
  if (months < 0) { months += 12; years--; }

  timer.textContent = `${years} il, ${months} ay, ${days} gün, ${hours} saat, ${minutes} dəqiqə, ${seconds} saniyə`;
}

setInterval(updateTimer, 1000);
updateTimer();

