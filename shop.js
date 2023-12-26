let product=localStorage.getItem("name");
const proDetails=document.getElementById("pro-details")
const productContainer=document.querySelector(".product-container")

let finalPro=new Set();
localStorage.setItem("final",JSON.stringify(finalPro));

const bar=document.getElementById("bar")
const navbar=document.getElementById("Navlinks");
const mobile=document.getElementById("mobile");
const close=document.getElementById("close");

bar.addEventListener("click",()=>
{
   
    navbar.classList.add("active");
    mobile.style.display="none"
});

close.addEventListener('click',()=>
{
    navbar.classList.remove("active");
    mobile.style.display='flex'
})


async function SingleProduct()
{
    const response=await fetch(`https://dummyjson.com/products/${product}`)
    const data = await response.json();
  
   
    DisplayProduct(data)
}

async function RandomProducts()
{
    const response= await fetch('https://dummyjson.com/products?limit=5&skip=30')
    const data = await response.json();
    
    let productList=[];



    productList=[...data.products];
    
   

   productList.map((products)=>
   {
    
   let product=document.createElement("div");
  
    product.className="product"
    product.innerHTML=  `
     <img src=${products.thumbnail} alt="pro-1">
     <div class="desc">
            <span>${products.brand}</span>
            <h5>${products.title}</h5>
            <div class="star">
            <i class="fa-solid fa-star"></i> <p>${products.rating}</p>
            </div>
            <h4>$${products.price}</h4>
    </div>
    <a href="#"><i class="fa-solid fa-cart-shopping cart"></i></a> `
    
        product.onclick=()=>sendName(products.id)
        product.onclick=()=>DisplayProduct(products)
        
    
         productContainer.appendChild(product)
         
         
   })
   
   

}
if(product!=null){
    SingleProduct();
}else
{
    RandomProducts();

}


function DisplayProduct(product)
{
    productContainer.innerHTML='';
    const proimage=document.createElement("div");
    proimage.className="pro-image"
    proDetails.innerHTML='';
    
    proimage.innerHTML=`
    <img src=${product.thumbnail} alt="" width="100%" id="MainImg">
   
    <div class="small-imgs">
        <div class="small-imgs-col">
            <img src=${product.images[0]} alt="" width="100%" class="small-img">
        </div>
        <div class="small-imgs-col">
            <img src=${product.images[1]} alt="" width="100%" class="small-img">
        </div>
        <div class="small-imgs-col">
            <img src=${product.images[2]} alt="" width="100%" class="small-img">
        </div>
       
       
    </div>
    
    `
    proDetails.appendChild(proimage);

const MainImg=document.getElementById("MainImg");
const SmallImg=document.getElementsByClassName("small-img");

for(let img of SmallImg)
{
    img.addEventListener("click",()=>
    {
      MainImg.src=img.src
    })
}

const singleProDetails=document.createElement("div");
singleProDetails.className="single-pro-details";
singleProDetails.innerHTML=`

<h6>${product.brand}</h6>
<h2>${product.title}</h2>
<h2>$${product.price}</h2>


<button class="normal cart-btn">Add to Cart</button>
<button class="normal" onclick='window.location.href="cart.html"'>Go to Cart</button>
<h4>Product Details</h4>
<span>${product.description}</span>
<div class="desc-pro">
<h2 >${product.stock}</h2>
<p style="color: green;">On stock</p>
</div>
<div class="desc-pro">
<h2>${product.rating}</h2>
<p style="color: red;">Reviews</p>
</div>
`
proDetails.appendChild(singleProDetails)
 let category=product.category;
 GetCategory(category)
 window.scrollTo({
    top:0,
    behavior:"smooth"
 })

 const cartBtn=document.querySelector(".cart-btn");
 cartBtn.onclick=()=>AddCart(product);
     


}

async function GetCategory(category)
{
    const response = await fetch(`https://dummyjson.com/products/category/${category}?limit=5`);
    const data= await response.json();
   
    DisplayCategory(data.products)
   
}

function DisplayCategory(datas)
{
   let productList=[...datas];
   

   productList.map((products)=>
   {
    
   let product=document.createElement("div");
  
    product.className="product"
    product.innerHTML=  `
     <img src=${products.thumbnail} alt="pro-1">
     <div class="desc">
            <span>${products.brand}</span>
            <h5>${products.title}</h5>
            <div class="star">
            <i class="fa-solid fa-star"></i> <p>${products.rating}</p>
            </div>
            <h4>$${products.price}</h4>
    </div>
    <a href="#"><i class="fa-solid fa-cart-shopping cart"></i></a> `
    
       
        product.onclick=()=>DisplayProduct(products)
        productContainer.appendChild(product)
        

   })
}



function AddCart(product)
{
    alert("Item added to Cart")
   finalPro.add(product)
    let cartItems=localStorage.getItem("cart");
    let data=[];
    if(cartItems)
    {
        values=JSON.parse(localStorage.getItem("cart"));
    }
    finalPro.forEach((keys)=>
    {
        data.push(keys)
       
    })
    localStorage.setItem("cart",JSON.stringify(data))
    
    
}




