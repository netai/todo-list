//add todo
module.exports.add_todo = function(req, res){
	if(typeof req.session.id!='undefined'){
		data={title:'Add todo | '+req.session.fname,fname:req.session.fname};
		res.render('add_todo',data);
	}
	else{
		res.redirect('/');
	}
};
//save todo
module.exports.save_todo=function(req,res){
	var input=JSON.parse(JSON.stringify(req.body));

		var data={
			job:input.job,
			add_date:Math.round(+new Date()/1000),
			user_id:req.session.id
		};
		if(typeof input.id=="undefined"){
			req.models.todo.create(data,function(err,rows){
				if(err){
					console.log(err);
					}
				else{
					}
					res.redirect('/');
				});
			}
		else{
			req.models.todo.get(input.id,function(err,rows){
				if(err){
					console.log(err);
				}
				else{
					rows.job=input.job;
					rows.save(function(err){
						console.log('saved');
						});
				}
				res.redirect('/');
				});
			}
};
//edit todo
module.exports.edit_todo=function(req,res){
	req.models.todo.find({id:req.params.id},function(err,rows){
		if(err){
			console.log(err);
			}
		else{
		data={title:'Edit todo | '+req.session.fname,fname:req.session.fname,todo:rows};
					res.render('edit_todo',data);
			}
		});
};
//delete todo
module.exports.delete_todo=function(req,res){
	req.models.todo.find({id:req.params.id}).remove(function(err){
		if(err){
			console.log(err);
			}
		else{
			}
		res.redirect('/');
		});
};
