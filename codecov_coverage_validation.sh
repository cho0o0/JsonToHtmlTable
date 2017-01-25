#!/bin/sh
codecov_endpoint="https://codecov.io/api/gh/c-cho/JsonToHtmlTable/branch/master"
codecov_coverage=`curl -s $codecov_endpoint | jq -r .commit.totals.c`
codecov_threshold=80

if [ "$codecov_coverage" -ge "$codecov_threshold" ] 
then
  echo "[SUCCESS] code coverage($codecov_coverage) is higher than threshold($codecov_threshold)"
  exit 0
else
  echo "[FAILED] code coverage($codecov_coverage) is lower than threshold($codecov_threshold)"
  exit -1
fi
