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

  
  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }

  
  if (days < 0) {
    months--; 
    
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  
  if (months < 0) { months += 12; years--; }

  timer.textContent = `${years} il, ${months} ay, ${days} gün, ${hours} saat, ${minutes} dəqiqə, ${seconds} saniyə`;
}

setInterval(updateTimer, 1000);
updateTimer();
