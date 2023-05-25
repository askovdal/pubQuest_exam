# PubQuest

## Running on local machine

Tested using Python 3.11.3 and 3.9.6

Clone the repository, cd into it and write the following commands:
```
cd api
python3 -m venv .venv
source .venv/bin/activate
pip3 install -r requirements.txt
gunicorn -t 300 app:app
```
After a couple of seconds, the app should be visible on http://127.0.0.1:8000. 
