/// <reference types="astro/client" />
/// <reference types="node" />

/* eslint-disable no-var */

import "./types/node-builtins-shim";

declare global {
  var __astrid_themeInitController: AbortController | undefined;
  var __astrid_themeToggleController: AbortController | undefined;
  var __astrid_settingsMenuController: AbortController | undefined;
  var __astrid_primaryNavController: AbortController | undefined;
  var __astrid_headerAutoHideController: AbortController | undefined;
  var __astrid_footerController: AbortController | undefined;
  var __astrid_bookingAccordionsController: AbortController | undefined;
}

export {};
