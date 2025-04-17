/*
Nedan importer gör att vi kan använda allt med ordet export innan i display.js och fetcher.js
genom att skriva display. eller fetcher., se exemplet med fetcher.getUsers() och display.users() 
*/
import * as display from "./display.js";
import * as fetcher from "./fetcher.js";

// använder getUsers() från importerade fetcher ovan för att hämta array med användare
const users = await fetcher.getUsers();
// använder users() från importerade display ovan och skickar in arrayen med användare
display.users(users);

const comments = await fetcher.getComments(4);
console.log(comments);
