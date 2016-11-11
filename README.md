# ContentModerationBot

This bot uses the ContentModeration APIs to show the adult racy scores of pictures. You will need to get keys from the ContentModeration site and  provide them in the config.json file:

{
    "cm_id" : "guid",
    "cm_key" : "guid"
}

Since the site has a callback for pictures when they are reviewed in CM studio, you can set up the end point with ngrok: 

ngrok http 3991

where 3991 is the port you specify in index.js line 7. 

