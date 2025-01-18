from dataclasses import dataclass, fields,asdict
import firebase_admin
from firebase_admin import credentials, db


@dataclass
class UserProfile:
    username: str
    age : int
    major : list[str]
    minor : list[str]
    skillsets : list[str] # list of skills (by tag name)
    languages : list[str]

    def __init__(self):
        # connect to mongoDB
        cred = credentials.Certificate("firebase_service_account.json")
        firebase_admin.initialize_app(cred, {
            "databaseURL": "https://your-database-url.firebaseio.com/"  # Replace with your database URL
        })

    def save_to_firebase(self):
        """
        Saves the current dataclass instance to Firebase Realtime Database.
        """
        try:
            # Convert the dataclass instance to a dictionary
            user_data = asdict(self)

            # Get a reference to the "users" node in Firebase
            users_ref = db.reference("users")

            # Push the data to Firebase and return the new user's key
            new_user_ref = users_ref.push(user_data)
            return {"message": "User added successfully", "user_id": new_user_ref.key}
        except Exception as e:
            return {"error": str(e)}
#the @datclass decorator makes a custom __init__ method that allows to define every argument
