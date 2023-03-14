let addCartBtn = document.querySelector(".product-card-buy");
if (addCartBtn) {
  addCartBtn.addEventListener("click", function(element) {
    let product = {
      id: element.target.parentElement.children[2].textContent,
      name: element.target.parentElement.parentElement.children[1].children[0].textContent,
      price: parseInt(element.target.parentElement.parentElement.children[2].children[0].children[0].textContent),
      img: element.target.parentElement.parentElement.children[1].children[1].children[0].children[0].children[0].src,
      inCart: 0
    };

    cartNumbers();
    setItems(product);
    totalCost(product);
    displayCart();
    onLoadCartNumbers();
    
    cartWindow.classList.add('show-cart');
    document.body.style.overflow = 'hidden';
    activeMenu = cartWindow;
  });
}


function displayCart() {
    let cartItems = localStorage.getItem('Cart');
    cartItems = JSON.parse(cartItems);
    let cartItemInfo = document.querySelector(".cart-item-info");
    let cartSubmit = document.querySelector('.cart-submit')
    let cartCost = localStorage.getItem('totalCost');

    // Check if cart is empty
    if (!cartItems || Object.keys(cartItems).length === 0) {
        cartItemInfo.innerHTML = '<p class="empty-message">Empty.</p>';
        cartSubmit.innerHTML = '';
        return;
    }
    
    cartItemInfo.innerHTML = '';
    Object.values(cartItems).map(item => {
        cartItemInfo.innerHTML += `
        <div class="cart-products">
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-title">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-size">Размер: S</div>
            </div>
            <div class="cart-item-quantity-flex">
                <i class='bx bx-minus'></i>
                <div class="cart-item-quantity">${item.inCart}</div>
                <i class='bx bx-plus'></i>
            </div>
            <div class="cart-item-price">${item.price * item.inCart} р.</div>
            <i class="bx bx-x" onclick="deleteItemFromCart('${item.id}')"></i>
        </div>
        `
    });
    cartSubmit.innerHTML = `
        <div class="total-price">Subtotal: ${cartCost} р.</div>
        <button type="button" class="btn-buy">CHECK-OUT</button>    
    `;
}

function setItems(product) {
    let cartItems = localStorage.getItem('Cart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null  ) {
        if (cartItems[product.id] == undefined) {
            cartItems={
                ...cartItems, 
                [product.id]:product
            }
        } 
        cartItems[product.id].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.id]: product    
        }
    }

    localStorage.setItem('Cart', JSON.stringify(cartItems));    
}

function deleteItemFromCart(id) {
    let cartItems = JSON.parse(localStorage.getItem('Cart'));
    let product = cartItems[id];
    let cartNumbers = parseInt(localStorage.getItem('cartNumbers'));
    let cartCost = parseInt(localStorage.getItem('totalCost'));

    if (product) {
        cartNumbers -= product.inCart;
        cartCost -= product.price * product.inCart;
        delete cartItems[id];
        localStorage.setItem('Cart', JSON.stringify(cartItems));
        localStorage.setItem('cartNumbers', cartNumbers);
        localStorage.setItem('totalCost', cartCost);

        displayCart();
        onLoadCartNumbers();
    }
} 

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    if (cartCost != null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price)
    }
}

function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers)
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart-number').innerHTML = `<span>${productNumbers + 1}</span>`;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart-number').innerHTML = `<span>1</span>`;
    }
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')  
    if (productNumbers && productNumbers > 0) {
        document.querySelector('.cart-number').innerHTML = `<span>${productNumbers}</span>`;
    }
    else {
        document.querySelector('.cart-number').innerHTML = "";
    }
}


window.onload = function() {
    onLoadCartNumbers();
    displayCart();
}