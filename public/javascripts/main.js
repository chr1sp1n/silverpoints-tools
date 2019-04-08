'use strict';

;(function($, TL){

	var animateBrand = function(animatioTime){
		var $brand = $('.brand');
		var $lines = $brand.find('.line');
		var $letters = $brand.find('span');
		var ut = animatioTime / $letters.length;

		var rds = [];
		$letters.each(function(i){
			if(i == $letters.length - 1){
				rds.push(rds[0]);
			}else{
				rds.push( Math.random() * (animatioTime * 3/4) );
			}
		});

		TL.to( $lines.first(), (animatioTime * 1/4) + rds[0], { 
			'flex': 1.2, 
			opacity: 1,
			ease: Power4.easeIn,
			onComplete: function(){
				TL.to('#main', 1, { 
					opacity: 1, ease: Power4.easeIn 
				});	
			}
		});

		TL.to( $lines.last(), (animatioTime * 1/4) + rds[$letters.length - 1], { 
			'flex': 1.2, 
			opacity: 1,
			ease: Power4.easeIn,
			onComplete: function(){
				TL.to('#main', 1, { 
					opacity: 1, ease: Power4.easeIn 
				});	
			}
		});

		$letters.each(function(i){
			var $span = $brand.find('span').eq(i);
			TL.to( $span, (animatioTime * 1/4) + rds[i], { 
				opacity: 1,
				ease: Power4.easeIn
			});
		});

	}

	
	$(document).ready(function(){
		animateBrand(2.5);
	});


}(jQuery, TweenLite));
