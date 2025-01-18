from dataclasses import dataclass, fields,asdict
import firebase_admin
from firebase import firebase
from dotenv import load_dotenv
import os



@dataclass
class UserProfile:
    username: str
    age : int
    major : list[str]
    minor : list[str]
    skillsets : list[str] # list of skills (by tag name)
    languages : list[str]
    university: str

    def __post_init__(self):
        # connect to mongoDB
        load_dotenv()
        self.db = firebase.FirebaseApplication(os.getenv("FIREBASE_URL"), None)
        self.user_id = None
    # post init executes after init

    def save_to_firebase(self):
        """ve_to_firebase(self):
        """
        try:
            user_data = asdict(self)  # save user data in a json like format
            if self.user_id:
                # Convert the dataclass instance to a dictionary
                load_dotenv()
                result = self.db.put(f'/{os.getenv("FIREBASE_URL")}/{self.user_id}', '', user_data)
                if result['success']:
                    return True
            else:
                # create a new entry
                result = self.db.post('/users', user_data)
                if result['success']:
                    return True


        except Exception as e:
            print(e)

    @staticmethod
    def get_all_users():
        """
        Retrieves all users from the 'users' directory in Firebase.
        :return: Dictionary of all users or an error message
        """
        try:
            # Retrieve all data under the 'users' directory
            load_dotenv()
            db = firebase.FirebaseApplication(os.getenv("FIREBASE_URL"), None)
            users = db.get(os.getenv("DIR"), None)
            return {"users": users}
        except Exception as e:
            return {"error": str(e)}
#the @datclass decorator makes a custom __init__ method that allows to define every argument

@dataclass
class TeamMatching(UserProfile):
    pass
