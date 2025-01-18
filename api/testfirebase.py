from firebase import firebase
from time import sleep

firebase = firebase.FirebaseApplication('https://lms-accessibility-tool-default-rtdb.firebaseio.com/', None)

user_data = {
        "username": "JohnDoe",
        "major": "Computer Science",
        "minor": "Biochemistry",
        "skillsets": ["Python", "Machine Learning"],
        "languages": ["English", "Spanish"]
    }


#firebase.post('/users', user_data)
#sleep(3)
users = firebase.get('/users', None)
print(users)