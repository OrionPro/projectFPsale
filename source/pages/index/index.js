import '../../js/common';

//import '../../libs/owl.carousel.min';
//import Swiper from 'swiper/dist/js/swiper.js';
import '../../pages/index/index.pug'; //это для обновления страницы при hotreload - при npm build убрать
import '../../pages/hide-ip/hide-ip.pug';
import '../../pages/modal.pug'; //это для обновления страницы при hotreload - при npm build убрать
import './index.styl';
//import '../../js/animate';
//import App from '../../js/react';    // разкомментировать, чтобы включить react


$(document).ready(function () {

	$("body").addClass("index ink-transition");
	$(".sticky").sticky({
		topSpacing: 0,
		widthFromWrapper: false
	});
	// блок .main__setting-up-a-proxy-in-the-browser-items затемнение всех браузеров кроме того на который навели
	$('.main__setting-up-a-proxy-in-the-browser-items a').hover(function () {
		$('.main__setting-up-a-proxy-in-the-browser-items a').addClass('active');
		$(this).removeClass('active');
		$(this).addClass('big');
	}, function () {
		$('.main__setting-up-a-proxy-in-the-browser-items a').removeClass('active');
		$('.main__setting-up-a-proxy-in-the-browser-items a').removeClass('big');
	});

	// инициализация tooltipster
	$(".main__setting-up-a-proxy-in-the-browser-items a, .main__btn-wrap.personal i").tooltipster({
		theme: 'tooltipster-shadow',
		maxWidth: 280,
		delay: 100
	});
	$(".your-ip__wrap i.copy-buffer").tooltipster({
		theme: 'tooltipster-shadow',
		maxWidth: 280,
		trigger: 'click',
		delay: 100,
		timer: 2000
	});
	// инициализация tooltipster
	if (window.matchMedia("(min-width: 992px)").matches) {
		$(".header__modal a").tooltipster({
			plugins: ['follower'],
			theme: 'tooltipster-shadow'
		});
	}
//.select2-container--default .select2-results>.select2-results__options
	// инициализация select2
	function formatCountry(state) {
		if (!state.id) {
			return state.text;
		}
		var baseUrl = "img";
		var $state = $(
			'<span><img src="' + baseUrl + '/' + state.element.value.toLowerCase().replace(/\s+/g, '') + '.jpg" class="img-flag" /> ' + state.text + '</span>'
		);
		return $state;
	};

	function formatLanguage(state) {
		if (!state.id) {
			return state.text;
		}
		var baseUrl = "img";
		var $state = $(
			'<span><img src="' + baseUrl + '/' + state.element.getAttribute('data-language') + '.jpg" class="img-flag" /> ' + state.text + '</span>'
		);
		return $state;
	};
	$(".select2-country").select2({
		//minimumResultsForSearch: -1, // выключам поле ввода поиска
		tags: false,
		placeholder: "Выберите страну",
		width: '100%',
		templateResult: formatCountry,
		templateSelection: formatCountry
	});
	$(".select2-language").select2({
		minimumResultsForSearch: -1, // выключам поле ввода поиска
		tags: false,
		width: '100%',
		templateResult: formatLanguage,
		templateSelection: formatLanguage
	});

	$(".select2-modal").select2({
		minimumResultsForSearch: -1, // выключам поле ввода поиска
		tags: false,
		width: '100%'
	});
	$(".select2-tags").select2({
		tags: true,
		placeholder: "Выберите один или несколько тегов",
		width: '100%' // если null то будет шириной родителя
	});
	// Инициализация маски в input
	$(".mask").mask("+38(999) 999-99-99");
});

$(window).resize(function () {

});

$(window).scroll(function () {

});

setTimeout(function () {
	$(".loader_inner").fadeOut();
	$(".loader").fadeOut("slow");
}, 500);