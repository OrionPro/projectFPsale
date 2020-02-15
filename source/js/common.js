// Если не хотим что-бы попадала библиотека в общий, убираем отсюда и ставим в те точки входа, в которых требуется (но лучше тогда вообще импортом их вставлять, как карусели в index.js)
require("../libs/libs").jqueryui();
require("../libs/libs").matchMedia();
require("../libs/libs").animate_modal_js();
require("../libs/libs").magnific_popup();
require("../libs/libs").tooltipster_follower();
require("../libs/libs").tooltipster();
require("../libs/libs").jqueryValidation();
require("../libs/libs").select2();
require("../libs/libs").input_mask();
require("../libs/libs").sticky();
require("../libs/libs").mCustomScrollbar();

import URI from 'urijs';
import '../js/validation';
import '../js/modal';
import Clipboard from 'clipboard';
import '../stylus/main.styl';
import '../js/_functions.js';

// функция throttle
function throttle(func, ms) {

  var isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)В этом состоянии все новые вызовы запоминаются в замыкании через savedArgs/savedThis. Обратим внимание, что и контекст вызова и аргументы для нас одинаково важны и запоминаются одновременно. Только зная и то и другое, можно воспроизвести вызов правильно.
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // (1)Декоратор throttle возвращает функцию-обёртку wrapper, которая при первом вызове запускает func и переходит в состояние «паузы» (isThrottled = true).

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false; // (3)Далее, когда пройдёт таймаут ms миллисекунд – пауза будет снята, а wrapper – запущен с последними аргументами и контекстом (если во время паузы были вызовы).
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

// табы tabs
function tabs(obj) {
	const buttons = document.querySelectorAll(obj.btn);
	const bodyTabs = document.querySelectorAll(obj.tabsBody);

	let func = function () {
		"use strict";
		for (let i = buttons.length; i--;) {
			buttons[i].classList.remove(obj.classBtn);
			bodyTabs[i].classList.remove(obj.classBody);
		}
		this.classList.add(obj.classBtn);
		let item = [].indexOf.call(buttons, this);
		bodyTabs[item].classList.add(obj.classBody)
	};

	[].forEach.call(buttons, item => item.addEventListener('click', func));
}

//accordion
function accordion(obj) {
	const titleClick = obj.titleClick,
		allContent = obj.allContent;

	$(titleClick).click(function (e) {
		e.preventDefault();
		let content = $(this).next();
		if (content.is(":visible")) { //если нажали на title аккордеона,
			content.slideUp(500, function () { //и если контент аккордеона видимый, то
			}); //убираем его

			$('.main.share h1').removeClass('active');
			$(allContent).removeClass('active');
			$(this).removeClass("active");
			$(this).children().removeClass("active"); //убираем активный класс у стрелки к примеру

		} else {
			content.slideDown();//показываем
			$('.main.share h1').addClass('active');
			$(titleClick).removeClass('active');
			$(allContent).addClass('active');
			$(titleClick).children() //убираем активный класс у стрелки к примеру
				.removeClass("active");
			$(this).addClass("active");
			$(this).children().addClass("active"); //добавляем активный класс у стрекли к примеру
		}
		$(titleClick).not(this).next().stop(true,true).slideUp();
	});
  $(titleClick).first().click();
}

// Определения браузера
function get_name_browser() {
	// получаем данные userAgent
	const ua = navigator.userAgent;
	// с помощью регулярок проверяем наличие текста,
	// соответствующие тому или иному браузеру
	if (ua.search(/Edge/) > 0) return 'Edge';
	if (ua.search(/Chrome/) > 0) return 'Google Chrome';
	if (ua.search(/Firefox/) > 0) return 'Firefox';
	if (ua.search(/Opera/) > 0) return 'Opera';
	if (ua.search(/Safari/) > 0) return 'Safari';
	if (ua.search(/MSIE/) > 0) return 'Internet Explorer';
	if (ua.search(/Trident/) > 0) return 'Trident';
	// условий может быть и больше.
	// сейчас сделаны проверки только
	// для популярных браузеров
	return 'Не определен';
}

// решаем вопрос с min-height 100% у safari до версии 11
function heightItemSafari(obj) {
	let heightItem = $(obj.itemHeight).height();
	$(obj.item).css("min-height", heightItem + obj.itemHeightBorder);
}

// Создаём цикл для инициализации mCustomScrollbar в нужных select
function customScrollbar() {
	$(document).find('.select .drop').each(function () {
		// var log = '';
		// var height = $(this).height();
		// log += 'Высота элементов: ' + height;
		// console.log(log);
		if ($(this).height() >= 190) {
			$(this).mCustomScrollbar({
				theme: "my-theme"
			});
		}
	});
}

//копируем то что в data-clipboard-text в параграфе copy-buffer либо в любом другом месте где применяется этот класс
const clipboard = new Clipboard('.copy-buffer');

$(document).ready(function () {
	//main__table-wrap ищем соседнюю ссылку в td.ip и берём text кладём в input
	$('.main__table-wrap td.ip p').each(function () {
		const linckValue = this.parentNode.childNodes[0].data;
		$(this).attr('data-clipboard-text', linckValue);
	});
	$('.main__table-wrap table tbody td.ip a').on('click', function (e) {
		e.preventDefault();
	});

	if (window.matchMedia("(min-width: 992px)").matches) {
		if (get_name_browser() == "Safari") {
			$('.your-ip__wrap i').attr('title', 'Нажмите ⌘-С чтобы скопировать');

			$('.main__table-wrap table tbody td .copy-buffer').on('click', function () {
				$(this).addClass('active');
				setTimeout(function () {
					$('.main__table-wrap table tbody td .copy-buffer').removeClass('active');
				}, 1500);
			});
		}
	}
	// переносим из .your-ip__numbers в .copy-buffer
	function yourIpNumbers () {
		const yourIpWrap = document.querySelector('.your-ip__wrap');
		if(yourIpWrap) {
			const copyBuffer = document.querySelector('.your-ip__wrap .copy-buffer');
			const elemValue = document.querySelector('.your-ip__wrap .your-ip__numbers').textContent;
			copyBuffer.setAttribute('data-clipboard-text', elemValue);
		}
	}
	yourIpNumbers();
	// вызов accordion
	accordion({
		titleClick: '.accordion .accordion_title',
		allContent: '.accordion .accordion_content'
	});
	// аккордеон на странице index ( Поделиться страницей ) в итоге можно использовать где нужно , главное дабовить к секции .main класс share
	accordion({
		titleClick: '.share-page__link',
		allContent: '.share-page__social'
	});

  accordion({
    titleClick: '.sidebar-list-item-dropdown',
    allContent: '.share-page__social'
  });
	customScrollbar();
	// вызов tabs
	tabs({
		btn: '.tabs-items-wrap > .tabs-item',
		tabsBody: '.tabs-wrap',
		classBody: 'active',
		classBtn: 'active'
	});
	tabs({
		btn: '.tabs-items-wrap-inner > .tabs-item',
		tabsBody: '.tabs-wrap-inner',
		classBody: 'active',
		classBtn: 'active'
	});
	// // клик .header__authorization вызов окна авторизации
	// $(document).click(function ({target} = event) {
	// 	if ($(target).closest(".header__authorization").length)
	// 		return;
	// 	$('.header__autorization-dropdown').removeClass('header__autorization-dropdown--active');
	// 	$('input:not("[type=submit], [type=hidden], .select2-search__field")').removeClass('tooltipster-show').tooltipster('close');
	// 	event.stopPropagation();
	// });
	// $('.header__authorization a').on('click', function (e) {
	// 	e.preventDefault();
	// 	$('.header__autorization-dropdown').toggleClass('header__autorization-dropdown--active');
	// 	$('input:not("[type=submit], [type=hidden], .select2-search__field")').removeClass('tooltipster-show').tooltipster('close');
	// });

	if (get_name_browser() == "Trident" || get_name_browser() == "Internet Explorer" || get_name_browser() == "Firefox") {
		// $(".from_what_is_seo .from_what_is_seo_bot_decor svg").css("bottom", "-217px");
		// $(".website_promotion .website_promotion_decor").css("bottom", "-177px");
		// $(".cost_of_online_store .cost_of_online_store_links_item").css("margin-right", "72px");
	}

	if (get_name_browser() == "Trident" || get_name_browser() == "Internet Explorer" || get_name_browser() == "Edge") {
		$('.check i, .radio i').css("margin-top", "2px")
	}
	if (get_name_browser() == "Google Chrome") {
		//console.log("Google Chrome");

	}
	if (get_name_browser() == "Safari") {
		heightItemSafari({
			itemHeight: '.info-blocks__item-txt-block1',
			itemHeightBorder: 2,
			item: '.info-blocks__btn1'
		});
		heightItemSafari({
			itemHeight: '.info-blocks__item-txt-block2',
			itemHeightBorder: 2,
			item: '.info-blocks__btn2'
		});
	}
	// для инициализации tooltips
	// $( document ).tooltip({
	//   track: true
	// });

	// скролл по ссылке с атрибутом href
	// $(".header_nav a[href*='#']").on("click", function(e) {
	//     e.preventDefault();
	//     var anchor = $(this);
	//     $('html, body').stop().animate({
	//         scrollTop: $(anchor.attr('href')).offset().top
	//     }, 500);
	//     return false;
	// });

	// Скролл по классу .scroll_to и атрибуту data-scroll у кнопки к примеру (data-scroll="куда скроллим" в элементе куда скроллим ставим id потом впишем в куда скроллим)
	// $(".scroll_to").on("click", function(e) {
	//     e.preventDefault();
	//     var anchor = $(this);
	//     $('html, body').stop().animate({
	//         scrollTop: $("#" + anchor.data('scroll')).offset().top
	//     }, 500);
	//     return false;
	// });

	//  Активация слайдера
	// $(".owl-carousel").owlCarousel({
	//     loop: true,
	//     items: 1,
	//     dots: true
	// });

	// Кастомные кнопки управления слайдером
	// var owl = $('.owl-carousel');
	// owl.owlCarousel();
	// // Go to the next item
	// $('.customNextBtn').click(function() {
	//     owl.trigger('next.owl.carousel', [700]);
	// });
	// // Go to the previous item
	// $('.customPrevBtn').click(function() {
	//     // With optional speed parameter
	//     // Parameters has to be in square bracket '[]'
	//     owl.trigger('prev.owl.carousel', [700]);
	// });

});

$(window).on('resize', throttle(function () {
  if (window.matchMedia("(min-width: 992px)").matches) {

    if($("#nav-button-label").hasClass('nav-on')) {
      $("#nav-button-label").click();
    }

    if (get_name_browser() == "Safari") {
      clipboard.on('success', function (e) {
        e.clearSelection();
        e.trigger.classList.add('active');
        setTimeout(function () {
          e.trigger.classList.remove('active');
        }, 1500);

      });
    }
  }
  if (window.matchMedia("(max-width: 992px)").matches) {
    if (get_name_browser() == "Safari") {
      clipboard.on('success', function (e) {
        e.trigger.classList.remove('active');
      });
    }
  }

}, 150));


$(window).scroll(function () {

});

export {customScrollbar};