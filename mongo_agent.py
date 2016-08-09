from pymongo import MongoClient
import bson

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

    def add_form_data(self, product_category, short_heading, web_url, contact_person, email, long_description):
        """
        Add the weblink data from the form entered by the user to the database
        """
        collection = self.db["weblinks"]
        collection.insert_one({
            "product_category" : product_category,
            "short_heading": short_heading,
            "web_url": web_url,
            "contact_person": contact_person,
            "email": email,
            "long_description": long_description
        })
        return True

    def update_form_data(self, id, product_category, short_heading, web_url, contact_person, email, long_description):
        """
        Update the weblink data from the form entered by the user to the database
        """
        collection = self.db["weblinks"]
        collection.update_one({
            "_id": bson.ObjectId(id)}, {
            '$set': {
                "product_category": product_category,
                "short_heading": short_heading,
                "web_url": web_url,
                "contact_person": contact_person,
                "email": email,
                "long_description": long_description
            }
        }, upsert=False)
        return True


    def get_weblink_data(self, component):
        """
        Retrieves the metrics data from the metrics collection in the database
        :param email: user email whose data will be returned
        :return:
        """

        links = []
        collection = self.db["weblinks"]
        data = collection.find({"product_category": component})
        for link in data:
            link['_id'] = str(link['_id'])
            links.append(link)
        return links
