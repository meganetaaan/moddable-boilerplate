export CONTAINER_HOST=hogehoge
xhost +local:${CONTAINER_HOST}
docker run \
  --rm \
  --net="host" \
  --env="DISPLAY" \
  --hostname=${CONTAINER_HOST} \
  -v "$(pwd)":/root/app \
  -v "$(pwd)"/tmp:/root/Projects/moddable/build/tmp \
  --workdir="/root/app" \
  --device=/dev/ttyUSB0 \
  -it \
  moddable-esp32 \
# env UPLOAD_SPEED=15000000 mcconfig -d -m -p esp32
xhost -local:${CONTAINER_HOST}

# --mount type=volume,src="$(pwd)",dst=/root/app \
# export CONTAINER_ID=`docker ps --no-trunc -aqf "name=my-moddable-esp32"`
# export CONTAINER_HOST=`docker inspect --format='{{ .Config.Hostname }}' ${CONTAINER_ID}`
# xhost +local:root
# docker start ${CONTAINER_ID}
# docker attach ${CONTAINER_ID}
## detect current tty devices
# 
# docker exec mcconfig
# docker stop ${CONTAINER_ID}
# docker rm ${CONTAINER_ID}