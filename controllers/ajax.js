exports.checkEmail=function(req,res){
	var input = JSON.parse(JSON.stringify(req.body));
	console.log(input);
			var data={
			email:input.email
		};
	req.models.user.find(data, function(err, rows,next) {
					if (err){
				data={status:'error',code:'200'};
			}
			else{
					if(rows.length>0){
						data={status:'exist',code:'300'};
						}
					else{
						data={status:'success',code:'400'};
						}	
			}
							res.json(data);
		});
};
