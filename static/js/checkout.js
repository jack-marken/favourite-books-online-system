const cart = JSON.parse(localStorage.getItem('cart')) || []

function prepareCart() {
    var totalPrice = 0;
    for (i = 0; i < cart.length; i++) {
        totalPrice += (cart[i].quantity * cart[i].price)
    }
    document.getElementById("total-price").innerHTML = "Total Price: " + totalPrice
}

// Check validity and move to checkoutSuccess if valid
function checkPayment() {
    var form = document.getElementById("checkout-form");
    var elements = form.elements;
    var valid = true;

    for (i = 0; i < elements.length; i++) {
        if (elements[i].value == "") {
            if (valid) alert("Fill in all fields.")
            valid = false;
        }
    }

    if (valid) {
        // Add Order details to db/storage
        
        // Empty cart and move to checkoutSuccess
        cart.splice(0, cart.length)
        localStorage.setItem('cart', JSON.stringify(cart))
        window.location.href = "checkoutSuccess";
    }
   
}