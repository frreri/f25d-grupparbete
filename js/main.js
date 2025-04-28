import * as display from "./display.js";
import * as fetcher from "./fetcher.js";

const userContainer = document.getElementById("user-container");
const overlay = document.querySelector(".overlay");
const closeModal = document.querySelector(".modal-close-btn");
const searchInput = document.getElementById("user-search");

let allUsers = [];

// hämta och visa alla användare
async function init() {
  allUsers = await fetcher.getUsers();
  display.showUsers(allUsers);
}
init();

// filtrera på namn
searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = allUsers.filter((u) => u.name.toLowerCase().includes(term));
  display.showUsers(filtered);
});

userContainer.addEventListener("click", async (e) => {
  const userCard = e.target.closest(".user-card");
  if (!userCard) return;

  display.toggleModal();
  display.showSpinners();
  const userId = Number(userCard.dataset.userId);
  const [user, posts, toDos] = await Promise.all([
    fetcher.getUserInfo(userId),
    fetcher.getPosts(userId),
    fetcher.getTodos(userId),
  ]);

  display.showUserInfo(user);
  display.showPosts(posts);
  display.showTodos(toDos);
});

overlay.addEventListener("click", display.toggleModal);
closeModal.addEventListener("click", display.toggleModal);
