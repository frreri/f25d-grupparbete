/*
Nedan importer gör att vi kan använda allt med ordet export innan i display.js och fetcher.js
genom att skriva display. eller fetcher., se exemplet med fetcher.getUsers() och display.users() 
*/
import * as display from "./display.js";
import * as fetcher from "./fetcher.js";

const userContainer = document.getElementById("user-container");
const overlay = document.querySelector(".overlay");
const closeModal = document.querySelector(".modal-close-btn");

// använder getUsers() från importerade fetcher ovan för att hämta array med användare
const users = await fetcher.getUsers();
// använder users() från importerade display ovan och skickar in arrayen med användare
display.showUsers(users);

const comments = await fetcher.getComments(4);
console.log(comments);

userContainer.addEventListener("click", async (e) => {
  const userCard = e.target.closest(".user-card");
  // Kod inuti nedan block körs när man klickar en användare
  if (userCard) {
    // Nedan har vi userId för användare vi klickat på för att kunna hämta
    // posts och todos och använda i någon funktion för att visa dem som vi skapar i display.js
    // samt user i sig för att kunna använda i någon funktion för att visa användarinfo på samma sätt
    display.toggleModal();
    const userId = Number(userCard.dataset.userId);
    const user = users.find((usr) => usr.id === userId);
    const posts = await fetcher.getPosts(userId);
    const toDos = await fetcher.getTodos(userId);
    
    display.showPosts(posts);

    console.log(posts);

    console.log(toDos);
    // Vi behöver skapa funktion för att visa modal, samt för att visa anvinfo, posts (med comments) och todos
    // och använda dessa funktions inom detta kodblock
  }
});

overlay.addEventListener("click", display.toggleModal);
closeModal.addEventListener("click", display.toggleModal);
