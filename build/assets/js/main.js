(function flickr(e) {
    // globals
    var globals = {
        formEl : document.getElementById('flickrSearch'),
        // auth
        apikey : '34f6e33224b098884a1e80a5ccb8e2bb',
        secret : 'c45369f080495c35',
        userid : '129226618@N03',
        // get page els
        container : document.querySelector('.flickr-gallery__js'),
        pagination : document.querySelector('.flickr-pagination__js'),
        input  : document.querySelector('.flickr-search__js'),
    };

    // HELPERS
    var removeChilds = function (node) {
        node = node || 0;
        if (node === 0) {
            return;
        }
        while (node.lastChild) {
            node.removeChild(node.lastChild);
        }
        return;
    };

    var handleRequest = function(url, callback) {
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
                console.log("There's a problem here");
                return;
            }
            // good to go, fire callback
            if(xhr.readyState === 4) {
                callback(xhr.response);
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    };

    // BUILD FUNCTIONS
    var buildGallery = function(imgsrc, ahref) {
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
        globals.container.appendChild(li);
    };

    var handleForm = function(e, searchTerm, page){
        // prevent default behaviour
        e.preventDefault();
        // set default
        page = page || 1;

        var minSearch = 2;

        if(searchTerm === "search" || searchTerm === ""){
            globals.input.value = "Please enter a valid search Term";
            return false;
        }
        if (globals.input.value.length <= minSearch) {
            globals.input.value = "Please enter more characters";
            return false;
        }
        var str = globals.input.value;
        // set default
        str = typeof searchTerm !== 'undefined' ? searchTerm : 'concert';
        // strip whitespace
        var searchData = str.replace(/\s+/g, '');

        // build url
        var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+globals.apikey+"&tags="+searchData+"&privacy_filter=1&safe_search=1&content_type=6&per_page=15&page="+page+"&format=json&nojsoncallback=1";

        // run ajax function
        handleRequest(url, function(xhr) {
            // parse json
            var parsed = JSON.parse(xhr);

            removeChilds(globals.container);

            // loop through response
            for (var i=0; i<parsed.photos.photo.length; i++){
                // create variables to iterate on and store imgsrc/href
                var photo = parsed.photos.photo[i];
                var imgsrc = 'https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_m.jpg';
                var ahref = 'https://www.flickr.com/photos/'+photo.owner+'/'+photo.id+'';
                // fire the build gallery function with img/a src
                buildGallery(imgsrc, ahref);
            }
        });

        // stop the form from searching
        return false;
    };

    // event listener fallback
    if (globals.formEl.addEventListener) {
        // run on load and wait for submission
        window.addEventListener('load', handleForm, false);

        globals.formEl.addEventListener("submit", function(e){
            handleForm(e, globals.input.value);
        }, false);

    } else {
        window.attachEvent("onload", handleForm);

        globals.formEl.attachEvent("onsubmit", function(e) {
            handleForm(e, globals.input.value);
        });
    }

})();
