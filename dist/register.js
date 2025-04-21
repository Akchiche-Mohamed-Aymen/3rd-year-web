const username = document.getElementById("register-username");
const password = document.getElementById("register-password");
const form = document.forms[0];
const alerts = document.querySelectorAll(".alert");
const btn = document.querySelector("button");
const text = btn.innerHTML;
form.onsubmit = async (e) => {
  e.preventDefault();
  btn.innerHTML = "Loding...";
  console.log("new user");
  const data = new FormData(form);
  const username = data.get("username");
  const password = data.get("password");
  const body = { username, password };
  try {
    let res = await axios.post(
      "https://to-do-list-sn07.onrender.com/register",
      body
    );
    res = await axios.post("https://to-do-list-sn07.onrender.com/login", data);
    console.log(res)
    localStorage.setItem('token',res.data.access_token);
    localStorage.setItem('user',JSON.stringify(body));
    appear(0)
  } catch (error) {
    console.log(error);
    appear(1)
  }
};
const appear = (i) => {
  alerts[i].classList.add("show");
  btn.innerHTML = text;
  setTimeout(() =>{
     alerts[i].classList.remove("show")
     if(i === 0) location = 'home.html'
     }, 3000);
};
