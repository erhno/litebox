//	LiteBox v1.3, Copyright 2014, Joe Mottershaw, https://github.com/joemottershaw/
//	===============================================================================

!function(e,t){
	function o(t,o){
		this.element=t,
		this.$element=e(this.element),
		this.options=e.extend({},a,o),
		this._defaults=a,this._name=l,
		this.init()
	}
	function i(){
		return t.innerHeight?t.innerHeight:e(t).height()
	}
	function n(t){
		e(t).each(function(){
			var t=new Image;
			t.src=this,
			t.width>0&&e("<img />").attr("src",this).addClass("litebox-preload").appendTo("body").hide()
		})
	}
	var l="liteBox",
	a={
		revealSpeed:400,background:"rgba(0,0,0,.8)",
	    overlayClose:!0,
	    escKey:!0,
	    navKey:!0,
	    closeTip:"tip-l-fade",
	    closeTipText:"Close",
	    prevTip:"tip-t-fade",
	    prevTipText:"Previous",
	    nextTip:"tip-t-fade",
	    nextTipText:"Next",
	    callbackInit:function(){},
	    callbackBeforeOpen:function(){},
	    callbackAfterOpen:function(){},
	    callbackBeforeClose:function(){},
	    callbackAfterClose:function(){},
	    callbackError:function(){},
	    callbackPrev:function(){},
	    callbackNext:function(){},
	    errorMessage: "Yükleme Hatası!! Fotoğraf Silinmiş Olabilir."
	};
    o.prototype = {
        init: function () {
            var t = this; this.$element.on("click", function (e) {
                e.preventDefault(),
	            t.openLitebox()
	        }),
	        keyEsc=27,
	        keyLeft=37,
	        keyRight=39,
	        e("body").off("keyup").on("keyup",function(o){
		        t.options.escKey&&o.keyCode==keyEsc&&t.closeLitebox(),
		        t.options.navKey&&o.keyCode==keyLeft&&e(".litebox-prev").trigger("click"),
		        t.options.navKey && o.keyCode == keyRight && e(".litebox-next").trigger("click")
	        }),
	        this.options.callbackInit.call(this)
	    },
	    openLitebox:function(){
		var t=this;this.options.callbackBeforeOpen.call(this),
		t.buildLitebox();
		var o=this.$element;
		if(t.populateLitebox(o),
		t.options.overlayClose&&$litebox.on("click",function(o){
			(o.target === this || e(o.target).hasClass("litebox-container") || e(o.target).hasClass("litebox-error")) && t.closeLitebox()
		}),
			$close.on("click",function(){t.closeLitebox()}),
			this.$element.attr("data-litebox-group")){
				var t=this,
				i=this.$element.attr("data-litebox-group"),
				l=e('[data-litebox-group="'+this.$element.attr("data-litebox-group")+'"]'),
				a=[];
		        e('[data-litebox-group="' + i + '"]').each(function () {
		            var t = e(this).attr("href");
				    a.push(t)
				}),
				n(a),
				e(".litebox-nav").show(),
				$prevNav.off("click").on("click",function(){
					t.options.callbackPrev.call(this);
					var i=l.index(o);
					o=l.eq(i-1),
					e(o).length||(o=l.last()),
					t.populateLitebox(o)
				}),
				$nextNav.off("click").on("click",function(){
					t.options.callbackNext.call(this);
					var i=l.index(o);
					o=l.eq(i+1),
					e(o).length||(o=l.first()),
					t.populateLitebox(o)
				})
			}
		this.options.callbackAfterOpen.call(this)
	},
	    buildLitebox: function () {
	        $litebox = e("<div>", { "class": "litebox-overlay" }),
            $close = e("<div>", { "class": "litebox-close " + this.options.closeTip, "data-tooltip": this.options.closeTipText }),
            $text = e("<div>", { "class": "litebox-text" }),
            $error = e('<div class="litebox-error"><span>' + this.options.errorMessage + "</span></div>"),
            $prevNav = e("<div>", { "class": "litebox-nav litebox-prev " + this.options.prevTip, "data-tooltip": this.options.prevTipText }),
            $nextNav = e("<div>", { "class": "litebox-nav litebox-next " + this.options.nextTip, "data-tooltip": this.options.nextTipText }),
            $container = e("<div>", { "class": "litebox-container" }),
            $loader = e("<div>", { "class": "litebox-loader" }),
            e("body").prepend($litebox.css({ "background-color": this.options.background })),
            $litebox.append($close, $text, $prevNav, $nextNav, $container),
            $litebox.fadeIn(this.options.revealSpeed)
	    },
	    populateLitebox: function (t) {
	        var o = this,
                i = t.attr("href"),
                n = e(".litebox-content"); $litebox.append($loader);
                var l = t.attr("data-litebox-text");
                if ("undefined" == typeof l || "" == l ? (e(".litebox-text").removeClass("active"),
                e(".litebox-text").html()) : (e(".litebox-text").html(l), e(".litebox-text").addClass("active")),
                null !== i.match(/\.(jpeg|jpg|gif|png|bmp)/i)) {
                    var a = e("<img>", { src: i, "class": "litebox-content" });
                    o.transitionContent("image", n, a), e("img.litebox-content").imagesLoaded(function () { $loader.remove() }),
                    a.error(function () { o.liteboxError(), $loader.remove() })
                }
                
	    },
	    transitionContent: function (o, i, n) {
	        var l = this;
	        "inline" != o && $container.removeClass("litebox-scroll"),
            i.remove(),
            $container.append(n), "inline" == o && $container.addClass("litebox-scroll"),
            l.centerContent(), e(t).on("resize", function () { l.centerContent() })
	    },
	    centerContent: function () {
	        $litebox.css({ height: i() }),
            $container.css({ "line-height": $container.height() + "px" }),
            "undefined" != typeof $html && e(".litebox-inline-html").outerHeight() < $container.height() && e(".litebox-inline-html").css({
                "margin-top": "-" + e(".litebox-inline-html").outerHeight() / 2 + "px",
                top: "50%"
            })
	    },
	    closeLitebox: function () {
	        this.options.callbackBeforeClose.call(this),
            $litebox.fadeOut(this.options.revealSpeed,
                function () {
                    e(".litebox-nav").hide(),
                    $litebox.empty().remove(),
                    e(".litebox-preload").remove()
                }),
            e(".tipsy").fadeOut(this.options.revealSpeed, function () { e(this).remove() }),
            e(".litebox-prev").off("click"), e(".litebox-next").off("click"), this.options.callbackAfterClose.call(this)
	    },
	    liteboxError: function () {
	        this.options.callbackError.call(this),
            $container.append($error)
	    }
    },
    e.fn[l] = function (t) {
        return this.each(function () {
            e.data(this, l) || e.data(this, l, new o(this, t))
        })
    }
}(jQuery, window, document);
