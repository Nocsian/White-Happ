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



/*$("#mail").blur(function(){
	valida_mail();
});*/

	 

function volverIndex(){
	window.location.href="index.html";
}



function solicitar_mail(){
	var mail = $("#mail").val();
	var dataString = "email="+mail+"&olvido=";
	$.ajax({		
		url:"http://concienciati.com/c875a98756m8045b984i43a456r09c435l5a76v7e/olvidoPassword.php",
		type: "POST",
		crossDomain: true,
		cache: false,
		data: dataString,
		success: function(data){
				jQuery("#mensaje").append(data);
			document.getElementById("mail").style.display = "none";	
			document.getElementById("mensaje").style.display = "block";
			document.getElementById("btnVolver").style.display = "block";
			document.getElementById("btnAceptar").style.display = "none";
		}
	});

}
