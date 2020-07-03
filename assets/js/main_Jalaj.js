var context = "https://5vvnjl5hii.execute-api.ap-south-1.amazonaws.com/dev/LD/";
!(function($) {
  "use strict";

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top;
        var scrolled = 20;

        if ($('#header').length) {
          scrollto -= $('#header').outerHeight()

          if (!$('#header').hasClass('header-scrolled')) {
            scrollto += scrolled;
          }
        }

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 90;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
		getData();
      $('.venobox').venobox({
        'share': false
      });
    });
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Initi AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });
  

  
  

})(jQuery);


function hidePopup(){
	$('#lodaingModal').modal('hide');
}


function sendEmail(obj){
	
	if($("#name").val() == '' ){
		   alert('Please enter your Name.');
		   $("#name").focus()
		   return false;
	   	}
		 if($("#email").val() == '' ){
		   alert('Please enter a valid business email.');
		 $("#email").focus()
		   return false;
	   	}
		 if($("#Phone").val() == '' ){
		   alert('Please enter 10 digit Phone/Mobile Number.');
		   $("#Phone").focus()
		   return false;
	   
		 }
   $(obj).attr('disabled',true);
    $(obj).attr('value','Please wait ...');  
	var content ="</li><li>CompanyName :"+$("#CompanyName").val()+"</li>";
	content = content + "<li>CompanyType :"+$("#CompanyType").val();	
	var map={}
    map["name"]=$("#name").val();
    map["emailid"]=$("#email").val();
    map["phoneNo"]=$("#Phone").val();
    map["message"]=$("#message").val();
	map["otherDetails"]=content;
	
	$.ajax({
	 type: 'POST',
	 url: context + "sendEmail",
	 data: JSON.stringify(map),
	 success: function (response) {
		 alert('Thank you for Contact-Us.')
		 location.reload();
	},
	 error : function (response) {
		alert(response);
		 location.reload();
	}

	});
}

function getData(){
	if("Y" != sessionStorage.getItem("LDdetails")){
		sessionStorage.setItem("LDdetails","Y");
		var d={};		
		$.getJSON('https://ipapi.co/json/', function(data) {
			d["ip"]=data["ip"];
			d["city"]=data["city"];
			d["internet"]=data["org"];
			d["postal"]=data["postal"];
			d["region"]=data["region"];
			d["country"]=data["country_name"];		
				$.ajax({
				 type: 'POST',
				 data: btoa(JSON.stringify(d)),
				 url: context + "requestDetails",
				 success: function (response) {
						
					}
				});			
		});
	}
}

function checkPassword(){
	$('#lodaingModal').modal('show');
			var data = '{"password":"'+$("#password").val()+'"}';
			$.ajax({
			  type: 'POST',
			  url: context + "checkPassword",
			  data : data,
			  success: function (response) { 
					setTimeout(hidePopup, 500);
					$("#usageForm").show();
					},
			  error : function (response) { 
					setTimeout(hidePopup, 500);				
					alert("Invalid Password");
					
					}

			});
		}

function checkUsages(){
	
	if($("#fromDate").val() == "" || $("#toDate").val() == "" ){
			alert("Please enter From date / To date");
			return false;
	}
	
	$('#lodaingModal').modal('show');
			var map={};
			map["fromDate"]=$("#fromDate").val();
			map["toDate"]=$("#toDate").val();
			map["password"]=$("#password").val();
			
			$.ajax({
			  type: 'POST',
			  url: context + "getDetails",
			  data : JSON.stringify(map),
			  success: function (response) { 
					setTimeout(hidePopup, 500);
					//$("#moneyCalcForm").show();
					showUsageTable(response);
					},
			  error : function (response) { 
					setTimeout(hidePopup, 500);				
					alert(response.responseJSON);
					
					}

			});
	
	
}	

function showUsageTable(response1){
var str = "<table id='moneyCalcTable' class='table table-striped table-bordered table-hover'><thead><tr><td >#</td><td width='25%'>Date Time</td><td >IP Address</td><td >City</td><td >Postal Code</td><td>Region</td><td>Country</td><td>Internet Provider</td></tr></thead><tbody>";
	var totalAmount = 0;
	var totalComm = 0;
	
	$(response1).each(function(i,response){
		str = str + "<tr><td>"+(++i)+"</td><td>"+$(response).attr('dateTime')+"</td><td>"+$(response).attr('ip')+"</td><td>"+$(response).attr('city')+"</td><td>"+$(response).attr('postal')+"</td><td>"+$(response).attr('region')+"</td><td>"+$(response).attr('country')+"</td><td>"+$(response).attr('internet')+"</td></tr>";
	});
	
	str = str+"</tbody></table>";	
	$("#showUsageTable").html(str);
	
	$("#usageSummaryTable").html("<b>Total Hit count was "+$(response1).length +" between "+ $("#fromDate").val() + " and "+$("#toDate").val()+"</b>");
}

	