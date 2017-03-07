# deis-webhooks

Server for listening and responding to Pull-Request events from Git repositories

## Usage

Build:
```bash
docker build . -t deis-pr-trigger \
               --build-arg DEIS_CTRL=http://deis.35.187.69.35.nip.io \
               --build-arg DEIS_USERNAME=deis-webhooks \
               --build-arg DEIS_PASSWORD="L56Wa%C~Dc"
```

Run: 
``` bash
docker run -d -p 5000:5000 deis-webhooks
```

## Working

```bash
tsc -w
nodemon dist
```

## Testing

```bash
curl -X POST -H 'Content-Type: application/json' localhost:3000/hooks/bitbucket-server -d @src/mocks/bitbucket-server/1-open.json
curl -X POST -H 'Content-Type: application/json' localhost:3000/hooks/bitbucket-server -d @src/mocks/bitbucket-server/2-close.json
curl -X POST -H 'Content-Type: application/json' localhost:3000/hooks/bitbucket-server -d @src/mocks/bitbucket-server/3-reopen.json
curl -X POST -H 'Content-Type: application/json' localhost:3000/hooks/bitbucket-server -d @src/mocks/bitbucket-server/4-update.json
curl -X POST -H 'Content-Type: application/json' localhost:3000/hooks/bitbucket-server -d @src/mocks/bitbucket-server/5-merge.json
```
