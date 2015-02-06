(function flickr(e) {
    // globals
    var globals = {
        formEl : document.getElementById('flickrSearch'),
        // auth
        apikey : '34f6e33224b098884a1e80a5ccb8e2bb',
        secret : 'c45369f080495c35',
        userid : '129226618@N03',
        // get page els
        container : document.querySelector('.flickr-gallery--js'),
        input  : document.querySelector('.flickr-search--js'),
        fallback : document.querySelector('.flickr-gallery__fallback--js'),
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
        // setup request
        var xhr = new XMLHttpRequest();
        // open get to url
        xhr.open("GET", url, true);
        // when ready fire check function
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 400) {
                    var data = JSON.parse(this.response);
                    callback(data);
                } else {
                    // something went wrong
                }
            }
        };
        xhr.send();
        xhr = null;
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

            removeChilds(globals.container);

            if (xhr.photos.photo.length !== 0) {
                // remove error message
                var childNode = document.querySelector('.flickr-gallery__fallbackMessage');
                if (childNode && childNode.parentNode) {
                    childNode.parentNode.removeChild(childNode);
                }
                // loop through response
                for (var i=0; i<xhr.photos.photo.length; i++){
                    // create variables to iterate on and store imgsrc/href
                    var photo = xhr.photos.photo[i];
                    var imgsrc = 'https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_m.jpg';
                    var ahref = 'https://www.flickr.com/photos/'+photo.owner+'/'+photo.id+'';
                    // fire the build gallery function with img/a src
                    buildGallery(imgsrc, ahref);
                }
            } else {

                var heading = document.createElement('h2');
                var text =  document.createTextNode('No Search Results, try again');
                heading.className = 'flickr-gallery__fallbackMessage';
                heading.appendChild(text);
                globals.fallback.appendChild( heading );
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
