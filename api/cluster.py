from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from dotenv import load_dotenv
from firebase import firebase
import os
from pinecone import Pinecone, ServerlessSpec
from profile import UserProfile


class Matcher:
    def __init__(self, k, user_id):
        """
        Initialize the matcher with dynamic dimensionality based on available features

        :param k: size of the cluster
        :param user_id: identifier for the current user
        """
        load_dotenv()
        self.k = k
        self.db = firebase.FirebaseApplication(os.getenv("FIREBASE_URL"), None)
        self.users_data = self.db.get('/users', None)
        self.user_id = user_id
        self.clusters = len(self.users_data) // k

        # Calculate the total dimension based on feature vectors
        self.dimension = self._calculate_total_dimension()

        pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

        # Check if index exists and has correct dimension
        existing_indexes = pc.list_indexes()
        if 'user-vectors' not in existing_indexes:
            pc.create_index(
                name='user-vectors',
                dimension=self.dimension,
                spec=ServerlessSpec(cloud='aws', region='us-east-1')
            )
        else:
            # Verify dimension of existing index
            index_info = pc.describe_index('user-vectors')
            if index_info.dimension != self.dimension:
                # Handle dimension mismatch
                print(
                    f"Warning: Index dimension ({index_info.dimension}) does not match required dimension ({self.dimension})")
                # Optionally: Delete and recreate index with new dimension
                # pc.delete_index('user-vectors')
                # pc.create_index(...)

        self.index = pc.Index('user-vectors')

    def _calculate_total_dimension(self):
        """
        Calculate the total dimension needed based on all features
        """
        # Get dimension from languages
        unique_languages = len(self._get_unique_languages())
        print("UNIQUE ")

        # Add dimensions for other features you might want to include
        # For example:
        # skills_dimension = len(self._get_unique_skills())
        # projects_dimension = len(self._get_unique_projects())
        # etc.

        # Total dimension is sum of all feature dimensions
        total_dimension = unique_languages  # + skills_dimension + projects_dimension + etc.

        return total_dimension

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

        user_data = self.db.get(f'/users/{self.user_id}', None)
        if user_data and "languages" in user_data:
            user_languages = set(user_data["languages"])
            binary_vector = [1.0 if language in user_languages else 0.0 for language in unique_languages]
            binary_matrix = np.array(binary_vector)

            # Verify vector dimension matches index dimension
            if len(binary_matrix) != self.dimension:
                padding = np.zeros(self.dimension - len(binary_matrix))
                binary_matrix = np.concatenate([binary_matrix, padding])

            return unique_languages, binary_matrix

        return None, None

    def match(self):
        """
        Compare the current vector with other vectors and return the most similar users based on cosine similarity.
        """
        proximity_scores = []

        # Fetch the vector for the current user
        current_user_vector = self.index.fetch([self.user_id])[self.user_id][
            'values']  # Assuming 'values' holds the vector

        # Compare the current user's vector with other users' vectors
        for user in self.users_data:
            # Fetch the vector for the other user
            other_user_vector = self.index.fetch([user])[user]['values']  # Assuming 'values' holds the vector

            # Calculate cosine similarity between current and other user's vector
            score = cosine_similarity([current_user_vector], [other_user_vector])[0][0]

            # Append a tuple of (score, user_id)
            proximity_scores.append((score, user))

        # Sort by score in descending order (most similar first) and return the top k
        return sorted(proximity_scores, key=lambda k: k[0], reverse=True)[:self.k]

    def add_vector(self):
        # Ensure you vectorize the current user's languages and store them in Pinecone
        if not self.vectorize_languages():
            return
        _, user_vector = self.vectorize_languages()

        # Upsert the vector
        self.index.upsert([(self.user_id, user_vector)])

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


if __name__ == "__main__":
    for user in UserProfile.get_all_users():
        Matcher(2, user).add_vector()
    #match = Matcher(3,username="oscar", age=4, major="", minor="", skillsets="", languages=["python","java"], university="",bio="")
