const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = `${sender === "user" ? "You" : "Tatakae"}: ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", async () => {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  userInput.value = "";

  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  const data = await res.json();
  addMessage("bot", data.reply);
});
/*
// 📄 Upload PDF
document.getElementById("upload-pdf-btn").addEventListener("click", async () => {
  const file = document.getElementById("pdf-upload").files[0];
  if (!file) return alert("Select a PDF first");

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/upload-pdf", { method: "POST", body: formData });
  const data = await res.json();
  alert(data.message);
});

// 🖼️ Upload Image
document.getElementById("upload-img-btn").addEventListener("click", async () => {
  const file = document.getElementById("img-upload").files[0];
  if (!file) return alert("Select an image first");

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/upload-image", { method: "POST", body: formData });
  const data = await res.json();
  alert(data.message);
});*/
