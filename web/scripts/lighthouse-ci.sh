#!/usr/bin/env bash
# Run the Lighthouse test against the dev build with continuous integration.

# Location to save the generated HTML report.
OUTPUT_PATH=./reports/audit-local.html
# Change www.merlinspotions.com to the project's URL. 
URL=https://www.merlinspotions.com/#mobify-override\&mobify-path=true\&mobify-url=https://localhost:8443/loader.js\&mobify-global=true\&mobify-domain=\&mobify-all=true\&mobify=1\&mobify-debug=1\&mobify-js=1

# Lighthouse uses your local installation of Chrome, which should be at least 
# version 54.0. Use a custom user agent containing "MobifyPreview" so that 
# Preview will accept our requests, and disable device emulation so that the
# "MobifyPreview" user agent does not get overridden. 

# Finally, parse the HTML report for the Lighthouse score. 
# CI will fail the build if the score is below a threshold.
# See min_lighthouse_score in package.json

npm run dev &
sleep 20
lighthouse \
	--chrome-flags='--user-agent="MobifyPreview" --allow-insecure-localhost' \
	--output=html \
	--output-path=${OUTPUT_PATH} \
	--disable-device-emulation=true \
	"${URL}"

kill %1
node ./lighthouse/check-score.js
