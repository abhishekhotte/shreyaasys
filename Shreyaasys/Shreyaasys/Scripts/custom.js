
$(document).ready(function () {
    $(".mandatory-field").blur(function () {
        fieldValue = $(this).val();
        if (fieldValue == '')
            $(this).addClass('txt-error');
        else
            $(this).removeClass('txt-error');
    });
});

function validateEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
};

function showSuccessStatus(msg) {
    $("#iconType").attr("class", "").addClass("fa fa-check");
    $("#statusMsg").attr("class", "").addClass('success-status').show().delay(3000).fadeOut("slow"); //shows success status message by adding a success-status class and fade it after 3 seconds
    $("#statusText").text(msg); // success status message
}

function showWarningStatus(msg) {
    $("#iconType").attr("class", "").addClass("fa fa-warning");
    $("#statusMsg").attr("class", "").addClass('warning-status').show().delay(3000).fadeOut("slow"); //shows success status message by adding a warning-status class and fade it after 3 seconds
    $("#statusText").text(msg); // warning status message
}

function showStatus(msg) {
    $("#iconType").attr("class", "").addClass("fa fa-spinner fa-spin");
    $("#statusMsg").attr("class", "").addClass("normal-status").show(); //shows status message by adding a normal-status class, use this method to process Ajax request to display waiting status
    $("#statusText").text(msg); //status message
}

function hideStatus() {
    $("#statusMsg").hide(); //use this method to hide waiting status message after completion of Ajax request
}

function autohideStatus(msg) {
    $("#statusMsg").attr("class", "").addClass('normal-status').show().delay(3000).fadeOut("slow");
    $("#statusText").text(msg);
}
function checkIfDivFieldEmpty(id) {
    var isFieldEmpty = false;
    $('#' + id + " .mandatory-field").each(function () {
        fieldValue = $(this).val();
        if (fieldValue == '' || fieldValue == '0'){
            isFieldEmpty = true;
            $(this).addClass('txt-error');
        }
        else
            $(this).removeClass('txt-error');
    });
    return isFieldEmpty;
}

function checkIfFieldEmpty() {
    $(".mandatory-field").each(function () {
        fieldValue = $(this).val();
        if (fieldValue == '')
            $(this).addClass('txt-error');
        else
            $(this).removeClass('txt-error');
    })
}

    (function ($) {
        "use strict";
        var $document = $(document),
            $window = $(window),
            plugins = {
                mainSlider: $('#mainSlider'),
                slideNav: $('#slide-nav'),
                categoryCarousel: $('.category-carousel'),
                testimonialsCarousel: $('.testimonials-carousel'),
                testimonialsSingleCarousel: $('.testimonials-single-carousel'),
                testimonialsGrid: $('.testimonials-grid'),
                servicesCarousel: $('.text-icon-carousel'),
                servicesCarousel2: $('.text-icon-grid'),
                personCarousel: $('.person-carousel'),
                brandCarousel: $('.brand-carousel'),
                backToTop: $('.back-to-top'),
                submenu: $('[data-submenu]'),
                contactForm: $('#contactform'),
                quoteForm1: $('#quoteform1'),
                quoteForm2: $('#quoteform2'),
                questionForm: $('.question-form'),
                bookingForm: $('.booking-form'),
                googleMapFooter: $('#footer-map'),
                iconSquared: $('.text-icon-squared'),
                counterBlock: $('#counterBlock'),
                testimonialsMoreLink: $('.view-more-testimonials'),
                postGallery: $('.blog-isotope'),
                postCarousel: $('.post-carousel'),
                postMoreLink: $('.view-more-post'),
                networkEffect: $('.network-effect'),
                animation: $('.animation'),
                productImage: $("#mainImage"),
                rangeSlider: $('#rangeSlider1'),
                prdCarousel: $('.prd-carousel'),
                stickyHeader: $(".page-header.sticky")
            },
            $shiftMenu = $('#slidemenu, #page-content, body, .navbar, .navbar-header, .page-footer'),
            $navbarToggle = $('.navbar-toggle'),
            $dropdown = $('.dropdown-submenu, .dropdown'),
            $fullHeight = $('#mainSlider, #mainSlider .img--holder');
        /* ---------------------------------------------
         Scripts initialization
        --------------------------------------------- */
        $document.ready(function () {
            var windowWidth = window.innerWidth || $window.width();
            var windowH = $window.height();
            // set fullheigth
            if (windowWidth < 768) {
                $fullHeight.height('');
            } else {
                $fullHeight.height($window.height());
            }
            // detect touch
            var isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;
            if (isTouchDevice) {
                $('body').addClass('touch');
            }
            // main slider
            if (plugins.mainSlider.length) {
                var $el = plugins.mainSlider;
                $el.on('init', function (e, slick) {
                    var $firstAnimatingElements = $('div.slide:first-child').find('[data-animation]');
                    doAnimations($firstAnimatingElements);
                });
                $el.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
                    var $currentSlide = $('div.slide[data-slick-index="' + nextSlide + '"]')
                    var $animatingElements = $currentSlide.find('[data-animation]');
                    doAnimations($animatingElements);
                });
                $el.slick({
                    arrows: true,
                    dots: false,
                    autoplay: true,
                    autoplaySpeed: 7000,
                    fade: true,
                    speed: 1000,
                    pauseOnHover: false,
                    pauseOnDotsHover: true
                });
            }
            // apply network effect
            if (plugins.networkEffect.length && !$('body').hasClass('touch')) {
                networkEffect();
            }
            // back to top button
            if (plugins.backToTop.length) {
                var backPos = plugins.backToTop.offset();
                if (backPos.top < windowH) {
                    plugins.backToTop.hide();
                }
                plugins.backToTop.on('click', function () {
                    $("html, body").animate({
                        scrollTop: 0
                    }, "slow");
                    return false;
                });
            }
            // number counter
            if (plugins.counterBlock.length) {
                plugins.counterBlock.waypoint(function () {
                    $('.number > span', plugins.counterBlock).each(count);
                    this.destroy();
                }, {
                    triggerOnce: true,
                    offset: '80%'
                });
            }
            // CAROUSELS
            // products carousel
            if (plugins.prdCarousel.length) {
                plugins.prdCarousel.slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrows: true,
                    responsive: [{
                        breakpoint: 1299,
                        settings: {
                            dots: true,
                            arrows: false
                        }
                    }, {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 3,
                            dots: true,
                            arrows: false
                        }
                    }, {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 2,
                            dots: true,
                            arrows: false
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            dots: true,
                            arrows: false
                        }
                    }]
                });
            }
            // testimonials carousel
            if (plugins.testimonialsCarousel.length) {
                plugins.testimonialsCarousel.slick({
                    mobileFirst: false,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    arrows: true,
                    dots: true,
                    responsive: [{
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1
                        }
                    }]
                });
            }
            // testimonials single carousel
            if (plugins.testimonialsSingleCarousel.length) {
                plugins.testimonialsSingleCarousel.slick({
                    mobileFirst: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    arrows: true,
                    dots: true
                });
            }
            // person carousel
            if (plugins.personCarousel.length) {
                plugins.personCarousel.slick({
                    mobileFirst: false,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    arrows: false,
                    dots: true,
                    responsive: [{
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 3
                        }
                    }, {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1
                        }
                    }]
                });
            } // brand carousel
            if (plugins.brandCarousel.length) {
                plugins.brandCarousel.slick({
                    mobileFirst: false,
                    slidesToShow: 8,
                    slidesToScroll: 1,
                    infinite: false,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    arrows: false,
                    dots: true,
                    variableWidth: true,
                    responsive: [{
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 6
                        }
                    }, {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 5
                        }
                    }]
                });
            }
            // category carousel
            if (plugins.categoryCarousel.length) {
                plugins.categoryCarousel.slick({
                    mobileFirst: false,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: false,
                    dots: true,
                    responsive: [{
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 3
                        }
                    }, {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 2
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1
                        }
                    }]
                });
            }
            // post carousel
            if (plugins.postCarousel.length) {
                plugins.postCarousel.slick({
                    mobileFirst: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: false,
                    arrows: true,
                    dots: false
                });
            }
            // servicesCarousel carousel
            if (plugins.servicesCarousel.length) {
                plugins.servicesCarousel.slick({
                    mobileFirst: false,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: false,
                    arrows: false,
                    dots: true,
                    responsive: [{
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2
                        }
                    }, {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1
                        }
                    }]
                });
            }
            // END CAROUSELS
            // slide menu
            if (plugins.slideNav.length) {
                var $slideNav = plugins.slideNav,
                    toggler = '.navbar-toggle',
                    $pagewrapper = $('#page-content'),
                    $navigationwrapper = $('.navbar-header'),
                    $slidemenu = $('#slidemenu'),
                    menuwidth = '100%',
                    slidewidth = '270px',
                    menuneg = '-100%',
                    slideneg = '-270px';
                $slideNav.after($('<div id="navbar-height-col"></div>'));
                $slideNav.on("click", toggler, function (e) {
                    var $this = $(this);
                    var $heightCol = $('#navbar-height-col');
                    var selected = $this.hasClass('slide-active');
                    $slidemenu.stop().animate({
                        left: selected ? menuneg : '0px'
                    });
                    $heightCol.stop().animate({
                        left: selected ? slideneg : '0px'
                    });
                    $pagewrapper.stop().animate({
                        left: selected ? '0px' : slidewidth
                    });
                    $navigationwrapper.stop().animate({
                        left: selected ? '0px' : slidewidth
                    });
                    $this.toggleClass('slide-active', !selected);
                    $slidemenu.toggleClass('slide-active');
                    $pagewrapper.toggleClass('slide-active');
                    $navigationwrapper.toggleClass('slide-active');
                    $shiftMenu.toggleClass('slide-active');
                });
            }
            // post isotope
            if (plugins.postGallery.length) {
                var $postgallery = plugins.postGallery;
                $postgallery.imagesLoaded(function () {
                    setPostSize();
                });
                $postgallery.isotope({
                    itemSelector: '.blog-post',
                    masonry: {
                        gutter: 30,
                        columnWidth: '.blog-post:not(.doubleW)'
                    }
                });
            }
            // post more ajax load
            if (plugins.postMoreLink.length) {
                var $postMoreLink = plugins.postMoreLink,
                    $postPreload = $('#postPreload'),
                    $postLoader = $('#moreLoader');
                $postMoreLink.on('click', function () {
                    var target = $(this).attr('data-load');
                    $postLoader.addClass('visible');
                    $(this).hide();
                    $.ajax({
                        url: target,
                        success: function (data) {
                            setTimeout(function () {
                                $postPreload.append(data);
                                $postLoader.removeClass('visible');
                            }, 500);
                        }
                    });
                })
            }
            // testimonials more ajax load
            if (plugins.testimonialsMoreLink.length) {
                var $testimonialsMoreLink = plugins.testimonialsMoreLink,
                    $testimonialsPreload = $('.testimonials-grid > .row'),
                    $testimonialsLoader = $('#moreLoader');
                $testimonialsMoreLink.on('click', function () {
                    var target = $(this).attr('data-load');
                    $testimonialsLoader.addClass('visible');
                    $(this).hide();
                    $.ajax({
                        url: target,
                        success: function (data) {
                            setTimeout(function () {
                                $testimonialsPreload.append(data);
                                $testimonialsLoader.removeClass('visible');
                            }, 500);
                        }
                    });
                })
            }
            // contact page form
            if (plugins.contactForm.length) {
                var $contactform = plugins.contactForm;
                $contactform.validate({
                    rules: {
                        name: {
                            required: true,
                            minlength: 2
                        },
                        message: {
                            required: true,
                            minlength: 20
                        },
                        email: {
                            required: true,
                            email: true
                        }
                    },
                    messages: {
                        name: {
                            required: "Please enter your name",
                            minlength: "Your name must consist of at least 2 characters"
                        },
                        message: {
                            required: "Please enter message",
                            minlength: "Your message must consist of at least 20 characters"
                        },
                        email: {
                            required: "Please enter your email"
                        }
                    },
                    submitHandler: function (form) {
                        $(form).ajaxSubmit({
                            type: "POST",
                            data: $(form).serialize(),
                            url: "process-contact.php",
                            success: function () {
                                $('#success').fadeIn();
                                $('#contactform').each(function () {
                                    this.reset();
                                });
                            },
                            error: function () {
                                $('#contactform').fadeTo("slow", 0, function () {
                                    $('#error').fadeIn();
                                });
                            }
                        });
                    }
                });
            }



            // quote form 1
            if (plugins.quoteForm1.length) {
                var $quoteForm = plugins.quoteForm1;
                $quoteForm.validate({
                    rules: {
                        name: {
                            required: true,
                            minlength: 2
                        },
                        message: {
                            required: true,
                            minlength: 20
                        },
                        email: {
                            required: true,
                            email: true
                        }
                    },
                    messages: {
                        name: {
                            required: "Please enter your name",
                            minlength: "Your name must consist of at least 2 characters"
                        },
                        message: {
                            required: "Please enter message",
                            minlength: "Your message must consist of at least 20 characters"
                        },
                        email: {
                            required: "Please enter your email"
                        }
                    },
                    submitHandler: function (form) {
                        var $this = $(form);
                        $(form).ajaxSubmit({
                            type: "POST",
                            data: $(form).serialize(),
                            url: "process-quote1.php",
                            success: function () {
                                console.log($this)
                                $('.successform', $this).fadeIn();
                                $('.quote-form-js').each(function () {
                                    this.reset();
                                });
                            },
                            error: function () {
                                $('.quote-form-js').fadeTo("slow", 0, function () {
                                    $('.errorform', $this).fadeIn();
                                });
                            },
                        });
                    }
                });
            }

            // quote form 2
            if (plugins.quoteForm2.length) {
                var $quoteForm = plugins.quoteForm2;
                $quoteForm.validate({
                    rules: {
                        name: {
                            required: true,
                            minlength: 2
                        },
                        message: {
                            required: true,
                            minlength: 20
                        },
                        email: {
                            required: true,
                            email: true
                        }
                    },
                    messages: {
                        name: {
                            required: "Please enter your name",
                            minlength: "Your name must consist of at least 2 characters"
                        },
                        message: {
                            required: "Please enter message",
                            minlength: "Your message must consist of at least 20 characters"
                        },
                        email: {
                            required: "Please enter your email"
                        }
                    },
                    submitHandler: function (form) {
                        var $this = $(form);
                        $(form).ajaxSubmit({
                            type: "POST",
                            data: $(form).serialize(),
                            url: "process-quote2.php",
                            success: function () {
                                console.log($this)
                                $('.successform', $this).fadeIn();
                                $('.quote-form-js').each(function () {
                                    this.reset();
                                });
                            },
                            error: function () {
                                $('.quote-form-js').fadeTo("slow", 0, function () {
                                    $('.errorform', $this).fadeIn();
                                });
                            },
                        });
                    }
                });
            }

            // booking form
            if (plugins.bookingForm.length) {
                var bookingForm = plugins.bookingForm;
                bookingForm.validate({
                    rules: {
                        name: {
                            required: true,
                            minlength: 2
                        },
                        message: {
                            required: true,
                            minlength: 20
                        },
                        email: {
                            required: true,
                            email: true
                        }

                    },
                    messages: {
                        name: {
                            required: "Please enter your name",
                            minlength: "Your name must consist of at least 2 characters"
                        },
                        message: {
                            required: "Please enter message",
                            minlength: "Your message must consist of at least 20 characters"
                        },
                        email: {
                            required: "Please enter your email"
                        }
                    },
                    submitHandler: function (form) {
                        var $this = $(form);
                        $(form).ajaxSubmit({
                            type: "POST",
                            data: $(form).serialize(),
                            url: "process-booking.php",
                            success: function () {
                                console.log($this)
                                $('.successform', $this).fadeIn();
                                $('.booking-form').each(function () {
                                    this.reset();
                                });
                            },
                            error: function () {
                                $('.booking-form').fadeTo("slow", 0, function () {
                                    $('.errorform', $this).fadeIn();
                                });
                            },
                        });
                    }
                });
            }

            // question form
            if (plugins.questionForm.length) {
                var questionForm = plugins.questionForm;
                questionForm.validate({
                    rules: {
                        name: {
                            required: true,
                            minlength: 2
                        },
                        message: {
                            required: true,
                            minlength: 20
                        },
                        email: {
                            required: true,
                            email: true
                        }

                    },
                    messages: {
                        name: {
                            required: "Please enter your name",
                            minlength: "Your name must consist of at least 2 characters"
                        },
                        message: {
                            required: "Please enter message",
                            minlength: "Your message must consist of at least 20 characters"
                        },
                        email: {
                            required: "Please enter your email"
                        }
                    },
                    submitHandler: function (form) {
                        var $this = $(form);
                        $(form).ajaxSubmit({
                            type: "POST",
                            data: $(form).serialize(),
                            url: "process-question.php",
                            success: function () {
                                console.log($this)
                                $('.successform', $this).fadeIn();
                                $('.question-form').each(function () {
                                    this.reset();
                                });
                            },
                            error: function () {
                                $('.question-form').fadeTo("slow", 0, function () {
                                    $('.errorform', $this).fadeIn();
                                });
                            },
                        });
                    }
                });
            }


            // datepicker
            if ($('.datetimepicker').length) {
                $('.datetimepicker').datetimepicker({
                    format: 'DD/MM/YYYY',
                    icons: {
                        time: 'icon icon-clock',
                        date: 'icon icon-calendar',
                        up: 'icon icon-arrow_up',
                        down: 'icon icon-arrow_down',
                        previous: 'icon icon-arrow-left',
                        next: 'icon icon-arrow-right',
                        today: 'icon icon-today',
                        clear: 'icon icon-trash',
                        close: 'icon icon-cancel-music'
                    }
                });
            }
            if ($('.timepicker').length) {
                $('.timepicker').datetimepicker({
                    format: 'LT',
                    icons: {
                        time: 'icon icon-clock',
                        up: 'icon icon-arrow_up',
                        down: 'icon icon-arrow_down',
                        previous: 'icon icon-arrow-left',
                        next: 'icon icon-arrow-right'
                    }
                });
            }

            // product gallery 
            function handleResize(mq) {
                if (mq.matches) {
                    ezApi.changeState('enable');
                } else {
                    ezApi.changeState('disable');
                }
            }
            if (plugins.productImage.length) {
                plugins.productImage.elevateZoom({
                    gallery: 'productPreviews',
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    zoomWindowPosition: 1,
                    zoomWindowFadeIn: 500,
                    zoomWindowFadeOut: 500,
                    lensFadeIn: 500,
                    lensFadeOut: 500
                });
                var ezApi = plugins.productImage.data('elevateZoom');
                if ((window.innerWidth || $window.width()) < 769) {
                    ezApi.changeState('disable');
                }
                var mq = window.matchMedia('screen and (min-width: 768px)');
                mq.addListener(handleResize);
                $('#productPreviews > a').on('click', function () {
                    plugins.productImage.attr({
                        src: $(this).attr('data-image'),
                        'data-zoom-image': $(this).attr('data-zoom-image')
                    })
                })
            }

            // icrease/decrease input
            function changeInput() {
                $(document).on('click', '.count-add, .count-reduce', function (e) {
                    var $this = $(e.target),
                        input = $this.parent().find('.count-input'),
                        v = $this.hasClass('count-reduce') ? (input.val() - 1) : (input.val() * 1 + 1),
                        min = input.attr('data-min') ? input.attr('data-min') : 1;
                    if (v >= min) input.val(v);
                    e.preventDefault();
                });
            }
            changeInput();

            // rangeSlider
            if (plugins.rangeSlider.length) {
                var rangeSlider1 = document.getElementById('rangeSlider1');
                noUiSlider.create(rangeSlider1, {
                    start: [100, 2000],
                    connect: true,
                    step: 100,
                    padding: 100,
                    range: {
                        'min': 0,
                        'max': 10100,
                    }
                });
                var number1_1 = document.getElementById('number-1-1');
                var number1_2 = document.getElementById('number-1-2');
                rangeSlider1.noUiSlider.on('update', function (values, handle) {
                    var value = values[handle];
                    if (handle) {
                        number1_1.textContent = Math.round(value);
                    } else {
                        number1_2.textContent = Math.round(value);
                    }
                });
                number1_1.addEventListener('change', function () {
                    rangeSlider1.noUiSlider.set([this.textContent, null]);
                });
                number1_2.addEventListener('change', function () {
                    rangeSlider1.noUiSlider.set([null, this.textContent]);
                });
            }

            if (windowWidth < 769) {
                startCarousel();
            } else {
                if (plugins.iconSquared.length) {
                    equalHeight(".text-icon-squared", ".title", ".text");
                }
                if (plugins.testimonialsGrid.length) {
                    equalHeight(".testimonials-grid .testimonials-item", ".title", ".text");
                }
            }
            // sticky header
            $.fn.stickyHeader = function () {
                var $header = this,
                    $body = $('body'),
                    headerOffset,
                    stickyH;

                function setHeigth() {
                    $(".stspace").remove();
                    $header.removeClass('animated is-sticky fadeIn');
                    $body.removeClass('hdr-sticky');
                    headerOffset = $('#slidemenu', $header).offset().top;
                    stickyH = $header.height() + headerOffset;
                }
                setHeigth();
                var prevWindow = window.innerWidth || $(window).width()
                $(window).on('resize', function () {
                    var currentWindow = window.innerWidth || $(window).width();
                    if (currentWindow != prevWindow) {
                        setHeigth()
                        prevWindow = currentWindow;
                    }
                });
                $(window).scroll(function () {
                    if (prevWindow < 992) return;
                    var st = getCurrentScroll();
                    if (st > headerOffset) {
                        if (!$(".stspace").length && !$body.hasClass('home')) {
                            $header.after('<div class="stspace"></div>');
                            $(".fix-space").css({
                                'height': $header.height() + 'px'
                            });
                        }
                        $header.addClass('is-sticky animated fadeIn');
                    } else {
                        $(".stspace").remove();
                        $header.removeClass('animated is-sticky fadeIn');
                    }
                });

                function getCurrentScroll() {
                    return window.pageYOffset || document.documentElement.scrollTop;
                }
            }

            if (plugins.stickyHeader.length) {
                $(plugins.stickyHeader).stickyHeader();
            }

            toggleNavbarMethod(windowWidth);
            toggleCart('.header-cart', '.header-cart-dropdown');
            modalPopup('.modal-popup-link');
            popupForm('.form-popup-link');

            // Resize window events
            $window.resize(function () {
                var windowWidth = window.innerWidth || $window.width();
                if (windowWidth < 768) {
                    startCarousel();
                    $fullHeight.height('');
                }
                if (windowWidth > 767 && $navbarToggle.is(':hidden')) {
                    $shiftMenu.removeClass('slide-active');
                }
                if (plugins.iconSquared.length) {
                    $(".text-icon-squared, .text-icon-squared .title, .text-icon-squared .text").each(function () {
                        $(this).css({
                            'height': ''
                        });
                    })
                }
                if (plugins.testimonialsGrid.length) {
                    $(".testimonials-grid .testimonials-item, .testimonials-grid .testimonials-item .title, .testimonials-grid .testimonials-item .text").each(function () {
                        $(this).css({
                            'height': ''
                        });
                    })
                }
            });
            $(window).resize(debouncer(function (e) {
                var windowWidth = window.innerWidth || $window.width();
                if (windowWidth > 767) {
                    $fullHeight.height($(window).height());
                    if (plugins.iconSquared.length) {
                        equalHeight(".text-icon-squared", ".title", ".text");
                    }
                    if (plugins.testimonialsGrid.length) {
                        equalHeight(".testimonials-grid .testimonials-item", ".title", ".text");
                    }
                }
                if (plugins.postGallery.length) {
                    setPostSize();
                }
                $dropdown.removeClass('opened');
                toggleNavbarMethod(windowWidth);
            }))
        })
        $window.on('load', function () {
            var windowWidth = window.innerWidth || $window.width();
            $('#loader-wrapper').fadeOut(500);
            // lazy loading effect
            if (plugins.animation.length) {
                onScrollInit(plugins.animation, windowWidth);
            }
            if (plugins.googleMapFooter.length) {
                createMap('footer-map', 14, 37.36274700000004, -122.03525300000001)
            }
        });
        /* ---------------------------------------------
             Functions
            --------------------------------------------- */
        // Set equal height to block
        function equalHeight(block) {
            var wrapWidth = $(block).parent().width(),
                blockWidth = $(block).width(),
                wrapDivide = Math.floor(wrapWidth / blockWidth),
                cellArr = $(block);
            for (var arg = 1; arg <= arguments.length; arg++) {
                for (var i = 0; i <= cellArr.length; i = i + wrapDivide) {
                    var maxHeight = 0,
                        heightArr = [];
                    for (var j = 0; j < wrapDivide; j++) {
                        heightArr.push($(cellArr[i + j]).find(arguments[arg]));
                        if (heightArr[j].outerHeight() > maxHeight) {
                            maxHeight = heightArr[j].outerHeight();
                        }
                    }
                    for (var counter = 0; counter < heightArr.length; counter++) {
                        $(cellArr[i + counter]).find(arguments[arg]).outerHeight(maxHeight);
                    }
                }
            }
        }
        // Slider Animation
        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function () {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay
                });
                $this.addClass($animationType).one(animationEndEvents, function () {
                    $this.removeClass($animationType);
                });
            });
        }
        // Time Out Resize
        function debouncer(func, timeout) {
            var timeoutID, timeout = timeout || 500;
            return function () {
                var scope = this,
                    args = arguments;
                clearTimeout(timeoutID);
                timeoutID = setTimeout(function () {
                    func.apply(scope, Array.prototype.slice.call(args));
                }, timeout);
            }
        }
        // Count To
        function count(options) {
            var $this = $(this);
            options = $.extend({}, options || {}, $this.data('countToOptions') || {});
            $this.countTo(options);
        }
        // Set Post Size fo masonry
        function setPostSize() {
            var windowW = window.innerWidth || $window.width(),
                itemsInRow = 1;
            if (windowW > 1199) {
                itemsInRow = 3;
            } else if (windowW > 767) {
                itemsInRow = 3;
            } else if (windowW > 480) {
                itemsInRow = 1;
            }
            var $postgallery = plugins.postGallery;
            var containerW = $postgallery.parent('.container').width() - 60,
                galleryW = containerW / itemsInRow;
            $postgallery.find('.blog-post').each(function () {
                if (windowW > 767) {
                    if ($(this).hasClass('doubleW')) {
                        $(this).css({
                            width: galleryW * 2 + 30 + 'px',
                        });
                    } else {
                        $(this).css({
                            width: galleryW + 'px'
                        });
                    }
                } else {
                    $(this).css({
                        width: galleryW + 60 + 'px'
                    });
                }
            });
            setTimeout(function () {
                $('.slick-initialized').slick('setPosition');
                $postgallery.isotope('layout');
            }, 100);
        }
        // Mobile Only carousel initialization
        function slickMobile(carousel) {
            carousel.slick({
                mobileFirst: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                autoplay: false,
                arrows: false,
                dots: true,
                slide: '.slide-item',
                responsive: [{
                    breakpoint: 767,
                    settings: "unslick",
                }]
            });
        }
        // start carousel
        function startCarousel() {
            if (plugins.servicesCarousel2.length) {
                slickMobile(plugins.servicesCarousel2);
            }
        }
        // modal popup
        function modalPopup(drop) {
            if ($(drop).length) {
                $(drop).magnificPopup({
                    type: 'inline',
                    midClick: true,
                    removalDelay: 300,
                    mainClass: 'mfp-fade',
                    closeMarkup: '<button title="%title%" class="mfp-close" style="position: absolute; top: 30px; right: -15px">close</button>'
                });
            }
        }
        // dropdown form
        function popupForm(link) {
            if ($(link).length) {
                $(link).on('click', function (e) {
                    $(this).next().toggleClass('opened');
                    e.preventDefault();
                })
                $(document).on('click', function (event) {
                    if (!$(event.target).closest('.form-popup-wrap').length) {
                        if ($('.form-popup').hasClass("opened")) {
                            $('.form-popup').removeClass('opened');
                        }
                    }
                })
            }
        }
        // Navigation dropdown menu
        function toggleNavbarMethod(windowWidth) {
            var $dropdownLink = $(".dropdown > a, .dropdown-submenu > a");
            var $dropdown = $(".dropdown, .dropdown-submenu");
            var $dropdownCaret = $(".dropdown > a > .ecaret, .dropdown-submenu > a > .ecaret");
            $dropdownLink.on('click.toggleNavbarMethod', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var url = $(this).attr('href');
                if (url) $(location).attr('href', url);
            });
            if (windowWidth < 768) {
                $dropdown.unbind('.toggleNavbarMethod');
                $dropdownCaret.unbind('.toggleNavbarMethod');
                $dropdownCaret.on('click.toggleNavbarMethod', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var $li = $(this).parent().parent('li');
                    if ($li.hasClass('opened')) {
                        $li.find('.dropdown-menu').first().stop(true, true).slideUp(0);
                        $li.removeClass('opened');
                    } else {
                        $li.find('.dropdown-menu').first().stop(true, true).slideDown(0);
                        $li.addClass('opened');
                    }
                })
            }
        }

        // Header Cart dropdown menu
        function toggleCart(cart, drop) {
            $('> a', $(cart)).on('click', function () {
                $(cart).toggleClass('opened');
            });
            $(document).on('click', function (e) {
                if (!$(e.target).closest(cart).length) {
                    if ($(cart).hasClass("opened")) {
                        $(cart).removeClass('opened');
                    }
                }
            })
        }

        // Lazy Load animation
        function onScrollInit(items, wW) {
            if (wW > 991) {
                if (!$('body').data('firstInit')) {
                    items.each(function () {
                        var $element = $(this),
                            animationClass = $element.attr('data-animation'),
                            animationDelay = $element.attr('data-animation-delay');
                        $element.removeClass('no-animate');
                        $element.css({
                            '-webkit-animation-delay': animationDelay,
                            '-moz-animation-delay': animationDelay,
                            'animation-delay': animationDelay
                        });
                        var trigger = $element;
                        trigger.waypoint(function () {
                            $element.addClass('animated').addClass(animationClass);
                            if ($element.hasClass('hoveranimation')) {
                                $element.on("webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd", function () {
                                    $(this).removeClass("animated").removeClass("animation").removeClass(animationClass);
                                });
                            }
                        }, {
                            triggerOnce: true,
                            offset: '90%'
                        });
                    });
                    $('body').data('firstInit', true);
                }
            } else {
                items.each(function () {
                    var $element = $(this);
                    $element.addClass('no-animate')
                })
            }
        }
        // Google Map
        function createMap(id, mapZoom, lat, lng) {
            // Create google map
            // Basic options for a simple Google Map
            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
            var mapOptions = {
                // How zoomed in you want the map to start at (always required)
                zoom: mapZoom,
                scrollwheel: false, // The latitude and longitude to center the map (always required)
                center: new google.maps.LatLng(lat, lng), // How you would like to style the map. 
                // This is where you would paste any style found on Snazzy Maps.
                styles: [{
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#e9e9e9"
                    }, {
                        "lightness": 17
                    }]
                }, {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#f5f5f5"
                    }, {
                        "lightness": 20
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "lightness": 17
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "lightness": 29
                    }, {
                        "weight": 0.2
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "lightness": 18
                    }]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "lightness": 16
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#f5f5f5"
                    }, {
                        "lightness": 21
                    }]
                }, {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#dedede"
                    }, {
                        "lightness": 21
                    }]
                }, {
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "color": "#ffffff"
                    }, {
                        "lightness": 16
                    }]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "saturation": 36
                    }, {
                        "color": "#333333"
                    }, {
                        "lightness": 40
                    }]
                }, {
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#f2f2f2"
                    }, {
                        "lightness": 19
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#fefefe"
                    }, {
                        "lightness": 20
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#fefefe"
                    }, {
                        "lightness": 17
                    }, {
                        "weight": 1.2
                    }]
                }]
            };
            // Get the HTML DOM element that will contain your map 
            // We are using a div with id="map" seen below in the <body>
            var mapElement = document.getElementById(id);
            // Create the Google Map using our element and options defined above
            var map = new google.maps.Map(mapElement, mapOptions);
            var image = 'images/map-marker.png';
            // Let's also add a marker while we're at it
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: map,
                icon: image
            });
        }
        // END FUNCTIONS
    })(jQuery);