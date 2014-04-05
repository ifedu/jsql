jsql
====

Sintaxis SQL para recorrer JSON

Ejemplos:
```javascript
////SELECT////
var jSql,
    query;

jSql = JSql()
    .select('phone, picture, age', 'tags')
    .from(data);
query = jSql.query();

////UPDATE////
JSql()
    .update(data)
    .set('phone="lolo", picture="lala", age=20, picture=true')
    .query();

////DELETE////
JSql()
    .delete(data)
    .where('picture=true')
    .query();

////INSERT////
JSql()
    .insert(data)
    .into('newPicture')
    .values('Valor nuevo')
    .query();
```