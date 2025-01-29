#!/bin/bash

for i in {1..10}; do
   yarn cy:run
   if [ $? -ne 0 ]; then
       echo "Command failed on attempt $i."
       exit 1
   fi
done

echo "Command executed successfully 10 times."