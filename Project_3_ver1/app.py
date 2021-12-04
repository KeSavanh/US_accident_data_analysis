from flask import Flask, jsonify, render_template, request
from flask.wrappers import Response
# import numpy as np
import sqlalchemy
from sqlalchemy import create_engine, func, or_
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, session
import datetime as dt
import json
from sqlalchemy.sql.expression import null



##############################################################
#### Connection to Database                             ######
##############################################################
engine = create_engine('sqlite:///us_accidents.db', echo=False)
conn = engine.connect()

base = automap_base()
base.prepare(engine, reflect=True)

USAccidents = base.classes.us_accidents
USWeather = base.classes.us_weather

app = Flask(__name__)



##############################################################
#### Routes for rendering pages                         ######
##############################################################
# -------------------------------------------------------------------------------------------------------------------------
# Landing page

@app.route("/")
def welcome():
    return render_template('index.html')

# -------------------------------------------------------------------------------------------------------------------------
# General Analysis page

@app.route("/general")
def generalvis():
    return render_template('general.html')

# -------------------------------------------------------------------------------------------------------------------------
# City Analysis page

@app.route("/city-vis")
def cityvis():
    return render_template('city.html')

# ------------------------------------------------------------------------------------------------------------------------
# About Us

@app.route("/aboutus")
def aboutusvis():
    return render_template('aboutus.html')


##############################################################
#### Routes for APIs (json)                             ######
##############################################################

# --------------------------------------------------------------------------------------------------------------------
# query for yearwise results of accidents and lerafletplot # MAP

@app.route("/year/data")

def yearlyaccidents():
    # read query parans
    args = request.args
    year = args["year"]
    city = args["city"]

    session = Session(bind=engine)

    sel = (USAccidents.Year, USAccidents.City, USAccidents.State, USAccidents.Street, USAccidents.Start_Lat, USAccidents.Start_Lng,
           USAccidents.Severity, USAccidents.Weather_Condition, USAccidents.Accident_id)

    if (year and city):
        results = session.query(
            *sel).filter(USAccidents.Year == year, USAccidents.City == city).all()
    else:
        results = session.query(*sel).all()

    session.close()

    response = []

    for item in results:
        response.append(
            {"year": item[0],
                "city": item[1],
                "state": item[2],
                "street": item[3],
                "lat": item[4],
                "lng": item[5],
                "severity": item[6],
                "weather_condition": item[7],
                "accident_id": item[8]
             }
        )
    return jsonify(response)


# --------------------------------------------------------------------------------------------------------------------
# query for accidents count city and year wise

@app.route("/city/data")

def city_accidentcount():

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

# ------------------------------------------------------------------------------------------------
# query for monthlyplot with time in 4 cities

@app.route("/monthly/data")

def monthlydata():
    session = Session(bind=engine)
    results = session.query(USAccidents.City, func.count(USAccidents.City), func.strftime("%Y-%m", USAccidents.StartDate)).\
        group_by(USAccidents.City, func.strftime(
            "%Y-%m", USAccidents.StartDate)).all()
    session.close()

    response = []

    for item in results:
        response.append(
            {"city": item[0],
             "accidents_count": item[1],
             "year_month": item[2]}
        )
    return jsonify(response)

# ---------------------------------------------------------------------------------------------------------------------------
# query for weekly plot with time in 4 cities

@app.route("/weekly/data")

def weekly_count():
    session = Session(bind=engine)
    results = session.query(USAccidents.City, func.count(USAccidents.Accident_id), func.strftime("%w", USAccidents.Start_Time)).\
        group_by(USAccidents.City, func.strftime(
            "%w", USAccidents.Start_Time)).all()
    session.close()

    response = []
    for item in results:
        response.append(
            {
                "city": item[0],
                "accidents_count": item[1],
                "weekday": item[2]
            }
        )
    return jsonify(response)

# -----------------------------------------------------------------------------------------------------------
# query fort hourly data plot

@app.route("/hourly/data")

def hourly_count():
    session = Session(bind=engine)
    results = session.query(USAccidents.City, func.count(USAccidents.Accident_id), func.strftime("%H", USAccidents.Start_Time)).\
        group_by(USAccidents.City, func.strftime(
            "%H", USAccidents.Start_Time)).all()
    session.close()

    response = []
    for item in results:
        response.append(
            {
                "city": item[0],
                "accidents_count": item[1],
                "hour": item[2]
            }
        )
    return jsonify(response)

# -------------------------------------------------------------------------------------------------------------------
# query for severity wise accidents counts

@app.route("/severity/data")
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

# ---------------------------------------------------------------------------------------------------------------------
# query to find relation among precipitation, windspeed, severity

@app.route("/prcp-wsp/data")
def prcp_wsp():
    session = Session(bind=engine)
    results = session.query(USWeather.Precipitation,
                            USWeather.Wind_Speed, USWeather.Severity).all()
    session.close()

    response = []
    for item in results:
        response.append(
            {
                "precipitation": item[0],
                "wind_speed": item[1],
                "severity": item[2]
            }
        )
    return jsonify(response)

# -------------------------------------------------------------------------------------------------------------------
# query for weatherconditionwise accidents counts

@app.route("/weather/data")
def weather():
    session = Session(bind=engine)
    results = session.query(USAccidents.Weather_Condition, USAccidents.Year, USAccidents.City, func.count(
        USAccidents.Year)).group_by(USAccidents.Year, USAccidents.City, USAccidents.Weather_Condition).order_by(func.count(
        USAccidents.Year).desc()).limit(30).all()
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

# ----------------------------------------------------------------------------------------------------------------------
# query for accidents count due to different road conditions in two years

@app.route("/roadcondition/data")
def roadcondition():
    response = []
    session = Session(bind=engine)
    Bump_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
        USAccidents.Year).filter(USAccidents.Bump == True).all()
    response += formulateResponse(Bump_accidents, "Bump Accidents")

    Junction_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
        USAccidents.Year).filter(USAccidents.Junction == True).all()
    response += formulateResponse(
        Junction_accidents, "Junction Accidents")

    No_Exit_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
        USAccidents.Year).filter(USAccidents.No_Exit == True).all()
    response += formulateResponse(No_Exit_accidents, "No Exit Accidents")

    Railway_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
        USAccidents.Year).filter(USAccidents.Railway == True).all()
    response += formulateResponse(Railway_accidents, "Railway Accidents")

    Station_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
        USAccidents.Year).filter(USAccidents.Station == True).all()
    response += formulateResponse(Station_accidents, "Station Accidents")
    Stop_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
        USAccidents.Year).filter(USAccidents.Stop == True).all()
    response += formulateResponse(Stop_accidents, "Railway Accidents")
    Traffic_Calming_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
        USAccidents.Year).filter(USAccidents.Traffic_Calming == True).all()
    response += formulateResponse(Traffic_Calming_accidents,
                                  "Traffic Calming Accidents")
    Traffic_Signal_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
        USAccidents.Year).filter(USAccidents.Traffic_Signal == True).all()
    response += formulateResponse(Traffic_Signal_accidents,
                                  "Traffic Signal Accidents")
    session.close()

    return jsonify(response)


def formulateResponse(accidentList, type):
    response = []
    for accidents in accidentList:
        response.append({
            "year": accidents[0],
            "no": accidents[1],
            "cause": type
        })
    return response


if __name__ == "__main__":
    app.run(debug=True)
############################# end ##############