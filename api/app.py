from flask import Flask, send_from_directory, request

from get_route import pubcrawl_route

# The relative path for where the React app is located
build_dir = "../web/build"

# Initialize the Flask app, and tell it that the folder with static files is located in
# the React app in "build_dir"
app = Flask(__name__, static_url_path="", static_folder=build_dir)


# The front page serves the React app that exists in "build_dir"
@app.route("/")
def serve_cra():
    return send_from_directory(build_dir, "index.html")


# The URL "/api/route" calculates the route and returns it. This URL is called by the
# React app, which displays it on the frontend.
@app.route("/api/route")
def create_route():
    args = request.args.to_dict()
    print(args)

    route, total_time, travel_time = pubcrawl_route(
        args["start"], int(args["bars"]), int(args["timeSpent"]), args["transportation"]
    )

    return {
        "html": route.get_root().render(),
        "travel": travel_time,
        "total": total_time,
    }
