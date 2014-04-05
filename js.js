var jSql,
	query;

jSql = JSql()
	.select('phone, picture, age', 'tags')
	.from(data);
query = jSql.query();

JSql()
	.update(data)
	.set('phone="lolo", picture="lala", age=20, picture=true')
	.query();

JSql()
	.delete(data)
	.where('picture=true')
	.query();

JSql()
	.insert(data)
	.into('newPicture')
	.values('Valor nuevo')
	.query();

console.dir(data);