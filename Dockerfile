FROM node:7

COPY . /app
WORKDIR /app

RUN npm install -p

RUN curl -sSL http://deis.io/deis-cli/install-v2.sh | bash && ln -fs $PWD/deis /bin/deis
RUN ssh-keygen -t rsa -b 4096 -f ~/.ssh/deis-pr-trigger -N deis-pr-trigger

ARG DEIS_CTRL
ARG DEIS_USERNAME
ARG DEIS_PASSWORD

RUN deis auth:login ${DEIS_CTRL} --username=${DEIS_USERNAME} --password=${DEIS_PASSWORD}
RUN deis keys:remove root@${HOSTNAME}
RUN deis keys:add ~/.ssh/deis-pr-trigger.pub

CMD node/dist
