from prometheus_client import start_http_server, Gauge
import requests
import time

# Define gauge metrics
total_consumption_gauge = Gauge('total_energy_consumption', 'Total energy consumption value')
total_users_gauge = Gauge('total_users', 'Total number of users supplied by all suppliers')
total_suppliers_gauge = Gauge('total_suppliers', 'Total number of suppliers')
user_consumption_gauges = {}

def fetch_data():
    response = requests.post('https://api.studio.thegraph.com/query/59239/defi-energy-supply-arb-sep/version/latest', json={
        'query': '''
        {
          suppliers {
            id
            supplierAddress
            amountOfUsers
            users {
              id
              energyConsumption {
                consumption
              }
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
        total_users = 0
        total_suppliers = len(suppliers)

        for supplier in suppliers:
            total_users += len(supplier['users'])
            for user in supplier['users']:
                if 'energyConsumption' in user and user['energyConsumption'] is not None:
                    consumption = int(user['energyConsumption']['consumption'])
                    total_consumption += consumption

                    # Create a gauge for the user if it doesn't exist
                    if user['id'] not in user_consumption_gauges:
                        user_consumption_gauges[user['id']] = Gauge(f"user_consumption_{user['id']}", f"Energy consumption for user {user['id']}")
                    # Update the user's gauge
                    user_consumption_gauges[user['id']].set(consumption)

        total_consumption_gauge.set(total_consumption)
        total_users_gauge.set(total_users)
        total_suppliers_gauge.set(total_suppliers)

if __name__ == '__main__':
    start_http_server(8000)
    while True:
        fetch_data()
        time.sleep(60)
