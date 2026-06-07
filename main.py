import os
import json
from flask import Flask, render_template, jsonify, request, redirect, url_for

app = Flask(__name__)

# === Website Views ===
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

@app.route('/staff')
def staff():
    return redirect(url_for('staffOrders'))

@app.route('/staff/orders')
def staffOrders():
    return render_template('staff/orders.html')

@app.route('/staff/catalogue')
def staffCatalogue():
    return render_template('staff/orders.html')

@app.route('/test-orders')
def testOrders():
    return render_template('jack_test_order_page.html')

# === Methods for editing JSON datasets ===
@app.route('/api/update-order-status/<id>/<status>')
def updateOrderStatus(id, status):
    orders_dataset_file_path = '/static/data/orders.json'

    # 2. Check if the file exists, otherwise start with an empty dict
    if os.path.exists(orders_dataset_file_path):
        with open(orders_dataset_file_path, 'r', encoding='utf-8') as file:
            try:
                current_data = json.load(file)
            except json.JSONDecodeError:
                current_data = {}
    else:
        current_data = {}

    # 3. Update the existing data with the incoming values
    current_data.update({ "status": status })

    # 4. Write the modified data back to the file safely
    with open(orders_dataset_file_path, 'w', encoding='utf-8') as file:
        json.dump(current_data, file, indent=4)

    # Send a confirmation response back to JavaScript
    return jsonify({
        "status": "success",
        "message": f"Data received: {id} {status}"
    }), 200

    # dataset_file_path = '/static/data/orders.json'
    # app.logger.debug(dataset_file_path)

    # 1. Get the new data sent in the request body
    # new_data = request.get_json()
    # if not new_data:
    #     return jsonify({"error": "No JSON data provided"}), 400

    # return jsonify({"message": "File updated successfully", "updated_data": current_data}), 200

if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=8080)
app = Flask(__name__)