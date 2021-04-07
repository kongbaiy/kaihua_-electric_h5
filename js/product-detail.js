(function(win, doc) {
	var bannerIndex = 0;
	var banner = new Swiper('.banner', {
		slidesPerView: 3,
		observer: true,
		observeParents: true,
		spaceBetween: 10,
		autoplayDisableOnInteraction: false,
		on: {
			slideChangeTransitionEnd() {
				bannerIndex = this.realIndex;
				var img_src = $('.banner .swiper-slide').eq(bannerIndex).find('.banner-img').attr('src');
				
				$('.banner .swiper-slide').removeClass('banner_active');
				$('.banner .swiper-slide').eq(bannerIndex).addClass('banner_active');
				$('.current-banner-img').attr('src', img_src);
			},
			click() {
				var img_src = $('.banner .swiper-slide').eq(this.clickedIndex).find('.banner-img').attr('src');
				
				$('.banner .swiper-slide').removeClass('banner_active');
				$('.banner .swiper-slide').eq(this.clickedIndex).addClass('banner_active');
				$('.current-banner-img').attr('src', img_src);
			}
		},
		navigation: {
			nextEl: '.banner-navigation-next',
			prevEl: '.banner-navigation-prev',
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

	$('.nav-item').on('click', function() {
		$('.nav-item').removeClass('nav-item_active');
		$(this).addClass('nav-item_active');
	});
})(window, document);
