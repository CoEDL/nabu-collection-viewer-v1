'use strict';

/**
 * @ngdoc service
 * @name pdscApp.paradisec
 * @description
 * # paradisec
 * Service in the pdscApp.
 */
angular.module('pdscApp')
  .service('paradisec', [ '$log', '$http', 'xml', 'configuration', function ($log, $http, xml, conf) {

      function getNodes(d) {
          var parser = new DOMParser();
          var xmldoc = parser.parseFromString(d, "text/xml");
          var tree = xml.toJson(xmldoc);
          tree = tree['OAI-PMH']['GetRecord']['record']['metadata']['olac:olac'];
          return { 'data': createItemDataStructure(tree)}
      }

      function createItemDataStructure(tree) {
          return {
              'identifier': _.map(tree['dc:identifier'], function(d) {
                  return d['#text'];
              }),
              'title': tree['dc:title']['#text'],
              'description': tree['dc:description']['#text'],
              'citation': tree['dcterms:bibliographicCitation']['#text'],
              'contributor': _.map(tree['dc:contributor'], function(d) {
                  return { 
                      'name': d['#text'],
                      'role': d['@attributes']['olac:code']
                  }
              }),
              'images': _.without(_.map(tree['dcterms:tableOfContents'], function(d) {
                  var i = d['#text'];
                  var ext = i.split('.').pop();
                  if (ext !== undefined && paradisec.imageTypes.indexOf(ext.toLowerCase()) !== -1) {
                      return d['#text'];
                  }
              }), undefined),
              'rights': tree['dcterms:accessRights']['#text']
          };
      }

      function getItem(project, collectionId, itemId) {
          var itemIdentifier = conf.datasource[project].itemIdentifier;
          itemIdentifier = itemIdentifier.replace('{{collectionId}}', collectionId).replace('{{itemId}}', itemId);

          var url = conf.datasource[project].getItem;
          url = url.replace('{{itemId}}', itemIdentifier);
          $log.debug("ParadisecService: getItem", url, itemIdentifier);

          return $http.get(url, { transformResponse: getNodes }).then(function(resp) {
              $log.debug("ParadisecService: getItem response", resp.data.data);
              resp.data.data.collectionId = collectionId;
              resp.data.data.collectionLink = conf.datasource[project].collections + '/' + collectionId;
              resp.data.data.itemId = itemId;
              return resp.data.data;
          }, 
          function(resp) {
              $log.error("ParadisecService: error, couldn't get", url);
          });
      }

      var paradisec = {
          imageTypes: [ 'jpg', 'png' ],
          getItem: getItem
      }
      return paradisec;
  }]);
