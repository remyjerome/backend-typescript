#!/bin/bash

start-local:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

start-build:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

stop:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down