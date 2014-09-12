module.exports = function (orm, db) {
	db.define('todo', {
		id:{type:'serial',key:true},
		job: { type: 'text' },
		add_date: { type: 'date',time:true },
		user_id: {type:'number'}
		});
	};
