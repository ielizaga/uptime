import pymongo
from pymongo import MongoClient


class MongoAgent:
    """
    This class provides a MongoDB agent used to query data files where user data is stored.
    """

    db = None

    def __init__(self, connection_string, db_name):
        client = MongoClient(connection_string)
        self.db = client[db_name]

    def get_dashboard_data(self, email):
        collection = self.db["dashboard"]
        return collection.find_one({"email": email})

    def get_metrics_data(self, email):
        collection = self.db["metrics"]
        return collection.find_one({"email": email})
