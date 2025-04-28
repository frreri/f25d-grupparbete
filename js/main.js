import * as display from "./display.js";
import * as fetcher from "./fetcher.js";

const userContainer = document.getElementById("user-container");
const overlay = document.querySelector(".overlay");
const closeModal = document.querySelector(".modal-close-btn");

const users = await fetcher.getUsers();
display.showUsers(users);

userContainer.addEventListener("click", async (e) => {
  const userCard = e.target.closest(".user-card");
  // Kod inuti nedan block körs när man klickar en användare
  if (userCard) {
    display.toggleModal();
    display.showSpinners();
    const userId = Number(userCard.dataset.userId);
    const user = fetcher.getUserInfo(userId);
    const posts = fetcher.getPosts(userId);
    const toDos = fetcher.getTodos(userId);

    display.showUserInfo(await user);
    display.showTodos(await toDos);
    display.showPosts(await posts);
  }
});

overlay.addEventListener("click", display.toggleModal);
closeModal.addEventListener("click", display.toggleModal);
