module.exports.export_excel=function(req,res){
	var nodeExcel=require('excel-export');
	var dateFormat = require('dateformat');
	var conf={}
	conf.cols=[{
			caption:'Sl.',
			type:'number',
			width:3
		},
		{
			caption:'Job',
			type:'string',
			width:50
		},
		{
			caption:'Date',
			type:'string',
			width:15
		}
		];
		req.models.todo.find({user_id:req.session.id},function(err,rows){
			if(err){
				console.log(err);
				res.redirect('/');
				}
			arr=[];
			for(i=0;i<rows.length;i++){
				job=rows[i].job;
				a=[i+1,job,(dateFormat(rows[i].add_date*1000, "dd/mm/yyyy"))];
				arr.push(a);
				}
				conf.rows=arr;
	var result=nodeExcel.execute(conf);
	res.setHeader('Content-Type','application/vnd.openxmlformates');
	res.setHeader("Content-Disposition","attachment;filename="+"todo.xlsx");
	res.end(result,'binary');
			});
};
