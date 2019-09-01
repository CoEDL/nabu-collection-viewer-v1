"use strict";

module.exports = angular
    .module("pdsc.routes", ["ui.router"])
    .config(CollectionViewerRoutes);

CollectionViewerRoutes.$inject = ["$urlRouterProvider", "$stateProvider"];

function CollectionViewerRoutes($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state("root", {
        url: "/",
        component: "pdscCollectionViewerRootComponent"
    });

    $stateProvider.state("main", {
        url: "/{collectionId}/{itemId}",
        component: "pdscCollectionViewerMainComponent"
    });

    $stateProvider.state("main.information", {
        url: "/information",
        component: "pdscInformationViewerComponent"
    });

    $stateProvider.state("main.files", {
        url: "/files",
        component: "pdscFileViewerComponent"
    });

    $stateProvider.state("main.images", {
        url: "/images",
        component: "pdscImageViewerComponent"
    });
    $stateProvider.state("main.images.instance", {
        url: "/:imageId"
    });

    $stateProvider.state("main.documents", {
        url: "/documents",
        component: "pdscDocumentViewerComponent"
    });
    $stateProvider.state("main.documents.instance", {
        url: "/:documentId"
    });

    $stateProvider.state("main.transcriptions", {
        url: "/transcriptions",
        component: "pdscTranscriptionViewerComponent"
    });
    $stateProvider.state("main.transcriptions.instance", {
        url: "/:transcriptionId"
    });

    $stateProvider.state("main.media", {
        url: "/media",
        component: "pdscMediaViewerComponent"
    });
    $stateProvider.state("main.media.instance", {
        url: "/:mediaId?transcription&segment"
    });
    $stateProvider.state("main.video", {
        url: "/video",
        component: "pdscVideoViewerComponent"
    });
    $stateProvider.state("main.video.instance", {
        url: "/:videoId?transcription&segment"
    });
    $stateProvider.state("main.audio", {
        url: "/audio",
        component: "pdscAudioViewerComponent"
    });
    $stateProvider.state("main.audio.instance", {
        url: "/:audioId?transcription&segment"
    });
}
