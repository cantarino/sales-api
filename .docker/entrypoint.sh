#!/bin/bash

# Prd
#yarn migrate
#yarn serve

# Dev
yarn typeorm migration:run
yarn dev