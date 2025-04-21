
const form = document.forms[0]
const btn  = document.querySelector('button')
const alerts = document.querySelectorAll(".alert");


form.onsubmit = e =>{
    e.preventDefault()
    const formData = new FormData(form)
    axios
    .post("https://to-do-list-api-using-fastapi.onrender.com/login", formData)
    .then((_) => appear(0))
    .catch((err) =>{
        console.log(err)
        appear(1)
    } );
};

const appear = (i) => {
    alerts[i].classList.add("show");
    setTimeout(() => alerts[i].classList.remove("show"), 3000);
  };
  