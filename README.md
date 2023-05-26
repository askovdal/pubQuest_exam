# PubQuest

## Running on local machine

Tested using Python 3.11.3 and 3.9.6

### macOS and Linux
Clone the repository, cd into it and run the following commands:
```shell
cd api
python3 -m venv .venv
source .venv/bin/activate
pip3 install -r requirements.txt
flask run --port 5550
```

After a couple of seconds, the app should be visible on http://127.0.0.1:5550.

### Windows
Clone the repository, cd into it and run the following commands:
```shell
cd api
python3 -m venv .venv
.venv\Scripts\activate.bat
pip3 install -r requirements.txt
flask run --port 5550
```

After a couple of seconds, the app should be visible on http://127.0.0.1:5550.
