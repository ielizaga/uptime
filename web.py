import json
import os
import logging

from flask import Flask, render_template, jsonify, redirect, url_for, session, request
from flask_sslify import SSLify
from flask_oauth import OAuth
from urllib2 import Request, urlopen, URLError
from mongo_agent import MongoAgent

# Initialize logging and setting to INFO level
logging.basicConfig(format='%(asctime)s [%(levelname)s]: %(message)s', level=logging.INFO)

# Environment variables
GOOGLE_CLIENT_ID = os.environ['GOOGLE_CLIENT_ID']
GOOGLE_CLIENT_SECRET = os.environ['GOOGLE_CLIENT_SECRET']
SECRET_KEY = os.environ['SECRET_KEY']
ENVIRONMENT_TYPE = os.environ['ENVIRONMENT_TYPE']
MONGO_DB = os.environ['MONGO_DB']
MONGO_CONN = os.environ['MONGO_CONN']

# Flask app configuration
app = Flask(__name__)
app.secret_key = SECRET_KEY

# Initialize Mongo agent
mongo = MongoAgent(MONGO_CONN, MONGO_DB)

# Google OAuth
REDIRECT_URI = '/gCallback'
oauth = OAuth()
google = oauth.remote_app('google',
                          base_url='https://www.google.com/accounts/',
                          authorize_url='https://accounts.google.com/o/oauth2/auth',
                          request_token_url=None,
                          request_token_params={'scope': 'https://www.googleapis.com/auth/userinfo.email',
                                                'response_type': 'code'},
                          access_token_url='https://accounts.google.com/o/oauth2/token',
                          access_token_method='POST',
                          access_token_params={'grant_type': 'authorization_code'},
                          consumer_key=GOOGLE_CLIENT_ID,
                          consumer_secret=GOOGLE_CLIENT_SECRET)


@app.route("/")
def index():
    access_token = session.get('access_token')
    if access_token is None:
        return redirect(url_for('login'))

    access_token = access_token[0]
    headers = {'Authorization': 'OAuth ' + access_token}
    req = Request('https://www.googleapis.com/oauth2/v1/userinfo', None, headers)
    try:
        res = urlopen(req)
    except URLError:
        # Unauthorized - bad token
        session.pop('access_token', None)
        return redirect(url_for('login'))

    google_user_info = json.loads(res.read())
    email = google_user_info['email']
    name = google_user_info['name']

    session['email'] = email

    if email[-10:] == "pivotal.io":
        return render_template('index.html', email=email, name=name, token=access_token,
                               picture=google_user_info['picture'])
    else:
        return render_template('error.html', email=email)


@app.route('/login')
def login():
    callback = url_for('authorized', _external=True)
    return google.authorize(callback=callback)


@app.route(REDIRECT_URI)
@google.authorized_handler
def authorized(resp):
    access_token = resp['access_token']
    session['access_token'] = access_token, ''
    return redirect(url_for('index'))


@google.tokengetter
def get_access_token():
    return session.get('access_token')


@app.route('/get_user_data')
def get_user_data():
    email = session.get('email')

    data = mongo.get_dashboard_data(email)
    return jsonify(user=data['dash_data'])


@app.route('/get_historical_data')
def get_historical_data():
    email = session.get('email')

    data = mongo.get_historical_data(email)
    return jsonify(historical=data['hist_data'])


@app.route('/get_metrics_data')
def get_metrics_data():
    email = session.get('email')

    data = mongo.get_metrics_data(email)
    return jsonify(metrics=data['metrics_data'])


@app.route('/post_weblink_form_data', methods=['POST'])
def post_weblink_form_data():
    id = request.form['weblink_row_id']
    product_category = request.form['pivotal_products']
    short_heading = request.form['short_heading']
    website_url = request.form['website_url']
    contact_person = request.form['contact_person']
    contact_person_email = request.form['contact_person_email']
    long_description = request.form['long_description']

    if not id:
        result = mongo.add_form_data(
                product_category,
                short_heading,
                website_url,
                contact_person,
                contact_person_email,
                long_description
        )
    else:
        result = mongo.update_form_data(
                id,
                product_category,
                short_heading,
                website_url,
                contact_person,
                contact_person_email,
                long_description
        )

    if result:
        return "success"
    else:
        return "failure"


@app.route('/get_weblink_data')
def get_weblink_data():
    data = {'support_services': [],
            'pivotal_greenplum': [],
            'pivotal_hdb': [],
            'pivotal_gemfire': [],
            'pivotal_cloud_foundry': []}

    for product in data.keys():
        data[product] = mongo.get_weblink_data(product)

    return jsonify(weblinks=data)


@app.route('/get_kbanalytics_data')
def get_kbanalytics_data():
    data = mongo.get_kbanalytics_data()
    return jsonify(kbanalytics=data)


@app.route('/get_trends_data')
def get_trends_data():
    data = mongo.get_trends_data()
    return jsonify(trends=data)


@app.route('/get_kb_data')
def get_kb_data():
    data = mongo.get_kb_data()
    return jsonify(kbdata=data)


@app.route('/get_mykb_data')
def get_mykb_data():
    email = session.get('email')
    data = mongo.get_mykb_data(email)
    return jsonify(mykb=data['mykb_data'])


if __name__ == "__main__":
    # Apply production configuration
    if ENVIRONMENT_TYPE == 'prod':
        SSLify(app)
        port = int(os.getenv("PORT"))
        app.run(host='0.0.0.0', port=port)
    else:
        app.port = int(os.getenv("PORT"))
        app.debug = True
        app.run()
