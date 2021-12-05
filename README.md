# Alice Data Visualisation Thesis
This repository contains scripts for visualising data from the CERN ALICE experiment

## Installation
Assuming the user has Python and pip installed, we can use the following steps to run this project

### Method 1: Creating venv
To start off, we will create a virtual environment and download all dependencies in there
To create it, go to the designated folder in the terminal, and run the following command:
```
python3 -m venv venv
```
This will create a virtual environment called **venv**

To activate this environment, run:
```
source venv/bin/activate
```
Now, we are going to install are the required packages using the requirements.txt file, using the following command:
```
pip3 install -r requirements.txt
```

To run **jupyter notebook**, run the command
```
jupyter notebook
```
This should automatically open your browser to jupyter and from there on you can access the document and run the code

### Method 2: Using Docker
An alternative approach is to pull the docker image and run it
```
docker pull tanvinsharma/alice_pythreejs
docker run -p 8888:8888 tanvinsharma/alice_pythreejs
```
