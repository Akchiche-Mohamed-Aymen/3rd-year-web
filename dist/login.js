
const form = document.forms[0]
const btn  = document.querySelector('button')
const alerts = document.querySelectorAll(".alert");
const text = btn.innerHTML;

form.onsubmit = e =>{
    e.preventDefault()
    btn.innerHTML = 'Loading...'
    const data = new FormData(form);
  const username = data.get("username");
  const password = data.get("password");
  const body = { username, password };
    axios
    .post("http://localhost:3000/login", body)
    .then((res) =>{
        localStorage.setItem('user',JSON.stringify((res.data.user)))
        alertify.success('Success Login');
        btn.innerHTML = text
        setTimeout(()=> location = 'home.html' , 2000)
    } )
    .catch((err) =>{
        btn.innerHTML = text
        alertify.error('Failed Login');
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
  