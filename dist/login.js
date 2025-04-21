
const form = document.forms[0]
const btn  = document.querySelector('button')
const alerts = document.querySelectorAll(".alert");
const text = btn.innerHTML;

form.onsubmit = e =>{
    e.preventDefault()
    btn.innerHTML = 'Loading...'
    const data = new FormData(form)
    const username = data.get("username");
    const password = data.get("password");
    const body = { username, password };
    axios
    .post("https://to-do-list-sn07.onrender.com/login", data)
    .then((res) =>{
        localStorage.setItem('token',res.data.access_token);
        localStorage.setItem('user',JSON.stringify(body));
        appear(0)
    } )
    .catch((err) =>{
        console.log(err)
        appear(1)
    } );
};

const appear = (i) => {
    alerts[i].classList.add("show");
    btn.innerHTML = text;
    setTimeout(() =>{
        alerts[i].classList.remove("show")
        if(i === 0) location = 'home.html'
        }, 3000);
  };
  