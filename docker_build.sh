docker build -t node-app .

# verify with docker images | grep node
# docker stop test-node-app
# docker rm test-node-app 
# run with docker run -p 8000:8000 --name test-node-app node-app
# test with https://localhost:8000/api/utils/cache/statistics