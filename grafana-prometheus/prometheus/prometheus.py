from prometheus_client import start_http_server, Gauge
import requests
import time
import re

SUBGRAPH_URL = 'https://api.studio.thegraph.com/query/59239/defi-energy-supply-base-sepolia/version/latest'

# Define gauge metrics
total_consumption_gauge = Gauge('total_energy_consumption', 'Total energy consumption value')
total_production_gauge = Gauge('total_energy_production', 'Total energy production value')
total_consumers_gauge = Gauge('total_consumers', 'Total number of consumers supplied by all suppliers')
total_suppliers_gauge = Gauge('total_suppliers', 'Total number of suppliers')
total_producers_gauge = Gauge('total_producers', 'Total number of registered energy producers')
consumer_consumption_gauges = {}
supplier_production_gauges = {}

def sanitize_metric_name(name):
    return re.sub(r'[^a-zA-Z0-9_:]', '_', name)

def fetch_data():
    try:
        response = requests.post(SUBGRAPH_URL, json={
            'query': '''
            {
              producers {
                id
              }
              suppliers {
                id
                energyProduction {
                  production
                }
                consumers {
                  energyConsumption {
                    consumption
                  }
                  id
                }
              }
            }
            '''
        }, timeout=15)
        data = response.json()
    except (requests.RequestException, ValueError) as exc:
        print(f"[fetch_data] subgraph request failed: {exc}")
        return

    if 'errors' in data:
        print(f"[fetch_data] subgraph returned errors: {data['errors']}")
    if 'data' not in data or data['data'] is None:
        return

    suppliers = data['data'].get('suppliers', []) or []
    producers = data['data'].get('producers', []) or []

    total_consumption = 0
    total_production = 0
    total_consumers = 0
    total_suppliers = len(suppliers)
    total_producers = len(producers)

    for supplier in suppliers:
        if supplier.get('energyProduction') is not None:
            production = int(supplier['energyProduction']['production'])
            total_production += production

            sanitized_supplier_id = sanitize_metric_name(supplier['id'])

            if sanitized_supplier_id not in supplier_production_gauges:
                supplier_production_gauges[sanitized_supplier_id] = Gauge(
                    f"supplier_production_{sanitized_supplier_id}",
                    f"Energy production for supplier {supplier['id']}",
                )
            supplier_production_gauges[sanitized_supplier_id].set(production)

        consumers = supplier.get('consumers') or []
        total_consumers += len(consumers)
        for consumer in consumers:
            if consumer.get('energyConsumption') is not None:
                consumption = int(consumer['energyConsumption']['consumption'])
                total_consumption += consumption

                sanitized_consumer_id = sanitize_metric_name(consumer['id'])

                if sanitized_consumer_id not in consumer_consumption_gauges:
                    consumer_consumption_gauges[sanitized_consumer_id] = Gauge(
                        f"consumer_consumption_{sanitized_consumer_id}",
                        f"Energy consumption for consumer {consumer['id']}",
                    )
                consumer_consumption_gauges[sanitized_consumer_id].set(consumption)

    total_consumption_gauge.set(total_consumption)
    total_production_gauge.set(total_production)
    total_consumers_gauge.set(total_consumers)
    total_suppliers_gauge.set(total_suppliers)
    total_producers_gauge.set(total_producers)

if __name__ == '__main__':
    start_http_server(8000)
    while True:
        fetch_data()
        time.sleep(60)
