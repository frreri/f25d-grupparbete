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

export const getUsers = async () => {
  const data = await getJSON("https://jsonplaceholder.typicode.com/users");
  return data;
};

export const getPosts = async (userId) => {
  const data = await getJSON(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  return data;
};

export const getComments = async (postArr) => {
  const commentPromises = [];
  postArr.forEach((post) => {
    commentPromises.push(
      getJSON(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
    );
  });
  const data = Promise.all(commentPromises);
  return data;
};

export const getTodos = async (userId) => {
  const data = await getJSON(
    `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
  );
  return data;
};

export const getUserInfo = async (userId) => {
  const data = await getJSON(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  return data;
};
