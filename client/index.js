// SHOW PRODUCTS FUNCTIONALITY
const productContainer = document.getElementById("products-container");

// NAVBAR CONTAINER ELEMENT
const navBarList = document.getElementById("navbarlist");


// on window load event function
window.onload = async () => {

    // _____________________________ SHOW PROCDUCTS ___________________________
    fetch("http://localhost:5001/store/products")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        if (data.success) {
            // array of fetched products
            let productsData = data.output;
            console.log(productsData);

            // add product div into the container bu  looping the product data
            productsData.forEach((product,index) => {
                let div = document.createElement("div");
                div.className = "product";
                div.innerHTML = `
                        <img src="${product.images[0]}" alt="some product images" />
                        <h2>
                            ${product.title}
                        </h2>
            
                        <h3>
                            #${product.category.name}
                        </h3>
                        <p>
                            ${product.description}
                        </p>
            
                        <h5>
                            $${product.price}
                        </h5>
            
                        <button class="addtocart" value=${index}>
                            Add to Cart
                        </button>
                `;
                productContainer.appendChild(div);
            });

            // ADD TO CART FUNCTINALITY
            const addToCartElements = document.querySelectorAll(".addtocart");
            
            addToCartElements.forEach((addToCartElement) => {
                addToCartElement.addEventListener("click", async (e) => {
                    e.preventDefault();

                    // product data to add to cart 
                    let addToCartBody = {
                        quantity: 1,
                        ...productsData[e.target.value]
                    };

                    // here fetch to add to cart
                    let fetchToAddCart = await fetch("http://localhost:5001/api/cart/create",{
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + window.localStorage.getItem("jwtToken"),
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(addToCartBody)
                    });

                    if (fetchToAddCart.ok) {
                        // if fetch is autorized
                        let fetchToAddCartJson = await fetchToAddCart.json();

                        alert("Added to cart");
                        window.location.reload();
                    } else {
                        alert("Unauthorized to add cart")
                        if (window.location.href.indexOf("/index.html") !== -1) {
                            window.location = window.location.href.replace("/index.html","/login/login.html")
                        } else {
                            window.location = window.location.href + "/login/login.html"
                        }
                    }
                    
                })
            })

        } else {
            console.log(data);
        }
    });




    // ___________________________ SHOW NAVBAR ________________________________

    try {
        let fetchedData1 = await fetch("http://localhost:5001/protected",{
            method: "GET",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("jwtToken")
            }
        });

        // unauthoirzed == 401 or success == 200
        console.log(typeof(fetchedData1.status));
        if (fetchedData1.ok) {
            console.log("Authorized");
            let cartNumber = 0;

            // ____________________________ FETCH CART NUMBER ____________________

            let fetchedData2 = await fetch("http://localhost:5001/api/cart",{
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("jwtToken")                    }
            });
                
            // if status is ok 
            let fetchedDataJson2 = await fetchedData2.json();

            console.log(fetchedDataJson2);
            // get the cart nubmers;
            cartNumber = fetchedDataJson2.output.length;

            // if authorized then remove only show Home, Cart, setttings, and logout;
            navBarList.innerHTML = `
                <h2>
                    <a href="./index.html">
                        Home
                    </a>
                </h2>

                <h2>
                    <a href="./cart/cart.html">
                        Cart <strong>${cartNumber}</strong>
                    </a>
                </h2>

                <h2>
                    <a href="./settings/settings.html">
                        Settings
                    </a>
                </h2>

                <button id="logout">
                    Logout
                </button>
            `;

            // ______________________ LOGOUT FUNCTIONALITY _____________________
            let logout = document.getElementById("logout");
            logout.addEventListener("click",(e) => {
                e.preventDefault();

                // clear the localstorage
                window.localStorage.clear();
                window.location.reload();
                
            })
        }else {
            console.log("Unauthorized");
            // if unauthorized then remove to show only Home , Login and Signup navs
            navBarList.innerHTML = `
                <h2>
                    <a href="./index.html">
                        Home
                    </a>
                </h2>

                <button id="login">
                    <a href="./login/login.html">
                        log in
                    </a>
                </button>

                <button id="signup">
                    <a href="./signup/signup.html">
                        Sign up
                    </a>
                </button>
            `;
        }

    } catch (err) {
        console.log(err);
        console.log("Error while getting the protected datas");
    }
}
