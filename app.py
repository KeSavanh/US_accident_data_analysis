from flask import Flask, jsonify
from flask.wrappers import Response
import numpy as np
import sqlalchemy
from sqlalchemy import create_engine, func, or_
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, session
import datetime as dt
from config import password


engine = create_engine('sqlite:///us_accidents.db', echo=False)
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
        f"Available Routes :  <br/>"
        f"/api/v1.0/year            [Description: <br/>"
        f"/api/v1.0/start/end       [Description:<br/>"
        f"/api/v1.0/severity        [Description: <br/>"
        f"/api/v1.0/cityaccidents         [Desciption: <br/>"
        f"/api/v1.0/weather              <br/>"
        f"/api/v1.0/roadcondition             <br/>"
        f"-----------------------------<br/>"
        f"date format : YYYY-MM-DD"

    )


@app.route("/api/v1.0/<year>")
# query for yearwise results of accidents and lerafletplot
def yearlyaccidents(year):
    session = Session(bind=engine)

    sel = (USAccidents.City, USAccidents.State, USAccidents.Start_Lat, USAccidents.Start_Lng,
           USAccidents.Severity, USAccidents.Weather_Condition)
    results = session.query(*sel).filter(USAccidents.Year == year).all()

    session.close()

    response = []

    for item in results:
        response.append(
            {
                "city": item[0],
                "state": item[1],
                "lat": item[2],
                "lng": item[3],
                "serety": item[4],
                "weather_condition": item[5]
            }
        )

    return jsonify(response)


@app.route("/api/v1.0/<start>/<end>")
# query for accidents count citywise in a time range
def city_accidentcount_in_given_time(start, end):
    start_date = dt.datetime.strptime(start, '%Y-%m-%d').date()
    end_date = dt.datetime.strptime(end, '%Y-%m-%d').date()

    session = Session(bind=engine)
    results = session.query(USAccidents.City, func.count(USAccidents.Accident_id)).group_by(USAccidents.City).\
        filter(USAccidents.StartDate >= start_date).filter(
            USAccidents.StartDate <= end).all()

    session.close()

    response = []

    for item in results:
        response.append(
            {"city": item[0],
             "accidents_count": item[1]}

        )

    return jsonify(response)


@app.route("/api/v1.0/severity")
# query for severitywise accidents counts
def accidentcount_severity():

    session = Session(bind=engine)
    results = session.query(USAccidents.Severity, func.count(USAccidents.Severity)).group_by(
        USAccidents.Severity).order_by(USAccidents.Severity).all()
    session.close()
    response = []
    for item in results:
        response.append(
            {
                "severity": item[0],
                "accidents_count": item[1]
            }
        )
    return jsonify(response)


@app.route("/api/v1.0/cityaccidents")
# query for citywise accidents in each year
def cityaccidents():
    session = Session(bind=engine)
    results = session.query(USAccidents.Year, func.count(
        USAccidents.Year), USAccidents.City).group_by(USAccidents.Year, USAccidents.City).all()
    session.close()
    response = []
    for item in results:
        response.append(
            {
                "year": item[0],
                "accidents_count": item[1],
                "city": item[2]
            }
        )

    return jsonify(response)


@app.route("/api/v1.0/weather")
# query for citywise accidents in different weather condition
def weather():
    session = Session(bind=engine)
    results = session.query(USAccidents.Weather_Condition, USAccidents.Year, USAccidents.City, func.count(
        USAccidents.Year)).group_by(USAccidents.Year, USAccidents.City, USAccidents.Weather_Condition).limit(10).all()
    session.close()

    response = []
    for item in results:
        response.append(
            {"weather": item[0],
                "year": item[1],
                "city": item[2],
                "accidents_count": item[3]
             }
        )
    return jsonify(response)


@app.route("/api/v1.0/roadcondition")
# query for accidents count due to different road conditions in two years
def roadcondition():
    session = Session(bind=engine)
    Bump_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
        USAccidents.Year).filter(USAccidents.Bump == True).all()
    Junction_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
        USAccidents.Year).filter(USAccidents.Junction == True).all()
    No_Exit_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
        USAccidents.Year).filter(USAccidents.No_Exit == True).all()
    Railway_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
        USAccidents.Year).filter(USAccidents.Railway == True).all()
    Station_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
        USAccidents.Year).filter(USAccidents.Station == True).all()
    Stop_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
        USAccidents.Year).filter(USAccidents.Stop == True).all()
    Traffic_Calming_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
        USAccidents.Year).filter(USAccidents.Traffic_Calming == True).all()
    Traffic_Signal_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
        USAccidents.Year).filter(USAccidents.Traffic_Signal == True).all()
    session.close()

    results = {"Bump_accidents": Bump_accidents,
               "Junction_accidents": Junction_accidents,
               "No_Exit_accidents": No_Exit_accidents,
               "Railway_accidents": Railway_accidents,
               "Station_accidents": Station_accidents,
               "Stop_accidents": Stop_accidents,
               "Traffic_Calming_accidents": Traffic_Calming_accidents,
               "Traffic_Signal_accidents": Traffic_Signal_accidents}

    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True)