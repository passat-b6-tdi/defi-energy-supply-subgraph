# Use the official Grafana image as the base
FROM grafana/grafana

# Expose Grafana's default port
EXPOSE 3000

# Optionally, you can copy custom configuration (like datasources, dashboards) into the container.
# For example, if you have a custom configuration file:
# COPY /path/to/custom-grafana-config.ini /etc/grafana/grafana.ini

# You can add more customization here if necessary

# Start Grafana
CMD ["/run.sh"]
