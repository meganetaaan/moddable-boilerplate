docker run \
  --rm \
  -it \
  -v $(pwd)/src:/work/src \
  -v $(pwd)/build:/work/build \
  -v /etc/group:/etc/group:ro -v /etc/passwd:/etc/passwd:ro -u $(id -u $USER):$(id -g $USER) \
  --workdir /work \
  moddable-typescript \
  /bin/bash -c 'npm run build'
