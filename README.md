creating / pushing docker image :
docker build -f ./prod.Dockerfile -t pegaz171/witosa_next .
docker push pegaz171/witosa_next

running it localy:
docker run --name witosa_next -p 3000:3000 --rm pegaz171/witosa_next
