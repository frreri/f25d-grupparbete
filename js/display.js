const userContainer = document.getElementById("user-container");
const userInfoContainer = document.getElementById("userinfo-container");
const postContainer = document.getElementById("post-container");
const todoContainer = document.getElementById("todo-container");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

/*
Här kan vi skapa functions för att visa users, posts (med comments) och todos
När vi skrivit en function kan vi skriva export innan functionen så kan vi använda den i main
*/

export const toggleModal = () => {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
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

/*Display Posts and Comments function */

/*End function block of Display Posts and Comments */
