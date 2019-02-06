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

$(document).click((e) => {
    $(popoverSelectors).popover('hide');
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
});

$('.quantity .btn-minus').click(function() {
    let input = $(this).closest('.quantity').find('input');

    if($(input).val() > 1) {
        $(input).val(+$(input).val() - 1);
    }
});

$('.quantity input').blur(function() {
    if($(this).val() < 1) {
        $(this).val(1);
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
$('#modal-product-carousel').on('slide.bs.carousel', function (e) {
    let currentIndex = $(e.relatedTarget).index() + 1;
    $(this).closest('#modal-carousel').find('.current-slide .slide-index').text(currentIndex);
});