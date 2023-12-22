let product=localStorage.getItem("name");
const proDetails=document.getElementById("pro-details")
const productContainer=document.querySelector(".product-container")
console.log(product)

async function SingleProduct()
{
    const response=await fetch(`https://dummyjson.com/products/search?q=${product}`)
    const data = await response.json();
    console.log(data);
    DisplayProduct(data.products[0])
}


SingleProduct();

function DisplayProduct(product)
{
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

<input type="number" value="1">
<button class="normal">Add to Cart</button>
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
 


}

async function GetCategory(category)
{
    const response = await fetch(`https://dummyjson.com/products/category/${category}`);
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

