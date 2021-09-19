import requests 
import json
import schedule
import time
from authRequest import getRequest

cart_id = 1

a = getRequest("http://carttech.tech/api/stores")
print(a)


def check_status():
    global cart_id
    url = 'http://carttech.tech/carts'
    query = {"id":str(cart_id)}
    response = requests.get(url, params = query, timeout=2)
    if (response.status_code == 200):
        res = json.loads(response.text)
        if (res["page"] == "In use"):
            get_order(cart_id)
        else:
            print("nope")
            return
    else:
        print(response.status_code)

def get_order(cart_id):
    url = 'http://carttech.tech/carts'
    query = {"id":str(cart_id), "order":"true"}
    response = requests.get(url, params = query)
    if (response.status_code == 200):
        #res = json.loads(response.text)
        #fulfill_order(res)
        '''
        This is when to activate the robot to go searching
        for the order, using the json response we
        received above. 
        '''
        productList = [0,0,0,0]
        productBools = [False, False, False, False]
        orders = requests.get("http://carttech.tech/api/orders")
        ordersJson = orders.json()['response']
        for order in ordersJson:
            if order["status"] == "Waiting":
                for i, product in enumerate(order["products"]):
                    if i < 4:
                        if product["quantity"] > 0:
                            productList[i] = product["quantity"]
                            productBools[i] = True
                return productList, productBools
    else:
        print(response.status_code)

schedule.every(10).seconds.do(check_status)

while True:
    schedule.run_pending()
    time.sleep(5)