# AWS

## Prometheus

- In terminal:

```
scp -i "/path/to/PrometheusKey.pem" /path/to/prometheus.py ec2-52-47-197-248.eu-west-3.compute.amazonaws.com:~
ssh -i "/path/to/PrometheusKey.pem" ec2-52-47-197-248.eu-west-3.compute.amazonaws.com
```

- In AWS:

Installing python:

```
sudo yum update -y
sudo yum install -y python3
sudo pip3 install prometheus_client requests
nohup python3 prometheus.py &
```

Installing prometheus:

```
wget https://github.com/prometheus/prometheus/releases/download/v2.53.0-rc.1/prometheus-2.53.0-rc.1.linux-amd64.tar.gz
tar -xvf prometheus-2.53.0-rc.1.linux-amd64.tar.gz
cd prometheus-2.53.0-rc.1.linux-amd64
./prometheus --config.file=prometheus.yml
```

## Grafana

- In terminal:

```
ssh -i "/path/to/PrometheusKey.pem" ec2-user@ec2-52-47-197-248.eu-west-3.compute.amazonaws.com
```

- In AWS:

Installing python:

```
sudo yum update -y
sudo yum install -y python3
sudo pip3 install prometheus_client requests
nohup python3 prometheus.py &
```

Installing prometheus:

```
wget https://github.com/prometheus/prometheus/releases/download/v2.53.0-rc.1/prometheus-2.53.0-rc.1.linux-amd64.tar.gz
tar -xvf prometheus-2.53.0-rc.1.linux-amd64.tar.gz
cd prometheus-2.53.0-rc.1.linux-amd64
./prometheus --config.file=prometheus.yml
```

# Localhost

## Run py script

```
pip install prometheus_client requests

python3.9 prometheus.py
```

## Run Grafana

```
brew install grafana

brew services start grafana
```

## Run Prometheus

```
brew install prometheus

cd /prometheus/

prometheus --config.file=prometheus.yml --web.listen-address=:9091
```

# Docker

## Run network:

```
docker network create monitoring-network
```

## Run Prometheus and Grafana:

```
cd prometheus/

docker-compose up --build
```
