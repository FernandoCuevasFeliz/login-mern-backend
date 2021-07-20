import app from './app';
import './database';

async function main() {
  app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
  });
}

main();
