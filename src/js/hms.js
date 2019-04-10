'use strict';

;(function($, TL){

	var move = function($parent){
		var $active = $parent.find('.values').find('.active');
		var top = $active.position().top;
		TL.to( $parent.find('.values'), 1, { 
			top: top * -1,
			ease: Power4.easeOut
		});
	}

	var moveUp = function($parent){
		var $values = $parent.find('.values');
		if( $values.find('.active').length > 0 ){
			if( $values.find('.active').prev().length > 0 ){
				$values.find('.active').removeClass('active').prev().addClass('active');
			}
		}else{
			$values.find('div').first().addClass('active');
		}
		move($parent);
	}

	var moveDown = function($parent){
		var $values = $parent.find('.values');
		if( $values.find('.active').length ){
			if( $values.find('.active').next().length > 0 ){
				$values.find('.active').removeClass('active').next().addClass('active');
			}
		}else{
			$values.find('div').first().next().addClass('active');
		}
		move($parent);
	}


	$(document).ready(function(){
		var $hms = $('.hours-minute-seconds');
		$hms.find('button').click(function(ev){
			ev.preventDefault();
			if( $(this).hasClass('up') ){
				moveUp($(this).parent('div'));
			}else{
				moveDown($(this).parent('div'));
			}
			return false;
		});

		$hms.find('>div').not('.labels').bind('mousewheel DOMMouseScroll', function(ev){
			ev.preventDefault();
			if (ev.originalEvent.wheelDelta > 0 || ev.originalEvent.detail < 0) {
				moveUp($(this));
			} else {
				moveDown($(this));
			}
			return false;
		});

	});

}(jQuery, TweenLite));
