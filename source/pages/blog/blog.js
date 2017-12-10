
import '../../js/common';
//import '../../js/animate_blog';

import './blog.styl';

console.log('in blog.js');

$(document).ready( function() {
	$("body").addClass("blog extinguisher-transition");
});

$(window).resize(function() {

});

$(window).scroll(function() {

});


setTimeout(function () {
	$(".loader_inner").fadeOut();
	$(".loader").fadeOut("slow");
}, 500);