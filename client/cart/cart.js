// cart elements
const cartElement = document.querySelector(".cart");

window.onload = async () => {
    // fetch cart 
    try {
        let fetchedData = await fetch("http://localhost:5001/api/cart",{
            method: "GET",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("jwtToken")
            }
        });
        
        if (fetchedData.ok) {
            // if status is ok 
            let fetchedDataJson = await fetchedData.json();

            console.log(fetchedDataJson);

            // cart from fetchedDataJson
            let cart = fetchedDataJson.output;

            // if cart is 0 then show respective paragraph
            if (cart.length <= 0) {
                cartElement.innerHTML = `
                <h2 id="nothing">
                    Nothing added to Cart Yet
                </h2>
                `;
            } else {

                // if cart is not 0 then show cart
                let cartContainerDiv = document.createElement("div");
                cartContainerDiv.className = "cart_container";

                // looping the cart obtained from fetchedDataJson
                cart.forEach(cartProduct => {
                    let singleCartDiv = document.createElement("div");
                    singleCartDiv.className = "single_cart";

                    singleCartDiv.innerHTML = `
                            <img src="${cartProduct.images[0]}" alt="product images" />
                            <h3>${cartProduct.title}</h3>
                            <span>
                                <button class="inc" value="${cartProduct._id}">+</button>
                                <h4>${cartProduct.quantity}</h4>
                                <button class="dec" value="${cartProduct._id}">-</button>
                            </span>
                            <h3>
                                $${cartProduct.cartPrice}
                            </h3>
                            <button class="delete_cart" value="${cartProduct._id}">
                                x
                            </button>
                    `;

                    // append singleCart div to cartcontainer div
                    cartContainerDiv.appendChild(singleCartDiv);
                });

                // append cartContainer div to cartElement div
                cartElement.appendChild(cartContainerDiv);


                // ____________________ QUNATITY UPDATE _________________
                const quantityIncrese = document.querySelectorAll(".inc");
                const quantityDecrease = document.querySelectorAll(".dec");

                // quantity increase function
                quantityIncrese.forEach((increase) => {
                    increase.addEventListener("click", async (e) => {
                        e.preventDefault();
                        console.log("Increase")
                        // fetch to update the quantity and price of cart product
                        try {
                            let fetchedData1 = await fetch(`http://localhost:5001/api/cart/update/${e.target.value}?do=increase`,{
                                method: "PATCH",
                                headers: {
                                    "Authorization": "Bearer " + window.localStorage.getItem("jwtToken")
                                }
                            });

                            let fetchedData1Json = await fetchedData1.json();

                            if (fetchedData1Json.success) {
                                alert(fetchedData1Json.message);
                                window.location.reload();
                            }

                        } catch (err) {
                            console.log(err);
                            console.log("Error whilte increasing the qunatity");
                        }
                    })
                })

                // quantity decrease function
                quantityDecrease.forEach((decrease) => {
                    decrease.addEventListener("click", async (e) => {
                        e.preventDefault();
                        console.log("Decrease");
                        // fetch to update the quantity and price of cart product
                        try {
                            let fetchedData2 = await fetch(`http://localhost:5001/api/cart/update/${e.target.value}?do=decrease`,{
                                method: "PATCH",
                                headers: {
                                    "Authorization": "Bearer " + window.localStorage.getItem("jwtToken")
                                }
                            });

                            let fetchedData2Json = await fetchedData2.json();

                            if (fetchedData2Json.success) {
                                alert(fetchedData2Json.message);
                                window.location.reload();
                            }
                            
                        } catch (err) {
                            console.log(err);
                            console.log("Error whilte decreasing the qunatity");
                        }
                    })
                });


                // ____________________ CART DELETE _____________________
                const deleteCartDiv = document.querySelectorAll(".delete_cart");

                deleteCartDiv.forEach((deleteCart) => {
                    deleteCart.addEventListener("click", async (e) => {
                        e.preventDefault();

                        try {
                            let fetchedData3 = await fetch(`http://localhost:5001/api/cart/delete/${e.target.value}`,{
                                method: "DELETE",
                                headers: {
                                    "Authorization": "Bearer " + window.localStorage.getItem("jwtToken")
                                }
                            });
                            let fetchedData3Json = await fetchedData3.json();

                            if (fetchedData3Json.success) {
                                alert(fetchedData3Json.message);
                                window.location.reload();
                            }

                        } catch (err) {
                            console.log("Error while deleting the cart");
                            console.log(err);
                        }
                    })
                })


                // ______________________ Cart Summary ______________________
                try {
                    let fetchCartSummary = await fetch("http://localhost:5001/api/cart/summary",{
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + window.localStorage.getItem("jwtToken")
                        }
                    });

                    if (fetchCartSummary.ok) {

                        // summraydatajson
                        let fetchCartSummaryJson = await fetchCartSummary.json();

                        // cart_summray div element
                        let cartSummaryDiv = document.createElement("div");
                        cartSummaryDiv.className = "cart_summary";

                        cartSummaryDiv.innerHTML = `
                                <h2>
                                    Summary
                                </h2>
                    
                                <div class="cart_summary_cost">
                                    <span>
                                        <p>Order total</p>
                                        <strong>$${fetchCartSummaryJson.output.ordertotal}</strong>
                                    </span>
                    
                                    <span>
                                        <p>Shipping Cost</p>
                                        <strong>$${fetchCartSummaryJson.output.shipping_fee}</strong>
                                    </span>
                                </div>

                                <div class="line"></div>

                                <div class="cart_summary_total">
                                    <p>
                                        Subtotal
                                    </p>
                                    <h3>
                                        $${fetchCartSummaryJson.output.subtotal}
                                    </h3>
                                </div>
                                
                                <p id="note">
                                    * included vat + the Shipping cost stated by the company
                                </p>
                    
                                <button id="checkout">
                                    checkout items
                                </button>
                        `;

                        // append cartSummaryDiv to cartElement
                        cartElement.appendChild(cartSummaryDiv);
                    }

                    // _________________ CHECKOUT ___________________
                    const checkout = document.getElementById("checkout");
                    checkout.addEventListener("click",(e) => {
                        e.preventDefault();

                        alert("Checked out");
                    })

                } catch (err) {
                    console.log("Error while getting the summary of the cart");
                    console.log(err);
                }
                
            }


        } else {
            alert("You are unauthorized");
            window.location = window.location.href.replace("/cart/cart.html","/index.html");
        }
    } catch (err) {
        console.log("Error while getting the cart");
        console.log(err);
    }
}