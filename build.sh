pip install -r requirements.txt

python3 nitrostormgames/manage.py collect static --no-input
python3 nitrostormgames/manage.py migrate
