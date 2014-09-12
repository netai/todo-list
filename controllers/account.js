	var md5 = require('MD5');
//signup
module.exports.signup=function(req,res){
	var input = JSON.parse(JSON.stringify(req.body));
	var dt_join=Math.round(+new Date()/1000);

		passwd=md5(input.password);
		var data = {
			fname    : input.fname,
			lname : input.lname,
			email   : input.email,
			username:input.username,
			password   : passwd,
			date_join: dt_join
		};
		req.models.user.create(data, function(err, rows) {
					if(err){ 
			console.log(err);
		}
		if(rows.id){
			req.session.fname=rows.fname;
			req.session.id=rows.id;
		}
		res.redirect('/');
			});
};
//login
module.exports.login=function(req,res){
	var input=JSON.parse(JSON.stringify(req.body));
		var data={
			email:input.email,
			password:md5(input.password)
		};
	req.models.user.find(data, function(err, rows,next) {
		if(err){ 
			console.log(err);
		}
		if(rows.length>0){
			req.session.fname=rows[0].fname;
			req.session.id=rows[0].id;
		}
		res.redirect('/');
		});
};
//logout
module.exports.logout=function(req,res){
	delete req.session;
	res.redirect('/');
};
