document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById('menu-button');
  const sideMenu = document.getElementById('sideMenu');
  const menuItems = document.querySelectorAll(".menu-item");
  const overlay = document.getElementById('overlay');
  const loadingDots = document.querySelectorAll(".dot");
  const loadingPercent = document.getElementById("loading-percent");
  const colorPicker = document.getElementById("progress-color");
  const progressFill = document.getElementById("progress-fill");
  const lifetimeValue = document.getElementById("lifetime-value");
  const lifetimeSlider = document.getElementById("notification-lifetime");
  const lifetimeLabel = document.getElementById("notification-label");

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

    showNotification("", 3000, "button", "Menu");
  });

  overlay.addEventListener('click', () => {
    sideMenu.classList.remove('open');
    overlay.classList.remove('show');
  });

  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      const label = item.dataset.label;
      if (label === "Setting") {
        openSettingsPanel();

        showNotification("", 3000, "button", "Setting");
      }
    });
  });

function openSettingsPanel() {
  const panel = document.getElementById("settings-panel");
  const sideMenu = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");

  panel.style.display = "block";
  sideMenu.classList.remove("open");   // メニューを閉じる
  overlay.classList.remove("show");    // オーバーレイを非表示
}

function showNotification(message, duration = 3000, type = "default", buttonName = null) {
  const container = document.getElementById("notification-container");

  const lifetimeSlider = document.getElementById("notification-lifetime");
  if (lifetimeSlider) {
    duration = parseInt(lifetimeSlider.value) * 1000; // 秒 → ミリ秒
  }

  const notification = document.createElement("div");
  notification.className = "notification";

  // ⚠︎アイコン
  const icon = document.createElement("div");
  icon.className = "notification-icon";
  icon.textContent = "⚠︎";

  // テキスト部分
  const textWrapper = document.createElement("div");
  textWrapper.className = "notification-text";

  if (type === "button" && buttonName) {
    const title = document.createElement("div");
    title.className = "notification-title";
    title.textContent = "Button Pressed";

    const detail = document.createElement("div");
    detail.className = "notification-detail";
    detail.textContent = `${buttonName} Button Pressed`;

    textWrapper.appendChild(title);
    textWrapper.appendChild(detail);
  } else {
    textWrapper.textContent = message;
  }

  notification.appendChild(icon);
  notification.appendChild(textWrapper);
  container.appendChild(notification);

  // スライドアウト → 削除
  setTimeout(() => {
    notification.style.animation = "slideOut 0.4s ease forwards";
    setTimeout(() => {
      notification.remove();
    }, 400);
  }, duration);
}

document.getElementById("close-settings").addEventListener("click", () => {
  document.getElementById("settings-panel").style.display = "none";
});

colorPicker.addEventListener("input", () => {
  const color = colorPicker.value;
  progressFill.style.setProperty("--progress-base-color", color);
  localStorage.setItem("progressColor", color);
});

if (lifetimeSlider && lifetimeLabel) {
  const updateLifetimeLabel = () => {
    lifetimeLabel.textContent = `Notification Life Time: ${parseFloat(lifetimeSlider.value).toFixed(1)}s`;
  };

  lifetimeSlider.addEventListener("input", updateLifetimeLabel);
  updateLifetimeLabel(); // 初期表示
}

// 読み込み
const savedColor = localStorage.getItem("progressColor");
if (savedColor) {
  colorPicker.value = savedColor;
  progressFill.style.backgroundColor = savedColor;
}

});
