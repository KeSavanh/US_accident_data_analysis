from flask import Flask, jsonify, render_template, request
from flask.wrappers import Response
import numpy as np
import sqlalchemy
from sqlalchemy import create_engine, func, or_
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, session
import datetime as dt
import json
from json2html import *
from sqlalchemy.sql.expression import null


engine = create_engine('sqlite:///us_accidents.db', echo=False)
conn = engine.connect()

base = automap_base()
base.prepare(engine, reflect=True)


USAccidents = base.classes.us_accidents


app = Flask(__name__)

# ------------------------------------------------------------------------------------------------------------


@app.route("/")
def welcome():
    return render_template('home.html')

# ------------------------------------------------------------------------------------------------------------

# -------------------------------------------------------------------------------------------------------------


@app.route("/year/data")
# query for yearwise results of accidents and lerafletplot
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
# route for showing map


@app.route("/year-datavis")
def yearlyvis():
    return render_template('index1.html')

# ---------------------------------------------------------------------------------------------------------------------


# ----------------------------------------------------------------------------------------------------------------------
# query for accidents count citywise in a time range
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

# query for monthlylineplot with time in 4 cities


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
             "year-month": item[2]}
        )
    return jsonify(response)
# ---------------------------------------------------------------------------------------------------------------------------

# query for weekly lineplot with time in 4 cities


# @app.route("/weekly/data")


# @app.route("/api/v1.0/severity")
# # query for severitywise accidents counts
# def accidentcount_severity():

#     session = Session(bind=engine)
#     results = session.query(USAccidents.Severity, func.count(USAccidents.Severity)).group_by(
#         USAccidents.Severity).order_by(USAccidents.Severity).all()
#     session.close()
#     response = []
#     for item in results:
#         response.append(
#             {
#                 "severity": item[0],
#                 "accidents_count": item[1]
#             }
#         )
#     # Serializing json
#     json_object = json.dumps(response, indent=2)

#     # making html string from json object
#     table3html = json2html.convert(json=json_object)

#     # Writing to sample3.json
#     with open("querydata/sample3.json", "w") as f:
#         f.write(json_object)

#     # query to find relatio among precipitation, windspeed, severity
#     session = Session(bind=engine)
#     results = session.query(USAccidents.Precipitation,
#                             USAccidents.Wind_Speed, USAccidents.Severity).all()
#     session.close()

#     response = []
#     for item in results:
#         response.append(
#             {
#                 "precipitation": item[0],
#                 "wind_speed": item[1],
#                 "severity": item[2]
#             }
#         )
#     # Serializing json
#     json_object = json.dumps(response, indent=2)

#     # Writing to sample8.json
#     with open("querydata/sample8.json", "w") as f:
#         f.write(json_object)

#     return render_template('index3.html', table3=table3html)


# @app.route("/api/v1.0/cityaccidents")
# # query for citywise accidents in each year
# def cityaccidents():
#     session = Session(bind=engine)
#     results = session.query(USAccidents.Year, func.count(
#         USAccidents.Year), USAccidents.City).group_by(USAccidents.Year, USAccidents.City).all()
#     session.close()
#     response = []
#     for item in results:
#         response.append(
#             {
#                 "year": item[0],
#                 "accidents_count": item[1],
#                 "city": item[2]
#             }
#         )
#     # Serializing json
#     json_object = json.dumps(response, indent=2)

#     # making html string from json object
#     table4html = json2html.convert(json=json_object)

#     # Writing to sample4.json
#     with open("querydata/sample4.json", "w") as f:
#         f.write(json_object)

#     # query for hourly accidents count in each city
#     session = Session(bind=engine)
#     results = session.query(USAccidents.City, func.count(USAccidents.Accident_id), func.strftime("%H", USAccidents.Start_Time)).\
#         group_by(USAccidents.City, func.strftime(
#             "%H", USAccidents.Start_Time)).all()
#     session.close()

#     response = []
#     for item in results:
#         response.append(
#             {
#                 "city": item[0],
#                 "accidents_count": item[1],
#                 "hour": item[2]
#             }
#         )
#     # Serializing json
#     json_object = json.dumps(response, indent=2)

#     # Writing to sample9.json
#     with open("querydata/sample9.json", "w") as f:
#         f.write(json_object)

#     # query for weekdaywise accidents count in each city
#     session = Session(bind=engine)
#     results = session.query(USAccidents.City, func.count(USAccidents.Accident_id), func.strftime("%w", USAccidents.Start_Time)).\
#         group_by(USAccidents.City, func.strftime(
#             "%w", USAccidents.Start_Time)).all()
#     session.close()

#     response = []
#     for item in results:
#         response.append(
#             {
#                 "city": item[0],
#                 "accidents_count": item[1],
#                 "weekday": item[2]
#             }
#         )
#     # Serializing json
#     json_object = json.dumps(response, indent=2)

#     # Writing to sample9.json
#     with open("querydata/sample10.json", "w") as f:
#         f.write(json_object)

#     return render_template('index4.html', table4=table4html)


# @app.route("/api/v1.0/weather")
# # query for citywise accidents in different weather condition
# def weather():
#     session = Session(bind=engine)
#     results = session.query(USAccidents.Weather_Condition, USAccidents.Year, USAccidents.City, func.count(
#         USAccidents.Year)).group_by(USAccidents.Year, USAccidents.City, USAccidents.Weather_Condition).all()
#     session.close()

#     response = []
#     for item in results:
#         response.append(
#             {"weather": item[0],
#                 "year": item[1],
#                 "city": item[2],
#                 "accidents_count": item[3]
#              }
#         )
#     # Serializing json
#     json_object = json.dumps(response, indent=2)

#     # making html string from json object
#     table5html = json2html.convert(json=json_object)

#     # Writing to sample5.json
#     with open("querydata/sample5.json", "w") as f:
#         f.write(json_object)

#     return render_template('index5.html', table5=table5html)


# @app.route("/api/v1.0/roadcondition")
# # query for accidents count due to different road conditions in two years
# def roadcondition():
#     response = []
#     session = Session(bind=engine)
#     Bump_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
#         USAccidents.Year).filter(USAccidents.Bump == True).all()
#     response += formulateResponse(Bump_accidents, "Bump Accidents")

#     Junction_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
#         USAccidents.Year).filter(USAccidents.Junction == True).all()
#     response += formulateResponse(
#         Junction_accidents, "Junction Accidents")

#     No_Exit_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
#         USAccidents.Year).filter(USAccidents.No_Exit == True).all()
#     response += formulateResponse(No_Exit_accidents, "No Exit Accidents")

#     Railway_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
#         USAccidents.Year).filter(USAccidents.Railway == True).all()
#     response += formulateResponse(Railway_accidents, "Railway Accidents")

#     Station_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
#         USAccidents.Year).filter(USAccidents.Station == True).all()
#     response += formulateResponse(Station_accidents, "Station Accidents")
#     Stop_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
#         USAccidents.Year).filter(USAccidents.Stop == True).all()
#     response += formulateResponse(Stop_accidents, "Railway Accidents")
#     Traffic_Calming_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
#         USAccidents.Year).filter(USAccidents.Traffic_Calming == True).all()
#     response += formulateResponse(Traffic_Calming_accidents,
#                                   "Traffic Calming Accidents")
#     Traffic_Signal_accidents = session.query(USAccidents.Year, func.count(USAccidents.Year)).group_by(
#         USAccidents.Year).filter(USAccidents.Traffic_Signal == True).all()
#     response += formulateResponse(Traffic_Signal_accidents,
#                                   "Traffic Signal Accidents")
#     session.close()
#     # Serializing json
#     json_object = json.dumps(response, indent=2)
#     # making html string from json object
#     table6html = json2html.convert(json=json_object)
#     # Writing to sample6.json
#     with open("querydata/sample6.json", "w") as f:
#         f.write(json_object)
#     return render_template('index6.html', table6=table6html)
# def formulateResponse(accidentList, type):
#     response = []
#     for accidents in accidentList:
#         response.append({
#             "year": accidents[0],
#             "no": accidents[1],
#             "cause": type
#         })
#     return response
if __name__ == "__main__":
    app.run(debug=True)
