import os
from flask import Flask, send_from_path

# Initialize Flask app
# Setting static_folder to 'public' lets Flask find your frontend files
app = Flask(__name__, static_folder='public', static_url_path='')

# Route to serve the main HTML file
@app.route('/')
def index():
    return send_from_path(app.static_folder, 'index.html')

# Route to serve other static assets (like CSS, JS, or images) if they exist
@app.route('/<path:path>')
def serve_static(path):
    return send_from_path(app.static_folder, path)

if __name__ == '__main__':
    # Runs the application locally on http://127.0.0
    app.run(host='127.0.0.1', port=5000, debug=True)