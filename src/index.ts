import { pullRequestMiddleware } from './pull-request.middleware';
import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.post(`/hooks/bitbucket-server`, pullRequestMiddleware, (req, res) => {
  res.end();
});

app.listen(port, () => console.log('Server listening on port ' + port));
