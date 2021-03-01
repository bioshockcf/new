let carts = document.querySelectorAll('.add-cart');

let products =[
{
 name : 'Grey Shirt',
 tag  :'greyshirt',
 price: 10.00,
 inCart: 0
},
{
    name : 'White Shirt',
    tag  :'whiteshirt',
    price: 15.00,
    inCart: 0
 },
{
    name : 'Blue Shirt',
    tag  :'blueshirt',
    price: 20.00,
    inCart: 0
},
{
    name : 'SBlue Shirt',
    tag  :'sblueshirt',
    price: 25.00,
    inCart: 0


},
{
    name : 'Blue Tshirt',
    tag  :'bluetshirt',
    price: 30.00,
    inCart: 0

},
{
    name : 'Black Tshirt',
    tag  :'blacktshirt',
    price: 35.00,
    inCart: 0
},


];

for(let i=0; i< carts.length; i++){
carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
})
}

function onLoadCartNumbers(){

    let productNumbers = localStorage.getItem('cartNumbers');    
if(productNumbers){
    document.querySelector('.cart span').textContent = productNumbers;
}

}




function cartNumbers(product) {
    
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers =  parseInt(productNumbers);
    
    if(productNumbers){
     localStorage.setItem('cartNumbers', productNumbers + 1);
     document.querySelector('.cart span').textContent = productNumbers + 1;
    }else {
localStorage.setItem('cartNumbers', 1);
document.querySelector('.cart span').textContent = 1;
 
}
setItems (product);
}

function setItems(product){
let cartItems = localStorage.getItem('productsInCart');
cartItems = JSON.parse(cartItems);

 if(cartItems != null){

    if(cartItems[product.tag] ==undefined ){
cartItems = {


    ...cartItems,
    [product.tag]:product
}

    }
     
cartItems[product.tag].inCart += 1 ;

 } else{

product.inCart  = 1;
cartItems = {
    [product.tag]: product
}

 }


 localStorage.setItem("productsInCart", JSON.stringify 
 (cartItems));
}
function totalCost(product){
let cartCost = localStorage.getItem('totalCost');

console.log("My cartCost is",  cartCost);
console.log(typeof cartCost);

if(cartCost != null){
    cartCost = parseInt(cartCost);
localStorage.setItem("totalCost", cartCost +  product.price);
}else {
    localStorage.setItem("totalCost", product.price);
}

}

function displayCart() {
let cartItems = localStorage.getItem("productsInCart");
cartItems = JSON.parse(cartItems);
let productContainer = document.querySelector(".products");
let cartCost = localStorage.getItem('totalCost');

console.log(cartItems);
if( cartItems && productContainer ) {
    productContainer.innerHTML ='';
Object.values(cartItems).map(item => {
    productContainer.innerHTML += `
   
    <div class="product-details">
        <div class="div1">
            <div class="product-img"><img src="./img/${item.tag}.jpg" style="height:100px; margin-right:20px;"></div>
            <div class="product-name"><p>${item.name}</p></div>
            <div class="product-price"><p>${item.price}.00</p></div>
            <div><p>${item.inCart}</p></div>
            <div class="product-total"><p>$${item.inCart * item.price}.00</p></div>
            
        </div>

    </div>
    `
    ;

});

productContainer.innerHTML += ` 
<div class="basketTotalContainer">
<h4 class="basketTotalTitle">

Basket Total
</h4>
<h4 class="basketTotal">
$${cartCost}.00
</h4>




`;
}





}

onLoadCartNumbers();
displayCart();