pip install -r requirements.txt

python3 manage.py collect static --no-input
python3 manage.py migrate