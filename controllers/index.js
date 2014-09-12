var dateFormat = require('dateformat');
module.exports.home = function(req, res){
	//delete req.session;
	if(typeof req.session.id!='undefined'){
	req.models.todo.find({user_id:req.session.id}, function(err, rows) {
		if(err){
			console.log(err);
		}
				data={title:req.session.fname+' | home',fname:req.session.fname,todo:rows,dateFormat:dateFormat,pic:req.session.pic};
				res.render('home',data);
		});


	}
	else{
		data={title:'login|signup'};
		res.render('index',data);
	}
};
