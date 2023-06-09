
const styleEle = document.querySelector('.style');
const randomBtn = document.querySelector('.random');
const downloadImgBtn = document.querySelector('.donwloadImg');
const accessorizebtns = document.querySelectorAll('[data-accessorize]');
const alpacaImgHolder = document.querySelector('.imgHolder');
const alpacaImgs = document.querySelectorAll('.alpaca-img');
let styleBtns = document.querySelectorAll('[data-style]');


const  accessorize = {
    accessories : ['earings', 'flower', 'glasses', 'headphone'],
    backgrounds : ['blue50', 'blue60', 'blue70', 'darkblue30', 'darkblue50', 'darkblue70', 'green50', 'green60', 'green70', 'grey40', 'grey70', 'grey80', 'red50', 'red60', 'red70', 'yellow50', 'yellow60', 'yellow70'],
    ears : ['default', 'tilt-backward', 'tilt-forward'],
    eyes : ['default', 'angry', 'naughty', 'panda', 'smart', 'star'],
    hair : ['default', 'bang', 'curls', 'elegant', 'fancy', 'quiff', 'short'],
    leg : ['default', 'bubble-tea', 'cookie', 'game-console', 'tilt-backward', 'tilt-forward'],
    mouth : ['default', 'astonished', 'eating', 'laugh', 'tongue'],
    neck : ['default', 'bend-backward', 'bend-forward', 'thick'],
    // nose has only one style so we are going to ingnore it for the rest of the code
}

// This object will halp us what style are seleced on each Accessorize
const eachStyle = {
    accessories : 'earings',
    ears : 'default',
    eyes : 'default',
    hair : 'default',
    leg : 'default',
    mouth : 'default',
    neck : 'default',
    backgrounds : 'blue50'
}

let pickedAccessorize = 'hair';
let pickedStyle = eachStyle[pickedAccessorize];
let list = accessorize.pickedAccessorize;


function handelAccessorize(e) {
    // set the Accessorize to get styles, set eachStyle and Image for that Accesssorize
    pickedAccessorize = this.name;
    const changeImg = [...alpacaImgs].find(img => img.name === pickedAccessorize);
    pickedStyle = eachStyle[pickedAccessorize];
    list = accessorize[`${pickedAccessorize}`];
    eachStyle[pickedAccessorize] = pickedStyle;

    // first remove bakckgorund from each button and add background to clicked button
    accessorizebtns.forEach(btn =>{
        btn.classList.remove('bg-purple-900');
        btn.classList.remove('white');
    });
    this.classList.add('white');
    this.classList.add('bg-purple-900');

    // display the style button for that specific Accessorize
    // We need to use .join() method because list.map is going to return array 
    // We want single array to display in DOM 
    const text = list.map((item, index) => {
        return `
        <button data-style name="${list[index]}" class="btn">
        ${list[index]}
        </button>
        `
    }).join('');
    styleEle.innerHTML = text;
    
    // Every time we create style button for Accessorize 
    // we need to select and add style to it eachStyle(object)
    styleBtns = document.querySelectorAll('[data-style]');
    lastStyleBtn =  undefined ? styleBtns[0] : [...styleBtns].find(btn => btn.name === pickedStyle);
    lastStyleBtn.classList.add('white');
    lastStyleBtn.classList.add('bg-purple-900');
    
    // note : we need to add this eventListener 'cause we are created button elmeent 
    // each time we pick accessorize
    styleBtns.forEach(btn => {
        btn.addEventListener('click', handleStyle);
    });
}

function handleStyle() {
    // We have to find pickAccessorize this way because 
    // If we clicked random button and then we directyly clik on style buttons,
    // Javascipt will throw and arror
    pickedAccessorize = [...accessorizebtns].find(btn => btn.classList.contains('white')).name
    // get the img and apply the style to cliked button
    const changeImg = [...alpacaImgs].find(img => img.name === pickedAccessorize)
    containClass = [...styleBtns].some(btn => btn.classList.contains('white'));
    // remove style and add the style that we clicked on
    if(containClass){
       styleBtns.forEach(btn => {
        btn.classList.remove('white');
        btn.classList.remove('bg-purple-900');
       })
    }
    this.classList.add('white');
    this.classList.add('bg-purple-900');
    // get the each styel for the specific part of alpaca
    eachStyle[pickedAccessorize] = this.name
    pickedStyle = eachStyle[pickedAccessorize]
    
    changeImg.src = `./alpaca/${pickedAccessorize}/${pickedStyle}.png`;
}

function randomizeImg() {
    // take each img and update the each styely randomly
    // and change the value of eachStyle and img src 
    alpacaImgs.forEach(img => {
        //we don't need to itarate over nose because there is only one style for nose
        if(img.name != 'nose'){
            pickedAccessorize = img.name
            list = accessorize[`${pickedAccessorize}`]
            randomNum = Math.floor(Math.random() * list.length)
            pickedStyle = list[randomNum];
            // change eachStyle to add selected background
            eachStyle[pickedAccessorize] = pickedStyle;
            img.src = `./alpaca/${img.name}/${pickedStyle}.png`
            // handleStyle()
        }else{
            return
        }
    })
}

function downloadImg() {
    // get the height and widht 
    const holderWidth = alpacaImgHolder.offsetWidth;  
    const holderHeight = alpacaImgHolder.offsetHeight;   

    // to be able to get the 
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // To make img bigger 
    const scaled = 3
    canvas.width = holderWidth * scaled;
    canvas.height = holderHeight * scaled;

    // We are going to draw each img on canvas
    alpacaImgs.forEach(img => {
        const scaledWidth = img.width * scaled
        const scaledHeight = img.height * scaled;
        ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
    });

    // create new link to set img to download
    const link = document.createElement('a')
    link.href = canvas.toDataURL("img/png");
    link.download = 'alpaca.png';

    // Automate the donwload process
    link.click();
}

accessorizebtns.forEach(btn=> {
    btn.addEventListener('click', handelAccessorize);
});
styleBtns.forEach(btn => {
    btn.addEventListener('click', handleStyle);
});
randomBtn.addEventListener('click', randomizeImg);
downloadImgBtn.addEventListener('click', downloadImg);