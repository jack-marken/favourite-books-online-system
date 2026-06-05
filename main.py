from flask import Flask, render_template, jsonify, request
# import requests
# import time
# from datetime import datetime
# import serial
# import threading
# import pymysql

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search')
def search():
    return render_template('search.html')

@app.route('/book')
def book():
    return render_template('book.html')

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/checkout')
def checkout():
    return render_template('checkout.html')

@app.route('/checkoutSuccess')
def checkoutSuccess():
    return render_template('checkoutSuccess.html')

@app.route('/account')
def account():
    return render_template('account/account.html')

@app.route('/account/login')
def accountLogin():
    return render_template('account/login.html')

@app.route('/account/register')
def accountRegister():
    return render_template('account/register.html')

@app.route('/test-orders')
def testOrders():
    return render_template('jack_test_order_page.html')

if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=8080)
app = Flask(__name__)


# return render_template('index.html', data=data, weather=weather, car_settings=car_settings)

# @app.route('/update/database', methods=['POST'])
# def updateDatabase():
#     try:
#         dbconn = pymysql.connect(host="localhost", user="pi", password="", database="car_db")
#         print("Connected to database.")

#         # Example serial data: "light_sensor,3;potentiometer,0;headlights,0;"
#         sensor_data = latest_serial_data.split(';')
#         for item in sensor_data:
#             if len(item.split(',')) == 2:
#                 sensor, val = item.split(',')
#                 cursor = dbconn.cursor()
#                 cursor.execute("INSERT INTO sensor_records (sensor_type, sensor_value) VALUES (%s, %s)", (sensor, val))
#                 dbconn.commit()
#                 cursor.close()
#     except pymysql.MySQLError as e:
#         print(f"Database error: {e}")
#     finally:
#         if dbconn:
#             dbconn.close()
#     return jsonify({'result': 'successful'})

# @app.route('/update/car-settings', methods=['POST'])
# def updateCarSettings():
#     car_settings = request.get_json() # retrieve the data sent from JavaScript

#     ser.write(f"aircon:{car_settings['aircon']}\n".encode('utf-8'))
#     time.sleep(0.1)
#     ser.write(f"headlights:{car_settings['headlights']}\n".encode('utf-8'))

#     return jsonify({'result': car_settings}) # return the result to JavaScript


# # === Template data to be replaced at run-time ===
# data = (
#     ("1", "potentiometer", "300"),
#     ("2", "light_sensor", "250"),
#     ("3", "potentiometer", "540"),
#     ("4", "headlights", "ON"),
# )

# weather = {
#     "current_temp" : "21.1",
#     "time" : datetime.fromisoformat("2026-05-25T22:30:00")
# }

# car_settings = {
#     "headlights" : "manual",
#     "aircon" : "manual"
# }

# @app.route('/get-database-records')
# def getDatabaseRecords():
#     try:
#         dbconn = pymysql.connect(host="localhost", user="pi", password="", database="car_db")

#         cursor = dbconn.cursor()
#         result = cursor.execute("SELECT * FROM sensor_records")
#         dbconn.commit()
#         cursor.close()
#     except pymysql.MySQLError as e:
#         print(f"Database error: {e}")
#     finally:
#         if dbconn:
#             dbconn.close()
#     return jsonify({'result': result})

