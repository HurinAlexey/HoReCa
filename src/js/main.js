//Search form toggle
$('#search-toggle').click(() => {
    $('#site-header .search-form').fadeToggle(500);
});


//Popover
let popoverSelectors = $('.product-info .block-item, .price .wholesale .info');
$(popoverSelectors).popover();

$(popoverSelectors).mouseover(function() {
    $(this).popover('show');
});

$(popoverSelectors).mouseout(function() {
    $(this).popover('hide');
});

$(popoverSelectors).click(function() {
    $(this).popover('show');
});


//Custom select
$('.btn-select').click(function() {
    $(this).toggleClass('active');

    if($(this).hasClass('active')) {
        $(this).closest('.select-wrap').find('.select-list, .select-grid').slideDown(100);
    } else {
        $(this).closest('.select-wrap').find('.select-list, .select-grid').slideUp(100);
    }
});

$('.select-list li').click(function() {
    let value = $(this).text();
    let wrap = $(this).closest('.select-wrap');

    $(wrap).find('li').removeClass('active');
    $(this).addClass('active');
    $(wrap).attr('data-value', value);
    $(wrap).find('.btn-select').text(value);
    $(wrap).find('.btn-select').removeClass('active');
    $(this).closest('.select-list').slideUp(100);
});

$('.select-grid li').mouseover(function() {
    let title = $(this).attr('data-name');
    let imgSrc = $(this).find('img').attr('src');
    let currentModal = $(this).closest('.select-grid').find('.current-modal');

    $(currentModal).find('img').attr('src', imgSrc);
    $(currentModal).find('h5').text(title);
    $(currentModal).css('display', 'block');
});

$('.select-grid li').mouseout(function() {
    let currentModal = $(this).closest('.select-grid').find('.current-modal');

    $(currentModal).css('display', 'none');
});

$('.select-grid li').click(function() {
    let value = $(this).attr('data-name');
    let wrap = $(this).closest('.select-wrap');

    $(wrap).find('li').removeClass('active');
    $(this).addClass('active');
    $(wrap).attr('data-value', value);
    $(wrap).find('.btn-select').text(value);
    $(wrap).find('.btn-select').removeClass('active');
    $(this).closest('.select-grid').slideUp(100);
});

$(document).click((e) => {
    if($(e.target).closest('#product-type').length === 0) {
        $('#product-type .select-list').slideUp(100);
        $('#product-type .btn-select').removeClass('active');
    }
});

$(document).click((e) => {
    if($(e.target).closest('#product-color').length === 0) {
        $('#product-color .select-grid').slideUp(100);
        $('#product-color .btn-select').removeClass('active');
    }
});


//Quantity input
$('.quantity .btn-plus').click(function() {
    let input = $(this).closest('.quantity').find('input');
    $(input).val(+$(input).val() + 1);

    if($(input).closest('.order-list').length !== 0) {
        calculateOrderCost(input, $(input).val())
    } else if($(input).closest('.mobile-order-list').length !== 0) {
        calculateOrderCostMobile(input, $(input).val())
    }
});

$('.quantity .btn-minus').click(function() {
    let input = $(this).closest('.quantity').find('input');

    if($(input).val() > 1) {
        $(input).val(+$(input).val() - 1);
    }

    if($(input).closest('.order-list').length !== 0) {
        calculateOrderCost(input, $(input).val())
    } else if($(input).closest('.mobile-order-list').length !== 0) {
        calculateOrderCostMobile(input, $(input).val())
    }
});

$('.quantity input').blur(function() {
    let currentVal = $(this).val();
    $(this).val(+currentVal);

    if($(this).val() < 1) {
        $(this).val(1);
    }

    if($(input).closest('.order-list').length !== 0) {
        calculateOrderCost(input, $(input).val())
    } else if($(input).closest('.mobile-order-list').length !== 0) {
        calculateOrderCostMobile(input, $(input).val())
    }
});

$('.quantity input').keypress(function(key) {
    if(key.charCode < 48 || key.charCode > 57) return false;
});

$('.quantity input').on("cut copy paste",function(e) {
    e.preventDefault();
});

function calculateOrderCost(elem, quantity) {
    let price = $(elem).closest('tr').find('.product-price').text();
    let sum = +price * +quantity;
    $(elem).closest('tr').find('.sum').text(sum);

    calculateTotalCost(elem);
}

function calculateOrderCostMobile(elem, quantity) {
    let price = $(elem).closest('.product-item').find('.product-price').text();
    let sum = +price * +quantity;
    $(elem).closest('.product-item').find('.sum').text(sum);

    calculateTotalCostMobile(elem);
}

function calculateTotalCost(elem) {
    let totalSum = 0;
    $(elem).closest('.order-list').find('.sum').each(function() {
        totalSum += +$(this).text();
    });

    $(elem).closest('.order-list').find('.total-sum').text(totalSum + ' грн');
}

function calculateTotalCostMobile(elem) {
    let totalSum = 0;
    $(elem).closest('.mobile-order-list').find('.sum').each(function() {
        totalSum += +$(this).text();
    });

    $(elem).closest('.mobile-order-list').find('.total-sum').text(totalSum + ' грн');
}

$(document).ready(function() {
    if($('.order-list').length !== 0) {
        $('.order-list .quantity input').each(function() {
            calculateOrderCost(this, $(this).val());
        });

        calculateTotalCost($('.order-list'));
    }

    if($('.mobile-order-list').length !== 0) {
        $('.mobile-order-list .quantity input').each(function() {
            calculateOrderCostMobile(this, $(this).val());
        });

        calculateTotalCostMobile($('.mobile-order-list'));
    }
});


//Price slider
let priceSlider = document.getElementById('price-slider');

if($(priceSlider).length) {
    noUiSlider.create(priceSlider, {
        start: [+$(priceSlider).attr('data-min'), +$(priceSlider).attr('data-max')],
        connect: true,
        step: 1,
        range: {
            'min': +$(priceSlider).attr('data-min'),
            'max': +$(priceSlider).attr('data-max')
        }
    });

    let nodes = [
        document.getElementById('lower-price'),
        document.getElementById('upper-price')
    ];

    // Display the slider value and how far the handle moved
    // from the left edge of the slider.
    priceSlider.noUiSlider.on('update', function (values, handle) {
        nodes[handle].innerHTML = Math.floor(values[handle]) + ' грн';
    });
}


//Modal product carousel show current index
$('#modal-carousel').on('slide.bs.carousel', function (e) {
    let currentIndex = $(e.relatedTarget).index() + 1;
    $(this).closest('#modal-carousel-wrapper').find('.current-slide .slide-index').text(currentIndex);

    $(this).find('.zoom').removeClass('active');
    $(this).closest('.modal-content').find('.slider-footer').fadeIn(0);
});


//Sort toggle class active
$('#sort-list').on('show.bs.collapse', function () {
    $(this).closest('.sort').addClass('active');
});

$('#sort-list').on('hidden.bs.collapse', function () {
    $(this).closest('.sort').removeClass('active');
});


//Zoom image
$('.zoom').click(function() {
    $(this).toggleClass('active');
    if($(this).hasClass('active')) {
        $(this).closest('#modal-carousel').carousel('pause');
        $(this).closest('.modal-content').find('.slider-footer').fadeOut(0);
    } else {
        $(this).closest('#modal-carousel').carousel('cycle');
        $(this).closest('.modal-content').find('.slider-footer').fadeIn(0);
    }
});


//Products carousel
$('#new-products-carousel').owlCarousel({
    loop: true,
    nav: false,
    autoplay: true,
    autoplayTimeout: 10000,
    responsive:{
        0:{
            dots: false,
            items: 3,
            margin: 10
        },
        581:{
            dots: false,
            items: 4,
            margin: 15
        },
        769:{
            dots: true,
            items: 4,
            slideBy: 4,
            margin: 20
        },
        1200:{
            items: 5,
            slideBy: 5
        }
    }
});


//Portfolio carousel
$('.portfolio-carousel').owlCarousel({
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 10000,
    responsive:{
        0:{
            loop: true,
            items: 3,
            margin: 10
        },
        769:{
            loop: false,
            items: 3,
            margin: 20
        }
    }
});


//Blog carousel
$('.blog-carousel').owlCarousel({
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 10000,
    responsive:{
        0:{
            loop: true,
            items: 3,
            margin: 10
        },
        769:{
            loop: false,
            items: 3,
            margin: 20
        }
    }
});


// Disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        let forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        let validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();


// Change radio input
$('.form-check-input').change(function() {
    let radioInputs = $(this).closest('.radio-group').find('.form-check-input');
    $(radioInputs).each(function() {
        if (this.checked) {
            $(this).attr('checked', true)
        } else {
            $(this).attr('checked', false)
        }
    });
});


// Add class for vertical images in Portfolio single page
$(document).ready(function() {
    $('#gallery .gallery-item, #mobile-gallery-content .gallery-item, .post-page .post-content img').each(function() {
        if ($(this).width() < $(this).height()) {
            $(this).addClass('vertical-image');
        }
    });
});

$('#gallery-tab').on('shown.bs.tab', function (e) {
    $('#gallery .gallery-item, .post-page .post-content img').each(function() {
        if ($(this).width() < $(this).height()) {
            $(this).addClass('vertical-image');
        }
    });
});

$('#mobile-gallery-content').on('shown.bs.collapse', function () {
    $('#mobile-gallery-content .gallery-item').each(function() {
        if ($(this).width() < $(this).height()) {
            $(this).addClass('vertical-image');
        }
    });
})

// Mobile buttons
$('#mob-menu-toggle').click(function() {
    $('#mobile-menu').fadeToggle(500);
});

$('#mobile-menu .menu-bg').click(function() {
    $('#mobile-menu').fadeOut(500);
});

$('.sub-menu-toggle').click(function() {
    $(this).toggleClass('open');
    let subMenu = $(this).closest('.menu-item').find('.sub-menu');

    if ($(this).hasClass('open')) {
        $(subMenu).slideDown(300);
    } else {
        $(subMenu).slideUp(300);
    }
});


$('#mobile-search-toggle').click(function() {
    $('#mobile-search').fadeToggle(500);
});

$('#mobile-search .close-btn').click(function() {
    $('#mobile-search').fadeOut(500);
});


$('.mobile-btns-group .filter-btn').click(function() {
    $('#mobile-filter').fadeIn(500);
});

$('.modal-filter .close-filter').click(function() {
    $(this).closest('.modal-filter').fadeOut(500);
});

$('#mobile-filter .filter-list .filter-btn').click(function() {
    let id = '#' + $(this).attr('data-target');
    $(id).fadeIn(500);
});

$('.mobile-btns-group .sort-btn').click(function() {
    $(this).toggleClass('active');

    if($(this).hasClass('active')) {
        $('#mobile-sort').slideDown(500);
    } else {
        $('#mobile-sort').slideUp(500);
    }
});

$('#mobile-sort a').click(function() {
    $('#mobile-sort a').removeClass('active');
    $(this).addClass('active');

    $('.mobile-btns-group .sort-btn').removeClass('active');
    $('#mobile-sort').slideUp(500);
});

// Mobile tab btns
$('.mobile-btns-group .tab-btn').click(function() {
    $(this).closest('.mobile-btns-group').find('.tab-btn').removeClass('active');
    $(this).addClass('active');

    let id = '#' + $(this).attr('data-target');
    $('.mobile-tab-content').fadeOut(0);
    $(id).fadeIn(500);
});