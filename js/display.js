const userContainer = document.getElementById("user-container");
const userInfoContainer = document.getElementById("userinfo-container");
const postContainer = document.getElementById("post-container");
const todoContainer = document.getElementById("todo-container");

/*
Här kan vi skapa functions för att visa users, posts och todos
När vi skrivit en function kan vi skriva export innan functionen så kan vi använda den i main
*/

export const users = function (userArr) {
  // PLACEHOLDER
  userArr.forEach((user) => console.log(user));
};
