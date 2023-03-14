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
    wasmBinaryFile = "data:application/octet-stream;base64,AGFzbQEAAAAB+gEkYAJ/fwF/YAF/AGACf38AYAN/f38Bf2ADf39/AGABfwF/YAAAYAABf2AFf39/f38AYAR/f39/AGAGf39/f39/AGABfQF9YAN/fn8BfmAEf39/fwF/YAV/f39/fwF/YAJ/fwF9YAN/f38BfWADf398AGADf319AGABfAF9YAJ8fwF8YAZ/fH9/f38Bf2AKf39/f39/f39/fwBgB39/f39/f38AYAN/f30AYAZ/fX9/f38Bf2ACf30AYAN/f30Bf2ADf31/AGAEf31/fwF/YAV/f39/fQF/YAJ9fQF9YAJ9fwF/YAd/f39/f39/AX9gAn5/AX9gBH9/fn4AAuoEFANlbnYPb25BdGxhc1Byb2dyZXNzAAIDZW52HV9lbWJpbmRfcmVnaXN0ZXJfdmFsdWVfb2JqZWN0AAoDZW52HV9lbWJpbmRfZmluYWxpemVfdmFsdWVfb2JqZWN0AAEDZW52GV9lbWJpbmRfcmVnaXN0ZXJfZnVuY3Rpb24ACgNlbnYjX2VtYmluZF9yZWdpc3Rlcl92YWx1ZV9vYmplY3RfZmllbGQAFgNlbnYVX2VtYmluZF9yZWdpc3Rlcl92b2lkAAIDZW52FV9lbWJpbmRfcmVnaXN0ZXJfYm9vbAAIA2VudhhfZW1iaW5kX3JlZ2lzdGVyX2ludGVnZXIACANlbnYWX2VtYmluZF9yZWdpc3Rlcl9mbG9hdAAEA2VudhtfZW1iaW5kX3JlZ2lzdGVyX3N0ZF9zdHJpbmcAAgNlbnYcX2VtYmluZF9yZWdpc3Rlcl9zdGRfd3N0cmluZwAEA2VudhZfZW1iaW5kX3JlZ2lzdGVyX2VtdmFsAAIDZW52HF9lbWJpbmRfcmVnaXN0ZXJfbWVtb3J5X3ZpZXcABANlbnYVZW1zY3JpcHRlbl9tZW1jcHlfYmlnAAQWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQhmZF93cml0ZQANA2VudhZlbXNjcmlwdGVuX3Jlc2l6ZV9oZWFwAAUDZW52BWFib3J0AAYWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQhmZF9jbG9zZQAFA2VudhdfZW1iaW5kX3JlZ2lzdGVyX2JpZ2ludAAXFndhc2lfc25hcHNob3RfcHJldmlldzEHZmRfc2VlawAOA+AB3gEGAQYDCAQHBwEBAgEB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QaTNAEH9JkE0IAQQBCAACzsBAn9BBBDWASIDIAI2AgBBBBDWASIEIAI2AgBBgCggAUHQzABB+SZBNyADQdDMAEH9JkE4IAQQBCAACwcAIAARBgALSwEBfyMAQSBrIgUkACAFQQhqIAEgAiADIAQgABEIAEEUENYBIgAgBSgCGDYCECAAIAUpAxA3AgggACAFKQMINwIAIAVBIGokACAACzoBAX8jAEEQayIDJAAgAyABIAIgABEEAEEMENYBIgAgAygCCDYCCCAAIAMpAwA3AgAgA0EQaiQAIAALBwAgABEHAAtPAQJ/IwBB0ABrIgMkACADQSRqIgQgAUEsEK4BGiADIAIpAhA3AxggAyACKQIINwMQIAMgAikCADcDCCAEIANBCGogABECACADQdAAaiQACyoBAn8jAEEwayICJAAgAkEEaiIDIAFBLBCuARogAyAAEQEAIAJBMGokAAs8AQF/IwBBIGsiAiQAIAIgASkCEDcDGCACIAEpAgg3AxAgAiABKQIANwMIIAJBCGogABEBACACQSBqJAALRQEBfyMAQSBrIgIkACACQQhqIAEgABECAEEUENYBIgAgAigCGDYCECAAIAIpAxA3AgggACACKQMINwIAIAJBIGokACAACzwBAX8jAEEgayICJAAgAiABKAIQNgIYIAIgASkCCDcDECACIAEpAgA3AwggAkEIaiAAEQEAIAJBIGokAAsrAQF/IwBBMGsiASQAIAEgABEBAEEsENYBIAFBLBCuASEAIAFBMGokACAAC0MBAX8jAEEgayIBJAAgAUEIaiAAEQEAQRgQ1gEiACABKQMYNwIQIAAgASkDEDcCCCAAIAEpAwg3AgAgAUEgaiQAIAALCQAgASAAEQEACw0AIAEgACgCAGooAgALDwAgASAAKAIAaiACNgIACw0AIAEgACgCAGoqAgALDwAgASAAKAIAaiACOAIACw0AIAEgACgCAGotAAALDwAgASAAKAIAaiACOgAAC+MCAQV/IAAoAgQiAQRAAkAgACgCHEEASgRAA0ACQCAAKAIEIARBGGxqIgIoAgAiAUUNACACKAIMBEBBACEBA0ACQCACKAIAIAFBFGxqKAIAIgNFDQBBmM8AKAIAIgUEQCADIAURAQAMAQsgA0EAQZTPACgCABEAABoLIAFBAWoiASACKAIMSQ0ACyACKAIAIgFF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QCAKIANBAnRqKAIAIRIgECADQQxsaiIAIAIgA0EwbGo2AgggACAIIANBBHRqNgIEIAAgEjYCACADQQFqIgMgBUcNAAtBACEDIARBADYCtAEgBEKAgICAwAA3A6gBIAQgBTYCsAEgBQ0BCyAEKAKoASEADAELIARBqAFqIAUQTiAHKAIAIQIgBCgCqAEhAANAIAAgA0ECdCIIaiACIAhqKAIAKAI0szgCACADQQFqIgMgBUcNAAsLIARCADcDmAEgBEIANwOIAUEAIQMgBEEAOgCgASAEIAA2AnAgBCAEKAKwATYCdCAEQoCAgIDAADcDkAEgBEKAgICAwAA3A4ABIAQgBCkDcDcDCCAEQfgAaiAEQQhqEFkgBEEAQdQEQZTPACgCABEAACIANgJoIABCADcCLCAAQQA7ASggAEKAgICAFDcCICAAQoCAgISEgICAPzcCGCAAQoquj+GDgIDgwAA3AhAgAEKAgICAgICAgMAANwIIIABCADcCACAAQQw2AnQgAEIANwJsIABCBDcCZCAAQgA3AlwgAEIENwJUIABCADcCTCAAQgQ3AkQgAEIANwI8IABCBDcCNCAAQgA3AnggAEIANwKAASAAQQA2ApABIABCBDcCiAEgAEIANwLQASAAQoCAgIDAATcCyAEgAEIANwLAASAAQoCAgIDAADcCuAEgAEIANwKwASAAQoCAgIDABDcCqAEgAEIANwKgASAAQoCAgICAATcCmAEgACAANgKUASAAQdgBaiICQoCAgIDABDcCZCAAQoCAgIDAADcCrAIgAEKAgICAgAE3ApwCIABCgICAgMAANwKMAiAAQoCAgIDAADcC/AEgAEKAgICAwAA3AuwBIABCgICAgMAANwLcASAAIAA2AtgBIABCADcCxAIgAEIANwK0AiAAQgA3AqQCIABCADcClAIgAEIANwKEAiAAQgA3AvQBIABCADcC5AEgAEIKNwKIAyAAQoCAgIDAADcC+AIgAEKAgICAwAA3AugCIABCgICAgIABNwLUAiAAIAI2AtACIAAgADYCzAIgAEEANgLgAyAAQQQ2ArADIABCADcCqAMgAEIMNwKgAyAAQgA3ApgDIABCCDcCkAMgAEIANwKAAyAAQgA3AvACIABCADcC3AIgAEIANwK0AyAAQgA3ArwDIABCADcCxAMgAEEENgLEBCAAQgA3ArwEIABCBDcCtAQgAEIANwKsBCAAQgQ3AqQEIABCADcCnAQgAEIENwKUBCAAQgA3AowEIABCBDcChAQgAEIANwL8AyAAQgQ3AvQDIABCADcC7AMgAEIENwLkAyAAQgA3AsgEIABBADoA0AQgBEHgAGoiAkEAQfQAQZTPACgCABEAACIANgIAIABBADYCNCAAQoCAgIDAADcCACAAQgA3AgggAEIANwIQIABCADcCGCAAQQA2AnAgAEIENwJoIABCADcCYCAAQgQ3AlggAEIANwJQIABCBDcCSCAAQUBrQgA3AgAgAEIENwI4IAIhACAEQQBBIEGUzwAoAgARAAAiAjYCWCACQgA3AhggAkKAgICAwAA3AhAgAkIANwIIIAJCgICAgMAANwIAIARB0ABqIghBAEGoAkGUzwAoAgARAAAiAjYCACACQgA3AgwgAkKAgICAgAE3AgQgAkIANwIUIAJCADcCUCACQQQ2AkwgAkIANwJEIAJCBDcCPCACQgA3AjQgAkIENwIsIAJCADcCJCACQgQ3AhwgAkIANwJYIAJBBDYCYCACQgA3AmwgAkIANwJkIAJBBDYCdCACQgA3AoABIAJCADcCeCACQQA2AsgBIAJBBDYCmAEgAkIANwKQASACQgQ3AogBIAJCADcCrAEgAkIANwKkASACQgA3ApwBIAJCBDcCnAIgAkIANwKUAiACQgQ3AowCIAJCADcChAIgAkIENwL8ASACQgA3AvQBIAJCBDcC7AEgAkIANwLkASACQgQ3AtwBIAJCADcC1AEgAkIENwLMASACQQA2AqQCIAQgCCICNgJIIAQgADYCQCAEIA42AjwgBCABNgI0IAQgBEHYAGo2AkQgBCAEQcgBajYCOCAEIARB6ABqNgIwIAQgDiAEQTBqIAUQVCIBNgIoIAUEQANAIAQoAnggBSADQX9zakECdGooAgAhCCAEKAK4ASEKIARBPDYC6AEgBCAKIAhBDGxqNgLsASAOKAIAIAFBAnRqKAIAIARB6AFqEE8gA0EBaiIDIAVHDQALCyAOIARBKGoQRyAELQDIAUEBcSIORQRAIAdBAToAMAsCQCACKAIAIgEoApgCIgNFDQBBmM8AKAIAIgUEQCADIAURAQAMAQsgA0EAQZTPACgCABEAABoLAkAgASgCiAIiA0UNAEGYzwAoAgAiBQRAIAMgBREBAAwBCyADQQBBlM8AKAIAEQAAGgsCQCABKAL4ASIDRQ0AQZjPACgCACIFBEAgAyAFEQEADAELIANBAEGUzwAoAgARAAAaCwJAIAEoAugBIgNFDQBBmM8AKAIAIgUEQCADIAURAQAMAQsgA0EAQZTPACgCABEAABoLAkAgASgC2AEiA0UNAEGYzwAoAgAiBQRAIAMgBREBAAwBCyADQQBBlM8AKAIAEQAAGgsCQCABKALIASIDRQ0AQZjPACgCACIFBEAgAyAFEQEADAELIANBAEGUzwAoAgARAAAaCwJAIAEoApQBIgNFDQBBmM8AKAIAIgUEQCADIAURAQAMAQsgA0EAQZTPACgCABEAABoLAkAgASgChAEiA0UNAEGYzwAoAgAiBQRAIAMgBREBAAwBCyADQQBBlM8AKAIAEQAAGgsCQCABKAJwIgNFDQBBmM8AKAIAIgUEQCADIAURAQAMAQsgA0EAQZTPACgCABEAABoLAkAgASgCXCIDRQ0AQZjPACgCACIFBEAgAyAFEQEADAELIANBAEGUzwAoAgARAAAaCwJAIAEoAkgiA0UNAEGYzwAoAgAiBQRAIAMgBREBAAwBCyADQQBBlM8AKAIAEQAAGgsCQCABKAI4IgNFDQBBmM8AKAIAIgUEQCADIAURAQAMAQsgA0EAQZTPACgCABEAABoLAkAgASgCKCIDRQ0AQZjPACgCACIFBEAgAyAFEQEADAELIANBAEGUzwAoAgARAAAaCwJAIAEoAhgiA0UNAEGYzwAoAgAiBQRAIAMgBREBAAwBCyADQQBBlM8AKAIAEQAAGgsgASgCBCIBBEACQEGYzwAoAgAiAwRAIAEgAxEBAAwBCyABQQBBlM8AKAIAEQAAGgsLIAIoAgAiAQRAAkBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLCwJAIAQoAlgiAigCECIBRQ0AQZjPACgCACIDBEAgASADEQEADAELIAFBAEGUzwAoAgARAAAaCwJAIAIoAgAiAUUNAEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsgBCgCWCIBBEACQEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsLAkAgACgCACIBKAJkIgJFDQBBmM8AKAIAIgMEQCACIAMRAQAMAQsgAkEAQZTPACgCABEAABoLAkAgASgCVCICRQ0AQZjPACgCACIDBEAgAiADEQEADAELIAJBAEGUzwAoAgARAAAaCwJAIAEoAkQiAkUNAEGYzwAoAgAiAwRAIAIgAxEBAAwBCyACQQBBlM8AKAIAEQAAGgsCQCABKAI0IgJFDQBBmM8AKAIAIgMEQCACIAMRAQAMAQsgAkEAQZTPACgCABEAABoLAkAgASgCACIBRQ0AQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCyAAKAIAIgAEQAJAQZjPACgCACIBBEAgACABEQEADAELIABBAEGUzwAoAgARAAAaCwtBACECIAQoAmgiAEHMAmoiASgCNCIHBEADQAJAIAJBAnQiCCABKAIsaigCACIDKAJsIgVFDQBBmM8AKAIAIgoEQCAFIAoRAQAMAQsgBUEAQZTPACgCABEAABoLAkAgAygCWCIFRQ0AQZjPACgCACIKBEAgBSAKEQEADAELIAVBAEGUzwAoAgARAAAaCwJAIAMoAkgiA0UNAEGYzwAoAgAiBQRAIAMgBREBAAwBCyADQQBBlM8AKAIAEQAAGgsCQCABKAIsIAhqKAIAIgNFDQBBmM8AKAIAIgUEQCADIAURAQAMAQsgA0EAQZTPACgCABEAABoLIAJBAWoiAiAHRw0ACwsCQCABKAL0ASICRQ0AQZjPACgCACIDBEAgAiADEQEADAELIAJBAEGUzwAoAgARAAAaCwJAIAEoAuQBIgJFDQBBmM8AKAIAIgMEQCACIAMRAQAMAQsgAkEAQZTPACgCABEAABoLAkAgASgC1AEiAkUNAEGYzwAoAgAiAwRAIAIgAxEBAAwBCyACQQBBlM8AKAIAEQAAGgsCQCABKALEASICRQ0AQZjPACgCACIDBEAgAiADEQEADAELIAJBAEGUzwAoAgARAAAaCwJAIAEoArQBIgJFDQBBmM8AKAIAIgMEQCACIAMRAQAMAQsgAkEAQZTPACgCABEAABoLAkAgASgCpAEiAkUNAEGYzwAoAgAiAwRAIAIgAxEBAAwBCyACQQBBlM8AKAIAEQAAGgsCQCABKAKUASICRQ0AQZjPACgCACIDBEAgAiADEQEADAELIAJBAEGUzwAoAgARAAAaCwJAIAEoAmAiAkUNAEGYzwAoAgAiAwRAIAIgAxEBAAwBCyACQQBBlM8AKAIAEQAAGgsCQCABKAJQIgJFDQBBmM8AKAIAIgMEQCACIAMRAQAMAQsgAkEAQZTPACgCABEAABoLAkAgAUFAaygCACICRQ0AQZjPACgCACIDBEAgAiADEQEADAELIAJBAEGUzwAoAgARAAAaCwJAIAEoAiwiAkUNAEGYzwAoAgAiAwRAIAIgAxEBAAwBCyACQQBBlM8AKAIAEQAAGgsCQCABKAIcIgJFDQBBmM8AKAIAIgMEQCACIAMRAQAMAQsgAkEAQZTPACgCABEAABoLIAEoAggiAQRAAkBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLCwJAIAAoArwCIgFFDQBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLAkAgACgCrAIiAUUNAEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsCQCAAKAKcAiIBRQ0AQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCwJAIAAoAowCIgFFDQBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLAkAgACgC/AEiAUUNAEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsCQCAAKALsASIBRQ0AQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCyAAKALcASIBBEACQEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsLAkAgACgCyAEiAUUNAEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsCQCAAKAK4ASIBRQ0AQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCwJAIAAoAqgBIgFFDQBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLAkAgACgCmAEiAUUNAEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsCQCAAKAKEASIBRQ0AQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCwJAIAAoAnAiAUUNAEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsCQCAAKAJgIgFFDQBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLAkAgACgCUCIBRQ0AQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCwJAIAAoAkAiAUUNAEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsgACgCMCIABEACQEGYzwAoAgAiAQRAIAAgAREBAAwBCyAAQQBBlM8AKAIAEQAAGgsLIAQoAmgiAARAAkBBmM8AKAIAIgEEQCAAIAERAQAMAQsgAEEAQZTPACgCABEAABoLCwJAIAQoApABIgBFDQBBmM8AKAIAIgEEQCAAIAERAQAMAQsgAEEAQZTPACgCABEAABoLAkAgBCgCgAEiAEUNAEGYzwAoAgAiAQRAIAAgAREBAAwBCyAAQQBBlM8AKAIAEQAAGgsCQCAEKAKoASIARQ0AQZjPACgCACIBBEAgACABEQEADAELIABBAEGUzwAoAgARAAAaCwJAIAQoArgBIgBFDQBBmM8AKAIAIgEEQCAAIAERAQAMAQsgAEEAQZTPACgCABEAABoLAkAgBCgC0AEiAEUNACAEKALMAUHkACAEKALUASAAEQMADQAgBEEBOgDIAQsgBEHwAWokACAOBEBBkM8AKAIAIgBFDQNB7NEALQAARQ0DQd0aQQAgABEAABoMAwtBACECIAkoAnQiBEUNASAJKAJMIQ5BACEBA0AgDiABQQR0aiIAKAIIIggEQCAAKAIAIQpBACEDA0AgCiADQQJ0aigCACIAKAIoIgUEQCAAKAIgIRBBACEAA0AgECAAQQJ0aigCACIHKAIwIhJBAEchFQJAAkACQAJAAkAgBygCKCIWDgMAAQIDCyATQQFqIRMMAwsgFEEBaiEUDAILIBFBAWohEQwBCyALIBZBA0ZqIQsLIAwgEmohDCAPIBVqIQ8gAiAHKAIsRWohAiAAQQFqIgAgBUcNAAsLIAUgDWohDSADQQFqIgMgCEcNAAsLIAFBAWoiASAERw0ACwwBCyAJKAJkIQUgCSgCYCEEIAkoAowBIQcgCSgCaCEDQQAhASAJKAKUASICBEBBACEAA0AgByAAQQJ0aigCACgCTEEDbiABaiEBIABBAWoiACACRw0ACwsgBkEANgLwASAGIAE2AuwBIAZBADYC6AEgBiAFNgLkASAGIAQ2AuABIAZBATYC3AEgBkEAOgDYAQJAIARFDQBBAUEAIAUgBBEDAA0AIAZBAToA2AELQQAhACAGIANBACACEFQ2AtABIAZBADYCzAEgBkKAgICAgAE3A8ABIAYgAjYCyAEgAgRAIAZBwAFqIAIQTgNAIAYoAsABIABBA3RqIgEgByAAQQJ0aigCADYCACABIAZB2AFqNgIEIAYoAtABIQQgBiABNgL8ASAGQTs2AvgBIAMoAgAgBEECdGooAgAgBkH4AWoQTyAAQQFqIgAgAkcNAAsLIAMgBkHQAWoQRyAGLQDYASEBAkAgBigCwAEiAEUNAEGYzwAoAgAiAgRAIAAgAhEBAAwBCyAAQQBBlM8AKAIAEQAAGgsCQCAGKALgASIARQ0AIAYoAtwBQeQAIAYoAuQBIAARAwANACAGQQE6ANgBCyABQQFxBEBBkM8AKAIAIgBFDQJB7NEALQAARQ0CQd0aQQAgABEAABoMAgsgCUEBOgCsAUEAIQEgCSgClAEiAgRAIAkoAowBIQRBACEAA0AgBCAAQQJ0aigCACgCbCABaiEBIABBAWoiACACRw0ACwtBkM8AKAIAIgBFDQFB7NEALQAARQ0BIAYgATYCAEGiGCAGIAARAAAaDAELQezRAC0AACIBRSAMRUGQzwAoAgAiAEVyckUEQCAGIA82ArQBIAYgDDYCsAFBghcgBkGwAWogABEAABpB7NEALQAAIQFBkM8AKAIAIQALIABFIAFB/wFxRXJFBEAgBiANNgKgAUGiGCAGQaABaiAAEQAAGkHs0QAtAAAhAUGQzwAoAgAhAAsgAEUgAUH/AXFFckUEQCAGIAs2ApwBIAYgETYCmAEgBiAUNgKUASAGIBM2ApABQdYcIAZBkAFqIAARAAAaQezRAC0AACEBQZDPACgCACEACyABQf8BcUUgAkUgAEVyckUEQCAGIAI2AoABQcEaIAZBgAFqIAARAAAaCyAERQ0AIAkoAkwhAEEAIQ1BACERQQAhDANAQQAhCyAAIA1BBHQiA2ooAggEQANAIAAgA2ooAgAgC0ECdGooAgAiBSgCKCICBEBBACEBA0BBngwhDwJAAkACQCAFKAIgIAFBAnRqKAIAIgAoAigiBw4CAgEAC0HzDkHqDyAHQQNGGyEPDAELQdUMIQ8LIAAtALABBEAgAC0AiAFFQZDPACgCACICRXJFBEAgBiAPNgJwIAYgATYCbCAGIAs2AmggBiANNgJkIAYgDDYCYEHHHiAGQeAAaiACEQAAGkGQzwAoAgAhAgsgACgCkAEiB0UgAkVyRQRAIAYgACgCjAE2AlggBiAHNgJUIAYgDzYCUCAGIAE2AkwgBiALNgJIIAYgDTYCRCAGIAw2AkBBiCEgBkFAayACEQAAGkGQzwAoAgAhAgsgACgClAEiB0UgAkVyRQRAIAYgACgCjAE2AjggBiAHNgI0IAYgDzYCMCAGIAE2AiwgBiALNgIoIAYgDTYCJCAGIAw2AiBB7CEgBkEgaiACEQAAGgsgEUEBaiERIAUoAighAgsgDEEBaiEMIAFBAWoiASACSQ0ACyAJKAJMIQALIAtBAWoiCyAAIANqKAIISQ0ACwsgDUEBaiINIARHDQALIBFFDQBBkM8AKAIAIgBFDQAgBiARNgIQQcIYIAZBEGogABEAABoLIAZBgAJqJAAL6AkCDn8CfSMAQdAAayIAJAAgACABKAIAIgM2AgAgACABKAIENgIEIAMoAkwhASAAQgA3AjAgAEKAgICAwAA3AiggAEIANwIgIABCgICAgIABNwIYIABCADcCECAAIAE2AgwgAEEANgIIIAMoAkwhASAAQQA2AkggAEE8aiIDQoCAgIDAADcCACAAIAFBA24iAjYCOCAAIAJBH2pBBXYiAjYCRCABQQNPBEAgAyACEE4LIwBBEGsiByQAIAAoAgAiAiACKAJcIgE2AnwgAigCTCIDQQNuIQggASACKAKAAUsEfyACQfQAaiABEE4gACgCACICKAJ8BSABCwRAIAIoAnQhAQNAIAEgBEECdGpBfzYCACAEQQFqIgQgAigCfEkNAAsLIAMEQCAAQQhqIQFBACEEA0AgACgCACICKAJUIAIoAkQgBEECdGooAgBBA3RqIQlBACECIAEoAgxFBEAgARBlC0GFKiEGA0AgAiAJai0AACAGQb+ABGxqIQYgAkEBaiICQQhHDQALIAEoAgghAiABQRBqIAkQTyABQSBqIAJBAWsgBnFBAnQiAiABKAIMahBPIAEoAgwgAmogASgCKEEBazYCACABKAIYGiAEQQFqIgQgA0cNAAsLAkAgACgCPCIBRQ0AIAAoAkQiAkUNACABQQAgAEFAaygCACACbBCwARoLAkAgA0EDSQ0AQQEgCCAIQQFNGyENIABBCGohAUEAIQIDQCAAKAIELQAAQQFxDQEgACgCBCIDIAMoAhBBAWo2AhAgAxBKAkAgACAAKAIAKAJsIgggAhCcAUUNAEEAIQZBAEEkQZTPACgCABEAAEEAQSQQsAEiA0EANgIcIANBBDYCFCADQQA2AgwgA0EENgIEIAcgAzYCDCAAKAIAQeQAaiAHQQxqEE8gBygCDCAAKAIAIgMoAjwEfyADKAI0IAJBAnRqKAIABUEACzYCICAAIAggAhCdAQNAQQAhCyAGIAcoAgwoAggiDk8NAQNAIAcoAgwoAgAgBkECdGooAgBBA2whD0EAIQkDQAJ/IAAoAgAiAygCVCADKAJEIAkgD2pBAnRqKAIAQQN0aiEDQQAhBEF/IAEoAgwiCkUNABpBhSohBQNAIAMgBGotAAAgBUG/gARsaiEFIARBAWoiBEEIRw0ACyAKIAEoAghBAWsgBXFBAnRqKAIAIgRBf0cEQCABKAIgIQUgAyoCBCEQIAMqAgAhESABKAIQIQoDQAJAIAogBEEDdGoiDCoCACARXA0AIAwqAgQgEFwNACAEDAMLIAUgBEECdGooAgAiBEF/Rw0ACwtBfwsiBEF/RwRAA0AgACAIIARBA24iBRCcAQRAIAAgCCAFEJ0BQQEhCwsCfyABKAIgIgUgBEECdGooAgAiBEF/RwRAIAMqAgQhECADKgIAIREgASgCECEKA0ACQCAKIARBA3RqIgwqAgAgEVwNACAMKgIEIBBcDQAgBAwDCyAFIARBAnRqKAIAIgRBf0cNAAsLQX8LIgRBf0cNAAsLIAlBAWoiCUEDRw0ACyAGQQFqIgYgDkkNAAsgCw0ACwsgAkEBaiICIA1HDQALCyAHQRBqJAACQCAAKAI8IgFFDQBBmM8AKAIAIgMEQCABIAMRAQAMAQsgAUEAQZTPACgCABEAABoLIABBCGoQSSAAQdAAaiQAC8YBAQN/IAAoAigEQANAIAFBAnQiAiAAKAIgaigCABBkGgJAIAAoAiAgAmooAgAiAkUNAEGYzwAoAgAiAwRAIAIgAxEBAAwBCyACQQBBlM8AKAIAEQAAGgsgAUEBaiIBIAAoAihJDQALCwJAIAAoAiAiAUUNAEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsgACgCECIABEBBmM8AKAIAIgEEQCAAIAERAQAPCyAAQQBBlM8AKAIAEQAAGgsLtQoDDX8BfgF9IwBBIGsiByQAAkAgASgCBCIERQRAIABBADYCECAAQQA2AiAgACAAKAIINgIAIAAgACgCGDYCBAwBCyAAIAQ2AhAgBCAAKAIUSwRAIABBCGogBBBOCyAAIAQ2AiAgBCAAKAIkSwRAIABBGGogBBBOCyAAQQA6ACggACAAKAIINgIAIAAgACgCGDYCBCAEQSBPBEAgASgCACEJA0AgCSACQQJ0aiIBIAEoAgAiAUEfdUGAgICAeHIgAXM2AgAgAkEBaiICIARHDQALIAcgCTYCECAHIAQ2AhQgByAHKQMQNwMIIwBBkChrIgEkACABIAcpAggiDzcDACABIA83AwggAUGQCGohA0EAIQIjAEEQayIFJAADQCAFIAJBAnRqIAMgAkEKdGo2AgAgAkEBaiICQQRHDQALIANBAEGAIBCwARogASgCBEECdCIDBEAgAyABKAIAIgJqIQMgBSgCDCEGIAUoAgghCiAFKAIEIQwgBSgCACENA0AgDSACLQAAQQJ0aiIIIAgoAgBBAWo2AgAgDCACLQABQQJ0aiIIIAgoAgBBAWo2AgAgCiACLQACQQJ0aiIIIAgoAgBBAWo2AgAgBiACLQADQQJ0aiIIIAgoAgBBAWo2AgAgAkEEaiICIANHDQALCyAFQRBqJAAgD0IgiKchBiAPpyENIAAtACghCgNAIAYgAUGQCGogDkEKdGoiCCANIA5qIgwtAABBAnRqKAIARwRAIAEgACgCBCIFNgIQQQEhAyAFIQIDQCADQQJ0IgsgAUEQamogAiAIIAtqQQRrKAIAQQJ0aiICNgIAIANBAWoiA0GAAkcNAAsCQCAKBEAgBkUNASAAKAIAIQJBACEDA0AgAUEQaiAMIAIgA0ECdGooAgAiCEECdGotAABBAnRqIgsgCygCACILQQRqNgIAIAsgCDYCACADQQFqIgMgBkcNAAsMAQtBACEDIAYEQANAIAFBEGogDCADQQJ0ai0AAEECdGoiAiACKAIAIgJBBGo2AgAgAiADNgIAIANBAWoiAyAGRw0ACwtBASEKIABBAToAKAsgACAAKAIANgIEIAAgBTYCAAsgDkEBaiIOQQRHDQALIApFBEAgBgRAIAAoAgAhAkEAIQMDQCACIANBAnRqIAM2AgAgA0EBaiIDIAZHDQALCyAAQQE6ACgLIAFBkChqJABBASAEIARBAU0bIQBBACECA0AgCSACQQJ0aiIBIAEoAgAiAUEfdkEBa0GAgICAeHIgAXM2AgAgAkEBaiICIABHDQALDAELIAcgASkCACIPNwMAIAcgDzcDGAJAIAAiAi0AKARAIAcoAgQiBEEBRg0BIAcoAgAhAyACKAIAIQVBASEBA0AgAyAFIAFBAnRqKAIAIgZBAnRqKgIAIRAgASEAAkADQCAQIAMgBSAAQQFrIgJBAnRqKAIAIglBAnRqKgIAXUUNASAFIABBAnRqIAk2AgAgAiIADQALQQAhAAsgACABRwRAIAUgAEECdGogBjYCAAsgAUEBaiIBIARHDQALDAELIAIoAgAiA0EANgIAIAcoAgQiBkEBRwRAIAcoAgAhBEEBIQEDQCADIAFBAnQiAGogATYCACAAIARqKgIAIRAgASEAAkADQCAQIAQgAyAAQQFrIgVBAnRqKAIAIglBAnRqKgIAXUUNASADIABBAnRqIAk2AgAgBSIADQALQQAhAAsgACABRwRAIAMgAEECdGogATYCAAsgAUEBaiIBIAZHDQALCyACQQE6ACgLCyAHQSBqJAALzRMBFX8jAEGAAWsiBCQAAkAgACgCCC0AAEEBcQ0AQQBBxABBlM8AKAIAEQAAIQUgASgCACECIAVCADcCPCAFQoCAgIDAADcCNCAFQgA3AiwgBUKAgICAwAA3AiQgBUIANwIcIAVCgICAgMAANwIUIAVCADcCDCAFQoCAgIDAADcCBCAFIAI2AgAjAEEwayICJAAgBSAFKAIAKAI0QQNuIgM2AgwgBUEEaiEKIAMgBSgCEEsEQCAKIAMQTgsCQCAKKAIAIgNFDQAgBSgCDCIGRQ0AIANB/wEgBSgCCCAGbBCwARoLIAJCADcDKCACQoCAgIDAADcDICAFIAUoAgAoAjQiA0EDbiILNgIsIAVBJGohDCALIAUoAjBLBEAgDCALEE4LIAJBfzYCHAJAIANBA0kNACAFQTRqIRIgBUEUaiETQQAhAwNAIAUoAgAhBiAFKAIEIQ0DQAJAIA0gA0ECdGoiCCgCAEF/RgRAIAYtAARBAXFFDQEgBigCDCADai0AAEUNAQsgA0EBaiIDIAtHDQEMAwsLIAIgAzYCHCAIIAk2AgAgDCgCACACKAIcQQJ0akF/NgIAIBMgAkEcaiIGEE8gAkEANgIoIAJBIGogBhBPIAIoAhwhDSACQQE2AhgDQCACKAIoIgYEQCACKAIgIAZBAnRqQQRrKAIAIQYgAkEgahBqQX8hDiAFKAIAIg8tAARBBHEEQCAPKAIcIAZBAnRqKAIAIQ4LIAZBA2whEEEAIQYDQAJAIAUoAgAgDygCLCIIIAZBAWoiFUEDcCAQakECdGooAgAgCCAGIBBqQQJ0aigCABBrIghBf0YNACACIAhBA24iCDYCFCAFKAIAIhEoAgQiFkEBcQRAIBEoAgwgCGotAAANAQsgFkEEcQR/IBEoAhwgCEECdGooAgAFQX8LIA5HDQAgCigCACAIQQJ0aiIIKAIAQX9HDQAgCCAJNgIAIAwoAgAiCCACKAIUQQJ0akF/NgIAIA1Bf0cEQCAIIA1BAnRqIAIoAhQ2AgALIAIgAigCGEEBajYCGCACKAIUIQ0gAkEgaiACQRRqEE8LIBUgBiAGQQNJGyIGQQNHDQALDAELCyADQQFqIQMgEiACQRhqEE8CQCAJQQFqIglBf0cNAEGQzwAoAgAiBkUNACACQeoWNgIIIAJBvAw2AgQgAkGgDzYCAEHVHSACIAYRAAAaCyACQX82AhwgAyALSQ0ACwsCQCACKAIgIgNFDQBBmM8AKAIAIgYEQCADIAYRAQAMAQsgA0EAQZTPACgCABEAABoLIAJBMGokAAJAIAAoAggtAABBAXENACABKAIEIgIgBSgCPCIGNgIIAkACQCAGIAIoAgxLBEAgAiAGEE4MAQsgBg0AQQEhFAwBCwNAQQBBMEGUzwAoAgARAAAhAiABKAIAIQMgAkIANwIoIAJCgICAgMAANwIgIAJCADcCGCACQoCAgIDAADcCECACIAc2AgwgAiAFNgIIIAIgAzYCBCACIAc2AgAgASgCBCgCACAHQQJ0aiACNgIAIAdBAWoiByAGRw0ACwsgASgCCCEHIAEoAgAhCUEAIQsjAEFAaiICJAAgB0EANgIIIAkoAjQhAyACQQA2AhAgA0EDTwRAIANBA24hC0EAIQMDQAJAAkAgBQRAIAUoAgQgA0ECdGooAgBBf0YNAQwCCyAJLQAEQQFxRQ0BIAkoAgwgA2otAABFDQELIAcgAkEQahBPIAIoAhAhAwsgAiADQQFqIgM2AhAgAyALSQ0ACyAHKAIIIQsLIAcgC0EDbCIDNgIYIAdBEGohDSADIAcoAhxLBEAgDSADEE4LIAkoAkQhCiAHQQA2AiggB0EgaiEIIAMgCiADIApJGyIDIAcoAixLBEAgCCADEE4LIAJCADcDOCACQgA3AyggAkKAgICAwAA3AzAgAkKAgICAwAA3AyAgAkIANwMYIAIgAzYCFCACQQQ2AhAgCwRAQQAhCgNAIApBA2whDyAHKAIAIApBAnRqKAIAQQNsIRBBACEMA0AgAiAJKAIsIAwgEGpBAnRqKAIAIg42AgwCQAJAIAIoAhwiA0UNACADIAIoAhhBAWsgDnFBAnRqKAIAIgNBf0YNACACKAIwIREgAigCICESA0AgEiADQQJ0IhNqKAIAIA5GDQIgESATaigCACIDQX9HDQALCyACQRBqIAJBDGoiDhBsIQMgCCAOEE8LIA0oAgAgDCAPakECdGogAzYCACAMQQFqIgxBA0cNAAsgCkEBaiIKIAtHDQALCyACQRBqEEkgAkFAayQAQQAhAiAEQQA2AnQgBEKAgICAwAA3A2ggBCAGNgJwAkAgFARAIAQoAmghBwwBCyAEQegAaiAGEE4gASgCBCgCACEDIAQoAmghBwNAIAcgAkECdCIJaiADIAlqKAIAIgkoAggoAjQgCSgCDEECdGooAgCzOAIAIAJBAWoiAiAGRw0ACwsgBEIANwNYIARCADcDSEEAIQIgBEEAOgBgIAQgBzYCMCAEIAQoAnA2AjQgBEKAgICAwAA3A1AgBEKAgICAwAA3A0AgBCAEKQMwNwMAIARBOGogBBBZIAQgACgCADYCECAEIAAoAgQ2AhQgBCAAKAIINgIYIAQgACgCDCIDNgIcIAQgACgCEDYCICAEIAAoAhQ2AiQgBCAAKAIYNgIoIAQgAyAEQRBqIAYQVDYCCCAURQRAA0AgACgCDCEDIAQoAgghByAEIAEoAgQoAgAgBiACQX9zakECdGooAgA2AnwgBEE9NgJ4IAMoAgAgB0ECdGooAgAgBEH4AGoQTyACQQFqIgIgBkcNAAsLIAAoAgwgBEEIahBHAkAgBCgCUCIARQ0AQZjPACgCACIBBEAgACABEQEADAELIABBAEGUzwAoAgARAAAaCwJAIAQoAkAiAEUNAEGYzwAoAgAiAQRAIAAgAREBAAwBCyAAQQBBlM8AKAIAEQAAGgsgBCgCaCIARQ0AQZjPACgCACIBBEAgACABEQEADAELIABBAEGUzwAoAgARAAAaCwJAIAUoAjQiAEUNAEGYzwAoAgAiAQRAIAAgAREBAAwBCyAAQQBBlM8AKAIAEQAAGgsCQCAFKAIkIgBFDQBBmM8AKAIAIgEEQCAAIAERAQAMAQsgAEEAQZTPACgCABEAABoLAkAgBSgCFCIARQ0AQZjPACgCACIBBEAgACABEQEADAELIABBAEGUzwAoAgARAAAaCwJAIAUoAgQiAEUNAEGYzwAoAgAiAQRAIAAgAREBAAwBCyAAQQBBlM8AKAIAEQAAGgtBmM8AKAIAIgAEQCAFIAARAQAMAQsgBUEAQZTPACgCABEAABoLIARBgAFqJAALoI4BA0J/HX0EfiMAQcABayIKJAACQCAARQRAQZDPACgCACIARQ0BQdgjQQAgABEAABoMAQsgAEGkAWoiKigCACEDAkACQCAAKAJ0RQRAIAMEQCAAQaQBaiEqIABBnAFqIQYMAgtBkM8AKAIAIgBFDQNBqx9BACAAEQAAGgwDCyAAQZwBaiEGIAMNACAALQBcDQFBkM8AKAIAIgBFDQJB1yBBACAAEQAAGgwCCyAALQCsAQ0AQZDPACgCACIARQ0BQdcgQQAgABEAABoMAQsgASoCCEMAAAAAXQRAQZDPACgCACIDBEBBoyVBACADEQAAGgsgAUEANgIICyAAEEQgACgCCCIDBEACQEGYzwAoAgAiAgRAIAMgAhEBAAwBCyADQQBBlM8AKAIAEQAAGgsgAEEANgIICyAAKAIAIgMEQAJAQZjPACgCACICBEAgAyACEQEADAELIANBAEGUzwAoAgARAAAaCyAAQQA2AgALQQAhAiAAQQA2AhwgCkKAgICAwAA3A5ABIApCADcDiAEgCkKAgICAwAA3A4ABIApCADcDcCAKQgA3A2AgCkIANwNQIApCADcDmAEgCkEAOgCgASAKQbGX0wM2ArwBIApCoKvprNH2jokfNwK0ASAKQoCAgIDAADcDaCAKQoCAgIDAADcDWCAKQoCAgIDAADcDSCAKQgA3A0AgCkKAgICAwAA3AzggCkIANwKkASAKQoCAgIDQovOtBzcCrAECQCAAKAKkAQRAA0AgBigCACACQQJ0aigCACENQQAhByMAQeABayIEJAAgDSANKAIAIgMoAlwiCDYCDCAIIA0oAhBLBEAgDUEEaiAIEE4gDSgCDCEIIA0oAgAhAwsgDSgCBCADKAJUIAhBA3QQrgEaIA0oAgwhAyAEQQA2AtABIAQgA0EfaiIIQQV2Igs2AswBIARCgICAgMAANwLEASAEIAM2AsABIAhBIE8EQCAEQcABakEEciALEE4LIARCgICAgMAANwOoASAEQgA3A6ABIARCgICAgMAANwOYASAEQgA3A4gBIARCADcDeCAEQgA3A2ggBEIANwNYIARCADcDSCAEQgA3A7ABIARBADoAuAEgBEKAgICAgAE3A4ABIARCgICAgIABNwNwIARCgICAgIABNwNgIARCgICAgMAANwNQIARCgICAgIABNwNAIA0oAgAiCCgCbARAIARBQGshDCAKQegAaiEPA0AgCCgCZCAHQQJ0aigCACEIQQBB5ABBlM8AKAIAEQAAIgNBBGpBAEHQABCwARogA0IANwJcIANCgICAgMAANwJUIANBADYCLCADQQQ2AiQgBCADNgIcIANBfzYCACADIAgoAiA2AgQgAyAIKAIQNgIIIAMgCCgCGDYCDCADIA0oAgQ2AhggAyANKAIMNgIcIAMgCCgCCCILNgJcIAsEfyADQdQAaiALEE4gBCgCHCgCVAVBAAsgCCgCACAIKAIIQQJ0EK4BGgJAIAQoAsQBIgNFDQAgBCgCzAEiCEUNACADQQAgBCgCyAEgCGwQsAEaC0EAIQMCQCAEKAIcIggoAgxFBEAgCEEANgIQIAhBEGohEEMAAAAAIUQMAQsDQCAEIAgoAgggA0ECdGooAgAiCzYC2AEgBCgCxAEgC0EDdkH8////AXFqIhAoAgAiCUEBIAt0IgtxRQRAIBAgCSALcjYCACAIQSBqIARB2AFqEE8gBCgCHCEICyADQQFqIgMgCCgCDCILSQ0ACyAIQQA2AhAgCEEQaiEQQwAAAAAhRCALQQNJDQAgC0EDbiEOIAgoAhghAyAIKAIIIRNBACELA0AgRCADIBMgC0EMbGoiCSgCAEEDdGoiEioCACADIAkoAghBA3RqIhQqAgAiRJMgAyAJKAIEQQN0aiIJKgIEIBQqAgQiRZOUIAkqAgAgRJMgEioCBCBFk5STQwAAAD+Ui5IhRCALQQFqIgsgDkcNAAsgCCBEOAIQCyAIIERDAAAAP5QiRDgCECBEQwAAADRdBEAgEAJ9IAgoAigiCyAIKAIcIAsbIglFBEBDAACA/yFFQwAAgP8MAQsgCCgCGCEQQ///f/8hRUP//39/IURBACEDQ///f38hRkP//3//IUcDQCBEIBAgCwR/IAgoAiAgA0ECdGooAgAFIAMLQQN0aiIOKgIEIkhdIRMgRiAOKgIAIkldIQ4gRCBIIBMbIUQgRiBJIA4bIUYgRSAQIAsEfyAIKAIgIANBAnRqKAIABSADC0EDdGoiDioCBCJIIEUgSF4bIUUgRyAOKgIAIkggRyBIXhshRyADQQFqIgMgCUcNAAsgRSBEkyFFIEcgRpMLQwAAAD+UIEVDAAAAP5SUIkQ4AgALIAggRDgCFEEAIQMgBEEANgJIIAgoAigiCyAIKAIccgRAIAtFIQsDQCAEIAgoAhggCwR/IAMFIAgoAiAgA0ECdGooAgALQQN0aikCADcD2AEgDCAEQdgBahBPIAQoAhwiCCgCKCIQRSELIANBAWoiAyAQIAgoAhwgEBtJDQALCyAEQgA3AwggBEIANwMQIARBIGogBEEIahBcIAQoAhwiAyAEKQMgNwIwIAMgBCkDKDcCOCADIAQpAzA3AkAgAyAEKQM4NwJIIA8gBEEcahBPIAdBAWoiByANKAIAIggoAmxJDQALCyAEQSBqEF0CQCAEKALEASIDRQ0AQZjPACgCACIHBEAgAyAHEQEADAELIANBAEGUzwAoAgARAAAaCyAEQeABaiQAIAJBAWoiAiAqKAIASQ0ADAILAAsgCkE4aiENIAAoAmghECMAQTBrIgYkAAJAIAAoAjQiA0UNACAAKAJMIQcDQCAHIAhBBHRqIgIoAggiCwRAIAIoAgAhCUEAIQIDQCAJIAJBAnRqKAIAKAIoIARqIQQgAkEBaiICIAtHDQALCyAIQQFqIgggA0cNAAsgBEUNACAGQSBqIgNBAEGcAUGUzwAoAgARAAAiAjYCACACQoCAgIDAADcCiAEgAkIANwKAASACQoCAgIDAADcCeCACQgA3AmggAkKAgICAgAE3AmAgAkIANwJYIAJCgICAgIABNwJQIAJCADcCSCACQoCAgICAATcCQCACQgA3AjggAkKAgICAwAA3AjAgAkIANwIoIAJCgICAgIABNwIgIAJCADcCkAEgAkEAOgCYASAGIBAgAyAEEFQ2AhhBACEIIAZBADYCFCAGQoCAgICAATcDCCAGIAQ2AhAgBkEIaiAEEE4gACgCNCICBEBBACEHA0BBACELIAdBBHQiCSAAKAJMaigCCCIMBEADQCAAKAJMIAlqKAIAIAtBAnRqKAIAIg8oAigiDgRAQQAhAgNAIAYoAgggCEEDdGoiEyAPKAIgIAJBAnRqKAIANgIAIAYoAhghEiAGIBM2AiwgBkE+NgIoIBAoAgAgEkECdGooAgAgBkEoahBPIAhBAWohCCACQQFqIgIgDkcNAAsLIAtBAWoiCyAMRw0ACyAAKAI0IQILIAdBAWoiByACSQ0ACwsgECAGQRhqEEcgDSAENgI4IA1BMGohByAEIA0oAjxLBEAgByAEEE4LQQEgBCAEQQFNGyEEQQAhAgNAIAcoAgAgAkECdGogBigCCCACQQN0aigCBDYCACACQQFqIgIgBEcNAAsCQCAGKAIIIgJFDQBBmM8AKAIAIgQEQCACIAQRAQAMAQsgAkEAQZTPACgCABEAABoLIAMoAgAQXSADKAIAIgMEQAJAQZjPACgCACICBEAgAyACEQEADAELIANBAEGUzwAoAgARAAAaCwsLIAZBMGokAAsgCkE4aiENIAAoAmAhIiAAKAJkIStBACEEQwAAAAAhREEAIQYjAEGwBWsiBSQAAkAgIgRAQQJBACArICIRAwBFDQELIA0oAjghHAJAQZDPACgCACIDRQ0AQezRAC0AAEUNACAFIBw2AsABQagXIAVBwAFqIAMRAAAaCyAcRQRAICIEQEECQeQAICsgIhEDAEUNAgtBASEEDAELIA0gASoCCCJFOAJ0IAEoAgwiAyABKAIEQQF0aiIXQQAgAxsiA0EAIEVDAAAAAF4bIRACQEEAIAMgRUMAAAAAXxsNACAXQQAgAxsiAkGACCACIEVDAAAAAF8bIAMbIRcgDSgCMCEDA0AgRCADIAZBAnRqKAIAKgIUkiFEIAZBAWoiBiAcRw0ACyAXRQRAQQECfyBFIEWUIESUQwAAQD+VQwAAgD+XkSJGQwAAgE9dIEZDAAAAAGBxBEAgRqkMAQtBAAtBAWsiA0EBdiADciIDQQJ2IANyIgNBBHYgA3IiA0EIdiADciIDQRB2IANyQQFqIgMgA0EBTRshFwsgRUMAAAAAX0UNACANIBcgF2yzIERDAABAP5VDAACAP5eVkSJEOAJ0QZDPACgCACIDRQ0AQezRAC0AAEUNACAFIES7OQOwAUHZGyAFQbABaiADEQAAGgsgBUEANgL8BCAFQoCAgIDAADcD8AQgBSAcNgL4BCAFQfAEaiAcEE4gBUEANgLsBCAFQoCAgICAATcD4AQgBSAcNgLoBCAFQeAEaiAcEE5BASAcIBxBAU0bIQggEEEARyEHIBezIUtD//9/fyFPA0ACQCAeQQJ0IgkgDSgCMGooAgAiBioCECJEQwAAAABbBEBDAACAPyFIDAELIA0qAnQgBioCFCBElZGUIki8QYKAgPwHa0F+SQ0AQZDPACgCACIDRQ0AIAVBgsEANgKoASAFQbwMNgKkASAFQcgWNgKgAUHVHSAFQaABaiADEQAAGgsgBigCKCECAkACQAJAIAEtABQiDARAIAYoAhwhCwwBCyACIAYoAhwiCyACGyIDDQELQ///f38hRkP//39/IUcMAQsgBigCGCEPQ///f38hR0EAIQRD//9/fyFGA0AgRyAPIAIEfyAGKAIgIARBAnRqKAIABSAEC0EDdGoiDioCBCJEIEQgR14bIUcgRiAOKgIAIkQgRCBGXhshRiAEQQFqIgQgA0cNAAsLAkAgAiALckUEQEMAAAAAIURBACELQwAAAAAhRQwBCyAGKAIYIQ9DAAAAACFFQQAhA0MAAAAAIUQDQCAPIAIEfyAGKAIgIANBAnRqKAIABSADC0EDdGoiBCoCBCFKIAQqAgAhSQJ9IAwEQCAGKgI4IUwgBioCPCFNIAQgSSAGKgIwlCBKIAYqAjSUkiJSOAIAIAQgSSBMlCBKIE2UkiJKOAIEIFIgBioCQJMhSSBKIAYqAkSTDAELIEkgRpMhSSBKIEeTCyFKIAQgSCBJlCJJOAIAIAQgSCBKlCJKOAIEIEUgSiBFIEpeGyFFIEQgSSBEIEleGyFEIANBAWoiAyACIAYoAhwiCyACG0kNAAsgREMAAAAAXkUgRUMAAAAAXkVyDQACfyBEjSJGi0MAAABPXQRAIEaoDAELQYCAgIB4CyEEAn8gAS0AEUUEQCBFjSJGi0MAAABPXQRAIEaoDAILQYCAgIB4DAELIAEoAgRBAXRBAXIiAyAEakEDakF8cSADayEEAn8gRY0iRotDAAAAT10EQCBGqAwBC0GAgICAeAsgA2pBA2pBfHEgA2sLIQMgAiALckUEQCADsiFFIASyIURBACELDAELIAOyIUYgBLIhRyAGKAIYIQxBACEDA0AgDCACBH8gBigCICADQQJ0aigCAAUgAwtBA3RqIgQgBCoCACBElSBHlDgCACAEIAQqAgQgRZUgRpQ4AgQgA0EBaiIDIAIgBigCHCILIAIbSQ0ACyBHIUQgRiFFCyABKAIAIQQCQAJAAkAgEARAQQAhAyAEQQFrIBBJDQEgECABKAIEQQF0ayEECyAHIQMgBEUNAQsgRCAEs0MAAIC/kiJGXiBFIEZeckUNAAJAIANFDQBBkM8AKAIAIgNFDQBB7NEALQAARQ0AIAUgBDYCnAEgBSAENgKYASAFIEW7OQOQASAFIB42AoABIAUgRLs5A4gBQYoaIAVBgAFqIAMRAAAaIAYoAhwhCyAGKAIoIQILIAIgC3IhA0EAIQtBACEEIANFDQEgRiBEIEUgRCBFXhuVIUQgAkUhA0EAIQIDQCAGKAIYIANBAXEEfyACBSAGKAIgIAJBAnRqKAIAC0EDdGoiAyBEIAMqAgSUIkUgRiBFIEZdGzgCBCADIEQgAyoCAJQiRSBGIEUgRl0bOAIAIAYoAigiBEUhAyACQQFqIgIgBCAGKAIcIgsgBBtJDQALDAELIAIhBAtDAAAAACFFQwAAAAAhRAJAIAQgC3JFDQAgASgCBLNDAAAAP5IhRiAGKAIYIQtBACEDA0AgCyAEBH8gBigCICADQQJ0aigCAAUgAwtBA3RqIgIgAioCACBGkiJHOAIAIAIgRiACKgIEkiJIOAIEIEUgSCBFIEheGyFFIEQgRyBEIEdeGyFEIANBAWoiAyAEIAYoAhwgBBtJDQALIEQgS14gRSBLXnJFDQBBkM8AKAIAIgNFDQBB7NEALQAARQ0AIAUgRbs5A3AgBSAeNgJgIAUgRLs5A2hB2CUgBUHgAGogAxEAABoLIAUoAuAEIB5BA3RqIgMgRTgCBCADIEQ4AgAgBSgC8AQiAyAJaiBEIEWSIkQ4AgAgUyBEIEQgU10bIVMgTyBEIEQgT14bIU8gHkEBaiIeIAhHDQALIAUgAzYC2AQgBSAFKAL4BDYC3AQgBSAFKQPYBDcDWCANQUBrIAVB2ABqEFkgDSgCQCE1IAVCADcD0AQgBUKAgICAgAE3A8gEIAVCADcDkAIgBUHIBGogBUGQAmoQTyABLQATIS8gBUGwBGoiNkIANwMAIAVBADYCwAQgBUIINwO4BCAFQgA3A6gEIAVBkARqIjdCADcDACAFQQA2AqAEIAVCCDcDmAQgBUIANwOIBCAFQgA3A/ADIAVBADYCgAQgBUIINwP4AyAFQgA3A+gDIAVB0ANqIjhCADcDACAFQQA2AuADIAVCCDcD2AMgBUIANwPIAyAFQbADaiI5QgA3AwAgBUEANgLAAyAFQgg3A7gDIAVCADcDqAMgBUIANwOQAyAFQQA2AqADIAVCCDcDmAMgBUIANwOIAyAFQgA3A6ACIAVCADcDqAIgBUEANgKAAyAFQgQ3A/gCIAVCADcD8AIgBUIENwPoAiAFQgA3A+ACIAVCBDcD2AIgBUIANwPQAiAFQgQ3A8gCIAVBADYCxAIgBUKAgICAwAA3A5ACIAVCADcDmAIgBUIANwOIAiAFQoCAgICAATcDgAIgBUIANwOABUEBIBwgHEEBTRshOiANQSBqITIgUyBPk0MAAIC9lCFdIAVBgAJqIAVBgAVqEE8gHLMhXiAFQdQDaiE7IAVBlANqITwgBUG0A2ohPSAFQbQEaiE+IAVB9ANqIT8gBUGUBGohQCAFQeABakEIciFBQQEhM0EAIR5BACEIQQAhCwJ/AkADQCA1IBwgHkF/c2pBAnRqKAIAIidBAnQiICANKAIwaigCACEbAn8gBSgC4AQgJ0EDdGoiAyoCBI0iRItDAAAAT10EQCBEqAwBC0GAgICAeAsgASgCBCICaiEEIAVBqARqAn8gAyoCAI0iRItDAAAAT10EQCBEqAwBC0GAgICAeAsgAmogBEEBEF8gAS0AFQRAIAVByANqIAUoAqwEIAUoAqgEQQEQXwsCQCABLQAQRQ0AIAVBiARqIAUoAqgEIAUoAqwEQQEQXyABLQAVRQ0AIAVBqANqIAUoAqwEIAUoAqgEQQEQXwsgGygCDCIDQQNPBEAgA0EDbiEOQQAhAwNAIANBA2whAkEAIQYDQCAFQeABaiAGQQN0aiAbKAIYIBsoAgggAiAGakECdGooAgBBA3RqKQIANwMAIAZBAWoiBkEDRw0ACyAFIAVBqARqNgLYASAFIAVByANqQQAgAS0AFRs2AtwBIAUgBSgCrASzOALUASAFIAUoAqgEszgC0AEgBUGABWoiAiAFKQLgATcCACACIAUpAvABNwIIIEEpAgAhYSACQgA3AhggAiBhNwIQIAJCADcCICACQgA3AiggAioCECACKgIAIkSTIAIqAgwgAioCBCJFk5QgAioCCCBEkyACKgIUIEWTlJNDAAAAAF0EQCACKQIIIWEgAiACKQIANwIIIAIgYTcCAAsgAioCFCACKgIEIkSTIAIqAgggAioCACJFk5QgAioCECBFkyACKgIMIESTlJNDAAAAAFwEQCACIAIqAgAiRiACKgIIIkeTIkRDAACAPyACKgIEIkggAioCDCJJkyJFIEWUIEQgRJSSkZUiRJQ4AhwgAiBEIEWMlDgCGCACIAIqAhAiSiBGkyJEQwAAgD8gAioCFCJGIEiTIkUgRZQgRCBElJKRlSJElDgCLCACIEQgRYyUOAIoIAIgRyBKkyJEQwAAgD8gSSBGkyJFIEWUIEQgRJSSkZUiRJQ4AiQgAiBEIEWMlDgCIAsgBSoClAUgBSoChAUiRJMgBSoCiAUgAioCACJFk5QgBSoCkAUgRZMgBSoCjAUgRJOUk0MAAAAAXARAIwBBoAFrIgckACACKgIEIkQgAioCDCJFIAIqAhQiRiBFIEZdGyJHIEQgR10bIkdDAAAAACBHQwAAAABeG45DAAAAP5IiRyBEIEUgRiBFIEZeGyJIIEQgSF4bIkggBSoC1AFDAACAv5IiSSBIIEldG41DAAAAP5IiX18EQCAFQdgBaiEJIAIqAgAiSCACKgIIIkkgAioCECJKIEkgSl4bIksgSCBLXhsiSyAFKgLQAUMAAIC/kiJMIEsgTF0bjUMAAAA/kiFYIEggSSBKIEkgSl0bIksgSCBLXRsiS0MAAAAAIEtDAAAAAF4bjkMAAAA/kiFSIAIqAiggSoyUIAIqAiwgRpSTIVkgAioCICBJjJQgAioCJCBFlJMhWiACKgIYIEiMlCACKgIcIESUkyFbIAdByABqIRMDQAJAIF8gUiBYXwR9IEdDAAAAQZIhUCBHQwAAYECSIVUgUiFEA0ACQCACKgIcIkggVZQgAioCGCJJIERDAABgQJIiRZQgW5KSIktD8wS1wF8NACACKgIkIkYgVZQgAioCICJMIEWUIFqSkiJNQ/MEtcBfDQAgAioCLCJKIFWUIAIqAigiTiBFlCBZkpIiRUPzBLXAXw0AIEVD8wS1QGBFIEtD8wS1QGBFIE1D8wS1QGBFcnJFBEAgRyBQXUUNASBEQwAAAEGSIUggRyFGA0AgRCBIXQRAAn8gRotDAAAAT10EQCBGqAwBC0GAgICAeAshBCBEIUUDQCAJAn8gRYtDAAAAT10EQCBFqAwBC0GAgICAeAsgBBBgRQ0HIEVDAACAP5IiRSBIXQ0ACwsgRkMAAIA/kiJGIFBdDQALDAELIEcgUF1FDQAgSCBHlCBJIESUIFuSkiFLIEYgR5QgTCBElCBakpIhTCBKIEeUIE4gRJQgWZKSIU0gREMAAABBkiFcIEchSQNAIEQgXF0EQAJ/IEmLQwAAAE9dBEAgSagMAQtBgICAgHgLIQ8gRCFFIE0hSiBMIUYgSyFIA0ACQCBKQ/MENT9gRSBIQ/MENT9gRSBGQ/MENT9gRXJyRQRAIAkCfyBFi0MAAABPXQRAIEWoDAELQYCAgIB4CyAPEGBFDQgMAQsgSkPzBDW/YEUgSEPzBDW/YEUgRkPzBDW/YEVycg0AIAIqAgAhTiACKgIEIVYgAioCCCFRIAIqAgwhVCACKgIQIVcgAioCFCFgIAdBADYCmAEgByATNgKMASAHQgM3A5ABIAcgYCBJkzgCHCAHIFcgRZM4AhggByBUIEmTOAIUIAcgUSBFkzgCECAHIFYgSZM4AgwgByBOIEWTOAIIIAcgB0EIaiIENgKIASAEQwAAAL9DAACAvxCfASAEQwAAAL9DAACAvxCgASAEQwAAAD9DAACAPxCfASAEQwAAAD9DAACAPxCgAUMAAAAAIVFBACEMIAQgBCgCjAFBAnRqKAKAASIGIAQoAogBQQN0aiAGKQIANwIAIAQoAogBIhIEQCAGKgIEIVQgBioCACFOA0AgVCAGIAxBAWoiDEEDdGoiFCoCACJWlCFXIFEgTiAUKgIEIlSUIFeTkiFRIFYhTiAMIBJHDQALCyAEIFGLQwAAAD+UOAKQASAHKgKYAUMAAAAAXkUNACAJAn8gRYtDAAAAT10EQCBFqAwBC0GAgICAeAsgDxBgRQ0HCyBKIAIqAiiSIUogRiACKgIgkiFGIEggAioCGJIhSCBFQwAAgD+SIkUgXF0NAAsgAioCLCFKIAIqAhwhSCACKgIkIUYLIE0gSpIhTSBMIEaSIUwgSyBIkiFLIElDAACAP5IiSSBQXQ0ACwsgREMAAABBkiJEIFhfDQALIFAFIEdDAAAAQZILIkdgDQELCwsgB0GgAWokAAsgA0EBaiIDIA5HDQALCyABLQAQBEAgBUGoA2pBACABLQAVGyESQQAhB0EAIQ4jAEFAaiIEJAAgGykCGCFhIBspAgghYyAFQZACaiIGQQA2AjwgBiBjNwIYIAYgYT4CECAGQQA2AgggBiBhQiCIPgIUAkAgGygCUCIDRQRAIBsoAgxFDQEDQCAEIAc2AiAgBiAEQSBqEE8gB0EBaiIHIBsoAgxJDQALDAELIAMoAggiA0UNAANAIAQgGygCUCgCACAHQQJ0aigCADYCICAGIARBIGoQTyAHQQFqIgcgA0cNAAsLIAUoAqwEIg8EQCAFKAKoBCEDA0AgAwR/IA5BBnYhJUIBIA5BP3GthiFhIA6zQwAAAD+SIkVDAACAP5IhRCBFQwAAgL+SIUVBACEPA0BBACEHAkBCASAPQT9xrYYiYyAFKAK0BCIMIA9BBnYiHyAFKAKwBCITIA5sakEDdGopAwCDUARAA0ACQAJAIAdBAnQiCUGQKWooAgAgD2oiAkEASA0AIAlBsClqKAIAIA5qIglBAEggAiADTnINACAJIAUoAqwETg0AIAwgCSATbCACQQZ2akEDdGopAwAgAkE/ca2Ip0EBcQ0BCyAHQQFqIgdBCEcNAQwDCwsgBCBEOAI8IAQgRDgCNCAEIEU4AiwgBCBFOAIkIAQgD7NDAAAAP5IiRkMAAIC/kiJHOAI4IAQgRkMAAIA/kiJGOAIwIAQgRjgCKCAEIEc4AiBBACEHA0AgB0EERg0CIAQgBEEgaiIDIAdBA3RqKQMAImI3AxggBCBiNwMIIAQgB0EBaiIHQQNxQQN0IANqKQMAImI3AxAgBCBiNwMAIARBCGohFEEAIQNBACEJIwBBMGsiDCQAAkACQAJAIAYoAggiE0EVTwRAIAYoAjwNASAGEIQBDQEMAgsgEw0BDAILIAwgFCkCACJiNwMYIAwgBCkCACJkNwMQIAwgYjcDCCAMIGQ3AwAgBiAMQQhqIAwQhQEgBigCXCIVRQ0BIAYoAhwhESAGKAIQIRkgBigCGCEYIAYoAlQhIUF/IQNBACETQQEhCQNAIAMgISATQQJ0aigCACICRwRAIAwgGSARBH8gGCACQQJ0aigCAAUgAgtBA3RqKQIANwMoQX5BASACQQNwQQFLGyACaiEDIAwgGSARBH8gGCADQQJ0aigCAAUgAwtBA3RqKQIANwMgIAIhAyAUIAQgDEEoaiAMQSBqQwAAAAAQhgENAwsgE0EBaiITIBVJIQkgEyAVRw0ACwwBCyAGKAIcIRUgBigCECERIAYoAhghGSAGKAIAIRgDQCAYIANBAnRqKAIAIQIgDCARIBUEfyAZIAJBAnRqKAIABSACC0EDdGopAgA3AyhBfkEBIAJBA3BBAUsbIAJqIQIgDCARIBUEfyAZIAJBAnRqKAIABSACC0EDdGopAgA3AyAgFCAEIAxBKGogDEEgakMAAAAAEIYBIgkNASADQQFqIgMgE0cNAAsLIAxBMGokACAJQQFxRQ0ACwsgBSgClAQgBSgCkAQgDmwgH2pBA3RqIgMgAykDACBjhDcDACASRQ0AIBIoAgwgEigCCCAPbCAlakEDdGoiAyADKQMAIGGENwMACyAPQQFqIg8gBSgCqAQiA0kNAAsgBSgCrAQhDyADBUEACyEDIA5BAWoiDiAPSQ0ACwsgBEFAayQACwJAIAEoAgRFDQAgBSAFQYgEaiICIAVBqARqIgQgAS0AECIDGygCADYC6AMgBSACQQRyIARBBHIgAxsoAgA2AuwDIAUgNyA2IAMbKAIANgLwAyBAID4gAxsgPxBhIAVB6ANqIAEoAgQQYiABLQAVRQ0AIAUgBUGoA2oiAiAFQcgDaiIEIAEtABAiAxsoAgA2AogDIAUgAkEEciAEQQRyIAMbKAIANgKMAyAFIDkgOCADGygCADYCkAMgPSA7IAMbIDwQYSAFQYgDaiABKAIEEGILAkAgAS0AEkUNACAFKALwBCAgaioCACJEIE9eRQ0AIEQgXSALQQFqIgOzlCBTkl9FDQBBACEGIAUoAtAEBEADQCAFKALIBCAGQQN0akIANwIAIAZBAWoiBiAFKALQBEkNAAsLIAMhCwsgASgCBCECIAEtABAhBEEAIQMgBUEANgLgASAFQQA2AtgBIAVBADYC0AEgBUEANgLMASAFQQA2AsgBIAVBiANqIAVBqANqIAVByANqIAQbIAIbISUgBUHoA2ogBUGIBGogBUGoBGogBBsgAhshFQNAIAMiE0EBaiIDIA0oAihLBEAgBUEAQRxBlM8AKAIAEQAAIBcgFxBjNgLEASAyIAVBxAFqEE8gBUIANwOABSAFQYACaiAFQYAFahBPIC8EQEEAQRhBlM8AKAIAEQAAIgJCgICAgMAANwIIIAIgFzYCBCACIBc2AgAgAkEANgIUIAIgFyAXbCIENgIQAn8gBEUEQEEAIQRBAAwBCyACQQhqIAQQTiACKAIQQQJ0IQQgAigCCAtBACAEELABGiAFIAI2AoAFIA0gBUGABWoQTwsgBUIANwOABSAFQcgEaiAFQYAFahBPC0EAIBACfyATQQN0IiAgBSgCyARqIR8gE0ECdCI0IA0iBygCIGooAgAhFCAVIQIgBSgCgAIgIGoiBigCACEJIBAhBEEAIRhBACEhQQAhIyABLQASRSAJIAYoAgQiGWxBgCBKcUUEQAJ/IBQhESACIRIgBCEOIAkiFEEEQQEgAS0AERsiIWohLCAZICFqIS0gCSAZbCEkQf////8HIQlBASEGA0ACQCASKAIEIQIgEigCACEHAkAgGEUEQCACIQQgByECDAELIAchBCABLQAVRQ0BCwJAIB8oAgQiByAtSg0AICUgEiAYGyEwIA4gAmshMSAOIARrISgDQCAOQQAgByIMIChKGw0BAkAgHygCAEEAIAwgHygCBEYbIgcgLEoNACAZIAQgDGoiDyAPIBlIGyEjA0AgDkEAIAciDyAxShsNAQJAIBQgAiAPaiIHIAcgFEgbIgcgIyAHICNKGyIpIClsIAcgI2wiKWoiByAJSg0AIAcgCUYEQCAPIAwgDCAPSBsgBSgC4AEiQiAFKALYASJDIEIgQ0obTg0BCyARIDAgDyAMEKEBRQ0AIAUgDzYC4AEgBSAMNgLYASAFIAI2AtABIAUgBDYCzAEgBSAYNgLIASAHIQkgJCApRw0AQQEMBwsgDyAhaiEHIA8gFEwNAAsLIAwgIWohByAMIBlMDQALC0EBIRggBiECQQAhBiACDQELCyAJQf////8HRwsMAQsgAiEOIAQhDyAJIBlsITAgGUEBaiESIAlBAWohHyAHIgxB+ABqISxB/////wchBgNAAkAgDigCBCECIA4oAgAhBwJ/AkAgAS0AFUUNACAMIAwoAnhBzZsEbEG54ABqIhE2AnggDCAMNQKEASAMNQKAAUKtvZnNAn58ImE3AoABIAwgDCgCfCIEQQ10IARzIgRBEXYgBHMiBEEFdCAEczYCfCBhpyAEIBFqakEBcUUNAEEBIS0gByEEICUMAQtBACEtIAIhBCAHIQIgDgshMSASIQcgLCAPBH8gEiAPIARrIgcgByASShshByAfIA8gAmsiESARIB9KGwUgHwsQogEhGCAsIAcQogEhBwJAAkAgAS0AEUUNACAHQQNqQXxxIQcgGEEDakF8cSEYIA9FDQAgGCAPIAJrSiAHIA8gBGtKcg0BCyAJIAIgGGoiESAJIBFKGyIRIBkgBCAHaiIkIBkgJEobIiQgESAkShsiKCAobCARICRsIiRqIhEgBkoNACAGIBFGBEAgGCAHIAcgGEobIAUoAuABIiggBSgC2AEiKSAoIClIG0oNAQsgFCAxIBggBxChAUUNACAFIBg2AuABIAUgBzYC2AEgBSACNgLQASAFIAQ2AswBIAUgLUEAIAEtABUbNgLIAUEBISEgESEGICQgMEYNAQsgI0EBaiIjQYAgRw0BCwsgIQsbDQALIAUoAuABIgMgBSgC0AFqIQICQCABLQASRQ0AAkAgBSgCgAIgIGoiBCgCACACTgRAIAQoAgQgBSgC2AEiBCAFKALMAWpODQELQQAhAyAFKALQBEUNAQNAIAUoAsgEIANBA3RqQgA3AgAgA0EBaiIDIAUoAtAESQ0ACwwBCyAFKALIBCAgaiADrSAErUIghoQ3AgALIAUoAoACICBqIgMgAygCACIEIAIgAiAESBsiAjYCACADIAMoAgQiAyAFKALMASAFKALYAWoiBCADIARKGyIDNgIEAkAgEA0AIDIoAgAoAgAiBCgCACACTwRAIAMgBCgCBE0NAQsgBCACQQFrIgJBAXYgAnIiAkECdiACciICQQR2IAJyIgJBCHYgAnIiAkEQdiACckEBaiADQQFrIgNBAXYgA3IiA0ECdiADciIDQQR2IANyIgNBCHYgA3IiA0EQdiADckEBakEAEF8gL0UNACANKAIAKAIAIQIgDSgCICgCACIDKAIAIQYgAygCBCEEQQAhByMAQRBrIgMkACADQQA2AgwgA0KAgICAwAA3AwAgAyAEIAZsIgk2AgggCQR/IAMgCRBOIAMoAgAhByADKAIIQQJ0BUEACyEJIAdBACAJELABGiACKAIEIgcgBCAEIAdLGwRAQQAhBwNAIAMoAgAgBiAHbEECdGogAigCCCACKAIAIgkgB2xBAnRqIAkgBiAGIAlLG0ECdBCuARogB0EBaiIHIAIoAgQiCSAEIAQgCUsbSQ0ACwsgAiAENgIEIAIgBjYCACADIAJBCGoQngECQCADKAIAIgJFDQBBmM8AKAIAIgQEQCACIAQRAQAMAQsgAkEAQZTPACgCABEAABoLIANBEGokAAsgDSgCICA0aigCACEGIAUoAoACICBqIgMoAgAhDyADKAIEIQ4gBSgC4AEhEiAFKALYASEUICUgFSAFKALIARsiBCgCBCIVQQBKBEAgBCgCACEJQQAhAgNAIAIgFGoiDEEASCAJQQBMckUEQEEAIQMDQAJAIAMgEmoiB0EASA0AIAQoAgwgBCgCCCACbCADQQZ2akEDdGopAwAgA0E/ca2IQgGDUCAHIA9OciAMIA5Ocg0AIAYoAgwgBigCCCAMbCAHQQZ2akEDdGoiESARKQMAQgEgB0E/ca2GhDcDAAsgA0EBaiIDIAlHDQALCyACQQFqIgIgFUcNAAsLIC8EQCANKAIAIDRqKAIAIRIgBUHIA2ogBUGoBGogBSgCyAEiAxshDCAFQagDaiAFQYgEaiADG0EAIAEtABAbIQ8gBUGIA2ogBUHoA2ogAxtBACABKAIEGyEOIAUoAoACICBqIgMoAgAhGCADKAIEISAgBSgC4AEhJSAFKALYASEfQQAhByAMKAIEIiFBAEoEQCAMKAIAIRQgJ0GAgICAenIhAiAnQYCAgIB8ciEEICdBgICAgHhyIQYDQCAHIB9qIhVBAEggFEEATHJFBEAgEigCCCEnQQAhCQNAAkAgCSAlaiIRQQBIIBEgGE5yIBUgIE5yDQAgEigCACEjIAYhAwJAQgEgCUE/ca2GImEgDCgCDCAJQQZ2IhkgDCgCCCAHbGpBA3RqKQMAg0IAUg0AIA8EQCAEIQMgDygCDCAPKAIIIAdsIBlqQQN0aikDACBhg0IAUg0BCyAORQ0BIAIhAyAOKAIMIA4oAgggB2wgGWpBA3RqKQMAIGGDUA0BCyAnIBUgI2wgEWpBAnRqIAM2AgALIAlBAWoiCSAURw0ACwsgB0EBaiIHICFHDQALCwsgGyATNgIAIBsoAigiAyAbKAIccgRAIANFIQNBACECA0AgAiEGIANBAXFFBEAgGygCICACQQJ0aigCACEGCyAFKALgASEDIBsoAhggBkEDdGoiBCAEKgIAIkQgBCoCBCJFIAUoAsgBIgcbIAUoAtgBspIgASgCBLMiRpMiRzgCBCAEIEUgRCAHGyADspIgRpMiRDgCACBEvCEDAkAgREMAAAAAYCBHQwAAAABgcQ0AQZDPACgCACIHRQ0AIAVBmcMANgJIIAVBvAw2AkQgBUHTFDYCQEHVHSAFQUBrIAcRAAAaIAQoAgAhAwsCQCADQYKAgPwHa0F9TQRAIAQoAgRBgoCA/AdrQX5JDQELQZDPACgCACIDRQ0AIAVBmsMANgI4IAVBvAw2AjQgBUH6FDYCMEHVHSAFQTBqIAMRAAAaCyAbKAIoIgRFIQMgAkEBaiICIAQgGygCHCAEG0kNAAsLIB5BAWohHgJAAkAgIkUNACAIAn8gHrMgXpVDAADIQpQiRItDAAAAT10EQCBEqAwBC0GAgICAeAsiA0YNAEECIAMgKyAiEQMARQ0BIAMhCAsgHCAeSyEzIB4gOkcNAQwCCwsgAyEIQQAgMw0BGgsCQCAQRQRAIAUoAoACIgMoAgQgASgCBEEBdCICayIEQQAgBEEAShshBiADKAIAIAJrIgNBACADQQBKGyEEDAELIBAgASgCBEEBdGsiBCEGCyANIAY2AnAgDSAENgJsAkBBkM8AKAIAIgNFDQBB7NEALQAARQ0AIAUgBjYCJCAFIAQ2AiBB8xogBUEgaiADEQAAGgsgDSANKAIoIgs2AhggDUEQaiEHIAsgDSgCHEsEQCAHIAsQTiANKAIYIQsLIAsEQEEAIQMDQEMAAAAAIUQCQCANKAJsIhBFDQAgDSgCcCIJRQ0AIA0oAiAgA0ECdGooAgAiAigCDCEMIAIoAgghD0EAIQJBACEEA0AgAiAPbCEOQQAhBgNAIAQgDCAOIAZBBnZqQQN0aikDACAGQT9xrYinQQFxaiEEIAZBAWoiBiAQRw0ACyACQQFqIgIgCUcNAAsgBLMgCSAQbLOVIUQLIAcoAgAgA0ECdGogRDgCAEGQzwAoAgAiAkVB7NEALQAARXIhBAJAIAtBAk8EQCAEDQEgBSADNgIAIAUgREMAAMhClLs5AwhBiBsgBSACEQAAGgwBCyAEDQAgBSBEQwAAyEKUuzkDEEGhGyAFQRBqIAIRAAAaCyADQQFqIgMgDSgCGCILSQ0ACwsgIkUgCEHkAEZyRQRAQQBBAkHkACArICIRAwBFDQEaC0EBCyEEAkAgBSgCgAIiA0UNAEGYzwAoAgAiAgRAIAMgAhEBAAwBCyADQQBBlM8AKAIAEQAAGgsCQCAFKAL0AiIDRQ0AQZjPACgCACICBEAgAyACEQEADAELIANBAEGUzwAoAgARAAAaCwJAIAUoAuQCIgNFDQBBmM8AKAIAIgIEQCADIAIRAQAMAQsgA0EAQZTPACgCABEAABoLAkAgBSgC1AIiA0UNAEGYzwAoAgAiAgRAIAMgAhEBAAwBCyADQQBBlM8AKAIAEQAAGgsCQCAFKALEAiIDRQ0AQZjPACgCACICBEAgAyACEQEADAELIANBAEGUzwAoAgARAAAaCwJAIAUoApACIgNFDQBBmM8AKAIAIgIEQCADIAIRAQAMAQsgA0EAQZTPACgCABEAABoLAkAgBSgClAMiA0UNAEGYzwAoAgAiAgRAIAMgAhEBAAwBCyADQQBBlM8AKAIAEQAAGgsCQCAFKAK0AyIDRQ0AQZjPACgCACICBEAgAyACEQEADAELIANBAEGUzwAoAgARAAAaCwJAIAUoAtQDIgNFDQBBmM8AKAIAIgIEQCADIAIRAQAMAQsgA0EAQZTPACgCABEAABoLAkAgBSgC9AMiA0UNAEGYzwAoAgAiAgRAIAMgAhEBAAwBCyADQQBBlM8AKAIAEQAAGgsCQCAFKAKUBCIDRQ0AQZjPACgCACICBEAgAyACEQEADAELIANBAEGUzwAoAgARAAAaCwJAIAUoArQEIgNFDQBBmM8AKAIAIgIEQCADIAIRAQAMAQsgA0EAQZTPACgCABEAABoLAkAgBSgCyAQiA0UNAEGYzwAoAgAiAgRAIAMgAhEBAAwBCyADQQBBlM8AKAIAEQAAGgsCQCAFKALgBCIDRQ0AQZjPACgCACICBEAgAyACEQEADAELIANBAEGUzwAoAgARAAAaCyAFKALwBCIDRQ0AQZjPACgCACICBEAgAyACEQEADAELIANBAEGUzwAoAgARAAAaCyAFQbAFaiQAAkAgBEUNACAAIAooAmAiBDYCFCAAIAooAnA2AhggACAKKAKkATYCDCAAIAooAqgBNgIQIAAgCioCrAE4AiACf0EAIARFDQAaAkAgBEECdCIDRQRAIABBADYCCAwBCyAAQQAgA0GUzwAoAgARAAAiHTYCCEEAIAAoAhQiBEUNARoLQQAhAiAKKAJIIQMDQCAdIAJBAnQiB2ogAyAHaioCADgCACACQQFqIgIgBEcNAAsgBAshAgJAIAEtABNFDQACQCAAKAIQIAIgACgCDGxsQQJ0IgNFBEBBACEGDAELQQAgA0GUzwAoAgARAAAhBiAAKAIUIQILIAAgBjYCACACRQ0AA0AgACgCECIDBEAgACgCACAAKAIMIgQgGmwgA2xBAnRqIQggCigCOCAaQQJ0aigCACEHIAEoAgQhBiAEQQJ0IQtBACECA0AgCCACIARsQQJ0aiAHKAIIIAcoAgAgAiAGamwgBmpBAnRqIAsQrgEaIAJBAWoiAiADRw0ACyAAKAIUIQILIBpBAWoiGiACSQ0ACwsCQEGQzwAoAgAiAUUNAEHs0QAtAABFDQBB8hlBACABEQAAGgsgACgCYCIBBEBBA0EAIAAoAmQgAREDAEUNAQsgKigCACICRQRAIAAoAnQhAgsgACACNgIcQQAhAwJ/IAJBGGwiAUUEQEEAIQJBAAwBC0EAIAFBlM8AKAIAEQAAIQIgACgCHEEYbAshASAAIAI2AgQgAkEAIAEQsAEaAkAgACgCpAEEQEEAIRoDQCAAKAIEIBZBGGxqIgEgACgCnAEgFkECdGooAgAiCCgCDCIENgIUIAEgCCgCACIHKAJMIgI2AhAgASAHKAJsNgIMQQAhBiAEQRRsIgQEQEEAIARBlM8AKAIAEQAAIQYgASgCECECCyABIAY2AgggASACQQJ0IgIEf0EAIAJBlM8AKAIAEQAABUEACzYCBCABIAEoAgxBFGwiAgR/QQAgAkGUzwAoAgARAAAFQQALNgIAAkBBkM8AKAIAIgJFDQBB7NEALQAARQ0AIAEoAhAhBCABKAIUIQcgCiABKAIMNgIcIAogBzYCFCAKIBY2AhAgCiAEQQNuNgIYQbsXIApBEGogAhEAABoLIAgoAgwiBwRAIAgoAgQhBiABKAIIIQsgCCgCACgCdCENQQAhAiAKKAJoIRADQCALIAJBFGxqIgQgBiACQQN0aiIJKgIAOAIIIAkqAgQhRCAEIAI2AhAgBCBEOAIMQX8hHSAEIA0gAkECdGooAgAiCUF/RwR/IBAgCSAaaiIdQQJ0aigCACgCAAVBfws2AgAgBCAdNgIEIAJBAWoiAiAHRw0ACwsgASgCBCAIKAIAIgIoAkQgAigCTEECdBCuARpBACEHIAgoAgAoAmwEQANAIAEoAgAgB0EUbGoiCyAKKAJoIBpBAnRqKAIAIgIoAgA2AgQgCyACKAJcIgY2AghBACEEIAZBAnQiDQRAQQAgDUGUzwAoAgARAAAhBCALKAIIIQYLIAsgBDYCACALIAIoAgQ2AhAgBgRAIAIoAlQhBkEAIQIDQCAEIAJBAnQiDWogBiANaigCADYCACACQQFqIgIgCygCCEkNAAsLIBpBAWohGiAHQQFqIgcgCCgCACgCbEkNAAsLIBZBAWohFgJAIAAoAmAiAkUNACADAn8gFrMgACgCHLOVQwAAyEKUIkSLQwAAAE9dBEAgRKgMAQtBgICAgHgLIgFGDQBBAyABIgMgACgCZCACEQMARQ0ECyAWICooAgBJDQALDAELIAAoAhxFDQAgCkEgakEEciEPA0AgACgCfCAmQQJ0aigCACELIAAoAgQhASAKQQA2AjAgCkIENwMoIApCADcDICABICZBGGxqIQQCQCALRQ0AIAogCygCCCIBNgIgIAogAUEfaiIBQQV2IgI2AiwgAUEgSQ0AIA8gAhBOIAooAiQiAUUNACAKKAIsIgJFDQAgAUEAIAooAiggAmwQsAEaCyAEIAQoAhQgJkEwbCIMIAAoAjxqIgEoAihqIgY2AhQgBCAEKAIQIAEoAghBA2xqIgc2AhBBACEdICZBBHQiDSAAKAJMaiIIKAIIIgIEfyAIKAIAIQ5BACEBA0AgDiABQQJ0aigCACIQKAIoIgYEQCAQKAIgIRNBACEWIAooAiQhEgNAIAQgBCgCFCATIBZBAnRqKAIAIgkoAjRqNgIUIAkoAiQoAjQiFEEDbiECAkAgCwRAIBRBA0kNAUEBIAIgAkEBTRshFCALKAIQIRUgCSgCSCEJQQAhAgNAIBIgFSAJIAJBAnRqKAIAQQJ0aigCACIGQQN2Qfz///8BcWoiESgCACIFQQEgBnQiF3FFBEAgESAFIBdyNgIAIAQgBCgCECALKAIAIAZqLQAAaiIHNgIQCyACQQFqIgIgFEcNAAsgECgCKCEGDAELIAQgByACQQNsaiIHNgIQCyAEIAQoAgxBAWo2AgwgFkEBaiIWIAZJDQALIAgoAgghAgsgAUEBaiIBIAJJDQALIAQoAhQFIAYLQRRsIgEEQEEAIAFBlM8AKAIAEQAAIR0gBCgCECEHCyAEIB02AgggBCAHQQJ0IgEEf0EAIAFBlM8AKAIAEQAABUEACzYCBCAEIAQoAgxBFGwiAQR/QQAgAUGUzwAoAgARAAAFQQALNgIAAkBBkM8AKAIAIgFFDQBB7NEALQAARQ0AIAQoAhAhAiAEKAIUIQcgCiAEKAIMNgIMIAogBzYCBCAKICY2AgAgCiACQQNuNgIIQfAXIAogAREAABoLIAAoAjwgDGoiASgCECEGIAEoAgghByABKAIAIQggASgCKCIdBEAgASgCICEQIAQoAgghCUEAIQIDQCAJIAJBFGxqIgFCfzcCACABQgA3AgggASAQIAJBAnRqKAIANgIQIAJBAWoiAiAdRw0ACwsgBwRAIAQoAgQhAUEAIRoDQCAaQQNsIRAgCCAaQQJ0aigCAEEDbCEJQQAhAgNAIAEgAiAJakECdGogBiACIBBqQQJ0aigCADYCACACQQFqIgJBA0cNAAsgGkEBaiIaIAdHDQALCyAAKAJMIgIgDWooAggEQEEAIRBBACEXA0AgAiANaigCACAXQQJ0aigCACIMKAIoBEBBACEJA0AgDCgCICAJQQJ0aigCACIIKAIkIgEoAjQiAkEDbiEWIAgoAjQiBwRAIAooAmggLkECdGooAgAoAgAhDiAIKAJYIRMgASgCXCESIAgoAmghFCAEKAIIIRVBACEGA0AgFSAGIB1qQRRsaiIBIC42AgQgASAONgIAIAEgEiAUIAZBAnQiEWooAgBBA3RqIgUqAgBDAAAAAJc4AgggASAFKgIEQwAAAACXOAIMIAEgESATaigCADYCECAGQQFqIgYgB0cNAAsLIAJBA0kiBkUEQEEBIBYgFkEBTRshDiAEKAIEIRMgCCgCOCESIAgoAkghFEEAIQEDQCABQQNsIRUgFCABQQJ0aigCAEEDbCERQQAhAgNAIAIgEWohByATIAsEfyALKAIgIAdBAnRqKAIABSAHC0ECdGogEiACIBVqQQJ0aigCACAdajYCACACQQFqIgJBA0cNAAsgAUEBaiIBIA5HDQALCyAEKAIAIBBBFGxqIgEgCigCaCAuQQJ0aigCACgCADYCBCABIAgtALABBH9BBAUgCCgCKAs2AgwCQCALBEACQCAKKAIkIgJFDQAgCigCLCIHRQ0AIAJBACAKKAIoIAdsELABGgsgAUEANgIIIAECf0EAIAYNABpBASAWIBZBAU0bIQ4gCygCECETIAgoAkghEkEAIQcgCigCJCEUQQAhAgNAIBQgEyASIAJBAnRqKAIAQQJ0aigCACIVQQN2Qfz///8BcWoiESgCACIFQQEgFXQiFXFFBEAgESAFIBVyNgIAIAEgASgCCEEBaiIHNgIICyACQQFqIgIgDkcNAAtBACAHQQJ0IgJFDQAaQQAgAkGUzwAoAgARAAALNgIAAkAgCigCJCICRQ0AIAooAiwiB0UNACACQQAgCigCKCAHbBCwARoLIAYNAUEBIBYgFkEBTRshBiALKAIQIQ4gCCgCSCETQQAhAiAKKAIkIRJBACEaA0AgEiAOIBMgAkECdGooAgBBAnRqKAIAIgdBA3ZB/P///wFxaiIUKAIAIhVBASAHdCIRcUUEQCAUIBEgFXI2AgAgASgCACAaQQJ0aiAHNgIAIBpBAWohGgsgAkEBaiICIAZHDQALDAELIAEgFjYCCAJAIBZBAnQiAkUEQEEAIQYMAQtBACACQZTPACgCABEAACEGIAEoAgghFgsgASAGNgIAIBZFDQAgCCgCSCEHQQAhAgNAIAYgAkECdCIOaiAHIA5qKAIANgIAIAJBAWoiAiABKAIISQ0ACwsgAUEANgIQIC5BAWohLiAQQQFqIRAgCCgCNCAdaiEdIAlBAWoiCSAMKAIoSQ0ACyAAKAJMIQILIBdBAWoiFyACIA1qKAIISQ0ACwsCf0EBIAAoAmAiAkUNABogAwJ/ICZBAWqzIAAoAhyzlUMAAMhClCJEi0MAAABPXQRAIESoDAELQYCAgIB4CyIBRwRAQQBBAyABIgMgACgCZCACEQMARQ0BGgtBAQshAgJAIAooAiQiAUUNAEGYzwAoAgAiBARAIAEgBBEBAAwBCyABQQBBlM8AKAIAEQAAGgsgAkUNAiAmQQFqIiYgACgCHEkNAAsLIAAoAmAiAUUgA0HkAEZyDQBBA0HkACAAKAJkIAERAwAaC0EAIQAgCigCQARAA0ACQCAAQQJ0IgMgCigCOGooAgAoAggiAUUNAEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsCQCAKKAI4IANqKAIAIgFFDQBBmM8AKAIAIgMEQCABIAMRAQAMAQsgAUEAQZTPACgCABEAABoLIABBAWoiACAKKAJASQ0ACwsgCigCYARAQQAhAANAAkAgAEECdCIDIAooAlhqKAIAKAIMIgFFDQBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLAkAgCigCWCADaigCACIBRQ0AQZjPACgCACIDBEAgASADEQEADAELIAFBAEGUzwAoAgARAAAaCyAAQQFqIgAgCigCYEkNAAsLIAooAnAEQEEAIQADQAJAIABBAnQiAyAKKAJoaigCACICKAJUIgFFDQBBmM8AKAIAIgQEQCABIAQRAQAMAQsgAUEAQZTPACgCABEAABoLAkAgAigCICIBRQ0AQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCwJAIAooAmggA2ooAgAiAUUNAEGYzwAoAgAiAwRAIAEgAxEBAAwBCyABQQBBlM8AKAIAEQAAGgsgAEEBaiIAIAooAnBJDQALCwJAIAooApABIgBFDQBBmM8AKAIAIgEEQCAAIAERAQAMAQsgAEEAQZTPACgCABEAABoLAkAgCigCgAEiAEUNAEGYzwAoAgAiAQRAIAAgAREBAAwBCyAAQQBBlM8AKAIAEQAAGgsCQCAKKAJoIgBFDQBBmM8AKAIAIgEEQCAAIAERAQAMAQsgAEEAQZTPACgCABEAABoLAkAgCigCWCIARQ0AQZjPACgCACIBBEAgACABEQEADAELIABBAEGUzwAoAgARAAAaCwJAIAooAkgiAEUNAEGYzwAoAgAiAQRAIAAgAREBAAwBCyAAQQBBlM8AKAIAEQAAGgsgCigCOCIABEACQEGYzwAoAgAiAQRAIAAgAREBAAwBCyAAQQBBlM8AKAIAEQAAGgsLCyAKQcABaiQAC60MAwt/EX0BfiMAQSBrIgckACAAKAIgIQIgBwJ/IAEoAgQiCgRAIAAoAigMAQsgASACNgIAIAAoAigiCgs2AhwgByACNgIYIAcgBykDGDcDECAAQeAAaiEDIwBBIGsiBSQAIAAgBygCFCIENgI4IABBMGohAgJAAkAgBCAAKAI8SwRAIAIgBBBODAELIAQNACACKAIAIQZBASEIDAELIAIoAgAhBiAHKAIQIQlBACECA0AgBiACQQJ0aiAJIAJBA3RqKgIAOAIAIAJBAWoiAiAERw0ACwsgBSAGNgIYIAUgACgCODYCHCAFIAUpAxg3AwggAEHwAGogBUEIahBZIABBADYCWCAAQQA2AkggAEFAayEJIAAoAnAhBiAEIAAoAkxLBEAgCSAEEE4LIABB0ABqIQsgBCAAKAJcSwRAIAsgBBBOCwJAIAgNACAHKAIQIgwgBigCAEEDdGoqAgQiDSAMIARBAnQgBmpBBGsoAgBBA3RqKgIEIg4gDSAOXRshD0EAIQIDQCAFIAwgBiACQQJ0aigCAEEDdGopAgAiHjcDECAeQiCIp74gD2AEQCAJIAVBEGoQTwsgAkEBaiICIARHDQALIAgNACANIA4gDSAOXhshDUEAIQIDQCAFIAwgBiAEIAJBf3NqQQJ0aigCAEEDdGopAgAiHjcDECAeQiCIp74gDV8EQCALIAVBEGoQTwsgAkEBaiICIARHDQALCyADQQA2AgggAyAAKAJAEE8gAyAAKAJAQQhqEE8gACgCSEEDTwRAQQIhAgNAIAMoAgAgAygCCCIEQQN0aiIGQQhrIggqAgQhDSAGQRBrIgYqAgAhDiAGKgIEIQ8gCCoCACEQIAUgCSgCACACQQN0aikCACIeNwMQIA4gHqe+Ig6TIA0gHkIgiKe+Ig2TlCAQIA6TIA8gDZOUk0MAAAA/lCINQ6zFJ7dgBEAgAxBqIAMoAgghBAsgDUOsxSe3XUUgBEEBR3FFBEAgAyAFQRBqEE8gAkEBaiECCyACIAAoAkhJDQALCyADKAIIIQYgAyAAKAJQQQhqEE8gACgCWEEDTwRAQQIhAgNAIAMoAgAgAygCCCIEQQN0aiIIQQhrIgkqAgQhDSAIQRBrIggqAgAhDiAIKgIEIQ8gCSoCACEQIAUgCygCACACQQN0aikCACIeNwMQIA4gHqe+Ig6TIA0gHkIgiKe+Ig2TlCAQIA6TIA8gDZOUk0MAAAA/lCINQ6zFJ7dgBEAgAxBqIAMoAgghBAsgDUOsxSe3XUUgBCAGR3FFBEAgAyAFQRBqEE8gAkEBaiECCyACIAAoAlhJDQALCyADEGogBUEgaiQAIAAoAmgiBQRAIAVBAWshAiABKAIAIQYgACgCYCEEQQAhAUP//39/IRYDQCACIQMCQCAEIAEiAkEDdGoiASAEIANBA3RqIgNDF7fROBB4DQAgASoCBCADKgIEkyINQwAAgD8gASoCACADKgIAkyIOIA6UIA0gDZSSkZUiDZQhEiAOIA2UIRMCQCAKRQRAQ///f/8hDUP//39/IQ5D//9/fyEPQ///f/8hEAwBCyASjCEZQ///f38hD0P//3//IRBBACEBQ///f/8hDUP//39/IQ4DQCANIBkgBiABQQN0aiIDKgIAIhqUIBMgAyoCBCIblJIiESANIBFeGyENIA4gESAOIBFdGyEOIBAgEyAalCASIBuUkiIRIBAgEV4bIRAgDyARIA8gEV0bIQ8gAUEBaiIBIApHDQALCyANIA6TIBAgD5OUIhEgFl1FDQAgEyEUIBIhFSAQIRwgDSEdIA8hFyAOIRggESEWCyACQQFqIgEgBUcNAAsLIAAgHDgCGCAAIBc4AhAgACAVOAIEIAAgFDgCACAAIB04AhwgACAYOAIUIAAgFDgCDCAAIBWMIg04AggCQAJAIBS8QYKAgPwHa0F9SyAVvEGCgID8B2tBfk9yIA28QYKAgPwHa0F9S3JFBEAgF7xBgoCA/AdrQX5JIBi8QYKAgPwHa0F+SXENAkGQzwAoAgAiAQ0BDAILQZDPACgCACIBRQ0BCyAHQe0RNgIIIAdBvAw2AgQgB0G3FTYCAEHVHSAHIAERAAAaCyAHQSBqJAAL2AIBAn8CQCAAKAKIASIBRQ0AQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCwJAIAAoAngiAUUNAEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsCQCAAKAJgIgFFDQBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLAkAgACgCUCIBRQ0AQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCwJAIAAoAkAiAUUNAEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsCQCAAKAIwIgFFDQBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLIAAoAiAiAARAQZjPACgCACIBBEAgACABEQEADwsgAEEAQZTPACgCABEAABoLC9wFAgZ/Bn0jAEEgayIFJAAgASgCACIEKAIkIgMoAlwgBCgCeCADKAJEQQN0EK4BGiAEKAIkIQNBAEHkAEGUzwAoAgARAAAiAkEIakEAQcwAELABGiACQgA3AlwgAkKAgICAwAA3AlQgAkEANgIsIAJBBDYCJCABIAI2AgQgAkL/////DzcCACADKAIsIQEgAiADKAI0NgIMIAIgATYCCEEAIQEgAygCNEECSwRAA0AgCCADIAEQc4uSIQggAUEBaiIBIAMoAjRBA25JDQALCyACIAg4AhAgCEMAAAA0XQRAAn0gBCgCJCIBKAJEIgRFBEBDAACA/yEIQwAAgP8MAQsgASgCXCEGQ///f/8hCUP//39/IQhBACEBQ///f38hCkP//3//IQsDQCAJIAYgAUEDdGoiByoCBCIMIAkgDF4bIQkgCyAHKgIAIg0gCyANXhshCyAIIAwgCCAMXRshCCAKIA0gCiANXRshCiABQQFqIgEgBEcNAAsgCSAIk0MAAAA/lCEIIAsgCpNDAAAAP5QLIQkgBSAIOAIcIAUgCTgCGCACIAUqAhggBSoCHJQ4AhALQwAAAAAhCEEAIQEgAygCNEECSwRAA0AgCCADIAEQcpIhCCABQQFqIgEgAygCNEEDbkkNAAsLIAIgCDgCFCADKAJkIQEgAygCXCEEIAIgA0GgAWo2AlAgAiABNgIcIAIgBDYCGCAAKAIAIgBBADYCKCABBEAgAEEgaiEGQQAhBANAIAMoApABIARBA3ZB/P///wFxaigCACAEdkEBcQRAIAUgAygCXCAEQQN0aikCADcDGCAGIAVBGGoQTyACKAIcIQELIARBAWoiBCABSQ0ACwsgAygCXCEBIAUgAygCZDYCFCAFIAE2AhAgBSAFKQMQNwMIIAAgBUEIahBcIAIgACkCADcCMCACIAApAgg3AjggAiAAKQIQNwJAIAIgACkCGDcCSCAFQSBqJAALowMBBH8jAEEQayIFJAAgAUE/akEGdiEGAkAgAwRAIAAgAiAGbCIDNgIUIABBDGohBCADIAAoAhhLBEAgBCADEE4LIAQoAgAiA0UNASAAKAIUIgRFDQEgA0EAIAAoAhAgBGwQsAEaDAELIAVBADYCDCAFQoCAgICAATcDACAFIAIgBmwiAzYCCAJ/IANFBEBBAAwBCyAFIAMQTiAFKAIAIQQgBSgCCEEDdAshAyAEQQAgAxCwARoCQCAAKAIIIAZGBEAgBSgCACAAKAIMIAYgACgCBCIDIAIgAiADSxtsQQN0EK4BGgwBCyAAKAIARQ0AIAAoAgQiA0UNACADIAIgAiADSxsiB0UNAEEAIQMDQCAFKAIAIAMgBmxBA3RqIAAoAgwgACgCCCIEIANsQQN0aiAGIAQgBCAGSxtBA3QQrgEaIANBAWoiAyAHRw0ACwsgBSAAQQxqEJ4BIAUoAgAiA0UNAEGYzwAoAgAiBARAIAMgBBEBAAwBCyADQQBBlM8AKAIAEQAAGgsgACAGNgIIIAAgAjYCBCAAIAE2AgAgBUEQaiQAC2sBAX8gACgCACIDKAIMIAMoAgggAmwgAUEGdmpBA3RqIgMgAykDAEIBIAFBP3GthoQ3AwAgACgCBCIABEAgACgCDCAAKAIIIAFsIAJBBnZqQQN0aiIAIAApAwBCASACQT9xrYaENwMAC0EBC1IBAn8gASAAKAIIIgI2AgggAiABKAIMSwRAIAEgAhBOCwJAIAEoAgAiAUUNACAAKAIAIgJFDQAgACgCCCIDRQ0AIAEgAiAAKAIEIANsEK4BGgsLngUCGH8DfiMAQSBrIg4kACAOIAAoAgAgACgCBBBjIQcgAQRAIABBDGohFSAHQQxqIQ8DQAJAIA8oAgAiAkUNACAHKAIUIghFDQAgAkEAIAcoAhAgCGwQsAEaCyAAKAIEIhEEQCARQQFrIRIgACgCACITQQFrIRYgACgCDCEEIAAoAgghCUEAIQIDQCATBH8gAiAJbCEKIAcoAgggAmwhFyAJIAJBAWoiCGwhCyAJIAJBAWtsIQwgBygCDCEYQQAhBQNAAkACQEIBIAVBP3GthiIcIAQgCiAFQQZ2Ig1qQQN0aikDAINCAFINAAJ/QQAgBUUNABogBUEBayIGQT9xrSEaIAQgCiAGQQZ2IgZqQQN0aikDACEbIAIEQCAEIAYgDGpBA3RqKQMAIBuEIRsLQgEgGoYhGiAaIBuDQgBSIAIgEk8NABogBCAGIAtqQQN0aikDACAbhCAag0IAUgshAyACBEAgAyAEIAwgDWpBA3RqKQMAIByDQgBSciEDCyACIBJPIhlFBEAgAyAEIAsgDWpBA3RqKQMAIByDQgBSciEDCwJAIAUgFk8NACADIAQgCiAFQQFqIgZBBnYiFGpBA3RqKQMAQgEgBkE/ca2GIhqDQgBSciEDIAIEQCADIAQgDCAUakEDdGopAwAgGoNCAFJyIQMLIBkNACADIAQgCyAUakEDdGopAwAgGoNCAFJyDQEMAgsgA0UNAQsgGCANIBdqQQN0aiIGIAYpAwAgHIQ3AwALIAVBAWoiBSATRw0ACyAIBSACQQFqCyICIBFHDQALCyAPIBUQYSAQQQFqIhAgAUcNAAsLAkAgBygCDCIBRQ0AQZjPACgCACIABEAgASAAEQEADAELIAFBAEGUzwAoAgARAAAaCyAOQSBqJAALdQAgAEKAgICAgAE3AgwgACACNgIEIAAgATYCACAAQQA2AhggACABQT9qQQZ2IgE2AgggACABIAJsIgE2AhQCQCABRQ0AIABBDGogARBOIAAoAgwiAUUNACAAKAIUIgJFDQAgAUEAIAAoAhAgAmwQsAEaCyAAC8ACAQJ/IAAoAiQiAQRAIAEQRhoCQCAAKAIkIgFFDQBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLIABBADYCJAsCQCAAKAJ4IgFFDQBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLAkAgACgCaCIBRQ0AQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCwJAIAAoAlgiAUUNAEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsCQCAAKAJIIgFFDQBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLIAAoAjgiAQRAQZjPACgCACICBEAgASACEQEAIAAPCyABQQBBlM8AKAIAEQAAGgsgAAu1AgIEfwF8IAAoAgQiAUEBayICQQF2IAJyIgJBAnYgAnIiAkEEdiACciICQQh2IAJyIgJBEHYgAnJBAWohAiACAn8gAbhEzczMzMzM9D+iIgVEAAAAAAAA8EFjIAVEAAAAAAAAAABmcQRAIAWrDAELQQALIgFJBEAgAUEBayIBQQF2IAFyIgFBAnYgAXIiAUEEdiABciIBQQh2IAFyIgFBEHYgAXJBAWohAgsgACACNgIIQQAhASACQQJ0IgQEQEEAIARBlM8AKAIAEQAAIQMgACgCCCECCyAAIAM2AgwgAgRAA0AgAyABQQJ0akF/NgIAIAFBAWoiASAAKAIISQ0ACwsgACgCBCIBIAAoAhxLBEAgAEEQaiABEE4gACgCBCEBCyABIAAoAixLBEAgAEEgaiABEE4LC3gCAn8DfUF/IQMgAkF/RwRAIAAoAiAhBCABKgIIIQUgASoCBCEGIAEqAgAhByAAKAIQIQEDQAJAIAEgAkEMbGoiACoCACAHXA0AIAAqAgQgBlwNACAAKgIIIAVcDQAgAg8LIAQgAkECdGooAgAiAkF/Rw0ACwsgAwt6AQV/QQEhAyABQQFKBEADQCAAIANBAnRqKAIAIQUgAyECAkADQCAFIAAgAkEBayIGQQJ0aigCACIETw0BIAAgAkECdGogBDYCACACQQFKIQQgBiECIAQNAAtBACECCyAAIAJBAnRqIAU2AgAgA0EBaiIDIAFHDQALCwtcAQF/AkAgACoCACABKgIMX0UNACAAKgIMIAEqAgBgRQ0AIAAqAgQgASoCEF9FDQAgACoCECABKgIEYEUNACAAKgIIIAEqAhRfRQ0AIAAqAhQgASoCCGAhAgsgAguGSQIefwV9IAAoAggtAABBAXFFBEAgACgCDCEbIAAoAgQhHCAAKAIIIRggACgCACgCACEJIAAoAhAhHSAAKAIUIR4gACgCGCEfIwBB0ABrIg8kACABQSBqIRkgASgCKARAA0AgA0ECdCIAIBkoAgBqKAIAEGQaAkAgGSgCACAAaigCACICRQ0AQZjPACgCACIABEAgAiAAEQEADAELIAJBAEGUzwAoAgARAAAaCyADQQFqIgMgASgCKEkNAAsLIwBBQGoiCiQAIAFBEGohCCABKAIIIgIoAjQgASgCDCIAQQJ0aigCACIDIAEoAhxLBEAgCCADEE4gASgCCCECIAEoAgwhAAsgAigCFCAAQQJ0aigCACIAQX9HBEADQCAKIAA2AhAgCCAKQRBqEE8gAigCJCAAQQJ0aigCACIAQX9HDQALCyABKAIYIRYgASgCBCgCRCEDQQBB8AFBlM8AKAIAEQAAIAEoAgQiAioCACAWQQNsIgAgAyAAIANJGyIAIBYgAigCBEECcUF/EEshEyAKQgA3AzggCkIANwMoIApCgICAgMAANwMwIApCgICAgMAANwMgIApCADcDGCAKIAA2AhQgCkEENgIQAkAgFkUNAEEAIQIDQCAIKAIAIAJBAnRqKAIAQQNsIQtBACEGA0AgCiABKAIEKAIsIAYgC2pBAnRqKAIAIgQ2AgwCQAJAIAooAhwiAEUNACAAIAooAhhBAWsgBHFBAnRqKAIAIgBBf0YNACAKKAIwIQUgCigCICEDA0AgAyAAQQJ0IgBqKAIAIARGDQIgACAFaigCACIAQX9HDQALCyAKQRBqIApBDGoQbBogCkEANgIIIApCADcDACAKKAIMIQUgASgCBCIDLQAEQQJxBEAgCiADKAJMIAVBDGxqIgAoAgg2AgggCiAAKQIANwMACyATIAMoAjwgBUEMbGogCiADKAJcIAVBA3RqEEwLIAZBAWoiBkEDRw0ACyACQQFqIgIgFkcNAAsgFkUNAEEAIQYDQCAKKAIYQQFrIQ0gASgCECAGQQJ0aigCAEEDbCEIIAEoAgQoAiwhBCAKKAIwIQsgCigCICEFIAooAhwhEEEAIREDQAJAIBBFBEBBfyECDAELQX8hAiAQIA0gBCAIIBFqQQJ0aigCACIDcUECdGooAgAiAEF/Rg0AA0AgBSAAIgJBAnQiAGooAgAgA0YNAUF/IQIgACALaigCACIAQX9HDQALCyAKIBFBAnRqIAI2AgAgEUEBaiIRQQNHDQALIBMgCkEAQX8QUCAGQQFqIgYgFkcNAAsLIBMQVSATEHAgEygCzAEiAgRAAkBBmM8AKAIAIgAEQCACIAARAQAMAQsgAkEAQZTPACgCABEAABoLIBNBADYCzAELIBNBADYC2AECQCATKALQASICRQ0AQZjPACgCACIABEAgAiAAEQEADAELIAJBAEGUzwAoAgARAAAaCyATQQA2AtABIBNCADcC2AEgE0EANgLoAQJAIBMoAuABIgJFDQBBmM8AKAIAIgAEQCACIAARAQAMAQsgAkEAQZTPACgCABEAABoLIBNBADYC4AEgE0IANwLoASAKQRBqEEkgCkFAayQAIAkgHEEqEK4BIgwgEzYCLCMAQRBrIgokACAMIAwoAiwoAjQiFTYCOCAMQTBqIRYgFSAMKAI8SwRAIBYgFRBOCyAMIBU2AkggFSAMKAJMSwRAIAxBQGsgFRBOCyAMIBVBA24iDjYCWCAOIAwoAlxLBEAgDEHQAGogDhBOCwJAIAwtAChFDQAgDCAONgJoIAwoAmwgDk8NACAMQeAAaiAOEE4LIAwgDjYCeCAMQfAAaiEQIA4gDCgCfEsEQCAQIA4QTgsgDCAONgKAASAMIA5BH2pBBXYiADYCjAEgACAMKAKQAUsEQCAMQYQBaiAAEE4LAkAgDCgChAEiAkUNACAMKAKMASIARQ0AIAJBACAMKAKIASAAbBCwARoLAkAgFUEDSQ0AQQEgDiAOQQFNGyELQQAhAwNAIANBA2whBSAMKAJAIQIgDCgCLCIJKAI8IQ0gCSgCLCEIQQAhBgNAIAIgBSAGaiIEQQJ0IgBqIA0gCEF+QQEgBEEDcEEBSxsgBGpBAnRqKAIAQQxsaiIEKgIIIA0gACAIaigCAEEMbGoiACoCCJMiICAglCAEKgIAIAAqAgCTIiAgIJQgBCoCBCAAKgIEkyIgICCUkpKROAIAIAZBAWoiBkEDRw0ACyAJIAMQciEgIANBAnQiACAMKAJQaiAgOAIAIAwtACgEQCAMKAIsIAMQcyEgIAwoAmAgAGogIDgCAAsgCiAMKAIsIAMQdCAMKAJwIANBDGxqIgAgCikDADcCACAAIAooAgg2AgggA0EBaiIDIAtHDQALIBVBA0kNAEEBIA4gDkEBTRshBCAMKAIsKAKwASELQQAhAgNAIAJBA2whBSAQKAIAIgMgAkEMbGohCSAWKAIAIQ1BACEGA0ACQCALIAUgBmpBAnQiAGooAgAiCEF/RgRAQ///f38hIAwBCyANIAhBAnRqIAkqAgggAyAIQQNuQQxsaiIIKgIIlCAJKgIAIAgqAgCUIAkqAgQgCCoCBJSSkiIgOAIACyAAIA1qICA4AgAgBkEBaiIGQQNHDQALIAJBAWoiAiAERw0ACwsgCkEQaiQAQQAhBCAMLQAoBEAjAEEgayIXJAAgDEGUAWoiAEEANgIsIABBADYCDCAAKAIAKAIsKAI0IQIgF0EANgIcIAJBA24hDQJAIAJBAk0EQCAAQQA2AhwMAQsgAEEkaiEOIABBBGohCANAAkAgACgCACICKAKEASAEQQN2Qfz///8BcWooAgAgBHZBAXENACACKAJgIARBAnRqKgIAi0MAAAA0Xw0AIBcgACgCLDYCECAXQQE2AhQgDiAXQRxqEE8gACgCACgChAEgFygCHCIDQQN2Qfz///8BcWoiAiACKAIAQQEgA3RyNgIAIwBBEGsiFCQAIABBJGohFSAAKAIAIhooAmAgACgCJCAXQRBqIgQoAgBBAnRqKAIAQQJ0aioCACEiA0ACQEEAIQpBACEHIAQoAgQiC0UNAANAIBooAiwhFkEAIRIgFSgCACAEKAIAIAdqQQJ0aigCAEEDbCIQIREDQCAUQX8gFigCsAEgEUECdGoiBSgCACICQQNuIAJBf0YiAhsiAzYCDAJAIAINACAaKAKEASADQQN2Qfz///8BcWooAgAgA3ZBAXENACAaKAJgIANBAnRqKgIAIiCLQwAAADRfICBDAAAAAF0gIkMAAAAAXXNyDQAgGigCLCIJKAJcIgYgFigCLCIDIBAgEmpBAnRqKAIAQQN0aiAGIAkoAiwiAkF+QQEgBSgCACIFQQNwQQFLGyAFakECdGooAgBBA3RqIAkqAgAiIBB4RQ0AIAYgAyASQQFqQQNwIBBqQQJ0aigCAEEDdGogBiACIAVBAnRqKAIAQQN0aiAgEHhFDQAgFSAUQQxqEE9BASEKIAQgBCgCBEEBajYCBCAAKAIAIhooAoQBIBQoAgwiA0EDdkH8////AXFqIgIgAigCAEEBIAN0cjYCAAsgESASQQNJIgJqIREgAiASaiISQQNHDQALIAdBAWoiByALRw0ACyAKDQELCyAUQRBqJAAgCCAEEE8gFygCHCEECyAXIARBAWoiBDYCHCAEIA1JDQALIAAgACgCDCICNgIcIAIgACgCIEsEfyAAQRRqIAIQTiAAKAIMBSACC0UNACAAQTRqIQhBACEGA0AgACAAKAIEIAZBA3RqIg0oAgQiBEEDbCICNgI8QQAhCSACIAAoAkBLBH8gCCACEE4gDSgCBAUgBAsEQANAIAlBA2whCyAOKAIAIA0oAgAgCWpBAnRqKAIAQQNsIQVBACEEA0AgACgCNCAEIAtqQQxsaiIDIAAoAgAoAiwiAigCPCACKAIsIAQgBWpBAnRqKAIAQQxsaiICKQIANwIAIAMgAigCCDYCCCAEQQFqIgRBA0cNAAsgCUEBaiIJIA0oAgRJDQALCyAXIAAoAjQ2AgggFyAAKAI8NgIMIAAoAhQhAiAXIBcpAwg3AwAgFyACIAZBJGxqEHUaIAZBAWoiBiAAKAIMSQ0ACwsgF0EgaiQAC0EAIQQjAEEgayIGJAAgDEHYAWoiBygCACgCLCgCNCEWIAdBADYCDCAHIBZBA24iDjYCHCAHQRRqIRAgDiAHKAIgSwRAIBAgDhBOCyAHIA42AiwgB0EkaiEJIA4gBygCMEsEQCAJIA4QTgsgFkEDTwRAQQEgDiAOQQFNGyEFIAkoAgAhAyAQKAIAIQIDQCACIARBAnQiAGogBDYCACAAIANqQX82AgAgBEEBaiIEIAVHDQALCyAGQgA3AxggBkKAgICAwAA3AxBBECAOIA5BEE8bIgAEQCAGQRBqIAAQTgtBACEVIAZBADYCAAJAIBZBAksEQCAHQQRqIQtBACEEA0ACQCAQKAIAIARBAnRqKAIAIARHDQAgBygCACgChAEgBEEDdkH8////AXFqKAIAIAR2QQFxDQAgBkEANgIYIAZBEGogBhBPA0AgBigCGCIABEAgBigCECAAQQJ0akEEaygCACIIQQJ0IgUgBygCJGogFTYCACAIQQNsIREgBkEQahBqIAcoAgAoAiwhA0EAIQ0DQCAGQX8gAygCsAEgEUECdGoiAigCACIAQQNuIABBf0YbIgo2AgwCQCACKAIAQX9GDQAgECgCACIEIApBAnRqKAIAIApHDQAgBygCACIAKAKEASAKQQN2Qfz///8BcWooAgAgCnZBAXENACAAKAJwIgAgCEEMbGoiAioCCCAAIApBDGxqIgAqAgiUIAIqAgAgACoCAJQgAioCBCAAKgIElJKSIiBDAACAv5KLICCLIiBDAACAPyAgQwAAgD9eG0MXt9E4lF9FDQAgBCAFaiICKAIAIQAgAiAKNgIAIAQgBigCDEECdGogADYCACAJKAIAIAYoAgxBAnRqIBU2AgAgBkEQaiAGQQxqEE8LIBEgDUEDSSIAaiERIAAgDWoiDUEDRw0ACwwBCwsgCyAGEE8gFUEBaiEVIAYoAgAhBAsgBiAEQQFqIgQ2AgAgBCAOSQ0ACyAHQTxqIhEgFTYCACAHQTRqIQQgB0FAaygCACAVTw0BIAQgFRBODAELIAdBPGoiEUEANgIAIAdBNGohBAsCQCAEKAIAIgJFDQAgESgCACIARQ0AIAJBACAHKAI4IABsELABGgsgFkEDTwRAQQEgDiAOQQFNGyEIIAcoAjQhCyAHKAIAIQUgBygCJCEDQQAhBANAIAMgBEECdCICaigCACIAQX9HBEAgCyAAQQJ0aiIAIAUoAlAgAmoqAgAgACoCAJI4AgALIARBAWoiBCAIRw0ACwsgB0EANgJcIAdBADYCTAJAIBVFBEAgB0EANgJsDAELIAdB1ABqIRYgB0HEAGohEEEAIQoDQCAGIAcoAgQgCkECdGooAgAiADYCDCAHKAIUIQkgBygCJCENIAcoAgAiCCgCLCgCsAEhCyAAIQMCQANAIANBA2whBEEAIREDQAJAIAsgBEECdCIFaigCACICQX9GDQAgDSACQQNuQQJ0aigCACAKRg0AIAgoAjAgBWoqAgAiIEMAAAAAXkUNACAgQ///f39dDQMLIAQgEUEDSSICaiEEIAIgEWoiEUEDRw0ACyAGIAkgA0ECdGooAgAiAzYCDCAAIANHDQALIAcoAlwhAiAGQQA2AgQgBiACNgIAIAYgADYCDCAAIQQDQCAHKAIAKAKEASAEQQN2Qfz///8BcWoiAiACKAIAQQEgBHRyNgIAIBYgBkEMahBPIAYgBigCBEEBajYCBCAGIAcoAhQgBigCDEECdGooAgAiBDYCDCAAIARHDQALIBAgBhBPCyAKQQFqIgogFUcNAAsgByAHKAJMIgA2AmwgACAHKAJwSwR/IAdB5ABqIAAQTiAHKAJMBSAAC0UNAEEAIREDQCAHKAJkIBFBJGxqIgIgBygCACgCcCAHKAJUIAcoAkQgEUEDdGooAgBBAnRqKAIAQQxsaiIAKQIANwIYIAIgACgCCDYCICAGIAJBGGoQUiACIAYoAgg2AgggAiAGKQMANwIAIAIgAioCGCIjIAIqAgQiJJQgAioCACIgIAIqAhwiIZSTOAIUIAIgICACKgIgIiKUICMgAioCCCIglJM4AhAgAiAhICCUICQgIpSTOAIMIBFBAWoiESAHKAJMSQ0ACwsCQCAGKAIQIgJFDQBBmM8AKAIAIgAEQCACIAARAQAMAQsgAkEAQZTPACgCABEAABoLIAZBIGokAEEAIQQgDEHMAmoiACgCACICKAIsKAI0IQMgAEEANgIYIANBA24hDSADQQNPBEBBASANIA1BAU0bIQUgAigChAEhAkEAIQMDQCACIARBA3ZB/P///wFxaigCACAEdkEBcUUEQCAAIANBAWoiAzYCGAsgBEEBaiIEIAVHDQALCyAAKAI0IgUEQEEAIQQDQAJAIARBAnQiAyAAKAIsaigCACIIKAJsIgtFDQBBmM8AKAIAIgIEQCALIAIRAQAMAQsgC0EAQZTPACgCABEAABoLAkAgCCgCWCILRQ0AQZjPACgCACICBEAgCyACEQEADAELIAtBAEGUzwAoAgARAAAaCwJAIAgoAkgiC0UNAEGYzwAoAgAiAgRAIAsgAhEBAAwBCyALQQBBlM8AKAIAEQAAGgsCQCAAKAIsIANqKAIAIgNFDQBBmM8AKAIAIgIEQCADIAIRAQAMAQsgA0EAQZTPACgCABEAABoLIARBAWoiBCAFRw0ACwtBACEEIABBADYCNCAAIA02AiQgAEEcaiECIAAoAiggDUkEfyACIA0QTiAAKAIkBSANCwRAIAIoAgAhAgNAIAIgBEECdGpBfzYCACAEQQFqIgQgACgCJEkNAAsLIAAgDUEDbCICNgIQIAIgACgCFEsEQCAAQQhqIAIQTgsCQCAAKAIYRQ0AIAAoAgAqAiAhICAAQQE6AIQCICBDAAAAP5QhIANAIAAgIBB2IAAoAhgNAAtBACEEIABBADoAhAIgACgCACgCJEUNACAAEHcaA0BBACEQIAAoAgAiDSgCLCgCNCIIQQNuIQkCQCAIQQJNBEAgAEEANgIYDAELQQEgCSAJQQFNGyELIAAoAhwhBQNAIAUgEEECdGoiAygCAEF/RwRAIA0oAoQBIBBBA3ZB/P///wFxaiICIAIoAgBBfiAQd3E2AgALIANBfzYCACAQQQFqIhAgC0cNAAtBACEQIABBADYCGCAIQQNJDQBBASAJIAlBAU0bIQMgDSgChAEhAkEAIQUDQCACIBBBA3ZB/P///wFxaigCACAQdkEBcUUEQCAAIAVBAWoiBTYCGAsgEEEBaiIQIANHDQALCyAAKAI0IgIEQEEAIQUDQCAAKAIsIAVBAnRqKAIAIgNBADYCdCADQQA2AlAgA0EANgJgIANBBGpBAEHEABCwARogACADIAMoAnwQeRogBUEBaiIFIAJHDQALCyAAKAIAKgIgISBBACEJIwBBEGsiCCQAAkAgACgCGEUNAEP//39/ISFBfyENQX8hEANAIAAoAjQgCU0EQCAQQX9GICAgIV1yDQIgACgCLCANQQJ0aigCACICQewAahBqIAAgAiAQEHlFBEAgCCAAKAIEKAIkIBBBAnRqKAIANgIMIAJB2ABqIAhBDGoQTwtD//9/fyEhQQAhCUF/IQ1BfyEQIAAoAhgNAQVBfyEDAkAgACgCLCAJQQJ0aigCACILKAJ0IgIEQCALQewAaiEFA0AgBSgCACACQQN0akEIayICKgIAISIgACgCACgChAEgAigCBCICQQN2Qfz///8BcWooAgAgAnZBAXFFBEAgAiEDDAMLIAUQaiALKAJ0IgINAAsMAQtD//9/fyEiCyAQIAMgECAhICJeIgUbIANBf0YiAhshECANIAkgDSAFGyACGyENICEgIiAhIAUbIAIbISEgCUEBaiEJDAELCwsgCEEQaiQAIAAoAhgEQCAAKAIAKgIgQwAAAD+UISADQCAAICAQdiAAKAIYDQALCwJAIAAoAjQiEUEBayICQQBIDQAgAEEsaiEVIABB9AFqIRYgAEHkAWohCiAAQdQBaiEQA0AgAiELA0AgFSgCACALQQJ0aigCACISBEAgACARNgLcASARIAAoAuABSwRAIBAgERBOCwJAIBAoAgAiBUUNACAAKALcASIDRQ0AIAVBACAAKALYASADbBCwARoLIAAgETYC7AEgESAAKALwAUsEQCAKIBEQTgsCQCAKKAIAIgVFDQAgACgC7AEiA0UNACAFQQAgACgC6AEgA2wQsAEaCyAAIBE2AvwBIBEgACgCgAJLBEAgFiAREE4LAkAgFigCACIFRQ0AIAAoAvwBIgNFDQAgBUEAIAAoAvgBIANsELABGgtBACEHQwAAAAAhIyASKAJQIggEQANAIBIoAkggB0ECdGooAgBBA2whDiAAKAIAKAIsIQlBACEDA0AgDkECdCIFIAAoAgAoAkBqKgIAISACQAJAIAkoArABIAVqKAIAIgVBf0YNACAAKAIcIAVBA25BAnRqKAIAIgVBf0YNACAFQQJ0Ig0gFSgCAGooAgAgEkYNAQJAAkAgCSAOEHpFDQAgACAOEHtFBEAgCSAOEHxFDQELICMgIJIhIwwBCyAQKAIAIA1qIgUgICAFKgIAkjgCAAsgCigCACANaiIFICAgBSoCAJI4AgAgFigCACANaiIFIAUoAgBBAWo2AgAMAQsgIyAgkiEjCyAOIANBA0kiBWohDiADIAVqIgNBA0cNAAsgB0EBaiIHIAhHDQALCyACIQMDQAJAIAMiBSALRg0AIAVBAnQiCCAVKAIAaigCACIURQ0AIBAoAgAgCGoqAgAiIUMAAAAAXw0AIBQqAiQgEioCJJQgFCoCHCASKgIclCAUKgIgIBIqAiCUkpJDAAAAP10NACAAKAIAIgMqAgQiIEMAAAAAXgRAIBIqAiggFCoCKJIgIF4NAQsCQCADKgIIIiBDAAAAAF5FBEAgCigCACAIaioCACEkDAELICAgEioCLCAUKgIskiAKKAIAIAhqKgIAIiSTXQ0BCwJAAkAgJEMAAAAAXiIDRQ0AIBIoAlBBAkkNACAUKAJQQQFHDQAgFCoCKCASKgIoQ83MzD2UXw0BCyAUKAJQQQJGBEAgFigCACAIaigCAEEBSw0BCyADBEAgJCAUKgIsIiCTiyAkiyIiICCLIiAgICAiXRtDAACAP5dDF7fROJRfDQELICEgEioCLCAjk0MAAAAAl0PNzEw+lF4NACAhIBQqAixDAABAP5ReRQ0BC0EAIQcjAEEwayIGJAAgFCgCUCEOIBIoAlAhCSASQcgAaiINIBRByABqEIgBIA4EQCAAKAIcIQggFCgCSCEDA0AgCCADIAdBAnRqKAIAQQJ0aiASKAIANgIAIAdBAWoiByAORw0ACwsgBkEIaiIDQQBBJBCwARoCQAJAIAAgEiADEH1FBEAgEiAJNgJQIAkgEigCVEsEQCANIAkQTgsgDkUNASAAKAIcIQggFCgCSCEDQQAhDUEAIQcDQCAIIAMgB0ECdGooAgBBAnRqIBQoAgA2AgAgB0EBaiIHIA5HDQALDAILIAYqAigiISAAKAIAKAJwIA0oAgAoAgBBDGxqIgMqAgiUIAYqAiAiIiADKgIAlCAGKgIkIiAgAyoCBJSSkkMAAAAAXQRAIAYgIYw4AiggBiAgjDgCJCAGICKMOAIgCyAAIBIQfiAAIBIQf0UEQCASIAk2AlAgCSASKAJUSwRAIA0gCRBOCyAORQ0BIAAoAhwhCCAUKAJIIQNBACENQQAhBwNAIAggAyAHQQJ0aigCAEECdGogFCgCADYCACAHQQFqIgcgDkcNAAsMAgsgEkEEaiAGQQhqQSQQrgEaIBJB2ABqIBRB2ABqEIgBIBIgFCoCKCASKgIokjgCKCASIBIqAiwgFCoCLCAkk5I4AiwgACgCLCAUKAIAQQJ0akEANgIAAkAgFCgCbCIIRQ0AQZjPACgCACIDBEAgCCADEQEADAELIAhBAEGUzwAoAgARAAAaCwJAIBQoAlgiCEUNAEGYzwAoAgAiAwRAIAggAxEBAAwBCyAIQQBBlM8AKAIAEQAAGgsCQCAUKAJIIghFDQBBmM8AKAIAIgMEQCAIIAMRAQAMAQsgCEEAQZTPACgCABEAABoLAkBBmM8AKAIAIgMEQCAUIAMRAQAMAQsgFEEAQZTPACgCABEAABoLQQEhDQwBC0EAIQ0LIAZBMGokACANDQQLIAVBAWshAyAFQQBKDQALCyALQQBKIQMgC0EBayELIAMNAAsLIAAoAjRBAEwNAEEAIQMDQAJAIBUoAgAgA0ECdGooAgAiAkUEQCAVIAMQUyAAKAIkIghFDQEgACgCHCELQQAhDgNAIAMgCyAOQQJ0aiIFKAIAIgJIBEAgBSACQQFrNgIACyAOQQFqIg4gCEcNAAsMAQsgAiADNgIAIANBAWohAwsgAyAAKAI0SA0ACwsgBEEBaiIEIAAoAgAoAiRGDQEgABB3DQALCyAYIBgoAhAgASgCCCgCNCABKAIMQQJ0aigCAGo2AhAgGBBKIBMoAjRBA24hBSATEEYhAgJAQZjPACgCACIABEAgAiAAEQEADAELIAJBAEGUzwAoAgARAAAaCwJAIBgtAABBAXENACAMKAKAAyEDIAwoAqQCIQIgDCgCoAEhACAPQQA2AkQgD0KAgICAwAA3AzggDyAFIAMgACACamoiC2oiADYCQCAABEAgD0E4aiAAEE4LIAsEQEEAIQNBACECA0ACQAJAIAIgDCgCoAEiAEkEQCAMKAKYASACQQN0aiIEKAIAIQkgDCgCuAEhEQwBCyACIABrIhMgDCgCpAIiAEkEQCAMKAKcAiATQQN0aiIEKAIAIQkgDCgCrAIhEQwBCyAPIAwoAvgCIBMgAGtBAnRqKAIAIgAoAkg2AiAgDyAAKAJQNgIkDAELIA8gBCgCBDYCJCAPIBEgCUECdGo2AiALIA8oAjgiBSADQQJ0aiAPKAIkNgIAIANBAWohAyAPKAIkBEAgASgCECETQQAhBCAPKAIgIQADQCAFIANBAnRqIBMgACAEQQJ0aigCAEECdGooAgA2AgAgA0EBaiEDIARBAWoiBCAPKAIkSQ0ACwsgAkEBaiICIAtHDQALCyAPIB82AjAgDyAcNgIsIA8gHjYCKCAPIB02AiQgDyAYNgIgIA8gGyAPQSBqIAsQVDYCGCAPQQA2AhQgD0KAgICAgAY3AwggDyALNgIQAkACQCALRQRAIA9BCGoQbiAbIA9BGGoQRwwBCyAPQQhqIgAgCxBOIAAQbkEAIQlBACEEA0AgDygCCCAEQTBsaiITAn8gDCgCoAEiAyAESwRAIAQgA2shAiAMKAKoASAEQSRsagwBCyAEIANrIgIgDCgCpAIiAEkEQCAMKAK8AiACQSRsagwBCyAMKAL4AiACIABrQQJ0aigCAEEEags2AgAgDCgCpAIhACATQQA2AgQgE0EBQQIgACACSxtBACADIARNGzYCGCABKAIAIQAgEyAENgIsIBMgADYCKCATIA8oAjgiACAJQQJ0aigCACIDNgIkIBMgACAJQQFqIgJBAnRqNgIgIBMgASgCBDYCHCAPKAIYIQAgDyATNgJMIA9BwAA2AkggGygCACAAQQJ0aigCACAPQcgAahBPIAIgA2ohCSAEQQFqIgQgC0cNAAsgGyAPQRhqEEcgC0UNAEEAIQMgDygCCCECQQAhCQNAIAIgA0EwbGoiACgCBC0AsAEEfyAAKAIQBUEBCyAJaiEJIANBAWoiAyALRw0ACyABIAk2AiggCSABKAIsSwRAIBkgCRBOCyALRQ0BQQAhBEEAIQMDQAJAIA8oAgggBEEwbGooAgQiAC0AsAEEQCAAEGQhAUGYzwAoAgAiAARAIAEgABEBAAwCCyABQQBBlM8AKAIAEQAAGgwBCyAZKAIAIANBAnRqIAA2AgAgA0EBaiEDCyAEQQFqIgQgC0cNAAsgC0UNAUEAIQIDQCAPKAIIIAJBMGxqIgEoAhAiAARAQQAhBANAIBkoAgAgA0ECdGogASgCCCAEQQJ0aigCADYCACADQQFqIQMgBEEBaiIEIABHDQALCyACQQFqIgIgC0cNAAsMAQsgAUEANgIoC0EAIQAgDygCEARAA0ACQCAPKAIIIABBMGxqKAIIIgJFDQBBmM8AKAIAIgEEQCACIAERAQAMAQsgAkEAQZTPACgCABEAABoLIABBAWoiACAPKAIQSQ0ACwsCQCAPKAIIIgFFDQBBmM8AKAIAIgAEQCABIAARAQAMAQsgAUEAQZTPACgCABEAABoLIA8oAjgiAUUNAEGYzwAoAgAiAARAIAEgABEBAAwBCyABQQBBlM8AKAIAEQAAGgsgD0HQAGokAAsLMQECfyAAIAAoAghBAWsiATYCCCABIAAoAgwiAksEQCAAIAFBAnZBACACGyABahBOCwvrAwENfyMAQRBrIgQkACAEIAI2AgwgBCABNgIIQX8hBQJAAkACQCAAQcABaiIPIARBCGoQbSIGQX9GDQAgACgCBEEBcSIJRQ0BIAAoAtABIQogACgC4AEhCCAAKAIMIQsgBCgCDCEMIAQoAgghDSAGIQMDQCALIANBA25qLQAARQRAIAMhBQwECyAIIANBAnRqKAIAIgNBf0YNAQNAAkAgDSAKIANBA3RqIgcoAgBGBEAgBygCBCAMRg0BCyAIIANBAnRqKAIAIgNBf0cNAQwDCwsgCQ0ACwwBCyAAKAJ0RQ0BIAEhBwNAIAIhBgNAIAQgBjYCDCAEIAc2AggCQCAPIARBCGoQbSIFQX9GDQAgACgCBEEBcSIIRQ0EIAAoAtABIQkgACgC4AEhDiAAKAIMIQogBCgCDCELIAQoAgghDCAFIQMDQCAKIANBA25qLQAARQRAIAMhBQwGCyAOIANBAnRqKAIAIgNBf0YNAQNAAkAgDCAJIANBA3RqIg0oAgBGBEAgDSgCBCALRg0BCyAOIANBAnRqKAIAIgNBf0cNAQwDCwsgCA0ACwwECyAAKAJsIgMgBkECdGooAgAiBiACRw0AC0F/IQUgAyAHQQJ0aigCACIHIAFHDQALDAELIAYhBQsgBEEQaiQAIAULXQECfyAAKAIMRQRAIAAQZQsgASgCACECIAAoAgghAyAAQRBqIAEQTyAAQSBqIAIgA0EBa3FBAnQiASAAKAIMahBPIAAoAgwgAWogACgCKEEBazYCACAAKAIYQQFrC40BAQR/IAAoAgwiA0UEQEF/DwtBfyECIAMgACgCCEEBayABKAIEIgQgASgCACIFQQ90anFBAnRqKAIAIgFBf0cEQCAAKAIgIQMgACgCECEAA0ACQCAAIAFBA3RqIgIoAgAgBUcNACACKAIEIARHDQAgAQ8LQX8hAiADIAFBAnRqKAIAIgFBf0cNAAsLIAILQwECfyAAKAIIBEADQCAAKAIAIAFBMGxqIgJCADcCICACQoCAgIDAADcCCCACQgA3AhAgAUEBaiIBIAAoAghJDQALCwvCTwQafxp9BXwBfiMAQUBqIhAkAEEAQbQBQZTPACgCABEAACECIAEoAhghAyABKAIAIQcgECABKQIgIjs3AzggASgCLBogASgCKBogASgCHCENIBAgOzcDGCMAQZABayIEJAAgAiAHQSQQrgEiCkKAgICAgAE3AnggCkIANwJwIApCgICAgMAANwJoIApCADcCYCAKQoCAgIDAADcCWCAKQgA3AlAgCkKAgICAwAA3AkggCkFAayIHQgA3AgAgCkKAgICAwAA3AjggCkIANwIwIAogAzYCLCAKQoCAgIAgNwIkIApCADcCgAEgCkEAOgCIASAKQYwBakEAQSUQsAEaIApByABqIBAoAhggECgCHCIFEE0gDSgCRCEDIApBAEHwAUGUzwAoAgARAAAgDSoCACAFQQNsIgIgAyACIANJGyIDIAVBAEF/EEs2AiQgBEIANwOIASAEQgA3A3ggBEKAgICAwAA3A4ABIARCgICAgMAANwNwIARCADcDaCAEIAM2AmQgBEEENgJgIARCADcDWCAEQgA3A0ggBEKAgICAwAA3A1AgBEKAgICAwAA3A0AgBEIANwM4IAQgAzYCNCAEQQQ2AjAgByACNgIAIApBOGohCCACIAooAkRLBEAgCCACEE4LIAUEQCAKQegAaiELIApB2ABqIQ4DQCAMQQNsIQ9BACEJA0AgBCANKAIsIAooAkggDEECdGooAgBBA2wgCWpBAnRqKAIAIgI2AiAgBCANKAJ8IAJBAnRqKAIAIgM2AhwCQCAKKAIsIAIgA0ZyDQAgDSgCXCIHIAJBA3RqIAcgA0EDdGogDSoCABB4DQAgBCACNgIcIAIhAwsCQAJAAkAgBCgCbCICRQ0AIAIgBCgCaEEBayADcUECdGooAgAiAkF/Rg0AIAQoAoABIQcgBCgCcCEGA0AgBiACQQJ0IhFqKAIAIANGDQIgByARaigCACICQX9HDQALCyAEQX82AhggBCAEQeAAaiAEQRxqEGw2AhggCigCJCEDIA0oAjwhByAEKAIgIQIgBEEANgIQIARCADcDCCADIAcgAkEMbGogBEEIaiANKAJcIAJBA3RqEEwMAQsgBCACNgIYCwJAAkAgBCgCPCIGRQ0AIAYgBCgCICIDIAQoAjhBAWtxQQJ0aigCACICQX9GDQAgBCgCUCEHIAQoAkAhEQNAIBEgAkECdCICaigCACADRg0CIAIgB2ooAgAiAkF/Rw0ACwsgBEEwaiAEQSBqIgIQbBogDiACEE8gCyAEQRhqEE8gCiAKKAI0QQFqNgI0IAQoAjwhBgtBfyEHQX8hAwJAIAZFDQAgBiAEKAIgIhEgBCgCOEEBa3FBAnRqKAIAIgJBf0YNACAEKAJQIQYgBCgCQCEVA0AgFSACIgNBAnQiAmooAgAgEUYNAUF/IQMgAiAGaigCACICQX9HDQALCyAIKAIAIAkgD2pBAnRqIAM2AgACQCAEKAJsIgJFDQAgAiAEKAIcIgMgBCgCaEEBa3FBAnRqKAIAIgJBf0YNACAEKAKAASEGIAQoAnAhEQNAIBEgAiIHQQJ0IgJqKAIAIANGDQFBfyEHIAIgBmooAgAiAkF/Rw0ACwsgBEEkaiAJQQJ0aiAHNgIAIAlBAWoiCUEDRw0ACyAKKAIkIARBJGpBAEF/EFAgDEEBaiIMIAVHDQALCyAKKAIkEHAgCigCLEEBRgRAIApBADYCKAsgBEEwahBJIARB4ABqEEkgBEGQAWokACABIAo2AgQgACgCDCEXIAAoAgQoAgAhGEEAIQIjAEEwayIPJAAgCigCJCgCRCEVAkAgCigCLEUNACAVBH8DQCAKKgIIIRwgCioCACEdIAoqAgQhICAKKAIkIgMoAlwgAkEDdGoiBCAKKgIUIAMoAjwgAkEMbGoiAyoCCCIelCAKKgIMIAMqAgAiIpQgAyoCBCIfIAoqAhCUkpI4AgQgBCAcIB6UIB0gIpQgICAflJKSOAIAIAJBAWoiAiAVRw0ACyAKKAIsBUEBCyECIAooAigiA0UgAkVyBH8gAwUgCkGIAWoiAiAKKAIkIBgQiQEgAiAKKAIkEIoBIAooAiQhB0MAAAAAIRxDAAAAACEfQwAAAAAhIEMAAAAAISJBACEJIwBB4ABrIgMkACACQgA3AhAgAkIANwIgIAJCADcCGAJAIAcoAjQiBEEDSQ0AIARBA24hDANAIAlBA2whDSAHKAJcIQYgBygCPCEFIAcoAiwhCEEAIQQDQCADQTBqIARBDGxqIgsgBSAIIAQgDWpBAnRqKAIAIg5BDGxqIhEpAgA3AgAgCyARKAIINgIIIANBEGogBEEDdGogBiAOQQN0aikCADcDACAEQQFqIgRBA0cNAAsgAyoCHCIyIAMqAhQiJpMiHSADKgIgIicgAyoCECIlkyIelCADKgIYIiggJZMgAyoCJCIsICaTlJNDAAAAP5QiKYsiKkMAAAA0X0UEQCADKgI8Ii0gAyoCMCIhkyIcIAMqAkwiLiADKgI0IiOTIh+UIAMqAkgiLyAhkyIzIAMqAkAiMCAjkyIklJMiKyArlCAkIAMqAlAiKyADKgI4IiSTIjSUIB8gAyoCRCIxICSTIh+UkyI1IDWUIB8gM5QgNCAclJMiHCAclJKSkUMAAAA/lCEfAkBDAACAPyAqICkgKUMAAAAAXRsiKSApkpUiHCAeIDGUICggJ5MiJyAklJIgJSAokyIlICuUkpQiKCAolCAcIB4gLZQgJyAhlJIgJSAvlJKUIiogKpQgHCAeIDCUICcgI5SSICUgLpSSlCIeIB6UkpIiJyAcICYgLJMiJiAxlCAsIDKTIiUgJJSSIB0gK5SSlCIkICSUIBwgJiAtlCAlICGUkiAdIC+UkpQiISAhlCAcICYgMJQgJSAjlJIgHSAulJKUIhwgHJSSkiIdkiIjICggJJQgKiAhlCAeIByUkpIiHCAclEMAAIBAlCAnIB2TIhwgHJSSkSIckkMAAAA/lJEiHSAjIByTQwAAAACXQwAAAD+UkSIeXgRAIB6LIRwMAQsgHiAdk4sgHosiHCAdiyIhIBwgIV4bQwAAgD+XQxe30TiUXw0AQZDPACgCACIERQ0AIANBuDc2AgggA0G8DDYCBCADQfkVNgIAQdUdIAMgBBEAABogAioCHCEgIAIqAhghIgsgAiAgIB0gHSAgXRsiIDgCHCACICNDAAAAP5SRIiEgIZQgH5QgIpIiIjgCGCAcQ703hjVfRQRAIAIgHSAelSAflCACKgIgkjgCIAsgAiAfIAIqAhSSIhw4AhQgAiApIAIqAhCSIiE4AhAgAiAdIB6UIB+UIAIqAiSSIh84AiQLIAlBAWoiCSAMRw0ACyAcQwAAAABeRQ0AIAIgHyAclZE4AiQgAiAhIByVkSIdICCUOAIcIAIgHSAiIByVkZQ4AhggAiACKgIgIByVkTgCIAsgA0HgAGokAAJAIAotAIgBDQAgCigCkAENACAKKAKUAQ0AIAoqApwBQwAAAABeRQ0AIAoqAqABQ83MjD9fRQ0AIAoqAqQBQwAAoD9fRQ0AIApBATYCKAwCCyAKKAIoC0ECRw0AIAooAiQhBgJAIBcoAgAiAgRAIAYoAjwgBigCXCAGKAJEIAYoAiwgBigCNCACEQgADAELIAYoAkQiEUECSQ0AIAYoApABIQhBASECA0AgCCACQQN2Qfz///8BcWooAgAgAnZBAXFFBEAgAkEBaiICIBFHDQEMAgsLIAJBf0YNAEEBIQMgAiENIAIhBCACIQkgAiEHIAIhDANAAkAgCCADQQN2Qfz///8BcWooAgAgA3ZBAXFFDQACQCAGKAI8IgUgA0EMbGoiCyoCACIcIAUgAkEMbGoqAgBdBEAgAyECDAELIBwgBSANQQxsaioCAF5FDQAgAyENCwJAIAsqAgQiHCAFIARBDGxqKgIEXQRAIAMhBAwBCyAcIAUgCUEMbGoqAgReRQ0AIAMhCQsgCyoCCCIcIAUgB0EMbGoqAghdBEAgAyEHDAELIBwgBSAMQQxsaioCCF5FDQAgAyEMCyADQQFqIgMgEUcNAAsgDyANNgIYIA8gAjYCJCAPIAQ2AiggDyAJNgIcIA8gBzYCLCAPIAw2AiAgBigCPCEFQQAhAwNAIANBAnQiCCAPQQxqaiAFIA9BJGogCGooAgBBDGxqIgsqAgggBSAPQRhqIAhqKAIAQQxsaiIIKgIIkyIcIByUIAsqAgAgCCoCAJMiHCAclCALKgIEIAgqAgSTIhwgHJSSkpE4AgAgA0EBaiIDQQNHDQALIA8qAhAhHCAPKgIUIR0gDyoCDCEgQQAhA0EAQfgAQZTPACgCABEAAEEAQfgAELABIgVCgICAgICAgPw/NwNgIAVCjdvXhfresdg+NwNYIAVBATYCRCAFQQE6AFAgBSARQQVsNgJMIAUgEUEBdDYCQCAFQQAQiwEgDSAJIAwgHCAdXiIJGyAcICBdIB0gIF1xIgwbIQ0gAiAEIAcgCRsgDBshCSAFKAIAIgQoAgQhAiAEKAIAIQQgBigCXCEZA0AgBCADQQF0IgcgAmxqIBkgA0EDdGoiDCoCALs5AwAgBCAHQQFyIgggAmxqIAwqAgS7OQMAIAMgCUcgAyANR3FFBEAgByAFKAIIIgxqQQE6AAAgCCAMakEBOgAACyADQQFqIgMgEUcNAAsgBUEBEIsBIAYoAjQiAkEDTwRAIAYoAiwhCCAGKAI8IQ0gAkEDbiELQQAhBgNAAkACQAJAAkAgDSAIIAZBDGxqIgkoAggiB0EMbGoiAiANIAkoAgAiBEEMbGoiAyANIAkoAgQiCUEMbGoiDBCMASIeQwAAAABbIAMgDCACEIwBIh9DAAAAAFtyDQBD2w9JQCAfkyAekyIiQwAAAABbDQAgHhC8ASIcIB8QvAEiHV1FICIQvAEiICAdXUVyRQRAIAchAiAEIQMgCSEEICIhHyAgIR4gHCEiIB0hHAwDCyAcIB1eRSAcICBeRXINASAJIQIgByEDIB0hHiAgISIMAgsgAioCCCEeIAIqAgAhIiACKgIEISQgDCoCCCEfIAMqAgghHCAMKgIAISEgAyoCACEdIAwqAgQhIyADKgIEISAgBUEANgIsIAVBADYCICAFIARBAXQiAiAeIByTIh4gHyAckyIcQwAAgD8gHCAclCAhIB2TIh8gH5QgIyAgkyIhICGUkpKRIiaVIiOUIhyUICIgHZMiIiAfICOUIh2UICQgIJMiHyAhICOUIiCUkpK7IjkgJrsiN6EiOBCNASAFIAJBAXIiBEQAAAAAAAAAACAeICAgHpQgHyAclJMiIUMAAIA/IB0gH5QgIiAglJMiIyAjlCAhICGUIBwgIpQgHiAdlJMiHiAelJKSkZUiIZQiJCAglCAdIB4gIZQiHpSTlCAiIB4gHJQgICAjICGUIiCUk5QgHyAgIB2UIBwgJJSTlJKSuyI2oRCNASAFIAlBAXQiAyA5miI5EI0BIAUgA0EBciIJIDYQjQEgBSAHQQF0IgcgNxCNASAFQQIQjgEgBUEANgIsIAVBADYCICAFIAIgNhCNASAFIAQgOBCNASAFIAMgNpoQjQEgBSAJIDkQjQEgBSAHQQFyIDcQjQEMAgsgBCECIAkhAyAHIQQgHiEfIBwhHiAdISIgICEcCyAFQQA2AiwgBUEANgIgIAUgAkEBdCICIB8QrQFDAACAPyAiIByVIBxDAAAAAFsbIhyUIh1DAACAv5K7IjYQjQEgBSACQQFyIgcgHiAclCIcjLsiNxCNASAFIANBAXQiAyAdjLsiORCNASAFIANBAXIiCSAcuyI4EI0BIAUgBEEBdCIERAAAAAAAAPA/EI0BIAVBAhCOASAFQQA2AiwgBUEANgIgIAUgAiA4EI0BIAUgByA2EI0BIAUgAyA3EI0BIAUgCSA5EI0BIAUgBEEBckQAAAAAAADwPxCNAQsgBUECEI4BIAZBAWoiBiALRw0ACwsgBUEBEI4BAkAgBSgCGCICRQ0AIAIgAigCDBEBAEGYzwAoAgAiAwRAIAIgAxEBAAwBCyACQQBBlM8AKAIAEQAAGgsgBSgCFCECQQBBGEGUzwAoAgARAAAiDkIANwIAIA5CADcCECAOQgA3AgggDiACKAIANgIAIAIoAgQhAyAOQcEANgIQIA5BwgA2AgwgDkGGIDYCCCAOIAM2AgQCfyADQQN0IgNFBEBBACEDQQAMAQtBACADQZTPACgCABEAACEDIAIoAgRBA3QLIQQgDiADNgIUIANBACAEELABGiACKAIEIgMEQCAOKAIUIQQgAigCJCEHQQAhAgNAIAQgAkEDdCIJakQAAAAAAADwP0QAAAAAAADwPyAHIAlqKwMAIjajIDZEAAAAAAAAAABhGzkDACACQQFqIgIgA0cNAAsLIAUgDjYCGAJAIAUoAhQiDSgCCEGBIEcEQCANIQcMAQtBACELQQAhDCANKAIAIgMEQCANKAIcIQRBACECA0AgBCACQQxsaigCACAMaiEMIAJBAWoiAiADRw0ACwtBAEEoQZTPACgCABEAACIHQQBBKBCwASEOIA0oAgAhBCANKAIEIQIgDkEINgIgIA5BwwA2AhAgDkHEADYCDCAOQYIgNgIIIA4gAjYCBCAOIAQ2AgAgDEEDdCICBEBBACACQZTPACgCABEAACELCyAOIAs2AhRBACEDIAtBACACELABGkEAIQIgBEECdEEEaiIEBEBBACAEQZTPACgCABEAACECCyAOIAI2AhggAkEAIAQQsAEaIAxBAnQiBARAQQAgBEGUzwAoAgARAAAhAwsgDiADNgIcQQAhAiADQQAgBBCwARogDkEAQSRBlM8AKAIAEQAAIgM2AiQgA0EAQSQQsAEaAkACQCANKAIABEADQCANKAIcIAJBDGxqIgMoAgghCSADKAIAIQMjAEHQAWsiCCQAIAhCATcDCAJAIANBBHQiE0UNACAIQRA2AhAgCEEQNgIUQRAiBCEGQQIhCwNAIAhBEGogC0ECdGogBCIDIAZBEGpqIgQ2AgAgC0EBaiELIAMhBiAEIBNJDQALAn8gCSAJIBNqQRBrIgNPBEBBACELQQEhBEEADAELQQEhC0EBIQQDQAJ/IAtBA3FBA0YEQCAJIAQgCEEQahCzASAIQQhqQQIQtAEgBEECagwBCwJAIAhBEGogBEEBayIGQQJ0aigCACADIAlrTwRAIAkgCEEIaiAEQQAgCEEQahC1AQwBCyAJIAQgCEEQahCzAQsgBEEBRgRAIAhBCGpBARC2AUEADAELIAhBCGogBhC2AUEBCyEEIAggCCgCCCIGQQFyIgs2AgggCUEQaiIJIANJDQALIAZBAUshCyAIKAIMQQBHCyEDIAkgCEEIaiAEQQAgCEEQahC1ASAEQQFHIAtyIANyRQ0AA0ACfyAEQQFMBEAgCEEIaiIDIAMQtwEiAxC0ASAIKAIIIQsgAyAEagwBCyAIQQhqIgNBAhC2ASAIIAgoAghBB3M2AgggA0EBELQBIAlBEGsiFCAIQRBqIgYgBEECayITQQJ0aigCAGsgAyAEQQFrQQEgBhC1ASADQQEQtgEgCCAIKAIIQQFyIgs2AgggFCADIBNBASAGELUBIBMLIQQgCUEQayEJIARBAUcNACAIKAIMIAtBAUdyDQALCyAIQdABaiQAIAJBAWoiAiANKAIAIgNJDQALIAMNAQsgDigCGCELQQAhAkEAIQMMAQsgDigCGCELIA0oAhwhBkEAIQlBACECA0AgCyAJQQJ0aiACNgIAIAYgCUEMbGoiBCgCAARAIAQoAgghCCAOKAIcIRMgDigCFCEUQQAhAwNAIBQgAkEDdGogCCADQQR0aiIWKwMIOQMAIBMgAkECdGogFigCADYCACACQQFqIQIgA0EBaiIDIAQoAgBJDQALCyAJQQFqIgkgDSgCACIDSQ0ACwsgCyADQQJ0aiACNgIAIA4oAiQiBgRAQQAhAyAGQQA2AgBBASEEIAxBA3YiDCEIQQAhAgNAAkAgAyAITw0AIAIgDSgCACIJIAIgCUsbIQkDQCACIAlGBEAgCSECDAILIAJBAnQgC2ooAgggA2ogCyACQQFqIgJBAnRqKAIAayIDIAhJDQALCyAGIARBAnRqIAI2AgAgCCAMaiEIIARBAWoiBEEIRw0ACyAGIA0oAgA2AiALAkAgBSgCFCICRQ0AIAIgAigCDBEBAEGYzwAoAgAiAwRAIAIgAxEBAAwBCyACQQBBlM8AKAIAEQAAGgsgBSAONgIUIAUoAhghDgsCQCAFKAJERQ0AIAUoAjwhDCAFKAI4IQ0gBSgCEEEDdCETQQAhFANAIAUoAkwhFiAFKwNYIThBACEIQQAhC0EAIQMgBygCBCICQQN0IgQEQEEAIARBlM8AKAIAEQAAIQtBACAEQZTPACgCABEAACEIQQAgBEGUzwAoAgARAAAhAwtEAAAAAAAAAAAhOUEAIQYgAkEATCIaRQRAA0AgDCAGQQN0aisDACI2IDaiIDmgITkgBkEBaiIGIAJHDQALCyAHIA0gCyAHKAIQEQQAQQAhBgJAIBpFBEADQCALIAZBA3QiCWoiEiASKwMAIAkgDGorAwChOQMAIAZBAWoiBiACRw0ACyAOIAsgCCAOKAIQEQQAIAMgCCAEEK4BIQlEAAAAAAAAAAAhNkEAIQZBACEERAAAAAAAAAAAITcDQCALIARBA3QiEmorAwAgCSASaisDAKIgN6AhNyAEQQFqIgQgAkcNAAsDQCALIAZBA3RqKwMAIjogOqIgNqAhNiAGQQFqIgYgAkcNAAsMAQsgDiALIAggDigCEBEEACADIAggBBCuARpEAAAAAAAAAAAhN0QAAAAAAAAAACE2C0EAIQkCQCAWRQ0AIDYgOCA4oiA5oiI6ZEUNAANAIAcgCCADIAcoAhARBAACfCAaRQRARAAAAAAAAAAAITZBACEGA0AgCCAGQQN0IgRqKwMAIAMgBGorAwCiIDagITYgBkEBaiIGIAJHDQALIDeaIDajITZBACEGQQAhBANAIA0gBEEDdCISaiIbIDYgCCASaisDAKIgGysDAKA5AwAgBEEBaiIEIAJHDQALA0AgCyAGQQN0IgRqIhIgNiADIARqKwMAoiASKwMAoDkDACAGQQFqIgYgAkcNAAsgDiALIAMgDigCEBEEAEQAAAAAAAAAACE4QQAhBgNAIAsgBkEDdCIEaisDACADIARqKwMAoiA4oCE4IAZBAWoiBiACRw0AC0QAAAAAAADwPyA3oyA4oiE2QQAhBkEAIQQDQCAIIARBA3RqIhIgNiASKwMAojkDACAEQQFqIgQgAkcNAAsDQCAIIAZBA3QiBGoiEiADIARqKwMAIBIrAwCgOQMAIAZBAWoiBiACRw0AC0QAAAAAAAAAACE2QQAhBgNAIAsgBkEDdGorAwAiNyA3oiA2oCE2IAZBAWoiBiACRw0ACyA4DAELIA4gCyADIA4oAhARBABEAAAAAAAAAAAhNkQAAAAAAAAAAAshNyAJQQFqIQkgNiA6ZEUNASAJIBZJDQALCwJAIAtFDQBBmM8AKAIAIgIEQCALIAIRAQAMAQsgC0EAQZTPACgCABEAABoLAkAgCEUNAEGYzwAoAgAiAgRAIAggAhEBAAwBCyAIQQBBlM8AKAIAEQAAGgsCQCADRQ0AQZjPACgCACICBEAgAyACEQEADAELIANBAEGUzwAoAgARAAAaCyAFIAk2AmggBSA2n0QAAAAAAADwPyA5nyI2IDZEAAAAAAAAAABhG6M5A3AgDSATaiENIAwgE2ohDCAUQQFqIhQgBSgCRCIDSQ0ACyADRQ0AIAUoAhAhByAFKAJAIQRBACEGA0AgBARAIAYgB2whCSAFKAIIIQxBACECA0AgAiAMai0AAEUEQCAFKAIAIAZBA3RqIg0oAgAgDSgCBCACbGogBSgCOCAFKAIMIAJBAnRqKAIAIAlqQQN0aisDADkDAAsgAkEBaiICIARHDQALCyAGQQFqIgYgA0cNAAsLQQEgESARQQFNGyEDQQAhAgNAIAUoAgAiBCgCACIHIAQoAgQiBCACQQF0IglsaisDACE2IBkgAkEDdGoiDCAHIAQgCUEBcmxqKwMAtjgCBCAMIDa2OAIAIAJBAWoiAiADRw0ACwJAIAUoAhQiAkUNACACIAIoAgwRAQBBmM8AKAIAIgMEQCACIAMRAQAMAQsgAkEAQZTPACgCABEAABoLIAVBADYCFAJAIAUoAhgiAkUNACACIAIoAgwRAQBBmM8AKAIAIgMEQCACIAMRAQAMAQsgAkEAQZTPACgCABEAABoLIAVBADYCGAJAIAUoAhwiAkUNACACIAIoAgwRAQBBmM8AKAIAIgMEQCACIAMRAQAMAQsgAkEAQZTPACgCABEAABoLIAVBADYCHAJAIAUoAigiAkUNAEGYzwAoAgAiAwRAIAIgAxEBAAwBCyACQQBBlM8AKAIAEQAAGgsgBUIANwIgIAVBADYCKAJAIAUoAjQiAkUNAEGYzwAoAgAiAwRAIAIgAxEBAAwBCyACQQBBlM8AKAIAEQAAGgsgBUIANwIsIAVBADYCNAJAIAUoAgQiAkUNAEGYzwAoAgAiAwRAIAIgAxEBAAwBCyACQQBBlM8AKAIAEQAAGgsgBUEANgIEAkAgBSgCACICRQ0AQZjPACgCACIDBEAgAiADEQEADAELIAJBAEGUzwAoAgARAAAaCyAFQQA2AgACQCAFKAIIIgJFDQBBmM8AKAIAIgMEQCACIAMRAQAMAQsgAkEAQZTPACgCABEAABoLIAVBADYCCAJAIAUoAgwiAkUNAEGYzwAoAgAiAwRAIAIgAxEBAAwBCyACQQBBlM8AKAIAEQAAGgsgBUEANgIMAkAgBSgCOCICRQ0AQZjPACgCACIDBEAgAiADEQEADAELIAJBAEGUzwAoAgARAAAaCyAFQQA2AjgCQCAFKAI8IgJFDQBBmM8AKAIAIgMEQCACIAMRAQAMAQsgAkEAQZTPACgCABEAABoLIAVBADYCPEGYzwAoAgAiAgRAIAUgAhEBAAwBCyAFQQBBlM8AKAIAEQAAGgsgCkGIAWoiAiAKKAIkIBgQiQEgAiAKKAIkEIoBAkAgCi0AiAENACAKKAKQAQ0AIAooApQBRQ0BCyAKQQE6ALABCwJAIBctAClFDQAgCigCJEEAEHNDAAAAAF1FIBVFcg0AIAooAiQoAlwhA0EAIQIDQCADIAJBA3RqIgQgBCoCAIw4AgAgAkEBaiICIBVHDQALCyAKEJQBIA9BMGokACABKAIEIgstALABBEAgACgCECgCACIFIgIgCygCJCIRIgM2AgAgAygCNCEEIAIgAygCRCIHNgIMIAcgAigCEEsEQCACQQRqIAcQTgsgBEEDbiIDIAIoAlRLBEAgAkHIAGogAxBOCyADIAIoAjRLBEAgAkEoaiADEE4LIAIgAzYCFCACIANBH2pBBXYiBDYCICAEIAIoAiRLBEAgAkEYaiAEEE4LAkAgAigCGCIJRQ0AIAIoAiAiDEUNACAJQQAgAigCHCAMbBCwARoLIAIgAzYCgAEgAiAENgKMASAEIAIoApABSwRAIAJBhAFqIAQQTgsgAiADNgJYIAIgBDYCZCAEIAIoAmhLBEAgAkHcAGogBBBOCyACIAc2AmwgAiAHQR9qQQV2IgQ2AnggBCACKAJ8SwRAIAJB8ABqIAQQTgsgAkFAayADNgIAIAMgAigCREsEQCACQThqIAMQTgsgBRBxBEAgAUEIaiEVA0BBAEG0AUGUzwAoAgARAAAhBCAAKAIIKAIAIQkgECAFKAJINgIoIBAgBSgCUDYCLCAQIAUoAgQ2AiAgECAFKAIMNgIkIAEoAhwhBiAQIBApAyg3AxAgECAQKQMgNwMIQQAhAiMAQdAAayIDJAAgBEEAQSgQsAEiB0EINgJ8IAdCADcCdCAHQgQ3AmwgB0IANwJkIAdCBDcCXCAHQgA3AlQgB0KAgICAwAA3AkggB0FAa0IANwIAIAdCgICAgMAANwI4IAdCADcCMCAHQoOAgIAwNwIoIAdCADcCgAEgB0EAOgCIASAHQYwBakEAQSUQsAEaIAcgECgCFCINNgJQIAdByABqIQogDQRAIAogDRBOIAooAgAhBCALKAJIIQwgECgCECEIA0AgBCACQQJ0Ig5qIAwgCCAOaigCAEECdGooAgA2AgAgAkEBaiICIA1HDQALCyAJIAYoAkQiAjYCCCACIAkoAgxLBEAgCSACEE4LAkAgCSgCACICRQ0AIAkoAggiBEUNACACQf8BIAkoAgQgBGwQsAEaCyAHQQBB8AFBlM8AKAIAEQAAIAYqAgAgBygCUCICQQNsIAJBAEF/EEs2AiQgBygCUCECIANCADcDSCADQgA3AzggA0KAgICAwAA3A0AgA0KAgICAwAA3AzAgA0IANwMoIANBBDYCICADIAJBA2w2AiQgDQRAIAdB6ABqIQ8gB0HYAGohFyAQKAIIIRggECgCECEZQQAhBANAIBkgBEECdCITaiEUQQAhDANAIAMgBigCLCAKKAIAIBNqKAIAQQNsIAxqQQJ0aigCACIINgIcIAMgBigCfCAIQQJ0aigCACIONgIYIBEoAiwgFCgCAEEDbCAMakECdGooAgAhFgJAAkACQCADKAIsIgJFDQAgAiADKAIoQQFrIA5xQQJ0aigCACICQX9GDQAgAygCQCEaIAMoAjAhEgNAIBIgAkECdCIbaigCACAORg0CIBogG2ooAgAiAkF/Rw0ACwsgA0F/NgIUIAMgA0EgaiADQRhqEGw2AhQgBygCJCECIAYoAjwhCCADKAIcIQ4gA0EANgIQIANCADcDCCACIAggDkEMbGogA0EIaiAYIBZBA3RqEEwgAygCHCEIDAELIAMgAjYCFAsgCSgCACAIQQJ0aiICKAIAQX9GBEAgAiAHKAI0NgIAIAcgBygCNEEBajYCNCAXIANBHGoQTyAPIANBFGoQTwsgDEEBaiIMQQNHDQALIARBAWoiBCANRw0ACwsgB0E4aiEOIAcgDUEDbCICNgJAIAIgBygCREsEQCAOIAIQTgsgDQRAQQAhCANAIAhBA2whFyAKKAIAIAhBAnRqIRggBigCfCEZIA4oAgAhEyAJKAIAIRQgBigCLCEWIAMoAjAhGiADKAIsIQ9BACEMA0AgEyAMIBdqQQJ0aiAUIBYgGCgCAEEDbCAMakECdGooAgBBAnQiAmooAgA2AgACQCAPRQRAQX8hBAwBC0F/IQQgDyACIBlqKAIAIhIgAygCKEEBa3FBAnRqKAIAIgJBf0YNACADKAJAIRsDQCAaIAIiBEECdCICaigCACASRg0BQX8hBCACIBtqKAIAIgJBf0cNAAsLIANBCGogDEECdGogBDYCACAMQQFqIgxBA0cNAAsgBygCJCADQQhqQQBBfxBQIAhBAWoiCCANRw0ACwsgBygCJBBwIAcQlAEgA0EgahBJIANB0ABqJAAgECAHNgI0IBUgEEE0ahBPIAUQcQ0ACwsgACgCACIAIAAoAhAgASgCJGo2AhAgABBKCyAQQUBrJAAL/wMCC38BfSMAQRBrIgYkACAAIAAoAjQiATYCuAEgAEGwAWohCCAAKAJEIQIgASAAKAK8AUsEQCAIIAEQTgsgACgCrAEhByAAQaABaiEJIAcCfyABs0PNzMw9lCIMQwAAgE9dIAxDAAAAAGBxBEAgDKkMAQtBAAsiA0kEQCAJIAMQTgsgACACNgKMASAAIAJBH2pBBXYiAzYCmAEgAyAAKAKcAUsEQCAAQZABaiADEE4LAkAgACgCkAEiA0UNACAAKAKYASICRQ0AIANBACAAKAKUASACbBCwARoLIAEEQCAIKAIAQf8BIAFBAnQQsAEaCyAAKAI0IgFBA08EQCABQQNuIQpBACECA0ACQCAALQAEQQFxBEAgACgCDCACai0AAA0BCyACQQNsIQdBACEBA0AgBiABIAdqIgQ2AgwCQCAAIAAoAiwiBSABQQFqIgMgAUECayABQQJJGyAHakECdGooAgAiASAFIARBAnRqKAIAIgQQayIFQX9HBEAgCCgCACAGKAIMQQJ0aiAFNgIADAELIAkgBkEMahBPIAAoApABIgUgBEEDdkH8////AXFqIgsgCygCAEEBIAR0cjYCACAFIAFBA3ZB/P///wFxaiIEIAQoAgBBASABdHI2AgALIAMiAUEDRw0ACwsgAkEBaiICIApHDQALCyAGQRBqJAAL7A0DDX8EfQJ+IwBBQGoiBCQAIABBADYCMCAAQQA2AlACQCAAKAI4IgJFDQAgAEFAaygCACIBRQ0AIAJBACAAKAI8IAFsELABGgsCQCAAKAKEASICRQ0AIAAoAowBIgFFDQAgAkEAIAAoAogBIAFsELABGgsCQCAAKAJcIgJFDQAgACgCZCIBRQ0AIAJBACAAKAJgIAFsELABGgsCQCAAKAJwIgJFDQAgACgCeCIBRQ0AIAJBACAAKAJ0IAFsELABGgsCf0EAIAAoAgAoAjQiAkEDSQ0AGiACQQNuIQIgACgCGCEDQQAhAQNAIAMgAUEDdkH8////AXFqKAIAIAF2QQFxRQRAIAAgASAEQSBqEJUBIAFBA2whAwNAIAAoAnAgACgCACgCLCADIAVqQQJ0aigCACICQQN2Qfz///8BcWoiBiAGKAIAQQEgAnRyNgIAIAAoAgQgAkEDdGogBEEgaiAFQQN0aikDADcCACAFQQFqIgVBA0cNAAsgACABEJYBIAAoAgAiAigCNCEFIAIoAiwhAkEAIQEgAEEANgLQASAAIAU2ArABIAAgAjYCrAEgACAAKAIMNgKoASAAIAAoAgQ2AqQBIABBADYCnAEgAEGUAWohCQNAIAQgAzYCPCAJIARBPGoQTyADIAFBA0kiAmohAyABIAJqIgFBA0cNAAsCQCAAKAIwIgNFDQAgAEGYAmohDSAAQYgCaiELA0AgACgCKCEFQ///f38hDkEAIQJBACEBA0AgBSABQQJ0aigCACIGKgIcIg8gDiAOIA9eIgcbIQ4gBiACIAcbIQIgAUEBaiIBIANHDQALIAJFDQFDAAAAACEOQQAhA0MAAAAAIQ8gAiEBA0AgA0EBaiEDIA8gASoCEJIhDyAOIAEqAhSSIQ4gASgCDCIBDQALIAAoAgQgAigCBCIMQQN0aiIBIA5DAACAPyADs5UiEJQiDjgCBCABIA8gEJQiDzgCACAAKAIEIQEgACgCACgCLCEHIAIhAwJ/A0BBASADKgIkIhFDAAAAAF0gASAHIAMoAiAiBUECdGooAgBBA3RqKQIAIhKnviAPkyABIAdBfkEBIAVBA3BBAUsbIAVqQQJ0aigCAEEDdGopAgAiE0IgiKe+IA6TlCATp74gD5MgEkIgiKe+IA6TlJMiEEMAAAAAXXEgEUMAAAAAXiAQQwAAAABecXINARogAygCDCIDDQALQQALIQYgAiEFAkACQAJAA0AgASAHIAUoAgBBDGxqIgMoAgBBA3RqIggqAgAgASADKAIIQQN0aiIKKgIAIg6TIAEgAygCBEEDdGoiAyoCBCAKKgIEIg+TlCADKgIAIA6TIAgqAgQgD5OUk0MAAAA/lEMAAAAAXw0BIAUoAgwiBQ0ACyAGDQAgAEEANgKgAiAAQQA2ApACIAIhBgNAIAYoAgBBA2whASAAKAIAIQVBACEDA0ACQCABQQJ0IgcgBSgCsAFqKAIAIghBf0YEQCAEIAE2AiAgCyAEQSBqEE8MAQsgCEEDbiIIQQV2QQJ0IgogACgCXGooAgBBASAIdCIIcUUEQCAEIAE2AiAgCyAEQSBqEE8gACgCXCAKaigCACAIcUUNAQsgBCAFKAKwASAHaigCADYCICANIARBIGoQTwsgASADQQNJIgdqIQEgAyAHaiIDQQNHDQALIAYoAgwiBg0ACyAAKAIAKgIAIQ4gBCAAKAKIAjYCGCAEIAAoApACNgIcIAQgACgCmAI2AhAgBCAAKAKgAjYCFCAEIAQpAxg3AwggBCAEKQMQNwMAIAkgDiAEQQhqIAQQgwFFDQELIAAoAoQBIQMgAiEBA0AgAyABKAIAIgVBA3ZB/P///wFxaiIGIAYoAgBBASAFdHI2AgAgASgCDCIBDQALIAAgAhCXAQwBCyAAKAJwIAxBA3ZB/P///wFxaiIBIAEoAgBBASAMdHI2AgAgAiEBA0AgACABKAIAEJYBIAEoAgwiAQ0ACyAAIAIQlwEgACgCACICKAI0IQEgAigCLCEDQQAhAiAAQQA2AtABIAAgATYCsAEgACADNgKsASAAIAAoAgw2AqgBIAAgACgCBDYCpAEgAEEANgKcASAAKAJQRQ0AA0AgACgCSCACQQJ0aigCAEEDbCEBIAAoAgAhBUEAIQMDQAJAIAUoArABIAFBAnRqKAIAIgZBf0cEQCAAKAJcIAZBA24iBkEDdkH8////AHFqKAIAIAZ2QQFxDQELIAQgATYCICAJIARBIGoQTwsgASADQQNJIgZqIQEgAyAGaiIDQQNHDQALIAJBAWoiAiAAKAJQSQ0ACwsgACgCMCIDDQALC0EBDAILIAFBAWoiASACRw0AC0EACyEBIARBQGskACABC68BAgV9An8gACgCPCIHIAAoAiwgAUEMbGoiACgCBEEMbGoiASoCACAHIAAoAgBBDGxqIggqAgAiA5MiBiAHIAAoAghBDGxqIgAqAgQgCCoCBCICkyIElCAAKgIAIAOTIgMgASoCBCACkyIClJMiBSAFlCACIAAqAgggCCoCCCICkyIFlCAEIAEqAgggApMiApSTIgQgBJQgAiADlCAFIAaUkyIDIAOUkpKRQwAAAD+UC2oCAn8CfSAAKAJcIgIgACgCLCABQQxsaiIAKAIAQQN0aiIBKgIAIAIgACgCCEEDdGoiAyoCACIEkyACIAAoAgRBA3RqIgAqAgQgAyoCBCIFk5QgACoCACAEkyABKgIEIAWTlJNDAAAAP5QL7QECBn0CfyABKAI8IgkgASgCLCACQQxsaiIBKAIIQQxsaiICKgIAIAkgASgCAEEMbGoiCioCACIEkyIGIAkgASgCBEEMbGoiASoCBCAKKgIEIgOTIgWUIAEqAgAgBJMiByACKgIEIAOTIgOUkyIEIASUIAMgASoCCCAKKgIIIgOTIgiUIAUgAioCCCADkyIFlJMiAyADlCAFIAeUIAggBpSTIgYgBpSSkpEiBUMAAAAAXgRAIAAgBEMAAIA/IAWVIgSUOAIIIAAgBiAElDgCBCAAIAMgBJQ4AgAPCyAAQYCAgPwDNgIIIABCADcCAAuxFwMMfRZ/AX4jAEEwayIVJAAgFSAAKQIAIiQ3AwggFSAkNwMoAn8CfyABQRhqIRFBACEAIBUoAgwiEkEDRgRAIBEgFSgCCCIAKgIYIAAqAgAiApMiBCAAKgIQIAAqAgQiA5MiBZQgACoCDCACkyIHIAAqAhwgA5MiA5STIgJDAACAPyACIAKUIAMgACoCFCAAKgIIIgKTIgOUIAUgACoCICACkyIFlJMiAiAClCAFIAeUIAMgBJSTIgQgBJSSkpGVIgOUOAIIIBEgBCADlDgCBCARIAIgA5Q4AgBBAQwBCwJAIBJFDQAgFSgCCCEWA0AgAiAWIABBDGxqIhQqAgiSIQIgBCAUKgIEkiEEIAMgFCoCAJIhAyAAQQFqIgAgEkcNAAsgEkUNAEMAAIA/IBKzlSIFIAKUIQkgBSAElCEMIAUgA5QhDSAVKAIIIRZBACEAQwAAAAAhBQNAIBYgAEEMbGoiFCoCBCAMkyICIBQqAgggCZMiBJQgB5IhByAUKgIAIA2TIgMgBJQgBpIhBiADIAKUIAWSIQUgBCAElCAIkiEIIAIgApQgCpIhCiADIAOUIAuSIQsgAEEBaiIAIBJHDQALC0EAIQACQCAKIAiUIAcgB5STIgIgCyAIlCAGIAaUkyIEIAsgCpQgBSAFlJMiAyADIARdGyIJIAIgCV4bIglDAAAAAF8NACAFjCEMIAaMIQ0CQCACIAlbBEAgBSAHlCAKIA2UkiEDIAYgB5QgCCAMlJIhBAwBCyAHjCECIAQgCVsEQCAFIAaUIAsgApSSIQMgBiAHlCAIIAyUkiECDAELIAMgCVwEQEMAAAAAIQJDAAAAACEEQwAAAAAhAwwBCyAFIAaUIAsgApSSIQQgBSAHlCAKIA2UkiECCyADIAOUIAIgApQgBCAElJKSkSIFi0MXt9E4Xw0AIBEgA0MAAIA/IAWVIgOUIgU4AgggESAEIAOUIgQ4AgQgESACIAOUIgI4AgAgBSAFlCACIAKUIAQgBJSSkpEiAkMAAIC/kosgAosiAkMAAIA/IAJDAACAP14bQ28SgzqUXyEACyAACwRAIBVBGGogERBSIAEgFSgCIDYCCCABIBUpAxg3AgAgASABKgIYIgIgASoCBCIElCABKgIAIgMgASoCHCIFlJM4AhQgASADIAEqAiAiA5QgAiABKgIIIgKUkzgCECABIAUgApQgBCADlJM4AgxBAQwBCyAVICQ3AwAgFSAkNwMQIwBB8ABrIg4kACAOIBUpAgAiJDcDSCAOICQ3AwhDAAAAACECQwAAAAAhBEMAAAAAIQNDAAAAACEFQwAAAAAhB0MAAAAAIQZDAAAAACEIQwAAAAAhCkMAAAAAIQsjAEEQayIAJAAgACAOKQIIIiQ3AwAgACAkNwMIIAAoAgQiEgRAIAAoAgAhFkEAIREDQCAWIBFBDGxqIhQqAgggA5IhAyAUKgIEIAKSIQIgFCoCACAEkiEEIBFBAWoiESASRw0ACwsgDkMAAIA/IBKzlSIJIAOUOAIYIA4gCSAClDgCFCAOIAkgBJQ4AhAgDkIANwJgIA5CADcCWCAOQgA3AlAgJEIgiKciFARAICSnIRYgDioCGCEJIA4qAhQhDCAOKgIQIQ1BACERA0AgFiARQQxsaiISKgIAIQMgEioCBCEEIA4gEioCCCAJkyICIAKUIAWSIgU4AmQgDiAEIAyTIgQgApQgB5IiBzgCYCAOIAQgBJQgBpIiBjgCXCAOIAMgDZMiAyAClCAIkiIIOAJYIA4gAyAElCAKkiIKOAJUIA4gAyADlCALkiILOAJQIBFBAWoiESAURw0ACwsgAEEQaiQAAkACQCAOKgJQQwAAAABcDQAgDioCXEMAAAAAXA0AQQAhACAOKgJkQwAAAABbDQELIA5BPGohEyAOQRBqIRBBACEUQQAhFiMAQdAAayIPJAAgDioCZCEEIA4qAmAhBSAOKgJcIQcgDioCVCECIA4qAlghBiAOKgJQIQMgD0EANgI8IA8gAzgCKAJ9IAaLQ3fMKzJgRQRAQwAAAAAhBkMAAIA/IQNDAACAPwwBCyAFIAIgAiAClCAGIAaUkpEiApUiAyADIAOSIAWUIAYgApUiBiAEIAeTlJIiCJSTIQUgBCAGIAiUIgiTIQQgCCAHkiEHIAOMCyEIIA8gBDgCMCAPIAc4AiwgDyAFOAI4IA8gAjgCNCAPIAg4AiAgDyAGOAIcIA9BADYCGCAPIAY4AhQgDyADOAIQIA9CADcDCCAPQoCAgPwDNwMAIA9BKGohGCAPQTRqIRkDQCAZIBQiEUECdCIAaiEeIAAgGGohGyAYIBFBAWoiFEECdGohIUEAIRwCQANAIBEhEgNAIBIiAEECRwRAIBkgAEECdCISaioCAIsgEiAYaioCAIsgGCAAQQFqIhJBAnRqKgIAi5IiApIgAlwNAQsLIAAgEUcEQEMAAAAAIQVDAACAPyECIB4qAgAiBCAhKgIAIBsqAgAiB5MgBCAEkpUiBCAEIASUQwAAgD+SkSIDjCADIARDAAAAAF0bkpUgGCAAQQJ0IiJqKgIAIAeTkiEDQwAAgD8hBCAbIAAgEUsEfQNAIAIgGSAAQQFrIhJBAnQiH2oqAgAiApQhByAZIABBAnQiIGoCfSAEIAKUIgaLIAOLYARAIAMgBpUiAkMAAIA/IAIgApRDAACAP5KRIgOVIgSUIQIgBiADlAwBCyAGIAOVIgJDAACAPyACIAKUQwAAgD+SkSIGlSIClCEEIAMgBpQLOAIAIBggIGoiACAAKgIAIAWTIgMgBCAYIB9qKgIAIAOTIASUIAcgB5IgApSSIgOUIgWSOAIAIASMIQYgB4whB0EAIQADQCAPIABBDGxqIh0gIGoiIyAEIB0gH2oiHSoCACIIlCACICMqAgAiCpSSOAIAIB0gAiAIlCAKIAaUkjgCACAAQQFqIgBBA0cNAAsgAiADlCAHkiEDIBIiACARSg0ACyAbKgIABSAHCyAFkzgCACAeIAM4AgAgGSAiakEANgIAIBxBAWoiHEEgRw0BDAILCyAcQSBGDQAgEUEBSyEWIBRBA0cNAQsLAkAgFkUEQANAIBMgF0ECdGpBADYCACAQIBdBDGxqIgBBADYCCCAAQgA3AgAgF0EBaiIXQQNHDQAMAgsACyATIA8pAig3AgAgEyAPKAIwNgIIA0BBACEXA0AgECAXQQxsaiAaQQJ0aiAPIBpBDGxqIBdBAnRqKgIAOAIAIBdBAWoiF0EDRw0ACyAaQQFqIhpBA0cNAAsCQCATKgIIIgIgEyoCACIEXkUNACACIBMqAgReRQ0AIBMgBDgCCCATIAI4AgAgDyAQKAIINgJIIA8gECkCADcDQCAQIBApAhg3AgAgECAQKAIgNgIIIBAgDykDQDcCGCAQIA8oAkg2AiAgEyoCACEECyAEIBMqAgQiAl0EQCATIAQ4AgQgEyACOAIAIA8gECgCCDYCSCAPIBApAgA3A0AgECAQKQIMNwIAIBAgECgCFDYCCCAQIA8pA0A3AgwgECAPKAJINgIUIBMqAgQhAgsgEyoCCCIEIAJeRQ0AIBMgAjgCCCATIAQ4AgQgDyAQKAIUNgJIIA8gECkCDDcDQCAQIBApAhg3AgwgECAQKAIgNgIUIBAgDykDQDcCGCAQIA8oAkg2AiALIA9B0ABqJAAgFiIARQ0AIAEgDioCMCICQwAAgD8gAiAClCAOKgIoIgIgApQgDioCLCIEIASUkpKRlSIDlDgCICABIAQgA5Q4AhwgASACIAOUOAIYIAEgDioCGCICQwAAgD8gAiAClCAOKgIQIgIgApQgDioCFCIEIASUkpKRlSIDlDgCCCABIAQgA5Q4AgQgASACIAOUOAIAIAEgDioCJCICQwAAgD8gAiAClCAOKgIcIgIgApQgDioCICIEIASUkpKRlSIDlDgCFCABIAQgA5Q4AhAgASACIAOUOAIMCyAOQfAAaiQAIAALIQAgFUEwaiQAIAALywMCB38CfSMAQRBrIgMkAEEAQYABQZTPACgCABEAACICQQRqQQBByAAQsAEaIAJCADcCdCACQoCAgICAATcCbCACQoCAgIBwNwJkIAJCBDcCXCACQgA3AlQgAkIENwJMIAMgAjYCDCACIAAoAjQ2AgAgAEEsaiADQQxqEE8gAygCDCIFQQA2AnwgACgCACICKAIsKAI0IgZBA08EQCAGQQNuIQcgAigChAEhCCAAKAIEIQZBACECA0ACQCAIIAJBA3ZB/P///wFxaigCACACdkEBcQ0AIAYoAjQgBigCJCACQQJ0aigCAEECdGoqAgAiCiAJXkUNACAFIAI2AnwgAiEEIAohCQsgAkEBaiICIAdHDQALCyAAIAUgBBB5GgJAIAMoAgwiAigCdCIERQ0AA0AgAkHsAGoiBSgCACAEQQFrQQN0aiICKgIAIAFeDQEgAigCBCECIAUQagJAIAAoAgAoAoQBIAJBA3ZB/P///wFxaigCACACdkEBcQ0AIAAgAygCDCACEHkNACADKAIMIQQgAyAAKAIEKAIkIAJBAnRqKAIANgIIIARB2ABqIANBCGoQTwsgAygCDCICKAJ0IgQNAAsLIANBEGokAAuRAwIKfwJ9IAAoAjQiCQRAA0AgACgCLCAHQQJ0aigCACECQQAhA0EAIQEjAEEQayIEJAAgAigCUCEFIABBADYCSAJAIAVFDQAgAEE8aiEGA0AgBkMAAIA/IAAoAgAoAnAgAigCSCABQQJ0aigCACIKQQxsaiIDKgIIIAIqAiSUIAMqAgAgAioCHJQgAyoCBCACKgIglJKSkyIMQwAAgD8gDEMAAIA/XRsgChCCASABQQFqIgEgBUcNAAsgACgCSCIBRQRAQQAhAwwBCyAAQUBrIQVBACEDQ///f38hDANAIAAoAkAgAUEDdGpBBGsoAgAhASAFEGogBCAAKAIAKAIsIAEQgQEgAioCRCAEKgIIkyILIAuUIAIqAjwgBCoCAJMiCyALlCACKgJAIAQqAgSTIgsgC5SSkpEiCyAMIAsgDF0iBhshDCABIAMgBhshAyAAKAJIIgENAAsLIAIoAnwiASADRwRAIAIgAzYCfAsgBEEQaiQAIAggASADR3IhCCAHQQFqIgcgCUcNAAsLIAhBAXELYAICfQF/IAAqAgAiAyABKgIAIgSTiyADiyIDIASLIgQgAyAEXhtDAACAP5cgApRfBH8gACoCBCIDIAEqAgQiBJOLIAOLIgMgBIsiBCADIAReG0MAAIA/lyAClF8FIAULC7IVAg59En8jAEFAaiISJAAgEiACNgI8IAEoAlAhEyABQcgAaiIcIBJBPGoQTyASIAAoAgQoAhQgEigCPCICQQJ0aigCACIVNgI4IAIgFUcEQANAIBwgEkE4ahBPIBIgACgCBCgCFCASKAI4QQJ0aigCACICNgI4IAIgEigCPEcNAAsLIAEoAlAhGyASQRBqQQBBJBCwARoCQAJAAkAgEwRAIAAgASASQRBqEH1FDQIgEioCMCIEIAAoAgAoAnAgEigCPEEMbGoiAioCCJQgEioCKCIFIAIqAgCUIBIqAiwiAyACKgIElJKSQwAAAABdBEAgEiAEjDgCMCASIAOMOAIsIBIgBYw4AigLIAAgARB+AkACQCATIBtPIhVFBEAgACgCHCERIBwoAgAhFCATIQIDQCARIBQgAkECdGooAgBBAnRqIAEoAgA2AgAgAkEBaiICIBtHDQALIAAgARB/DQEgFUUNAgwFCyAAIAEQf0UNBAsgEigCPCECDAILIAAoAhwhACAcKAIAIRUgEyECA0AgACAVIAJBAnRqKAIAQQJ0akF/NgIAIAJBAWoiAiAbRw0ACwwCCyASIAJBDGwiFSAAKAIAIhEoAnBqIhQoAgg2AjAgEiAUKQIANwMoIBIgESgCLCIRKAI8IhQgESgCLCAVaiIRKAIAQQxsaiIVKgIIIBQgESgCBEEMbGoiESoCCJMiBEMAAIA/IAQgBJQgFSoCACARKgIAkyIEIASUIBUqAgQgESoCBJMiBSAFlJKSkZUiA5QiBjgCGCASIAUgA5QiBTgCFCASIAQgA5QiBDgCECASIBIqAigiAyAFlCAEIBIqAiwiB5STOAIkIBIgEioCMCIIIASUIAYgA5STOAIgIBIgByAGlCAFIAiUkzgCHAsgAUEEaiASQRBqQSQQrgEaIAEqAighBSAAKAIEKAIUIREgACgCACgCUCEUIAIhFQNAIAUgFCAVQQJ0IhVqKgIAkiEFIBEgFWooAgAiFSACRw0ACyABIAU4AiggASAAIAEgAhCAATgCLAJAIBMgG0kEQANAIAAoAhwgASgCSCATQQJ0aigCACICQQJ0aiABKAIANgIAIAAgACgCGEEBazYCGCAAKAIAIhUoAoQBIAJBA3ZB/P///wFxaiIRIBEoAgBBASACdHI2AgAgEiAVKAIsIAIQgQEgASASKgIAIAEqAjCSIgU4AjAgASASKgIEIAEqAjSSIgM4AjQgASASKgIIIAEqAjiSIgQ4AjggE0EBaiITIBtHDQAMAgsACyABKgI4IQQgASoCNCEDIAEqAjAhBQsgAUEANgJ0IAFDAACAPyABKAJQs5UiBiAElDgCRCABQUBrIAYgA5Q4AgAgASAFIAaUOAI8IBtFBEBBASECDAILIAFB6ABqISADQCAcKAIAIB9BAnRqKAIAQQNsISFBACEVA0ACQCAAKAIAIgIoAiwoArABIBUgIWpBAnRqKAIAIhNBf0YNACACKAKEASATQQNuIhNBA3ZB/P///wBxaigCACATdkEBcQ0AIAEoAmAiEQRAQQAhAiAAKAIEKAIkIBNBAnRqKAIAIhQgASgCWCIYKAIARg0BA0AgESACQQFqIgJHBEAgGCACQQJ0aigCACAURw0BCwsgAiARSQ0BCyABKgIoIQUgACgCBCgCFCERIAAoAgAoAlAhFCATIQIDQCAFIBQgAkECdCICaioCAJIhBSACIBFqKAIAIgIgE0cNAAsgACABIBMQgAEhBkP//39/IQQCQCAAKAIAIgIqAgQiA0MAAAAAXiADIAVdcQ0AIAIqAggiA0MAAAAAXiADIAZdcQ0AQwAAgD8gAigCcCATQQxsaiIRKgIIIAEqAiSUIBEqAgAgASoCHJQgESoCBCABKgIglJKSkyIDQwAAgD8gA0MAAIA/XRsiCUP0/TQ/YA0AIAIqAgwhCkMAAAAAIQNDAAAAACEHIBMhGANAIAAoAgAoAiwhAkEAIREgGEEDbCIdIRQDQAJAIBRBAnQiFiACKAKwAWooAgAiF0F/Rg0AIAAoAhwgF0EDbkECdGooAgAgASgCAEcNACAHIAAoAgAoAkAgFmoqAgAiCJIhByACIBQQekUNACAAIBQQe0UNACADIAhDAACAPwJ9IAAoAgAiFygCLCIZLQAEQQJxBEAgGSgCTCIXIAIoAiwiGiARIB1qQQJ0aigCAEEMbGoiHioCCCAXIBkoAiwiIkF+QQEgAigCsAEgFmooAgAiFkEDcEEBSxsgFmpBAnRqKAIAQQxsaiIZKgIIlCAeKgIAIBkqAgCUIB4qAgQgGSoCBJSSkiIDQwAAAAAgA0MAAAAAXhsiA0MAAIA/IANDAACAP10bIBcgGiARQQFqQQNwIB1qQQJ0aigCAEEMbGoiGSoCCCAXICIgFkECdGooAgBBDGxqIhYqAgiUIBkqAgAgFioCAJQgGSoCBCAWKgIElJKSIgNDAAAAACADQwAAAABeGyIDQwAAgD8gA0MAAIA/XRuSQwAAAD+UDAELIBcoAnAiGSAYQQxsaiIXKgIIIBkgAigCsAEgFmooAgBBA25BDGxqIhYqAgiUIBcqAgAgFioCAJQgFyoCBCAWKgIElJKSIgNDAAAAACADQwAAAABeGyIDQwAAgD8gA0MAAIA/XRsLk5SSIQMLIBQgEUEDSSIWaiEUIBEgFmoiEUEDRw0ACyAAKAIEKAIUIBhBAnRqKAIAIhggE0cNAAtDAAAAACADIAeVIANDAAAAAF8bIgtDAAAAAF4gACgCACICKgIYIgxDAAB6RGBxDQAgASoCKCENIAEqAiwhByACKgIQIQ4gAioCFCEPQwAAAAAhBEMAAAAAIQMgACgCBCICKAIkIhggE0ECdGooAgAhFiAAKAIcIRcgAigCFCEdIAAoAgAiAigCQCEZIAIoAiwoArABIR4gEyECA0AgAkEDbCERQQAhFANAIBkgEUECdCIaaioCACEIAkACQCAaIB5qKAIAIhpBf0YNACAYIBpBA25BAnQiGmooAgAgFkYNASAXIBpqKAIAIAEoAgBHDQAgBCAIkiEEDAELIAMgCJIhAwsgESAUQQNJIhpqIREgFCAaaiIUQQNHDQALIB0gAkECdGooAgAiAiATRw0ACyADIASTIAQgA5KVIgRDAAAAACAEQwAAAABdGyEIIAAoAgAqAhxDAAAAACEEQwAAAAAhAyATIREDQCARQQNsIQIgACgCACgCLCEUQQAhGANAAkAgAkECdCIWIBQoArABaigCACIXQX9GDQAgACgCHCAXQQNuQQJ0aigCACABKAIARw0AIAMgACgCACgCQCAWaioCACIQkiEDIBQgAhB6RQ0AIAQgEEMAAACAIBQgAhB8G5IhBAsgAiAYQQNJIhZqIQIgFiAYaiIYQQNHDQALIAAoAgQoAhQgEUECdGooAgAiESATRw0AC0MAAAAAIAQgA5UgBEMAAAAAXxuUIA8gCJQgDkMAAIA/IAcgB5QgDZUgBiAGlCAFlZWTlCAMIAuUIAogCZRDAAAAAJKSkpKSIQQLIARD//9/f11FDQAgICAEIBMQggELIBVBAWoiFUEDRw0AC0EBIQIgH0EBaiIfIBtHDQALDAELIAEgEzYCUEEAIQIgASgCVCATTw0AIBwgExBOCyASQUBrJAAgAgt2AQN/IAFBAnQiAyAAKAKwAWooAgAiAkF/RgRAQQAPC0EBIQQgACgCLCIAIANqKAIAIABBfkEBIAJBA3BBAUsbIAJqQQJ0aigCAEYEfyAAQX5BASABQQNwQQFLGyABakECdGooAgAgACACQQJ0aigCAEcFIAQLC+wDAQV/AkACQCAAKAIAIgQoAiwiBSgCsAEgAUECdGooAgAiAkF/Rg0AAn8gBS0ABEECcQRAIAUoAiwiACABQQJ0aigCACEEIABBfkEBIAJBA3BBAUsbIAJqQQJ0aigCACEGIABBfkEBIAFBA3BBAUsbIAFqQQJ0aigCACIBIAAgAkECdGooAgAiAkYgBCAGRnENAiAFKAJMIgAgBEEMbGoiAyoCACAAIAZBDGxqIgUqAgCTi0NvEoM6X0UNAyADKgIEIAUqAgSTi0NvEoM6X0UNAyAAIARBDGxqKgIIIAAgBkEMbGoqAgiTi0NvEoM6X0UNAyAAIAFBDGxqKgIAIAAgAkEMbGoqAgCTi0NvEoM6X0UNA0EBIQMgACABQQxsaiIBKgIEIAAgAkEMbGoiACoCBJOLQ28SgzpfRQ0CIABBCGohAyABQQhqDAELIAAoAgQoAiQiACABQQNuIgFBAnRqKAIAIAAgAkEDbiICQQJ0aigCAEYNAUEBIQMgBCgCcCIAIAFBDGxqIgUqAgAgACACQQxsaiIEKgIAk4tDbxKDOl9FDQEgBSoCBCAEKgIEk4tDbxKDOl9FDQEgACACQQxsakEIaiEDIAAgAUEMbGpBCGoLKgIAIAMqAgCTi0NvEoM6X0UhAwsgAw8LQQELwwEBBX8gAUECdCICIAAoArABaigCACIDQX9GBEBBAA8LQQEhBQJAIAAoAlwiBCAAKAIsIgAgAmooAgBBA3RqIgIqAgAgBCAAQX5BASADQQNwQQFLGyADakECdGooAgBBA3RqIgYqAgBcDQAgAioCBCAGKgIEXA0AIAQgAEF+QQEgAUEDcEEBSxsgAWpBAnRqKAIAQQN0aiIBKgIAIAQgACADQQJ0aigCAEEDdGoiACoCAFwgASoCBCAAKgIEXHIhBQsgBQvrAQEIfyMAQRBrIgQkACAAIAEoAlAiB0EDbCIDNgJYIAMgACgCXEsEQCAAQdAAaiADEE4LIAcEQEEAIQMDQCADQQNsIQggASgCSCADQQJ0aigCAEEDbCEJQQAhBQNAIAAoAlAgBSAIakEMbGoiCiAAKAIAKAIsIgYoAjwgBigCLCAFIAlqQQJ0aigCAEEMbGoiBikCADcCACAKIAYoAgg2AgggBUEBaiIFQQNHDQALIANBAWoiAyAHRw0ACwsgBCAAKAJQNgIIIAQgACgCWDYCDCAEIAQpAwg3AwAgBCACEHUhACAEQRBqJAAgAAvNAQIHfwZ9IAEoAlAiBQRAA0AgASgCSCADQQJ0aigCAEEDbCEGQQAhBANAIAEqAgwhCSABKgIEIQogASoCCCELIAAoAgggBCAGaiICQQN0aiIHIAEqAhggACgCACgCLCIIKAI8IAgoAiwgAkECdGooAgBBDGxqIgIqAggiDJQgASoCECACKgIAIg2UIAIqAgQiDiABKgIUlJKSOAIEIAcgCSAMlCAKIA2UIAsgDpSSkjgCACAEQQFqIgRBA0cNAAsgA0EBaiIDIAVHDQALCwuYAwIIfwJ9IwBBMGsiAiQAAn8CQCABKAJQIgZFDQADQCAEIAAoAgggASgCSCAFQQJ0aigCAEEYbGoiAyoCCCADKgIAIgqTIAMqAhQgAyoCBCILk5QgAyoCDCALkyADKgIQIAqTlJNDAAAAP5RDAAAAAF1qIQQgBUEBaiIFIAZHDQALIARFDQBBACAEIAZHDQEaC0EAIQQgAEEANgKcASAAQgA3AnggACAAKAIINgJwIABBADYCaCAAIAAoAhA2AnQgAEHgAGohAyAGBEADQCABKAJIIARBAnRqKAIAQQNsIQdBACEFA0ACQCAAKAIAKAIsKAKwASAFIAdqIghBAnRqKAIAIglBf0cEQCAAKAIcIAlBA25BAnRqKAIAIAEoAgBGDQELIAIgCDYCLCADIAJBLGoQTwsgBUEBaiIFQQNHDQALIARBAWoiBCAGRw0ACwsgACgCACgCLCoCACEKIAJCADcDGCACQgA3AyAgAkIANwMQIAJCADcDCCADIAogAkEQaiACQQhqEIMBQQFzCyEAIAJBMGokACAAC+kBAgl/An0gACgCBCIEKAIkIgYgAkECdGooAgAhByAAKAIcIQggASoCLCEMIAQoAhQhCSAAKAIAIgAoAkAhCiAAKAIsKAKwASELIAIhBANAIARBA2whAEEAIQUDQCAKIABBAnQiA2oqAgAhDQJAAkAgAyALaigCACIDQX9GDQAgBiADQQNuQQJ0IgNqKAIAIAdGDQEgAyAIaigCACABKAIARw0AIAwgDZMhDAwBCyAMIA2SIQwLIAAgBUEDSSIDaiEAIAMgBWoiBUEDRw0ACyAJIARBAnRqKAIAIgQgAkcNAAsgDEMAAAAAlwvNAgINfQJ/IAAgASgCPCIQIAEoAiwgAkEMbGoiASgCAEEMbGoiAioCCCIEIBAgASgCCEEMbGoiESoCCCIFkiAEIAWTIgMgA5QgAioCACIGIBEqAgAiB5MiAyADlCACKgIEIgggESoCBCIJkyIDIAOUkpKRIgqUQwAAgD8gCiAQIAEoAgRBDGxqIgEqAggiCyAEkyIDIAOUIAEqAgAiDCAGkyIDIAOUIAEqAgQiDSAIkyIDIAOUkpKRIg4gBSALkyIDIAOUIAcgDJMiAyADlCAJIA2TIgMgA5SSkpEiD5KSlSIDlCALIASSIA6UIAOUIAsgBZIgD5QgA5SSkjgCCCAAIAggCZIgCpQgA5QgDSAIkiAOlCADlCANIAmSIA+UIAOUkpI4AgQgACAGIAeSIAqUIAOUIAwgBpIgDpQgA5QgDCAHkiAPlCADlJKSOAIAC+8CAQZ/IwBBEGsiBiQAIAYgAjYCDCAGIAE4AgggAEEEaiEDAkACQCAAKAIMIgVFDQAgAygCACIEIAVBA3RqQQhrKgIAIAFeDQBBACECAkADQCAEIAJBA3RqKgIAIAFdDQEgAkEBaiICIAVHDQALIAUhAgsgBkEIaiEIIAMgAygCCEEBaiIENgIIIAQgAygCDCIFSwRAIAMgBEECdkEAIAUbIARqEE4LAkAgAygCACIHRQ0AIAIgAygCCEEBayIFSQRAIAcgAygCBCIEIAJBAWpsaiAHIAIgBGxqIAQgBSACa2wQrwEgAygCACEHCyAIRSAHRXINACAHIAIgAygCBCICbGogCCACEK4BGgsgACgCDCIEIAAoAgBNDQEgAygCACIFRQ0BQQEhAiAEQQJPBEAgBSAFIAAoAggiAmogAiAEQQFrbBCvASAAKAIMIgJFDQILIAAgAkEBazYCDAwBCyADIAZBCGoQTwsgBkEQaiQAC/IGAxV/Bn0DfiMAQSBrIgYkAEEBIQgCQCAAKAIIIgRBFUkNAEEAIQggACgCPA0AIAAQhAFBAXMhCCAAKAIIIQQLAn8CQCACKAIEIgsgBCALGyIORQ0AIAIoAgAgACgCACICIAsbIRMgBEEAIAgbIQwgAkEAIAgbIQ8gAygCACEUIAMoAgQhEANAIBMgCUECdGooAgAhAwJ/IAAoAhwiBUUEQCADIQpBfkEBIANBA3BBAUsbIANqIgIMAQsgACgCGCIEIANBAnRqKAIAIQogBEF+QQEgA0EDcEEBSxsgA2oiAkECdGooAgALIQ0gACgCECIEIA1BA3RqIhUpAgAhHyAEIApBA3RqIhYpAgAhIAJAIAgEQEEAIQcgCw0BIAlBAWoiByAORw0BDAMLAkAgBUUEQCAGIAQgA0EDdGopAgA3AxgMAQsgBiAEIAAoAhgiBSADQQJ0aigCAEEDdGopAgA3AxggBSACQQJ0aigCACECCyAGIAQgAkEDdGopAgAiITcDECAGIAYpAxg3AwggBiAhNwMAIAAgBkEIaiAGEIUBIAAoAlwhDCAAKAJUIQ9BACEHCyAHIAxJBEAgIKe+IhkgH6e+IhogGSAaXhshGyAZIBogGSAaXRshHCAgQiCIp74iGSAfQiCIp74iGiAZIBpeGyEdIBkgGiAZIBpdGyEeIAAoAhAhESAAKAIYIRIgACgCHCEXQX8hBANAAkAgAyAPIAdBAnRqKAIAIgJGIAIgBEZyDQBBACEEAkAgEARAA0AgAiAUIARBAnRqKAIARg0CIARBAWoiBCAQRw0ACwsgDQJ/IBdFBEAgAiEFQX5BASACQQNwQQFLGyACagwBCyASIAJBAnRqKAIAIQUgEkF+QQEgAkEDcEEBSxsgAmpBAnRqKAIACyIERiAFIA1GciAFIApGIAQgCkZycg0AIBwgESAFQQN0aiIFKQIAIh+nviIZIBEgBEEDdGoiGCkCACIgp74iGiAZIBpeG19FIBsgGSAaIBkgGl0bYEVyDQAgHiAfQiCIp74iGSAgQiCIp74iGiAZIBpeG19FIB0gGSAaIBkgGl0bYEVyDQAgAiEEIBYgFSAFIBggARCGAUUNAUEBDAYLIAIhBAsgB0EBaiIHIAxHDQALCyAJQQFqIgkgDkcNAAsLQQALIQQgBkEgaiQAIAQL0AcDCX8HfQF+IwBBMGsiAyQAAkAgACgCCCIGRQRAQ///f/8hDEP//39/IQpD//9/fyELQ///f/8hDQwBCyAAKAIcIQcgACgCECEFIAAoAhghCCAAKAIAIQlD//9/fyELQ///f/8hDUP//3//IQxD//9/fyEKA0AgCSACQQJ0aigCACIBIQQgDCAFIAcEfyAIIAFBAnRqKAIABSAEC0EDdGopAgAiEae+Ig4gDCAOXhshDCANIBFCIIinviIPIA0gD14bIRBBfkEBIAFBA3BBAUsbIAFqIQEgDCAFIAcEfyAIIAFBAnRqKAIABSABC0EDdGopAgAiEae+Ig0gDCANXhshDCAKIA4gCiAOXRsiCiANIAogDV0bIQogECARQiCIp74iDiAOIBBdGyENIAsgDyALIA9dGyILIA4gCyAOXRshCyACQQFqIgIgBkcNAAsLIAAgCjgCJCAAIAs4AiggACAMIAqTIgwgDSALkyILIAsgDF0bQYAEQSAgBiAGQSBNGyICIAJBgARPG7OVIgo4AiBBACEBAkAgCkMAAAAAXw0AIAACfyALIAqVjSILQwAAgE9dIAtDAAAAAGBxBEAgC6kMAQtBAAsiBDYCMCAAAn8gDCAKlY0iCkMAAIBPXSAKQwAAAABgcQRAIAqpDAELQQALIgI2AiwgAkECSSAEQQJJcg0AIAAgAiAEbCIBNgI8IABBNGohAiABIABBQGsoAgBLBH8gAiABEE4gACgCPAUgAQsEQCACKAIAIQJBACEBA0AgAiABQQJ0akF/NgIAIAFBAWoiASAAKAI8SQ0ACwsgAEEANgJMQQEhASAAQcQAaiEEIAZBAXQiAiAAKAJQSwRAIAQgAhBOCyAGRQ0AQQAhBwNAIAMgACgCACAHQQJ0aigCACIBNgIsIAEhAiADIAAoAhAiCCAAKAIcIgUEfyAAKAIYIAFBAnRqKAIABSACC0EDdGopAgA3AyBBfkEBIAFBA3BBAUsbIAFqIQEgAyAIIAUEfyAAKAIYIAFBAnRqKAIABSABC0EDdGopAgAiETcDGCADIAMpAyA3AwggAyARNwMAIAAgA0EIaiADEIcBQQAhBSAAKAJsBEADQCAAKAI0IAAoAmQgBUECdGooAgBBAnRqIgIoAgAiAUF/RwRAIAQoAgAhCANAIAFBAnQgCGpBBGoiAigCACIBQX9HDQALCyACIAAoAkw2AgAgBCADQSxqEE8gA0F/NgIUIAQgA0EUahBPIAVBAWoiBSAAKAJsSQ0ACwtBASEBIAdBAWoiByAGRw0ACwsgA0EwaiQAIAEL6AECA38CfiMAQTBrIgMkACAAQQA2AlwgAyABKQIAIgY3AyggAyACKQIAIgc3AyAgAyAGNwMQIAMgBzcDCCAAIANBEGogA0EIahCHASAAQdQAaiEFIAAoAmwiAgRAA0AgACgCNCAAKAJkIARBAnRqKAIAQQJ0aigCACIBQX9HBEAgACgCRCECA0AgAyACIAFBAnQiAWooAgA2AhwgBSADQRxqEE8gASAAKAJEIgJqKAIEIgFBf0cNAAsgACgCbCECCyAEQQFqIgQgAkkNAAsLIAAoAlwiAARAIAUoAgAgABBnCyADQTBqJAALtgECCn0BfwJAIAEqAgAgACoCACIGkyIHIAMqAgQgAioCBCIIkyIKlCADKgIAIAIqAgAiC5MiDCABKgIEIAAqAgQiDZMiDpSTIgmLIgUgBUMAAAAAIAVDAAAAAF4bQwAAgD+XIASUXw0AIAcgDSAIkyIFlCAOIAYgC5MiBpSTIAmVIgcgBF5FDQAgB0MAAIA/IASTIghdRQ0AIAQgDCAFlCAGIAqUkyAJlSIEXSAEIAhdcSEPCyAPC7wGAgt9Cn8jAEEQayIQJAAgAioCACIGIAEqAgAiA5MiCiAKlCACKgIEIgcgASoCBCILkyIJIAmUkpEiBUMAAAAAXgRAIAlDAACAPyAFlSIElCEIIAogBJQhBAsgACgCLCEUAn8gBiAAKgIkIgyTIAAqAiAiBpVDAAAAAJciBUMAAIBPXSAFQwAAAABgcQRAIAWpDAELQQALIRECfyADIAyTIgUgBpVDAAAAAJciA0MAAIBPXSADQwAAAABgcQRAIAOpDAELQQALIQEgFEEBayEOIAAoAjAhAgJ/IAcgACoCKCIHkyAGlUMAAAAAlyIDQwAAgE9dIANDAAAAAGBxBEAgA6kMAQtBAAshEiACQQFrIQ8gASAOIAEgDkkbIQEgDwJ/IAsgB5MiByAGlUMAAAAAlyIDQwAAgE9dIANDAAAAAGBxBEAgA6kMAQtBAAsiAkshFQJ9IApDAAAAAGAiEwRAIAWMIQUgAUEBarMMAQsgAbOMCyELIAIgDyAVGyECAn0gCUMAAAAAYARAIAeMIQcgAkEBarMMAQsgArOMCyEMIA4gEUshFiAJQwAAAABgIRdBAUF/IBMbIRUCfSAEQxe30TheRQRAQ///f38hDUP//39/IARDF7fRuF1FDQEaCyAGIBWyIgOUIASVIQ0gCyAGlCAFkiADlCAElQshAyAPIBJLIRMgESAOIBYbIQ5BAUF/IBcbIRECfSAIQxe30TheRQRAQ///f38hBUP//39/IAhDF7fRuF1FDQEaCyAGIBGyIgSUIAiVIQUgDCAGlCAHkiAElCAIlQshBCAAQQA2AmwgECACIBRsIAFqNgIMIABB5ABqIhQgEEEMahBPAkAgASAORiASIA8gExsiDyACRnENACAKQwAAAABgIRIDQAJAIAMgBF0EQCABIBVqIQEgDSADkiEDDAELIAIgEWohAiAFIASSIQQLIAEgACgCLCITTw0BIAEgDksgEnEgEkF/cyABIA5JcSACIAAoAjBPcnINASAJQwAAAABgRSIWIAIgD0lxIBYgAiAPTXJFcg0BIBAgAiATbCABajYCCCAUIBBBCGoQTyABIA5HIAIgD0dyDQALCyAQQRBqJAALaQEDfwJAIAEoAggiAkUNACAAIAAoAggiAyACaiICNgIIIAIgACgCDCIESwRAIAAgAkECdkEAIAQbIAJqEE4LIAAoAgAiAkUNACACIAAoAgQgA2xqIAEoAgAgASgCBCABKAIIbBCuARoLC5UCAgZ/AX0jAEEwayIDJAAgASgCNCEEIAEoAmQhBiABKAKoASEFIAEoAiwhByABKAJcIQggAkEANgIIAkACQAJAIAVFDQAgAigCDCAFTw0AIAIgBRBOIAJBADYCPCACIAQ2AhwgAiAHNgIYIAIgBjYCFCACIAg2AhAMAQsgAiAHNgIYIAIgCDYCECACQQA2AjwgAiAENgIcIAIgBjYCFCAFRQ0BC0EAIQQDQCADIAEoAqABIARBAnRqKAIANgIsIAIgA0EsahBPIARBAWoiBCAFRw0ACwsgASoCACEJIANCADcDGCADQgA3AyAgA0IANwMQIANCADcDCCAAIAIgCSADQRBqIANBCGoQgwE6AAAgA0EwaiQAC9cCAgd/An0jAEEgayICJAAgAEEANgIMIABCADcCBCABKAI0IQUgAkEANgIcIAVBA08EQCAFQQNuIQUDQCAEQQNsIQYgASgCXCEHIAEoAiwhCEEAIQMDQCACIANBA3RqIAcgCCADIAZqQQJ0aigCAEEDdGopAgA3AwAgA0EBaiIDQQNHDQALIAAgACgCBEEBajYCBAJAIAIqAgwgAioCBCIJkyACKgIQIAIqAgAiCpOUIAIqAgggCpMgAioCFCAJk5STQwAAAD+UIgmLQwAAADRfBEAgACAAKAIMQQFqNgIMDAELIAlDAAAAAF1FDQAgACAAKAIIQQFqNgIICyACIARBAWoiBDYCHCAEIAVJDQALIAAoAgwhBiAAKAIIIQQgACgCBCEDCwJAIAMgBCAGakYEQCAAQQA2AggMAQsgBCADQQF2TQ0AIAAgAyAEazYCCAsgAkEgaiQAC8EIAQd/AkACQAJAAkACQAJAIAEOAgABAgsCfyAAKAJEQQN0IgFFBEBBACEBQQAMAQtBACABQZTPACgCABEAACEBIAAoAkRBA3QLIQMgACABNgIAIAFBACADELABGgJAIAAoAkAgACgCRGxBA3QiAUUEQEEAIQMMAQtBACABQZTPACgCABEAACEDIAAoAkAgACgCRGxBA3QhAgsgACADNgIEQQAhASADQQAgAhCwARogACgCRCIDRQRAIAAoAkAhAgwFCyAAKAIAIQQgACgCQCECIAAoAgQhBQNAIAQgAUEDdGoiBkEINgIEIAYgBSABIAJsQQN0ajYCACABQQFqIgEgA0cNAAsMBAsgACgCFA0BIAAoAkBFBEAMAwsgACgCDCEEIAAoAgghBUEAIQEDQCAEIAFBAnRqIQMCQCABIAVqLQAARQRAIAMgAjYCACACQQFqIQIMAQsgA0F/NgIACyABQQFqIgEgACgCQEkNAAsMAgsgAEEANgIsIABBADYCIAsPCyAAIAI2AhAgAC0AUEUEQCAAIAJBBWw2AkwLIABBAEEwQZTPACgCABEAACIBNgIUIAFBAEEwELABGiAAKAIUIgFBxgA2AhAgAUHHADYCDCABQYEgNgIIIAEgAjYCBCABIAI2AgBBACEDIAJBDGwiBARAQQAgBEGUzwAoAgARAAAhAwsgASADNgIcIANBACAEELABGiACBEAgASgCHEEAIAQQsAEaC0EAIQUgAUEANgIgIAFCADcCKCABIAI2AhggASACNgIUAn8gAkEDdCIERQRAQQAhAkEADAELQQAgBEGUzwAoAgARAAAhAiABKAIUQQN0CyEDIAEgAjYCJCACQQAgAxCwARoCQCAEIAAoAkRsIgFFBEBBACEBDAELQQAgAUGUzwAoAgARAAAhASAEIAAoAkRsIQULIAAgATYCOCABQQAgBRCwARoCfyAEIAAoAkRsIgFFBEBBACEBQQAMAQtBACABQZTPACgCABEAACEBIAQgACgCRGwLIQMgACABNgI8IAFBACADELABGiAAKAJEIgQEQCAAKAIQIQUgACgCQCECQQAhAwNAIAIEQCADIAVsIQYgACgCCCEHQQAhAQNAIAEgB2otAABFBEAgACgCOCAAKAIMIAFBAnRqKAIAIAZqQQN0aiAAKAIAIANBA3RqIggoAgAgCCgCBCABbGorAwA5AwALIAFBAWoiASACRw0ACwsgA0EBaiIDIARHDQALCyAAQgA3AiAgAEEANgJIIABCADcCKCAAQgA3AjAPC0EAIQMCfyACRQRAQQAhAUEADAELQQAgAkGUzwAoAgARAAAhASAAKAJACyECIAAgATYCCCABQQAgAhCwARoCQCAAKAJAQQJ0IgFFBEBBACEBDAELQQAgAUGUzwAoAgARAAAhASAAKAJAQQJ0IQMLIAAgATYCDCABQQAgAxCwARoLnQEBBn0gACoCCCABKgIIIgSTIgMgAioCCCAEkyIElCAAKgIAIAEqAgAiBZMiByACKgIAIAWTIgWUIAAqAgQgASoCBCIGkyIIIAIqAgQgBpMiBpSSkiADIAOUIAcgB5QgCCAIlJKSkSAEIASUIAUgBZQgBiAGlJKSkZSVIgNDAACAvyADQwAAgL9eGyIDQwAAgD8gA0MAAIA/XRsQpgELNQAgACgCCCABai0AAARAIABBLGogASACEJoBDwsgAEEgaiAAKAIMIAFBAnRqKAIAIAIQmgELqgUCDH8BfAJAAkACQCABQQFrDgIAAQILIABCADcCIAJAIAAoAigiAUUNAEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsgAEIANwIoIABBADYCMAJAIAAoAjQiAUUNAEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsgAEEANgI0DwsgACgCECELIAAoAiwhCSAAKAI8IQwgACgCICIIBEAgACgCFCEGA0BBACEFA0AgACgCKCIBIARBBHRqIgIrAwggASAFQQR0aiIDKwMIoiEOIAIoAgAiASADKAIAIgdGBEAgBigCJCABQQN0aiICIA4gAisDAKA5AwALAkACQCAGKAIcIAFBDGxqIgIoAgAiAwRAIAIoAgghDUEAIQEDQCANIAFBBHRqIgooAgAgB0YNAiABQQFqIgEgA0cNAAsLIAIoAgQgA0YEQCACEJsBIAIoAgAhAwsgAigCCCADQQR0aiIBIA45AwggASAHNgIAIAIgA0EBajYCAAwBCyAKIA4gCisDCKA5AwgLIAVBAWoiBSAIRw0ACyAEQQFqIgQgCEcNAAsLIAAoAkQiAwRAQQAhAgNAAkAgCUUEQEQAAAAAAAAAACEODAELIAAoAgAgAkEDdGoiASgCBCEEIAEoAgAhBSAAKAI0IQZBACEBRAAAAAAAAAAAIQ4DQCAGIAFBBHRqIgcrAwggBSAEIAcoAgBsaisDAKIgDqAhDiABQQFqIgEgCUcNAAsLIAgEQCACIAtsIQQgACgCKCEFQQAhAQNAIAwgBSABQQR0aiIGKAIAIARqQQN0aiIHIAcrAwAgBisDCCAOoqE5AwAgAUEBaiIBIAhHDQALCyACQQFqIgIgA0cNAAsLIAAgACgCSEEBajYCSAsLRgEDfyAAKAIEIgQEQCAAKAIUIQVBACEAA0AgAiAAQQN0IgNqIAEgA2orAwAgAyAFaisDAKI5AwAgAEEBaiIAIARHDQALCws8AQJ/AkAgACgCFCIBRQ0AQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCyAAQQA2AhQL2QECC38BfCAAKAIgIghBAEoEQCAAKAIkIgkoAgAhAwNAIAkgBUEBaiIFQQJ0aigCACIGIANLBEAgACgCGCIKIANBAnRqKAIAIQQDQEQAAAAAAAAAACEOIAogA0EBaiILQQJ0aigCACIHIARLBEAgACgCHCEMIAAoAhQhDQNAIA0gBEEDdGorAwAgASAMIARBAnRqKAIAQQN0aisDAKIgDqAhDiAEQQFqIgQgB0cNAAsLIAIgA0EDdGogDjkDACAHIQQgCyIDIAZHDQALCyAGIQMgBSAIRw0ACwsL6wEBAn8CQCAAKAIUIgFFDQBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLIABBADYCFAJAIAAoAhgiAUUNAEGYzwAoAgAiAgRAIAEgAhEBAAwBCyABQQBBlM8AKAIAEQAAGgsgAEEANgIYAkAgACgCHCIBRQ0AQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCyAAQQA2AhwCQCAAKAIkIgFFDQBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLIABCADcCACAAQgA3AiALDQAgASgCACAAKAIASQtNAQN/IAAgACgCJCIBKAJEIgI2AoABIABB+ABqIQMgAiAAKAKEAUsEQCADIAIQTiAAKAIkIQELIAMoAgAgASgCXCABKAJEQQN0EK4BGgvEAgIEfwl9IwBBEGsiBCQAIAQgACgCACABEHQgBCoCBCIKIAAoAgAiAygCPCIFIAMoAiwgAUEDbCIGQQJ0aiIDKAIEQQxsaiIBKgIAIAUgAygCAEEMbGoiAyoCAJMiB0MAAIA/IAEqAgggAyoCCJMiCSAJlCAHIAeUIAEqAgQgAyoCBJMiByAHlJKSkZUiCJQiDJQgBCoCACILIAcgCJQiB5STIQ0gCyAJIAiUIgmUIAQqAggiCCAMlJMhCyAIIAeUIAogCZSTIQhBACEBA0AgAiABQQN0aiIFIA0gACgCACIDKAI8IAMoAiwgASAGakECdGooAgBBDGxqIgMqAggiCpQgCCADKgIAIg6UIAsgAyoCBCIPlJKSOAIEIAUgCSAKlCAMIA6UIAcgD5SSkjgCACABQQFqIgFBA0cNAAsgBEEQaiQAC6AQAxN/B30DfiMAQRBrIggkACAIIAE2AgwgAEHIAGogCEEMahBPIAAoAlwgCCgCDCIBQQN2Qfz///8BcWoiAiACKAIAQQEgAXRyNgIAIAAoAhggCCgCDCIBQQN2Qfz///8BcWoiAiACKAIAQQEgAXRyNgIAIAAoAgAhESAIKAIMQQNsIhIhCQNAIBEoArABIAlBAnRqKAIAIgZBA24hAQJAIAZBf0YiAg0AQX8gASACGyIDQQV2QQJ0IgcgACgCGGooAgBBASADdCINcQ0AIAAoAjggA0ECdGooAgANACADQQNsIQQgESgCLCIBIAxBAWpBA3AgEmpBAnRqIQogASAMIBJqQQJ0aigCACELIAAoAgAoAiwhBUEAIQECfQNAAkAgBSABIARqQQJ0aigCACICIAtGDQAgAiAKKAIAIg5GDQAgACgCBCIEIAtBA3RqKQIAIhynviAEIAUgCCgCDEEDbCABakECdGooAgBBA3RqKQIAIh2nviIYkyAEIA5BA3RqKQIAIh5CIIinviAdQiCIp74iFZOUIB6nviAYkyAcQiCIp74gFZOUkwwCCyABQQFqIgFBA0cNAAtBfyECQwAAAAALIRggACgCcCACQQN2Qfz///8BcWooAgAgAnZBAXENACAAKAKEASAHaigCACANcQ0AIAIhCyMAQTBrIgUkACAAIAMgBUEQahCVASADQQNsIQcgACgCACIUKAIsIgIgBkECdGohCiACIAlBAnRqKAIAIQ4gAkF+QQEgBkEDcEEBSxsgBmpBAnRqKAIAIQ8gAkF+QQEgCUEDcEEBSxsgCWpBAnRqKAIAIRNBACEBQX8hBkF/IQRBfyENA0ACQCAPIAIgASAHakECdGooAgAiEEYEQCABIQYMAQsgASAEIBAgCigCAEYiEBshBCANIAEgEBshDQsgAUEBaiIBQQNHDQALAkAgACgCBCIBIBNBA3RqIg8qAgAgASAOQQN0aiIHKgIAkyIVIBWUIA8qAgQgByoCBJMiFiAWlJKRIhlDAAAAAF8NACAFQRBqIgEgBEEDdGoiAioCACAGQQN0IAFqIgQqAgCTIhogGpQgAioCBCAEKgIEkyIXIBeUkpEiG0MAAAAAXw0AIARBBHIhCiAZIBuVIRlBACECA0AgBUEQaiACQQN0aiIBIBkgASoCAJQ4AgAgASAZIAEqAgSUOAIEIAJBAWoiAkEDRw0ACyAHKgIEIAoqAgCTIRkgByoCACAEKgIAkyEbQQAhAgNAIAVBEGogAkEDdGoiASAbIAEqAgCSOAIAIAEgGSABKgIEkjgCBCACQQFqIgJBA0cNAAtBACEBIBYgFRCoASAXIBoQqAGTIhYQvAEhFSAWEK0BIRYDQCABIAZHBEAgBUEQaiABQQN0aiICIAIqAgAgBCoCAJMiGjgCACACIAIqAgQgCioCAJMiFzgCBCACIAQqAgAgGiAWlCAVIBeUk5I4AgAgAiAXIBaUIBUgGpSSIAoqAgCSOAIECyABQQFqIgFBA0cNAAsCQCAFQRBqIA1BA3RqIgIqAgAiFSAVWwRAIAIqAgQiFSAVWw0BCyAAKAKEASADQQN2Qfz///8BcWoiASABKAIAQQEgA3RyNgIADAELIBhDAAAAAF0gBykCACIcp74gAikDACIdp74iFZMgDykCACIeQiCIp74gHUIgiKe+IhaTlCAep74gFZMgHEIgiKe+IBaTlJMiFUMAAAAAXXFFIBhDAAAAAF5FIBVDAAAAAF5FcnFFBEAgACgChAEgA0EDdkH8////AXFqIgEgASgCAEEBIAN0cjYCAAwBCwJAIAUpAxgiHEIgiKe+IAUpAxAiHUIgiKe+IhWTIAUpAyAiHqe+IB2nviIWk5QgHKe+IBaTIB5CIIinviAVk5STQwAAAD+UIhWLIhZDAAAANF9FBEACfSAWIBUgFUMAAAAAXRsiFSAUKAI8IgEgE0EMbGoiBioCACABIA5BDGxqIgQqAgAiFpMiGiABIAtBDGxqIgEqAgQgBCoCBCIXkyIZlCABKgIAIBaTIhYgBioCBCAXkyIXlJMiGyAblCAXIAEqAgggBCoCCCIXkyIblCAZIAYqAgggF5MiF5STIhkgGZQgFyAWlCAbIBqUkyIWIBaUkpKRQwAAAD+UIhZfBEAgFSAWlQwBCyAWIBWVCyIVQ///f39gRQ0BCyAAKAKEASADQQN2Qfz///8BcWoiASABKAIAQQEgA3RyNgIADAELIBVDAACAv5KLIhVDAAAAP14EQCAAKAKEASADQQN2Qfz///8BcWoiASABKAIAQQEgA3RyNgIADAELQQAhBiAFQQBBKEGUzwAoAgARAAAiATYCDCABIAs2AgQgASADNgIAIAEgAikDADcCECABIBU4AhwgAUIANwIIIAEgGDgCJCABIAk2AiAgASAVOAIYIABBKGogBUEMahBPIAAoAjggA0ECdGogBSgCDDYCAAJAIAAoAjBBAWsiA0UEQCAFKAIMIQIMAQsgBSgCDCICKAIEIQsgACgCKCEEA0AgCyAEIAZBAnRqKAIAIgEoAgRHBEAgBkEBaiIGIANHDQEMAgsLA0AgASIDKAIMIgENAAsgAkEANgIMIAIgAzYCCCADIAI2AgwLA0AgAiIBKAIIIgINAAtDAAAAACEYIAEhAgNAIBggAioCGCIVIBUgGF0bIRggAigCDCICDQALA0AgASAYOAIcIAEoAgwiAQ0ACwsgBUEwaiQACyAJIAxBA0kiAWohCSABIAxqIgxBA0cNAAsgCEEQaiQAC5oBAQV/IAEEQCAAQShqIQMDQCABKAIMIQQgACgCOCABKAIAQQJ0akEANgIAAkAgACgCMCIFRQ0AIAMoAgAhBkEAIQIDQCABIAYgAkECdGooAgBGBEAgAyACEFMMAgsgAkEBaiICIAVHDQALCwJAQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCyAEIgENAAsLC5gBAgd/AXwgACgCACIEQQBKBEAgACgCHCEFA0AgAiADQQN0aiIGQgA3AwAgBSADQQxsaiIAKAIAIgdBAEoEQCAAKAIIIQhBACEARAAAAAAAAAAAIQoDQCAGIAggAEEEdGoiCSsDCCABIAkoAgBBA3RqKwMAoiAKoCIKOQMAIABBAWoiACAHRw0ACwsgA0EBaiIDIARHDQALCwvfAQEEfyAAKAIABEADQAJAIAAoAhwgAUEMbGoiAigCCCIDRQ0AQZjPACgCACIEBEAgAyAEEQEADAELIANBAEGUzwAoAgARAAAaCyACQQA2AgggAkEANgIAIAJBADYCBCABQQFqIgEgACgCAEkNAAsLAkAgACgCHCIBRQ0AQZjPACgCACICBEAgASACEQEADAELIAFBAEGUzwAoAgARAAAaCyAAQQA2AhwCQCAAKAIkIgFFDQBBmM8AKAIAIgIEQCABIAIRAQAMAQsgAUEAQZTPACgCABEAABoLIABBADYCJAtDAQJ/IAAoAgAiAyAAKAIERgRAIAAQmwEgACgCACEDCyAAKAIIIANBBHRqIgQgAjkDCCAEIAE2AgAgACADQQFqNgIAC5QBAQJ/IAAoAgQiAgRAIAAgAkEBdDYCBCAAKAIIIQEgAAJ/IAJBBXQiAEUEQEEAIAFFDQEaCwJAIAANAEGYzwAoAgAiAkUNACABIAIRAQBBAAwBCyABIABBlM8AKAIAEQAACzYCCA8LIABBBDYCBCAAQQBBwABBlM8AKAIAEQAAIgE2AgggAUEAIAAoAgRBBHQQsAEaC98BAQR/AkBBASACdCIEIAJBBXZBAnQiBSAAKAI8aigCAHENACAAKAIAIgAoAiQgBWooAgAgBHENAAJAIAAoAjxFDQAgACgCbCABTQ0AIAAoAjQgAkECdGooAgAgACgCZCABQQJ0aigCACgCIEcNAQsgACgCdCIEIAAoAkQiBSACQQNsIgJBAnRqKAIAQQJ0aigCACIAQX9HIAAgAUdxDQADQCADIgBBAWoiA0EDRwRAIAQgBSACIANqQQJ0aigCAEECdGooAgAiBkF/RiABIAZGcg0BCwsgAEEBSyEDCyADC68BAQR/IwBBEGsiAyQAIAMgAjYCDCAAKAIAKAJkIAFBAnRqKAIAIQQgACgCPCACQQN2Qfz///8BcWoiBSAFKAIAQQEgAnRyNgIAIAQgA0EMahBPIARBEGohBEEAIQIDQCADIAAoAgAiBSgCRCADKAIMQQNsIAJqQQJ0aigCACIGNgIIIAUoAnQgBkECdGogATYCACAEIANBCGoQTyACQQFqIgJBA0cNAAsgA0EQaiQAC4ABAQJ/IAFBADYCCAJAIAEoAgAiAkUNAEGYzwAoAgAiAwRAIAIgAxEBAAwBCyACQQBBlM8AKAIAEQAAGgsgAUEANgIAIAFCADcCCCABIAAoAgA2AgAgASAAKAIENgIEIAEgACgCCDYCCCABIAAoAgw2AgwgAEIANwIIIABCADcCAAu0AgIIfwZ9IABBgAFqIgMgACgCjAEiBUECdGooAgAhBiAAIAVBAXMiBTYCjAEgAyAFQQJ0aigCACEHIAYgACgCiAFBA3RqIAYpAgA3AgACQCAAKAKIAUUEQAwBCyABIAYqAgCTIgsgApRDAAAAAGAhBUEAIQMDQCABIAYgA0EBaiIKQQN0aiIIKgIAkyINIAKUQwAAAABgIQkgBQRAIAcgBEEDdGogBiADQQN0aikCADcCACAEQQFqIQQLIAUgCWpBAUYEQCAGIANBA3RqIgMqAgAhDiADKgIEIQwgCCoCBCEPIAgqAgAhECAHIARBA3RqIgMgATgCACADIAwgCyAPIAyTIBAgDpOVlJI4AgQgBEEBaiEECyANIQsgCSEFIAoiAyAAKAKIAUkNAAsLIAAgBDYCiAELtAICCH8GfSAAQYABaiIDIAAoAowBIgVBAnRqKAIAIQYgACAFQQFzIgU2AowBIAMgBUECdGooAgAhByAGIAAoAogBQQN0aiAGKQIANwIAAkAgACgCiAFFBEAMAQsgASAGKgIEkyILIAKUQwAAAABgIQVBACEDA0AgASAGIANBAWoiCkEDdGoiCCoCBJMiDSAClEMAAAAAYCEJIAUEQCAHIARBA3RqIAYgA0EDdGopAgA3AgAgBEEBaiEECyAFIAlqQQFGBEAgBiADQQN0aiIDKgIAIQwgAyoCBCEOIAgqAgAhDyAIKgIEIRAgByAEQQN0aiIDIAE4AgQgAyAMIAsgDyAMkyAQIA6TlZSSOAIAIARBAWohBAsgDSELIAkhBSAKIgMgACgCiAFJDQALCyAAIAQ2AogBC+cBAQ1/QQEhBQJAIAEoAgQiBkUNACABKAIAIQggASgCDCEJIAEoAgghCiAAKAIMIQsgACgCCCEMIAAoAgAhDSAAKAIEIQ5BACEFQQAhAANAAkAgACADaiIBIA5PDQAgACAKbCEPIAEgDGwhEEEAIQEDQCABIAJqIgQgDU8NASAJIA8gAUEGdmpBA3RqKQMAIAFBP3EiB62IIAsgECAEQQZ2akEDdGopAwAgBEE/cSIErYiDQgBSDQMgASAEIAcgBCAHSxtrQUBrIgEgCEkNAAsLIABBAWoiACAGTyEFIAAgBkcNAAsLIAULcQIBfwF+IAFFBEBBAA8LIAAgACgCAEHNmwRsQbngAGoiAjYCACAAIAA1AgwgADUCCEKtvZnNAn58IgM3AgggACAAKAIEIgBBDXQgAHMiAEERdiAAcyIAQQV0IABzIgA2AgQgA6cgACACamogAUEBanALhwEBA38CQCAAKAIEIgIiAEEDcQRAA0AgAC0AAEUNAiAAQQFqIgBBA3ENAAsLA0AgACIBQQRqIQAgASgCACIDQX9zIANBgYKECGtxQYCBgoR4cUUNAAsDQCABIgBBAWohASAALQAADQALCyAAIAJrQQFqIgAQ0QEiAQR/IAEgAiAAEK4BBUEACwskAQF/QfDRACgCACIABEADQCAAKAIAEQYAIAAoAgQiAA0ACwsL4AMAQcTMAEGbDxAFQdDMAEGaDUEBQQFBABAGQdzMAEGuDEEBQYB/Qf8AEAdB9MwAQacMQQFBgH9B/wAQB0HozABBpQxBAUEAQf8BEAdBgM0AQa4IQQJBgIB+Qf//ARAHQYzNAEGlCEECQQBB//8DEAdBmM0AQYAJQQRBgICAgHhB/////wcQB0GkzQBB9whBBEEAQX8QB0GwzQBBgA5BBEGAgICAeEH/////BxAHQbzNAEH3DUEEQQBBfxAHQcjNAEG6CkKAgICAgICAgIB/Qv///////////wAQ8QFB1M0AQbkKQgBCfxDxAUHgzQBBswpBBBAIQezNAEH9DkEIEAhBoCpBkg4QCUHoKkGoExAJQbArQQRBhQ4QCkH8K0ECQZ4OEApByCxBBEGtDhAKQeQsQZ8NEAtBjC1BAEHjEhAMQbQtQQBByRMQDEHcLUEBQYETEAxBhC5BAkHzDxAMQawuQQNBkhAQDEHULkEEQboQEAxB/C5BBUHXEBAMQaQvQQRB7hMQDEHML0EFQYwUEAxBtC1BAEG9ERAMQdwtQQFBnBEQDEGELkECQf8REAxBrC5BA0HdERAMQdQuQQRBwhIQDEH8LkEFQaASEAxB9C9BBkH9EBAMQZwwQQdBsxQQDAvwAQIBfQJ/IAC8IgNB/////wdxIgJBgICA/ANPBEAgAkGAgID8A0YEQEMAAAAAQ9oPSUAgA0EAThsPC0MAAAAAIAAgAJOVDwsCfSACQf////cDTQRAQ9oPyT8gAkGBgICUA0kNARpDaCGiMyAAIAAgAJQQpwGUkyAAk0PaD8k/kg8LIANBAEgEQEPaD8k/IABDAACAP5JDAAAAP5QiAJEiASABIAAQpwGUQ2ghorOSkpMiACAAkg8LQwAAgD8gAJNDAAAAP5QiAJEiASAAEKcBlCAAIAG8QYBgcb4iACAAlJMgASAAkpWSIACSIgAgAJILCysAIAAgAENr0w28lEO6Ey+9kpRDdaoqPpIgAJQgAEOu5TS/lEMAAIA/kpUL1QIBBH8gALxB/////wdxQYGAgPwHSSABvEH/////B3FBgICA/AdNcUUEQCAAIAGSDwsgAbwiAkGAgID8A0YEQCAAEKkBDwsgAkEedkECcSIFIAC8IgNBH3ZyIQQCQAJAIANB/////wdxIgNFBEACQAJAIARBAmsOAgABAwtD2w9JQA8LQ9sPScAPCyACQf////8HcSICQYCAgPwHRwRAIAJFBEBD2w/JPyAAmA8LIANBgICA/AdHIAJBgICA6ABqIANPcUUEQEPbD8k/IACYDwsCfSAFBEBDAAAAACADQYCAgOgAaiACSQ0BGgsgACABlYsQqQELIQACQAJAAkAgBA4DBAABAgsgAIwPC0PbD0lAIABDLr27M5KTDwsgAEMuvbszkkPbD0nAkg8LIANBgICA/AdGDQEgBEECdEG0MGoqAgAhAAsgAA8LIARBAnRBpDBqKgIAC+YCAgN/A30gALwiAkH/////B3EiAUGAgIDkBE8EQCAAQ9oPyT8gAJggALxB/////wdxQYCAgPwHSxsPCwJAAn8gAUH////2A00EQEF/IAFBgICAzANPDQEaDAILIACLIQAgAUH//9/8A00EQCABQf//v/kDTQRAIAAgAJJDAACAv5IgAEMAAABAkpUhAEEADAILIABDAACAv5IgAEMAAIA/kpUhAEEBDAELIAFB///vgARNBEAgAEMAAMC/kiAAQwAAwD+UQwAAgD+SlSEAQQIMAQtDAACAvyAAlSEAQQMLIQMgACAAlCIFIAWUIgQgBENHEtq9lEOYyky+kpQhBiAFIAQgBEMlrHw9lEMN9RE+kpRDqaqqPpKUIQQgAUH////2A00EQCAAIAAgBiAEkpSTDwsgA0ECdCIBQdAwaioCACAAIAYgBJKUIAFB4DBqKgIAkyAAk5MiAIwgACACQQBIGyEACyAAC08BAXwgACAAoiIAIAAgAKIiAaIgAERpUO7gQpP5PqJEJx4P6IfAVr+goiABREI6BeFTVaU/oiAARIFeDP3//9+/okQAAAAAAADwP6CgoLYLSwECfCAAIACiIgEgAKIiAiABIAGioiABRKdGO4yHzcY+okR058ri+QAqv6CiIAIgAUSy+26JEBGBP6JEd6zLVFVVxb+goiAAoKC2C5IQAhR/A3wjAEEQayILJAACQCAAvCIRQf////8HcSIDQdqfpO4ETQRAIAEgALsiFyAXRIPIyW0wX+Q/okQAAAAAAAA4Q6BEAAAAAAAAOMOgIhZEAAAAUPsh+b+ioCAWRGNiGmG0EFG+oqAiGDkDACAYRAAAAGD7Iem/YyECAn8gFplEAAAAAAAA4EFjBEAgFqoMAQtBgICAgHgLIQMgAgRAIAEgFyAWRAAAAAAAAPC/oCIWRAAAAFD7Ifm/oqAgFkRjYhphtBBRvqKgOQMAIANBAWshAwwCCyAYRAAAAGD7Iek/ZEUNASABIBcgFkQAAAAAAADwP6AiFkQAAABQ+yH5v6KgIBZEY2IaYbQQUb6ioDkDACADQQFqIQMMAQsgA0GAgID8B08EQCABIAAgAJO7OQMAQQAhAwwBCyALIAMgA0EXdkGWAWsiA0EXdGu+uzkDCCALQQhqIQ4jAEGwBGsiBSQAIAMgA0EDa0EYbSICQQAgAkEAShsiDUFobGohBkHwMCgCACIIQQBOBEAgCEEBaiEDIA0hAgNAIAVBwAJqIARBA3RqIAJBAEgEfEQAAAAAAAAAAAUgAkECdEGAMWooAgC3CzkDACACQQFqIQIgBEEBaiIEIANHDQALCyAGQRhrIQlBACEDIAhBACAIQQBKGyEEA0BBACECRAAAAAAAAAAAIRYDQCAOIAJBA3RqKwMAIAVBwAJqIAMgAmtBA3RqKwMAoiAWoCEWIAJBAWoiAkEBRw0ACyAFIANBA3RqIBY5AwAgAyAERiECIANBAWohAyACRQ0AC0EvIAZrIRJBMCAGayEPIAZBGWshEyAIIQMCQANAIAUgA0EDdGorAwAhFkEAIQIgAyEEIANBAEwiB0UEQANAIAVB4ANqIAJBAnRqAn8CfyAWRAAAAAAAAHA+oiIXmUQAAAAAAADgQWMEQCAXqgwBC0GAgICAeAu3IhdEAAAAAAAAcMGiIBagIhaZRAAAAAAAAOBBYwRAIBaqDAELQYCAgIB4CzYCACAFIARBAWsiBEEDdGorAwAgF6AhFiACQQFqIgIgA0cNAAsLAn8gFiAJELsBIhYgFkQAAAAAAADAP6KcRAAAAAAAACDAoqAiFplEAAAAAAAA4EFjBEAgFqoMAQtBgICAgHgLIQogFiAKt6EhFgJAAkACQAJ/IAlBAEwiFEUEQCADQQJ0IAVqIgIgAigC3AMiAiACIA91IgIgD3RrIgQ2AtwDIAIgCmohCiAEIBJ1DAELIAkNASADQQJ0IAVqKALcA0EXdQsiDEEATA0CDAELQQIhDCAWRAAAAAAAAOA/Zg0AQQAhDAwBC0EAIQJBACEEIAdFBEADQCAFQeADaiACQQJ0aiIVKAIAIRBB////ByEHAn8CQCAEDQBBgICACCEHIBANAEEADAELIBUgByAQazYCAEEBCyEEIAJBAWoiAiADRw0ACwsCQCAUDQBB////AyECAkACQCATDgIBAAILQf///wEhAgsgA0ECdCAFaiIHIAcoAtwDIAJxNgLcAwsgCkEBaiEKIAxBAkcNAEQAAAAAAADwPyAWoSEWQQIhDCAERQ0AIBZEAAAAAAAA8D8gCRC7AaEhFgsgFkQAAAAAAAAAAGEEQEEAIQQgAyECAkAgAyAITA0AA0AgBUHgA2ogAkEBayICQQJ0aigCACAEciEEIAIgCEoNAAsgBEUNACAJIQYDQCAGQRhrIQYgBUHgA2ogA0EBayIDQQJ0aigCAEUNAAsMAwtBASECA0AgAiIEQQFqIQIgBUHgA2ogCCAEa0ECdGooAgBFDQALIAMgBGohBANAIAVBwAJqIANBAWoiA0EDdGogAyANakECdEGAMWooAgC3OQMAQQAhAkQAAAAAAAAAACEWA0AgDiACQQN0aisDACAFQcACaiADIAJrQQN0aisDAKIgFqAhFiACQQFqIgJBAUcNAAsgBSADQQN0aiAWOQMAIAMgBEgNAAsgBCEDDAELCwJAIBZBGCAGaxC7ASIWRAAAAAAAAHBBZgRAIAVB4ANqIANBAnRqAn8CfyAWRAAAAAAAAHA+oiIXmUQAAAAAAADgQWMEQCAXqgwBC0GAgICAeAsiArdEAAAAAAAAcMGiIBagIhaZRAAAAAAAAOBBYwRAIBaqDAELQYCAgIB4CzYCACADQQFqIQMMAQsCfyAWmUQAAAAAAADgQWMEQCAWqgwBC0GAgICAeAshAiAJIQYLIAVB4ANqIANBAnRqIAI2AgALRAAAAAAAAPA/IAYQuwEhFgJAIANBAEgNACADIQIDQCAFIAIiBEEDdGogFiAFQeADaiACQQJ0aigCALeiOQMAIAJBAWshAiAWRAAAAAAAAHA+oiEWIAQNAAtBACEHIANBAEgNACAIQQAgCEEAShshBiADIQQDQCAGIAcgBiAHSRshCSADIARrIQhBACECRAAAAAAAAAAAIRYDQCACQQN0QdDGAGorAwAgBSACIARqQQN0aisDAKIgFqAhFiACIAlHIQ0gAkEBaiECIA0NAAsgBUGgAWogCEEDdGogFjkDACAEQQFrIQQgAyAHRyECIAdBAWohByACDQALC0QAAAAAAAAAACEWIANBAE4EQANAIAMiAkEBayEDIBYgBUGgAWogAkEDdGorAwCgIRYgAg0ACwsgCyAWmiAWIAwbOQMAIAVBsARqJAAgCkEHcSEDIAsrAwAhFiARQQBIBEAgASAWmjkDAEEAIANrIQMMAQsgASAWOQMACyALQRBqJAAgAwv0AgIDfwF8IwBBEGsiASQAAn0gALwiA0H/////B3EiAkHan6T6A00EQEMAAIA/IAJBgICAzANJDQEaIAC7EKoBDAELIAJB0aftgwRNBEAgAkHkl9uABE8EQEQYLURU+yEJQEQYLURU+yEJwCADQQBIGyAAu6AQqgGMDAILIAC7IQQgA0EASARAIAREGC1EVPsh+T+gEKsBDAILRBgtRFT7Ifk/IAShEKsBDAELIAJB1eOIhwRNBEAgAkHg27+FBE8EQEQYLURU+yEZQEQYLURU+yEZwCADQQBIGyAAu6AQqgEMAgsgA0EASARARNIhM3982RLAIAC7oRCrAQwCCyAAu0TSITN/fNkSwKAQqwEMAQsgACAAkyACQYCAgPwHTw0AGgJAAkACQAJAIAAgAUEIahCsAUEDcQ4DAAECAwsgASsDCBCqAQwDCyABKwMImhCrAQwCCyABKwMIEKoBjAwBCyABKwMIEKsBCyEAIAFBEGokACAAC4AEAQN/IAJBgARPBEAgACABIAIQDSAADwsgACACaiEDAkAgACABc0EDcUUEQAJAIABBA3FFBEAgACECDAELIAJFBEAgACECDAELIAAhAgNAIAIgAS0AADoAACABQQFqIQEgAkEBaiICQQNxRQ0BIAIgA0kNAAsLAkAgA0F8cSIEQcAASQ0AIAIgBEFAaiIFSw0AA0AgAiABKAIANgIAIAIgASgCBDYCBCACIAEoAgg2AgggAiABKAIMNgIMIAIgASgCEDYCECACIAEoAhQ2AhQgAiABKAIYNgIYIAIgASgCHDYCHCACIAEoAiA2AiAgAiABKAIkNgIkIAIgASgCKDYCKCACIAEoAiw2AiwgAiABKAIwNgIwIAIgASgCNDYCNCACIAEoAjg2AjggAiABKAI8NgI8IAFBQGshASACQUBrIgIgBU0NAAsLIAIgBE8NAQNAIAIgASgCADYCACABQQRqIQEgAkEEaiICIARJDQALDAELIANBBEkEQCAAIQIMAQsgACADQQRrIgRLBEAgACECDAELIAAhAgNAIAIgAS0AADoAACACIAEtAAE6AAEgAiABLQACOgACIAIgAS0AAzoAAyABQQRqIQEgAkEEaiICIARNDQALCyACIANJBEADQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADRw0ACwsgAAvWAgECfwJAIAAgAUYNACABIAAgAmoiBGtBACACQQF0a00EQCAAIAEgAhCuARoPCyAAIAFzQQNxIQMCQAJAIAAgAUkEQCADDQIgAEEDcUUNAQNAIAJFDQQgACABLQAAOgAAIAFBAWohASACQQFrIQIgAEEBaiIAQQNxDQALDAELAkAgAw0AIARBA3EEQANAIAJFDQUgACACQQFrIgJqIgMgASACai0AADoAACADQQNxDQALCyACQQNNDQADQCAAIAJBBGsiAmogASACaigCADYCACACQQNLDQALCyACRQ0CA0AgACACQQFrIgJqIAEgAmotAAA6AAAgAg0ACwwCCyACQQNNDQADQCAAIAEoAgA2AgAgAUEEaiEBIABBBGohACACQQRrIgJBA0sNAAsLIAJFDQADQCAAIAEtAAA6AAAgAEEBaiEAIAFBAWohASACQQFrIgINAAsLC/ICAgJ/AX4CQCACRQ0AIAAgAToAACAAIAJqIgNBAWsgAToAACACQQNJDQAgACABOgACIAAgAToAASADQQNrIAE6AAAgA0ECayABOgAAIAJBB0kNACAAIAE6AAMgA0EEayABOgAAIAJBCUkNACAAQQAgAGtBA3EiBGoiAyABQf8BcUGBgoQIbCIBNgIAIAMgAiAEa0F8cSIEaiICQQRrIAE2AgAgBEEJSQ0AIAMgATYCCCADIAE2AgQgAkEIayABNgIAIAJBDGsgATYCACAEQRlJDQAgAyABNgIYIAMgATYCFCADIAE2AhAgAyABNgIMIAJBEGsgATYCACACQRRrIAE2AgAgAkEYayABNgIAIAJBHGsgATYCACAEIANBBHFBGHIiBGsiAkEgSQ0AIAGtQoGAgIAQfiEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkEgayICQR9LDQALCyAACywBAX8jAEEQayICJAAgAiABNgIMIAAgAUHQAEHRABDFASEAIAJBEGokACAACycBAX8jAEEQayICJAAgAiABNgIMIAAgAUEAQQAQxQEaIAJBEGokAAupAQEFfyMAQfABayIEJAAgBCAANgIAQQEhBQJAIAFBAkgNACAAIQMDQCAAIANBEGsiAyACIAFBAmsiB0ECdGooAgBrIgZBxQAQugFBAE4EQCAAIANBxQAQugFBAE4NAgsgBCAFQQJ0aiAGIAMgBiADQcUAELoBQQBOIgYbIgM2AgAgBUEBaiEFIAFBAWsgByAG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IgdBAE4NBwwJCyAIIAgpA0A8ADdBASEKIBchDSAJIQwMBAsgBy0AASEJIAdBAWohBwwACwALIAANByAURQ0CQQEhBwNAIAQgB0ECdGooAgAiAARAIAMgB0EDdGogACACIAYQyQFBASEPIAdBAWoiB0EKRw0BDAkLC0EBIQ8gB0EKTw0HA0AgBCAHQQJ0aigCAA0BIAdBAWoiB0EKRw0ACwwHC0EcIQsMBAsgCiALIA1rIg4gCiAOShsiCSARQf////8Hc0oNAkE9IQsgEiAJIBFqIgogCiASSBsiByAYSg0DIABBICAHIAogDBDLASAAIBYgERDHASAAQTAgByAKIAxBgIAEcxDLASAAQTAgCSAOQQAQywEgACANIA4QxwEgAEEgIAcgCiAMQYDAAHMQywEMAQsLQQAhDwwDC0E9IQsLQZDaACALNgIAC0F/IQ8LIAhB0ABqJAAgDwvAAQEDfyAALQAAQSBxRQRAAkAgASEDAkAgAiAAIgEoAhAiAAR/IAAFIAEQwQENASABKAIQCyABKAIUIgVrSwRAIAEgAyACIAEoAiQRAwAaDAILAkAgASgCUEEASA0AIAIhAANAIAAiBEUNASADIARBAWsiAGotAABBCkcNAAsgASADIAQgASgCJBEDACAESQ0BIAMgBGohAyACIARrIQIgASgCFCEFCyAFIAMgAhCuARogASABKAIUIAJqNgIUCwsLC20BBH8gACgCACwAABDCAUUEQEEADwsDQCAAKAIAIQNBfyEBIAJBzJmz5gBNBEBBfyADLAAAQTBrIgQgAkEKbCIBaiAEIAFB/////wdzShshAQsgACADQQFqNgIAIAEhAiADLAABEMIBDQALIAELxAIAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAUEJaw4SAAoLDAoLAgMEBQwLDAwKCwcICQsgAiACKAIAIgFBBGo2AgAgACABKAIANgIADwsACyACIAIoAgAiAUEEajYCACAAIAEyAQA3AwAPCyACIAIoAgAiAUEEajYCACAAIAEzAQA3AwAPCyACIAIoAgAiAUEEajYCACAAIAEwAAA3AwAPCyACIAIoAgAiAUEEajYCACAAIAExAAA3AwAPCwALIAIgAigCAEEHakF4cSIBQQhqNgIAIAAgASsDADkDAA8LIAAgAiADEQIACw8LIAIgAigCACIB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DQEDQCAGQQFrIgZBMDoAACAGIAtBEGpLDQALDAELIAAgBkEBEMcBIAZBAWohBiAKIAxyRQ0AIABB9hRBARDHAQsgACAGIAwgDSAGayIGIAYgDEobEMcBIAwgBmshDCAHQQRqIgcgCU8NASAMQQBODQALCyAAQTAgDEESakESQQAQywEgACAPIBEgD2sQxwEMAgsgDCEGCyAAQTAgBkEJakEJQQAQywELIABBICACIAUgBEGAwABzEMsBIAUgAiACIAVIGyEJDAELIBMgBUEadEEfdUEJcWohDAJAIANBC0sNAEEMIANrIQZEAAAAAAAAMEAhGANAIBhEAAAAAAAAMECiIRggBkEBayIGDQALIAwtAABBLUYEQCAYIAGaIBihoJohAQwBCyABIBigIBihIQELIBEgCygCLCIGIAZBH3UiBnMgBmutIBEQygEiBkYEQCALQTA6AA8gC0EPaiEGCyAQQQJyIQogBUEgcSEIIAsoAiwhByAGQQJrIg0gBUEPajoAACAGQQFrQS1BKyAHQQBIGzoAACAEQQhxIQYgC0EQaiEHA0AgByIFAn8gAZlEAAAAAAAA4EFjBEAgAaoMAQtBgICAgHgLIgdBgMsAai0AACAIcjoAACAGIANBAEpyRSABIAe3oUQAAAAAAAAwQKIiAUQAAAAAAAAAAGFxIAVBAWoiByALQRBqa0EBR3JFBEAgBUEuOgABIAVBAmohBwsgAUQAAAAAAAAAAGINAAtBfyEJQf3///8HIAogESANayIFaiIGayADSA0AIABBICACIAYCfwJAIANFDQAgByALQRBqayIIQQJrIANODQAgA0ECagwBCyAHIAtBEGprIggLIgdqIgMgBBDLASAAIAwgChDHASAAQTAgAiADIARBgIAEcxDLASAAIAtBEGogCBDHASAAQTAgByAIa0EAQQAQywEgACANIAUQxwEgAEEgIAIgAyAEQYDAAHMQywEgAyACIAIgA0gbIQkLIAtBsARqJAAgCQuGBQIGfgF/IAEgASgCAEEHakF4cSIBQRBqNgIAIAAgASkDACEEIAEpAwghBSMAQSBrIgAkAAJAIAVC////////////AIMiA0KAgICAgIDAgDx9IANCgICAgICAwP/DAH1UBEAgBUIEhiAEQjyIhCEDIARC//////////8PgyIEQoGAgICAgICACFoEQCADQoGAgICAgICAwAB8IQIMAgsgA0KAgICAgICAgEB9IQIgBEKAgICAgICAgAhSDQEgAiADQgGDfCECDAELIARQIANCgICAgICAwP//AFQgA0KAgICAgIDA//8AURtFBEAgBUIEhiAEQjyIhEL/////////A4NCgICAgICAgPz/AIQhAgwBC0KAgICAgICA+P8AIQIgA0L///////+//8MAVg0AQgAhAiADQjCIpyIBQZH3AEkNACAEIQIgBUL///////8/g0KAgICAgIDAAIQiAyEGAkAgAUGB9wBrIghBwABxBEAgAiAIQUBqrYYhBkIAIQIMAQsgCEUNACAGIAitIgeGIAJBwAAgCGutiIQhBiACIAeGIQILIAAgAjcDECAAIAY3AxgCQEGB+AAgAWsiAUHAAHEEQCADIAFBQGqtiCEEQgAhAwwBCyABRQ0AIANBwAAgAWuthiAEIAGtIgKIhCEEIAMgAoghAwsgACAENwMAIAAgAzcDCCAAKQMIQgSGIAApAwAiBEI8iIQhAiAAKQMQIAApAxiEQgBSrSAEQv//////////D4OEIgRCgYCAgICAgIAIWgRAIAJCAXwhAgwBCyAEQoCAgICAgICACFINACACQgGDIAJ8IQILIABBIGokACACIAVCgICAgICAgICAf4OEvzkDAAsWACAARQRAQQAPC0GQ2gAgADYCAEF/C5kCACAARQRAQQAPCwJ/AkAgAAR/IAFB/wBNDQECQEGs2wAoAgAoAgBFBEAgAUGAf3FBgL8DRg0DDAELIAFB/w9NBEAgACABQT9xQYABcjoAASAAIAFBBnZBwAFyOgAAQQIMBAsgAUGAQHFBgMADRyABQYCwA09xRQRAIAAgAUE/cUGAAXI6AAIgACABQQx2QeABcjoAACAAIAFBBnZBP3FBgAFyOgABQQMMBAsgAUGAgARrQf//P00EQCAAIAFBP3FBgAFyOgADIAAgAUESdkHwAXI6AAAgACABQQZ2QT9xQYABcjoAAiAAIAFBDHZBP3FBgAFyOgABQQQMBAsLQZDaAEEZNgIAQX8FQQELDAELIAAgAToAAEEBCwvvAwEFfwJ/QbTQACgCACIBIABBB2pBeHEiA2ohAgJAIANBACABIAJPGw0AIAI/AEEQdEsEQCACEA9FDQELQbTQACACNgIAIAEMAQtBkNoAQTA2AgBBfwsi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b3J0AG5ld1ZlcnRleENvdW50AG5ld0luZGV4Q291bnQAbV9tZXNoQ2hhcnRHcm91cHMuc2l6ZSgpID09IG1lc2hDb3VudAB1bnNpZ25lZCBpbnQAdGV4ZWxzUGVyVW5pdABzdHJhaWdodG5lc3NXZWlnaHQAcm91bmRuZXNzV2VpZ2h0AG5vcm1hbERldmlhdGlvbldlaWdodABub3JtYWxTZWFtV2VpZ2h0AHRleHR1cmVTZWFtV2VpZ2h0AGluZGV4T2Zmc2V0AG9yaWdpbmFsSW5kZXhPZmZzZXQAdXZPZmZzZXQAcG9zaXRpb25PZmZzZXQAbm9ybWFsT2Zmc2V0AGZsb2F0AHVpbnQ2NF90AHVzZUlucHV0TWVzaFV2cwBDb21wdXRpbmcgY2hhcnRzAFBhY2tpbmcgY2hhcnRzAHBhY2tDaGFydHMAY29tcHV0ZUNoYXJ0cwByb3RhdGVDaGFydHMAZGVmYXVsdENoYXJ0T3B0aW9ucwBkZWZhdWx0UGFja09wdGlvbnMAbWF4SXRlcmF0aW9ucwByb3RhdGVDaGFydHNUb0F4aXMAQnVpbGRpbmcgb3V0cHV0IG1lc2hlcwBkZXN0cm95QXRsYXMAZ2VuZXJhdGVBdGxhcwBjcmVhdGVBdGxhcwBwbGFuYXIAdW5zaWduZWQgY2hhcgBiaWxpbmVhcgBzb3VyY2UveGF0bGFzL3hhdGxhcy5jcHAAb3J0aG8AVXZNZXNoQnVmZmVySW5mbwBBdGxhc01lc2hCdWZmZXJJbmZvAHJlc29sdXRpb24AYmxvY2tBbGlnbgBuYW4AYm9vbABlbXNjcmlwdGVuOjp2YWwAZG9MZWFrQ2hlY2sAbWF4Qm91bmRhcnlMZW5ndGgAY3JlYXRlVXZNZXNoAGFkZFV2TWVzaABjcmVhdGVNZXNoAGFkZE1lc2gAdW5zaWduZWQgbG9uZwBzdGQ6OndzdHJpbmcAc3RkOjpzdHJpbmcAc3RkOjp1MTZzdHJpbmcAc3RkOjp1MzJzdHJpbmcAc2V0UHJvZ3Jlc3NMb2dnaW5nAGZpeFdpbmRpbmcAcGFkZGluZwBpbmYAbWF4Q2hhcnRTaXplAHBpZWNld2lzZQBkb3VibGUAY3JlYXRlSW1hZ2UAYnJ1dGVGb3JjZQB2b2lkAGdyb3VwIDwga0ludmFsaWQAbWVzaElkAGRlc3Ryb3lNZXNoRGF0YQBnZXRNZXNoRGF0YQBtYXhDaGFydEFyZWEAJXMgWwBOQU4ATFNDTQBJTkYAZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8c2hvcnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIHNob3J0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIGludD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8ZmxvYXQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQ4X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludDhfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDE2X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludDE2X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQzMl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQzMl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBjaGFyPgBzdGQ6OmJhc2ljX3N0cmluZzx1bnNpZ25lZCBjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxzaWduZWQgY2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8bG9uZz4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgbG9uZz4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8ZG91YmxlPgB0ZXhjb29yZC54ID49IDAgJiYgdGV4Y29vcmQueSA+PSAwAC4AKgBpc0Zpbml0ZSh0ZXhjb29yZC54KSAmJiBpc0Zpbml0ZSh0ZXhjb29yZC55KQBBZGRpbmcgbWVzaChlcykAaXNGaW5pdGUobWFqb3JBeGlzKSAmJiBpc0Zpbml0ZShtaW5vckF4aXMpICYmIGlzRmluaXRlKG1pbkNvcm5lcikAc2lnbWEyID4gc2lnbWExIHx8IGVxdWFsKHNpZ21hMSwgc2lnbWEyLCBrRXBzaWxvbikAKG51bGwpAGlzTm9ybWFsaXplZChub3JtYWwpAGlzRmluaXRlKHNjYWxlKQAgACAgIE5BTiB0ZXh0dXJlIGNvb3JkaW5hdGUgaW4gdmVydGV4ICV1CgAgICAldSB0LWp1bmN0aW9ucyBmb3VuZCBpbiAldSBjaGFydHMKAFBhY2tpbmcgJXUgY2hhcnRzCgAgICBVViBtZXNoICV1OiAldSB2ZXJ0aWNlcywgJXUgdHJpYW5nbGVzLCAldSBjaGFydHMKACAgIE1lc2ggJXU6ICV1IHZlcnRpY2VzLCAldSB0cmlhbmdsZXMsICV1IGNoYXJ0cwoAICAgJXUgY2hhcnRzCgBDb21wdXRpbmcgY2hhcnRzCgAgICAldSBjaGFydHMgd2l0aCBpbnZhbGlkIHBhcmFtZXRlcml6YXRpb25zCgBBZGRpbmcgbWVzaCAlZDogJXUgdmVydGljZXMsICV1IHBvbHlnb25zCgBBZGRpbmcgbWVzaCAlZDogJXUgdmVydGljZXMsICV1IHRyaWFuZ2xlcwoAQWRkaW5nIFVWIG1lc2ggJWQ6ICV1IHZlcnRpY2VzLCAldSB0cmlhbmdsZXMKAEJ1aWxkaW5nIG91dHB1dCBtZXNoZXMKACAgIFJlc2l6aW5nIGNoYXJ0ICV1IGZyb20gJWd4JWcgdG8gJXV4JXUgdG8gZml0IGF0bGFzCgAgICAgICAldSB3aXRoIG9yaWdpbmFsIFVWcwoAICAgQ2FuY2VsbGVkIGJ5IHVzZXIKACAgICVkeCVkIHJlc29sdXRpb24KACAgICV1OiAlZiUlIHV0aWxpemF0aW9uCgAgICAlZiUlIHV0aWxpemF0aW9uCgAgICBpbnN0YW5jZSBvZiBhIHByZXZpb3VzIFVWIG1lc2gKACAgIEVzdGltYXRpbmcgdGV4ZWxzUGVyVW5pdCBhcyAlZwoAICAgWmVybyBhcmVhIGZhY2U6ICVkLCBhcmVhIGlzICVmCgAgICBaZXJvIGFyZWEgZmFjZTogJWQsIGluZGljZXMgKCVkICVkICVkKSwgYXJlYSBpcyAlZgoAICAgICAgJXUgcGxhbmFyLCAldSBvcnRobywgJXUgTFNDTSwgJXUgcGllY2V3aXNlCgAgICAldSBhZGRpdGlvbmFsIHdhcm5pbmdzIHRydW5jYXRlZAoAICAgRGVnZW5lcmF0ZSBlZGdlOiBpbmRleCAlZCwgaW5kZXggJWQKAA1BU1NFUlQ6ICVzICVzICVkCgAgICBOQU4gcG9zaXRpb24gaW4gZmFjZTogJWQKACAgIE5BTiBub3JtYWwgaW4gZmFjZTogJWQKACAgIE5BTiB0ZXh0dXJlIGNvb3JkaW5hdGUgaW4gZmFjZTogJWQKACAgIENoYXJ0ICV1IChtZXNoICV1LCBncm91cCAldSwgaWQgJXUpICglcyk6IGludmFsaWQgcGFyYW1ldGVyaXphdGlvbiwgc2VsZi1pbnRlcnNlY3RpbmcgYm91bmRhcnkuCgBQYWNrQ2hhcnRzOiBObyBtZXNoZXMuIENhbGwgQWRkTWVzaCBvciBBZGRVdk1lc2ggZmlyc3QuCgBDb21wdXRlQ2hhcnRzOiBObyBtZXNoZXMuIENhbGwgQWRkTWVzaCBvciBBZGRVdk1lc2ggZmlyc3QuCgBHZW5lcmF0ZTogTm8gbWVzaGVzLiBDYWxsIEFkZE1lc2ggb3IgQWRkVXZNZXNoIGZpcnN0LgoAUGFja0NoYXJ0czogQ29tcHV0ZUNoYXJ0cyBtdXN0IGJlIGNhbGxlZCBmaXJzdC4KACAgIENoYXJ0ICV1ICAobWVzaCAldSwgZ3JvdXAgJXUsIGlkICV1KSAoJXMpOiBpbnZhbGlkIHBhcmFtZXRlcml6YXRpb24sICV1IC8gJXUgZmxpcHBlZCB0cmlhbmdsZXMuCgAgICBDaGFydCAldSAgKG1lc2ggJXUsIGdyb3VwICV1LCBpZCAldSkgKCVzKTogaW52YWxpZCBwYXJhbWV0ZXJpemF0aW9uLCAldSAvICV1IHplcm8gYXJlYSB0cmlhbmdsZXMuCgBBZGRVdk1lc2g6IE1lc2hlcyBhbmQgVVYgbWVzaGVzIGNhbm5vdCBiZSBhZGRlZCB0byB0aGUgc2FtZSBhdGxhcy4KAEFkZE1lc2g6IE1lc2hlcyBhbmQgVVYgbWVzaGVzIGNhbm5vdCBiZSBhZGRlZCB0byB0aGUgc2FtZSBhdGxhcy4KAFBhY2tDaGFydHM6IGF0bGFzIGlzIG51bGwuCgBDb21wdXRlQ2hhcnRzOiBhdGxhcyBpcyBudWxsLgoAQWRkTWVzaEpvaW46IGF0bGFzIGlzIG51bGwuCgBTZXRQcm9ncmVzc0NhbGxiYWNrOiBhdGxhcyBpcyBudWxsLgoAQWRkVXZNZXNoOiBhdGxhcyBpcyBudWxsLgoAQWRkTWVzaDogYXRsYXMgaXMgbnVsbC4KAEdlbmVyYXRlOiBhdGxhcyBpcyBudWxsLgoAUGFja0NoYXJ0czogUGFja09wdGlvbnM6OnRleGVsc1BlclVuaXQgaXMgbmVnYXRpdmUuCgAgICBDaGFydCAldSBleHRlbnRzIGFyZSBsYXJnZSAoJWd4JWcpCgAgICBaZXJvIGxlbmd0aCBlZGdlOiBpbmRleCAlZCBwb3NpdGlvbiAoJWcgJWcgJWcpLCBpbmRleCAlZCBwb3NpdGlvbiAoJWcgJWcgJWcpCgBdICVkJSUKADE0TWVzaEJ1ZmZlckluZm8AAAAA/CYAAFgTAABpAHZpAGlpaQB2aWlpADE2VXZNZXNoQnVmZmVySW5mbwAAAAD8JgAAghMAADE5QXRsYXNNZXNoQnVmZmVySW5mbwAAAPwmAACgEwAATjZ4YXRsYXMxMkNoYXJ0T3B0aW9uc0UA/CYAAMATAABmaWkAdmlpZgBONnhhdGxhczExUGFja09wdGlvbnNFAPwmAADpEwAARCYAAAAAAABsEwAApCYAAKQmAABQJgAAUCYAAGlpaWlpaQAAmBMAAJgmAACYJgAAaWlpaQAAAACkJgAAaWkAAEQmAADYEwAAABQAAEQmAADYEwAAdmlpAEQmAAAAFAAAuBMAAKQmAABEJgAAuBMAANgTAAAAFAAARCYAAFAmAEGQKQu0B/////8AAAAAAQAAAP////8BAAAA/////wAAAAABAAAA////////////////AAAAAAAAAAABAAAAAQAAAAEAAACnCgAAUgUAAGMFAADgBQAATlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUUAAPwmAADgFAAATlN0M19fMjEyYmFzaWNfc3RyaW5nSWhOU18xMWNoYXJfdHJhaXRzSWhFRU5TXzlhbGxvY2F0b3JJaEVFRUUAAPwmAAAoFQAATlN0M19fMjEyYmFzaWNfc3RyaW5nSXdOU18xMWNoYXJfdHJhaXRzSXdFRU5TXzlhbGxvY2F0b3JJd0VFRUUAAPwmAABwFQAATlN0M19fMjEyYmFzaWNfc3RyaW5nSURzTlNfMTFjaGFyX3RyYWl0c0lEc0VFTlNfOWFsbG9jYXRvcklEc0VFRUUAAAD8JgAAuBUAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0lEaU5TXzExY2hhcl90cmFpdHNJRGlFRU5TXzlhbGxvY2F0b3JJRGlFRUVFAAAA/CYAAAQWAABOMTBlbXNjcmlwdGVuM3ZhbEUAAPwmAABQFgAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJY0VFAAD8JgAAbBYAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWFFRQAA/CYAAJQWAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0loRUUAAPwmAAC8FgAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJc0VFAAD8JgAA5BYAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SXRFRQAA/CYAAAwXAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lpRUUAAPwmAAA0FwAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJakVFAAD8JgAAXBcAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWxFRQAA/CYAAIQXAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0ltRUUAAPwmAACsFwAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJZkVFAAD8JgAA1BcAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWRFRQAA/CYAAPwXAADbD0k/2w9Jv+TLFkDkyxbAAAAAAAAAAIDbD0lA2w9JwABB0DAL9xU4Y+0+2g9JP16Yez/aD8k/aTesMWghIjO0DxQzaCGiMwMAAAAEAAAABAAAAAYAAACD+aIARE5uAPwpFQDRVycA3TT1AGLbwAA8mZUAQZBDAGNR/gC73qsAt2HFADpuJADSTUIASQbgAAnqLgAcktEA6x3+ACmxHADoPqcA9TWCAES7LgCc6YQAtCZwAEF+XwDWkTkAU4M5AJz0OQCLX4QAKPm9APgfOwDe/5cAD5gFABEv7wAKWosAbR9tAM9+NgAJyycARk+3AJ5mPwAt6l8Auid1AOXrxwA9e/EA9zkHAJJSigD7a+oAH7FfAAhdjQAwA1YAe/xGAPCrawAgvM8A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";
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
    xAtlas.HEAPU32.set(indices, meshInfo.indexOffset / Uint32Array.BYTES_PER_ELEMENT);
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
    let originalIndexData = new Uint32Array(xAtlas.HEAPU32.subarray(meshInfo.originalIndexOffset / 4, meshInfo.originalIndexOffset / 4 + meshInfo.newVertexCount));
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
    indices?.setArray(new Uint32Array(xAtlas.HEAPU32.subarray(meshInfo.indexOffset / 4, meshInfo.indexOffset / 4 + meshInfo.newIndexCount)));
    const uv2 = document2.createAccessor(options.attributeName).setType("VEC2").setArray(new Float32Array(xAtlas.HEAPF32.subarray(meshInfo.uvOffset / Float32Array.BYTES_PER_ELEMENT, meshInfo.uvOffset / Float32Array.BYTES_PER_ELEMENT + meshInfo.newVertexCount * 2)));
    primitive.setAttribute(options.attributeName, uv2);
    xAtlas.destroyMeshData(meshInfo);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddMeshStatus,
  unwrap
});
//# sourceMappingURL=index.js.map