import '../../js/common';
//import '../../libs/owl.carousel.min';
//import Swiper from 'swiper/dist/js/swiper.js';
import '../../pages/index/index.pug'; //это для обновления страницы при hotreload - при npm build убрать
import '../../pages/modal.pug'; //это для обновления страницы при hotreload - при npm build убрать

//import '../../js/animate';
//import App from '../../js/react';    // разкомментировать, чтобы включить react


$(document).ready(function () {

	$("body").addClass("index ink-transition");
	$(".sticky").sticky({
		topSpacing: 0,
		widthFromWrapper: false
	});
	$(".main__setting-up-a-proxy-in-the-browser-items a").tooltipster({
		theme: 'tooltipster-shadow',
		maxWidth: 280,
		delay: 100
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
	function formatCountry (state) {
		if (!state.id) {
			return state.text;
		}
		var baseUrl = "img";
		var $state = $(
			'<span><img src="' + baseUrl + '/' + state.element.value.toLowerCase().replace(/\s+/g,'') + '.jpg" class="img-flag" /> ' + state.text + '</span>'
		);
		return $state;
	};

	$(".select2").select2({
		//minimumResultsForSearch: -1, // выключам поле ввода поиска
		tags: false,
		placeholder: "Выберите страну",
		width: null,
		templateResult: formatCountry,
		templateSelection: formatCountry
	});
	$(".select2-tags").select2({
		tags: true,
		placeholder: "Выберите один или несколько тегов",
		width: null // если null то будет шириной родителя
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