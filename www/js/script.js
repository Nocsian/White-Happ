var latitud;
var longitud;

$( document ).ready(function() {
    					
		
		$.ajax({
		url: "http://concienciati.com/php/prestarAyuda.php",
		type: "POST",
		crossDomain: true,
		cache: false,
		data:{ 
			accion:"listar_solicitudes"
		},
		success: function(data){
				jQuery("#listviewHapp").append(data);
				
			}	
		});

		$.ajax({
		url: "http://concienciati.com/php/perfil.php",
		type: "POST",
		crossDomain: true,
		cache: false,
		data:{ 
			accion:"datos_perfil"
		},
		success: function(data){
				var data = data.split("/__/")
				jQuery("#title").append(data[1]);
				jQuery("#title-info").append(data[2]);
				
				
			}	
		});
});


function menuOp(op){

  if (op == 1) {
  	document.getElementById("sAyuda").style.display = "none";
  	document.getElementById("pAyuda").style.display = "none";
	document.getElementById("doneAyuda").style.display = "none";
	document.getElementById("preferencias").style.display = "none";
	jQuery("#listviewHapp").empty();
	jQuery("#preferencesHapp").empty();
  }
  if (op == 2) {
  	document.getElementById("sAyuda").style.display = "block";
	document.getElementById("btn1").style.display = "block";
  	document.getElementById("pAyuda").style.display = "none";
	document.getElementById("doneAyuda").style.display = "none";
	document.getElementById("preferencias").style.display = "none";
	jQuery("#listviewHapp").empty();
	jQuery("#preferencesHapp").empty();
  }  
  if (op == 3) {
	  $.ajax({
		url: "http://concienciati.com/php/prestarAyuda.php",
		type: "POST",
		crossDomain: true,
		cache: false,
		data:{ 
			accion:"listar_solicitudes"
		},
		success: function(data){
				jQuery("#listviewHapp").append(data);
				
			}	
		});
  	document.getElementById("sAyuda").style.display = "none";
  	document.getElementById("pAyuda").style.display = "block";
	document.getElementById("doneAyuda").style.display = "none";
	document.getElementById("preferencias").style.display = "none";
	jQuery("#preferencesHapp").empty();
  }
    if (op == 4) {
	$.ajax({
		url: "http://concienciati.com/php/preferencias.php",
		type: "POST",
		crossDomain: true,
		cache: false,
		data:{ 
			accion:"preferencia_usuario",
			idusuario:11
		},
		success: function(data){
				jQuery("#preferencesHapp").append(data);
				
			}
		});
  	document.getElementById("sAyuda").style.display = "none";
  	document.getElementById("pAyuda").style.display = "none";
	document.getElementById("doneAyuda").style.display = "none";
	document.getElementById("preferencias").style.display = "block";
	jQuery("#listviewHapp").empty();
  }
   if (op == 5) {
	   jQuery("#preferencesHapp").empty();
	   jQuery("#listviewHapp").empty();
		window.location.href="index.html";
  }
}



function clickGPS()
{
  document.getElementById("btn1").style.display = "none";
  document.getElementById("cargando").style.display = "block";
		
  navigator.geolocation.getCurrentPosition(onSuccessMiGps, onErrorMiGps);

}

function onSuccessMiGps(posicion)
{
		  latitud=posicion.coords.latitude;
		  longitud=posicion.coords.longitude;
		  dbins_happ();
}

function onErrorMiGps(error) 
{
        alert('Codigo: '    + error.code    + '\n' +   'Mensaje: ' + error.message + '\n');
}

function dbins_happ(){
				
	var idusuario=Math.floor((Math.random() * 100) + 1);
	var fecha="12/10/2016";
	var descripcion=$("#tbxSolicitud").val();
	var id_categoria=$("#cbxCategoria").val();
	var id_subCategoria=$("#cbxSubCategoria").val();
		
	var dataString="idusuario="+idusuario+"&latitud="+latitud+"&longitud="+longitud+"&fecha="+fecha+"&descripcion="+descripcion+"&id_categoria="+id_categoria+"&id_subCategoria="+id_subCategoria+"&insert=";

		if($.trim(latitud).length>0 & $.trim(longitud).length>0 & $.trim(descripcion).length>0){		
			$.ajax({
			type: "POST",
			url:"http://concienciati.com/php/insert_happ.php",
			data: dataString,
			crossDomain: true,
			cache: false,
			success: function(data){

				if(data=='success'){
					document.getElementById("sAyuda").style.display = "none";
					document.getElementById("cargando").style.display = "none";
					document.getElementById("doneAyuda").style.display = "block";
					document.getElementById("cbxCategoria").value = 0;
					document.getElementById("cbxSubCategoria").value = 0;
					document.getElementById("tbxSolicitud").value = "";					
					
				}
				 else if(data=='error'){	
					alert("Se ha producido un error: Code #1PROC");
					document.getElementById("cbxCategoria").value = 0;
					document.getElementById("cbxSubCategoria").value = 0;
					document.getElementById("tbxSolicitud").value = "";
					document.getElementById("cargando").style.display = "none";
					document.getElementById("btn1").style.display = "block";
					
				} 
			 }
			 });
		}else{
			alert("Se ha producido un error: Code #2PROC");
		}
		
		return false;
 
}

function listar(){
	var error=0;
	
	$.ajax({
		url: "http://concienciati.com/php/prestarAyuda.php",
		type: "POST",
		crossDomain: true,
		cache: false,
		data:{ 
			accion:"listar_solicitudes"
		},
		success: function(data){
				
				jQuery("#listviewHapp").append(data);
				
			}	
		});
	if(error == 1){
		return false;
	}else{
		return true;
	}
	
	  
}
       

    	function getImage() {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(uploadPhoto, function(message) {
			alert('la imagen no ha sido seleccionada');
		},{
			quality: 50, 
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
		}
            );
 
        }
 
        function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
 
            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";
 
            options.params = params;
            options.chunkedMode = false;
 
            var ft = new FileTransfer();
            ft.upload(imageURI, "http://concienciati.com/php/upload.php", win, fail, options);
        }
 
        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            alert(r.response);
        }
 
        function fail(error) {
            alert("Se ha producido un error: Code = " + error.code);
        }



