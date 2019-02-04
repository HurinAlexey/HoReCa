//Search form toggle
$('#search-toggle').click(() => {
    $('#site-header .search-form').fadeToggle(500);
});


//Popover
$('.product-info .block-item').popover();

$(document).click((e) => {
    $('.product-info .block-item').popover('hide');
    $(e.target).closest('.product-info .block-item').popover('show');
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