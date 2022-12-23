// LOGIN FUNCTIONALITY

// form and input elements
const loginForm = document.getElementById("login");

const emailInp = document.getElementById("email");
const password = document.getElementById("password");


// login event function
loginForm.addEventListener("submit",async (e) => {
    e.preventDefault();
    try {
        // fetch to api to login here
        let userData = {
            email: emailInp.value,
            password: password.value
        }
        let fetchedData = await fetch("http://localhost:5001/account/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        let fetchedDataJson = await fetchedData.json();
        
        // if fetch is success then logged in and go to home else stay
        if (fetchedDataJson.success) {
            alert(fetchedDataJson.message);

            // store the token in localstorage
            window.localStorage.setItem("jwtToken",fetchedDataJson.output.token);

            // go to home
            window.location = window.location.href.replace("/login/login.html","/index.html");
        } else {
            alert(fetchedDataJson.message);
        }
    } catch(err) {
        console.log("Error while loggin in");
        console.log(err);
    }
})