FROM ubuntu:latest
# ENV TZ=Europe/Warsaw
# RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update && apt-get -y update
RUN apt-get install -y build-essential python3.9 python3-pip python3-dev
RUN pip3 -q install pip --upgrade

RUN mkdir /app
ADD ./ app/

WORKDIR /app/

RUN pip3 install -r ./requirements.txt
RUN pip3 install uvicorn python-multipart

EXPOSE 8000

# ENV TINI_VERSION v0.6.0
# ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /usr/bin/tini
# RUN chmod +x /usr/bin/tini
