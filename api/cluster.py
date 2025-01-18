# complementary vs similar factors
# years of experience : similar
# programing language : complement
# text bio : similar
# prefered work style : similar
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import KMeans
import numpy as np

X = np.array([[1, 2], [1, 4], [1, 0],
              [10, 2], [10, 4], [10, 0]])

kmeans = KMeans(n_clusters=2, random_state=0, n_init="auto").fit(X)

class Matcher:
    def __init__(self, clusters):
        self.clusters = clusters

