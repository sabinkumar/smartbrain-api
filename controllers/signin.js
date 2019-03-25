const handleSignin = (req, res, db, bcrypt) => {
	//7th March 2019
	const {email, password } = req.body;
	if(!email || !password) {
		return res.status(400).json('incorrect form submission'); //use of return will halt the execution here in case true
	}
	db.select('email', 'hash').from('login')
	.where('email','=', email)
	.then(data => {
		// console.log(data)
		const isValid = bcrypt.compareSync(password, data[0].hash); //here its like we are using object as array
		//console.log(data[0].hash); //made a mistake in signin where 
		if (isValid) {
			return db.select('*').from('users').where('email','=',email) //always use return so that this database knows about it
			.then(user => {
				res.json(user[0])				
			})
			.catch(err => res.status(400).json('unable to get user'))
		} else {
			res.status(400).json('wrong credentials')
		}
	})
	.catch(err=> res.status(400).json('wrong credentials'))
}

module.exports = {
	handleSignin: handleSignin
};