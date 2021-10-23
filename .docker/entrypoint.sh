#!/bin/bash

# Prd
yarn migrate-js
yarn serve

# Dev
#yarn typeorm migration:run
#yarn dev