import MainPage from "./pages/MainPage.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import ErrorPage from "./pages/ErrorPage.js";
import { getUser, saveUser, logout, isLoggedIn } from "./utils/auth.js";

// navigate 함수 추가
const navigate = (path) => {
  window.history.pushState({}, "", path);
  router();
};

const handleLogin = (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  saveUser({
    username: username,
    email: "",
    bio: "",
  });
  navigate("/profile");
};

const handleLogout = () => {
  logout();
  navigate("/login");
};

const handleProfileUpdate = () => {
  const user = getUser();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const bio = document.getElementById("bio").value;
  saveUser({ ...user, username, email, bio });
  navigate("/profile");
};

// 라우터 구현
const router = () => {
  const path = window.location.pathname;

  // 로그인하지 않은 상태에서 /profile 접근 시 로그인 페이지로 리다이렉션
  if (path === "/profile" && !isLoggedIn()) {
    navigate("/login");
    return;
  }

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
  const linkElement = e.target.closest("a, [role='link']");

  if (linkElement) {
    e.preventDefault();
    const href = linkElement.getAttribute("href");
    if (href && href !== "#") {
      window.history.pushState({}, "", href);
      router();
    }
  }
  if (e.target.matches("#logout")) {
    e.preventDefault();
    handleLogout();
  }
});

document.addEventListener("submit", (e) => {
  if (e.target.matches("#login-form")) {
    e.preventDefault();
    handleLogin(e);
  }

  if (e.target.matches("#profile-form")) {
    e.preventDefault();
    handleProfileUpdate();
  }
});
