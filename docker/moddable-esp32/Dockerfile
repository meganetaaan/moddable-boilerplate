FROM phusion/baseimage
LABEL maintainer="meganetaaan"

# Base setup
RUN apt-get update && \
  apt-get -y install sudo && \
  apt-get -y install build-essential && \
  apt-get -y install git && \
  apt-get -y install libgtk-3-dev && \
  apt-get clean

ENV HOME=/root
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

# ESP32 Environments
RUN apt-get -y install gcc git wget make libncurses-dev flex bison gperf python python-pip python-setuptools python-serial cmake ninja-build

WORKDIR $HOME/esp32
RUN git clone -b v3.3.2 --recursive https://github.com/espressif/esp-idf.git
ENV IDF_PATH=$HOME/esp32/esp-idf

WORKDIR $HOME/esp32
RUN wget https://dl.espressif.com/dl/xtensa-esp32-elf-linux64-1.22.0-80-g6c4433a-5.2.0.tar.gz
RUN tar -zxvf xtensa-esp32-elf-linux64-1.22.0-80-g6c4433a-5.2.0.tar.gz
RUN rm xtensa-esp32-elf-linux64-1.22.0-80-g6c4433a-5.2.0.tar.gz

WORKDIR $HOME/esp32
RUN python -m pip install --user -r $IDF_PATH/requirements.txt
ENV PATH=$PATH:$HOME/esp32/xtensa-esp32-elf/bin:$IDF_PATH/tools
# If upload port is not detected, Set UPLOAD_PORT.
# ENV UPLOAD_PORT=/dev/ttyUSB0

# add workspace for mounting
RUN mkdir /workspace
# ADD ./ /workspace
# WORKDIR /workspace

RUN mkdir -p $HOME/.config

CMD ["/bin/bash"]
