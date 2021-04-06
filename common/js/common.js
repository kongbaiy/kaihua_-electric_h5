(function(win, doc) {
	/**
	 * @param {object} options
	 *  @param {Element} videoEl
	 *  @param {Element} playEl
	 *  @param {Element} pauseEl
	 * */
	function Video(options) {
		var video_el = options.videoEl,
			play_el = options.playEl,
			pause_el = options.pauseEl;

		try {
			video_el.onClick = function() {
				if (!this.paused) {
					this.pause();
				}
			}

			video_el.onPlaying = function() {
				if (play_el) {
					play_el.style.display = 'none';
				}

				if (pause_el) {
					pause_el.style.display = ' ';
				}
			}

			video_el.onPause = function() {
				if (play_el) {
					play_el.style.display = ' ';
				}

				if (pause_el) {
					pause_el.style.display = 'none';
				}
			}
		} catch (err) {
			// console.error(err);
			throw new Error(err);
		}
	}
	
	/**
	 * 禁止页面滑动
	 * @param {boolean} status
	 * */ 
	function ForbidWindowSliding(status) {
		if(status){
			document.body.parentNode.style.overflow = "hidden";  
		}else {
			document.body.parentNode.style.overflow = "auto";
		}
	}

	/**
	* 获取url参数
	* @param {string} name
	* */ 
	function getQueryString(name) { 
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg);

		if (r != null) return unescape(r[2]); 

		return null; 
	} 
	
	win._common = {
		video: Video,
		forbidWindowSliding: ForbidWindowSliding,
		getQueryString: getQueryString
	};
})(window, document);
