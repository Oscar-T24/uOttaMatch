from flask import Flask, request
from profile import UserProfile

from flask import Flask, request, jsonify

app = Flask(__name__)
# Initialize Firebase


# for testing go to the "body"tab in postman and send key:value
@app.route('/add_user', methods=['POST'])
def add_user():  # put application's code here
    """
    adds an user to a database given a json object
    """
    key_values = {}
    #data = request.get_json() # get the json parameters
    if request.method == 'POST':
        try:
            request_data = request.form.to_dict()

            # Dynamically map request data to dataclass
            dataclass_fields = {f.name for f in fields(UserProfile)}
            filtered_data = {key: request_data[key] for key in request_data if key in dataclass_fields}

            # Initialize dataclass
            user_data = UserProfile(**filtered_data)
        except TypeError as e:
            print("error when initializing the class : incomplete informations ",e)

        return "received your request"
    if request.method == 'GET':

        return "GET method not supported"

@app.route('/remove_user', methods=['POST'])
def remove_user():
    return "method not implemented yet"

if __name__ == '__main__':
    app.run()
