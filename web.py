import json
import os
import logging

from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from flask_sslify import SSLify
from flask_oauth import OAuth
from urllib2 import Request, urlopen, URLError
from mongo_agent import MongoAgent

# Initialize logging and setting to INFO level
logging.basicConfig(format='%(asctime)s [%(levelname)s]: %(message)s', level=logging.INFO)

# Google Console API values
GOOGLE_CLIENT_ID = os.environ['GOOGLE_CLIENT_ID']
GOOGLE_CLIENT_SECRET = os.environ['GOOGLE_CLIENT_SECRET']
REDIRECT_URI = '/gCallback'
SECRET_KEY = os.environ['SECRET_KEY']
DEBUG = False

app = Flask(__name__)

#sslify = SSLify(app)
app.secret_key = SECRET_KEY
port = int(os.getenv("PORT"))
app.context = ('server.crt', 'server.key')

# Google OAuth authentication
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

# Mongo agent
mongo = MongoAgent(os.environ['MONGO_CONN'], os.environ['MONGO_DB'])


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
    except URLError as e:
        if e.code == 401:
            # Unauthorized - bad token
            session.pop('access_token', None)
            return redirect(url_for('login'))
        return res.read()

    google_user_info = json.loads(res.read())
    email = google_user_info['email']

    session['email'] = email

    return render_template('index.html', email=email, token=access_token, picture=google_user_info['picture'])


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


@app.route('/get_metrics_data')
def get_metrics_data():
    email = session.get('email')

    data = mongo.get_metrics_data(email)
    return jsonify(metrics=data['metrics_data'])


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=port)
