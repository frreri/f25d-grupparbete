const userContainer = document.getElementById("user-container");
const userInfoContainer = document.getElementById("userinfo-container");
const postContainer = document.getElementById("post-container");
const todoContainer = document.getElementById("todo-container");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

import { getComments } from "./fetcher.js";

/*
Här kan vi skapa functions för att visa users, posts (med comments) och todos
När vi skrivit en function kan vi skriva export innan functionen så kan vi använda den i main
*/

export const toggleModal = () => {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  todoContainer.innerHTML = "";
  postContainer.innerHTML = "";
  userInfoContainer.innerHTML = "";
};

export const showUsers = function (userArr) {
  // nollställer först så att containern är tom innan jag fyller på med användare
  userContainer.innerHTML = "";
  userArr.forEach((user, index) => {
    const userCard = document.createElement("article");
    userCard.classList.add("user-card");
    userCard.dataset.userId = user.id;
    userCard.innerHTML = `
      <img src="https://picsum.photos/100/?random=${index}" alt="avatar">
      <h2>${user.name}</h2>
      <p>Email: ${user.email}</p>
    `;
    userContainer.append(userCard);
  });
};

//Idas kod

export const showTodos = function (todos) {
  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoContainer.appendChild(todoItem);

    //En label för varje checkbox skapas
    const todoLabel = document.createElement("label");
    todoLabel.htmlFor = "checkTodo";
    todoLabel.textContent = todo.title;

    //En checkbox skapas
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.name = "checkTodo";

    if (todo.completed === true) {
      checkBox.checked = true;
    }

    todoItem.append(todoLabel);
    todoItem.append(checkBox);
  });
};

/*Display Posts and Comments function */
export const showPosts = async function (postArr) {
  postContainer.innerHTML = "";

  for (const [index, post] of postArr.entries()) {
    
    const postCard = document.createElement("article");
    postCard.classList.add("post-card");
    postCard.dataset.postId = `${post.id}-${index}`;
    postCard.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.body}</p>
    <section>
    `;
    //waits on the imported getcomments function.
    const postComment = await getComments(post.id);

    // limits the amount of comments for each posts.
    const limitedComments = postComment.slice(0, 3);

    const commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments-container");

    limitedComments.forEach((comment) => {
      const commentName = document.createElement("h4");
      commentName.classList.add("comment-name");
      commentName.textContent = comment.name;

      const commentBody = document.createElement("p");
      commentBody.classList.add("comment");
      commentBody.textContent = comment.body;
      commentsContainer.appendChild(commentName);
      commentsContainer.appendChild(commentBody);
    });

    postCard.append(commentsContainer);
    postContainer.append(postCard);
  }
};
/*End function block of Display Posts and Comments */

export const showUserInfo = function (user) {
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
