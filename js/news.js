(function(win, doc) {
    // banner
    var bannerIndex = 0;
    var banner = new Swiper('.banner', {
		autoplayDisableOnInteraction: false,
		autoplay: 5000,
		loop: true,
        on: {
			slideChangeTransitionEnd() {
				bannerIndex = this.realIndex;
			}
		},
		a11y: {
			prevSlideMessage: 'Previous slide',
			nextSlideMessage: 'Next slide',
			firstSlideMessage: 'This is the first slide',
			lastSlideMessage: 'This is the last slide',
			paginationBulletMessage: 'Go to slide ' + (bannerIndex + 1),
			notificationClass: 'swiper-notification',
			containerMessage: 'This is a swiper',
			containerRoleDescriptionMessage: 'banner', //aria-role-description
			itemRoleDescriptionMessage: 'slider',
		}
	});

    var index;
    $('.nav-content').eq(0).show();
	$('.nav-item').on('click', function() {
		index = $(this).index();
		
		$('.nav-item').removeClass('nav-item_active');
		$(this).addClass('nav-item_active');
		$('.nav-content').hide();
		
		if(index == 2) {
			$('#common-problem').show();
		} else {
			$('.nav-content').eq(0).show();
		}
    });
})(window, document);