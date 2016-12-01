 $( document ).ready(function() {
    	document.getElementById("pAyuda").style.display = "none";				
		
		$.ajax({
		url: "http://concienciati.com/dashboard/dash_info.php",
		type: "POST",
		crossDomain: true,
		cache: false,
		data:{ 
			accion:"listar_dashboard"
		},
		success: function(data){
			     
				jQuery("#dashboard_sec").append(data);
				
			}	 
		});

});



 function cargarDiv(div,url)
  {
    $(div).fadeOut(1000);
        $(div).load(url);
    $(div).fadeIn(1000);    
  }
  function recarga() {
    cargarDiv("#recarga","function_happ.php");
  }

