const handleImage = (req, res, db) => {
	const {id} = req.body;
	db('users').where('id','=',id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => 
	{
		res.json(entries[0]); 
	})
	.catch(err => res.status(400).json('unable to ge entries'))
}
module.exports = {handleImage} //using ES6 synatx benefit, no need to repeat key if both key and value are the same