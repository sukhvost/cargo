window.onload = function() {




    // block offers

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


    // validation form

    let formInputs = document.querySelectorAll('.form-inputs input');
    let btnForm = document.querySelector('.my_btn');

    btnForm.onclick = function() {
        validForm(btnForm, formInputs);
    }

    function validForm(btn, massInputs) {
        this.massInputs = massInputs;
        this.btn = btn;

        for (let j = 0; j < massInputs.length; j++) {
            massInputs[j].onfocus = function() {
                this.classList.remove('error');
                btn.disabled = false;
            }
        }

        for (let i = 0; i < massInputs.length; i++) {
            if (massInputs[i].value == '') {
                massInputs[i].classList.add('error');
                btn.disabled = true;
            }
        }
    }

}