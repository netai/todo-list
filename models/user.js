module.exports = function (orm, db) {
	db.define('user', {
		id:{type:'serial',key:true},
		fname: { type: 'text' },
		lname: { type: 'text' },
		email: { type: 'text' },
		password: { type: 'text' },
		username: { type: 'text' },
		date_join: { type: 'date',time:true }
		});
	};
