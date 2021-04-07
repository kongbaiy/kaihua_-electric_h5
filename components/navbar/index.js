(()=> {
	const template = `
		<style>
			@import url('common/css/reset.css');
			
			.top-navbar {
				position: fixed;
				top: 0;
				left: 0;
				z-index: 9;
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0 0.13rem;
				width: 100%;
				height: 0.44rem;
				border-bottom: 1px solid #E6E6E6;
				background-color: #fff;
			}
			
			.logo-img {
				width: 1.03rem;
			}
			
			.location-info {
				margin-left: 0.1rem;
				padding: 0 0.1rem;
				display: flex;
				align-items: center;
				height: 0.22rem;
				border-left: 1px solid rgba(206,206,206,1);
				font-size: 0.13rem;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #262626;
			}
			
			.location-icon {
				margin-right: 0.05rem;
				width: 0.10rem;
				height: 0.13rem;
			}
			
			.bottom-arrow-icon {
				margin-left: 0.05rem;
				width: 0.09rem;
				height: 0.06rem;
			}
			
			.phone-icon, .menu-icon {
				width: 0.2rem;
				height: 0.2rem;
			}
			
			.top-navbar-blank {
				height: 0.44rem;
			}

			.popup-bg {
				display: none;
				position: fixed;
				top: 0.44rem;
				left: 0;
				z-index: 30;
				width: 100%;
				height: calc(100% - 0.44rem);
				background-color: transparent;
			}

			.popup {
				transition: all 200ms;
				position: fixed;
				top: 0.44rem;
				right: -100%;
				z-index: 31;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: calc(100% - 0.44rem);
				background-color: rgba(255,255,255,0.97);
			}

			.popup-list {
				overflow-y: scroll;
				-webkit-overflow-scrolling: touch;
				padding: 0 0.35rem;
			}

			.popup-list-item {
				margin-bottom: 0.35rem;
				text-align: center;
			}
			
			.popup-list-item:last-child {
				margin-bottom: 0;
			}

			.popup-list-item a {
				font-size: 0.18rem;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #262626;
			}

			.popup-list-item_active a {
				color: #004DA5;
			}
		</style>
		
		<div class="top-navbar">
			<img src="imgs/logo.png" class="logo-img" />
			<img src="imgs/menu_icon.png" class="menu-icon" />
		</div>

		<div class="top-navbar-blank"></div>
		<div class="popup-bg"></div>

		<div class="popup">
			<ul class="popup-list">
				<li class="popup-list-item">
					<a href="home.html?pageIndex=0">网站首页</a>
				</li>
				<li class="popup-list-item">
					<a href="product.html?pageIndex=1">产品中心</a>
				</li>
				<li class="popup-list-item">
					<a href="news.html?pageIndex=2">新闻列表</a>
				</li>
				<li class="popup-list-item">
					<a href="about-us.html?pageIndex=3">关于我们</a>
				</li>
			</ul>
		</div>
	`;
	
	class TopNavbar extends HTMLElement {
		static get observedAttributes() {
		}
			
		constructor() {
		    super();
			const shadowRoot = this.attachShadow({ mode: 'open' });
			
			shadowRoot.innerHTML = template;
			this._root = shadowRoot;

			const menu_el = shadowRoot.querySelector('.menu-icon');
			const popupbg_el = shadowRoot.querySelector('.popup-bg');
			const popup_item_el = shadowRoot.querySelectorAll('.popup-list-item');
			const page_index = parseInt(this.getQueryString('pageIndex'));
			
			if(page_index == 0 || page_index) {
				popup_item_el[page_index].className = 'popup-list-item popup-list-item_active';
			}

			this.activeMenu = false;
			menu_el.addEventListener('click', this.onMenu.bind(this));
			popupbg_el.addEventListener('click', this.onPopupBg.bind(this));
		}
		
		connectedCallback() {
			// 自定义元素首次插入文档dom时调用
			// 相较于constructor只会执行一次，这个生命周期每次将节点连接到dom时都会调用
			// 可能会执行多次(比如同一个自定义元素remove, append多次)
		}
		
		disconnectedCallback() {
			// 自定义元素从文档中删除时，调用
		}
		
		adoptedCallback() {
			// 自定义元素移动到新的文档
			// 比如使用 adoptNode 方法在多iframe下移动元素
		}
		
		attributeChangedCallback() {
			// 当 custom element增加、删除、修改自身属性时，被调用
		}

		onMenu() {
			const popupbg_el = this._root.querySelector('.popup-bg');
			const popup_el = this._root.querySelector('.popup');
			
			if (this.activeMenu) {
				this.onPopupBg();
			} else {
				popupbg_el.setAttribute('style', 'display: block');
				popup_el.setAttribute('style', 'right:0;');
				this.setPageStopScroll(true);
			}
			
			this.activeMenu = !this.activeMenu;
			
		}

		onPopupBg() {
			const popupbg_el = this._root.querySelector('.popup-bg');
			const popup_el = this._root.querySelector('.popup');

			popupbg_el.setAttribute('style', 'display: none;');
			popup_el.setAttribute('style', 'right:-100%;');
			this.setPageStopScroll(false);
		}

		/**
		 * 设置页面停止滑动
		 * @param {Boolean} status
		 * */ 
		setPageStopScroll(status) {
			const body = document.body;
			const body_style = body.getAttribute('style');

			if(status) {
				body.setAttribute('style', (body_style || '') + 'overflow:hidden;');
			} else {
				body.setAttribute('style', body_style.replace('overflow:hidden;', ''));
			}
		}

		/**
		 * 获取url参数
		 * @param {string} name
		 * */ 
		getQueryString(name) { 
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
			var r = window.location.search.substr(1).match(reg);

			if (r != null) return unescape(r[2]); 

			return null; 
		} 
	}
	customElements.define('top-navbar', TopNavbar);
})();