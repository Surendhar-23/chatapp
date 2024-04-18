let chatcontainer = document.querySelector(".chat-container");
window.addEventListener("load", () => {
  chatcontainer.scrollTo({
    top: chatcontainer.scrollHeight + 50,
  });
});
