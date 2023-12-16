$(document).ready(function () {

    $('#xls').change(function(){
           $('#selectedFile').text($('#xls').val().replace(/C:\\fakepath\\/i, ''));
    });

    $("#btnSubmit").click(function (event) {

        //validate input fields
        if ($("#xls").val().length > 1) {

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


            if(extension != 'xls' && extension != 'xlsx')
            {

                alert("Only xls or xlsx formats are allowed!");
                event.preventDefault();
                return;
            }
    

            
            //stop submit the form, we will post it manually.
            event.preventDefault();

            // Get form
            var form = $('#fileUploadForm')[0];

            // Create an FormData object 
            var data = new FormData(form);

            //data.append("destPath", $("#destPath").val());

            // disabled the submit button
            $("#btnSubmit").prop("disabled", true);

            $(".loading").removeClass("loading--hide").addClass("loading--show");
            $(".result label").hide();

            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/bin/bulkimportmetadata",
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                success: function (data) {

                    $(".result label").text(data);
                    $(".result label").show();
                    $(".loading").removeClass("loading--show").addClass("loading--hide");
                    $("#btnSubmit").prop("disabled", false);

                },
                error: function (e) {

                    $(".result label").text(e.responseText);
                    $(".result label").show();
                    $(".loading").removeClass("loading--show").addClass("loading--hide");
                    $("#btnSubmit").prop("disabled", false);

                }
            });
        }
        else
        {
            alert("Please, fill the mandatory fields");
            // Cancel the form submission
            event.preventDefault();
            return;
        }



    });

     $("#btnSubmitExport").click(function (event) {

            // Get form input
            var data = $('#exportForm').serializeArray();
        	var path = "";
            var flag = false, duplicatePath=false;

            //Get the multiple paths into a string seperated by comma delimiter
            data.forEach(function(dataValue){
				if (!dataValue.name.includes("@Delete")) {					
				    if(path.includes(dataValue.value) && dataValue. value !=''){
						duplicatePath = true;
					}
					else if (dataValue.value == '') {
						flag = true;
						return false;						
					}
					else {	
						path = path.concat(dataValue.value, ",");
					}
				}
			});
            
		 	if (flag == true || path === "") {
				alert("Please fill all the fields");
		 	}
		 	else if(duplicatePath){
				alert("Please remove duplicate paths");
			}
		 	else {
			 	// Create an FormData object 
			 	var url = window.location.origin;
			 	let redirectUrl = url.concat("/bin/downloadpagetags.report.xls?path=", path);
			 	$(location).attr('href', redirectUrl);
		 	}
   	 });

});