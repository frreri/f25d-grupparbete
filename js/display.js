import { getComments } from "./fetcher.js";

const userContainer = document.getElementById("user-container");
const userInfoContainer = document.getElementById("userinfo-container");
const postContainer = document.getElementById("post-container");
const todoContainer = document.getElementById("todo-container");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

export const toggleModal = () => {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  todoContainer.innerHTML = "";
  postContainer.innerHTML = "";
  userInfoContainer.innerHTML = "";
};

export const showSpinners = () => {
  [userInfoContainer, postContainer, todoContainer].forEach((container) => {
    container.innerHTML = '<i class="fa-solid fa-gear spinner"></i>';
  });
};

export const showUsers = function (userArr) {
  userContainer.innerHTML = "";
  userArr.forEach((user) => {
    const userCard = document.createElement("article");
    userCard.classList.add("user-card");
    userCard.dataset.userId = user.id;
    userCard.innerHTML = `
      <img src="./img/default-avatar.webp" class="avatar" alt="avatar">
      <h2>${user.name}</h2>
      <p>Email: ${user.email}</p>
    `;
    userContainer.append(userCard);
  });
};

export const showTodos = function (todos) {
  todoContainer.innerHTML = "";
  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoContainer.appendChild(todoItem);

    //En label för varje checkbox skapas
    const todoLabel = document.createElement("label");
    todoLabel.htmlFor = `todo-${todo.id}`;
    todoLabel.textContent = todo.title;

    //En checkbox skapas
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.id = `todo-${todo.id}`;

    if (todo.completed === true) {
      checkBox.checked = true;
    }

    todoItem.append(todoLabel);
    todoItem.append(checkBox);
  });
};

/*Display Posts and Comments function */
export const showPosts = async function (postArr) {
  const allComments = await getComments(postArr);

  postContainer.innerHTML = "";
  postArr.forEach((post) => {
    const postCard = document.createElement("article");
    postCard.classList.add("post-card");
    postCard.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.body}</p>
    <h3>Kommentarer</h3>
    `;

    // filtrera ut comments som hör till denna post
    const postComments = allComments.filter(
      (comment) => comment.postId === post.id
    );
    // limits the amount of comments for each posts.
    const limitedComments = postComments.slice(0, 3);

    const commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments-container");

    limitedComments.forEach((comment) => {
      const commentBody = document.createElement("p");
      commentBody.classList.add("comment");
      commentBody.textContent = comment.body;

      commentsContainer.appendChild(commentBody);
    });

    postCard.append(commentsContainer);
    postContainer.append(postCard);
  });
};
/*End function block of Display Posts and Comments */

export const showUserInfo = function (user) {
  userInfoContainer.innerHTML = "";
  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");

  userInfo.innerHTML = `
    <h3>${user.name}</h3>
    <p><strong>Användarnamn:</strong> ${user.username}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Telefon:</strong> ${user.phone}</p>
    <p><strong>Hemsida:</strong> <a href="https://${user.website}" target="_blank">${user.website}</a></p>
    <p><strong>Företag:</strong> ${user.company.name}</p>
    <p><strong>Adress:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}</p>
  `;

  userInfoContainer.append(userInfo);
};
