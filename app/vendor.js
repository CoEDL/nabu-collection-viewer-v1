"use strict";

import "../node_modules/font-awesome/css/font-awesome.css";
import "../node_modules/angular-material/angular-material.css";
import "../node_modules/imageviewer/dist/iv-viewer.css";
import "../node_modules/highlight.js/styles/atom-one-dark.css";

import AngularApollo from "angular1-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

require("angular");
require("angular-animate");
require("angular-aria");
require("angular-cookies");
require("angular-material");
require("angular-messages");
require("angular-sanitize");
require("@uirouter/angularjs");
require("angular1-apollo");
require("moment");
require("lodash");
require("pdfjs-dist");
require("jquery");
require("../node_modules/imageviewer/dist/iv-viewer.js");
require("highlight.js");

import pdflib from "pdfjs-dist";
pdflib.PDFJS.workerSrc = "lib/pdf.worker.min.js";
/// #if DEPLOY_TESTING
pdflib.PDFJS.workerSrc = "test-viewer/lib/pdf.worker.min.js";
/// #endif
/// #if DEPLOY_PRODUCTION
pdflib.PDFJS.workerSrc = "viewer/lib/pdf.worker.min.js";
/// #endif

const Clipboard = require("clipboard");
const clipboard = new Clipboard("button");
