from dataclasses import dataclass, fields,asdict
import firebase_admin
from firebase import firebase
from dotenv import load_dotenv
import os
from typing import List, Any



@dataclass
class UserProfile:
    username: str
    age : int
    major : list[str]
    minor : list[str]
    skills : list[str] # list of skills (by tag name)
    languages : list[str]
    university: str
    bio: str

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
                    self.user_id = result['name']
                    print(f'{self.user_id} saved to firebase ( USER ID)')
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

    @staticmethod
    def get_attrs(dataclass_type: Any):
        return [field.name for field in fields(dataclass_type)]

    @staticmethod
    def remove_user(user_id):
        path_to_delete = f'/users/{user_id}'  # Example: Deleting a user by their ID

        # Delete the data at the specified path
        load_dotenv()
        db = firebase.FirebaseApplication(os.getenv("FIREBASE_URL"), None)
        result = db.delete(path_to_delete, None)
        return result

    @staticmethod
    def get_by_id(user_id):
        # Define the path for the user
        path = f'/users/{user_id}'

        load_dotenv()
        db = firebase.FirebaseApplication(os.getenv("FIREBASE_URL"), None)
        user_data = db.get(path, None)

        if user_data:
            return user_data
        else:
            return None  # Return None if user not found

    #def get_id(args**):
        #pass

#the @datclass decorator makes a custom __init__ method that allows to define every argument

@dataclass
class TeamMatching(UserProfile):
    cluster_id:int
    # used for ML purposes


