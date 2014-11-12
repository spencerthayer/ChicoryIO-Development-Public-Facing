// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});


// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})


// for skill chat jquary
$(document).ready(function(e) {
//var windowBottom = $(window).height();
var index=0;
$(document).scroll(function(){
	var top = $('.skills').height()-$(window).scrollTop();
	console.log(top)
	if(top<-1000){
		if(index==0){	
			
			$('.chart').easyPieChart({
				easing: 'easeOutBounce',
				onStep: function(from, to, percent) {
					$(this.el).find('.percent').text(Math.round(percent));
				}
			});
			
		}
		index++;
	}
})
//console.log(nagativeValue)
});


// chart loding
$(window).load(function() {
	
	var chart = window.chart = $('.chart').data('easyPieChart');
	$('.js_update').on('click', function() {
		chart.update(Math.random()*100);
	});
});


// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});


// Waiting for the entire site to load

jQuery(window).load(function() { 
        jQuery("#loaderInner").fadeOut(); 
        jQuery("#loader").delay(400).fadeOut("slow"); 
});


// Number animation   
$('.counter').waypoint(function() {
        
    var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
        
    $('.total-number-1').animateNumber({
            number: 1650, //change value here
            numberStep: comma_separator_number_step
    }, 2000);
        
    $('.total-number-2').animateNumber({
            number: 216, //change value here
            numberStep: comma_separator_number_step
    }, 2000);
        
    $('.total-number-3').animateNumber({
            number: 142, //change value here
            numberStep: comma_separator_number_step
    }, 2000);
        
    $('.total-number-4').animateNumber({
            number: 28, //change value here
            numberStep: comma_separator_number_step
    }, 2000);
    
    
    }, {
        offset: '60%'
    
});