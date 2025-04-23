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
      "http://localhost:3000/register",
      body
    );
    alertify.success('Success Registretion');
    localStorage.setItem('user',JSON.stringify((res.data.user)))
    btn.innerHTML = text
    setTimeout(()=> location = 'home.html' , 2000)
  } catch (error) {
     btn.innerHTML = text
    alertify.error('Failed Registretion');
  }
};
