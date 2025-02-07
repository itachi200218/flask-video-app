# app.py
import os
import logging
from flask import Flask
from router import setup_routes

# Setup Flask app
app = Flask(__name__, template_folder='templates', static_folder='static')

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Setup routes
setup_routes(app)

if __name__ == "__main__":
    app.run(debug=True)














