(function flickr() {
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
        minSearch : 3,
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

    var buildPagination = function() {
        // declare variables
        var li,
            a,
            span,
            i = 1;

        // limite page numbers to 10
        while (i < 11){
            li = document.createElement('li');
            a = document.createElement('a');
            span = document.createElement('span');
            // add classes
            li.className = 'flickr-pagination__item';
            a.className = 'flickr-pagination__link';
            span.className = 'flickr-pagination__current';
            // set data atribute
            a.setAttribute('data-page', i);
            // apply the index as text to
            span.innerHTML = i;
            li.appendChild(a).appendChild(span);
            globals.pagination.insertBefore(li, globals.pagination.firstchild);

            i++;
        }

        assignHandlers();

        return;
    };

    var assignHandlers = function(searchData, e) {

        console.log(searchData);

        var paginEls = document.querySelectorAll('.flickr-pagination__link');

        // this is used to hold on to the i variable and stop bubbling
        function paginationClickFunction(evntlis) {
            return function (e) {
                handleform(e, evntlis);
                e.stopPropagation();
            };
        }

        // loop through elements in closure adding click event
        for (var i = 0, len = paginEls.length; i < len; i++) {
            paginEls[i].addEventListener('click', paginationClickFunction(i, e) );
        }
    };

    var handleForm = function (e, searchTerm, page){
        // prevent default behaviour
        e.preventDefault();
        // set default
        page = page || 1;
        // validation
        if(searchTerm === "search" || searchTerm === ""){
            globals.input.value = "Please enter a valid search Term";
            return false;
        }
        if (globals.input.value.length <= globals.minSearch) {
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

            // loop through response
            for (var i=0; i<parsed.photos.photo.length; i++){
                // create variables to iterate on and store imgsrc/href
                var photo = parsed.photos.photo[i];
                var imgsrc = 'https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_m.jpg';
                var ahref = 'https://www.flickr.com/photos/'+photo.owner+'/'+photo.id+'';
                // fire the build gallery function with img/a src

                buildGallery(imgsrc, ahref);
            }
            buildPagination(searchData);
        });

        removeChilds(globals.container);
        removeChilds(globals.pagination);

        // build pagination
        //buildPagination();

        // stop the form from searching
        return false;
    };

    // var handlePagination = function(page) {
    //     var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+globals.apikey+"&tags="+globals.input.value+"&privacy_filter=1&safe_search=1&content_type=6&per_page=15&page="+page+"&format=json&nojsoncallback=1";
    //
    //     removeChilds(globals.container);
    //
    //     handleRequest(url, function(xhr) {
    //         // parse json
    //         var parsed = JSON.parse(xhr);
    //
    //         // loop through response
    //         for (var i=0; i<parsed.photos.photo.length; i++){
    //             // create variables to iterate on and store imgsrc/href
    //             var photo = parsed.photos.photo[i];
    //             var imgsrc = 'https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_m.jpg';
    //             var ahref = 'https://www.flickr.com/photos/'+photo.owner+'/'+photo.id+'';
    //             // fire the build gallery function with img/a src
    //
    //             buildGallery(imgsrc, ahref);
    //         }
    //     });
    // };

    // var handlePagination = function() {
    //     var paginEls = document.querySelectorAll('.flickr-pagination__link');
    //
    //     // this is used to hold on to the i variable and stop bubbling
    //     function paginationClickFunction(evntl) {
    //         return function (e) {
    //             handlePagination(evntl, e);
    //             e.stopPropagation();
    //         };
    //     }
    //
    //     // loop through adding in click events
    //     for (var i = 0, len = paginEls.length; i < len; i++) {
    //         paginEls[i].addEventListener('click', paginationClickFunction(i, e) );
    //     }
    // };

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
