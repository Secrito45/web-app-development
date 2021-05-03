Verkkopalvelin
===

Verkkopalvelimena käytetään node.js ja mongoDB yhdistelmää.

## MongoDB asentaminen tietokoneelle

Katso täältä: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

Mongo Shell käytön ohjeita täältä: https://docs.mongodb.com/manual/mongo/#working-with-the-mongo-shell

## Muista asentaa cors

Seuraavan vireheen ilmaantuessa:
>Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://localhost:3001/. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing)
>

Täytyy asentaa palvelimeen cors niminen middleware. Tämä tapahtuu npm työkalulla käyttämällä komentoa `npm install cors`.

Lisää tietoa corsista löytyy tästä linkistä: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

Lähteet
1. https://www.pluralsight.com/blog/it-ops/linux-file-permissions
2. https://www.howtogeek.com/50787/add-a-user-to-a-group-or-second-group-on-linux/
3. https://linuxize.com/post/how-to-list-groups-in-linux/
4. https://www.cyberciti.biz/faq/understanding-etcgroup-file/
5. https://linuxize.com/post/how-to-create-groups-in-linux/

6. https://www.tutorialspoint.com/mongodb/mongodb_drop_database.htm
7. https://mongoosejs.com/docs/