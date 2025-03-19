// END O THE CODES 😁*/
function togglelogoMenu(){
    document.getElementById("logoSide").classList.toggle("show");
    document.getElementById("overlay").classList.toggle("show")
}


document.getElementById("Btn").addEventListener("click", function(){
    this.style.color = "white";
    this.style.backgroundColor = "#0c3cb5";
})



const whoBtn = document.getElementById('whoBtn')
const ourBtn = document.getElementById('ourBtn')
const hisBtn = document.getElementById('hisBtn')
const content = document.getElementById('content')

function clearActiveContent() {
    whoBtn.classList.remove('active')
    ourBtn.classList.remove('active')
    hisBtn.classList.remove('active')
}
whoBtn.classList.add('active')

content.innerHTML = `
<p style=" margin-left: 40px; font-size: 18px;">Lorem, ipsum dolor sit amet consectetur  adipisicing elit. <br> Nemo molestiae repudiandae in,?</p>
<p style=" margin-left: 40px; font-size: 18px;">Lorem, ipsum dolor sit amet consectetur <br> adipisicing elit. Nemo molests! Adipisci qui iure dolores?</p>
`;

whoBtn.addEventListener('click', () => {
    clearActiveContent()
    whoBtn.classList.add('active')

    content.innerHTML = `
    <p style=" margin-left: 40px; font-size: 18px;">Lorem, ipsum dolor sit amet consectetur  adipisicing elit. <br> Nemo molestiae repudiandae in,?</p>
    <p style=" margin-left: 40px; font-size: 18px;">Lorem, ipsum dolor sit amet consectetur <br> adipisicing elit. Nemo molests! Adipisci qui iure dolores?</p>
    `;
})


ourBtn.addEventListener('click', () => {
    clearActiveContent()
    ourBtn.classList.add('active')

    
    content.innerHTML = `
    <p style=" margin-left: 40px; font-size: 18px;">Lorem, ipsum dolor sit amet consectetur  adipisicing elit. iure dolores?</p>
    <p style=" margin-left: 40px; font-size: 18px;">Lorem, ipsum dolor sit amet consectetur <br> adipisicing elit. Nemo molests! Adipisci qui iure dolores <br> ipsum dolor sit amet consectetur ?</p>
    `;
})


hisBtn.addEventListener('click', () => {
    clearActiveContent()
    hisBtn.classList.add('active')

    content.innerHTML = `

    <p style=" margin-left: 40px; font-size: 18px;">Lorem, ipsum dolor sit amet consectetur  adipisicing elit. Nem,  <br> ipsum dolor sit amet consectetur i qui iure dolores?</p>
    <p style=" margin-left: 40px; font-size: 18px;">Lorem, ipsum dolor sit amet consectetur <br> adipisicing elit. Nemo molests! Adipisci qui iure dolores?</p>
    `;

})


content.addEventListener('click', () => {
    clearActiveContent()
    content.classList.add('active')

    content.innerHTML = `
    <p style=" margin-left: 40px; font-size: 18px;">Lorem, ipsum dolor sit amet consectetur  adipisicing elit. Nem,  <br> ipsum dolor sit amet consectetur i qui iure dolores?</p>
    <p style=" margin-left: 40px; font-size: 18px;">Lorem, ipsum dolor sit amet consectetur <br> adipisicing elit. Nemo molests! Adipisci qui iure dolores?</p>
    `;
})


// END OF FIRST ONE

const workBtn = document.getElementById('workBtn')
const brandBtn = document.getElementById('brandBtn')
const markBtn = document.getElementById('markBtn')
const planBtn = document.getElementById('planBtn')
const resBtn = document.getElementById('resBtn')
const contents = document.getElementById('contents')

function clearActiveContents (){
    workBtn.classList.remove('active')
    brandBtn.classList.remove('active')
    markBtn.classList.remove('active')
    planBtn.classList.remove('active')
    resBtn.classList.remove('active')
}

workBtn.classList.add('active')
contents.innerHTML = `
<div id="all" style="display: flex; padding-left: 50px; gap: 40px; padding-right: 56px; padding-top: 37px;">

<div id="img1">
        <img src="./img/img15.png" alt="">
        <h1 id="h1">Graphics Design</h1>
        <p id="p">Short description for the ones who look for <br> something new. Awesome!</p>
</div>

<div id="img2">
        <img src="./img/img16.png" alt="">
        <h1 id="h1">Web Development</h1>
        <pi d="p">Short description for the ones who look for something new. Awesome!</p>
</div>

<div id="img3">
        <img src="./img/img17.png" alt="">
        <h1 id="h1">App Development</h1>
        <pi d="p">Short description for the ones who look for something new. Awesome!</p>
</div>

</div>

<div id="all2" style="display: flex; gap: 20px; padding-left: 50px; padding-right: 56px;">

<div id="img4">
        <img src="./img/img18.png" alt="">
        <h1 id="h1">Digital Marketing</h1>
        <pi d="p">Short description for the ones who look for something new. Awesome!</p>
</div>

<div id="img5">
        <img src="./img/img19.png" alt="">
        <h1 id="h1">SEO Services</h1>
        <pi d="p">Short description for the ones who look for something new. Awesome!</p>
</div>

<div id="img6">
        <img src="./img/img20.png" alt="">
        <h1 id="h1">Product Design</h1>
        <pi d="p">Short description for the ones who look for something new. Awesome!</p>
</div>

</div>
    `;

workBtn.addEventListener('click', () => {
    clearActiveContents()
    workBtn.classList.add('active')

    contents.innerHTML = `
    <div id="all" style="display: flex; padding-left: 50px; gap: 40px; padding-right: 56px;  padding-top: 37px;">
<div id="img1">
        <img src="./img/img15.png" alt="">
        <h1 id="h1">Graphics Design</h1>
        <p id="p">Short description for the ones who look for <br> something new. Awesome!</p>
</div>

<div id="img2">
        <img src="./img/img16.png" alt="">
        <h1 id="h1">Web Development</h1>
        <pi d="p">Short description for the ones who look for something new. Awesome!</p>
</div>

<div id="img3">
        <img src="./img/img17.png" alt="">
        <h1 id="h1">App Development</h1>
        <pi d="p">Short description for the ones who look for something new. Awesome!</p>
</div>

</div>

<div id="all2" style="display: flex; gap: 20px; padding-left: 50px; padding-right: 56px;">

<div id="img4">
        <img src="./img/img18.png" alt="">
        <h1 id="h1">Digital Marketing</h1>
        <pi d="p">Short description for the ones who look for something new. Awesome!</p>
</div>

<div id="img5">
        <img src="./img/img19.png" alt="">
        <h1 id="h1">SEO Services</h1>
        <pi d="p">Short description for the ones who look for something new. Awesome!</p>
</div>

<div id="img6">
        <img src="./img/img20.png" alt="">
        <h1 id="h1">Product Design</h1>
        <pi d="p">Short description for the ones who look for something new. Awesome!</p>
</div>

</div>
    `;
})


brandBtn.addEventListener('click', () => {
    clearActiveContents()
    brandBtn.classList.add('active')

    
    contents.innerHTML = `
<div id="all3" style="display: flex; padding-left: 50px;  padding-top: 37px; margin-left: 100px; margin-right: 300px;">

<div id="img7">
        <img src="./img/img21.jpeg" alt="">
         <h1 id="h1">Graphics Design</h1>
        <pi d="p">Short description for the ones who look for <br> something new. Awesome!</p>
</div>



</div>
    `;
})


markBtn.addEventListener('click', () => {
    clearActiveContents()
    markBtn.classList.add('active')

    contents.innerHTML = `
<div id="all4" style="display: flex; padding-left: 50px;  padding-top: 37px; margin-left: 100px;">

<div id="img9">
    <img src="./img/img23.webp" alt="">
     <h1 id="h1">App Development</h1>
     <pi d="p">Short description for the ones who look for <br> something new. Awesome!</p>
</div>

<div id="img10">
    <img src="./img/img24.jpg" alt="">
     <h1 id="h1">Product Design</h1>
     <pi d="p">Short description for the ones who look for <br> something new. Awesome!</p>
</div>

</div>

    `;
})

planBtn.addEventListener('click', () => {
    clearActiveContents()
    planBtn.classList.add('active')

    contents.innerHTML = `
<div id="all5" style="display: flex; padding-left: 50px;  padding-top: 37px; margin-left: 100px;">

<div id="img11">
    <img src="./img/img25.jpg" alt="">
     <h1 id="h1">Digital Marketing</h1>
      <pi d="p">Short description for the ones who look for <br> something new. Awesome!</p>
</div>

</div>
    `;
})

resBtn.addEventListener('click', () => {
    clearActiveContents()
    resBtn.classList.add('active')

    contents.innerHTML = `
<div id="all6" style="display: flex; padding-left: 50px;  padding-top: 37px; margin-left: 100px;">

<div id="img12">
    <img src="./img/img26.avif" alt="">
     <h1 id="h1">Web Development</h1>
       <pi d="p">Short description for the ones who look for <br> something new. Awesome!</p>
</div>

</div>
    `;
})


const track = document.querySelector(".testimonial-track");
const dots = document.querySelectorAll(".dot");
let index = 0;
const totalSlides = Math.ceil(track.children.length / 2); // Each slide now contains 2 testimonials

function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

setInterval(() => {
    index = (index + 1) % totalSlides;
    updateCarousel();
}, 3000);

/* END OF THE CODES 😁🔥*/