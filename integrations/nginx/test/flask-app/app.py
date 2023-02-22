from random import random
from flask import Flask
from redis import Redis

app = Flask(__name__)
redis = Redis(host='redis', port=6379)


@app.route("/")
def hits():
    if random() < 0.20:
        return "Random error", 500
    h = redis.incr('hits')
    return f"This page has been viewed {h} time(s)"
