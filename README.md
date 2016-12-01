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
When you go to [Cognitive Services](https://www.microsoft.com/cognitive-services/), click on the APIs dropdown and select Content Moderator under Vision, you can Get started for Free. It will ask you to sign in and to provide a team name. You will then be taken to the dashboard. 

You will find the keys when you click Settings at the top and then the API tab. Under the API, you will find the cm_id key where it says Client Id. The cm_key is under Keys. You will see it only once, so make sure you copy it. Otherwise, you'll have to create a new one. Finally, the ocp_key is all the way at the bottom in the Connectors section. You'll see it when you click Edit.  

## Getting the callback
Content Moderator needs a callback for pictures when they are reviewed in Content Moderator studio. Since it might be hard to find your IP behind a firewall, you can set up the end point with ngrok: 
```
ngrok http <port>.
```
where <port> is the port you specify in index.js line 7. Alternatively, you can use requestb.in. 

