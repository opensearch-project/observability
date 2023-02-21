from random import randint
from flask import Flask
from redis import Redis

app = Flask(__name__)
redis = Redis(host='redis', port=6379)


@app.route("/")
def hits():
    h = redis.incr('hits')
    return f"This page has been viewed {h} time(s)"
