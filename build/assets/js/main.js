var flickrApp = {

    apikey : '34f6e33224b098884a1e80a5ccb8e2bb',
    secret : 'c45369f080495c35',
    userid : '27049738@N05',

    jsonRet : function() {
        jsonFlickrApi = function(rsp) {
            if (rsp.stat != "ok"){
                // something broke!
                return;
            }
            for (var i=0; i<rsp.photos.photo.length; i++){
                var photo = rsp.photos.photo[i];

                var li = document.createElement('li');
                var img = document.createElement('img');

                li.className = 'flickr-dynamic-item';
                img.src = 'https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_m.jpg';
                li.appendChild(img);
                document.body.appendChild(li);
            }
        };
    },
    createScript : function() {
        var script = document.createElement('script');
        script.src = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+flickrApp.apikey+'&user_id='+flickrApp.userid+'&tags=theflatliners'+flickrApp.secret+'&format=json';
        document.body.appendChild(script);
    },
};

document.addEventListener('ready', flickrApp.jsonRet() );
document.addEventListener('ready', flickrApp.createScript() );
