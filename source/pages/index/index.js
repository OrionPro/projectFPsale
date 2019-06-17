import '../../js/common';

//import '../../libs/owl.carousel.min';
//import Swiper from 'swiper/dist/js/swiper.js';
//import '../../pages/index/index.pug'; //это для обновления страницы при hotreload - при npm build убрать
//import '../../pages/hide-ip/hide-ip.pug';
//import '../../pages/proxy-checker/proxy-checker.pug';
//import '../../pages/port-scanner/port-scanner.pug';
//import '../../pages/modal.pug'; //это для обновления страницы при hotreload - при npm build убрать
import './index.styl';
import URI from "urijs";
//import '../../js/animate';
//import App from '../../js/react';    // разкомментировать, чтобы включить react


$(document).ready(function () {

	$("body").addClass("index ink-transition");
	$(".sticky").sticky({
		topSpacing: 0,
		widthFromWrapper: false
	});
	// блок .main__setting-up-a-proxy-in-the-browser-items затемнение всех браузеров кроме того на который навели
	$('.main__setting-up-a-proxy-in-the-browser-items .main__setting-up-a-proxy-in-the-browser-items-link a').hover(function () {
		$('.main__setting-up-a-proxy-in-the-browser-items .main__setting-up-a-proxy-in-the-browser-items-link a').addClass('active');
		$(this).removeClass('active');
		$(this).addClass('big');
	}, function () {
		$('.main__setting-up-a-proxy-in-the-browser-items .main__setting-up-a-proxy-in-the-browser-items-link a').removeClass('active');
		$('.main__setting-up-a-proxy-in-the-browser-items .main__setting-up-a-proxy-in-the-browser-items-link a').removeClass('big');
	});

	// инициализация tooltipster
	$(".main__setting-up-a-proxy-in-the-browser-items .main__setting-up-a-proxy-in-the-browser-items-link a, .main__btn-wrap.personal i").tooltipster({
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

	// инициализация select2 во всём проекте
	function formatCountry(state) {
		if (!state.id) {
			return state.text;
		}
		var baseUrl = "img";
		var $state = $(
			'<span><img src="' + state.element.getAttribute('data-country')  + '" class="img-flag" /> ' + state.text + '</span>'
		);
		return $state;
	}

	function formatPurse(state) {
		if (!state.id) {
			return state.text;
		}
		var baseUrl = "img";
		var $state = $(
			'<span><img src="' + baseUrl + '/' + state.element.getAttribute('data-purse') + '.jpg" class="img-purse" /> ' + '</span>'
		);
		return $state;
	}

	function formatLanguage(state) {
		if (!state.id) {
			return state.text;
		}
		var baseUrl = "img";
		var $state = $(
			'<span><img src="' + state.element.getAttribute('data-language') + '" class="img-flag" /> ' + state.text + '</span>'
		);
		return $state;
	}

	$(".select2-country").select2({
		//minimumResultsForSearch: -1, // выключам поле ввода поиска
		tags: false,
		placeholder: "Выберите страну",
		width: '100%',
		templateResult: formatCountry,
		templateSelection: formatCountry,
		// sorter: function(data) {
		// 	/* Sort data using lowercase comparison Тут сортируем страны */
		// 	return data.sort(function (a, b) {
		// 		a = a.text.toLowerCase();
		// 		b = b.text.toLowerCase();
		// 		if (a > b) {
		// 			return 1;
		// 		} else if (a < b) {
		// 			return -1;
		// 		}
		// 		return 0;
		// 	});
		// }
	});
	$(".select2-purse").select2({
		minimumResultsForSearch: -1, // выключам поле ввода поиска
		tags: false,
		placeholder: "Выберите кошелёк",
		width: '100%',
		dropdownParent: $('.select2-wrap__purse'),
		templateResult: formatPurse,
		templateSelection: formatPurse
	});
	$(".select2-language").select2({
		minimumResultsForSearch: -1, // выключам поле ввода поиска
		tags: false,
		width: '100%',
		templateResult: formatLanguage,
		templateSelection: formatLanguage
	});
	$('.select2-language').on('select2:select', function (e) {
		var data = e.params.data.element.getAttribute('data-href');
		window.location.assign(data);
	});
	$(".select2-modal").select2({
		minimumResultsForSearch: -1, // выключам поле ввода поиска
		tags: false,
		width: '100%'
	});

	$(".select2-lease").select2({
		minimumResultsForSearch: -1, // выключам поле ввода поиска
		tags: false,
		placeholder: "Срок аренды",
		width: '100%'
	});

	$(".select2-tags").select2({
		tags: true,
		placeholder: "Выберите один или несколько тегов",
		width: '100%' // если null то будет шириной родителя
	});
	// Инициализация маски в input
	$(".mask").mask("+38(999) 999-99-99");
	// клик на .main__top-select button . Клонирование элементов с инициализацией нового select.select2.select2-country
	// $(document).on('click', '.main__top-select button', function (e) {
	// 	e.preventDefault();
	// 	const parentClone = $(this).parent().clone();
	// 	const btnClone = $(this).clone();
	// 	const thisSelect = $(this).parent().find('.select2-country');
	// 	const parentAll = $(this).parents('.main__top-select-wrap');
	// 	const cloneSelect = thisSelect.clone();
	// 	parentClone.empty();
	// 	cloneSelect.appendTo(parentClone);
	// 	btnClone.appendTo(parentClone);
	// 	parentClone.appendTo(parentAll);
	// 	parentAll.find('.main__top-select').last().find('.select2-country').wrap('<div class="select2-wrap"></div>');
	// 	$(".select2-country").select2({
	// 		//minimumResultsForSearch: -1, // выключам поле ввода поиска
	// 		tags: false,
	// 		placeholder: "Выберите страну",
	// 		width: '100%',
	// 		templateResult: formatCountry,
	// 		templateSelection: formatCountry
	// 	});
	// });
	// код от бек енд программиста
	//проверка прокси на главной

	$(document).on('click', '.fps-check-proxy-ip', function (e) { //@todo click глючит
		var proxy_id = $(this).attr('data-proxy-id');
		var $this_butt = $(this);

		$this_butt.addClass('fps-anim-icon');

		$.ajax({
			url: fps_ajax_data.url,
			type: "POST",
			data: {
				'action': 'fps_frontend_check_proxy',
				'proxy_id': proxy_id
			},
			success: function (data) {
				console.log(data);

				if (data['response'] == 'false') {
					$this_butt.parents('tr').remove();
				} else {
					$this_butt.parents('.check').find('.fps-last-check-label').html(data['response']);
				}
			},
			complete: function () {
				$this_butt.removeClass('fps-anim-icon');
			}
		});

		e.preventDefault();
		return false;
	});

	//фильтр
	$('#fps-filter-submit-button').on('click', function (e) {
		var uri = URI($(location).attr('href'));

		var country_filter = [],
			type_filter = [],
			anonymity_filter = [];

		//страны
		$('.fps-filter-country').each(function () {
			country_filter.push($(this).find('select option:checked').val());
		});

		if (country_filter.length > 0) {
			uri.addSearch('proxy_country', JSON.stringify(country_filter));
		}

		//тип
		$('#fps-filter-block input[name=fps_filter_radio_type]:checked').each(function () {
			type_filter.push($(this).val());
		});

		if (type_filter.length > 0) {
			uri.addSearch('proxy_type', JSON.stringify(type_filter));
		}

		//анонимность
		$('#fps-filter-block input[name=fps_filter_radio_anonymity]:checked').each(function () {
			anonymity_filter.push($(this).val());
		});

		if (anonymity_filter.length > 0) {
			uri.addSearch('proxy_anonymity', JSON.stringify(anonymity_filter));
		}

		uri.removeSearch('proxy_page');
		uri.removeSearch('proxy_sort');

		window.location.replace(uri);
	});

	var fps_filter_country_counter = 1;

	//установка опций фильтра по урлу
	if ($("#fps-filter-block").length) {
		var uri = URI($(location).attr('href'));
		var parsed_query = URI.parseQuery(URI.parse($(location).attr('href')).query);
		var country_filter = [],
			type_filter = [],
			anonymity_filter = [];

		if (typeof(parsed_query.proxy_country) != 'undefined') {

			country_filter = JSON.parse(parsed_query.proxy_country);
		}

		if (typeof(parsed_query.proxy_type) != 'undefined') {
			type_filter = JSON.parse(parsed_query.proxy_type);
		}

		if (typeof(parsed_query.proxy_anonymity) != 'undefined') {
			anonymity_filter = JSON.parse(parsed_query.proxy_anonymity);
		}

		//страны
		var clone_fps_filter_country = $('.fps-filter-country select').html();
		var set_first_county = false;

		$.each(country_filter, function (index, value) {

			if (!set_first_county) {

				$('.fps-filter-country select option').each(function () {
					if ($(this).val() == value) {
						$(".select2-country").val($(this).val()).trigger("change");
						$(this).attr('checked', true);
						set_first_county = true;
					}
				});

			} else {

				setTimeout(function () {
					$('.fps-filter-country:last')
						.after(`
							<div class="main__top-select fps-filter-country fps_filter_country_counter_${fps_filter_country_counter}">
								<div class="select2-wrap">
									<select class="select2 select2-country select2-hidden-accessible" tabindex="-1" aria-hidden="true">
									  ${clone_fps_filter_country}
									</select>
								 </div>
                     		 <button type="button"><i class="fa fa-plus"></i></button>
                     		</div>`);
					//$('.fps_filter_country_counter_' + fps_filter_country_counter).find('.fps-filter-country-add-new').remove();
					//$('.fps_filter_country_counter_' + fps_filter_country_counter).find('.select2-container').remove();
					//$('.fps_filter_country_counter_' + fps_filter_country_counter).find('.select2-country').removeClass( 'select2-hidden-accessible');
					//@todo
					$('.fps_filter_country_counter_' + fps_filter_country_counter + ' select option').each(function () {
						if ($(this).val() == value) {
							$('.fps_filter_country_counter_' + fps_filter_country_counter).find('.select2-country').val($(this).val()).trigger("change");
							$(this).attr('checked', true);
						}
					});

					fps_filter_country_counter++;
					$(".select2-country").select2({
						//minimumResultsForSearch: -1, // выключам поле ввода поиска
						tags: false,
						placeholder: "Выберите страну",
						width: '100%',
						templateResult: formatCountry,
						templateSelection: formatCountry
					});

				}, 1000);
			}
		});

		//тип
		$('#fps-filter-block input[name=fps_filter_radio_type]').each(function () {
			var $this_input = $(this);
			var this_input_val = $this_input.val();

			$.each(type_filter, function (index, value) {
				if (this_input_val == value) {
					$this_input.attr('checked', true);
				}
			});
		});

		//анонимность
		$('#fps-filter-block input[name=fps_filter_radio_anonymity]').each(function () {
			var $this_input = $(this);
			var this_input_val = $this_input.val();

			$.each(anonymity_filter, function (index, value) {
				if (this_input_val == value) {
					$this_input.attr('checked', true);
				}
			});
		});

		//для сортировки
		var proxy_sort_url = uri.clone();
		proxy_sort_url = proxy_sort_url.removeSearch('proxy_page').removeSearch('proxy_sort');

		//все
		var proxy_sort_url_all = proxy_sort_url.clone();
		$('.fps-sort-all').attr('href', proxy_sort_url_all);

		//анонимные
		var proxy_sort_url_anonymity = proxy_sort_url.clone();
		$('.fps-sort-anonymity').attr('href', proxy_sort_url_anonymity.addSearch('proxy_sort', 'anonymity'));

		//socks5
		var proxy_sort_url_socks5 = proxy_sort_url.clone();
		$('.fps-sort-socks5').attr('href', proxy_sort_url_socks5.addSearch('proxy_sort', 'socks5'));

		//http
		var proxy_sort_url_http = proxy_sort_url.clone();
		$('.fps-sort-http').attr('href', proxy_sort_url_http.addSearch('proxy_sort', 'http'));

		//https
		var proxy_sort_url_https = proxy_sort_url.clone();
		$('.fps-sort-https').attr('href', proxy_sort_url_https.addSearch('proxy_sort', 'https'));
	}
});

$(window).resize(function () {

});

$(window).scroll(function () {

});

setTimeout(function () {
	$(".loader_inner").fadeOut();
	$(".loader").fadeOut("fast");
}, 200);