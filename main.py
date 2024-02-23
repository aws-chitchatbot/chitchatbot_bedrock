from flask import Flask, render_template, request, jsonify
from bedrock_runtime import usage_demo, invoke, usage_demo2

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/login_pop')
def login_pop():
    return render_template('login_pop.html')

@app.route('/add_chat_room')
def add_chat_room():
    return render_template('addChatRoom_pop.html')

@app.route('/upload', methods=["post","get"])
def upload():
    if request.method == 'POST':
        file = request.files['textfile']
        file_content = file.read().decode("utf-8")
        print(file_content)
        completion = usage_demo(file_content)
        #print("ori Result:"+completion)
    return render_template('index.html', completion=completion)

@app.route('/receive_message', methods=['POST'])
def receive_message():
    if request.method == 'POST' :
        message = request.form['message']
        answer = usage_demo2(message)
        print("Received bot message:", answer)
    return render_template('index.html', answer=answer)

if __name__ == '__main__':
    app.run()