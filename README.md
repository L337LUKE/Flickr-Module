# Luke Roberts - Ticketmaster
## Front-end Developer role
---
### Initial phase

When starting the project I create my environment to manage all the tasks I don't want to be worrying about during the project, compiling, minifying, compressing, etc.

For this I use [Grunt](http://gruntjs.com) as it's less opinionated when compared to something like prePros or CodeKit, giving me more freedom to experiment with different packages.

My Directories are split up into Build and Dist, Dist being the directory that everything gets compiled to.

### Project Structure

For the projects architecture I use an abstraction of the BEM naming convention, which helps reduce specificity, increase performance and create modular portable chunks of layout.

Since I am using SASS to build all my front-end styles I make use of the BEM architecture creating a namespace for both the overall module and each individual chunk, for example:

    .flickr-search {}
    .flickr-search__input {}
    .flickr-search__input--js {}
    .flickr-search__label {}

This is method allows me to circumvent having to nest selectors as I make use of the namespace 'flickr-search'.
*This is reflected throughout the project.*

### Progressive enhancement

I created the site mobile first which I personally feel is a great way to build sites.  We should always be thinking about User Experience and the medium a user may be accessing our sites on.

Building this way offers more flexibility and puts us in the mindset to add additional features as the technology allows or simply improvements.

### Functionality

For styling I handcoded all the SASS and made use of [Bourbon.io](http://bourbon.io) and [Neat](http://neat.bourbon.io/).  These are mixin libraries which simply facilitate the grid structure and provide helper CSS functions.

Using these two mixin libraries simply speeds up development, providing a standardized way of implementing the design.  They don't add unnecessary bloat to the project, much like other frameworks.

Using this helps keep a structure and presentation further separate.  It allows for abstraction of excess classes form the markup, which is in common in CSS frameworks.

I have also documented the SASS to provide a guide for other developers working on the project.

As this is a functional prototype I built low-level functionality in to retrieve image data from flickr and populate the grid, both on page load and when users provide search terms.

An error message also populates to show when a request returns no data. 
 
Moving forward this could be expanded by the offshore team to populate the image slider with relative image data (alt, title, etc) for accessibility purposes and SEO.

Paging results can also be extended to work on page, simply re-loading the image data when a user selects next/previous or a numerical value.

### Closing Notes

I've attached all the files as well as the necessary means to make the project on another devs machine by simply running 

npm install
bower install

*then running*

grunt

or one of the grunt tasks provided in the Gruntfile.js

