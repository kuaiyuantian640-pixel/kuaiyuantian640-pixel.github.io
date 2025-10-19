document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById('menu-button');
  const sideMenu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');
  const loadingDots = document.querySelectorAll(".dot");
  const loadingPercent = document.getElementById("loading-percent");

  let progress = 0;
  let dotCount = 0;

  const duration = 5000;
  const percentInterval = 50;
  const dotInterval = 500;

  // ドット更新
  const dotTimer = setInterval(() => {
    dotCount = (dotCount % 3) + 1;
    loadingDots.forEach((dot, index) => {
      dot.style.opacity = index < dotCount ? "1" : "0";
    });
  }, dotInterval);

  // 進行度更新
  const percentTimer = setInterval(() => {
    progress += 1;
    if (progress > 100) {
      clearInterval(percentTimer);
      clearInterval(dotTimer);
      return;
    }
    loadingPercent.textContent = `${progress}%`;
  }, percentInterval);

  // メニュー開閉
  menuButton.addEventListener('click', () => {
    sideMenu.classList.toggle('open');
    overlay.classList.toggle('show');
  });

  overlay.addEventListener('click', () => {
    sideMenu.classList.remove('open');
    overlay.classList.remove('show');
  });
});