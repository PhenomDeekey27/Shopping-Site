
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