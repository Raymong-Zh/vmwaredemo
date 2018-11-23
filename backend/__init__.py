import os

from flask import Flask
from flask import request
import json



def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/', methods= ['POST'])
    def hello():
        content = request.json
        ll = []
        ll.append(content)
        ll.append(content)
        content1 = json.dumps(ll)
        #for key in content:
        #   print("key is %s, value is %s " % (key,content.get(key)))
        
        return content1

    @app.route('/', methods= ['GET'])
    def hello2():
        return 'hello world!'


    @app.route('/create', methods= ['POST'])
    def create():
        content = request.json
        content1 = json.dumps(content)
        for key in content:
           print("key is %s, value is %s " % (key,content.get(key)))
        
        return content1
    
    return app