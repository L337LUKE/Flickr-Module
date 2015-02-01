// globals
var form = document.getElementById('flickrSearch');

// check for submition
var app = {
    container : document.querySelector('.js-flickr-gallery'),
    pagination : document.querySelector('.flickr-pagination__js'),
    input  : document.querySelector('.flickr-search__js'),
    apikey : '34f6e33224b098884a1e80a5ccb8e2bb',
    secret : 'c45369f080495c35',
    userid : '129226618@N03',

    handleSearch : function(e){
        // prevent default behaviour
        e.preventDefault();
        var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+app.apikey+"&tags="+app.input.value+"&privacy_filter=1&safe_search=1&content_type=6&per_page=15&page=1&format=json&nojsoncallback=1";

        app.handleRequest(url, function(xhr) {
            // while container has child, remove it
            while (app.container.firstChild) {
                app.container.removeChild(app.container.firstChild);
                // done!
            }

            // loop through response
            for (var i=0; i<parsed.photos.photo.length; i++){
                // create variables to iterate on and store imgsrc/href
                var photo = parsed.photos.photo[i];
                var imgsrc = 'https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_m.jpg';
                var ahref = 'https://www.flickr.com/photos/'+photo.owner+'/'+photo.id+'';

                buildGallery(imgsrc, ahref);
            }
        });

        buildGallery = function(imgsrc, ahref) {
            // create html tags
            var li = document.createElement('li');
            var a = document.createElement('a');
            var img = document.createElement('img');

            // set element attributes attributesq
            li.className = 'flickr-gallery__item';
            img.className = 'flickr-gallery__image';
            a.className = 'flickr-gallery__link';

            a.href = ahref;
           img.src = imgsrc;

            // append the children to the container
           li.appendChild(a).appendChild(img);
           app.container.appendChild(li);
        };
        // stop the form from searching
        return false;
    },
    // handlePagination : function(pageNo) {
    //
    // },
    //handleGallery : function(res, pageNo) {

        // user clicks page no
        // user clicks forward/back
        // user clicks first/last

        //for (p=0; p<) {

        //}

    //     generatePagination = function() {
    //
    //     };
    // },
    handleRequest : function(url, callback) {
        var xhr;
        // setup request
        xhr = new XMLHttpRequest();
        // when ready fire check function
        xhr.onreadystatechange = checkReady;
        // check function
        function checkReady(){
            // make sure ready state is less than 4
            if(xhr.readyState < 4) {
                return;
            }
            // make sure status is ok
            if(xhr.status !== 200) {
                return;
            }
            // good to go, fire callback
            if(xhr.readyState === 4) {
                callback(xhr.response);
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    },
    // generateView : function(json) {
    //     // for building the image
    //     // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
    //     // for building the URL
    //     // https://www.flickr.com/photos/{user-id}/{photo-id} - individual photo
    //
    //     // parse the json response
    //     var rsp = JSON.parse(json);
    //
    //     buildGallery = function(imgurl, linkurl) {
    //         // create html tags
    //         var li = document.createElement('li');
    //         var a = document.createElement('a');
    //         var img = document.createElement('img');
    //
    //         // set element attributes attributesq
    //         li.className = 'flickr-gallery__item';
    //         img.className = 'flickr-gallery__image';
    //         a.className = 'flickr-gallery__link';
    //
    //         a.href = ahref;
    //         img.src = imgsrc;
    //
    //         // append the children to the container
    //         li.appendChild(a).appendChild(img);
    //         app.container.appendChild(li);
    //     };
    //
    //     buildPagination = function(maxPages) {
    //         // create html tags
    //         var li = document.createElement('li');
    //         var a = document.createElement('a');
    //         var span = document.createElement('span');
    //
    //         // add classes
    //         li.className = 'flickr-pagination__item';
    //         a.className = 'flickr-pagination__link';
    //         span.className = 'flickr-pagination__current';
    //
    //         // append to DOM
    //         li.appendChild(a).appendChild(span);
    //         app.pagination.appendChild(li);
    //     };
    //     // While the container has a first child, remove that child
    //     while (app.container.firstChild) {
    //         app.container.removeChild(app.container.firstChild);
    //     }
    //
    //     // loop through the returned json and create the list items
    //
    // },
};

// if (window.addEventListener) {
//     window.addEventListener("load", app.handleSearch());
// } else {
//     window.attachEvent("onload", app.handleSearch());
// }

// event listener fallback
if (form.addEventListener) {
    form.addEventListener("submit", app.handleSearch, false);
} else {
    form.attachEvent("onsubmit", app.handleSearch);
}


// user loads page
// -- grab 15 photos
// -- loop through json
// -- output to screen
// make 1st page element current

// user clicks page 2/3/4/5/ etc
// performs search again
// grabs page # of results
// removes elements, applies to page

// user clicks back / forward
// grabs next/previous page of results by performing search and adding 1/2

// user clicks first / last
// does search grabbing first page
// does search grabbing last page
