from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from dotenv import load_dotenv
from firebase import firebase
import os
from pinecone import Pinecone, ServerlessSpec
from profile import UserProfile
import pinecone
from gensim.models import Word2Vec
from gensim.utils import simple_preprocess
import numpy as np


class Matcher:
    def __init__(self, k, user_id,dimension=20):
        """
        Initialize the matcher with dynamic dimensionality based on available features

        :param k: size of the cluster
        :param user_id: identifier for the current user
        """
        load_dotenv()
        self.k = k
        self.dimension=dimension
        self.db = firebase.FirebaseApplication(os.getenv("FIREBASE_URL"), None)
        self.users_data = self.db.get('/users', None)
        self.user_id = user_id
        self.clusters = len(self.users_data) // k

        # Calculate the total dimension based on feature vectors

        pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

        # Check if index exists and has correct dimension
        existing_indexes = pc.list_indexes()
        try:
                pc.create_index(
                    name='user-vectors',
                    dimension=self.dimension,
                    spec=ServerlessSpec(cloud='aws', region='us-east-1')
                )
        except pinecone.core.openapi.shared.exceptions.PineconeApiException:
                print("Error creating index : index might already exist")

            # Verify dimension of existing index
        index_info = pc.describe_index('user-vectors')
        if index_info.dimension != self.dimension:
                # Handle dimension mismatch
                print(
                    f"Warning: Index dimension ({index_info.dimension}) does not match required dimension ({self.dimension})")

                print("Deleting the actual index and creating a new one")
                pc.delete_index("user-vectors")
                pc.create_index(
                    name='user-vectors',
                    dimension=self.dimension,
                    spec=ServerlessSpec(cloud='aws', region='us-east-1')
                )
                # Optionally: Delete and recreate index with new dimension
                # pc.delete_index('user-vectors')
                # pc.create_index(...)

        self.index = pc.Index('user-vectors')

    def _tofill(self):
        """
        Calculate the total dimension needed based on all features
        """
        # Get dimension from languages
        unique_languages = len(self._get_unique_languages())

        print("UNIQUE LANGUAGES",self._get_unique_languages())

        return self.dimension - unique_languages # dimensions to "fill up"

    def _get_unique_languages(self):
        """Helper method to get all unique programming languages"""
        return sorted({
            language
            for user in self.users_data
            for language in self.db.get(f'/users/{user}', None).get("languages", [])
        })

    def vectorize_languages(self):
        """
        Computes column vector based on programming languages with dynamic dimensionality
        """
        unique_languages = self._get_unique_languages()

        user_data = self.db.get(f'/users/{self.user_id}', None) #get attributes of the user

        try:
            user_languages = set(user_data["languages"]) #remove duplicates
            binary_vector = [1.0 if language in user_languages else 0.0 for language in unique_languages]
            remaining_dims = self._tofill()
            for _ in range(remaining_dims):
                binary_vector.extend([0.0])
            # fill up the remaining dimensions
            binary_matrix = np.array(binary_vector)

            return unique_languages, binary_matrix
        except KeyError:
            print("Error retrieving user data language ! Skipping current entry")
            binary_vector = []
            for _ in range(self.dimension):
                binary_vector.extend([0.0])
            return None, binary_vector


    def match(self):
        #TODO
        pass

    def add_vector(self):
        # Ensure you vectorize the current user's languages and store them in Pinecone
        #if not self.vectorize_languages():
           # return
        _, user_vector = self.vectorize_languages()

        # Upsert the vector
        self.index.upsert([(self.user_id, user_vector)])

        print("Added vector")

    def _print_vectors(self):
        try:
            # Fetch all vectors; the `fetch` method is used to retrieve vectors by their IDs
            query_response = self.index.fetch(ids=None)  # `None` means you want to get all vectors in the index

            # Print all vectors
            for vector_id, vector_data in query_response.items():
                print(f"Vector ID: {vector_id}")
                print(f"Vector: {vector_data['values']}")  # Adjust if the structure differs
                print('-' * 40)

        except Exception as e:
            print(f"Error fetching vectors: {e}")

    def match(self):
        """matches people with cosine similarity"""

        for user in UserProfile.get_all_users()["users"]:
            try:
                existing_vector = self.index.fetch([self.user_id])

                if self.user_id in existing_vector:
                    print(f"User {self.user_id} already exists in the database.")
                    # User is already in the database, no need to add again
                else:
                    print("Adding user : ", user)
                    Matcher(self.k, user).add_vector()
            except KeyError:
                # If the user is not found in the index, a KeyError will be raised
                # or the vector won't exist, so we can proceed to add the user
                print("Adding user : ", user)
                Matcher(self.k, user).add_vector()

        proximity_scores = []
        # since the user doesn't

        current_user_vector = self.index.fetch([self.user_id])['vectors'][self.user_id]['values']

        for user in self.users_data:

            try:
                other_user_vector = self.index.fetch([user])['vectors'][self.user_id]['values']
                print("vector got", other_user_vector, "vector of reference", current_user_vector)
            except:
                print("Error fetching other user's vector, printing original values",self.index.fetch([user]))



            score = cosine_similarity([current_user_vector], [other_user_vector])[0][0]

            proximity_scores.append((score, user))

        return sorted(proximity_scores, key=lambda k: k[0], reverse=False)[:self.k]

        # we reverse once because of the range from -1 to 1, but ALSO reverse a second time because the programing languages should be complementary

    def preprocess_text(text):
        return simple_preprocess(text, deacc=True)  # Tokenize and remove punctuation

    def _get_average_vector(tokens, model, vector_size):
        valid_tokens = [token for token in tokens if token in model.wv]
        if not valid_tokens:
            return np.zeros(vector_size)  # Return a zero vector if no valid tokens
        # Compute the mean of the word vectors
        return np.mean([model.wv[token] for token in valid_tokens], axis=0)

    def metadata_embedder(self):

        score = 0

        weights = {
            "age": 0.5,
            "university": 0.5,
            "bio":0.8,
        }
        current_user_age = int(self.db.get(f'/users/{self.user_id}', None).get("age", []))
        current_user_bio = self.db.get(f'/users/{self.user_id}', None).get("bio", [])
        proximity_scores = {}
        for user in self.users_data:
            age_diff = abs(current_user_age - int(self.db.get(f'/users/{user}', None).get("age", [])))
            proximity_scores[user] += weights['age'] * (1 - min(age_diff / 10, 1))  # Normalize by 10 years

            tokens_bio1,tokens_bio2 = self.preprocess_text(current_user_bio),self.preprocess_text(self.db.get(f'/users/{user}', None).get("bio", []))
            all_tokens = [tokens_bio1,tokens_bio2]

            model = Word2Vec(sentences=all_tokens, vector_size=100, window=5, min_count=1, workers=4)

            vector_bio1 = self._get_average_vector(tokens_bio1, model, model.vector_size)
            vector_bio2 = self._get_average_vector(tokens_bio2, model, model.vector_size)

            # Compute the cosine similarity between the two vectors
            similarity_score = cosine_similarity([vector_bio1], [vector_bio2])[0][0]

            proximity_scores[user] += weights['bio'] * similarity_score

        return sorted(proximity_scores,key=lambda k: k[1], reverse=False)[:self.k]





if __name__ == "__main__":
    to_propose = "-OGvh-9y-Rksw6LWMPQZ" #UserProfile.get_all_users()["users"]
    print(Matcher(2, to_propose).match())
    #match = Matcher(3,username="oscar", age=4, major="", minor="", skillsets="", languages=["python","java"], university="",bio="")
