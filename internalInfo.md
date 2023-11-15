<!-- creating / pushing docker image :
docker build -f ./prod.Dockerfile -t pegaz171/witosa_next .
docker push pegaz171/witosa_next

running it localy:
docker run --name witosa_next -p 3000:3000 --rm pegaz171/witosa_next -->

creating / pushing docker image :

- go to main directory (with docker-compose.yaml file) and run:
  docker-compose up --build

- name is "witosa_nextapp_prod" -> needs to be changed to "pegaz171/witosa_next":
  docker tag witosa-nextapp_prod pegaz171/witosa_next

- push into github:
  docker push pegaz171/witosa_next

  <!-- //delete yaml in kubernetes -->
  <!-- //apply yaml in kubernetes -->

# how to get into shell in a pod:

kubectl exec -it witosa-deployment-85ccfc7cd-cpsdc -- sh (witosa-deployment-85ccfc7cd-cpsdc -> to nazwa PODa, czyli wcześniej kubectl get pods, by tę nazwę uzyskać)
