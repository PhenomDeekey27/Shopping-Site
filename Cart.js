const tableBody=document.querySelector(".table-body")

let CartProducts=JSON.parse(localStorage.getItem("cart"));
let finalProducts=[];
finalProducts=[...CartProducts];
localStorage.setItem("demo",JSON.stringify(finalProducts));

let cost;
let cart=document.getElementById("cart-table");
let total=0;
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

let lists=new Set();






function Additems(productList)
{
    console.log(productList)
    productList.length > 0 ?

    productList.map((items,id)=>
    {
        
        let tr=document.createElement("tr");
        
            tr.innerHTML=`
            <td>
            <a href="#"><i class="far fa-times-circle" id="remove" onclick=Remove(${items.id})></i></a></td>
                            <td><img src=${items.thumbnail} alt=""></td>
                            <td>${items.title}</td>
                            <td class="original">$${items.price}</td>
                            <td><input type="number" value="1" class="cart-input" onchange=handleprice() ></td>
                            <td class="finalprice">${items.price}</td>
            
            `;
            cost=items.price;
            tr.className="cart-products";
           
            tableBody.appendChild(tr);
         }):

         tableBody.innerHTML=`
         <p style="text-align: center; font-weight: bolder; font-size: 20px;">No Products Added</p>

         `
         total=total+cost
         
   
    cart.innerHTML=`
    <tr>
    <td>Cart Subtotal</td>
    <td>$${total}</td>
  </tr>
  <tr>
    <td>Shipping</td>
    <td>Free</td>
  </tr>
  <tr>
    <td><strong>Total</strong></td>
    <td>$${total}</td>
  </tr>
    `
    
      
        
 
}
window.onload=(Additems(CartProducts))

function print()
{
  console.log("print")
}






// cartInput.oninput=()=>handleprice()


function handleprice()
{
      const cartInput=document.querySelector(".cart-input");
    let Default=cartInput.defaultValue;
    let finalList=document.querySelector(".finalprice");
   const finalprice=parseInt((document.querySelector(".finalprice").textContent),10);
   let cartValue=cartInput.value;
  
   
 let price=document.querySelector(".original").textContent;
 let prices=parseInt(price.substring(1),10);
 console.log(finalprice,cartValue,prices)
 let correctedPrice;

   if(cartValue===0)
   {
    correctedPrice=prices;
   }
  
   if( cartValue > Default)
   {
       correctedPrice = cartValue*prices;
       Default=cartValue;
      
   }else
   {

  
    correctedPrice = finalprice-prices;
    console.log(correctedPrice,finalprice)
   }

   finalList.textContent=correctedPrice
   cart.innerHTML='';

   cart.innerHTML=`
    <tr>
    <td>Cart Subtotal</td>
    <td>$${correctedPrice}</td>
  </tr>
  <tr>
    <td>Shipping</td>
    <td>Free</td>
  </tr>
  <tr>
    <td><strong>Total</strong></td>
    <td>$${correctedPrice}</td>
  </tr>
    `

    console.log(total)
   
   


   
   
}

function Remove(ind)
{
  
   let arr=CartProducts.filter((product)=>product.id!=ind);
   CartProducts=[];
   CartProducts=[...arr];
   localStorage.setItem("cart",JSON.stringify(CartProducts))

   
   tableBody.innerHTML=""
   Additems(arr);
   cart.innerHTML="";


 
 
}

function Checkout()
{
   localStorage.clear();
   cart.innerHTML="";
   window.location.href="cart.html"
   alert("checkout Successful")

}












    
    


