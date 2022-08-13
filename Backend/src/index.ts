import makeApp from './app';
import all_routes from 'express-list-endpoints';

import { database } from './data/connection';

const PORT = process.env.PORT || 3000;

const app = makeApp(database);

// print all registered routes in application
// ex: [ '/api/hello --> GET', '/api/auth/login --> POST' ]
console.log(
  all_routes(app).map((route: any) => route.path + ' --> ' + route.methods)
);

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
