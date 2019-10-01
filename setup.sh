eval $(minikube docker-env)

cd server

docker image build -t todo-server-kubernetes-app .

kubectl create -f server-app-configs.yaml

kubectl create secret generic server-side-secrets --from-literal=JWT_SECRET=thisIsMySecretKeyForJWT*@.[123

kubectl create -f persistent-vol-server-app.yaml

kubectl create -f persistent-vol-claim-server-app.yaml

kubectl create -f mongodb-pod.yaml

kubectl create -f mongodb-service.yaml

kubectl create -f server-app-deploy.yaml

kubectl create -f server-app-service.yaml

cd ../client

docker image build -t todo-client-kubernetes-app .

kubectl create -f client-app-deploy.yaml

kubectl create -f client-app-service.yaml