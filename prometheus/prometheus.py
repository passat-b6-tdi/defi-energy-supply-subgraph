from prometheus_client import start_http_server, Gauge
import requests
import time
import re

# Define gauge metrics
total_consumption_gauge = Gauge('total_energy_consumption', 'Total energy consumption value')
total_production_gauge = Gauge('total_energy_production', 'Total energy production value')
total_consumers_gauge = Gauge('total_consumers', 'Total number of consumers supplied by all suppliers')
total_suppliers_gauge = Gauge('total_suppliers', 'Total number of suppliers')
consumer_consumption_gauges = {}
supplier_production_gauges = {}

def sanitize_metric_name(name):
    return re.sub(r'[^a-zA-Z0-9_:]', '_', name)

def fetch_data():
    response = requests.post('https://api.studio.thegraph.com/query/59239/defi-energy-supply-arb-sep/version/latest', json={
        'query': '''
        {
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
    })
    data = response.json()

    # Update metrics with fetched data
    if 'data' in data:
        suppliers = data['data']['suppliers']

        total_consumption = 0
        total_production = 0
        total_consumers = 0
        total_suppliers = len(suppliers)

        for supplier in suppliers:
            # Total production calculation
            if 'energyProduction' in supplier and supplier['energyProduction'] is not None:
                production = int(supplier['energyProduction']['production'])
                total_production += production

                sanitized_supplier_id = sanitize_metric_name(supplier['id'])

                # Create a gauge for the supplier if it doesn't exist
                if sanitized_supplier_id not in supplier_production_gauges:
                    supplier_production_gauges[sanitized_supplier_id] = Gauge(f"supplier_production_{sanitized_supplier_id}", f"Energy production for supplier {supplier['id']}")
                # Update the supplier's gauge
                supplier_production_gauges[sanitized_supplier_id].set(production)

            total_consumers += len(supplier['consumers'])
            for consumer in supplier['consumers']:
                if 'energyConsumption' in consumer and consumer['energyConsumption'] is not None:
                    consumption = int(consumer['energyConsumption']['consumption'])
                    total_consumption += consumption

                    sanitized_consumer_id = sanitize_metric_name(consumer['id'])

                    # Create a gauge for the consumer if it doesn't exist
                    if sanitized_consumer_id not in consumer_consumption_gauges:
                        consumer_consumption_gauges[sanitized_consumer_id] = Gauge(f"consumer_consumption_{sanitized_consumer_id}", f"Energy consumption for consumer {consumer['id']}")
                    # Update the consumer's gauge
                    consumer_consumption_gauges[sanitized_consumer_id].set(consumption)

        total_consumption_gauge.set(total_consumption)
        total_production_gauge.set(total_production)
        total_consumers_gauge.set(total_consumers)
        total_suppliers_gauge.set(total_suppliers)

if __name__ == '__main__':
    start_http_server(8000)
    while True:
        fetch_data()
        time.sleep(60)
