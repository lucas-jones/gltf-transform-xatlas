"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AddMeshStatus: () => AddMeshStatus,
  unwrap: () => unwrap
});
module.exports = __toCommonJS(src_exports);
var import_core = require("@gltf-transform/core");

// src/xatlas/xatlas.js
var import_meta = {};
var createXAtlasModule = (() => {
  var _scriptDir = import_meta.url;
  return async function(config) {
    var createXAtlasModule2 = config || {};
    var Module = typeof createXAtlasModule2 != "undefined" ? createXAtlasModule2 : {};
    var readyPromiseResolve, readyPromiseReject;
    Module["ready"] = new Promise(function(resolve, reject) {
      readyPromiseResolve = resolve;
      readyPromiseReject = reject;
    });
    ["___getTypeName", "__embind_initialize_bindings", "_fflush", "onRuntimeInitialized"].forEach((prop) => {
      if (!Object.getOwnPropertyDescriptor(Module["ready"], prop)) {
        Object.defineProperty(Module["ready"], prop, { get: () => abort("You are getting " + prop + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"), set: () => abort("You are setting " + prop + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js") });
      }
    });
    var moduleOverrides = Object.assign({}, Module);
    var arguments_ = [];
    var thisProgram = "./this.program";
    var quit_ = (status, toThrow) => {
      throw toThrow;
    };
    var ENVIRONMENT_IS_WEB = typeof window == "object";
    var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
    var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";
    var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
    if (Module["ENVIRONMENT"]) {
      throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
    }
    var scriptDirectory = "";
    function locateFile(path) {
      if (Module["locateFile"]) {
        return Module["locateFile"](path, scriptDirectory);
      }
      return scriptDirectory + path;
    }
    var read_, readAsync, readBinary, setWindowTitle;
    function logExceptionOnExit(e) {
      if (e instanceof ExitStatus)
        return;
      let toLog = e;
      if (e && typeof e == "object" && e.stack) {
        toLog = [e, e.stack];
      }
      err("exiting due to exception: " + toLog);
    }
    if (ENVIRONMENT_IS_NODE) {
      if (typeof process == "undefined" || !process.release || process.release.name !== "node")
        throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
      const { createRequire } = await import("module");
      var require2 = createRequire(import_meta.url);
      var fs = require2("fs");
      var nodePath = require2("path");
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = nodePath.dirname(scriptDirectory) + "/";
      } else {
        scriptDirectory = require2("url").fileURLToPath(new URL("./", import_meta.url));
      }
      read_ = (filename, binary) => {
        var ret = tryParseAsDataURI(filename);
        if (ret) {
          return binary ? ret : ret.toString();
        }
        filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
        return fs.readFileSync(filename, binary ? void 0 : "utf8");
      };
      readBinary = (filename) => {
        var ret = read_(filename, true);
        if (!ret.buffer) {
          ret = new Uint8Array(ret);
        }
        assert(ret.buffer);
        return ret;
      };
      readAsync = (filename, onload, onerror) => {
        var ret = tryParseAsDataURI(filename);
        if (ret) {
          onload(ret);
        }
        filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
        fs.readFile(filename, function(err2, data) {
          if (err2)
            onerror(err2);
          else
            onload(data.buffer);
        });
      };
      if (process["argv"].length > 1) {
        thisProgram = process["argv"][1].replace(/\\/g, "/");
      }
      arguments_ = process["argv"].slice(2);
      process["on"]("uncaughtException", function(ex) {
        if (!(ex instanceof ExitStatus)) {
          throw ex;
        }
      });
      process["on"]("unhandledRejection", function(reason) {
        throw reason;
      });
      quit_ = (status, toThrow) => {
        if (keepRuntimeAlive()) {
          process["exitCode"] = status;
          throw toThrow;
        }
        logExceptionOnExit(toThrow);
        process["exit"](status);
      };
      Module["inspect"] = function() {
        return "[Emscripten Module object]";
      };
    } else if (ENVIRONMENT_IS_SHELL) {
      if (typeof process == "object" && typeof require2 === "function" || typeof window == "object" || typeof importScripts == "function")
        throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
      if (typeof read != "undefined") {
        read_ = function shell_read(f) {
          const data = tryParseAsDataURI(f);
          if (data) {
            return intArrayToString(data);
          }
          return read(f);
        };
      }
      readBinary = function readBinary2(f) {
        let data;
        data = tryParseAsDataURI(f);
        if (data) {
          return data;
        }
        if (typeof readbuffer == "function") {
          return new Uint8Array(readbuffer(f));
        }
        data = read(f, "binary");
        assert(typeof data == "object");
        return data;
      };
      readAsync = function readAsync2(f, onload, onerror) {
        setTimeout(() => onload(readBinary(f)), 0);
      };
      if (typeof scriptArgs != "undefined") {
        arguments_ = scriptArgs;
      } else if (typeof arguments != "undefined") {
        arguments_ = arguments;
      }
      if (typeof quit == "function") {
        quit_ = (status, toThrow) => {
          logExceptionOnExit(toThrow);
          quit(status);
        };
      }
      if (typeof print != "undefined") {
        if (typeof console == "undefined")
          console = {};
        console.log = print;
        console.warn = console.error = typeof printErr != "undefined" ? printErr : print;
      }
    } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = self.location.href;
      } else if (typeof document != "undefined" && document.currentScript) {
        scriptDirectory = document.currentScript.src;
      }
      if (_scriptDir) {
        scriptDirectory = _scriptDir;
      }
      if (scriptDirectory.indexOf("blob:") !== 0) {
        scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
      } else {
        scriptDirectory = "";
      }
      if (!(typeof window == "object" || typeof importScripts == "function"))
        throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
      {
        read_ = (url) => {
          try {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.send(null);
            return xhr.responseText;
          } catch (err2) {
            var data = tryParseAsDataURI(url);
            if (data) {
              return intArrayToString(data);
            }
            throw err2;
          }
        };
        if (ENVIRONMENT_IS_WORKER) {
          readBinary = (url) => {
            try {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, false);
              xhr.responseType = "arraybuffer";
              xhr.send(null);
              return new Uint8Array(xhr.response);
            } catch (err2) {
              var data = tryParseAsDataURI(url);
              if (data) {
                return data;
              }
              throw err2;
            }
          };
        }
        readAsync = (url, onload, onerror) => {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.responseType = "arraybuffer";
          xhr.onload = () => {
            if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
              onload(xhr.response);
              return;
            }
            var data = tryParseAsDataURI(url);
            if (data) {
              onload(data.buffer);
              return;
            }
            onerror();
          };
          xhr.onerror = onerror;
          xhr.send(null);
        };
      }
      setWindowTitle = (title) => document.title = title;
    } else {
      throw new Error("environment detection error");
    }
    var out = Module["print"] || console.log.bind(console);
    var err = Module["printErr"] || console.warn.bind(console);
    Object.assign(Module, moduleOverrides);
    moduleOverrides = null;
    checkIncomingModuleAPI();
    if (Module["arguments"])
      arguments_ = Module["arguments"];
    legacyModuleProp("arguments", "arguments_");
    if (Module["thisProgram"])
      thisProgram = Module["thisProgram"];
    legacyModuleProp("thisProgram", "thisProgram");
    if (Module["quit"])
      quit_ = Module["quit"];
    legacyModuleProp("quit", "quit_");
    assert(typeof Module["memoryInitializerPrefixURL"] == "undefined", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
    assert(typeof Module["pthreadMainPrefixURL"] == "undefined", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
    assert(typeof Module["cdInitializerPrefixURL"] == "undefined", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
    assert(typeof Module["filePackagePrefixURL"] == "undefined", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
    assert(typeof Module["read"] == "undefined", "Module.read option was removed (modify read_ in JS)");
    assert(typeof Module["readAsync"] == "undefined", "Module.readAsync option was removed (modify readAsync in JS)");
    assert(typeof Module["readBinary"] == "undefined", "Module.readBinary option was removed (modify readBinary in JS)");
    assert(typeof Module["setWindowTitle"] == "undefined", "Module.setWindowTitle option was removed (modify setWindowTitle in JS)");
    assert(typeof Module["TOTAL_MEMORY"] == "undefined", "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
    legacyModuleProp("read", "read_");
    legacyModuleProp("readAsync", "readAsync");
    legacyModuleProp("readBinary", "readBinary");
    legacyModuleProp("setWindowTitle", "setWindowTitle");
    assert(!ENVIRONMENT_IS_SHELL, "shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable.");
    var POINTER_SIZE = 4;
    function legacyModuleProp(prop, newName) {
      if (!Object.getOwnPropertyDescriptor(Module, prop)) {
        Object.defineProperty(Module, prop, { configurable: true, get: function() {
          abort("Module." + prop + " has been replaced with plain " + newName + " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
        } });
      }
    }
    function ignoredModuleProp(prop) {
      if (Object.getOwnPropertyDescriptor(Module, prop)) {
        abort("`Module." + prop + "` was supplied but `" + prop + "` not included in INCOMING_MODULE_JS_API");
      }
    }
    function isExportedByForceFilesystem(name) {
      return name === "FS_createPath" || name === "FS_createDataFile" || name === "FS_createPreloadedFile" || name === "FS_unlink" || name === "addRunDependency" || name === "FS_createLazyFile" || name === "FS_createDevice" || name === "removeRunDependency";
    }
    function missingGlobal(sym, msg) {
      Object.defineProperty(globalThis, sym, { configurable: true, get: function() {
        warnOnce("`" + sym + "` is not longer defined by emscripten. " + msg);
        return void 0;
      } });
    }
    missingGlobal("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");
    function missingLibrarySymbol(sym) {
      if (typeof globalThis !== "undefined" && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
        Object.defineProperty(globalThis, sym, { configurable: true, get: function() {
          var msg = "`" + sym + "` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line";
          var librarySymbol = sym;
          if (!librarySymbol.startsWith("_")) {
            librarySymbol = "$" + sym;
          }
          msg += " (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE=" + librarySymbol + ")";
          if (isExportedByForceFilesystem(sym)) {
            msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
          }
          warnOnce(msg);
          return void 0;
        } });
      }
    }
    function unexportedRuntimeSymbol(sym) {
      if (!Object.getOwnPropertyDescriptor(Module, sym)) {
        Object.defineProperty(Module, sym, { configurable: true, get: function() {
          var msg = "'" + sym + "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)";
          if (isExportedByForceFilesystem(sym)) {
            msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
          }
          abort(msg);
        } });
      }
    }
    var wasmBinary;
    if (Module["wasmBinary"])
      wasmBinary = Module["wasmBinary"];
    legacyModuleProp("wasmBinary", "wasmBinary");
    var noExitRuntime = Module["noExitRuntime"] || true;
    legacyModuleProp("noExitRuntime", "noExitRuntime");
    if (typeof WebAssembly != "object") {
      abort("no native wasm support detected");
    }
    var wasmMemory;
    var ABORT = false;
    var EXITSTATUS;
    function assert(condition, text) {
      if (!condition) {
        abort("Assertion failed" + (text ? ": " + text : ""));
      }
    }
    var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : void 0;
    function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      while (heapOrArray[endPtr] && !(endPtr >= endIdx))
        ++endPtr;
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = "";
      while (idx < endPtr) {
        var u0 = heapOrArray[idx++];
        if (!(u0 & 128)) {
          str += String.fromCharCode(u0);
          continue;
        }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 224) == 192) {
          str += String.fromCharCode((u0 & 31) << 6 | u1);
          continue;
        }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 240) == 224) {
          u0 = (u0 & 15) << 12 | u1 << 6 | u2;
        } else {
          if ((u0 & 248) != 240)
            warnOnce("Invalid UTF-8 leading byte " + ptrToString(u0) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!");
          u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
        }
        if (u0 < 65536) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 65536;
          str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
        }
      }
      return str;
    }
    function UTF8ToString(ptr, maxBytesToRead) {
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
    }
    function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
      if (!(maxBytesToWrite > 0))
        return 0;
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1;
      for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343) {
          var u1 = str.charCodeAt(++i);
          u = 65536 + ((u & 1023) << 10) | u1 & 1023;
        }
        if (u <= 127) {
          if (outIdx >= endIdx)
            break;
          heap[outIdx++] = u;
        } else if (u <= 2047) {
          if (outIdx + 1 >= endIdx)
            break;
          heap[outIdx++] = 192 | u >> 6;
          heap[outIdx++] = 128 | u & 63;
        } else if (u <= 65535) {
          if (outIdx + 2 >= endIdx)
            break;
          heap[outIdx++] = 224 | u >> 12;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
        } else {
          if (outIdx + 3 >= endIdx)
            break;
          if (u > 1114111)
            warnOnce("Invalid Unicode code point " + ptrToString(u) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
          heap[outIdx++] = 240 | u >> 18;
          heap[outIdx++] = 128 | u >> 12 & 63;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
        }
      }
      heap[outIdx] = 0;
      return outIdx - startIdx;
    }
    function stringToUTF8(str, outPtr, maxBytesToWrite) {
      assert(typeof maxBytesToWrite == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    }
    function lengthBytesUTF8(str) {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        var c = str.charCodeAt(i);
        if (c <= 127) {
          len++;
        } else if (c <= 2047) {
          len += 2;
        } else if (c >= 55296 && c <= 57343) {
          len += 4;
          ++i;
        } else {
          len += 3;
        }
      }
      return len;
    }
    var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
    function updateMemoryViews() {
      var b = wasmMemory.buffer;
      Module["HEAP8"] = HEAP8 = new Int8Array(b);
      Module["HEAP16"] = HEAP16 = new Int16Array(b);
      Module["HEAP32"] = HEAP32 = new Int32Array(b);
      Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
      Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
      Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
      Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
      Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
    }
    var STACK_SIZE = 65536;
    if (Module["STACK_SIZE"])
      assert(STACK_SIZE === Module["STACK_SIZE"], "the stack size can no longer be determined at runtime");
    var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;
    legacyModuleProp("INITIAL_MEMORY", "INITIAL_MEMORY");
    assert(INITIAL_MEMORY >= STACK_SIZE, "INITIAL_MEMORY should be larger than STACK_SIZE, was " + INITIAL_MEMORY + "! (STACK_SIZE=" + STACK_SIZE + ")");
    assert(typeof Int32Array != "undefined" && typeof Float64Array !== "undefined" && Int32Array.prototype.subarray != void 0 && Int32Array.prototype.set != void 0, "JS engine does not provide full typed array support");
    assert(!Module["wasmMemory"], "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");
    assert(INITIAL_MEMORY == 16777216, "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
    var wasmTable;
    function writeStackCookie() {
      var max = _emscripten_stack_get_end();
      assert((max & 3) == 0);
      if (max == 0) {
        max += 4;
      }
      HEAPU32[max >> 2] = 34821223;
      HEAPU32[max + 4 >> 2] = 2310721022;
      HEAPU32[0] = 1668509029;
    }
    function checkStackCookie() {
      if (ABORT)
        return;
      var max = _emscripten_stack_get_end();
      if (max == 0) {
        max += 4;
      }
      var cookie1 = HEAPU32[max >> 2];
      var cookie2 = HEAPU32[max + 4 >> 2];
      if (cookie1 != 34821223 || cookie2 != 2310721022) {
        abort("Stack overflow! Stack cookie has been overwritten at " + ptrToString(max) + ", expected hex dwords 0x89BACDFE and 0x2135467, but received " + ptrToString(cookie2) + " " + ptrToString(cookie1));
      }
      if (HEAPU32[0] !== 1668509029) {
        abort("Runtime error: The application has corrupted its heap memory area (address zero)!");
      }
    }
    (function() {
      var h16 = new Int16Array(1);
      var h8 = new Int8Array(h16.buffer);
      h16[0] = 25459;
      if (h8[0] !== 115 || h8[1] !== 99)
        throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
    })();
    var __ATPRERUN__ = [];
    var __ATINIT__ = [];
    var __ATPOSTRUN__ = [];
    var runtimeInitialized = false;
    function keepRuntimeAlive() {
      return noExitRuntime;
    }
    function preRun() {
      if (Module["preRun"]) {
        if (typeof Module["preRun"] == "function")
          Module["preRun"] = [Module["preRun"]];
        while (Module["preRun"].length) {
          addOnPreRun(Module["preRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPRERUN__);
    }
    function initRuntime() {
      assert(!runtimeInitialized);
      runtimeInitialized = true;
      checkStackCookie();
      callRuntimeCallbacks(__ATINIT__);
    }
    function postRun() {
      checkStackCookie();
      if (Module["postRun"]) {
        if (typeof Module["postRun"] == "function")
          Module["postRun"] = [Module["postRun"]];
        while (Module["postRun"].length) {
          addOnPostRun(Module["postRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPOSTRUN__);
    }
    function addOnPreRun(cb) {
      __ATPRERUN__.unshift(cb);
    }
    function addOnInit(cb) {
      __ATINIT__.unshift(cb);
    }
    function addOnPostRun(cb) {
      __ATPOSTRUN__.unshift(cb);
    }
    assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
    assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
    assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
    assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
    var runDependencies = 0;
    var runDependencyWatcher = null;
    var dependenciesFulfilled = null;
    var runDependencyTracking = {};
    function addRunDependency(id) {
      runDependencies++;
      if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies);
      }
      if (id) {
        assert(!runDependencyTracking[id]);
        runDependencyTracking[id] = 1;
        if (runDependencyWatcher === null && typeof setInterval != "undefined") {
          runDependencyWatcher = setInterval(function() {
            if (ABORT) {
              clearInterval(runDependencyWatcher);
              runDependencyWatcher = null;
              return;
            }
            var shown = false;
            for (var dep in runDependencyTracking) {
              if (!shown) {
                shown = true;
                err("still waiting on run dependencies:");
              }
              err("dependency: " + dep);
            }
            if (shown) {
              err("(end of list)");
            }
          }, 1e4);
        }
      } else {
        err("warning: run dependency added without ID");
      }
    }
    function removeRunDependency(id) {
      runDependencies--;
      if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies);
      }
      if (id) {
        assert(runDependencyTracking[id]);
        delete runDependencyTracking[id];
      } else {
        err("warning: run dependency removed without ID");
      }
      if (runDependencies == 0) {
        if (runDependencyWatcher !== null) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
        }
        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback();
        }
      }
    }
    function abort(what) {
      if (Module["onAbort"]) {
        Module["onAbort"](what);
      }
      what = "Aborted(" + what + ")";
      err(what);
      ABORT = true;
      EXITSTATUS = 1;
      var e = new WebAssembly.RuntimeError(what);
      readyPromiseReject(e);
      throw e;
    }
    var FS = { error: function() {
      abort("Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM");
    }, init: function() {
      FS.error();
    }, createDataFile: function() {
      FS.error();
    }, createPreloadedFile: function() {
      FS.error();
    }, createLazyFile: function() {
      FS.error();
    }, open: function() {
      FS.error();
    }, mkdev: function() {
      FS.error();
    }, registerDevice: function() {
      FS.error();
    }, analyzePath: function() {
      FS.error();
    }, loadFilesFromDB: function() {
      FS.error();
    }, ErrnoError: function ErrnoError() {
      FS.error();
    } };
    Module["FS_createDataFile"] = FS.createDataFile;
    Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
    var dataURIPrefix = "data:application/octet-stream;base64,";
    function isDataURI(filename) {
      return filename.startsWith(dataURIPrefix);
    }
    function isFileURI(filename) {
      return filename.startsWith("file://");
    }
    function createExportWrapper(name, fixedasm) {
      return function() {
        var displayName = name;
        var asm2 = fixedasm;
        if (!fixedasm) {
          asm2 = Module["asm"];
        }
        assert(runtimeInitialized, "native function `" + displayName + "` called before runtime initialization");
        if (!asm2[name]) {
          assert(asm2[name], "exported native function `" + displayName + "` not found");
        }
        return asm2[name].apply(null, arguments);
      };
    }
    var wasmBinaryFile;
    wasmBinaryFile = "data:application/octet-stream;base64,AGFzbQEAAAAB+gEkYAJ/fwF/YAF/AGACf38AYAN/f38Bf2ADf39/AGABfwF/YAAAYAABf2AFf39/f38AYAR/f39/AGAGf39/f39/AGABfQF9YAN/fn8BfmAEf39/fwF/YAV/f39/fwF/YAJ/fwF9YAN/f38BfWADf398AGADf319AGABfAF9YAJ8fwF8YAZ/fH9/f38Bf2AKf39/f39/f39/fwBgB39/f39/f38AYAN/f30AYAZ/fX9/f38Bf2ACf30AYAN/f30Bf2ADf31/AGAEf31/fwF/YAV/f39/fQF/YAJ9fQF9YAJ9fwF/YAd/f39/f39/AX9gAn5/AX9gBH9/fn4AAuoEFANlbnYPb25BdGxhc1Byb2dyZXNzAAIDZW52HV9lbWJpbmRfcmVnaXN0ZXJfdmFsdWVfb2JqZWN0AAoDZW52HV9lbWJpbmRfZmluYWxpemVfdmFsdWVfb2JqZWN0AAEDZW52GV9lbWJpbmRfcmVnaXN0ZXJfZnVuY3Rpb24ACgNlbnYjX2VtYmluZF9yZWdpc3Rlcl92YWx1ZV9vYmplY3RfZmllbGQAFgNlbnYVX2VtYmluZF9yZWdpc3Rlcl92b2lkAAIDZW52FV9lbWJpbmRfcmVnaXN0ZXJfYm9vbAAIA2VudhhfZW1iaW5kX3JlZ2lzdGVyX2ludGVnZXIACANlbnYWX2VtYmluZF9yZWdpc3Rlcl9mbG9hdAAEA2VudhtfZW1iaW5kX3JlZ2lzdGVyX3N0ZF9zdHJpbmcAAgNlbnYcX2VtYmluZF9yZWdpc3Rlcl9zdGRfd3N0cmluZwAEA2VudhZfZW1iaW5kX3JlZ2lzdGVyX2VtdmFsAAIDZW52HF9lbWJpbmRfcmVnaXN0ZXJfbWVtb3J5X3ZpZXcABANlbnYVZW1zY3JpcHRlbl9tZW1jcHlfYmlnAAQWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQhmZF93cml0ZQANA2VudhZlbXNjcmlwdGVuX3Jlc2l6ZV9oZWFwAAUDZW52BWFib3J0AAYWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQhmZF9jbG9zZQAFA2VudhdfZW1iaW5kX3JlZ2lzdGVyX2JpZ2ludAAXFndhc2lfc25hcHNob3RfcHJldmlldzEHZmRfc2VlawAOA+AB3gEGAQYDCAQHBwEBAgEB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NCAEEAQgAAs7AQJ/QQQQ1gEiAyACNgIAQQQQ1gEiBCACNgIAQYAoIAFB0MwAQfkmQTcgA0HQzABB/SZBOCAEEAQgAAsHACAAEQYAC0sBAX8jAEEgayIFJAAgBUEIaiABIAIgAyAEIAARCABBFBDWASIAIAUoAhg2AhAgACAFKQMQNwIIIAAgBSkDCDcCACAFQSBqJAAgAAs6AQF/IwBBEGsiAyQAIAMgASACIAARBABBDBDWASIAIAMoAgg2AgggACADKQMANwIAIANBEGokACAACwcAIAARBwALTwECfyMAQdAAayIDJAAgA0EkaiIEIAFBLBCuARogAyACKQIQNwMYIAMgAikCCDcDECADIAIpAgA3AwggBCADQQhqIAARAgAgA0HQAGokAAsqAQJ/IwBBMGsiAiQAIAJBBGoiAyABQSwQrgEaIAMgABEBACACQTBqJAALPAEBfyMAQSBrIgIkACACIAEpAhA3AxggAiABKQIINwMQIAIgASkCADcDCCACQQhqIAARAQAgAkEgaiQAC0UBAX8jAEEgayICJAAgAkEIaiABIAARAgBBFBDWASIAIAIoAhg2AhAgACACKQMQNwIIIAAgAikDCDcCACACQSBqJAAgAAs8AQF/IwBBIGsiAiQAIAIgASgCEDYCGCACIAEpAgg3AxAgAiABKQIANwMIIAJBCGogABEBACACQSBqJAALKwEBfyMAQTBrIgEkACABIAARAQBBLBDWASABQSwQrgEhACABQTBqJAAgAAtDAQF/IwBBIGsiASQAIAFBCGogABEBAEEYENYBIgAgASkDGDcCECAAIAEpAxA3AgggACABKQMINwIAIAFBIGokACAACwkAIAEgABEBAAsNACABIAAoAgBqKAIACw8AIAEgACgCAGogAjYCAAsNACABIAAoAgBqKgIACw8AIAEgACgCAGogAjgCAAsNACABIAAoAgBqLQAACw8AIAEgACgCAGogAjoAAAvjAgEFfyAAKAIEIgEEQAJAIAAoAhxBAEoEQANAAkAgACgCBCAEQRhsaiICKAIAIgFFDQAgAigCDARAQQAhAQNAAkAgAigCACABQRRsaigCACIDRQ0AQZjPACgCACIFBEAgAyAFEQEADAELIANBAEGUzwAoAgARAAAaCyABQQFqIgEgAigCDEkNAAsgAigCACIBRQ0BC0GYzwAoAgAiAwRAIAEgAxEBAAwBCyABQQBBlM8AKAIAEQAAGgsCQCACKAIIIgFFDQBBmM8AKAIAIgMEQCABIAMRAQAMAQsgAUEAQZTPACgCABEAABoLAkAgAigCBCIBRQ0AQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCyAEQQFqIgQgACgCHEgNAAsgACgCBCIBRQ0BC0GYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsgAEEANgIECwulAQECfwJAIABFBEBBkM8AKAIAIgBFDQFBkyRBACAAEQAAGg8LIAAoApQBDQAgACgCJEUNACAAKAJoIABBKGoQRwJAIAAoAiQiASgCCCICBEAgASgCBEHkACABKAIMIAIRAwBFBEAgAUEBOgAACyAAKAIkIgFFDQELQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCyAAQQA2AiQLC6oEAQJ/IABBwAFqEEkCQCAAKAKwASIBRQ0AQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCwJAIAAoAqABIgFFDQBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLAkAgACgCkAEiAUUNAEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsCQCAAKAJ8IgFFDQBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLAkAgACgCbCIBRQ0AQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCwJAIAAoAlwiAUUNAEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsCQCAAKAJMIgFFDQBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLAkAgACgCPCIBRQ0AQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCwJAIAAoAiwiAUUNAEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsCQCAAKAIcIgFFDQBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLIAAoAgwiAQRAQZjPACgCACICBEAgASACEQEAIAAPCyABQQBBlM8AKAIAEQAAGgsgAAttAQN/IAEoAgAiAkF/RwRAIAAoAgAgAkECdGooAgAiAigCCARAA0AgAigCECACKAIAIANBA3RqIgQoAgQgBCgCABECACADQQFqIgMgAigCCEkNAAsLIAJBADYCCCAAIAEoAgAQSCABQX82AgALC38BA38gACgCACABQQJ0aigCACIDBEACQCADKAIAIgJFDQBBmM8AKAIAIgQEQCACIAQRAQAMAQsgAkEAQZTPACgCABEAABoLAkBBmM8AKAIAIgIEQCADIAIRAQAMAQsgA0EAQZTPACgCABEAABoLIAAoAgAgAUECdGpBADYCAAsLkwEBAn8CQCAAKAIMIgFFDQBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLAkAgACgCICIBRQ0AQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCyAAKAIQIgAEQEGYzwAoAgAiAQRAIAAgAREBAA8LIABBAEGUzwAoAgARAAAaCwukAQIDfwF9AkAgACgCCEUNAAJ/IAAoAhCzIAAoAhSzlUMAAMhClI0iBEMAAIBPXSAEQwAAAABgcQRAIASpDAELQQALIgIgACgCGEYNAAJAIAAoAhgiASACTw0AA0AgACACIAAoAhgiAyABIANGIgEbNgIYIAENASADIQEgAiADSw0ACwsgACgCBCAAKAIYIAAoAgwgACgCCBEDAA0AIABBAToAAAsL1QMAIABCgICAgMAANwJ8IABCgICAgMAANwJsIABCgICAgIABNwJcIABCgICAgMABNwJMIABCgICAgMABNwI8IABCgICAgMAANwIsIABCgICAgMAANwIcIABCgICAgBA3AgwgACAFNgIIIAAgBDYCBCAAIAE4AgAgAEIANwJ0IABCADcCZCAAQgA3AlQgAEIANwJEIABCADcCNCAAQgA3AiQgAEIANwIUIABCADcCjAEgAEIANwKEASAAIANBA2wiBDYCxAEgAEIENwKUASAAQgA3ApwBIABCBDcCpAEgAEIANwKsASAAQgQ3ArQBIABCgICAgPAANwK8ASAAQgA3AsgBIABCgICAgIABNwLQASAAQgA3AtgBIABCgICAgMAANwLgASAAQgA3AugBIAQEfyAAQSxqIAQQTiAAKAJIBUEA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aigCACESIBAgA0EMbGoiACACIANBMGxqNgIIIAAgCCADQQR0ajYCBCAAIBI2AgAgA0EBaiIDIAVHDQALQQAhAyAEQQA2ArQBIARCgICAgMAANwOoASAEIAU2ArABIAUNAQsgBCgCqAEhAAwBCyAEQagBaiAFEE4gBygCACECIAQoAqgBIQADQCAAIANBAnQiCGogAiAIaigCACgCNLM4AgAgA0EBaiIDIAVHDQALCyAEQgA3A5gBIARCADcDiAFBACEDIARBADoAoAEgBCAANgJwIAQgBCgCsAE2AnQgBEKAgICAwAA3A5ABIARCgICAgMAANwOAASAEIAQpA3A3AwggBEH4AGogBEEIahBZIARBAEHUBEGUzwAoAgARAAAiADYCaCAAQgA3AiwgAEEAOwEoIABCgICAgBQ3AiAgAEKAgICEhICAgD83AhggAEKKro/hg4CA4MAANwIQIABCgICAgICAgIDAADcCCCAAQgA3AgAgAEEMNgJ0IABCADcCbCAAQgQ3AmQgAEIANwJcIABCBDcCVCAAQgA3AkwgAEIENwJEIABCADcCPCAAQgQ3AjQgAEIANwJ4IABCADcCgAEgAEEANgKQASAAQgQ3AogBIABCADcC0AEgAEKAgICAwAE3AsgBIABCADcCwAEgAEKAgICAwAA3ArgBIABCADcCsAEgAEKAgICAwAQ3AqgBIABCADcCoAEgAEKAgICAgAE3ApgBIAAgADYClAEgAEHYAWoiAkKAgICAwAQ3AmQgAEKAgICAwAA3AqwCIABCgICAgIABNwKcAiAAQoCAgIDAADcCjAIgAEKAgICAwAA3AvwBIABCgICAgMAANwLsASAAQoCAgIDAADcC3AEgACAANgLYASAAQgA3AsQCIABCADcCtAIgAEIANwKkAiAAQgA3ApQCIABCADcChAIgAEIANwL0ASAAQgA3AuQBIABCCjcCiAMgAEKAgICAwAA3AvgCIABCgICAgMAANwLoAiAAQoCAgICAATcC1AIgACACNgLQAiAAIAA2AswCIABBADYC4AMgAEEENgKwAyAAQgA3AqgDIABCDDcCoAMgAEIANwKYAyAAQgg3ApADIABCADcCgAMgAEIANwLwAiAAQgA3AtwCIABCADcCtAMgAEIANwK8AyAAQgA3AsQDIABBBDYCxAQgAEIANwK8BCAAQgQ3ArQE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BCASKgIsIgeUkzgCJCASIBIqAjAiCCAElCAGIAOUkzgCICASIAcgBpQgBSAIlJM4AhwLIAFBBGogEkEQakEkEK4BGiABKgIoIQUgACgCBCgCFCERIAAoAgAoAlAhFCACIRUDQCAFIBQgFUECdCIVaioCAJIhBSARIBVqKAIAIhUgAkcNAAsgASAFOAIoIAEgACABIAIQgAE4AiwCQCATIBtJBEADQCAAKAIcIAEoAkggE0ECdGooAgAiAkECdGogASgCADYCACAAIAAoAhhBAWs2AhggACgCACIVKAKEASACQQN2Qfz///8BcWoiESARKAIAQQEgAnRyNgIAIBIgFSgCLCACEIEBIAEgEioCACABKgIwkiIFOAIwIAEgEioCBCABKgI0kiIDOAI0IAEgEioCCCABKgI4kiIEOAI4IBNBAWoiEyAbRw0ADAILAAsgASoCOCEEIAEqAjQhAyABKgIwIQULIAFBADYCdCABQwAAgD8gASgCULOVIgYgBJQ4AkQgAUFAayAGIAOUOAIAIAEgBSAGlDgCPCAbRQRAQQEhAgwCCyABQegAaiEgA0AgHCgCACAfQQJ0aigCAEEDbCEhQQAhFQNAAkAgACgCACICKAIsKAKwASAVICFqQQJ0aigCACITQX9GDQAgAigChAEgE0EDbiITQQN2Qfz///8AcWooAgAgE3ZBAXENACABKAJgIhEEQEEAIQIgACgCBCgCJCATQQJ0aigCACIUIAEoAlgiGCgCAEYNAQNAIBEgAkEBaiICRwRAIBggAkECdGooAgAgFEcNAQsLIAIgEUkNAQsgASoCKCEFIAAoAgQoAhQhESAAKAIAKAJQIRQgEyECA0AgBSAUIAJBAnQiAmoqAgCSIQUgAiARaigCACICIBNHDQALIAAgASATEIABIQZD//9/fyEEAkAgACgCACICKgIEIgNDAAAAAF4gAyAFXXENACACKgIIIgNDAAAAAF4gAyAGXXENAEMAAIA/IAIoAnAgE0EMbGoiESoCCCABKgIklCARKgIAIAEqAhyUIBEqAgQgASoCIJSSkpMiA0MAAIA/IANDAACAP10bIglD9P00P2ANACACKgIMIQpDAAAAACEDQwAAAAAhByATIRgDQCAAKAIAKAIsIQJBACERIBhBA2wiHSEUA0ACQCAUQQJ0IhYgAigCsAFqKAIAIhdBf0YN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cSEDAkACQCAAIAFJBEAgAw0CIABBA3FFDQEDQCACRQ0EIAAgAS0AADoAACABQQFqIQEgAkEBayECIABBAWoiAEEDcQ0ACwwBCwJAIAMNACAEQQNxBEADQCACRQ0FIAAgAkEBayICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQQRrIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkEBayICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AA0AgACABKAIANgIAIAFBBGohASAAQQRqIQAgAkEEayICQQNLDQALCyACRQ0AA0AgACABLQAAOgAAIABBAWohACABQQFqIQEgAkEBayICDQALCwvyAgICfwF+AkAgAkUNACAAIAE6AAAgACACaiIDQQFrIAE6AAAgAkEDSQ0AIAAgAToAAiAAIAE6AAEgA0EDayABOgAAIANBAmsgAToAACACQQdJDQAgACABOgADIANBBGsgAToAACACQQlJDQAgAEEAIABrQQNxIgRqIgMgAUH/AXFBgYKECGwiATYCACADIAIgBGtBfHEiBGoiAkEEayABNgIAIARBCUkNACADIAE2AgggAyABNgIEIAJBCGsgATYCACACQQxrIAE2AgAgBEEZSQ0AIAMgATYCGCADIAE2AhQgAyABNgIQIAMgATYCDCACQRBrIAE2AgAgAkEUayABNgIAIAJBGGsgATYCACACQRxrIAE2AgAgBCADQQRxQRhyIgRrIgJBIEkNACABrUKBgICAEH4hBSADIARqIQEDQCABIAU3AxggASAFNwMQIAEgBTcDCCABIAU3AwAgAUEgaiEBIAJBIGsiAkEfSw0ACwsgAAssAQF/IwBBEGsiAiQAIAIgATYCDCAAIAFB0ABB0QAQxQEhACACQRBqJAAgAAsnAQF/IwBBEGsiAiQAIAIgATYCDCAAIAFBAEEAEMUBGiACQRBqJAALqQEBBX8jAEHwAWsiBCQAIAQgADYCAEEBIQUCQCABQQJIDQAgACEDA0AgACADQRBrIgMgAiABQQJrIgdBAnRqKAIAayIGQcUAELoBQQBOBEAgACADQcUAELoBQQBODQILIAQgBUECdGogBiADIAYgA0HFABC6AUEATiIGGyIDNgIAIAVBAWohBSABQQFrIAcgBhsiAUEBSg0A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xAEhACABKAIAQUBqCzYCACAADwsgASACQf4HazYCACADQv////////+HgH+DQoCAgICAgIDwP4S/BSAACwuGAwEEfyMAQdABayIEJAAgBCABNgLMASAEQaABaiIBQQBBKBCwARogBCAEKALMATYCyAECQEEAIAAgBEHIAWogBEHQAGogASACIAMQxgFBAEgEQEF/IQMMAQtBASAFQezPACgCAEEAThshBUGgzwAoAgAhBkHozwAoAgBBAEwEQEGgzwAgBkFfcTYCAAsCfwJAAkBB0M8AKAIARQRAQdDPAEHQADYCAEG8zwBBADYCAEGwzwBCADcDAEHMzwAoAgAhB0HMzwAgBDYCAAwBC0GwzwAoAgANAQtBf0GgzwAQwQENARoLQaDPACAAIARByAFqIARB0ABqIARBoAFqIAIgAxDGAQshASAHBEBBoM8AQQBBAEHEzwAoAgARAwAaQdDPAEEANgIAQczPACAHNgIAQbzPAEEANgIAQbTPACgCACEAQbDPAEIANwMAIAFBfyAAGyEBC0GgzwBBoM8AKAIAIgAgBkEgcXI2AgBBfyABIABBIHEbIQMgBUUNAAsgBEHQAWokACADC5cUAhJ/AX4jAEHQAGsiCCQAIAggATYCTCAIQTdqIRcgCEE4aiETAkACQAJAAkADQCABIQ0gByAPQf////8Hc0oNASAHIA9qIQ8CQAJAAkAgDSIHLQAAIgkEQANAAkACQCAJQf8BcSIBRQRAIAchAQwBCyABQSVHDQEgByEJA0AgCS0AAUElRwRAIAkhAQwCCyAHQQFqIQcgCS0AAiELIAlBAmoiASEJIAtBJUYNAAsLIAcgDWsiByAPQf////8HcyIYSg0HIAAEQCAAIA0gBxDHAQsgBw0GIAggATYCTCABQQFqIQdBfyERAkAgASwAARDCAUUNACABLQACQSRHDQAgAUEDaiEHIAEsAAFBMGshEUEBIRQLIAggBzYCTEEAIQwCQCAHLAAAIglBIGsiAUEfSwRAIAchCwwBCyAHIQtBASABdCIBQYnRBHFFDQADQCAIIAdBAWoiCzYCTCABIAxyIQwgBywAASIJQSBrIgFBIE8NASALIQdBASABdCIBQYnRBHENAAsLAkAgCUEqRgRAAn8CQCALLAABEMIBRQ0AIAstAAJBJEcNACALLAABQQJ0IARqQcABa0EKNgIA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gMAAfCECDAILIANCgICAgICAgIBAfSECIARCgICAgICAgIAIUg0BIAIgA0IBg3whAgwBCyAEUCADQoCAgICAgMD//wBUIANCgICAgICAwP//AFEbRQRAIAVCBIYgBEI8iIRC/////////wODQoCAgICAgID8/wCEIQIMAQtCgICAgICAgPj/ACECIANC////////v//DAFYNAEIAIQIgA0IwiKciAUGR9wBJDQAgBCECIAVC////////P4NCgICAgICAwACEIgMhBgJAIAFBgfcAayIIQcAAcQRAIAIgCEFAaq2GIQZCACECDAELIAhFDQAgBiAIrSIHhiACQcAAIAhrrYiEIQYgAiAHhiECCyAAIAI3AxAgACAGNwMYAkBBgfgAIAFrIgFBwABxBEAgAyABQUBqrYghBEIAIQMMAQsgAUUNACADQcAAIAFrrYYgBCABrSICiIQhBCADIAKIIQMLIAAgBDcDACAAIAM3AwggACkDCEIEhiAAKQMAIgRCPIiEIQIgACkDECAAKQMYhEIAUq0gBEL//////////w+DhCIEQoGAgICAgICACFoEQCACQgF8IQIMAQsgBEKAgICAgICAgAhSDQAgAkIBgyACfCECCyAAQSBqJAAgAiAFQoCAgICAgICAgH+DhL85AwALFgAgAEUEQEEADwtBkNoAIAA2AgBBfwuZAgAgAEUEQEEADwsCfwJAIAAEfyABQf8ATQ0BAkBBrNsAKAIAKAIARQRAIAFBgH9xQYC/A0YNAwwBCyABQf8PTQRAIAAgAUE/cUGAAXI6AAEgACABQQZ2QcABcjoAAEECDAQLIAFBgEBxQYDAA0cgAUGAsANPcUUEQCAAIAFBP3FBgAFyOgACIAAgAUEMdkHgAXI6AAAgACABQQZ2QT9xQYABcjoAAUEDDAQLIAFBgIAEa0H//z9NBEAgACABQT9xQYABcjoAAyAAIAFBEnZB8AFyOgAAIAAgAUEGdkE/cUGAAXI6AAIgACABQQx2QT9xQYABcjoAAUEEDAQLC0GQ2gBBGTYCAEF/BUEBCwwBCyAAIAE6AABBAQsL7wMBBX8Cf0G00AAoAgAiASAAQQdqQXhxIgNqIQICQCADQQAgASACTxsNACACPwBBEHRLBEAgAhAPRQ0BC0G00AAgAjYCACABDAELQZDaAEEwNgIAQX8LIgJBf0cEQCAA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ZXJ0ZXhDb3VudABuZXdJbmRleENvdW50AG1fbWVzaENoYXJ0R3JvdXBzLnNpemUoKSA9PSBtZXNoQ291bnQAdW5zaWduZWQgaW50AHRleGVsc1BlclVuaXQAc3RyYWlnaHRuZXNzV2VpZ2h0AHJvdW5kbmVzc1dlaWdodABub3JtYWxEZXZpYXRpb25XZWlnaHQAbm9ybWFsU2VhbVdlaWdodAB0ZXh0dXJlU2VhbVdlaWdodABpbmRleE9mZnNldABvcmlnaW5hbEluZGV4T2Zmc2V0AHV2T2Zmc2V0AHBvc2l0aW9uT2Zmc2V0AG5vcm1hbE9mZnNldABmbG9hdAB1aW50NjRfdAB1c2VJbnB1dE1lc2hVdnMAQ29tcHV0aW5nIGNoYXJ0cwBQYWNraW5nIGNoYXJ0cwBwYWNrQ2hhcnRzAGNvbXB1dGVDaGFydHMAcm90YXRlQ2hhcnRzAGRlZmF1bHRDaGFydE9wdGlvbnMAZGVmYXVsdFBhY2tPcHRpb25zAG1heEl0ZXJhdGlvbnMAcm90YXRlQ2hhcnRzVG9BeGlzAEJ1aWxkaW5nIG91dHB1dCBtZXNoZXMAZGVzdHJveUF0bGFzAGdlbmVyYXRlQXRsYXMAY3JlYXRlQXRsYXMAcGxhbmFyAHVuc2lnbmVkIGNoYXIAYmlsaW5lYXIAc291cmNlL3hhdGxhcy94YXRsYXMuY3BwAG9ydGhvAFV2TWVzaEJ1ZmZlckluZm8AQXRsYXNNZXNoQnVmZmVySW5mbwByZXNvbHV0aW9uAGJsb2NrQWxpZ24AbmFuAGJvb2wAZW1zY3JpcHRlbjo6dmFsAGRvTGVha0NoZWNrAG1heEJvdW5kYXJ5TGVuZ3RoAGNyZWF0ZVV2TWVzaABhZGRVdk1lc2gAY3JlYXRlTWVzaABhZGRNZXNoAHVuc2lnbmVkIGxvbmcAc3RkOjp3c3RyaW5nAHN0ZDo6c3RyaW5nAHN0ZDo6dTE2c3RyaW5nAHN0ZDo6dTMyc3RyaW5nAHNldFByb2dyZXNzTG9nZ2luZwBmaXhXaW5kaW5nAHBhZGRpbmcAaW5mAG1heENoYXJ0U2l6ZQBwaWVjZXdpc2UAZG91YmxlAGNyZWF0ZUltYWdlAGJydXRlRm9yY2UAdm9pZABncm91cCA8IGtJbnZhbGlkAG1lc2hJZABkZXN0cm95TWVzaERhdGEAZ2V0TWVzaERhdGEAbWF4Q2hhcnRBcmVhACVzIFsATkFOAExTQ00ASU5GAGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHNob3J0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBzaG9ydD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBpbnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGZsb2F0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQ4X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50MzJfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50MzJfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8Y2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgY2hhcj4Ac3RkOjpiYXNpY19zdHJpbmc8dW5zaWduZWQgY2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8c2lnbmVkIGNoYXI+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGxvbmc+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIGxvbmc+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGRvdWJsZT4AdGV4Y29vcmQueCA+PSAwICYmIHRleGNvb3JkLnkgPj0gMAAuACoAaXNGaW5pdGUodGV4Y29vcmQueCkgJiYgaXNGaW5pdGUodGV4Y29vcmQueSkAQWRkaW5nIG1lc2goZXMpAGlzRmluaXRlKG1ham9yQXhpcykgJiYgaXNGaW5pdGUobWlub3JBeGlzKSAmJiBpc0Zpbml0ZShtaW5Db3JuZXIpAHNpZ21hMiA+IHNpZ21hMSB8fCBlcXVhbChzaWdtYTEsIHNpZ21hMiwga0Vwc2lsb24pAChudWxsKQBpc05vcm1hbGl6ZWQobm9ybWFsKQBpc0Zpbml0ZShzY2FsZSkAIAAgICBOQU4gdGV4dHVyZSBjb29yZGluYXRlIGluIHZlcnRleCAldQoAICAgJXUgdC1qdW5jdGlvbnMgZm91bmQgaW4gJXUgY2hhcnRzCgBQYWNraW5nICV1IGNoYXJ0cwoAICAgVVYgbWVzaCAldTogJXUgdmVydGljZXMsICV1IHRyaWFuZ2xlcywgJXUgY2hhcnRzCgAgICBNZXNoICV1OiAldSB2ZXJ0aWNlcywgJXUgdHJpYW5nbGVzLCAldSBjaGFydHMKACAgICV1IGNoYXJ0cwoAQ29tcHV0aW5nIGNoYXJ0cwoAICAgJXUgY2hhcnRzIHdpdGggaW52YWxpZCBwYXJhbWV0ZXJpemF0aW9ucwoAQWRkaW5nIG1lc2ggJWQ6ICV1IHZlcnRpY2VzLCAldSBwb2x5Z29ucwoAQWRkaW5nIG1lc2ggJWQ6ICV1IHZlcnRpY2VzLCAldSB0cmlhbmdsZXMKAEFkZGluZyBVViBtZXNoICVkOiAldSB2ZXJ0aWNlcywgJXUgdHJpYW5nbGVzCgBCdWlsZGluZyBvdXRwdXQgbWVzaGVzCgAgICBSZXNpemluZyBjaGFydCAldSBmcm9tICVneCVnIHRvICV1eCV1IHRvIGZpdCBhdGxhcwoAICAgICAgJXUgd2l0aCBvcmlnaW5hbCBVVnMKACAgIENhbmNlbGxlZCBieSB1c2VyCgAgICAlZHglZCByZXNvbHV0aW9uCgAgICAldTogJWYlJSB1dGlsaXphdGlvbgoAICAgJWYlJSB1dGlsaXphdGlvbgoAICAgaW5zdGFuY2Ugb2YgYSBwcmV2aW91cyBVViBtZXNoCgAgICBFc3RpbWF0aW5nIHRleGVsc1BlclVuaXQgYXMgJWcKACAgIFplcm8gYXJlYSBmYWNlOiAlZCwgYXJlYSBpcyAlZgoAICAgWmVybyBhcmVhIGZhY2U6ICVkLCBpbmRpY2VzICglZCAlZCAlZCksIGFyZWEgaXMgJWYKACAgICAgICV1IHBsYW5hciwgJXUgb3J0aG8sICV1IExTQ00sICV1IHBpZWNld2lzZQoAICAgJXUgYWRkaXRpb25hbCB3YXJuaW5ncyB0cnVuY2F0ZWQKACAgIERlZ2VuZXJhdGUgZWRnZTogaW5kZXggJWQsIGluZGV4ICVkCgANQVNTRVJUOiAlcyAlcyAlZAoAICAgTkFOIHBvc2l0aW9uIGluIGZhY2U6ICVkCgAgICBOQU4gbm9ybWFsIGluIGZhY2U6ICVkCgAgICBOQU4gdGV4dHVyZSBjb29yZGluYXRlIGluIGZhY2U6ICVkCgAgICBDaGFydCAldSAobWVzaCAldSwgZ3JvdXAgJXUsIGlkICV1KSAoJXMpOiBpbnZhbGlkIHBhcmFtZXRlcml6YXRpb24sIHNlbGYtaW50ZXJzZWN0aW5nIGJvdW5kYXJ5LgoAUGFja0NoYXJ0czogTm8gbWVzaGVzLiBDYWxsIEFkZE1lc2ggb3IgQWRkVXZNZXNoIGZpcnN0LgoAQ29tcHV0ZUNoYXJ0czogTm8gbWVzaGVzLiBDYWxsIEFkZE1lc2ggb3IgQWRkVXZNZXNoIGZpcnN0LgoAR2VuZXJhdGU6IE5vIG1lc2hlcy4gQ2FsbCBBZGRNZXNoIG9yIEFkZFV2TWVzaCBmaXJzdC4KAFBhY2tDaGFydHM6IENvbXB1dGVDaGFydHMgbXVzdCBiZSBjYWxsZWQgZmlyc3QuCgAgICBDaGFydCAldSAgKG1lc2ggJXUsIGdyb3VwICV1LCBpZCAldSkgKCVzKTogaW52YWxpZCBwYXJhbWV0ZXJpemF0aW9uLCAldSAvICV1IGZsaXBwZWQgdHJpYW5nbGVzLgoAICAgQ2hhcnQgJXUgIChtZXNoICV1LCBncm91cCAldSwgaWQgJXUpICglcyk6IGludmFsaWQgcGFyYW1ldGVyaXphdGlvbiwgJXUgLyAldSB6ZXJvIGFyZWEgdHJpYW5nbGVzLgoAQWRkVXZNZXNoOiBNZXNoZXMgYW5kIFVWIG1lc2hlcyBjYW5ub3QgYmUgYWRkZWQgdG8gdGhlIHNhbWUgYXRsYXMuCgBBZGRNZXNoOiBNZXNoZXMgYW5kIFVWIG1lc2hlcyBjYW5ub3QgYmUgYWRkZWQgdG8gdGhlIHNhbWUgYXRsYXMuCgBQYWNrQ2hhcnRzOiBhdGxhcyBpcyBudWxsLgoAQ29tcHV0ZUNoYXJ0czogYXRsYXMgaXMgbnVsbC4KAEFkZE1lc2hKb2luOiBhdGxhcyBpcyBudWxsLgoAU2V0UHJvZ3Jlc3NDYWxsYmFjazogYXRsYXMgaXMgbnVsbC4KAEFkZFV2TWVzaDogYXRsYXMgaXMgbnVsbC4KAEFkZE1lc2g6IGF0bGFzIGlzIG51bGwuCgBHZW5lcmF0ZTogYXRsYXMgaXMgbnVsbC4KAFBhY2tDaGFydHM6IFBhY2tPcHRpb25zOjp0ZXhlbHNQZXJVbml0IGlzIG5lZ2F0aXZlLgoAICAgQ2hhcnQgJXUgZXh0ZW50cyBhcmUgbGFyZ2UgKCVneCVnKQoAICAgWmVybyBsZW5ndGggZWRnZTogaW5kZXggJWQgcG9zaXRpb24gKCVnICVnICVnKSwgaW5kZXggJWQgcG9zaXRpb24gKCVnICVnICVnKQoAXSAlZCUlCgAxNE1lc2hCdWZmZXJJbmZvAAAAAPwmAABYEwAAaQB2aQBpaWkAdmlpaQAxNlV2TWVzaEJ1ZmZlckluZm8AAAAA/CYAAIITAAAxOUF0bGFzTWVzaEJ1ZmZlckluZm8AAAD8JgAAoBMAAE42eGF0bGFzMTJDaGFydE9wdGlvbnNFAPwmAADAEwAAZmlpAHZpaWYATjZ4YXRsYXMxMVBhY2tPcHRpb25zRQD8JgAA6RMAAEQmAAAAAAAAbBMAAKQmAACkJgAAUCYAAFAmAABpaWlpaWkAAJgTAACYJgAAmCYAAGlpaWkAAAAApCYAAGlpAABEJgAA2BMAAAAUAABEJgAA2BMAAHZpaQBEJgAAABQAALgTAACkJgAARCYAALgTAADYEwAAABQAAEQmAABQJgBBkCkLtAf/////AAAAAAEAAAD/////AQAAAP////8AAAAAAQAAAP///////////////wAAAAAAAAAAAQAAAAEAAAABAAAApwoAAFIFAABjBQAA4AUAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFAAD8JgAA4BQAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0loTlNfMTFjaGFyX3RyYWl0c0loRUVOU185YWxsb2NhdG9ySWhFRUVFAAD8JgAAKBUAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0l3TlNfMTFjaGFyX3RyYWl0c0l3RUVOU185YWxsb2NhdG9ySXdFRUVFAAD8JgAAcBUAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0lEc05TXzExY2hhcl90cmFpdHNJRHNFRU5TXzlhbGxvY2F0b3JJRHNFRUVFAAAA/CYAALgVAABOU3QzX18yMTJiYXNpY19zdHJpbmdJRGlOU18xMWNoYXJfdHJhaXRzSURpRUVOU185YWxsb2NhdG9ySURpRUVFRQAAAPwmAAAEFgAATjEwZW1zY3JpcHRlbjN2YWxFAAD8JgAAUBYAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWNFRQAA/CYAAGwWAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lhRUUAAPwmAACUFgAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJaEVFAAD8JgAAvBYAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SXNFRQAA/CYAAOQWAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0l0RUUAAPwmAAAMFwAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJaUVFAAD8JgAANBcAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWpFRQAA/CYAAFwXAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lsRUUAAPwmAACEFwAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJbUVFAAD8JgAArBcAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWZFRQAA/CYAANQXAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lkRUUAAPwmAAD8FwAA2w9JP9sPSb/kyxZA5MsWwAAAAAAAAACA2w9JQNsPScAAQdAwC/cVOGPtPtoPST9emHs/2g/JP2k3rDFoISIztA8UM2ghojMDAAAABAAAAAQAAAAGAAAAg/miAERObgD8KRUA0VcnAN009QBi28AAPJmVAEGQQwBjUf4Au96rALdhxQA6biQA0k1CAEkG4AAJ6i4AHJLRAOsd/gApsRwA6D6nAPU1ggBEuy4AnOmEALQmcABBfl8A1pE5AFODOQCc9DkAi1+EACj5vQD4HzsA3v+XAA+YBQARL+8AClqLAG0fbQDPfjYACcsnAEZPtwCeZj8ALepfALondQDl68cAPXvxAPc5BwCSUooA+2vqAB+xXwAIXY0AMANWAHv8RgDwq2sAILzPADb0mgDjqR0A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";
    if (!isDataURI(wasmBinaryFile)) {
      wasmBinaryFile = locateFile(wasmBinaryFile);
    }
    function getBinary(file) {
      try {
        if (file == wasmBinaryFile && wasmBinary) {
          return new Uint8Array(wasmBinary);
        }
        var binary = tryParseAsDataURI(file);
        if (binary) {
          return binary;
        }
        if (readBinary) {
          return readBinary(file);
        }
        throw "both async and sync fetching of the wasm failed";
      } catch (err2) {
        abort(err2);
      }
    }
    function getBinaryPromise() {
      if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
        if (typeof fetch == "function" && !isFileURI(wasmBinaryFile)) {
          return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function(response) {
            if (!response["ok"]) {
              throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
            }
            return response["arrayBuffer"]();
          }).catch(function() {
            return getBinary(wasmBinaryFile);
          });
        } else {
          if (readAsync) {
            return new Promise(function(resolve, reject) {
              readAsync(wasmBinaryFile, function(response) {
                resolve(new Uint8Array(response));
              }, reject);
            });
          }
        }
      }
      return Promise.resolve().then(function() {
        return getBinary(wasmBinaryFile);
      });
    }
    function createWasm() {
      var info = { "env": asmLibraryArg, "wasi_snapshot_preview1": asmLibraryArg };
      function receiveInstance(instance, module2) {
        var exports2 = instance.exports;
        Module["asm"] = exports2;
        wasmMemory = Module["asm"]["memory"];
        assert(wasmMemory, "memory not found in wasm exports");
        updateMemoryViews();
        wasmTable = Module["asm"]["__indirect_function_table"];
        assert(wasmTable, "table not found in wasm exports");
        addOnInit(Module["asm"]["__wasm_call_ctors"]);
        removeRunDependency("wasm-instantiate");
      }
      addRunDependency("wasm-instantiate");
      var trueModule = Module;
      function receiveInstantiationResult(result) {
        assert(Module === trueModule, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
        trueModule = null;
        receiveInstance(result["instance"]);
      }
      function instantiateArrayBuffer(receiver) {
        return getBinaryPromise().then(function(binary) {
          return WebAssembly.instantiate(binary, info);
        }).then(function(instance) {
          return instance;
        }).then(receiver, function(reason) {
          err("failed to asynchronously prepare wasm: " + reason);
          if (isFileURI(wasmBinaryFile)) {
            err("warning: Loading from a file URI (" + wasmBinaryFile + ") is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing");
          }
          abort(reason);
        });
      }
      function instantiateAsync() {
        if (!wasmBinary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(wasmBinaryFile) && !isFileURI(wasmBinaryFile) && !ENVIRONMENT_IS_NODE && typeof fetch == "function") {
          return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function(response) {
            var result = WebAssembly.instantiateStreaming(response, info);
            return result.then(receiveInstantiationResult, function(reason) {
              err("wasm streaming compile failed: " + reason);
              err("falling back to ArrayBuffer instantiation");
              return instantiateArrayBuffer(receiveInstantiationResult);
            });
          });
        } else {
          return instantiateArrayBuffer(receiveInstantiationResult);
        }
      }
      if (Module["instantiateWasm"]) {
        try {
          var exports = Module["instantiateWasm"](info, receiveInstance);
          return exports;
        } catch (e) {
          err("Module.instantiateWasm callback failed with error: " + e);
          readyPromiseReject(e);
        }
      }
      instantiateAsync().catch(readyPromiseReject);
      return {};
    }
    var tempDouble;
    var tempI64;
    function ExitStatus(status) {
      this.name = "ExitStatus";
      this.message = "Program terminated with exit(" + status + ")";
      this.status = status;
    }
    function callRuntimeCallbacks(callbacks) {
      while (callbacks.length > 0) {
        callbacks.shift()(Module);
      }
    }
    function intArrayToString(array) {
      var ret = [];
      for (var i = 0; i < array.length; i++) {
        var chr = array[i];
        if (chr > 255) {
          if (ASSERTIONS) {
            assert(false, "Character code " + chr + " (" + String.fromCharCode(chr) + ")  at offset " + i + " not in 0x00-0xFF.");
          }
          chr &= 255;
        }
        ret.push(String.fromCharCode(chr));
      }
      return ret.join("");
    }
    function ptrToString(ptr) {
      assert(typeof ptr === "number");
      return "0x" + ptr.toString(16).padStart(8, "0");
    }
    function warnOnce(text) {
      if (!warnOnce.shown)
        warnOnce.shown = {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE)
          text = "warning: " + text;
        err(text);
      }
    }
    var structRegistrations = {};
    function runDestructors(destructors) {
      while (destructors.length) {
        var ptr = destructors.pop();
        var del = destructors.pop();
        del(ptr);
      }
    }
    function simpleReadValueFromPointer(pointer) {
      return this["fromWireType"](HEAP32[pointer >> 2]);
    }
    var awaitingDependencies = {};
    var registeredTypes = {};
    var typeDependencies = {};
    var char_0 = 48;
    var char_9 = 57;
    function makeLegalFunctionName(name) {
      if (void 0 === name) {
        return "_unknown";
      }
      name = name.replace(/[^a-zA-Z0-9_]/g, "$");
      var f = name.charCodeAt(0);
      if (f >= char_0 && f <= char_9) {
        return "_" + name;
      }
      return name;
    }
    function createNamedFunction(name, body) {
      name = makeLegalFunctionName(name);
      return new Function("body", "return function " + name + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(body);
    }
    function extendError(baseErrorType, errorName) {
      var errorClass = createNamedFunction(errorName, function(message) {
        this.name = errorName;
        this.message = message;
        var stack = new Error(message).stack;
        if (stack !== void 0) {
          this.stack = this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "");
        }
      });
      errorClass.prototype = Object.create(baseErrorType.prototype);
      errorClass.prototype.constructor = errorClass;
      errorClass.prototype.toString = function() {
        if (this.message === void 0) {
          return this.name;
        } else {
          return this.name + ": " + this.message;
        }
      };
      return errorClass;
    }
    var InternalError = void 0;
    function throwInternalError(message) {
      throw new InternalError(message);
    }
    function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) {
      myTypes.forEach(function(type) {
        typeDependencies[type] = dependentTypes;
      });
      function onComplete(typeConverters2) {
        var myTypeConverters = getTypeConverters(typeConverters2);
        if (myTypeConverters.length !== myTypes.length) {
          throwInternalError("Mismatched type converter count");
        }
        for (var i = 0; i < myTypes.length; ++i) {
          registerType(myTypes[i], myTypeConverters[i]);
        }
      }
      var typeConverters = new Array(dependentTypes.length);
      var unregisteredTypes = [];
      var registered = 0;
      dependentTypes.forEach((dt, i) => {
        if (registeredTypes.hasOwnProperty(dt)) {
          typeConverters[i] = registeredTypes[dt];
        } else {
          unregisteredTypes.push(dt);
          if (!awaitingDependencies.hasOwnProperty(dt)) {
            awaitingDependencies[dt] = [];
          }
          awaitingDependencies[dt].push(() => {
            typeConverters[i] = registeredTypes[dt];
            ++registered;
            if (registered === unregisteredTypes.length) {
              onComplete(typeConverters);
            }
          });
        }
      });
      if (0 === unregisteredTypes.length) {
        onComplete(typeConverters);
      }
    }
    function __embind_finalize_value_object(structType) {
      var reg = structRegistrations[structType];
      delete structRegistrations[structType];
      var rawConstructor = reg.rawConstructor;
      var rawDestructor = reg.rawDestructor;
      var fieldRecords = reg.fields;
      var fieldTypes = fieldRecords.map((field) => field.getterReturnType).concat(fieldRecords.map((field) => field.setterArgumentType));
      whenDependentTypesAreResolved([structType], fieldTypes, (fieldTypes2) => {
        var fields = {};
        fieldRecords.forEach((field, i) => {
          var fieldName = field.fieldName;
          var getterReturnType = fieldTypes2[i];
          var getter = field.getter;
          var getterContext = field.getterContext;
          var setterArgumentType = fieldTypes2[i + fieldRecords.length];
          var setter = field.setter;
          var setterContext = field.setterContext;
          fields[fieldName] = { read: (ptr) => {
            return getterReturnType["fromWireType"](getter(getterContext, ptr));
          }, write: (ptr, o) => {
            var destructors = [];
            setter(setterContext, ptr, setterArgumentType["toWireType"](destructors, o));
            runDestructors(destructors);
          } };
        });
        return [{ name: reg.name, "fromWireType": function(ptr) {
          var rv = {};
          for (var i in fields) {
            rv[i] = fields[i].read(ptr);
          }
          rawDestructor(ptr);
          return rv;
        }, "toWireType": function(destructors, o) {
          for (var fieldName in fields) {
            if (!(fieldName in o)) {
              throw new TypeError('Missing field:  "' + fieldName + '"');
            }
          }
          var ptr = rawConstructor();
          for (fieldName in fields) {
            fields[fieldName].write(ptr, o[fieldName]);
          }
          if (destructors !== null) {
            destructors.push(rawDestructor, ptr);
          }
          return ptr;
        }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: rawDestructor }];
      });
    }
    function __embind_register_bigint(primitiveType, name, size, minRange, maxRange) {
    }
    function getShiftFromSize(size) {
      switch (size) {
        case 1:
          return 0;
        case 2:
          return 1;
        case 4:
          return 2;
        case 8:
          return 3;
        default:
          throw new TypeError("Unknown type size: " + size);
      }
    }
    function embind_init_charCodes() {
      var codes = new Array(256);
      for (var i = 0; i < 256; ++i) {
        codes[i] = String.fromCharCode(i);
      }
      embind_charCodes = codes;
    }
    var embind_charCodes = void 0;
    function readLatin1String(ptr) {
      var ret = "";
      var c = ptr;
      while (HEAPU8[c]) {
        ret += embind_charCodes[HEAPU8[c++]];
      }
      return ret;
    }
    var BindingError = void 0;
    function throwBindingError(message) {
      throw new BindingError(message);
    }
    function registerType(rawType, registeredInstance, options = {}) {
      if (!("argPackAdvance" in registeredInstance)) {
        throw new TypeError("registerType registeredInstance requires argPackAdvance");
      }
      var name = registeredInstance.name;
      if (!rawType) {
        throwBindingError('type "' + name + '" must have a positive integer typeid pointer');
      }
      if (registeredTypes.hasOwnProperty(rawType)) {
        if (options.ignoreDuplicateRegistrations) {
          return;
        } else {
          throwBindingError("Cannot register type '" + name + "' twice");
        }
      }
      registeredTypes[rawType] = registeredInstance;
      delete typeDependencies[rawType];
      if (awaitingDependencies.hasOwnProperty(rawType)) {
        var callbacks = awaitingDependencies[rawType];
        delete awaitingDependencies[rawType];
        callbacks.forEach((cb) => cb());
      }
    }
    function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
      var shift = getShiftFromSize(size);
      name = readLatin1String(name);
      registerType(rawType, { name, "fromWireType": function(wt) {
        return !!wt;
      }, "toWireType": function(destructors, o) {
        return o ? trueValue : falseValue;
      }, "argPackAdvance": 8, "readValueFromPointer": function(pointer) {
        var heap;
        if (size === 1) {
          heap = HEAP8;
        } else if (size === 2) {
          heap = HEAP16;
        } else if (size === 4) {
          heap = HEAP32;
        } else {
          throw new TypeError("Unknown boolean type size: " + name);
        }
        return this["fromWireType"](heap[pointer >> shift]);
      }, destructorFunction: null });
    }
    var emval_free_list = [];
    var emval_handle_array = [{}, { value: void 0 }, { value: null }, { value: true }, { value: false }];
    function __emval_decref(handle) {
      if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
        emval_handle_array[handle] = void 0;
        emval_free_list.push(handle);
      }
    }
    function count_emval_handles() {
      var count = 0;
      for (var i = 5; i < emval_handle_array.length; ++i) {
        if (emval_handle_array[i] !== void 0) {
          ++count;
        }
      }
      return count;
    }
    function get_first_emval() {
      for (var i = 5; i < emval_handle_array.length; ++i) {
        if (emval_handle_array[i] !== void 0) {
          return emval_handle_array[i];
        }
      }
      return null;
    }
    function init_emval() {
      Module["count_emval_handles"] = count_emval_handles;
      Module["get_first_emval"] = get_first_emval;
    }
    var Emval = { toValue: (handle) => {
      if (!handle) {
        throwBindingError("Cannot use deleted val. handle = " + handle);
      }
      return emval_handle_array[handle].value;
    }, toHandle: (value) => {
      switch (value) {
        case void 0:
          return 1;
        case null:
          return 2;
        case true:
          return 3;
        case false:
          return 4;
        default: {
          var handle = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length;
          emval_handle_array[handle] = { refcount: 1, value };
          return handle;
        }
      }
    } };
    function __embind_register_emval(rawType, name) {
      name = readLatin1String(name);
      registerType(rawType, { name, "fromWireType": function(handle) {
        var rv = Emval.toValue(handle);
        __emval_decref(handle);
        return rv;
      }, "toWireType": function(destructors, value) {
        return Emval.toHandle(value);
      }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: null });
    }
    function embindRepr(v) {
      if (v === null) {
        return "null";
      }
      var t = typeof v;
      if (t === "object" || t === "array" || t === "function") {
        return v.toString();
      } else {
        return "" + v;
      }
    }
    function floatReadValueFromPointer(name, shift) {
      switch (shift) {
        case 2:
          return function(pointer) {
            return this["fromWireType"](HEAPF32[pointer >> 2]);
          };
        case 3:
          return function(pointer) {
            return this["fromWireType"](HEAPF64[pointer >> 3]);
          };
        default:
          throw new TypeError("Unknown float type: " + name);
      }
    }
    function __embind_register_float(rawType, name, size) {
      var shift = getShiftFromSize(size);
      name = readLatin1String(name);
      registerType(rawType, { name, "fromWireType": function(value) {
        return value;
      }, "toWireType": function(destructors, value) {
        if (typeof value != "number" && typeof value != "boolean") {
          throw new TypeError('Cannot convert "' + embindRepr(value) + '" to ' + this.name);
        }
        return value;
      }, "argPackAdvance": 8, "readValueFromPointer": floatReadValueFromPointer(name, shift), destructorFunction: null });
    }
    function new_(constructor, argumentList) {
      if (!(constructor instanceof Function)) {
        throw new TypeError("new_ called with constructor type " + typeof constructor + " which is not a function");
      }
      var dummy = createNamedFunction(constructor.name || "unknownFunctionName", function() {
      });
      dummy.prototype = constructor.prototype;
      var obj = new dummy();
      var r = constructor.apply(obj, argumentList);
      return r instanceof Object ? r : obj;
    }
    function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc) {
      var argCount = argTypes.length;
      if (argCount < 2) {
        throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
      }
      var isClassMethodFunc = argTypes[1] !== null && classType !== null;
      var needsDestructorStack = false;
      for (var i = 1; i < argTypes.length; ++i) {
        if (argTypes[i] !== null && argTypes[i].destructorFunction === void 0) {
          needsDestructorStack = true;
          break;
        }
      }
      var returns = argTypes[0].name !== "void";
      var argsList = "";
      var argsListWired = "";
      for (var i = 0; i < argCount - 2; ++i) {
        argsList += (i !== 0 ? ", " : "") + "arg" + i;
        argsListWired += (i !== 0 ? ", " : "") + "arg" + i + "Wired";
      }
      var invokerFnBody = "return function " + makeLegalFunctionName(humanName) + "(" + argsList + ") {\nif (arguments.length !== " + (argCount - 2) + ") {\nthrowBindingError('function " + humanName + " called with ' + arguments.length + ' arguments, expected " + (argCount - 2) + " args!');\n}\n";
      if (needsDestructorStack) {
        invokerFnBody += "var destructors = [];\n";
      }
      var dtorStack = needsDestructorStack ? "destructors" : "null";
      var args1 = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"];
      var args2 = [throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1]];
      if (isClassMethodFunc) {
        invokerFnBody += "var thisWired = classParam.toWireType(" + dtorStack + ", this);\n";
      }
      for (var i = 0; i < argCount - 2; ++i) {
        invokerFnBody += "var arg" + i + "Wired = argType" + i + ".toWireType(" + dtorStack + ", arg" + i + "); // " + argTypes[i + 2].name + "\n";
        args1.push("argType" + i);
        args2.push(argTypes[i + 2]);
      }
      if (isClassMethodFunc) {
        argsListWired = "thisWired" + (argsListWired.length > 0 ? ", " : "") + argsListWired;
      }
      invokerFnBody += (returns ? "var rv = " : "") + "invoker(fn" + (argsListWired.length > 0 ? ", " : "") + argsListWired + ");\n";
      if (needsDestructorStack) {
        invokerFnBody += "runDestructors(destructors);\n";
      } else {
        for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
          var paramName = i === 1 ? "thisWired" : "arg" + (i - 2) + "Wired";
          if (argTypes[i].destructorFunction !== null) {
            invokerFnBody += paramName + "_dtor(" + paramName + "); // " + argTypes[i].name + "\n";
            args1.push(paramName + "_dtor");
            args2.push(argTypes[i].destructorFunction);
          }
        }
      }
      if (returns) {
        invokerFnBody += "var ret = retType.fromWireType(rv);\nreturn ret;\n";
      } else {
      }
      invokerFnBody += "}\n";
      args1.push(invokerFnBody);
      var invokerFunction = new_(Function, args1).apply(null, args2);
      return invokerFunction;
    }
    function ensureOverloadTable(proto, methodName, humanName) {
      if (void 0 === proto[methodName].overloadTable) {
        var prevFunc = proto[methodName];
        proto[methodName] = function() {
          if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
            throwBindingError("Function '" + humanName + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + proto[methodName].overloadTable + ")!");
          }
          return proto[methodName].overloadTable[arguments.length].apply(this, arguments);
        };
        proto[methodName].overloadTable = [];
        proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
      }
    }
    function exposePublicSymbol(name, value, numArguments) {
      if (Module.hasOwnProperty(name)) {
        if (void 0 === numArguments || void 0 !== Module[name].overloadTable && void 0 !== Module[name].overloadTable[numArguments]) {
          throwBindingError("Cannot register public name '" + name + "' twice");
        }
        ensureOverloadTable(Module, name, name);
        if (Module.hasOwnProperty(numArguments)) {
          throwBindingError("Cannot register multiple overloads of a function with the same number of arguments (" + numArguments + ")!");
        }
        Module[name].overloadTable[numArguments] = value;
      } else {
        Module[name] = value;
        if (void 0 !== numArguments) {
          Module[name].numArguments = numArguments;
        }
      }
    }
    function heap32VectorToArray(count, firstElement) {
      var array = [];
      for (var i = 0; i < count; i++) {
        array.push(HEAPU32[firstElement + i * 4 >> 2]);
      }
      return array;
    }
    function replacePublicSymbol(name, value, numArguments) {
      if (!Module.hasOwnProperty(name)) {
        throwInternalError("Replacing nonexistant public symbol");
      }
      if (void 0 !== Module[name].overloadTable && void 0 !== numArguments) {
        Module[name].overloadTable[numArguments] = value;
      } else {
        Module[name] = value;
        Module[name].argCount = numArguments;
      }
    }
    function dynCallLegacy(sig, ptr, args) {
      assert("dynCall_" + sig in Module, "bad function pointer type - dynCall function not found for sig '" + sig + "'");
      if (args && args.length) {
        assert(args.length === sig.substring(1).replace(/j/g, "--").length);
      } else {
        assert(sig.length == 1);
      }
      var f = Module["dynCall_" + sig];
      return args && args.length ? f.apply(null, [ptr].concat(args)) : f.call(null, ptr);
    }
    function getWasmTableEntry(funcPtr) {
      return wasmTable.get(funcPtr);
    }
    function dynCall(sig, ptr, args) {
      if (sig.includes("j")) {
        return dynCallLegacy(sig, ptr, args);
      }
      assert(getWasmTableEntry(ptr), "missing table entry in dynCall: " + ptr);
      var rtn = getWasmTableEntry(ptr).apply(null, args);
      return rtn;
    }
    function getDynCaller(sig, ptr) {
      assert(sig.includes("j") || sig.includes("p"), "getDynCaller should only be called with i64 sigs");
      var argCache = [];
      return function() {
        argCache.length = 0;
        Object.assign(argCache, arguments);
        return dynCall(sig, ptr, argCache);
      };
    }
    function embind__requireFunction(signature, rawFunction) {
      signature = readLatin1String(signature);
      function makeDynCaller() {
        if (signature.includes("j")) {
          return getDynCaller(signature, rawFunction);
        }
        return getWasmTableEntry(rawFunction);
      }
      var fp = makeDynCaller();
      if (typeof fp != "function") {
        throwBindingError("unknown function pointer with signature " + signature + ": " + rawFunction);
      }
      return fp;
    }
    var UnboundTypeError = void 0;
    function getTypeName(type) {
      var ptr = ___getTypeName(type);
      var rv = readLatin1String(ptr);
      _free(ptr);
      return rv;
    }
    function throwUnboundTypeError(message, types) {
      var unboundTypes = [];
      var seen = {};
      function visit(type) {
        if (seen[type]) {
          return;
        }
        if (registeredTypes[type]) {
          return;
        }
        if (typeDependencies[type]) {
          typeDependencies[type].forEach(visit);
          return;
        }
        unboundTypes.push(type);
        seen[type] = true;
      }
      types.forEach(visit);
      throw new UnboundTypeError(message + ": " + unboundTypes.map(getTypeName).join([", "]));
    }
    function __embind_register_function(name, argCount, rawArgTypesAddr, signature, rawInvoker, fn) {
      var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
      name = readLatin1String(name);
      rawInvoker = embind__requireFunction(signature, rawInvoker);
      exposePublicSymbol(name, function() {
        throwUnboundTypeError("Cannot call " + name + " due to unbound types", argTypes);
      }, argCount - 1);
      whenDependentTypesAreResolved([], argTypes, function(argTypes2) {
        var invokerArgsArray = [argTypes2[0], null].concat(argTypes2.slice(1));
        replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null, rawInvoker, fn), argCount - 1);
        return [];
      });
    }
    function integerReadValueFromPointer(name, shift, signed) {
      switch (shift) {
        case 0:
          return signed ? function readS8FromPointer(pointer) {
            return HEAP8[pointer];
          } : function readU8FromPointer(pointer) {
            return HEAPU8[pointer];
          };
        case 1:
          return signed ? function readS16FromPointer(pointer) {
            return HEAP16[pointer >> 1];
          } : function readU16FromPointer(pointer) {
            return HEAPU16[pointer >> 1];
          };
        case 2:
          return signed ? function readS32FromPointer(pointer) {
            return HEAP32[pointer >> 2];
          } : function readU32FromPointer(pointer) {
            return HEAPU32[pointer >> 2];
          };
        default:
          throw new TypeError("Unknown integer type: " + name);
      }
    }
    function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
      name = readLatin1String(name);
      if (maxRange === -1) {
        maxRange = 4294967295;
      }
      var shift = getShiftFromSize(size);
      var fromWireType = (value) => value;
      if (minRange === 0) {
        var bitshift = 32 - 8 * size;
        fromWireType = (value) => value << bitshift >>> bitshift;
      }
      var isUnsignedType = name.includes("unsigned");
      var checkAssertions = (value, toTypeName) => {
        if (typeof value != "number" && typeof value != "boolean") {
          throw new TypeError('Cannot convert "' + embindRepr(value) + '" to ' + toTypeName);
        }
        if (value < minRange || value > maxRange) {
          throw new TypeError('Passing a number "' + embindRepr(value) + '" from JS side to C/C++ side to an argument of type "' + name + '", which is outside the valid range [' + minRange + ", " + maxRange + "]!");
        }
      };
      var toWireType;
      if (isUnsignedType) {
        toWireType = function(destructors, value) {
          checkAssertions(value, this.name);
          return value >>> 0;
        };
      } else {
        toWireType = function(destructors, value) {
          checkAssertions(value, this.name);
          return value;
        };
      }
      registerType(primitiveType, { name, "fromWireType": fromWireType, "toWireType": toWireType, "argPackAdvance": 8, "readValueFromPointer": integerReadValueFromPointer(name, shift, minRange !== 0), destructorFunction: null });
    }
    function __embind_register_memory_view(rawType, dataTypeIndex, name) {
      var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
      var TA = typeMapping[dataTypeIndex];
      function decodeMemoryView(handle) {
        handle = handle >> 2;
        var heap = HEAPU32;
        var size = heap[handle];
        var data = heap[handle + 1];
        return new TA(heap.buffer, data, size);
      }
      name = readLatin1String(name);
      registerType(rawType, { name, "fromWireType": decodeMemoryView, "argPackAdvance": 8, "readValueFromPointer": decodeMemoryView }, { ignoreDuplicateRegistrations: true });
    }
    function __embind_register_std_string(rawType, name) {
      name = readLatin1String(name);
      var stdStringIsUTF8 = name === "std::string";
      registerType(rawType, { name, "fromWireType": function(value) {
        var length = HEAPU32[value >> 2];
        var payload = value + 4;
        var str;
        if (stdStringIsUTF8) {
          var decodeStartPtr = payload;
          for (var i = 0; i <= length; ++i) {
            var currentBytePtr = payload + i;
            if (i == length || HEAPU8[currentBytePtr] == 0) {
              var maxRead = currentBytePtr - decodeStartPtr;
              var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
              if (str === void 0) {
                str = stringSegment;
              } else {
                str += String.fromCharCode(0);
                str += stringSegment;
              }
              decodeStartPtr = currentBytePtr + 1;
            }
          }
        } else {
          var a = new Array(length);
          for (var i = 0; i < length; ++i) {
            a[i] = String.fromCharCode(HEAPU8[payload + i]);
          }
          str = a.join("");
        }
        _free(value);
        return str;
      }, "toWireType": function(destructors, value) {
        if (value instanceof ArrayBuffer) {
          value = new Uint8Array(value);
        }
        var length;
        var valueIsOfTypeString = typeof value == "string";
        if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
          throwBindingError("Cannot pass non-string to std::string");
        }
        if (stdStringIsUTF8 && valueIsOfTypeString) {
          length = lengthBytesUTF8(value);
        } else {
          length = value.length;
        }
        var base = _malloc(4 + length + 1);
        var ptr = base + 4;
        HEAPU32[base >> 2] = length;
        if (stdStringIsUTF8 && valueIsOfTypeString) {
          stringToUTF8(value, ptr, length + 1);
        } else {
          if (valueIsOfTypeString) {
            for (var i = 0; i < length; ++i) {
              var charCode = value.charCodeAt(i);
              if (charCode > 255) {
                _free(ptr);
                throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
              }
              HEAPU8[ptr + i] = charCode;
            }
          } else {
            for (var i = 0; i < length; ++i) {
              HEAPU8[ptr + i] = value[i];
            }
          }
        }
        if (destructors !== null) {
          destructors.push(_free, base);
        }
        return base;
      }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: function(ptr) {
        _free(ptr);
      } });
    }
    var UTF16Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf-16le") : void 0;
    function UTF16ToString(ptr, maxBytesToRead) {
      assert(ptr % 2 == 0, "Pointer passed to UTF16ToString must be aligned to two bytes!");
      var endPtr = ptr;
      var idx = endPtr >> 1;
      var maxIdx = idx + maxBytesToRead / 2;
      while (!(idx >= maxIdx) && HEAPU16[idx])
        ++idx;
      endPtr = idx << 1;
      if (endPtr - ptr > 32 && UTF16Decoder)
        return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
      var str = "";
      for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
        var codeUnit = HEAP16[ptr + i * 2 >> 1];
        if (codeUnit == 0)
          break;
        str += String.fromCharCode(codeUnit);
      }
      return str;
    }
    function stringToUTF16(str, outPtr, maxBytesToWrite) {
      assert(outPtr % 2 == 0, "Pointer passed to stringToUTF16 must be aligned to two bytes!");
      assert(typeof maxBytesToWrite == "number", "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
      if (maxBytesToWrite === void 0) {
        maxBytesToWrite = 2147483647;
      }
      if (maxBytesToWrite < 2)
        return 0;
      maxBytesToWrite -= 2;
      var startPtr = outPtr;
      var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
      for (var i = 0; i < numCharsToWrite; ++i) {
        var codeUnit = str.charCodeAt(i);
        HEAP16[outPtr >> 1] = codeUnit;
        outPtr += 2;
      }
      HEAP16[outPtr >> 1] = 0;
      return outPtr - startPtr;
    }
    function lengthBytesUTF16(str) {
      return str.length * 2;
    }
    function UTF32ToString(ptr, maxBytesToRead) {
      assert(ptr % 4 == 0, "Pointer passed to UTF32ToString must be aligned to four bytes!");
      var i = 0;
      var str = "";
      while (!(i >= maxBytesToRead / 4)) {
        var utf32 = HEAP32[ptr + i * 4 >> 2];
        if (utf32 == 0)
          break;
        ++i;
        if (utf32 >= 65536) {
          var ch = utf32 - 65536;
          str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
        } else {
          str += String.fromCharCode(utf32);
        }
      }
      return str;
    }
    function stringToUTF32(str, outPtr, maxBytesToWrite) {
      assert(outPtr % 4 == 0, "Pointer passed to stringToUTF32 must be aligned to four bytes!");
      assert(typeof maxBytesToWrite == "number", "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
      if (maxBytesToWrite === void 0) {
        maxBytesToWrite = 2147483647;
      }
      if (maxBytesToWrite < 4)
        return 0;
      var startPtr = outPtr;
      var endPtr = startPtr + maxBytesToWrite - 4;
      for (var i = 0; i < str.length; ++i) {
        var codeUnit = str.charCodeAt(i);
        if (codeUnit >= 55296 && codeUnit <= 57343) {
          var trailSurrogate = str.charCodeAt(++i);
          codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023;
        }
        HEAP32[outPtr >> 2] = codeUnit;
        outPtr += 4;
        if (outPtr + 4 > endPtr)
          break;
      }
      HEAP32[outPtr >> 2] = 0;
      return outPtr - startPtr;
    }
    function lengthBytesUTF32(str) {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        var codeUnit = str.charCodeAt(i);
        if (codeUnit >= 55296 && codeUnit <= 57343)
          ++i;
        len += 4;
      }
      return len;
    }
    function __embind_register_std_wstring(rawType, charSize, name) {
      name = readLatin1String(name);
      var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
      if (charSize === 2) {
        decodeString = UTF16ToString;
        encodeString = stringToUTF16;
        lengthBytesUTF = lengthBytesUTF16;
        getHeap = () => HEAPU16;
        shift = 1;
      } else if (charSize === 4) {
        decodeString = UTF32ToString;
        encodeString = stringToUTF32;
        lengthBytesUTF = lengthBytesUTF32;
        getHeap = () => HEAPU32;
        shift = 2;
      }
      registerType(rawType, { name, "fromWireType": function(value) {
        var length = HEAPU32[value >> 2];
        var HEAP = getHeap();
        var str;
        var decodeStartPtr = value + 4;
        for (var i = 0; i <= length; ++i) {
          var currentBytePtr = value + 4 + i * charSize;
          if (i == length || HEAP[currentBytePtr >> shift] == 0) {
            var maxReadBytes = currentBytePtr - decodeStartPtr;
            var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
            if (str === void 0) {
              str = stringSegment;
            } else {
              str += String.fromCharCode(0);
              str += stringSegment;
            }
            decodeStartPtr = currentBytePtr + charSize;
          }
        }
        _free(value);
        return str;
      }, "toWireType": function(destructors, value) {
        if (!(typeof value == "string")) {
          throwBindingError("Cannot pass non-string to C++ string type " + name);
        }
        var length = lengthBytesUTF(value);
        var ptr = _malloc(4 + length + charSize);
        HEAPU32[ptr >> 2] = length >> shift;
        encodeString(value, ptr + 4, length + charSize);
        if (destructors !== null) {
          destructors.push(_free, ptr);
        }
        return ptr;
      }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: function(ptr) {
        _free(ptr);
      } });
    }
    function __embind_register_value_object(rawType, name, constructorSignature, rawConstructor, destructorSignature, rawDestructor) {
      structRegistrations[rawType] = { name: readLatin1String(name), rawConstructor: embind__requireFunction(constructorSignature, rawConstructor), rawDestructor: embind__requireFunction(destructorSignature, rawDestructor), fields: [] };
    }
    function __embind_register_value_object_field(structType, fieldName, getterReturnType, getterSignature, getter, getterContext, setterArgumentType, setterSignature, setter, setterContext) {
      structRegistrations[structType].fields.push({ fieldName: readLatin1String(fieldName), getterReturnType, getter: embind__requireFunction(getterSignature, getter), getterContext, setterArgumentType, setter: embind__requireFunction(setterSignature, setter), setterContext });
    }
    function __embind_register_void(rawType, name) {
      name = readLatin1String(name);
      registerType(rawType, { isVoid: true, name, "argPackAdvance": 0, "fromWireType": function() {
        return void 0;
      }, "toWireType": function(destructors, o) {
        return void 0;
      } });
    }
    function _abort() {
      abort("native code called abort()");
    }
    function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.copyWithin(dest, src, src + num);
    }
    function getHeapMax() {
      return 2147483648;
    }
    function emscripten_realloc_buffer(size) {
      var b = wasmMemory.buffer;
      try {
        wasmMemory.grow(size - b.byteLength + 65535 >>> 16);
        updateMemoryViews();
        return 1;
      } catch (e) {
        err("emscripten_realloc_buffer: Attempted to grow heap from " + b.byteLength + " bytes to " + size + " bytes, but got error: " + e);
      }
    }
    function _emscripten_resize_heap(requestedSize) {
      var oldSize = HEAPU8.length;
      requestedSize = requestedSize >>> 0;
      assert(requestedSize > oldSize);
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        err("Cannot enlarge memory, asked to go up to " + requestedSize + " bytes, but the limit is " + maxHeapSize + " bytes!");
        return false;
      }
      let alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
        var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
        var replacement = emscripten_realloc_buffer(newSize);
        if (replacement) {
          return true;
        }
      }
      err("Failed to grow the heap from " + oldSize + " bytes to " + newSize + " bytes, not enough memory!");
      return false;
    }
    var SYSCALLS = { varargs: void 0, get: function() {
      assert(SYSCALLS.varargs != void 0);
      SYSCALLS.varargs += 4;
      var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
      return ret;
    }, getStr: function(ptr) {
      var ret = UTF8ToString(ptr);
      return ret;
    } };
    function _fd_close(fd) {
      abort("fd_close called without SYSCALLS_REQUIRE_FILESYSTEM");
    }
    function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
      return 70;
    }
    var printCharBuffers = [null, [], []];
    function printChar(stream, curr) {
      var buffer = printCharBuffers[stream];
      assert(buffer);
      if (curr === 0 || curr === 10) {
        (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
        buffer.length = 0;
      } else {
        buffer.push(curr);
      }
    }
    function flush_NO_FILESYSTEM() {
      _fflush(0);
      if (printCharBuffers[1].length)
        printChar(1, 10);
      if (printCharBuffers[2].length)
        printChar(2, 10);
    }
    function _fd_write(fd, iov, iovcnt, pnum) {
      var num = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[iov >> 2];
        var len = HEAPU32[iov + 4 >> 2];
        iov += 8;
        for (var j = 0; j < len; j++) {
          printChar(fd, HEAPU8[ptr + j]);
        }
        num += len;
      }
      HEAPU32[pnum >> 2] = num;
      return 0;
    }
    function _onAtlasProgress(mode, progress) {
      if (Module.onAtlasProgress)
        Module.onAtlasProgress(mode, progress);
    }
    InternalError = Module["InternalError"] = extendError(Error, "InternalError");
    embind_init_charCodes();
    BindingError = Module["BindingError"] = extendError(Error, "BindingError");
    init_emval();
    UnboundTypeError = Module["UnboundTypeError"] = extendError(Error, "UnboundTypeError");
    var ASSERTIONS = true;
    var decodeBase64 = typeof atob == "function" ? atob : function(input) {
      var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
        chr1 = enc1 << 2 | enc2 >> 4;
        chr2 = (enc2 & 15) << 4 | enc3 >> 2;
        chr3 = (enc3 & 3) << 6 | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 !== 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 !== 64) {
          output = output + String.fromCharCode(chr3);
        }
      } while (i < input.length);
      return output;
    };
    function intArrayFromBase64(s) {
      if (typeof ENVIRONMENT_IS_NODE == "boolean" && ENVIRONMENT_IS_NODE) {
        var buf = Buffer.from(s, "base64");
        return new Uint8Array(buf["buffer"], buf["byteOffset"], buf["byteLength"]);
      }
      try {
        var decoded = decodeBase64(s);
        var bytes = new Uint8Array(decoded.length);
        for (var i = 0; i < decoded.length; ++i) {
          bytes[i] = decoded.charCodeAt(i);
        }
        return bytes;
      } catch (_) {
        throw new Error("Converting base64 string to bytes failed.");
      }
    }
    function tryParseAsDataURI(filename) {
      if (!isDataURI(filename)) {
        return;
      }
      return intArrayFromBase64(filename.slice(dataURIPrefix.length));
    }
    function checkIncomingModuleAPI() {
      ignoredModuleProp("fetchSettings");
    }
    var asmLibraryArg = { "_embind_finalize_value_object": __embind_finalize_value_object, "_embind_register_bigint": __embind_register_bigint, "_embind_register_bool": __embind_register_bool, "_embind_register_emval": __embind_register_emval, "_embind_register_float": __embind_register_float, "_embind_register_function": __embind_register_function, "_embind_register_integer": __embind_register_integer, "_embind_register_memory_view": __embind_register_memory_view, "_embind_register_std_string": __embind_register_std_string, "_embind_register_std_wstring": __embind_register_std_wstring, "_embind_register_value_object": __embind_register_value_object, "_embind_register_value_object_field": __embind_register_value_object_field, "_embind_register_void": __embind_register_void, "abort": _abort, "emscripten_memcpy_big": _emscripten_memcpy_big, "emscripten_resize_heap": _emscripten_resize_heap, "fd_close": _fd_close, "fd_seek": _fd_seek, "fd_write": _fd_write, "onAtlasProgress": _onAtlasProgress };
    var asm = createWasm();
    var ___wasm_call_ctors = Module["___wasm_call_ctors"] = createExportWrapper("__wasm_call_ctors");
    var _free = Module["_free"] = createExportWrapper("free");
    var ___getTypeName = Module["___getTypeName"] = createExportWrapper("__getTypeName");
    var __embind_initialize_bindings = Module["__embind_initialize_bindings"] = createExportWrapper("_embind_initialize_bindings");
    var ___errno_location = Module["___errno_location"] = createExportWrapper("__errno_location");
    var _fflush = Module["_fflush"] = createExportWrapper("fflush");
    var _malloc = Module["_malloc"] = createExportWrapper("malloc");
    var _emscripten_stack_init = Module["_emscripten_stack_init"] = function() {
      return (_emscripten_stack_init = Module["_emscripten_stack_init"] = Module["asm"]["emscripten_stack_init"]).apply(null, arguments);
    };
    var _emscripten_stack_get_free = Module["_emscripten_stack_get_free"] = function() {
      return (_emscripten_stack_get_free = Module["_emscripten_stack_get_free"] = Module["asm"]["emscripten_stack_get_free"]).apply(null, arguments);
    };
    var _emscripten_stack_get_base = Module["_emscripten_stack_get_base"] = function() {
      return (_emscripten_stack_get_base = Module["_emscripten_stack_get_base"] = Module["asm"]["emscripten_stack_get_base"]).apply(null, arguments);
    };
    var _emscripten_stack_get_end = Module["_emscripten_stack_get_end"] = function() {
      return (_emscripten_stack_get_end = Module["_emscripten_stack_get_end"] = Module["asm"]["emscripten_stack_get_end"]).apply(null, arguments);
    };
    var stackSave = Module["stackSave"] = createExportWrapper("stackSave");
    var stackRestore = Module["stackRestore"] = createExportWrapper("stackRestore");
    var stackAlloc = Module["stackAlloc"] = createExportWrapper("stackAlloc");
    var _emscripten_stack_get_current = Module["_emscripten_stack_get_current"] = function() {
      return (_emscripten_stack_get_current = Module["_emscripten_stack_get_current"] = Module["asm"]["emscripten_stack_get_current"]).apply(null, arguments);
    };
    var dynCall_jiji = Module["dynCall_jiji"] = createExportWrapper("dynCall_jiji");
    var unexportedRuntimeSymbols = ["run", "UTF8ArrayToString", "UTF8ToString", "stringToUTF8Array", "stringToUTF8", "lengthBytesUTF8", "addOnPreRun", "addOnInit", "addOnPreMain", "addOnExit", "addOnPostRun", "addRunDependency", "removeRunDependency", "FS_createFolder", "FS_createPath", "FS_createDataFile", "FS_createPreloadedFile", "FS_createLazyFile", "FS_createLink", "FS_createDevice", "FS_unlink", "getLEB", "getFunctionTables", "alignFunctionTables", "registerFunctions", "prettyPrint", "getCompilerSetting", "out", "err", "callMain", "abort", "keepRuntimeAlive", "wasmMemory", "stackAlloc", "stackSave", "stackRestore", "getTempRet0", "setTempRet0", "writeStackCookie", "checkStackCookie", "intArrayFromBase64", "tryParseAsDataURI", "ptrToString", "zeroMemory", "stringToNewUTF8", "exitJS", "getHeapMax", "emscripten_realloc_buffer", "ENV", "ERRNO_CODES", "ERRNO_MESSAGES", "setErrNo", "inetPton4", "inetNtop4", "inetPton6", "inetNtop6", "readSockaddr", "writeSockaddr", "DNS", "getHostByName", "Protocols", "Sockets", "getRandomDevice", "warnOnce", "traverseStack", "UNWIND_CACHE", "convertPCtoSourceLocation", "readEmAsmArgsArray", "readEmAsmArgs", "runEmAsmFunction", "runMainThreadEmAsm", "jstoi_q", "jstoi_s", "getExecutableName", "listenOnce", "autoResumeAudioContext", "dynCallLegacy", "getDynCaller", "dynCall", "setWasmTableEntry", "getWasmTableEntry", "handleException", "runtimeKeepalivePush", "runtimeKeepalivePop", "callUserCallback", "maybeExit", "safeSetTimeout", "asmjsMangle", "asyncLoad", "alignMemory", "mmapAlloc", "handleAllocator", "writeI53ToI64", "writeI53ToI64Clamped", "writeI53ToI64Signaling", "writeI53ToU64Clamped", "writeI53ToU64Signaling", "readI53FromI64", "readI53FromU64", "convertI32PairToI53", "convertI32PairToI53Checked", "convertU32PairToI53", "getCFunc", "ccall", "cwrap", "uleb128Encode", "sigToWasmTypes", "generateFuncType", "convertJsFunctionToWasm", "freeTableIndexes", "functionsInTableMap", "getEmptyTableSlot", "updateTableMap", "addFunction", "removeFunction", "reallyNegative", "unSign", "strLen", "reSign", "formatString", "setValue", "getValue", "PATH", "PATH_FS", "intArrayFromString", "intArrayToString", "AsciiToString", "stringToAscii", "UTF16Decoder", "UTF16ToString", "stringToUTF16", "lengthBytesUTF16", "UTF32ToString", "stringToUTF32", "lengthBytesUTF32", "allocateUTF8", "allocateUTF8OnStack", "writeStringToMemory", "writeArrayToMemory", "writeAsciiToMemory", "SYSCALLS", "getSocketFromFD", "getSocketAddress", "JSEvents", "registerKeyEventCallback", "specialHTMLTargets", "maybeCStringToJsString", "findEventTarget", "findCanvasEventTarget", "getBoundingClientRect", "fillMouseEventData", "registerMouseEventCallback", "registerWheelEventCallback", "registerUiEventCallback", "registerFocusEventCallback", "fillDeviceOrientationEventData", "registerDeviceOrientationEventCallback", "fillDeviceMotionEventData", "registerDeviceMotionEventCallback", "screenOrientation", "fillOrientationChangeEventData", "registerOrientationChangeEventCallback", "fillFullscreenChangeEventData", "registerFullscreenChangeEventCallback", "JSEvents_requestFullscreen", "JSEvents_resizeCanvasForFullscreen", "registerRestoreOldStyle", "hideEverythingExceptGivenElement", "restoreHiddenElements", "setLetterbox", "currentFullscreenStrategy", "restoreOldWindowedStyle", "softFullscreenResizeWebGLRenderTarget", "doRequestFullscreen", "fillPointerlockChangeEventData", "registerPointerlockChangeEventCallback", "registerPointerlockErrorEventCallback", "requestPointerLock", "fillVisibilityChangeEventData", "registerVisibilityChangeEventCallback", "registerTouchEventCallback", "fillGamepadEventData", "registerGamepadEventCallback", "registerBeforeUnloadEventCallback", "fillBatteryEventData", "battery", "registerBatteryEventCallback", "setCanvasElementSize", "getCanvasElementSize", "demangle", "demangleAll", "jsStackTrace", "stackTrace", "ExitStatus", "getEnvStrings", "checkWasiClock", "flush_NO_FILESYSTEM", "dlopenMissingError", "createDyncallWrapper", "setImmediateWrapped", "clearImmediateWrapped", "polyfillSetImmediate", "promiseMap", "newNativePromise", "getPromise", "uncaughtExceptionCount", "exceptionLast", "exceptionCaught", "ExceptionInfo", "exception_addRef", "exception_decRef", "Browser", "setMainLoop", "wget", "FS", "MEMFS", "TTY", "PIPEFS", "SOCKFS", "_setNetworkCallback", "tempFixedLengthArray", "miniTempWebGLFloatBuffers", "heapObjectForWebGLType", "heapAccessShiftForWebGLHeap", "GL", "emscriptenWebGLGet", "computeUnpackAlignedImageSize", "emscriptenWebGLGetTexPixelData", "emscriptenWebGLGetUniform", "webglGetUniformLocation", "webglPrepareUniformLocationsBeforeFirstUse", "webglGetLeftBracePos", "emscriptenWebGLGetVertexAttrib", "writeGLArray", "AL", "SDL_unicode", "SDL_ttfContext", "SDL_audio", "SDL", "SDL_gfx", "GLUT", "EGL", "GLFW_Window", "GLFW", "GLEW", "IDBStore", "runAndAbortIfError", "ALLOC_NORMAL", "ALLOC_STACK", "allocate", "InternalError", "BindingError", "UnboundTypeError", "PureVirtualError", "init_embind", "throwInternalError", "throwBindingError", "throwUnboundTypeError", "ensureOverloadTable", "exposePublicSymbol", "replacePublicSymbol", "extendError", "createNamedFunction", "embindRepr", "registeredInstances", "getBasestPointer", "registerInheritedInstance", "unregisterInheritedInstance", "getInheritedInstance", "getInheritedInstanceCount", "getLiveInheritedInstances", "registeredTypes", "awaitingDependencies", "typeDependencies", "registeredPointers", "registerType", "whenDependentTypesAreResolved", "embind_charCodes", "embind_init_charCodes", "readLatin1String", "getTypeName", "heap32VectorToArray", "requireRegisteredType", "getShiftFromSize", "integerReadValueFromPointer", "enumReadValueFromPointer", "floatReadValueFromPointer", "simpleReadValueFromPointer", "runDestructors", "new_", "craftInvokerFunction", "embind__requireFunction", "tupleRegistrations", "structRegistrations", "genericPointerToWireType", "constNoSmartPtrRawPointerToWireType", "nonConstNoSmartPtrRawPointerToWireType", "init_RegisteredPointer", "RegisteredPointer", "RegisteredPointer_getPointee", "RegisteredPointer_destructor", "RegisteredPointer_deleteObject", "RegisteredPointer_fromWireType", "runDestructor", "releaseClassHandle", "finalizationRegistry", "detachFinalizer_deps", "detachFinalizer", "attachFinalizer", "makeClassHandle", "init_ClassHandle", "ClassHandle", "ClassHandle_isAliasOf", "throwInstanceAlreadyDeleted", "ClassHandle_clone", "ClassHandle_delete", "deletionQueue", "ClassHandle_isDeleted", "ClassHandle_deleteLater", "flushPendingDeletes", "delayFunction", "setDelayFunction", "RegisteredClass", "shallowCopyInternalPointer", "downcastPointer", "upcastPointer", "validateThis", "char_0", "char_9", "makeLegalFunctionName", "emval_handle_array", "emval_free_list", "emval_symbols", "init_emval", "count_emval_handles", "get_first_emval", "getStringOrSymbol", "Emval", "emval_newers", "craftEmvalAllocator", "emval_get_global", "emval_lookupTypes", "emval_allocateDestructors", "emval_methodCallers", "emval_addMethodCaller", "emval_registeredMethods"];
    unexportedRuntimeSymbols.forEach(unexportedRuntimeSymbol);
    var missingLibrarySymbols = ["zeroMemory", "stringToNewUTF8", "exitJS", "setErrNo", "inetPton4", "inetNtop4", "inetPton6", "inetNtop6", "readSockaddr", "writeSockaddr", "getHostByName", "getRandomDevice", "traverseStack", "convertPCtoSourceLocation", "readEmAsmArgs", "runEmAsmFunction", "runMainThreadEmAsm", "jstoi_q", "jstoi_s", "getExecutableName", "listenOnce", "autoResumeAudioContext", "setWasmTableEntry", "handleException", "runtimeKeepalivePush", "runtimeKeepalivePop", "callUserCallback", "maybeExit", "safeSetTimeout", "asmjsMangle", "asyncLoad", "alignMemory", "mmapAlloc", "handleAllocator", "writeI53ToI64", "writeI53ToI64Clamped", "writeI53ToI64Signaling", "writeI53ToU64Clamped", "writeI53ToU64Signaling", "readI53FromI64", "readI53FromU64", "convertI32PairToI53", "convertU32PairToI53", "getCFunc", "ccall", "cwrap", "uleb128Encode", "sigToWasmTypes", "generateFuncType", "convertJsFunctionToWasm", "getEmptyTableSlot", "updateTableMap", "addFunction", "removeFunction", "reallyNegative", "unSign", "strLen", "reSign", "formatString", "intArrayFromString", "AsciiToString", "stringToAscii", "allocateUTF8", "allocateUTF8OnStack", "writeStringToMemory", "writeArrayToMemory", "writeAsciiToMemory", "getSocketFromFD", "getSocketAddress", "registerKeyEventCallback", "maybeCStringToJsString", "findEventTarget", "findCanvasEventTarget", "getBoundingClientRect", "fillMouseEventData", "registerMouseEventCallback", "registerWheelEventCallback", "registerUiEventCallback", "registerFocusEventCallback", "fillDeviceOrientationEventData", "registerDeviceOrientationEventCallback", "fillDeviceMotionEventData", "registerDeviceMotionEventCallback", "screenOrientation", "fillOrientationChangeEventData", "registerOrientationChangeEventCallback", "fillFullscreenChangeEventData", "registerFullscreenChangeEventCallback", "JSEvents_requestFullscreen", "JSEvents_resizeCanvasForFullscreen", "registerRestoreOldStyle", "hideEverythingExceptGivenElement", "restoreHiddenElements", "setLetterbox", "softFullscreenResizeWebGLRenderTarget", "doRequestFullscreen", "fillPointerlockChangeEventData", "registerPointerlockChangeEventCallback", "registerPointerlockErrorEventCallback", "requestPointerLock", "fillVisibilityChangeEventData", "registerVisibilityChangeEventCallback", "registerTouchEventCallback", "fillGamepadEventData", "registerGamepadEventCallback", "registerBeforeUnloadEventCallback", "fillBatteryEventData", "battery", "registerBatteryEventCallback", "setCanvasElementSize", "getCanvasElementSize", "demangle", "demangleAll", "jsStackTrace", "stackTrace", "getEnvStrings", "checkWasiClock", "createDyncallWrapper", "setImmediateWrapped", "clearImmediateWrapped", "polyfillSetImmediate", "newNativePromise", "getPromise", "ExceptionInfo", "exception_addRef", "exception_decRef", "setMainLoop", "_setNetworkCallback", "heapObjectForWebGLType", "heapAccessShiftForWebGLHeap", "emscriptenWebGLGet", "computeUnpackAlignedImageSize", "emscriptenWebGLGetTexPixelData", "emscriptenWebGLGetUniform", "webglGetUniformLocation", "webglPrepareUniformLocationsBeforeFirstUse", "webglGetLeftBracePos", "emscriptenWebGLGetVertexAttrib", "writeGLArray", "SDL_unicode", "SDL_ttfContext", "SDL_audio", "GLFW_Window", "runAndAbortIfError", "ALLOC_NORMAL", "ALLOC_STACK", "allocate", "init_embind", "getBasestPointer", "registerInheritedInstance", "unregisterInheritedInstance", "getInheritedInstance", "getInheritedInstanceCount", "getLiveInheritedInstances", "requireRegisteredType", "enumReadValueFromPointer", "genericPointerToWireType", "constNoSmartPtrRawPointerToWireType", "nonConstNoSmartPtrRawPointerToWireType", "init_RegisteredPointer", "RegisteredPointer", "RegisteredPointer_getPointee", "RegisteredPointer_destructor", "RegisteredPointer_deleteObject", "RegisteredPointer_fromWireType", "runDestructor", "releaseClassHandle", "detachFinalizer", "attachFinalizer", "makeClassHandle", "init_ClassHandle", "ClassHandle", "ClassHandle_isAliasOf", "throwInstanceAlreadyDeleted", "ClassHandle_clone", "ClassHandle_delete", "ClassHandle_isDeleted", "ClassHandle_deleteLater", "flushPendingDeletes", "setDelayFunction", "RegisteredClass", "shallowCopyInternalPointer", "downcastPointer", "upcastPointer", "validateThis", "getStringOrSymbol", "craftEmvalAllocator", "emval_get_global", "emval_lookupTypes", "emval_allocateDestructors", "emval_addMethodCaller"];
    missingLibrarySymbols.forEach(missingLibrarySymbol);
    var calledRun;
    dependenciesFulfilled = function runCaller() {
      if (!calledRun)
        run();
      if (!calledRun)
        dependenciesFulfilled = runCaller;
    };
    function stackCheckInit() {
      _emscripten_stack_init();
      writeStackCookie();
    }
    function run(args) {
      args = args || arguments_;
      if (runDependencies > 0) {
        return;
      }
      stackCheckInit();
      preRun();
      if (runDependencies > 0) {
        return;
      }
      function doRun() {
        if (calledRun)
          return;
        calledRun = true;
        Module["calledRun"] = true;
        if (ABORT)
          return;
        initRuntime();
        readyPromiseResolve(Module);
        if (Module["onRuntimeInitialized"])
          Module["onRuntimeInitialized"]();
        assert(!Module["_main"], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
        postRun();
      }
      if (Module["setStatus"]) {
        Module["setStatus"]("Running...");
        setTimeout(function() {
          setTimeout(function() {
            Module["setStatus"]("");
          }, 1);
          doRun();
        }, 1);
      } else {
        doRun();
      }
      checkStackCookie();
    }
    if (Module["preInit"]) {
      if (typeof Module["preInit"] == "function")
        Module["preInit"] = [Module["preInit"]];
      while (Module["preInit"].length > 0) {
        Module["preInit"].pop()();
      }
    }
    run();
    return createXAtlasModule2.ready;
  };
})();
var xatlas_default = createXAtlasModule;

// src/index.ts
var AddMeshStatus = /* @__PURE__ */ ((AddMeshStatus2) => {
  AddMeshStatus2[AddMeshStatus2["Success"] = 0] = "Success";
  AddMeshStatus2[AddMeshStatus2["Error"] = 1] = "Error";
  AddMeshStatus2[AddMeshStatus2["IndexOutOfRange"] = 2] = "IndexOutOfRange";
  AddMeshStatus2[AddMeshStatus2["InvalidIndexCount"] = 3] = "InvalidIndexCount";
  return AddMeshStatus2;
})(AddMeshStatus || {});
var DEFAULT_OPTIONS = {
  chartOptions: {},
  packOptions: {},
  attributeName: "TEXCOORD_1"
};
var unwrap = async (document2, input, options = {}) => {
  const xAtlas = await xatlas_default();
  options = {
    ...DEFAULT_OPTIONS,
    ...options
  };
  const primitives = [];
  for (const item of input) {
    if (item instanceof import_core.Mesh) {
      primitives.push(...item.listPrimitives());
    } else {
      primitives.push(item);
    }
  }
  const map = /* @__PURE__ */ new Map();
  xAtlas.createAtlas();
  for (const primitive of primitives) {
    const indices = primitive.getIndices()?.getArray();
    const positions = primitive.getAttribute("POSITION")?.getArray();
    const meshInfo = xAtlas.createMesh(positions.length / 3, indices.length, false, false);
    xAtlas.HEAPU16.set(indices, meshInfo.indexOffset / Uint16Array.BYTES_PER_ELEMENT);
    xAtlas.HEAPF32.set(positions, meshInfo.positionOffset / Float32Array.BYTES_PER_ELEMENT);
    const status = xAtlas.addMesh();
    if (status !== 0 /* Success */) {
      throw new Error(`Failed to add mesh: ${AddMeshStatus[status]}`);
    }
    map.set(meshInfo.meshId, primitive);
  }
  xAtlas.generateAtlas({
    ...xAtlas.defaultChartOptions(),
    ...options.chartOptions
  }, {
    ...xAtlas.defaultPackOptions(),
    ...options.packOptions
  });
  for (const meshId of map.keys()) {
    const primitive = map.get(meshId);
    const meshInfo = xAtlas.getMeshData(meshId);
    let originalIndexData = new Uint16Array(xAtlas.HEAPU32.subarray(meshInfo.originalIndexOffset / 4, meshInfo.originalIndexOffset / 4 + meshInfo.newVertexCount));
    xAtlas.destroyMeshData(meshInfo);
    for (var semantics of primitive.listSemantics()) {
      const attribute = primitive.getAttribute(semantics);
      const elementSize = attribute.getElementSize();
      const oldArray = attribute.getArray();
      const newArray = new Float32Array(meshInfo.newVertexCount * attribute.getElementSize());
      for (let i = 0, l = meshInfo.newVertexCount; i < l; i++) {
        let originalIndex = originalIndexData[i];
        for (let index = 0; index < attribute.getElementSize(); index++) {
          newArray[elementSize * i + index] = oldArray[elementSize * originalIndex + index];
        }
      }
      attribute.setArray(newArray);
    }
    const indices = primitive.getIndices();
    indices?.setArray(new Uint16Array(xAtlas.HEAPU32.subarray(meshInfo.indexOffset / 4, meshInfo.indexOffset / 4 + meshInfo.newIndexCount)));
    const uv2 = document2.createAccessor(options.attributeName).setType("VEC2").setArray(new Float32Array(xAtlas.HEAPF32.subarray(meshInfo.uvOffset / 4, meshInfo.uvOffset / 4 + meshInfo.newVertexCount * 2)));
    primitive.setAttribute(options.attributeName, uv2);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddMeshStatus,
  unwrap
});
//# sourceMappingURL=index.js.map