'use strict';

/**
 * @ngdoc service
 * @name pdscApp.configuration
 * @description
 * # configuration
 * Constant in the pdscApp.
 */
angular.module('pdscApp')
  .constant('configuration', {

      // Styling the app
      //  Limited styling is supported - see config/app.css

      // This viewer can be augmented to work for other datasources - defined further on.
      //  Define those in the section 'datasource' then set the deployment as required.
      "deployment": "paradisec",

      // The datasources.
      //  The viewer is predicated on the idea that a service can be queried for metadata of an item (which is part
      //  of a collection) and the application can build a datastructure containing some of the item metadata and the
      //  content that it defines (images, audio and video).
      //
      //  In this section, define methods and configuration snippets required to query and process a datasource, then,
      //  add a service for that datasource in scripts/services. Probably best to follow the paradisec.js example.
      //
      //  Once you have the code to process your datasource (noting that you MUST produce a datastructure as the
      //  paradisec example - see createItemDataStructure()), integrate it into scripts/controllers/main.js.
      "datasource": {
          "paradisec": {
              "collections": "http://catalog.paradisec.org.au/collections",
              "itemIdentifier": "oai:paradisec.org.au:{{collectionId}}-{{itemId}}",
              "getItem": "http://catalog.paradisec.org.au/oai/item?verb=GetRecord&identifier={{itemId}}&metadataPrefix=olac",
          },
          "esrc": {
          },
          "alveo": {
          }
      }
  });