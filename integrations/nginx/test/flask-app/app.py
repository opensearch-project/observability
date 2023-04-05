from random import random, randint
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

@app.route("/dice")
def roll_dice():
    if random() < 0.05:
        return "Random error", 500
    return str(randint(1, 6))
