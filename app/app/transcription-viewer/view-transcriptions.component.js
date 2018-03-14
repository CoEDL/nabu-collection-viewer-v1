'use strict';

const {isEmpty, each} = require('lodash');

module.exports = {
  template: require('./view-transcriptions.component.html'),
  bindings: {},
  controller: Controller,
  controllerAs: 'vm'
};

Controller.$inject = [
  '$state',
  '$rootScope',
  'dataService',
  '$sce',
  'hljs',
  '$timeout'
];
function Controller($state, $rootScope, dataService, $sce, hljs, $timeout) {
  var vm = this;

  var broadcastListener;

  vm.$onInit = init;
  vm.$onDestroy = destroy;
  vm.nextDocument = nextDocument;
  vm.previousDocument = previousDocument;

  function init() {
    broadcastListener = $rootScope.$on('item data loaded', loadItem);
    vm.config = {
      current: 0
    };

    loadItem();
  }

  function destroy() {
    broadcastListener();
  }

  function loadItem() {
    vm.loadingData = true;
    delete vm.data;
    const collectionId = $state.params.collectionId;
    const itemId = $state.params.itemId;
    vm.loadingData = true;
    dataService.getItem(collectionId, itemId).then(processResponse);

    function processResponse(resp) {
      vm.item = resp;
      if (!isEmpty(vm.item)) {
        vm.transcriptions = vm.item.transcriptions.map(transcription =>
          transcription.split('/').pop()
        );
        if (!$state.params.transcriptionId) {
          $state.go('main.transcriptionInstance', {
            transcriptionId: vm.transcriptions[0]
          });
        }
        const transcriptionId = $state.params.transcriptionId;
        vm.config.current = vm.transcriptions.indexOf(transcriptionId);

        const type = vm.transcriptions[vm.config.current].split('.').pop();
        const item = {};
        item[type] = vm.item.transcriptions[vm.config.current];
        dataService.loadTranscription(type, item, 'xml').then(data => {
          // vm.data = $sce.trustAsHtml(data);
          // console.log(hljs.highlight('xml', data).value);
          hljs.configure({
            tabReplace: '    ',
            useBr: true
          });
          // console.log(data);
          data = hljs.highlight('xml', data).value;
          // vm.data = hljs.fixMarkup(data);
          vm.data = data;
          console.log('init highlighting');
          hljs.initHighlighting();
        });

        vm.loadingData = false;
      }
    }
  }

  function jump() {
    each(vm.transcriptions, (transcription, idx) => {
      if (vm.config.current === idx) {
        $state.go('main.transcriptionInstance', {
          transcriptionId: transcription
        });
      }
    });
  }

  function nextDocument() {
    if (vm.config.current === vm.item.transcriptions.length - 1) {
      return;
    }
    vm.config.current += 1;
    jump();
  }

  function previousDocument() {
    if (vm.config.current === 0) {
      return;
    }
    vm.config.current -= 1;
    jump();
  }
}
