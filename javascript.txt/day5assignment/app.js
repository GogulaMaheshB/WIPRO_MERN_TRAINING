const AppModule = (function () {

  const postsContainer = document.getElementById("posts");
  const todosContainer = document.getElementById("todos");
  const errorContainer = document.getElementById("error");

  function fetchPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then(posts => {
        displayPosts(posts);
      })
      .catch(error => {
        showEror(error.message);
      });
  }

  function fetchTodos() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        return response.json();
      })
      .then(todos => {
        displayTodos(todos);
      })
      .catch(error => {
        showError(error.message);
      });
  }

  function displayPosts(posts) {
    posts.slice(0,5).forEach(post => {
      const div = document.createElement("div");
      div.className = "box";
      div.innerHTML = `<h4>${post.title}</h4><p>${post.body}</p>`;
      postsContainer.appendChild(div);
    });
  }

  function displayTodos(todos) {
    todos.slice(0,5).forEach(todo => {
      const div = document.createElement("div");
      div.className = "box";
      div.innerHTML = `
        <h4 ${todo.completed ? "checked" : ""}>
        ${todo.title}
      `;
      todosContainer.appendChild(div);
    });
  }

  function showError(message) {
    errorContainer.textContent = message;
  }

  return {
    init: function () {
      fetchPosts();
      fetchTodos();
    }
  };

})();

AppModule.init();
