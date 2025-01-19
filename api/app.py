from flask import Flask, request, jsonify, send_from_directory, abort
from werkzeug.utils import secure_filename
from profile import UserProfile  # Assuming your dataclass and related methods are in the profile.py file
from dataclasses import fields
import os
from flask_cors import CORS, cross_origin
from cluster import Matcher

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# ADD CORS so that you don;t have to proxy

# Set up static folder path to serve React build files
STATIC_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'client', 'build', 'static')

# Route for adding a user via POST
@app.route('/add_user', methods=['POST'])
def add_user():
    """
    Adds a user to the database using data from a JSON object in the body of the POST request.
    """
    if request.method == 'POST':
        try:
            # Attempt to get JSON data from the request
            request_data = request.get_json()  # Get the JSON body sent in the request
            if not request_data:
                return jsonify({"error": "No JSON data received"}), 400

            # Dynamically map request data to the dataclass fields
            dataclass_fields = {f.name for f in fields(UserProfile)}  # Get the field names from the dataclass
            filtered_data = {key: request_data[key] for key in request_data if key in dataclass_fields}

            if len(filtered_data) != len(dataclass_fields):
                return jsonify({"error": "Missing fields in the request data"}), 400

            # Initialize the UserProfile dataclass with the filtered data
            user_data = UserProfile(**filtered_data)

            # Assuming `save_to_firebase()` is properly implemented in the UserProfile class
            user_data.save_to_firebase()

            return jsonify({"message": "User added successfully"}), 200

        except TypeError as e:
            print(f"Error when initializing user: {e}")
            return jsonify({"error": "Failed to initialize the user profile"}), 500

        except Exception as e:
            print(f"Unexpected error: {e}")
            return jsonify({"error": "Internal Server Error"}), 500

    return jsonify({"error": "Invalid method"}), 405  # If method is not POST


# Route for removing a user - not implemented yet
@app.route('/remove_user/<user_id>', methods=['GET'])
def remove_user(user_id):
    result = UserProfile.remove_user(user_id)
    return {"result of deletion": result}


# Route for getting all users
@cross_origin
@app.route('/get_all', methods=['GET'])
def get_all():
    # Assuming `get_all_users()` is properly implemented in UserProfile
    users = UserProfile.get_all_users()
    return jsonify(users), 200

@app.route('/get_user/<user_id>', methods=['GET'])
def get_user(user_id):
    # Assuming `get_all_users()` is properly implemented in UserProfile
    users = UserProfile.get_by_id(user_id)
    return jsonify(users), 200

# Route for serving static files like images, JS, CSS, etc., from the React build folder
@app.route('/api/<path:route>', methods=['GET'])
def api(route):
    """
    Serves files from the 'client' build folder. Secures the route by sanitizing the filename.
    """
    secure_route = secure_filename(route)  # Sanitize the file path to avoid directory traversal
    file_path = os.path.join(STATIC_FOLDER, secure_route)

    if os.path.exists(file_path):
        return send_from_directory(STATIC_FOLDER, secure_route)
    else:
        abort(404)  # Return 404 if the file is not found

@app.route("/user_attributes", methods=["GET"])
def get_user_attributes():
    return jsonify(UserProfile.get_attrs(UserProfile)), 200

@app.route("/match1/<user_id>", methods=["GET"])
def match_user(user_id):
    k = 4#request.args.get("k")
    return jsonify(Matcher(k, user_id).match()), 200

@app.route("/match2/<user_id>", methods=["GET"])
def match_user(user_id):
    k = 4#request.args.get("k")
    return jsonify(Matcher(k, user_id).metadata_embedder()), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
