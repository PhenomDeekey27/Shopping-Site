const url=`https://dummyjson.com/products`;
let productContainer=document.querySelector(".product-container")
let searchValue;
const search=document.getElementById("search");
let productList=[];

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

async function getProducts()
{
    const response= await fetch(url);
    let data= await response.json();
   
 
   DisplayProduct(data.products)
  
}



function DisplayProduct(datas)
{
    productList=[...datas];
    
   

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
    
         productContainer.appendChild(product)
         
   })
}


function sendName(product)
{
   console.log(product)
  
    let name=localStorage.getItem("name")
    if(name!=null)
    {
        localStorage.removeItem("name")
    }

    localStorage.setItem("name",product)
    window.location.href="shop.html"

}

function handlechange()
{
    let searchtext=document.getElementById("search-input").value;
    searchValue=searchtext;

    if(searchtext==null ||searchtext=="")
    {
        getProducts();
     
      
    }else
    {
        SearchResult(searchtext);
    }
    
  
}

 function SearchResult(text)
{
   console.log(productList)
    let temp;
    temp=productList.filter((product)=>(product.title.toLowerCase().includes(text.toLowerCase()))||(product.brand.toLowerCase().includes(text.toLowerCase())))
    
    productContainer.innerHTML=''

    DisplayProduct(temp);
}





   
 
  


    







