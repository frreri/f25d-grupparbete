/*
Här kan vi skapa functions för att hämta users, posts, comments och todos
När vi skrivit en function kan vi skriva export innan functionen så kan vi använda den i main
*/

// Function vi kan använda i övriga functions för att få json direkt
// Den tar en url och returnar json-data
const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error fetching data: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Gjorde exempel för users, då det inte var del av uppgiften
export const getUsers = async () => {
  const data = await getJSON("https://jsonplaceholder.typicode.com/users");
  return data;
};

// 1) Skapa function för att hämta posts, function bör ta userId som parameter och returna posts
// URL https://jsonplaceholder.typicode.com/posts?userId=USERID (byt ut USERID mot idt i parameter)

// 2) Skapa function för att hämta comments, function bör ta postId som parameter och returna comments
// URL https://jsonplaceholder.typicode.com/comments?postId=POSTID (byt ut POSTID mot idt i parameter)

// 3) Skapa function för att hämta todos, function bör ta userId som parameter och returna todos
// URL https://jsonplaceholder.typicode.com/todos?userId=USERID (byt ut USERID mot idt i parameter)
