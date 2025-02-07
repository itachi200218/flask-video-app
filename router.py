from flask import render_template, request, jsonify
from handlers import process_user_input

# Define routes
def setup_routes(app):
    @app.route("/", methods=["GET", "POST"])
    def index():
        if request.method == "POST":
            try:
                # Parse incoming JSON request
                data = request.get_json()
                if not data or "prompt" not in data:
                    return jsonify({"error": "Invalid request. 'prompt' is required."}), 400
                
                user_input = data["prompt"].strip()
                response = process_user_input(user_input)
                return jsonify(response)
            except Exception as e:
                return jsonify({"error": f"An error occurred: {str(e)}"}), 500
        
        return render_template("index.html")
