# ContentModerationBot

This bot uses the ContentModeration APIs to show the adult racy scores of pictures. You will need to get keys from the ContentModeration site and  provide them in the config.json file:

{
    "cm_id" : "<id>",
    "cm_key" : "<key>"
}

Since the site has a callback for pictures when they are reviewed, you can set up the end point with ngrog: 

 