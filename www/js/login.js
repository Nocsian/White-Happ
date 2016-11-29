var iduser;
//show password
$(document).ready(function(){
    $("#pw").focus(function(){
        this.type = "text";
    }).blur(function(){
        this.type = "password";
    })   
});

//Placeholder fixed for Internet Explorer
$(function() {
	var input = document.createElement("input");
	if(('placeholder' in input)==false) { 
		$('[placeholder]').focus(function() {
			var i = $(this);
			if(i.val() == i.attr('placeholder')) {
				i.val('').removeClass('placeholder');
				if(i.hasClass('password')) {
					i.removeClass('password');
					this.type='password';
				}			
			}
		}).blur(function() {
			var i = $(this);	
			if(i.val() == '' || i.val() == i.attr('placeholder')) {
				if(this.type=='password') {
					i.addClass('password');
					this.type='text';
				}
				i.addClass('placeholder').val(i.attr('placeholder'));
			}
		}).blur().parents('form').submit(function() {
			$(this).find('[placeholder]').each(function() {
				var i = $(this);
				if(i.val() == i.attr('placeholder'))
					i.val('');
			})
		});
	}
	}); 
	 
function goacceso(){
		var usuario		=	$("#usuario").val();
		var pw			=	$("#pw").val();

		var dataString="usuario="+usuario+"&pw="+pw+"&acceso=";
		if(valida_campos()==true){		
			$.ajax({
			type: "POST", 
			url:"http://concienciati.com/php/acceso_happ.php",
			data: dataString,
			crossDomain: true,
			cache: false,
			success: function(data){
				var data = data.split("/__/")
				if(data[0]=='success1'){
					window.location.href="home.html";
				}
				else if(data[0]=='success2'){	
					window.location.href="home-admin.html";
				}				
				else if(data[0]=='error'){	
					alert("El usuario ingresado no ha sido registrado")
				}
			 }
			 }); 
		}else{
			alert("Error Cod.405");
		}
		
		return false;

	window.location.href="home.html";
}
function goregistro(){
	window.location.href="registro.html";
}

function registrar(){
	
		var usuario		=	$("#usuario").val();
		var pw			=	$("#pw").val();
		var pw2			=	$("#pw2").val();
		var nombre		=	$("#nombre").val();
		var apellido	=	$("#apellido").val();
		var email		=	$("#mail").val();
		var pais		=	$("#pais").val();

		var dataString="usuario="+usuario+"&pw="+pw+"&nombre="+nombre+"&apellido="+apellido+"&email="+email+"&pais="+pais+"&insert=";
		if(valida_campos()==true){		
			$.ajax({
			type: "POST", 
			url:"http://concienciati.com/php/registro_happ.php",
			data: dataString,
			crossDomain: true,
			cache: false,
			success: function(data){
				if(data=='success'){
					alert('su cuenta ha sido registrada correctamente');
					window.location.href="home.html";
				}
				 else if(data=='error'){	
					alert("Los datos ingresados no son Válidos")
				}
			 }
			 });
		}else{
			alert("Error Cod.405");
		}
		
		return false;

	  
}
function valida_campos(){
	return true;
}