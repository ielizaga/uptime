from pymongo import MongoClient


class MongoAgent:

    db = None

    def __init__(self, connection_string, db_name):
        """
        This class provides a MongoDB agent used to query data files where user data is stored
        :param connection_string: Connection details of the MongoDB database
        :param db_name: Database name
        """
        client = MongoClient(connection_string)
        self.db = client[db_name]

    def get_dashboard_data(self, email):
        """
        Retrieves the dashboard data from the dashboard collection in the database
        :param email: user email whose data will be returned
        :return:
        """
        collection = self.db["dashboard"]
        return collection.find_one({"email": email})

    def get_metrics_data(self, email):
        """
        Retrieves the metrics data from the metrics collection in the database
        :param email: user email whose data will be returned
        :return:
        """
        collection = self.db["metrics"]
        return collection.find_one({"email": email})
