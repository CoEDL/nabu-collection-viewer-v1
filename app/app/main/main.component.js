'use strict';

const {includes, isEmpty, isUndefined} = require('lodash');

module.exports = {
  template: require('./main.component.html'),
  bindings: {},
  controller: Controller,
  controllerAs: 'vm'
};

Controller.$inject = [
  '$state',
  '$transitions',
  '$rootScope',
  'dataService',
  '$mdSidenav'
];

function Controller($state, $transitions, $rootScope, dataService, $mdSidenav) {
  var vm = this;

  var broadcastListener;

  vm.showItemInformation = false;
  vm.levelUp = false;

  vm.$onInit = init;
  vm.$onDestroy = destroy;
  vm.toggleItemInformation = toggleItemInformation;

  function init() {
    vm.loadingData = true;
    vm.showOptions = false;
    broadcastListener = $rootScope.$on('item data loaded', loadItem);
    loadItem();
  }

  function destroy() {
    broadcastListener();
  }

  function loadItem() {
    vm.collectionId = $state.params.collectionId;
    vm.itemId = $state.params.itemId;
    return dataService.getItem(vm.collectionId, vm.itemId).then(resp => {
      if (isEmpty(resp)) {
        return;
      }
      vm.itemData = resp;
      vm.loadingData = false;
      loadViewer();
    });
  }

  function toggleItemInformation() {
    $mdSidenav('left').toggle();
  }

  function loadViewer() {
    // load a viewer if we're at the item root
    if ($state.current.name === 'main') {
      $state.go('main.files');
      // if (!isEmpty(vm.itemData.images)) {
      //   $state.go('main.images');
      // } else if (!isEmpty(vm.itemData.media)) {
      //   $state.go('main.media');
      // } else {
      //   $state.go('main.documents');
      // }
    }
  }
}