$(document).ready(function() {

	$('#xls').change(function() {
		$('#selectedFile').text($('#xls').val().replace(/C:\\fakepath\\/i, ''));
	});
	var destinationPath;
	var fileName;
	var modelPath;

	$("#btnSubmit").click(function(event) {

		//get the file extention
		fileName = $('#xls').val().replace(/C:\\fakepath\\/i, '');
		fileName = fileName.substring(0, fileName.indexOf('.'));


		//validate input fields
		if ($("#xls").val().length > 1 && $("#modelPath").val().length > 1 && $("#destinationPath").val().length > 1) {

			var filename = $("#xls").val();

			// Use a regular expression to trim everything before final dot
			var extension = filename.replace(/^.*\./, '');

			// If there is no dot anywhere in filename, we would have extension == filename
			if (extension == filename) {
				extension = '';
			} else {
				// if there is an extension, we convert to lower case
				// (N.B. this conversion will not effect the value of the extension
				// on the file upload.)
				extension = extension.toLowerCase();
			}

			if (extension != 'xls' && extension != 'xlsx' && extension != 'csv') {
				alert("Only xls, xlsx or csv formats are allowed!");
				event.preventDefault();
				return;
			}


			//stop submit the form, we will post it manually.
			event.preventDefault();

			// Get form
			var form = $('#fileUploadForm')[0];

			// Create an FormData object
			var data = new FormData(form);
			console.log(data);

			data.append("destinationPath", $("#destinationPath").val());
			destinationPath = $("#destinationPath").val();

			data.append("modelPath", $("#modelPath").val());
			modelPath = $("#modelPath").val();

			// disabled the submit button
			$("#btnSubmit").prop("disabled", true);

			$(".loading").removeClass("loading--hide").addClass("loading--show");
			$(".result label").hide();

			$.ajax({
				type: "POST",
				enctype: 'multipart/form-data',
				url: "/bin/ets/cf/from/xls",
				data: data,
				processData: false,
				contentType: false,
				cache: false,
				success: function(data) {

					$(".result label").text(data);
					$(".result label").show();
					$(".loading").removeClass("loading--show").addClass("loading--hide");
					document.getElementById('btnSubmit').disabled = false;
					document.getElementById('conJSON').disabled = false;

				},
				error: function(e) {

					$(".result label").text(e.responseText);
					$(".result label").show();
					$(".loading").removeClass("loading--show").addClass("loading--hide");
					document.getElementById('btnSubmit').disabled = false;

				}
			});
		}
		else {
			alert("Please, fill the mandatory fields");
			// Cancel the form submission
			event.preventDefault();
			return;
		}


	});

});