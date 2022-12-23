// form elements
const usernameForm = document.getElementById("username_form");
const emailForm = document.getElementById("email_form");
const passwordForm = document.getElementById("password_form");

const usernameInp = document.getElementById("username");
const emailInp = document.getElementById("email");
const originalPasswordInp = document.getElementById("original_password");
const newPasswordInp = document.getElementById("new_password");
const newPasswordConfirmInp = document.getElementById("new_password_confirm");


// onload function
window.onload = async () => {
    // show if user is authenticated or not
    let fetchedData = await fetch("http://localhost:5001/api/user",{
        method : "GET",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("jwtToken")
        }
    });

    if (fetchedData.ok) {
        // authenticated

        // _________________________________ USERNAME MODIFY _____________________________
        usernameForm.addEventListener("submit",async (e) => {
            e.preventDefault();

            let reqBody = {
                username: usernameInp.value
            }

            try {
                let usernameFetchedData = await fetch("http://localhost:5001/api/user/update",{
                    method: "PATCH",
                    headers: {
                        "Authorization" : "Bearer " + window.localStorage.getItem("jwtToken"),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(reqBody)
                });

                if (usernameFetchedData.ok) {
                    let usernameFetchedDataJson = await usernameFetchedData.json();

                    if (usernameFetchedDataJson.success) {
                        alert(usernameFetchedDataJson.message);

                        window.location.reload();
                    }
                }
            } catch (err) {
                console.log("Error while updating the username");
                console.log(err);
            }
        })


        // ___________________________ EMAIL MODIFY ________________________

        emailForm.addEventListener("submit",async (e) => {
            e.preventDefault();

            let reqBody = {
                email: emailInp.value
            }

            try {
                let emailFetchedData = await fetch("http://localhost:5001/api/user/update",{
                    method: "PATCH",
                    headers: {
                        "Authorization" : "Bearer " + window.localStorage.getItem("jwtToken"),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(reqBody)
                });

                if (emailFetchedData.ok) {
                    let emailFetchedDataJson = await emailFetchedData.json();

                    if (emailFetchedDataJson.success) {
                        alert(emailFetchedDataJson.message);

                        window.location.reload();
                    }
                }
            } catch (err) {
                console.log("Error while updating the email");
                console.log(err);
            }
        });


        // ____________________________ PASSWORD MODIFY _____________________

        passwordForm.addEventListener("submit",async (e) => {
            e.preventDefault();

            // password should match
            if (newPasswordInp.value !== newPasswordConfirmInp.value) {
                alert("PASSWORD DID NOT MATCH!! TRY AGAIN");
                window.location.reload();
            } else {

                let reqBody = {
                    originalPassword: originalPasswordInp.value,
                    newPassword: newPasswordInp.value
                }

                try {
                    let passwordFetchedData = await fetch("http://localhost:5001/api/user/updatePassword",{
                        method: "PATCH",
                        headers: {
                            "Authorization" : "Bearer " + window.localStorage.getItem("jwtToken"),
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(reqBody)
                    });
    
                    if (passwordFetchedData.ok) {
                        let passwordFetchedDataJson = await passwordFetchedData.json();
    
                        if (passwordFetchedDataJson.success) {

                            alert(passwordFetchedDataJson.message);
    
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.log("Error while updating the password");
                    console.log(err);
                }
            }
        });


        // ___________________________ ACCOUNT DELETE _______________________
        const deleteButton = document.getElementById("delete_account");

        deleteButton.addEventListener("click",async (e) => {
            e.preventDefault();

            // first confirm whether user really wnats to delete his account
            if (window.confirm("Do you really wish to delete this account?")) {
                // confirmed yes
                
                try {
                    let deleteFetchData = await fetch("http://localhost:5001/api/user/delete",{
                        method: "DELETE",
                        headers: {
                            "Authorization" : "Bearer " + window.localStorage.getItem("jwtToken")
                        }
                    })

                    if (deleteFetchData.ok) {
                        let deleteFetchDataJson = await deleteFetchData.json();

                        if (deleteFetchDataJson.success) {
                            alert(deleteFetchDataJson.message);
                            window.localStorage.clear();
                            window.location = window.location.href.replace("/settings/settings.html","/signup/signup.html");
                        }
                    }

                } catch (err) {
                    console.log("Error while deleting the user account");
                    console.log(err);
                }

            } else {
                window.location.reload();
            }
        })

    } else {
        alert("You are not authenticatd.");
        window.location = window.location.href.replace("/settings/settings.html","/index.html");
    }
}

// to display forms
const displayUsername = document.getElementById("display_username");
const displayEmail = document.getElementById("display_email");
const displayPassword = document.getElementById("display_password");

displayUsername.addEventListener("click",(e) => {
    e.preventDefault();

    usernameForm.style.display = "flex";
    
})

displayEmail.addEventListener("click",(e) => {
    e.preventDefault();

    emailForm.style.display = "flex";
    
})

displayPassword.addEventListener("click",(e) => {
    e.preventDefault();

    passwordForm.style.display = "flex";
    
})