// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.serializeJSON.min
//= require underscore
//= require backbone
//= require punch_starter
//= require_tree ./models
//= require_tree ./collections
//= require_tree ../templates
//= require_tree ./views
//= require_tree ./routers
//= require_tree ./helpers

$(window).load(function() {
	$("img.lazy").lazyload({
		threshold: 100,
		effect: "fadeIn"
	}).removeClass("lazy");
});

// lazy load for faster page times, perhaps can make this as a callback?
$(document).ajaxStop(function() {
	$("img.lazy").lazyload({
		threshold: 100,
		effect: "fadeIn"
	}).removeClass("lazy");
});