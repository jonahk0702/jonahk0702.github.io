const handleBetAgainst = (req, res, db) =>{   
	db.transaction(function(trx) {
	db('users').transacting(trx)
	.select("balance").from('users')
	.where('email', '=', req.body.email)
	.then(resp => {
		let have = resp[0].balance;
		if(have > req.body.price){

			db('users')
			.where('email', '=', req.body.email)
			.update({balance : (have - req.body.price)})
			.then(resp => {
				db.select('betagainst', 'betfor').from("records")
				.where('email', '=', req.body.email)
				.then(data => { 
					db('records')
					.where('email', '=', req.body.email)
					.update({
						betagainst :  data[0].betagainst + req.body.userId + "-",
						betfor: data[0].betfor + 0 + "-" 

					})
					.then(resp => {
						db.select('amountagainst').from('bets')
						.where('id', '=', req.body.betid)
						.then(data => {
							db('bets')
							.where('id', '=', req.body.betid)
							.update({amountagainst :  data[0].amountagainst + req.body.price})
							.then(resp => {

								db.select('amountfor', 'amountagainst', 'total').from('bets')
								.where('id', '=', req.body.betid)
								.then(data => {
									db('bets')
									.where('id', '=', req.body.betid)
									.update({odds: (Math.round(( ((data[0].amountfor + data[0].total) / (data[0].amountagainst + data[0].total) )  ) * 1000) / 1000)}) // Math.round( ( (data[0].amountfor + data[0].total)/(data[0].amountagainst + data[0].total) ))})

									.then(user => {
										db.select('popular').from('bets')
										.where('id', '=', req.body.betid)
										.then(data => {
											db('bets')
											.where('id', '=', req.body.betid)
											.update({popular :  (data[0].popular + 1)})
											.then(user =>{
												res.json(user);
											})

										})
										
									})
								})
							})			
						})
					}) 
				})

			})	

				

		}
		if(have < req.body.price){
			res.json("Do not have enough Bs");
		}
	    })

	    .then(trx.commit)
	    .catch(trx.rollback);
	})
	.catch(function(err) {
	  console.error(err);
	});
}

module.exports = {
	handleBetAgainst:handleBetAgainst
}