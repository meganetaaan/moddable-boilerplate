FROM phusion/baseimage
LABEL maintainer="meganetaaan"

RUN apt-get update && \
  apt-get -y install sudo && \
  apt-get -y install build-essential && \
  apt-get -y install git && \
  apt-get -y install libgtk-3-dev && \
  apt-get -y install python && \
  apt-get -y install gcc git wget make libncurses-dev flex bison gperf python python-pip python-setuptools python-serial && \
  apt-get clean

ENV MODDABLE=$HOME/Projects/moddable
WORKDIR $HOME/Projects
RUN git clone https://github.com/Moddable-OpenSource/moddable
WORKDIR $MODDABLE/build/makefiles/lin
RUN make
# patch
RUN sed -i 's/.*gtk-update-icon-cache/#&/g' \
  ${MODDABLE}/build/makefiles/lin/simulator.mk \
  ${MODDABLE}/build/tmp/lin/release/xsbug/makefile
RUN make install
ENV PATH=$PATH:$MODDABLE/build/bin/lin/release

WORKDIR $HOME/esp32
RUN git clone -b v3.2.2 --recursive https://github.com/espressif/esp-idf.git
ENV IDF_PATH=$HOME/esp32/esp-idf
WORKDIR $HOME/esp32
RUN python -m pip install --user -r $IDF_PATH/requirements.txt
ENV PATH=$PATH:$HOME/esp32/xtensa-esp32-elf/bin
ENV UPLOAD_PORT=/dev/ttyUSB0

# mount workspace
RUN mkdir /workspace
ADD ./ /workspace
WORKDIR /workspace

RUN mkdir -p $HOME/.config

CMD ["/bin/bash"]
