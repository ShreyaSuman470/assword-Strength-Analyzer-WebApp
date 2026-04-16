function checkStrength() {

  let p = document.getElementById("password").value;
  let bar = document.getElementById("strengthBar");
  let res = document.getElementById("result");
  let sug = document.getElementById("suggestions");

  let img = document.getElementById("avatarImg");
  let popup = document.getElementById("popup");

  let score = 0;
  let msg = "";

  if (p.length >= 8) score++;
  else msg += "Use 8 characters<br>";

  if (/[A-Z]/.test(p)) score++;
  else msg += "Add uppercase<br>";

  if (/[0-9]/.test(p)) score++;
  else msg += "Add number<br>";

  if (/[^A-Za-z0-9]/.test(p)) score++;
  else msg += "Add symbol<br>";

  if (score <= 2) {
    bar.style.width = "30%";
    bar.style.background = "#ff6b6b";
    res.innerHTML = "Weak";
    img.style.filter = "grayscale(80%)";
  }
  else if (score <= 3) {
    bar.style.width = "60%";
    bar.style.background = "#ffd166";
    res.innerHTML = "Medium";
    img.style.filter = "none";
  }
  else {
    bar.style.width = "100%";
    bar.style.background = "#06d6a0";
    res.innerHTML = "Strong";

    img.style.filter = "drop-shadow(0 0 10px #00ff9f)";

    popup.style.display = "flex";
    setTimeout(() => popup.style.display = "none", 1500);
  }

  sug.innerHTML = msg;
}


// generate
function generatePassword() {
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";
  let pass = "";

  for (let i = 0; i < 12; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }

  document.getElementById("password").value = pass;
  checkStrength();
}


// save
function savePassword() {
  let p = document.getElementById("password").value;
  let data = JSON.parse(localStorage.getItem("passwords")) || [];

  data.push(p);
  localStorage.setItem("passwords", JSON.stringify(data));

  loadPasswords();
}


// load
function loadPasswords() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  let data = JSON.parse(localStorage.getItem("passwords")) || [];

  data.forEach((item, i) => {
    let li = document.createElement("li");
    li.innerText = item;

    let btn = document.createElement("button");
    btn.innerText = "X";
    btn.onclick = () => deletePassword(i);

    li.appendChild(btn);
    list.appendChild(li);
  });
}


// delete
function deletePassword(i) {
  let data = JSON.parse(localStorage.getItem("passwords")) || [];
  data.splice(i, 1);
  localStorage.setItem("passwords", JSON.stringify(data));
  loadPasswords();
}


// search
function searchPassword() {
  let input = document.getElementById("search").value.toLowerCase();
  let items = document.querySelectorAll("#list li");

  items.forEach(li => {
    li.style.display = li.innerText.toLowerCase().includes(input) ? "block" : "none";
  });
}


// toggle
function toggle() {
  let input = document.getElementById("password");
  input.type = input.type === "password" ? "text" : "password";
}

window.onload = loadPasswords;