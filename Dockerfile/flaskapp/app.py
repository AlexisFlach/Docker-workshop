from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/about")
def about():
  return render_template("about.html")

@app.route("/register", methods=["POST"])
def register():
  return render_template('home.html', name=request.form.get("name"))

if __name__ == '__main__':
  app.run(debug=True, port=5000, host='0.0.0.0')