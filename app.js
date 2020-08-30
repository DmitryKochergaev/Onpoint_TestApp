window.addEventListener('load', function () {

    const sections = document.querySelectorAll('section');
    const content = document.querySelector('.main_content');

    let background = document.getElementsByClassName('background')[0];
    let slides = document.getElementsByClassName('sec_horizontal')[0];
    let scroll = document.getElementsByClassName('arrow_container')[0];
    let slider = document.getElementById("Slider_range");
    let spin_value = 0;
    let canScroll = true;
    let sec_nav = '';
    let touchStart = 0;
    let touchMoved = 0;

    document.body.addEventListener('touchstart', touchScreenStart);
    document.body.addEventListener('touchmove', touchScreenMoved);
    document.body.addEventListener('touchend', touchScreenEnd);
    document.body.insertAdjacentHTML('beforeend', ' <div class="section_navigation"></div>');


    background.style.backgroundSize = "100% " + (100 * sections.length) + "%";

    //sections navigation buttons
    for (let i = 0; i < sections.length; i++) {
        sec_nav += ' <div class="sec_button"></div>';
    }

    document.querySelector('.section_navigation').innerHTML = sec_nav;
    const buttons = document.querySelectorAll('.sec_button');
    buttons[0].classList.add('active');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            document.querySelector('.sec_button.active').classList.remove('active');
            this.classList.add('active');
            spin_value = i;
            scroll_content(spin_value);
        });
    }

    //MouseWheel scrolling listener
    window.addEventListener('mousewheel', function (e) {
            if (canScroll) {
                canScroll = false;
                if (e.deltaY > 0) {
                    if (spin_value < sections.length - 1) {
                        spin_value++;
                    }
                } else {
                    if (spin_value > 0) {
                        spin_value--;
                    }
                }
                scroll_content(spin_value);
            }
            setTimeout(function () {
                canScroll = true;
            }, 800);
        }
    )

    //scroll function
    //changes button's active class
    //changes arrow opacity on 1st section
    function scroll_content(count) {
        content.setAttribute('style', 'transform: translateY(-' + count * 100 + 'vh);');
        document.querySelector('.sec_button.active').classList.remove('active');
        buttons[count].classList.add('active');
        background.style.backgroundPositionY = ((100 / (sections.length - 1)) * count) + '%';
        console.log('count', count);
        console.log('scroll', scroll);
        console.log('scroll.style.opacity', scroll.style.opacity);
        if (count >= 1) {
            scroll.style.opacity = 0;
        } else {
            scroll.style.opacity = 1;
        }
    }

    //touchScreen measuring distance START
    function touchScreenStart(e) {
        touchStart = e.touches[0].clientY;
    }

    //touchScreen measuring distance MOVE
    function touchScreenMoved(e) {
        return touchMoved = (touchStart - e.touches[0].clientY);
    }

    //touchScreen measuring distance ENDS
    //moves sections if touchMOVE > 100px || < -100
    function touchScreenEnd() {
        if (canScroll) {
            canScroll = false;
            if (touchMoved < -100) {
                if (spin_value > 0) {
                    spin_value--;
                }
            } else if (touchMoved > 100) {
                if (spin_value < sections.length - 1) {
                    spin_value++;
                }
            }
            console.log('spin_value', spin_value);
            console.log('touchMoved', touchMoved);
            scroll_content(spin_value);
        }
        setTimeout(() => {
            canScroll = true;
        }, 800);
    }

    //horizontal slider listener
    //changes leftMargin on slider move
    slider.onchange = function (e) {
        console.log('slider.value', slider.value);
        if (slider.value > 75) {
            slides.style.marginLeft = '-200%';
            slider.value = 100;
        } else if (slider.value >= 30 && slider.value <= 75) {
            slides.style.marginLeft = '-100%';
            slider.value = 50;
        } else if (slider.value < 30) {
            slides.style.marginLeft = '0%';
            slider.value = 0;
        }
        console.log('slider', slider);
        console.log('slides', slides);
    }

})

