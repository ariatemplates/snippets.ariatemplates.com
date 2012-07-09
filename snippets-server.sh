#!/bin/bash

PID_FILE="/tmp/snippets.ariatemplates.com.pid"
SERVER_PATH="$PWD/server.js"

if [ "$1" = "start" ]; then
    if [ -e $PID_FILE ]; then
        echo "~ snippets.ariatemplates.com daemon is already running."
    else
        echo "~ starting snippets.ariatemplates.com daemon."
        nohup node $SERVER_PATH $PORT > /dev/null 2>&1 &
    fi
elif [ "$1" = "stop" ]; then
    if [ ! -e $PID_FILE ]; then
        echo "~ snippets.ariatemplates.com daemon is not running."
    else
        echo "~ stopping snippets.ariatemplates.com daemon."
        kill `cat $PID_FILE`
        rm -f $PID_FILE
    fi
elif [ "$1" = "status" ]; then
    if [ -e $PID_FILE ]; then
        echo "~ snippets.ariatemplates.com daemon is running as process "`cat $PID_FILE`
    else
        echo "~ snippets.ariatemplates.com daemon is not running."
    fi
fi