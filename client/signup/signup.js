// signup funcitonlity

// form and input elements
const signupForm = document.getElementById("signup");

const usernameInp = document.getElementById("username");
const emailInp = document.getElementById("email");
const passwordInp = document.getElementById("password");
const retypedPasswordInp = document.getElementById("retypedPassword");


// SUBMIT EVNET FUNCTION
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // fetch to submit the user info to sign up the user
    try {
        // gather the data from form data to sent over the api if password is matched
        if (passwordInp.value === retypedPasswordInp.value) {
            let userData = {
                username: usernameInp.value,
                email: emailInp.value,
                password: passwordInp.value
            }
            
            // fetch to signup user
            let fetchedData = await fetch("http://localhost:5001/account/signup",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            let fetchedDataJson = await fetchedData.json();

            // if success return to login or else stay
            if (fetchedDataJson.success) {
                alert("Successfully Signed up");
                window.location = window.location.href.replace("/signup/signup.html","/login/login.html");
            } else {
                console.log(fetchedDataJson);
            }

        } else {
            alert("Password did not match! TRT AGAIN");
            retypedPasswordInp.value = "";
            retypedPasswordInp.style.border = "2px solid red";
            setTimeout(() => {
                retypedPasswordInp.style.border = "2px solid gray";
            },2000);
            
        }

    } catch(err) {
        console.log(err);
        console.log("Error while signing up");
    }
})