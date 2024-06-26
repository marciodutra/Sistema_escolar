var file;
$('#file-upload').change(function (event) {
	file = event.target.files[0]; 
	fileName = file.name;
	$("#file-name").text(fileName);
    // para apenas 1 arquivo
    //var name = event.target.files[0].content.name;
    // para capturar o nome do arquivo com sua extenção
});
$('#form-atividade').submit(function(e) {
	e.preventDefault();
	data = new FormData();
	data.append('file-activity', file);

	var x = $("#form-atividade").find("input");
	x.each(function(){
		data.append(this.name, this.value);
	});

	var y = $("#form-atividade").find("textarea");
	y.each(function(){
		data.append(this.name, this.value);
	});

	var b = false;
	
	var msg = "";
	if(!b){
		$.ajax({
			type:"POST",
			url:"http://localhost/sistema/controllers/atividade_controller.php?action=cad",
			data:data,
			dataType: "json",
			processData: false,
    		contentType: false,
			success: function(retorno, jqXHR){
				$('#form-atividade')[0].reset();
				msg = retorno;
				$('#msg-atividade').append(msg); 
     			$(".icon-close").click(function(e) {
		        	$(e.target).parent("#msg-atividade").remove();
		      	});
			},
			error: function (jqXHR, exception) {
		        var msg_error = '';
		        if (jqXHR.status === 0) {
		            msg_error = 'Not connect.\n Verify Network.';
		        } else if (jqXHR.status == 404) {
		            msg_error = 'Requested page not found. [404]';
		        } else if (jqXHR.status == 500) {
		            msg_error = 'Internal Server Error [500].';
		        } else if (exception === 'parsererror') {
		            msg_error = 'Requested JSON parse failed.';
		        } else if (exception === 'timeout') {
		            msg_error = 'Time out error.';
		        } else if (exception === 'abort') {
		            msg_error = 'Ajax request aborted.';
		        } else {
		            msg_error = 'Uncaught Error.\n' + jqXHR.responseText;
		        }
		        alert(msg_error);
    		},
		});
	}else{
		alert("Preencha todos os campos");
	}
});
