$(function () {
  $(window).scroll(function() {
    $('.privacy').css({left: 0 - $(this).scrollLeft()});
  });

  $('.privacy .accept_area .more_btn').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('on')) {
      $(this).removeClass('on');
      $('.privacy .policy_area').stop().animate({
        height: 0
      }, 500);
    } else {
      $(this).addClass('on');
      $('.privacy .policy_area').stop().animate({
        height: 136 + 'px'
      }, 500);
    }
  });

  $('header .gnb_btn').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('on');
    $('header .logo, header .gnb_area').toggleClass('on');

    $('header .search_wrap .search_btn').click(function (e) {
      e.preventDefault();
      $('header .input_area').toggleClass('on');
    });

    if ($(this).hasClass('on')) {
      $('.gnb_area .lang, .gnb_area .gnb, .gnb_area .search_wrap').fadeIn();
      const menu = gsap.from('.gnb .dept1', {
        opacity: 0,
        yPercent: 100,
        stagger: .1,
      });
    } else {
      $('.gnb_area .lang, .gnb_area .gnb, .gnb_area .search_wrap').fadeOut();
      $('.gnb ul li a').removeClass('on');
      $('.gnb > ul, .gnb .dept1').removeClass('active');
      $('header .input_area').removeClass('on');
    }
  });

  $('.gnb ul li a').hover(function () {
    $('.gnb ul li a').removeClass('on');
    $(this).toggleClass('on');
  });

  $('.gnb .dept1').click(function (e) {
    if ($(this).siblings().length !== 0) {
      e.preventDefault();
    }
    $('.gnb .dept1').removeClass('active');
    $(this).addClass('active');
    $('.gnb > ul').addClass('active');

    if (!$(this).siblings('.sub').hasClass('on')) {
      $('.gnb .sub').removeClass('on');
      $(this).siblings('.sub').addClass('on');

      const menu = gsap.from('.gnb .sub.on a', {
        opacity: 0,
        yPercent: 100,
        stagger: .1,
      });
    }
  });

  const menu_arr = ['TRAVEL', 'CONTEST', 'EVENT', 'CARD', 'COVID19'];

  gsap.from('.main_vis .info_wrap', {
    xPercent: -100,
    duration: 1,
    ease: 'power3'
  })

  const main_swiper = new Swiper(".main_vis", {
    direction: "vertical",
    parallax: true,
    delay: 5000,
    speed: 1000,
    loop: true,
    pagination: {
      el: ".swiper-num",
      type: 'fraction',
    },
    navigation: {
      nextEl: ".info_wrap .mainvis-button-next",
      prevEl: ".info_wrap .mainvis-button-prev",
    },
    on: {
      init: function () {
        guage();
        main_txt();
        $('.main_vis .swiper_name span').text(menu_arr[0]);
      },
      slideChange: function () {
        $('.mainvis-button-play').removeClass('pause');
        guage();
        main_txt();
        $('.main_vis .swiper_name span').text(menu_arr[this.realIndex]);
      },
    }
  });

  main_swiper.on('slideChangeTransitionStart', function () {
    main_txt();
  })

  function guage() {
    $('.main_vis .guage .bar').css({
      height: 0
    }).stop().animate({
      height: 100 + '%'
    }, 6000, function () {
      main_swiper.slideNext();
    })
  }

  function main_txt() {
    $('.main_vis .swiper-slide-active').each(function (index, item) {
      let el = $(this).find('.txt_wrap > *');
      gsap.from(el, {
        opacity: 0,
        yPercent: 100,
        duration: 1,
        stagger: .1,
      });
    })
  }

  $('.mainvis-button-play').click(function () {
    let curHeight = $('.main_vis .guage .bar').height();
    let totalHeight = $('.main_vis .guage').height();
    let restTime = 6000 - (6000 * (curHeight / totalHeight));

    if ($(this).hasClass('pause')) {
      $(this).removeClass('pause');
      $('.main_vis .guage .bar').animate({
          height: 100 + '%'
        },
        restTime,
        function () {
          main_swiper.slideNext();
        });
    } else {
      $(this).addClass('pause');
      $('.main_vis .guage .bar').stop(true, false);
    }
  });

  const travel_swiper = new Swiper(".travel_slider", {
    slidesPerView: 4,
    loop: true,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  $('.sc_outcome .content .num_wrap').each(function (index, item) {
    let el = $(this).find('.num');
    gsap.from(el, {
      scrollTrigger: {
        trigger: item,
        start: '-20% 90%',
      },
      yPercent: 100,
      duration: .5,
      stagger: .1,
    });
  })

  $('.sc_quick .content').hover(function () {
    let idx = $(this).index('.sc_quick .content');
    $('.sc_quick img').removeClass('on');
    $('.bg0' + idx).addClass('on');
  }, function () {
    $('.sc_quick img').removeClass('on');
  });

  gsap.from($('.sc_service .list_wrap a, .sc_service .sub_txt p'), {
    scrollTrigger: {
      trigger: $('.sc_service'),
      start: '40% 90%',
    },
    opacity: 0,
    yPercent: 100,
    duration: 1,
    stagger: .1,
  });

  $('.sc_service .img_area').each(function (index, item) {
    let el = $(this).find('.img_list');
    gsap.from(el, {
      scrollTrigger: {
        trigger: item,
        start: '40% 90%',
      },
      xPercent: 100,
      duration: 1,
      stagger: {
        amount: 1,
        from: 'center'
      },
    });
  })

  $('.sc_service .txt_area .list a').hover(function () {
    let idx = $(this).parent('.list li').index();
    let posi = 4 - idx;

    $('.sc_service .img_area').stop().animate({
      top: 25 * posi + '%'
    });
    $('.img_list').removeClass('on');
    $('.sc_service .img_list').eq(idx).addClass('on');

    $('.sc_service .sub_txt p').stop().animate({
      'opacity': 0
    }, function () {
      $('.sc_service .sub_txt p').removeClass('on');
      $('.sc_service .sub_txt p').eq(idx).stop().animate({
        'opacity': 1
      }).addClass('on');
    })
  }, function () {
    $('.sc_service .img_area').stop().animate({
      top: 50 + '%'
    });
    $('.img_list').removeClass('on');
    $('.sc_service .img_list.cur').addClass('on');

    $('.sc_service .sub_txt p').stop().animate({
      'opacity': 0
    }, function () {
      $('.sc_service .sub_txt p').removeClass('on');
      $('.sc_service .sub_txt p.cur').stop().animate({
        'opacity': 1
      }).addClass('on');
    });
  });

});