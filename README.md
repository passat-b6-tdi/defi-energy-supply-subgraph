# Run py script

```
pip install prometheus_client requests

python3.9 prometheus.py
```

# Run Grafana

```
brew install grafana

brew services start grafana
```

# Run Prometheus

```
brew install prometheus

cd /prometheus/

prometheus --config.file=prometheus.yml --web.listen-address=:9091
```
