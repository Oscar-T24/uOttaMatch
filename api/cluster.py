# complementary vs similar factors
# years of experience : similar
# programing language : complement
# text bio : similar
# prefered work style : similar
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import KMeans
import numpy as np
from dotenv import load_dotenv
from firebase import firebase
import os
import requests
import json
from profile import UserProfile
import pinecone

#kmeans = KMeans(n_clusters=2, random_state=0, n_init="auto").fit(X)

class Matcher(UserProfile):

    user_id : str
    cluster_id :str

    def __init__(self,k):
        """
        :param k: size of the cluster
        """
        load_dotenv()
        self.k = k
        self.db = firebase.FirebaseApplication(os.getenv("FIREBASE_URL"), None)
        self.users_data = self.db.get('/users', None)
        self.clusters = len(self.users_data) / k # determine how many clusters there should be
        pinecone.init(api_key=os.getenv("PINECONE_API"), environment='us-west1-gcp')
        if 'user-vectors' not in pinecone.list_indexes():
            pinecone.create_index('user-vectors', dimension=128)
        self.index = pinecone.Index('user-vectors')

    def vectorize_languages(self):
        # Step 1: Get all unique programming languages
        unique_languages = sorted({
            language
            for user in self.users_data
            for language in self.db.get(f'/users/{user}', None).get("languages", [])
        })

        # Step 2: Create a binary matrix
        binary_matrix = []
        for user in self.users_data:
            user_data = self.db.get(f'/users/{user}', None)
            if user_data and "languages" in user_data:
                # Generate a binary vector for this user
                user_languages = set(user_data["languages"])
                binary_vector = [1 if language in user_languages else 0 for language in unique_languages]
                binary_matrix.append(binary_vector)

        binary_matrix = np.array(binary_matrix)
        binary_matrix = binary_matrix.T

        return unique_languages, binary_matrix

    def match(self,query_vector):
        """
        compares the current vector with other vectors
        """
        unique_languages, binary_matrix = self.vectorize()

        proximity_scores = []

        for i in range(binary_matrix.shape[1]):
            user_vector = binary_matrix[:, i]  # Get user column (vector)

            # Compute the cosine similarity between the query vector and the user vector
            similarity = cosine_similarity(query_vector, user_vector)

            # Compute the proximity score (invert the cosine similarity)
            proximity_score = 1 - similarity  # The more different the vectors, the better
            proximity_scores.append(proximity_score)

        return proximity_scores

    @staticmethod
    def cosine_similarity(A,B):
        # Compute the dot product
        dot_product = np.dot(A.T, B)

        # Compute the cosine similarity
        return dot_product / (np.linalg.norm(A) * np.linalg.norm(B))

    def add_vector(self):
        index.upsert([(self.user_id, vector)])

if __name__ == "__main__":
    match = Matcher(3)
    match.vectorize()





