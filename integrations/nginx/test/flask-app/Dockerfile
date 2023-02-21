FROM python:latest
ADD . /code
WORKDIR /code
RUN pip install -r requirements.txt
CMD ["flask", "run", "-h", "0.0.0.0", "-p", "5000"]
