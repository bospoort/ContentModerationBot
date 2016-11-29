# ContentModerationBot

## Introduction
This bot uses the Content Moderation APIs for flagging inappropriate content. The bot can flag both text as well as images. You can use either the simple content moderation APIs to analyze individual pictures (cmimage.js) or text (cmtext.js). Content Moderation also has a review mode where you can use a full review studio. This Review Studio allows human beings to manually evaluate pictures and flag appropriately. This is implemented in cmstudio.js. When a human resource has the picture reviewed, Content Moderator Review invokes your callback to notify you of the results (review.js). Finally, Content Moderation Review requires OAuth authentication (auth.js).

## Setting it up
You will need to get keys from the ContentModeration site and  provide them in the config.json file:

``` JSON
{
    "cm_id" : "id",
    "cm_key" : "key",
    "ocp_key" : "ocp"
}
```
You will find the cm_id key here:

The cm
Since the site has a callback for pictures when they are reviewed in CM studio, you can set up the end point with ngrok: 

ngrok http <port>.

where <port> is the port you specify in index.js line 7. 

