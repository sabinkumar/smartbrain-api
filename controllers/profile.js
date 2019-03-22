 const handleProfileGet = (req, res, db) =>	{
 	const {id} = req.params;
	//let found = false;
	//db.select('*').from('users').then(user => {
	db.select('*').from('users').where({id: id})
	.then(user => {
		//console.log(user);
		if (user.length) {
			res.json(user[0]);			
		} else {
			res.status(400).json('Not Found');
		}
	})
	.catch(err => res.status(400).json('Error in getting'))	
}

module.exports = {
	handleProfileGet: handleProfileGet
}