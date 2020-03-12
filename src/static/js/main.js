let btn = document.querySelector('.arrow');
let blockOffers = document.querySelector('.section_offers');
// let visibleBlock = document.querySelector('.js_section_offers_block');


btn.onclick = toggler;

function toggler() {
    if (blockOffers.classList.contains('js_section_offers_none')) {
        blockOffers.classList.remove('js_section_offers_none');
        blockOffers.classList.add('js_section_offers_block');
    } else if (blockOffers.classList.contains('js_section_offers_block')) {
        blockOffers.classList.remove('js_section_offers_block');
        blockOffers.classList.add('js_section_offers_none');
    }
}