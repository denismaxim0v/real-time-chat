# Real time chat application
For this project I'm using:
Docker
Kubernetes(Minikube)
Typescript
Express
Kafka
Redis

--------NOTES-----------------
Because there is a bug with minikube, the communication between kafka and zookeeper can't be established unless you run:

```
minikube start
minikube ssh
sudo ip link set docker0 promisc on
```

To start the project:
```
minikube start
minikube addons enable ingress
minikube ip

put the ip received from the last command into /etc/hosts like chatapp.dev 0.0.0.0(your minikube ip here)

skaffold dev(or to debug you can run skaffold dev --cleanup=false)
```
