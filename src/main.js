import MainPage from "./pages/MainPage.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import ErrorPage from "./pages/ErrorPage.js";

// 라우터 구현
const router = () => {
  const path = window.location.pathname;

  switch (path) {
    case "/":
      document.body.innerHTML = MainPage();
      break;
    case "/profile":
      document.body.innerHTML = ProfilePage();
      break;
    case "/login":
      document.body.innerHTML = LoginPage();
      break;
    default:
      document.body.innerHTML = ErrorPage();
      break;
  }
};

// 초기 라우팅
router();

// 브라우저 뒤로가기/앞으로가기 처리
window.addEventListener("popstate", router);

// 링크 클릭 처리
document.addEventListener("click", (e) => {
  if (e.target.matches("a")) {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    if (href !== "#") {
      window.history.pushState({}, "", href);
      router();
    }
  }
});
