import makeApp from './app';
import { database } from './data/connection';

//import all_routes from 'express-list-endpoints';

const PORT = process.env.PORT || 3000;

const app = makeApp(database.checkConnection());
//db.checkConnection();

// print all registered routes in application
// ex: [ '/api/hello --> GET', '/api/auth/login --> POST' ]
// console.log(all_routes(app)
//   .map((route: any) => route.path + " --> " + route.methods));

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
