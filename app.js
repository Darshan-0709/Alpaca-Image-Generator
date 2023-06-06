
const style = document.querySelector('.style');
const accessorizebtns = document.querySelectorAll('[data-accessorize]');
const alpacaImgs = document.querySelectorAll('.alpaca-img');
console.log()


const  accessorize = {
    accessories : ['earings', 'flower', 'glasses', 'headphone'],
    backgrounds : ['blue50', 'blue60', 'blue70', 'darkblue30', 'darkblue50', 'darkblue70', 'green50', 'green60', 'green70', 'grey40', 'grey70', 'grey80', 'red50', 'red60', 'red70', 'yellow50', 'yellow60', 'yellow70'],
    ears : ['default', 'tilt-backward', 'tilt-forward'],
    eyes : ['default', 'angry', 'naughty', 'panda', 'smart', 'star'],
    hair : ['bang', 'curls', 'elegant', 'fancy', 'quiff', 'short'],
    leg : ['default', 'bubble-tea', 'cookie', 'game-console', 'tilt-backward', 'tilt-forward'],
    mouth : ['default', 'astonished', 'eating', 'laugh', 'tongue'],
    neck : ['default', 'bend-backward', 'bend-forward', 'thick'],
}
const eachStyle = {
    accessories: 0,
    ears: 0,
    eyes: 0,
    hair: 0,
    leg: 0,
    mouth: 0,
    neck: 0,
}

let name = '';
let pickedAccessorize;

function handleClick(e) {
    pickedAccessorize = this;
    coords = this.getBoundingClientRect()
    console.log(coords)
    const search = this.innerHTML.trim().toLowerCase();
    const list = accessorize[`${search}`];
    const changeImg = [...alpacaImgs].find(img => img.name === search);
    const randomIndex = Math.floor(Math.random() * list.length);
    console.log(Math.floor(Math.random() * list.length));
    const text = list.map((item, index) => {
        return `
        <button data-accessorize name="${list[index]}" class="btn">${list[index]}</button>
        `
    }).join('');
    style.innerHTML = text;
    changeImg.src =`./alpaca/${search}/${list[randomIndex]}.png`;
}

accessorizebtns.forEach(btn=> {
    btn.addEventListener('click', handleClick);
});

