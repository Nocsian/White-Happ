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
	document.getElementById("chat").style.display = "none";	
	document.getElementById("ap_enc").style.display = "none";	
	jQuery("#chatbox").empty(); 
	jQuery("#chatprivado").empty();
	
	if (op == 1) {
	 
  	document.getElementById("sAyuda").style.display = "none";
  	document.getElementById("msolicitud").style.display = "none";
  	document.getElementById("pAyuda").style.display = "none";
	document.getElementById("doneAyuda").style.display = "none";
	document.getElementById("preferencias").style.display = "none";
	document.getElementById("chat").style.display = "none";
	document.getElementById("dashboard_sec").style.display = "block";
	
	jQuery("#listviewHapp").empty();
	jQuery("#listmyHapp").empty();
	jQuery("#preferencesHapp").empty();
	jQuery("#chatbox").empty();
	
	}
  
	if (op == 2) {
	  
  	document.getElementById("sAyuda").style.display = "block";
	document.getElementById("btn1").style.display = "block";
	document.getElementById("msolicitud").style.display = "none";
  	document.getElementById("pAyuda").style.display = "none";
	document.getElementById("doneAyuda").style.display = "none";
	document.getElementById("preferencias").style.display = "none";
	document.getElementById("dashboard_sec").style.display = "none";
	document.getElementById("chat").style.display = "none";
	
	jQuery("#listviewHapp").empty();
	jQuery("#listmyHapp").empty();
	jQuery("#preferencesHapp").empty();
	jQuery("#chatbox").empty();
	
	}  
  
	if (op == 6) {
		
	jQuery("#listmyHapp").empty();
	
		$.ajax({
		url: "http://concienciati.com/php/misSolicitudes.php",
		type: "POST",
		crossDomain: true,
		cache: false,
		data:{ 
			accion:"listar_solicitudes"
		},
		success: function(data){
				jQuery("#listmyHapp").append(data);
				document.getElementById("msolicitud").style.display = "block";
			}	
		}); 
	document.getElementById("sAyuda").style.display = "none";
  	document.getElementById("pAyuda").style.display = "none";
	document.getElementById("doneAyuda").style.display = "none";
	document.getElementById("preferencias").style.display = "none";
	document.getElementById("dashboard_sec").style.display = "none";
	
	jQuery("#listviewHapp").empty();
	jQuery("#preferencesHapp").empty();
	jQuery("#chatbox").empty();
	
	}
   
	if (op == 3) {
	  
	jQuery("#listmyHapp").empty();
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
				document.getElementById("pAyuda").style.display = "block";
			}	
		});
  	document.getElementById("sAyuda").style.display = "none"; 
	document.getElementById("msolicitud").style.display = "none";	
	document.getElementById("doneAyuda").style.display = "none";
	document.getElementById("preferencias").style.display = "none";
	document.getElementById("dashboard_sec").style.display = "none";
	
	jQuery("#listmyHapp").empty();
	jQuery("#preferencesHapp").empty();
	jQuery("#chatbox").empty();
	    
	}
  
    if (op == 4) {
		
	jQuery("#preferencesHapp").empty();
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
					document.getElementById("preferencias").style.display = "block";
			}
		});
  	document.getElementById("sAyuda").style.display = "none";
  	document.getElementById("pAyuda").style.display = "none";
	document.getElementById("doneAyuda").style.display = "none";
	document.getElementById("dashboard_sec").style.display = "none";
	document.getElementById("chat").style.display = "none";

	jQuery("#listviewHapp").empty();
	jQuery("#listmyHapp").empty();
	jQuery("#preferencesHapp").empty();
	jQuery("#chatbox").empty();
	
  }
  
	if (op == 5) {
	jQuery("#listviewHapp").empty();
	jQuery("#listmyHapp").empty();
	jQuery("#preferencesHapp").empty();
	jQuery("#chatbox").empty();
	
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
/*	if(error == 1){
		return false;
	}else{
		return true;
	}
*/
	  
}

/*
function valida_estado_solicitud(solic){
	$("#asignada").val(0);
		$.ajax({
		url: "http://concienciati.com/php/chatprivado.php",
		type: "POST",
		crossDomain: true,
		cache: false,
		data:{ 
			accion:"valida_asignacion",
			solicitud:solic
		},
		success: function(data){
				
				if(data == 0){
					dato=0;
				}
				else{
					dato=1;
				}	
				
				 
			}	
		});
	if(dato == 1){
		alert(1);
		$("#asignada").val(1);
		return true;
		}
	else{
		alert(2);
		$("#asignada").val(0);
		return false;		
		}
	
	
}*/

function chat_thread(ayudante,solicitud,solicitante,lat,lon){
	//alert('id ayudante:'+ayudante+' - id solicitud:'+solicitud+' - id solicitante:'+solicitante+' - latitud:'+lat+' - longitud:'+lon);	
		var ayudante = ayudante;
		var solicitud = solicitud;
		var solicitante = solicitante;
		var lat = lat;
		var lon = lon;
		
		$("#solicitud_hid").val(solicitud);
		
		document.getElementById("pAyuda").style.display = "none";
		document.getElementById("msolicitud").style.display = "none";
		jQuery("#chatbox").empty();
		document.getElementById("chat").style.display = "block";
		jQuery("#listviewHapp").empty();
		jQuery("#listmyHapp").empty();
		
		$.ajax({
			url: "http://concienciati.com/php/chat.php",
			type: "POST",
			crossDomain: true,
			cache: false,
			data:{ 
				accion:"listar_chat",
				ayudante:ayudante,
				solicitud:solicitud,
				solicitante:solicitante,
				lat:lat,
				lon:lon
			},
			success: function(data){
					
					jQuery("#chatbox").append(data);
					
				}	
			}); 
			
		
		/*	if(error == 1){ 
			return false;
		}else{
			return true;
		} */   
	
}

function chat_thread_2(ayudante,solicitud,solicitante,lat,lon,estado){
	//alert('id ayudante:'+ayudante+' - id solicitud:'+solicitud+' - id solicitante:'+solicitante+' - latitud:'+lat+' - longitud:'+lon);
	
		var ayudante = ayudante;
		var solicitud = solicitud;
		var solicitante = solicitante;
		var lat = lat;
		var lon = lon;
		
		$("#solicitud_hid").val(solicitud);
		
		document.getElementById("pAyuda").style.display = "none";
		document.getElementById("msolicitud").style.display = "none";
		jQuery("#chatbox").empty();
		document.getElementById("chat").style.display = "block";
		jQuery("#listviewHapp").empty();
		jQuery("#listmyHapp").empty();
		
		if(estado!=2){
			$.ajax({
				url: "http://concienciati.com/php/chat.php",
				type: "POST",
				crossDomain: true,
				cache: false,
				data:{ 
					accion:"listar_chat",
					ayudante:ayudante,
					solicitud:solicitud,
					solicitante:solicitante,
					lat:lat,
					lon:lon
				},
				success: function(data){
						
						jQuery("#chatbox").append(data);
						
					}	
				}); 
		}
		else{
			jQuery("#chatbox").empty();
			$.ajax({
				url: "http://concienciati.com/php/chatprivado.php",
				type: "POST",
				crossDomain: true,
				cache: false,
				data:{ 
					accion:"volver_chatprivado",
					solicitud:solicitud
				},
				success: function(data){
						
						jQuery("#chatprivado").append(data);
						
					}	
				});
			
			
			
			document.getElementById("chat").style.display = "none";
			alert('su solicitud se encuentra asignada a un usuario');
			document.getElementById("ap_enc").style.display = "block";
		}
		
		/*	if(error == 1){ 
			return false;
		}else{
			return true;
		} */   
	
}


function envia_msg(){
	solicitud	= $("#solicitud_hid").val();
	msg			= $("#usermsg").val();
	
		$.ajax({
		url: "http://concienciati.com/php/chat.php",
		type: "POST",
		crossDomain: true,
		cache: false,
		data:{ 
			accion:"msg_chat",
			solicitud:solicitud,
			msg:msg
		},
		success: function(data){
				jQuery("#chatbox").empty();
				jQuery("#chatbox").append(data);
				
			}	
		}); 
}





function asigna_ayudante(solicitud,ayudante){
	
	alert(ayudante+" será asignado para brindarle ayuda");
	jQuery("#chatbox").empty();
	jQuery("#chatprivado").empty();
	document.getElementById("chat").style.display = "none";
	
	$("#solicitud_hid2").val(solicitud);
	$("#ayudante_priv").val(ayudante);
	
	$.ajax({
		url: "http://concienciati.com/php/chatprivado.php",
		type: "POST",
		crossDomain: true,
		cache: false,
		data:{ 
			accion:"asignar_ayudante",
			solicitud:solicitud,
			ayudante:ayudante
		},
		success: function(data){
				
				jQuery("#chatprivado").append(data);
				
			}	
		});
	
	document.getElementById("ap_enc").style.display = "block";
	
}

function envia_msg_privado(){
	ayudante	= $("#ayudante_priv").val();
	solicitud	= $("#solicitud_hid2").val();
	msg			= $("#usermsg2").val();
	
		$.ajax({
		url: "http://concienciati.com/php/chatprivado.php",
		type: "POST",
		crossDomain: true,
		cache: false,
		data:{ 
			accion:"msg_chat",
			ayudante:ayudante,
			solicitud:solicitud,
			msg:msg
		},
		success: function(data){
				jQuery("#chatprivado").empty();
				jQuery("#chatprivado").append(data);
				
			}	
		}); 
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

function actualizarPreferencias() {
         var cbx = "";
         $("input:checkbox:checked").each(   
    		function() {
    		cbx = cbx + $(this).val() + ",";
    		}
		);
         cbx = cbx.substr(0,cbx.length-1);
         guardarPreferencias(cbx);
        }
     
         
function guardarPreferencias(cBox){
  			var dataString="cBox="+cBox;
   
			$.ajax({
				url: "http://concienciati.com/php/guardarPreferencias.php",
				type: "POST",
				crossDomain: true,
				cache: false,
				data:dataString,
				success: function(data){
						jQuery("#preferencesHapp").empty();
						jQuery("#preferencesHapp").append(data);
						
					}
				}); 
		 	document.getElementById("sAyuda").style.display = "none";
		 	document.getElementById("pAyuda").style.display = "none";
			document.getElementById("doneAyuda").style.display = "none";
			document.getElementById("preferencias").style.display = "block";
			jQuery("#listviewHapp").empty();
   
		}


