from flask import Flask, jsonify
from flask.wrappers import Response
import numpy as np
import sqlalchemy
from sqlalchemy import create_engine, func
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
import datetime as dt
from config import password

engine = create_engine(
    f'postgresql://postgres:{password}@localhost:5432/USAccidents_DB')
conn = engine.connect()

base = automap_base()
base.prepare(engine, reflect=True)


USAccidents = base.classes.us_accidents


app = Flask(__name__)


@app.route("/")
def welcome():
    """List of all available api routes"""

    return(
        f"Welcome to the USCarAccidents API for Cities ------<br/>"
        f"--------------------------<br/>"
        f"Available Routes : <br/>"
        f"/api/v1.0/ [Description: <br/>"
        f"/api/v1.0/ [Description:<br/>"
        f"/api/v1.0/ [Description: <br/>"
        f"/api/v1.0/ [Desciption: <br/>"
        f"/api/v1.0/  <br/>"
        f"-----------------------------<br/>"
        f"date format : YYYY-MM-DD"

    )


@app.route("/api/v1.0/-----------")
def functionname():
    session = Session(bind=engine)

    result = session.query().all()

    session.close()

    response = {}

    for row in result:
        response[row.date] = row.prcp

    return jsonify(response)
