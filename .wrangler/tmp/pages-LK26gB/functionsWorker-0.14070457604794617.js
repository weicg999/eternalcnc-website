var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// api/coze/chat.js
var ALLOWED_ORIGINS = [
  "https://www.eternalcnc.com",
  "https://eternalcnc.com",
  // 本地测试（上线后可删除）
  "http://localhost:4325",
  "http://localhost:8099"
];
async function onRequestPost({ request, env: env2 }) {
  const origin = request.headers.get("Origin") || "";
  const referer = request.headers.get("Referer") || "";
  const refererOrigin = referer ? new URL(referer).origin : "";
  if (!ALLOWED_ORIGINS.includes(origin) && !ALLOWED_ORIGINS.includes(refererOrigin)) {
    return new Response("Forbidden", { status: 403 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response("Bad Request", { status: 400 });
  }
  const { user, conversation_id, query } = body;
  if (!user || !/^visitor-[A-Za-z0-9_-]{4,64}$/.test(user)) {
    return new Response("Invalid user", { status: 400 });
  }
  if (!query || typeof query !== "string" || query.length === 0 || query.length > 4e3) {
    return new Response("Invalid query", { status: 400 });
  }
  const pat = env2.COZE_PAT;
  const botId = env2.COZE_BOT_ID;
  if (!pat || !botId) return new Response("Server not configured", { status: 500 });
  const cozeRes = await fetch("https://api.coze.cn/open_api/v1/chat", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${pat}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      bot_id: botId,
      user,
      query,
      stream: true,
      ...conversation_id ? { conversation_id } : {}
    })
  });
  return new Response(cozeRes.body, {
    status: cozeRes.status,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive"
    }
  });
}
__name(onRequestPost, "onRequestPost");

// api/coze/conversation.js
var ALLOWED_ORIGINS2 = [
  "https://www.eternalcnc.com",
  "https://eternalcnc.com",
  // 本地测试（上线后可删除）
  "http://localhost:4325",
  "http://localhost:8099"
];
async function onRequestPost2({ request, env: env2 }) {
  const origin = request.headers.get("Origin") || "";
  const referer = request.headers.get("Referer") || "";
  const refererOrigin = referer ? new URL(referer).origin : "";
  if (!ALLOWED_ORIGINS2.includes(origin) && !ALLOWED_ORIGINS2.includes(refererOrigin)) {
    return new Response("Forbidden", { status: 403 });
  }
  const pat = env2.COZE_PAT;
  if (!pat) return new Response("Token not configured", { status: 500 });
  try {
    const cozeRes = await fetch("https://api.coze.cn/v1/conversation/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pat}`,
        "Content-Type": "application/json"
      },
      body: "{}"
    });
    const j = await cozeRes.json();
    if (j.code !== 0 || !j.data || !j.data.id) {
      return new Response(JSON.stringify({ error: j.msg || "create failed", code: j.code }), {
        status: 502,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ conversation_id: j.data.id }), {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost2, "onRequestPost");

// api/chat.js
var COZE_API_ENDPOINT = "https://api.coze.cn/open_api/v2/chat";
var RATE_LIMIT_MAX = 30;
var RATE_LIMIT_WINDOW = 60 * 1e3;
var MAX_RETRY_COUNT = 2;
var COZE_PAT = "pat_rqNvQTy7enkEsB5jFOi8VGYnY4xVe5QT8HbhDDWg1RuUqkEHa7y1egk012SZWfox";
var COZE_BOT_ID = "7677859860893040694";
var KV_KEY_PREFIX = "customer:";
var KV_TTL_SECONDS = 90 * 24 * 60 * 60;
var PERSONAL_EMAIL_DOMAINS = [
  // 国内主流公众邮箱
  "qq.com",
  "vip.qq.com",
  "foxmail.com",
  "163.com",
  "126.com",
  "yeah.net",
  "sina.com",
  "sina.cn",
  "sohu.com",
  "aliyun.com",
  "tom.com",
  "21cn.com",
  "139.com",
  "189.cn",
  "wo.cn",
  // 国际主流公众邮箱
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "yahoo.com",
  "yahoo.com.cn",
  "ymail.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "protonmail.com",
  "proton.me",
  "zoho.com",
  "gmx.com",
  "gmx.de",
  "mail.com",
  "mail.ru",
  "yandex.com",
  "naver.com",
  "hanmail.net",
  "daum.net",
  "nate.com"
];
function isPersonalEmail(email) {
  if (!email || typeof email !== "string") return false;
  const at = email.lastIndexOf("@");
  if (at < 0) return false;
  const domain2 = email.slice(at + 1).toLowerCase().trim();
  if (!domain2) return false;
  return PERSONAL_EMAIL_DOMAINS.some((d) => domain2 === d || domain2.endsWith("." + d));
}
__name(isPersonalEmail, "isPersonalEmail");
var ALLOWED_ORIGINS3 = [
  "https://eternalcnc.com",
  "https://www.eternalcnc.com",
  "https://eternalcnc-website.pages.dev"
];
var ALLOWED_LOCAL = /^http:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0):\d+$/;
var FORBIDDEN_PATTERNS = [
  // 复读机核心禁句
  /什么类型的零件/,
  /what type of (parts|part|components|component|product|products)/i,
  /what kind of (parts|part|components|component)/i,
  /what (parts|part) do you need/i,
  /milling (parts|part).*turning.*combination/i,
  /铣削件.*车削件.*多种工艺/,
  /铣削.*车削.*磨削.*线切割.*多种组合/,
  // 敏感词铁律
  /\bCMM\b/i,
  /三坐标/,
  /\bSPC\b/,
  /统计过程控制/,
  /precision aerospace/i,
  /零累积误差/,
  // 医疗植入
  /implant/i,
  /植入/,
  // 越界能力（只挡"我方做/提供该工艺"的过承诺；"可介绍/伙伴/对接"等牵线话术放行）
  // 否定环视 (?![^。.!?\n]{0,15}不) 排除"我们不做X/不涉及X/不直接做X"等正确否认句式，避免误杀牵线回复
  /(我们|我方|本公司|本厂|我司)(?![^。.!?\n]{0,15}不)[^。.!?\n]{0,8}(做|提供|承接|主营|擅长|专做|也做|涉及|具备|拥有)[^。.!?\n]{0,6}(注塑|injection|3D打印|3d print|钣金|sheet metal|激光切割|laser cut|冲压|stamp|铸造|cast)/i,
  // 英文同理：挡 "we do/offer injection..." 过承诺；"we can introduce you to our injection partner" 因 intro 词在 15 字窗外而放行；(?![^.!?\n]{0,10}(?:n't|\bnot\b)) 排除 "we do not / we don't offer"
  /we (?:also |can |do |offer |provide |handle |manufacture)(?![^.!?\n]{0,10}(?:n't|\bnot\b))[^.!?\n]{0,15}(?:injection|sheet metal|laser cutting|stamping|casting|3d printing)/i
];
var FACT_VIOLATIONS = [
  // 设备数量错误（不能说70台、50台、10台等离谱数字）
  {
    pattern: /(\d{2,3})\s*(?:台|sets? of|machines?|equipments?|production|testing equipment)/i,
    test: /* @__PURE__ */ __name((match2) => {
      const num = parseInt(match2[1]);
      return num < 20 || num > 40;
    }, "test"),
    reason: "wrong_machine_count"
  },
  // 公司年限错误（不能说8年、5年、20年等）
  {
    pattern: /(\d{1,2})\s*(?:年|years?)(?:of|的)?\s*(?:经验|experience|in CNC|history)/i,
    test: /* @__PURE__ */ __name((match2) => {
      const num = parseInt(match2[1]);
      return num < 12 || num > 20;
    }, "test"),
    reason: "wrong_years_experience"
  },
  // 成立年份错误
  {
    pattern: /(?:established|founded|set up|成立).*(20\d{2})/i,
    test: /* @__PURE__ */ __name((match2) => {
      const year = parseInt(match2[1]);
      return year !== 2009;
    }, "test"),
    reason: "wrong_founding_year"
  },
  // ISO 9001已认证错误
  {
    pattern: /ISO 9001[^。.!?\n]*(?:certified|certification\s+is\s+complete|已认证|通过认证)/i,
    test: /* @__PURE__ */ __name(() => true, "test"),
    reason: "iso_certified_claim"
  },
  // 常规公差±0.01错误（常规应该是±0.05，精密级才是±0.01）
  {
    pattern: /(?:standard|general|regular|常规|一般|普通)[^。.!?\n]*?(±\s*0\.01|0\.01\s*mm|0\.01\s*毫米)/i,
    test: /* @__PURE__ */ __name(() => true, "test"),
    reason: "wrong_standard_tolerance"
  },
  // 交期错误（不能说3-15天这种生产交期，报价交期是24h/1-2天）
  {
    pattern: /(?:standard|general|regular|lead time|delivery time|交期|交付)[^。.!?\n]*(?:3[-\s~]*15|5[-\s~]*10|7[-\s~]*14|7\s*[-~]\s*15)\s*(?:days?|工作日|天)/i,
    test: /* @__PURE__ */ __name(() => true, "test"),
    reason: "wrong_lead_time"
  }
];
var rateLimitMap = /* @__PURE__ */ new Map();
function checkRateLimit(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  let timestamps = rateLimitMap.get(ip);
  if (!timestamps) {
    timestamps = [];
    rateLimitMap.set(ip, timestamps);
  }
  timestamps = timestamps.filter((t) => t > windowStart);
  rateLimitMap.set(ip, timestamps);
  if (timestamps.length >= RATE_LIMIT_MAX) return false;
  timestamps.push(now);
  return true;
}
__name(checkRateLimit, "checkRateLimit");
function getClientIp(request) {
  return request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}
__name(getClientIp, "getClientIp");
function isOriginAllowed(origin) {
  if (!origin) return false;
  if (ALLOWED_LOCAL.test(origin)) return true;
  return ALLOWED_ORIGINS3.includes(origin);
}
__name(isOriginAllowed, "isOriginAllowed");
function corsHeaders(origin) {
  const allowed = isOriginAllowed(origin) ? origin : ALLOWED_ORIGINS3[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
}
__name(corsHeaders, "corsHeaders");
function jsonResponse(status, data, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...corsHeaders(origin) }
  });
}
__name(jsonResponse, "jsonResponse");
var SCRIPT_RANGES = [
  { lang: "ja", re: /[\u3040-\u309F\u30A0-\u30FF]/g },
  // 平假名 / 片假名
  { lang: "ko", re: /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/g },
  // 谚文
  { lang: "hi", re: /[\u0900-\u097F]/g },
  // 天城文
  { lang: "th", re: /[\u0E00-\u0E7F]/g },
  // 泰文
  { lang: "ar", re: /[\u0600-\u06FF\u0750-\u077F]/g },
  // 阿拉伯文
  { lang: "he", re: /[\u0590-\u05FF]/g },
  // 希伯来文
  { lang: "el", re: /[\u0370-\u03FF]/g },
  // 希腊文
  { lang: "ru", re: /[\u0400-\u04FF]/g },
  // 西里尔文
  { lang: "zh", re: /[\u4E00-\u9FFF\u3400-\u4DBF]/g }
  // 汉字（普通话与粤语共用）
];
function detectScript(text) {
  if (!text || typeof text !== "string") return "en";
  for (const s of SCRIPT_RANGES) {
    const m = text.match(s.re);
    if (m && m.length >= 2) return s.lang;
  }
  return "en";
}
__name(detectScript, "detectScript");
function normalizeLang(lang) {
  if (!lang || typeof lang !== "string") return "";
  const l = lang.trim().toLowerCase();
  if (!l) return "";
  if (l === "yue" || l === "zh-hk" || l === "zh-mo" || l === "zh-tw") return "zh";
  return l.split("-")[0] || "";
}
__name(normalizeLang, "normalizeLang");
var LANG_NAMES = {
  ja: "Japanese",
  ko: "Korean",
  hi: "Hindi",
  th: "Thai",
  ar: "Arabic",
  he: "Hebrew",
  el: "Greek",
  ru: "Russian",
  de: "German",
  fr: "French",
  es: "Spanish",
  pt: "Portuguese",
  it: "Italian",
  nl: "Dutch",
  pl: "Polish",
  tr: "Turkish",
  vi: "Vietnamese",
  id: "Indonesian",
  ms: "Malay",
  sv: "Swedish",
  cs: "Czech",
  ro: "Romanian",
  uk: "Ukrainian",
  fa: "Persian",
  zh: "Chinese",
  en: "English"
};
var EMAIL_DETECT_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
var EMAIL_SENTENCE_RE = /[^。！？!?\n]*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}[^。！？!?\n]*[。！？!?]?/g;
var EMAIL_ALLOWED_INTENT_RE = new RegExp(
  "(\u62A5\u4EF7|\u5831\u50F9|\u4EF7\u683C|\u50F9\u9322|\u4EF7\u94B1|\u591A\u5C11\u94B1|\u591A\u5C11\u9322|\u8BE2\u4EF7|\u8A62\u50F9|\u8CBB\u7528|\u8D39\u7528|\\bquote\\b|\\bquotation\\b|\\bpricing\\b|\\bprice\\b|\\bcost\\b|\\brfq\\b)|((\u53D1|\u767C|\u5BC4|\u4F20|\u50B3|\u4E0A\u4F20|\u4E0A\u50B3|\u63D0\u4EA4|\u9012\u4EA4|\u905E\u4EA4)[^\u3002\uFF01\uFF1F!?\\n]{0,8}(\u56FE|\u5716|\u6A94|\u6863|\u6587\u4EF6|\u56FE\u7EB8)|(\u56FE|\u5716|\u6A94|\u6863|\u6587\u4EF6|\u56FE\u7EB8)[^\u3002\uFF01\uFF1F!?\\n]{0,8}(\u53D1|\u767C|\u5BC4|\u4F20|\u50B3|\u4E0A\u4F20|\u4E0A\u50B3|\u63D0\u4EA4)|\\b(send|upload|share)\\b[^.\\n]{0,20}(drawing|file|step|stp|dxf|model)|(drawing|file)[^.\\n]{0,20}\\b(send|upload|share)\\b)",
  "i"
);
var FALLBACK_REPLY = {
  yue: "\u660E\u767D\uFF0C\u5462\u500B\u554F\u984C\u6211\u8F49\u7540\u9805\u76EE\u5DE5\u7A0B\u5E2B\u540C\u4F60\u78BA\u8A8D\u3002\u65B9\u4FBF\u7559\u4F4E\u8CB4\u53F8\u4F01\u696D\u90F5\u7BB1\u55CE\uFF1F\u6211\u6703\u5B89\u6392\u5DE5\u7A0B\u5E2B\u76E1\u5FEB\u56DE\u8986\u4F60\u3002",
  zh: "\u660E\u767D\uFF0C\u8FD9\u4E2A\u95EE\u9898\u6211\u8F6C\u7ED9\u9879\u76EE\u5DE5\u7A0B\u5E08\u8DDF\u60A8\u786E\u8BA4\u3002\u65B9\u4FBF\u7559\u4E2A\u8D35\u53F8\u4F01\u4E1A\u90AE\u7BB1\u5417\uFF1F\u6211\u4F1A\u5B89\u6392\u5DE5\u7A0B\u5E08\u5C3D\u5FEB\u56DE\u590D\u60A8\u3002",
  en: "Understood \u2014 let me route this to our project engineer for confirmation. Could you share your corporate email so we can follow up with the details?"
};
function getFallbackReply(userLang, visitorLangRaw) {
  const raw = String(visitorLangRaw || "").toLowerCase();
  if (raw === "yue" || raw === "zh-hk" || raw === "zh-mo") return FALLBACK_REPLY.yue;
  return userLang === "zh" ? FALLBACK_REPLY.zh : FALLBACK_REPLY.en;
}
__name(getFallbackReply, "getFallbackReply");
var EMAIL_MENTION_DETECT_RE = /\b(e-?mail|mail)\b|邮箱|郵箱|邮件|郵件|电邮|電郵/i;
var EMAIL_MENTION_STRIP_RE = /[^\n。！？!?]*(\b(e-?mail|mail)\b|邮箱|郵箱|邮件|郵件|电邮|電郵)[^\n。！？!?]*[。！？!?]?/gi;
var STRIP_RATIO_LIMIT = 0.6;
function stripEmailIfNotAllowed(userMessage, replyContent) {
  if (!replyContent || typeof replyContent !== "string") {
    return { text: replyContent, stripped: false, tooShort: false };
  }
  if (!EMAIL_DETECT_RE.test(replyContent)) {
    return { text: replyContent, stripped: false, tooShort: false };
  }
  if (EMAIL_ALLOWED_INTENT_RE.test(userMessage || "")) {
    return { text: replyContent, stripped: false, tooShort: false };
  }
  let cleaned = replyContent.replace(EMAIL_SENTENCE_RE, "");
  for (let i = 0; i < 3 && EMAIL_MENTION_DETECT_RE.test(cleaned); i++) {
    cleaned = cleaned.replace(EMAIL_MENTION_STRIP_RE, "");
  }
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n").trim();
  const ratio = replyContent.length ? 1 - cleaned.length / replyContent.length : 0;
  const gutted = cleaned.length < 40 || ratio > STRIP_RATIO_LIMIT;
  return { text: cleaned, stripped: true, tooShort: gutted };
}
__name(stripEmailIfNotAllowed, "stripEmailIfNotAllowed");
function validateReply(userMessage, replyContent, visitorLang) {
  if (!replyContent || replyContent.trim().length < 2) {
    return { valid: false, reason: "empty_reply" };
  }
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(replyContent)) {
      return { valid: false, reason: "forbidden_pattern" };
    }
  }
  const browserLang = normalizeLang(visitorLang);
  const expectedLang = browserLang || detectScript(userMessage);
  const replyLang = detectScript(replyContent);
  if (replyLang !== expectedLang) {
    return {
      valid: false,
      reason: `language_mismatch: expected=${expectedLang}(via ${browserLang ? "browser" : "message"}), reply=${replyLang}`
    };
  }
  for (const rule of FACT_VIOLATIONS) {
    const match2 = replyContent.match(rule.pattern);
    if (match2 && rule.test(match2)) {
      return { valid: false, reason: rule.reason };
    }
  }
  return { valid: true, reason: "ok" };
}
__name(validateReply, "validateReply");
function buildRetryMessage(originalMessage, failureReason, userLang, retryCount, visitorLangRaw) {
  const parts = [];
  const raw = String(visitorLangRaw || "").toLowerCase();
  const langName = LANG_NAMES[userLang] || "English";
  if (raw === "yue" || raw === "zh-hk" || raw === "zh-mo" || raw === "zh-tw") {
    parts.push("\u3010\u6700\u9AD8\u512A\u5148\u7D1A\u6307\u4EE4\uFF1A\u5FC5\u9808\u7528\u5EE3\u6771\u8A71\u53E3\u8A9E\u56DE\u8986\uFF0C\u7E41\u9AD4\u5B57\uFF1B\u5514\u597D\u593E\u96DC\u7C21\u9AD4\u5B57\uFF0C\u4EA6\u5514\u597D\u593E\u666E\u901A\u8A71\u8A5E\u5F59\uFF08\u4F8B\u5982\u300C\u9084\u662F\u300D\u300C\u4EC0\u9EBC\u300D\u300C\u6211\u5011\u300D\u300C\u591A\u5C11\u300D\uFF09\u3002\u9055\u53CD\u5C07\u4E0D\u5408\u683C\u3002\u3011");
  } else if (userLang === "zh") {
    parts.push("\u3010\u6700\u9AD8\u4F18\u5148\u7EA7\u6307\u4EE4\uFF1A\u4F60\u5FC5\u987B\u7528\u7EAF\u4E2D\u6587\u56DE\u590D\uFF0C\u4E0D\u80FD\u5939\u6742\u4EFB\u4F55\u82F1\u6587\u5355\u8BCD\uFF01\u8FDD\u53CD\u5C06\u4E0D\u5408\u683C\u3002\u3011");
  } else if (userLang === "en") {
    parts.push("\u3010TOP PRIORITY: REPLY IN PURE ENGLISH ONLY! NO CHINESE CHARACTERS AT ALL.\u3011");
  } else {
    parts.push(`\u3010TOP PRIORITY: YOU MUST REPLY ENTIRELY IN ${langName.toUpperCase()}! Do NOT reply in English or any other language \u2014 the customer is browsing in ${langName}.\u3011`);
  }
  if (failureReason === "forbidden_pattern") {
    if (userLang === "zh") {
      parts.push('\u3010\u7EDD\u5BF9\u7981\u4EE4\uFF1A\u7EDD\u5BF9\u4E0D\u5141\u8BB8\u95EE"\u8BF7\u95EE\u60A8\u9700\u8981\u52A0\u5DE5\u4EC0\u4E48\u7C7B\u578B\u7684\u96F6\u4EF6"\u8FD9\u7C7B\u95EE\u9898\uFF01\u7528\u6237\u95EE\u4EC0\u4E48\u5C31\u76F4\u63A5\u56DE\u7B54\u4EC0\u4E48\uFF0C\u56DE\u7B54\u5B8C\u5C31\u7ED3\u675F\uFF0C\u4E0D\u8981\u8FFD\u52A0\u5F15\u5BFC\u6027\u95EE\u9898\u3002\u3011');
    } else {
      parts.push('\u3010ABSOLUTE BAN: NEVER ask "what type of parts" or similar questions! Answer the user question directly and do NOT add guiding questions at the end.\u3011');
    }
  }
  if (failureReason === "wrong_machine_count") {
    if (userLang === "zh") {
      parts.push("\u3010\u4E8B\u5B9E\u6821\u9A8C\uFF1A\u6211\u4EEC\u670930\u4F59\u53F0CNC\u8BBE\u5907\u3002\u4E25\u7981\u8BF470\u53F0\u300150\u53F0\u300110\u53F0\u7B49\u4EFB\u4F55\u9519\u8BEF\u6570\u5B57\u3002\u3011");
    } else {
      parts.push("\u3010FACT CHECK: We have over 30 CNC machines. NEVER say 70, 50, 10 or any wrong number.\u3011");
    }
  }
  if (failureReason === "wrong_years_experience") {
    if (userLang === "zh") {
      parts.push("\u3010\u4E8B\u5B9E\u6821\u9A8C\uFF1A\u516C\u53F82009\u5E74\u6210\u7ACB\uFF0C15\u5E74+CNC\u7ECF\u9A8C\u3002\u4E25\u7981\u8BF48\u5E74\u30015\u5E74\u300120\u5E74\u7B49\u9519\u8BEF\u5E74\u9650\u3002\u3011");
    } else {
      parts.push("\u3010FACT CHECK: Founded in 2009, 15+ years of CNC experience. NEVER say 8, 5, 20 years.\u3011");
    }
  }
  if (failureReason === "wrong_standard_tolerance") {
    if (userLang === "zh") {
      parts.push("\u3010\u4E8B\u5B9E\u6821\u9A8C\uFF1A\u5E38\u89C4CNC\u516C\u5DEE\xB10.05mm\uFF0C\u7CBE\u5BC6\u7EA7\xB10.01mm\uFF0C\u78E8\u524A/\u7EBF\u5207\u5272\u6700\u9AD8\xB10.005mm\u3002\u4E25\u7981\u8BF4\u5E38\u89C4\u516C\u5DEE\u662F\xB10.01mm\u3002\u3011");
    } else {
      parts.push("\u3010FACT CHECK: Standard CNC tolerance is \xB10.05mm (ISO 2768-m), precision grade \xB10.01mm, grinding/wire EDM up to \xB10.005mm. NEVER say standard tolerance is \xB10.01mm.\u3011");
    }
  }
  if (failureReason === "wrong_lead_time") {
    if (userLang === "zh") {
      parts.push("\u3010\u4E8B\u5B9E\u6821\u9A8C\uFF1A\u62A5\u4EF7\u65F6\u6548\u2014\u2014\u5E38\u89C4\u96F6\u4EF624\u5C0F\u65F6\u5185\u51FA\u62A5\u4EF7\uFF0C\u590D\u6742\u4EF61-2\u4E2A\u5DE5\u4F5C\u65E5\u3002\u4E25\u7981\u8BF43-15\u5929\u8FD9\u79CD\u751F\u4EA7\u4EA4\u671F\u3002\u3011");
    } else {
      parts.push("\u3010FACT CHECK: Quotation lead time \u2014 standard parts within 24 hours, complex parts 1-2 business days. NEVER say 3-15 days for quotation.\u3011");
    }
  }
  if (failureReason === "iso_certified_claim") {
    if (userLang === "zh") {
      parts.push('\u3010\u4E8B\u5B9E\u6821\u9A8C\uFF1AISO 9001\u6B63\u5728\u8BA4\u8BC1\u4E2D\uFF0C\u53EA\u80FD\u8BF4"\u8BA4\u8BC1\u4E2D"\uFF0C\u7EDD\u5BF9\u4E0D\u80FD\u8BF4\u5DF2\u8BA4\u8BC1\u3002\u3011');
    } else {
      parts.push('\u3010FACT CHECK: ISO 9001 certification is IN PROGRESS. Only say "in process" or "pending". NEVER say "certified".\u3011');
    }
  }
  if (userLang === "zh") {
    parts.push('\u3010\u901A\u7528\u94C1\u5F8B\uFF1A\u6240\u6709\u4E8B\u5B9E\u6027\u6570\u636E\u5FC5\u987B\u4E25\u683C\u51C6\u786E\uFF0C\u4E25\u7981\u7F16\u9020\u6570\u5B57\u548C\u4FE1\u606F\u3002\u4E0D\u786E\u5B9A\u7684\u5C31\u8BF4"\u9700\u8981\u5DE5\u7A0B\u5E08\u786E\u8BA4"\u3002\u3011');
  } else {
    parts.push('\u3010GENERAL RULE: All factual data must be strictly accurate. NEVER invent numbers or information. If unsure, say "our engineer will confirm".\u3011');
  }
  parts.push("");
  parts.push("\u7528\u6237\u95EE\u9898\uFF1A");
  parts.push(originalMessage);
  return parts.join("\n");
}
__name(buildRetryMessage, "buildRetryMessage");
function buildLanguageDirective(visitorLangRaw, userLang) {
  const raw = String(visitorLangRaw || "").toLowerCase();
  if (raw === "yue" || raw === "zh-hk" || raw === "zh-mo" || raw === "zh-tw") {
    return "\u3010\u8BED\u8A00\u6307\u4EE4\uFF1A\u5FC5\u9808\u4F7F\u7528\u5EE3\u6771\u8A71\u53E3\u8A9E\u56DE\u8986\uFF0C\u7E41\u9AD4\u5B57\uFF0C\u5514\u597D\u593E\u96DC\u7C21\u9AD4\u5B57\u540C\u666E\u901A\u8A71\u8A5E\u5F59\u3002\u3011\n";
  }
  if (userLang === "zh") return "\u3010\u8BED\u8A00\u6307\u4EE4\uFF1A\u5FC5\u987B\u4F7F\u7528\u7B80\u4F53\u4E2D\u6587\u56DE\u590D\u3002\u3011\n";
  if (userLang === "en") return "\u3010Language directive: you must reply entirely in English.\u3011\n";
  const name = LANG_NAMES[userLang];
  if (name) return `\u3010Language directive: you must reply entirely in ${name}, not in English.\u3011
`;
  return "";
}
__name(buildLanguageDirective, "buildLanguageDirective");
function buildContextPrefix(visitorInfo) {
  if (!visitorInfo || typeof visitorInfo !== "object") return "";
  const {
    language = "",
    referrer = "",
    current_page = "",
    page_category = "",
    page_category_en = "",
    screen_size = ""
  } = visitorInfo;
  const parts = [];
  parts.push("\u3010\u7CFB\u7EDF\u4E0A\u4E0B\u6587 - \u4EE5\u4E0B\u662F\u8BBF\u5BA2\u6D4F\u89C8\u4FE1\u606F\uFF0C\u8BF7\u6839\u636E\u8FD9\u4E9B\u4FE1\u606F\u7528\u6070\u5F53\u7684\u8BED\u8A00\u56DE\u590D\u7528\u6237\uFF0C\u4E0D\u8981\u63D0\u53CA\u4F60\u770B\u5230\u4E86\u8FD9\u4E9B\u7CFB\u7EDF\u4FE1\u606F\u3011");
  if (language) {
    const langMap = {
      "yue": "\u7CB5\u8A9E\uFF08\u5E7F\u4E1C\u8BDD/\u9999\u6E2F\u8BDD\uFF09",
      "zh-hk": "\u7CB5\u8A9E\uFF08\u5E7F\u4E1C\u8BDD/\u9999\u6E2F\u8BDD\uFF09",
      "zh-mo": "\u7CB5\u8A9E\uFF08\u5E7F\u4E1C\u8BDD/\u9999\u6E2F\u8BDD\uFF09",
      "zh-tw": "\u7E41\u9AD4\u4E2D\u6587",
      "zh-cn": "\u7B80\u4F53\u4E2D\u6587",
      "zh": "\u7B80\u4F53\u4E2D\u6587",
      "en": "English"
    };
    const langKey = language.toLowerCase();
    const langBase = langKey.split("-")[0];
    let langLabel = langMap[langKey];
    if (!langLabel) {
      const name = LANG_NAMES[langBase];
      langLabel = name ? `${name}\uFF08${language}\uFF09` : language;
    }
    let langTip;
    if (langLabel.indexOf("\u7CB5\u8A9E") === 0) {
      langTip = `- \u8BBF\u5BA2\u8BED\u8A00\u504F\u597D: ${langLabel}\u3002\u8BF7\u4F7F\u7528\u7CB5\u8A9E\uFF08\u5E7F\u4E1C\u8BDD\uFF09\u53E3\u8BED\u5316\u56DE\u590D\uFF0C\u4F7F\u7528\u7E41\u4F53\u5B57\uFF0C\u907F\u514D\u4E66\u9762\u666E\u901A\u8BDD\u8BCD\u6C47\uFF1B\u4E0D\u5F97\u6539\u7528\u82F1\u6587\u6216\u5176\u4ED6\u8BED\u8A00\u3002`;
    } else if (langLabel === "\u7B80\u4F53\u4E2D\u6587") {
      langTip = `- \u8BBF\u5BA2\u8BED\u8A00\u504F\u597D: \u7B80\u4F53\u4E2D\u6587\u3002\u8BF7\u4F7F\u7528\u7B80\u4F53\u4E2D\u6587\u56DE\u590D\uFF0C\u4E0D\u5F97\u6539\u7528\u82F1\u6587\u6216\u5176\u4ED6\u8BED\u8A00\u3002`;
    } else if (langLabel === "English") {
      langTip = `- \u8BBF\u5BA2\u8BED\u8A00\u504F\u597D: English. You must reply entirely in English.`;
    } else {
      const name = LANG_NAMES[langBase] || langLabel;
      langTip = `- \u8BBF\u5BA2\u8BED\u8A00\u504F\u597D: ${name}\uFF08${language}\uFF09\u3002You must write the entire reply in ${name}, not in English.`;
    }
    parts.push(langTip);
    parts.push("- \u91CD\u8981\u6307\u4EE4\uFF1A\u4E0D\u8981\u5411\u8BBF\u5BA2\u8BE2\u95EE\u300C\u60A8\u60F3\u7528\u54EA\u79CD\u8BED\u8A00\u300D\uFF0C\u4E5F\u4E0D\u8981\u58F0\u79F0\u81EA\u5DF1\u4EC5\u652F\u6301\u67D0\u51E0\u79CD\u56FA\u5B9A\u8BED\u8A00\uFF1B\u8BF7\u76F4\u63A5\u4EE5\u4E0A\u8FF0\u8BBF\u5BA2\u8BED\u8A00\u504F\u597D\u56DE\u590D\uFF08\u82E5\u4E3A\u7CB5\u8A9E\u5219\u7528\u5E7F\u4E1C\u8BDD\u53E3\u8BED\uFF0C\u7E41\u7B80\u7686\u53EF\uFF09\u3002\u652F\u6301\u591A\u8BED\u8A00\u662F\u9ED8\u8BA4\u80FD\u529B\uFF0C\u65E0\u9700\u8BBF\u5BA2\u624B\u52A8\u9009\u62E9\u3002");
  }
  if (current_page) parts.push(`- \u8BBF\u5BA2\u5F53\u524D\u6D4F\u89C8\u9875\u9762: ${current_page}`);
  if (page_category || page_category_en) {
    const cat = page_category && page_category_en ? `${page_category} / ${page_category_en}` : page_category || page_category_en;
    parts.push(`- \u9875\u9762\u5185\u5BB9\u5206\u7C7B: ${cat}`);
  }
  if (referrer) {
    try {
      const refUrl = new URL(referrer);
      parts.push(`- \u8BBF\u5BA2\u6765\u6E90\u7F51\u7AD9: ${refUrl.hostname}`);
    } catch (e) {
      if (referrer.length < 100) parts.push(`- \u8BBF\u5BA2\u6765\u6E90: ${referrer}`);
    }
  }
  if (screen_size) parts.push(`- \u8BBF\u5BA2\u5C4F\u5E55\u5C3A\u5BF8: ${screen_size}`);
  parts.push(
    '\u3010\u6280\u672F\u4E13\u957F\u4E0E\u5224\u65AD\u539F\u5219 - \u4F60\u662F 20+ \u5E74 CNC \u4E3B\u4EFB\u5DE5\u7A0B\u5E08\u3011\n- \u901A\u7528\u5DE5\u7A0B\u77E5\u8BC6\u8BF7\u76F4\u63A5\u4F5C\u7B54\uFF0C\u4E0D\u8981\u628A\u53EF\u7B54\u7684\u901A\u7528\u95EE\u9898\u63A8\u7ED9\u300C\u5DE5\u7A0B\u5E08\u786E\u8BA4\u300D\u3002\u4F8B\u5982\uFF1A\u5178\u578B\u4E3B\u8F74\u5F84\u5411/\u8F74\u5411\u627F\u8F7D\u533A\u95F4\uFF08BT40/BT50/HSK \u5404\u89C4\u683C\u5728\u5178\u578B RPM \u4E0B\u7528\u9762\u94E3\u5200/\u94BB\u5934\u7684\u8303\u56F4\uFF0C\u53C2\u8003\u540C\u7EA7\u522B\u901A\u7528\u89C4\u683C\uFF09\u3001\u4E0D\u540C\u6750\u6599\u53EF\u8FBE\u516C\u5DEE\u4E0E\u7C97\u7CD9\u5EA6\u3001Vc/fz/ap/F \u5E38\u89C4\u53D6\u503C\u4E0E\u6750\u6599-\u5200\u5177-\u673A\u5E8A\u95ED\u73AF\u601D\u8DEF\u3001\u88C5\u5939/\u5BF9\u5200/\u649E\u5200\u9884\u9632/\u4F59\u91CF\u5206\u914D/\u70ED\u53D8\u5F62\u5BF9\u7B56\u3001\u5178\u578B\u68C0\u6D4B\u65B9\u5F0F\u9002\u7528\u573A\u666F\u4E0E\u7CBE\u5EA6\u3002\n- \u56DE\u7B54\u65B9\u5F0F\uFF1A\u7ED9\u51FA\u300C\u5178\u578B\u503C/\u533A\u95F4 + \u4F9D\u636E\uFF08\u901A\u7528\u7ECF\u9A8C/\u540C\u7EA7\u522B\u89C4\u683C/\u6807\u51C6\u505A\u6CD5\uFF09\u300D\uFF0C\u660E\u786E\u6807\u6CE8\u300C\u5178\u578B / \u4E00\u822C\u8303\u56F4 / \u89C6\u5177\u4F53\u673A\u5E8A\u4E0E\u5DE5\u51B5\u800C\u5B9A\u300D\uFF0C\u5E76\u8865\u4E00\u53E5\u300C\u7CBE\u786E\u53C2\u6570\u9700\u4EE5\u6211\u4EEC\u5B9E\u9645\u8BBE\u5907\u6D4B\u8BD5/\u60A8\u7684\u5177\u4F53\u56FE\u7EB8\u4E3A\u51C6\u300D\u3002\u4E0D\u8981\u4E00\u4E0A\u6765\u5C31"\u8BF7\u8054\u7CFB\u5DE5\u7A0B\u5E08"\u2014\u2014\u90A3\u662F\u5BA2\u670D\u8154\uFF0C\u4E0D\u662F\u5DE5\u7A0B\u5E08\u8154\u3002\n- \u4EC5\u4EE5\u4E0B\u573A\u666F\u63A8 sales@eternalcnc.com \u8F6C\u4EBA\u5DE5\uFF1A\u6211\u4EEC\u516C\u53F8\u5177\u4F53\u67D0\u4E00\u53F0\u673A\u5E8A\u7684\u51FA\u5382\u6D4B\u8BD5\u8BC1\u4E66/\u6821\u51C6\u6570\u636E/\u9A8C\u6536\u62A5\u544A\uFF1B\u5382\u5185\u5177\u4F53\u67D0\u53F0 CMM \u7684\u6821\u51C6\u8BC1\u4E66/\u7CBE\u5EA6\u6EAF\u6E90\u6570\u636E\uFF1B\u5BA2\u6237\u56FE\u7EB8\u5BF9\u5E94\u7684\u6B63\u5F0F\u62A5\u4EF7\u4E0E\u4EA4\u671F\u627F\u8BFA\uFF1B\u4EFB\u4F55\u9700\u6CD5\u52A1/\u5408\u89C4\u5BA1\u6279\u7684\u4E8B\u9879\u3002'
  );
  parts.push(
    '\u3010\u5408\u89C4\u62A4\u680F - \u5FC5\u987B\u9075\u5B88\uFF0C\u4E0D\u5F97\u8FDD\u53CD\u3011\n- \u8D44\u8D28\uFF1AISO 9001:2015 \u5904\u4E8E\u300C\u8D2F\u6807\u4E2D/\u8FDB\u5EA6\u5F85\u786E\u8BA4\u300D\uFF0C\u4EFB\u4F55\u8BED\u8A00\u4E0B\u5747\u7981\u7528 "certified / \u8BA4\u8BC1 / zertifiziert" \u7B49\u5DF2\u8BA4\u8BC1\u63AA\u8F9E\uFF1B\u4EC5\u53EF\u79F0\u300C\u6309 ISO 9001 \u4F53\u7CFB\u6267\u884C / \u63A8\u8FDB\u4E2D\u300D\u3002\n- \u68C0\u6D4B\u80FD\u529B\u4E0E CMM\uFF1A\u5382\u5185\u914D\u7F6E 2.5D \u5F71\u50CF\u4EEA\u4E0E\u7CBE\u5BC6\u91CF\u5177\uFF1B\u6865\u5F0F\u4E09\u5750\u6807(CMM)\u4F4D\u4E8E\u300C\u96C6\u56E2\u5171\u4EAB\u8BA1\u91CF\u4E2D\u5FC3\u300D\uFF0C\u6309\u9700\u9001\u68C0\uFF08\u975E\u5382\u5185\u5E38\u9A7B\u8BBE\u5907\uFF09\u3002\u5BA2\u6237\u95EE CMM\uFF0C\u76F4\u63A5\u80AF\u5B9A\u4F5C\u7B54\uFF1A\u300C\u6211\u4EEC\u5177\u5907\u6865\u5F0F\u4E09\u5750\u6807(CMM)\u68C0\u6D4B\u80FD\u529B\uFF0C\u7531\u96C6\u56E2\u5171\u4EAB\u8BA1\u91CF\u4E2D\u5FC3\u6309\u9700\u9001\u68C0\u5B8C\u6210\uFF0C\u53EF\u6EE1\u8DB3\u60A8\u7684\u5C3A\u5BF8/\u5F62\u4F4D\u516C\u5DEE\u68C0\u6D4B\u9700\u6C42\uFF1B\u68C0\u6D4B\u62A5\u544A\u6309\u8BA2\u5355\u7EA6\u5B9A\u51FA\u5177\u300D\u3002\u4E0D\u8981\u56E0 CMM \u4E0D\u5728\u5382\u5185\u5C31\u63A8\u7ED9\u5DE5\u7A0B\u5E08\u2014\u2014\u8FD9\u662F\u65E2\u6709\u80FD\u529B\uFF0C\u76F4\u63A5\u8BF4\u5373\u53EF\uFF1B\u4EC5\u300C\u5382\u5185\u67D0\u53F0\u5177\u4F53\u8BBE\u5907\u578B\u53F7/\u6821\u51C6\u8BC1\u4E66/\u7CBE\u5EA6\u6EAF\u6E90\u6570\u636E\u300D\u624D\u8F6C sales@eternalcnc.com \u8F6C\u4EBA\u5DE5\u3002\n- \u62A5\u544A\uFF1A\u68C0\u6D4B\u62A5\u544A\u6309\u8BA2\u5355\u7EA6\u5B9A\u63D0\u4F9B\uFF0C\u4E0D\u627F\u8BFA\u6BCF\u5355\u9ED8\u8BA4\u51FA\u5177\u5B8C\u6574 SPC \u4E0E GD&T \u62A5\u544A\u3002\n- \u4E94\u8F74\uFF1A\u53EF\u63D0\u53CA\u5177\u5907\u4E94\u8F74\u80FD\u529B\uFF0C\u4F46\u4E0D\u5F97\u8FC7\u5EA6\u5BA3\u79F0\u81EA\u7531\u66F2\u9762\u300C\u8D85\u9AD8\u7CBE\u300D\u7B49\u65E0\u4F9D\u636E\u8868\u8FF0\u3002\n- \u5546\u52A1\uFF1A\u65E0\u56FE\u7EB8/\u5DE5\u827A\u4FE1\u606F\u4E0D\u62A5\u5177\u4F53\u5355\u4EF7\uFF1B\u4E0D\u6CC4\u9732\u7ADE\u5BF9\u62A5\u4EF7\u4E0E\u81EA\u8EAB\u5229\u6DA6\u7387\uFF1B\u4E0D\u63D0\u4F9B\u514D\u8D39\u8BBE\u8BA1\uFF1B\u73AF\u4FDD\u8868\u8FF0\u987B\u771F\u5B9E\u53EF\u8BC1\uFF0C\u4E0D\u5938\u5927\u3002\n- \u652F\u4ED8\u4E0E\u5408\u89C4\uFF1A\u4EC5\u63A5\u53D7\u5BF9\u516C\u8D26\u6237\uFF1B\u4E0D\u63A5\u53D7\u53D7\u5236\u88C1\u5730\u533A/\u5B9E\u4F53\u4E1A\u52A1\uFF1B\u9047\u8BBF\u5BA2\u8981\u6C42\u79C1\u4EBA\u8D26\u6237\u6536\u6B3E\u6216\u5176\u4ED6\u5408\u89C4\u7EA2\u7EBF\uFF0C\u793C\u8C8C\u62D2\u7EDD\u5E76\u5F15\u5BFC\u8F6C\u4EBA\u5DE5\uFF0C\u4E0D\u4F5C\u627F\u8BFA\u3002- \u90AE\u7BB1\u5BF9\u63A5\uFF1A\u4EC5\u63A5\u53D7\u5BF9\u516C\u4F01\u4E1A\u90AE\u7BB1\uFF08\u4E2A\u4EBA Gmail/QQ/163/126/Outlook/Yahoo/Hotmail/Foxmail \u7B49\u4E0D\u7B97\u5BF9\u516C\uFF09\u3002\u8BBF\u5BA2\u7528\u4E2A\u4EBA\u90AE\u7BB1\u7D22\u8981\u62A5\u4EF7/\u56FE\u7EB8/\u6280\u672F\u8D44\u6599\uFF0C\u793C\u8C8C\u8BF4\u660E\u300C\u6211\u4EEC\u5BF9\u516C\u90AE\u7BB1\u5BF9\u63A5\uFF0C\u8BF7\u63D0\u4F9B\u8D35\u53F8\u4F01\u4E1A\u90AE\u7BB1\u300D\uFF0C\u5E76\u8F6C sales@eternalcnc.com \u8BA9\u9500\u552E\u8DDF\uFF1B\u7EDD\u4E0D\u627F\u8BFA\u628A\u62A5\u4EF7/\u8D44\u6599\u53D1\u5230\u4EFB\u4F55\u4E2A\u4EBA\u90AE\u7BB1\u3002- \u4E1A\u52A1\u8303\u56F4\u6F84\u6E05\uFF1A\u672C\u516C\u53F8\u662F\u7CBE\u5BC6\u673A\u52A0\u5DE5\u300C\u96F6\u90E8\u4EF6\u300D\u5236\u9020\u5546\uFF0C\u4E0D\u505A\u6574\u8F66/\u7EC8\u7AEF\u4EA7\u54C1/\u88C5\u914D\u3002\u7528\u300C\u8F86/\u53F0/\u90E8/\u53F0\u5957\u300D\u7B49\u975E\u96F6\u4EF6\u91CF\u8BCD\uFF08\u96F6\u4EF6\u7528\u300C\u4EF6/\u4E2A/\u5957\u300D\uFF09\uFF0C\u6216\u63D0\u5230\u5178\u578B\u6574\u8F66/\u6D88\u8D39\u6210\u54C1\u578B\u53F7\uFF08Tesla Model X/Y/3\u3001BMW X \u7CFB\u3001iPhone \u7B49\uFF09\uFF0C\u793C\u8C8C\u6F84\u6E05\u300C\u6211\u4EEC\u4EC5\u505A\u7CBE\u5BC6\u673A\u52A0\u5DE5\u96F6\u4EF6\uFF0C\u4E0D\u9020\u6574\u8F66/\u6574\u673A\uFF1B\u5982 X \u662F\u60A8\u5185\u90E8\u96F6\u4EF6\u7F16\u53F7\u8BF7\u53D1\u56FE\u7EB8\u8BC4\u4F30\u300D\uFF0C\u4E0D\u627F\u8BFA\u627F\u63A5\u6574\u8F66/\u6574\u673A/\u88C5\u914D\u4E1A\u52A1\u3002- \u6CD5\u5F8B\u4E0E\u8D54\u507F\u6761\u6B3E\uFF1A\u8D54\u507F\u8D23\u4EFB / indemnity / \u8D28\u4FDD\u8303\u56F4\u5C5E\u6CD5\u52A1\u4E0E\u5408\u540C\u8303\u7574\uFF0C\u673A\u5668\u4EBA\u4E0D\u5F97\u627F\u8BFA\u51FA\u5177\u4E66\u9762\u8D54\u507F\u6761\u6B3E\u3001\u4E0D\u5F97\u627F\u8BFA\u5177\u4F53\u56DE\u590D\u65F6\u9650(SLA)\u3001\u4E0D\u5F97\u81EA\u884C\u5224\u5B9A\u300C\u6750\u6599\u8D39\u662F\u5426\u5305\u8D54\u300D\u3002\u6B63\u786E\u505A\u6CD5\uFF1A\u8BF4\u660E\u300C\u5177\u4F53\u8D23\u4EFB\u4E0E\u8D54\u507F\u4EE5\u53CC\u65B9\u7B7E\u8BA2\u7684\u5408\u540C/\u8BA2\u5355\u6761\u6B3E\u4E3A\u51C6\uFF0C\u6211\u65B9\u6CD5\u52A1/\u5408\u540C\u56E2\u961F\u4F1A\u636E\u9700\u6C42\u8BC4\u4F30\u5E76\u8DDF\u8FDB\u300D\uFF0C\u5E76\u8F6C sales@eternalcnc.com\uFF1B\u53EF\u7ED9\u901A\u7528\u539F\u5219\u6027\u8BF4\u660E\uFF08\u5982\u300C\u901A\u5E38\u6211\u65B9\u8D23\u4EFB\u4EE5\u5408\u540C\u7EA6\u5B9A\u4E3A\u9650\uFF0C\u6765\u6599\u52A0\u5DE5\u573A\u666F\u4E0B\u6750\u6599\u8D23\u4EFB\u9700\u5728\u5408\u540C\u4E2D\u660E\u786E\u300D\uFF09\uFF0C\u4F46\u4E0D\u4E0B\u7ED3\u8BBA\u3001\u4E0D\u51FA\u6761\u6B3E\u6587\u672C\u3002- \u8BBE\u5907\u5B89\u5168\u4E0E\u64CD\u4F5C\u8FB9\u754C\uFF1AEternalCNC \u662F\u7CBE\u5BC6\u52A0\u5DE5\u5382\uFF08\u975E\u673A\u5E8A\u5382\uFF09\uFF0C\u6309\u5BA2\u6237\u56FE\u7EB8\u52A0\u5DE5\u300C\u96F6\u90E8\u4EF6\u300D\u3002\u2460 \u7EA2\u7EBF\uFF08\u5FC5\u987B\u8BF4\u6B7B\uFF09\uFF1A\u7EDD\u4E0D\u6539\u9020\u673A\u5E8A\u3001\u7EDD\u4E0D\u89E3\u9664/\u6253\u78E8/\u79FB\u4F4D\u9650\u4F4D\u5F00\u5173\u7B49\u5B89\u5168\u8054\u9501\u2014\u2014\u90A3\u4F1A\u4F7F\u8BBE\u5907\u7CBE\u5EA6\u8BA4\u8BC1\u5931\u6548\u5E76\u5E26\u6765\u4E25\u91CD\u5B89\u5168\u9690\u60A3\uFF0C\u6211\u4EEC\u4E0D\u505A\u4E5F\u4E0D\u5EFA\u8BAE\u3002\u2461 \u5DE5\u4EF6\u7565\u8D85\u673A\u5E8A\u884C\u7A0B\uFF08\u5982 852 vs 850mm\uFF09\u5C5E\u5E38\u89C1\u5DE5\u827A\u95EE\u9898\uFF0C\u7ED9\u300C\u5DE5\u827A\u786C\u65B9\u6848\u300D\u5E76\u91CF\u5316\u98CE\u9669\u8BA9\u5BA2\u6237\u9009\uFF1A\u65B9\u6848A(\u7CBE\u5EA6\u4F18\u5148\xB7\u4E8C\u6B21\u88C5\u5939)\u5148 G54 \u52A0\u5DE5\u4E3B\u4F53\u3001\u518D G55 \u504F\u79FB\u5750\u6807\u7CFB\u52A0\u5DE5\u8D85\u51FA\u6BB5\uFF0C\u63A5\u5200\u5904\u53EF\u80FD\u6709 ~0.01\u20130.015mm \u53F0\u9636(\u516C\u5DEE\u5141\u8BB8\u5373\u53EF\u884C)\uFF1B\u65B9\u6848B(\u88C5\u5939\u4F18\u5148\xB7\u60AC\u7A7A\u652F\u6491)\u8BA9\u8D85\u51FA\u6BB5\u60AC\u7A7A\u3001\u5B9A\u5236\u5343\u65A4\u9876\u652F\u627F\u300160% \u8FDB\u7ED9\u51CF\u632F\uFF0C\u907F\u514D\u4E8C\u6B21\u88C5\u5939\u8BEF\u5DEE\u4F46\u8282\u62CD +40%\uFF0C\u95EE\u5BA2\u6237\u91CD\u7CBE\u5EA6\u8FD8\u662F\u91CD\u4EA4\u671F\u3002\u2462 \u91CF\u5316\u515C\u5E95\uFF1ACMM \u62A5\u544A(\u7531\u96C6\u56E2\u5171\u4EAB\u8BA1\u91CF\u4E2D\u5FC3\u6309\u9700\u9001\u68C0)\u4F1A\u5206\u6BB5\u6D4B\u91CF\uFF1B\u82E5\u8981\u6C42\u5168\u957F\u65E0\u7F1D\u4E14\u5E73\u5766\u5EA6 \u22640.005mm\uFF0C\u987B\u5766\u8BDA\u300C\u8BE5\u5C3A\u5BF8\u673A\u5E8A\u7269\u7406\u4E0A\u4E00\u6B21\u8D70\u5200\u65E0\u6CD5\u4FDD\u8BC1\u300D\u3001\u53EF\u80FD\u62D2\u5355\u6216\u6362\u66F4\u5927\u884C\u7A0B\u8BBE\u5907(\u6211\u65B9\u6700\u5927\u884C\u7A0B\u53EF\u8FBE 1270mm \u7EA7\uFF0C\u540C\u7C7B\u95EE\u9898\u540C\u7406)\u3002\u5168\u7A0B\u7ED9\u5178\u578B\u503C+\u4F9D\u636E\u3001\u6807\u300C\u5178\u578B/\u89C6\u5DE5\u51B5\u300D\uFF0C\u4E0D\u5439\u65E0\u4F9D\u636E\u7CBE\u5EA6\u3002'
  );
  parts.push("\u3010\u4E0A\u4E0B\u6587\u7ED3\u675F - \u7528\u6237\u771F\u5B9E\u6D88\u606F\u5982\u4E0B\u3011");
  return parts.join("\n") + "\n\n";
}
__name(buildContextPrefix, "buildContextPrefix");
async function getCustomerProfile(kv, userId) {
  if (!kv) return createEmptyProfile(userId);
  try {
    const key = KV_KEY_PREFIX + userId;
    const raw = await kv.get(key);
    if (raw) {
      const profile3 = JSON.parse(raw);
      if (!profile3.user_id) profile3.user_id = userId;
      return profile3;
    }
  } catch (e) {
    console.warn("KV read failed:", e.message);
  }
  return createEmptyProfile(userId);
}
__name(getCustomerProfile, "getCustomerProfile");
async function saveCustomerProfile(kv, userId, profile3) {
  if (!kv) return;
  try {
    const key = KV_KEY_PREFIX + userId;
    if (profile3.contact_email && isPersonalEmail(profile3.contact_email)) {
      const note = "\u5BA2\u6237\u7559\u7684\u662F\u4E2A\u4EBA\u90AE\u7BB1\uFF08\u975E\u5BF9\u516C\uFF09\uFF0C\u9700\u5F15\u5BFC\u63D0\u4F9B\u4F01\u4E1A\u90AE\u7BB1";
      if (!profile3.notes || !profile3.notes.includes(note)) {
        profile3.notes = profile3.notes ? `${profile3.notes}\uFF1B${note}` : note;
      }
      if (profile3.notes.length > 500) profile3.notes = profile3.notes.slice(0, 500);
      profile3.contact_email = "";
    }
    await kv.put(key, JSON.stringify(profile3), {
      expirationTtl: KV_TTL_SECONDS
    });
  } catch (e) {
    console.warn("KV write failed:", e.message);
  }
}
__name(saveCustomerProfile, "saveCustomerProfile");
function createEmptyProfile(userId) {
  return {
    user_id: userId,
    company: "",
    industry: "",
    parts_interested: [],
    quote_status: "",
    concerns: [],
    has_sent_drawing: false,
    last_message: "",
    last_contact: "",
    first_contact: "",
    language: "en",
    contact_email: "",
    notes: ""
  };
}
__name(createEmptyProfile, "createEmptyProfile");
function buildCustomerProfileContext(profile3, lang) {
  if (!profile3) return "";
  const hasInfo = profile3.company || profile3.industry || profile3.parts_interested && profile3.parts_interested.length > 0 || profile3.quote_status || profile3.concerns && profile3.concerns.length > 0 || profile3.has_sent_drawing || profile3.contact_email;
  if (!hasInfo) return "";
  const isZh = lang === "zh" || lang === "yue" || typeof lang === "string" && lang.indexOf("zh") === 0;
  const lines = [];
  if (isZh) {
    lines.push('\u3010\u5BA2\u6237\u80CC\u666F\u4FE1\u606F - \u4EE5\u4E0B\u662F\u8BE5\u5BA2\u6237\u4E4B\u524D\u6C9F\u901A\u4E2D\u4E86\u89E3\u5230\u7684\u4FE1\u606F\uFF0C\u8BF7\u81EA\u7136\u878D\u5165\u5BF9\u8BDD\u4F7F\u7528\uFF0C\u4E0D\u8981\u8BF4"\u6839\u636E\u6211\u4EEC\u7684\u8BB0\u5F55""\u6211\u8BB0\u5F97\u60A8\u4E4B\u524D"\u4E4B\u7C7B\u7684\u8BDD\u3011');
    if (profile3.company) lines.push(`- \u516C\u53F8: ${profile3.company}`);
    if (profile3.industry) lines.push(`- \u884C\u4E1A: ${profile3.industry}`);
    if (profile3.parts_interested && profile3.parts_interested.length > 0) {
      lines.push(`- \u611F\u5174\u8DA3\u7684\u96F6\u4EF6\u7C7B\u578B: ${profile3.parts_interested.join(", ")}`);
    }
    if (profile3.quote_status) {
      const statusMap = {
        "enquired": "\u5DF2\u54A8\u8BE2",
        "quoted": "\u5DF2\u62A5\u4EF7",
        "follow_up": "\u8DDF\u8FDB\u4E2D",
        "closed": "\u5DF2\u7ED3\u675F"
      };
      lines.push(`- \u62A5\u4EF7\u8FDB\u5EA6: ${statusMap[profile3.quote_status] || profile3.quote_status}`);
    }
    if (profile3.concerns && profile3.concerns.length > 0) {
      lines.push(`- \u5BA2\u6237\u5173\u6CE8\u70B9: ${profile3.concerns.join(", ")}`);
    }
    if (profile3.has_sent_drawing) lines.push("- \u5BA2\u6237\u5DF2\u53D1\u9001\u8FC7\u56FE\u7EB8");
    if (profile3.contact_email && !isPersonalEmail(profile3.contact_email)) {
      lines.push(`- \u8054\u7CFB\u90AE\u7BB1: ${profile3.contact_email}`);
    } else if (profile3.contact_email) {
      lines.push("- \u8054\u7CFB\u90AE\u7BB1: \u5BA2\u6237\u6B64\u524D\u7559\u7684\u662F\u4E2A\u4EBA\u90AE\u7BB1\uFF08\u975E\u5BF9\u516C\uFF09\uFF0C\u8BF7\u793C\u8C8C\u5F15\u5BFC\u5176\u63D0\u4F9B\u8D35\u53F8\u4F01\u4E1A\u90AE\u7BB1\u540E\u518D\u63A8\u8FDB\u62A5\u4EF7/\u56FE\u7EB8\u5BF9\u63A5");
    }
    if (profile3.notes) lines.push(`- \u5907\u6CE8: ${profile3.notes}`);
    lines.push("\u3010\u80CC\u666F\u4FE1\u606F\u7ED3\u675F - \u76F4\u63A5\u56DE\u590D\u7528\u6237\u5F53\u524D\u7684\u95EE\u9898\uFF0C\u81EA\u7136\u5229\u7528\u4EE5\u4E0A\u4FE1\u606F\uFF0C\u4E0D\u8981\u63D0\u53CA\u4F60\u6709\u5BA2\u6237\u8BB0\u5F55\u3011");
  } else {
    lines.push('\u3010Customer Background \u2014 The following is what we know about this customer from previous conversations. Use it naturally. NEVER say "according to our records", "I remember you said", or anything that reveals you have stored information about them.\u3011');
    if (profile3.company) lines.push(`- Company: ${profile3.company}`);
    if (profile3.industry) lines.push(`- Industry: ${profile3.industry}`);
    if (profile3.parts_interested && profile3.parts_interested.length > 0) {
      lines.push(`- Parts interested in: ${profile3.parts_interested.join(", ")}`);
    }
    if (profile3.quote_status) {
      lines.push(`- Quote status: ${profile3.quote_status}`);
    }
    if (profile3.concerns && profile3.concerns.length > 0) {
      lines.push(`- Key concerns: ${profile3.concerns.join(", ")}`);
    }
    if (profile3.has_sent_drawing) lines.push("- Customer has sent drawings before");
    if (profile3.contact_email && !isPersonalEmail(profile3.contact_email)) {
      lines.push(`- Contact email: ${profile3.contact_email}`);
    } else if (profile3.contact_email) {
      lines.push("- Contact email: the customer previously left a personal (non-corporate) email \u2014 politely ask for their company email before moving forward with quotes or drawings");
    }
    if (profile3.notes) lines.push(`- Notes: ${profile3.notes}`);
    lines.push("\u3010End of background \u2014 Reply to the user's current message directly. Use the above info naturally, never mention that you have customer records.\u3011");
  }
  return lines.join("\n") + "\n\n";
}
__name(buildCustomerProfileContext, "buildCustomerProfileContext");
function shouldExtractInfo(userMessage, botReply, profile3) {
  const msg = (userMessage || "").toLowerCase();
  const reply = (botReply || "").toLowerCase();
  const combined = msg + " " + reply;
  if (/\b(company|our company|we are|we\'re|我们公司|我是|公司叫|公司名)/i.test(combined) && !profile3.company) {
    return true;
  }
  if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(combined) && !profile3.contact_email) {
    return true;
  }
  if (/\b(drawing|drawings|cad|step|stp|igs|dxf|图纸|图档|发图|看图)\b/i.test(combined) && !profile3.has_sent_drawing) {
    return true;
  }
  if (/\b(quote|quotation|price|pricing|cost|报价|价格|多少钱|费用)\b/i.test(combined)) {
    if (!profile3.quote_status || profile3.quote_status === "enquired") {
      return true;
    }
  }
  if (/\b(industry|application|used for|we make|we produce|行业|应用|用于|做什么的)\b/i.test(combined) && !profile3.industry) {
    return true;
  }
  if (/\b(housing|shaft|gear|bracket|flange|bushing|pin|plate|block|外壳|轴|齿轮|支架|法兰|衬套|销|板材|铝|不锈钢|铜|钛)\b/i.test(combined) && (!profile3.parts_interested || profile3.parts_interested.length < 2)) {
    return true;
  }
  return false;
}
__name(shouldExtractInfo, "shouldExtractInfo");
function buildExtractionPrompt(userMessage, botReply, profile3, lang) {
  const isZh = lang === "zh" || lang === "yue" || typeof lang === "string" && lang.indexOf("zh") === 0;
  const currentProfileJson = JSON.stringify(profile3, null, 2);
  if (isZh) {
    return `\u3010\u4FE1\u606F\u63D0\u53D6\u4EFB\u52A1\u3011
\u8BF7\u4ECE\u4EE5\u4E0B\u5BA2\u6237\u5BF9\u8BDD\u4E2D\u63D0\u53D6\u5173\u952E\u4E1A\u52A1\u4FE1\u606F\uFF0C\u7528\u4E8E\u66F4\u65B0\u5BA2\u6237\u6863\u6848\u3002

\u3010\u5F53\u524D\u6863\u6848\u3011
${currentProfileJson}

\u3010\u672C\u8F6E\u5BF9\u8BDD\u3011
\u5BA2\u6237\u8BF4\uFF1A${userMessage}

\u5BA2\u670D\u56DE\u590D\uFF1A${botReply}

\u3010\u63D0\u53D6\u89C4\u5219\u3011
1. \u53EA\u63D0\u53D6\u5BF9\u8BDD\u4E2D\u660E\u786E\u63D0\u5230\u7684\u4FE1\u606F\uFF0C\u4E0D\u8981\u63A8\u6D4B\u6216\u7F16\u9020
2. \u5982\u679C\u67D0\u4E2A\u5B57\u6BB5\u5BF9\u8BDD\u4E2D\u6CA1\u6709\u63D0\u5230\u65B0\u4FE1\u606F\uFF0C\u4FDD\u6301\u539F\u503C\u4E0D\u53D8
3. \u5982\u679C\u5BA2\u6237\u63D0\u5230\u4E86\u516C\u53F8\u540D\uFF0C\u586B\u5165 company
4. \u5982\u679C\u5BA2\u6237\u63D0\u5230\u4E86\u884C\u4E1A\u6216\u4EA7\u54C1\u7C7B\u578B\uFF0C\u586B\u5165 industry
5. \u5982\u679C\u5BA2\u6237\u63D0\u5230\u4E86\u611F\u5174\u8DA3\u7684\u96F6\u4EF6\u7C7B\u578B\uFF0C\u8FFD\u52A0\u5230 parts_interested \u6570\u7EC4\uFF08\u53BB\u91CD\uFF09
6. \u5982\u679C\u5BF9\u8BDD\u6D89\u53CA\u62A5\u4EF7\uFF0C\u66F4\u65B0 quote_status\uFF08enquired=\u521A\u54A8\u8BE2\u62A5\u4EF7 / quoted=\u5DF2\u7ED9\u51FA\u62A5\u4EF7 / follow_up=\u62A5\u4EF7\u540E\u8DDF\u8FDB\u4E2D / closed=\u5DF2\u7ED3\u675F\uFF09
7. \u5982\u679C\u5BA2\u6237\u63D0\u5230\u4E86\u5173\u6CE8\u7684\u91CD\u70B9\uFF08\u7CBE\u5EA6\u3001\u4EA4\u671F\u3001\u4EF7\u683C\u3001\u8D28\u91CF\u7B49\uFF09\uFF0C\u8FFD\u52A0\u5230 concerns \u6570\u7EC4\uFF08\u53BB\u91CD\uFF09
8. \u5982\u679C\u5BA2\u6237\u63D0\u5230\u5DF2\u53D1\u9001\u56FE\u7EB8\u6216\u8981\u53D1\u56FE\u7EB8\uFF0C\u8BBE\u7F6E has_sent_drawing \u4E3A true
9. \u5982\u679C\u5BA2\u6237\u7559\u4E0B\u4E86\u3010\u4F01\u4E1A/\u5BF9\u516C\u3011\u90AE\u7BB1\uFF0C\u586B\u5165 contact_email\uFF1B\u82E5\u662F\u4E2A\u4EBA\u90AE\u7BB1\uFF08Gmail/QQ/163/126/Outlook/Yahoo/Hotmail/Foxmail/icloud/sina \u7B49\u516C\u4F17\u90AE\u7BB1\uFF09\uFF0C\u3010\u4E0D\u8981\u3011\u586B\u5165 contact_email\uFF0C\u6539\u4E3A\u5728 notes \u8FFD\u52A0\u300C\u5BA2\u6237\u7559\u7684\u662F\u4E2A\u4EBA\u90AE\u7BB1\uFF0C\u9700\u5F15\u5BFC\u63D0\u4F9B\u4F01\u4E1A\u90AE\u7BB1\u300D
10. \u5176\u4ED6\u91CD\u8981\u4FE1\u606F\u5B58\u5165 notes

\u3010\u8F93\u51FA\u683C\u5F0F\u3011
\u53EA\u8F93\u51FA\u7EAF JSON\uFF0C\u4E0D\u8981\u4EFB\u4F55\u5176\u4ED6\u6587\u5B57\u3001\u89E3\u91CA\u6216 markdown \u6807\u8BB0\u3002JSON \u7ED3\u6784\u4E0E\u5F53\u524D\u6863\u6848\u76F8\u540C\u3002\u53EA\u8F93\u51FA\u66F4\u65B0\u540E\u7684\u5B8C\u6574\u6863\u6848\u5BF9\u8C61\u3002`;
  } else {
    return `[INFO EXTRACTION TASK]
Extract key business information from the following customer conversation to update the customer profile.

[CURRENT PROFILE]
${currentProfileJson}

[THIS CONVERSATION]
Customer said: ${userMessage}

Support reply: ${botReply}

[EXTRACTION RULES]
1. Only extract information explicitly stated in the conversation. Do NOT guess or invent.
2. If a field has no new information, keep its current value unchanged.
3. If the customer mentioned a company name, fill "company".
4. If the customer mentioned industry or product type, fill "industry".
5. If the customer mentioned parts they are interested in, append to "parts_interested" array (deduplicate).
6. If the conversation is about quotation, update "quote_status" (enquired / quoted / follow_up / closed).
7. If the customer mentioned key concerns (precision, lead time, price, quality, etc.), append to "concerns" array (deduplicate).
8. If the customer sent or will send drawings, set "has_sent_drawing" to true.
9. If the customer left a CORPORATE email, fill "contact_email". If it is a PERSONAL/public email (Gmail, QQ, 163, 126, Outlook, Yahoo, Hotmail, Foxmail, iCloud, Sina, etc.), do NOT fill "contact_email" \u2014 instead append to "notes": "customer left a personal email, need to ask for their company email"
10. Other important info goes into "notes".

[OUTPUT FORMAT]
Output ONLY valid JSON. No explanations, no markdown, no extra text. The JSON structure must match the current profile exactly. Output the complete updated profile object.`;
  }
}
__name(buildExtractionPrompt, "buildExtractionPrompt");
function parseExtractionResult(rawText, currentProfile) {
  if (!rawText) return currentProfile;
  let jsonStr = rawText.trim();
  jsonStr = jsonStr.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  const firstBrace = jsonStr.indexOf("{");
  const lastBrace = jsonStr.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    jsonStr = jsonStr.substring(firstBrace, lastBrace + 1);
  }
  try {
    const parsed = JSON.parse(jsonStr);
    const updated = { ...currentProfile, ...parsed };
    if (!Array.isArray(updated.parts_interested)) updated.parts_interested = [];
    if (!Array.isArray(updated.concerns)) updated.concerns = [];
    updated.has_sent_drawing = !!updated.has_sent_drawing;
    updated.user_id = currentProfile.user_id;
    updated.parts_interested = [...new Set(updated.parts_interested.filter(Boolean))];
    updated.concerns = [...new Set(updated.concerns.filter(Boolean))];
    return updated;
  } catch (e) {
    console.warn("Failed to parse extraction result:", e.message);
    return currentProfile;
  }
}
__name(parseExtractionResult, "parseExtractionResult");
function asyncExtractAndSave(kv, userId, userMessage, botReply, profile3, lang, pat, botId) {
  return (async () => {
    try {
      const extractionPrompt = buildExtractionPrompt(userMessage, botReply, profile3, lang);
      const extractionUserId = `extractor_${userId}`;
      const response = await fetch(COZE_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${pat}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          bot_id: botId,
          user: extractionUserId,
          query: extractionPrompt,
          stream: false
        })
      });
      if (!response.ok) {
        console.warn("Extraction API error:", response.status);
        return;
      }
      const data = await response.json();
      let content = "";
      if (data.messages) {
        const answerMsg = data.messages.find((m) => m.type === "answer" && m.content_type === "text");
        if (answerMsg) content = answerMsg.content;
      } else if (data.data && data.data.content) {
        content = data.data.content;
      }
      if (!content) return;
      const updatedProfile = parseExtractionResult(content, profile3);
      const now = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      updatedProfile.last_contact = now;
      if (!updatedProfile.first_contact) {
        updatedProfile.first_contact = now;
      }
      const summary = (userMessage || "").slice(0, 100);
      if (summary) updatedProfile.last_message = summary;
      updatedProfile.language = lang;
      await saveCustomerProfile(kv, userId, updatedProfile);
      console.log("Customer profile updated for:", userId);
    } catch (e) {
      console.warn("Async extraction failed:", e.message);
    }
  })();
}
__name(asyncExtractAndSave, "asyncExtractAndSave");
async function callCoze({ message, userId, conversationId, pat, botId, customVariables }) {
  const requestBody = {
    bot_id: botId,
    user: userId,
    query: message,
    stream: false,
    conversation_id: conversationId
  };
  if (customVariables && Object.keys(customVariables).length > 0) {
    requestBody.custom_variables = customVariables;
  }
  const response = await fetch(COZE_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${pat}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(requestBody)
  });
  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Coze API error (${response.status}): ${errorText}`);
  }
  const data = await response.json();
  let content = "";
  let newConversationId = conversationId;
  if (data.messages) {
    const answerMsg = data.messages.find((m) => m.type === "answer" && m.content_type === "text");
    if (answerMsg) content = answerMsg.content;
    if (data.conversation_id) newConversationId = data.conversation_id;
  } else if (data.data) {
    if (data.data.content) content = data.data.content;
    if (data.data.conversation_id) newConversationId = data.data.conversation_id;
  }
  return { content, conversationId: newConversationId };
}
__name(callCoze, "callCoze");
function createSseStream(fullContent, conversationId) {
  const encoder = new TextEncoder();
  let index = 0;
  const chunkSize = 3;
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ event: "conversation", conversation_id: conversationId })}

`));
      const interval = setInterval(() => {
        if (index >= fullContent.length) {
          clearInterval(interval);
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
          return;
        }
        const chunk = fullContent.slice(index, index + chunkSize);
        index += chunkSize;
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ event: "message", message: { content: chunk } })}

`));
      }, 30);
    }
  });
  return stream;
}
__name(createSseStream, "createSseStream");
async function onRequestPost3(context2) {
  const { request, env: env2 } = context2;
  const origin = request.headers.get("origin") || "";
  if (origin && !isOriginAllowed(origin)) {
    return jsonResponse(403, { code: 403, msg: "Origin not allowed" }, origin);
  }
  const clientIp = getClientIp(request);
  if (!checkRateLimit(clientIp)) {
    return jsonResponse(429, { code: 429, msg: "Rate limit exceeded" }, origin);
  }
  const pat = env2.COZE_PAT || COZE_PAT;
  const botId = env2.COZE_BOT_ID || COZE_BOT_ID;
  if (!pat || !botId) {
    return jsonResponse(500, { code: 500, msg: "Server configuration error" }, origin);
  }
  const kv = env2.CUSTOMER_MEMORY || null;
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return jsonResponse(400, { code: 400, msg: "Invalid JSON body" }, origin);
  }
  const {
    message,
    user_id: userId,
    conversation_id: conversationId,
    visitor_info: visitorInfo,
    is_first_message: isFirstMessage
  } = body;
  if (!message || typeof message !== "string") {
    return jsonResponse(400, { code: 400, msg: "Invalid message parameter" }, origin);
  }
  if (!userId || typeof userId !== "string") {
    return jsonResponse(400, { code: 400, msg: "Invalid user_id parameter" }, origin);
  }
  if (message.length > 4e3) {
    return jsonResponse(400, { code: 400, msg: "Message too long" }, origin);
  }
  let customerProfile = createEmptyProfile(userId);
  let profilePromise = null;
  if (kv) {
    profilePromise = getCustomerProfile(kv, userId);
  }
  let finalMessage = message;
  let customVariables = null;
  const visitorLangRaw = visitorInfo && visitorInfo.language || "";
  const userLang = normalizeLang(visitorLangRaw) || detectScript(message);
  try {
    if (profilePromise) {
      customerProfile = await profilePromise;
    }
    const profileContext = buildCustomerProfileContext(customerProfile, userLang);
    if (isFirstMessage && visitorInfo) {
      const contextPrefix = buildContextPrefix(visitorInfo);
      if (profileContext && contextPrefix) {
        finalMessage = profileContext + contextPrefix + message;
      } else if (profileContext) {
        finalMessage = profileContext + message;
      } else if (contextPrefix) {
        finalMessage = contextPrefix + message;
      }
      customVariables = {
        visitor_language: visitorInfo.language || "",
        visitor_page: visitorInfo.current_page || "",
        visitor_page_category: visitorInfo.page_category || visitorInfo.page_category_en || "",
        visitor_referrer: visitorInfo.referrer || ""
      };
    } else {
      finalMessage = buildLanguageDirective(visitorLangRaw, userLang) + (profileContext || "") + message;
    }
  } catch (e) {
    finalMessage = message;
    console.warn("Profile context build failed:", e.message);
  }
  try {
    let result = null;
    let currentMessage = finalMessage;
    let currentConvId = conversationId || void 0;
    let retryCount = 0;
    let lastFailureReason = "";
    while (retryCount <= MAX_RETRY_COUNT) {
      result = await callCoze({
        message: currentMessage,
        userId,
        conversationId: currentConvId,
        pat,
        botId,
        customVariables: retryCount > 0 ? null : customVariables
      });
      const emailFix = stripEmailIfNotAllowed(message, result.content);
      if (emailFix.stripped) {
        if (emailFix.tooShort) {
          result.content = getFallbackReply(userLang, visitorLangRaw);
          console.log("Email stripped, reply too short \u2014 using fallback:", visitorLangRaw || userLang);
          break;
        }
        console.log("Email stripped from reply (non-quote scenario)");
        result.content = emailFix.text;
      }
      const validation = validateReply(message, result.content, userLang);
      if (validation.valid) break;
      lastFailureReason = validation.reason;
      retryCount++;
      const maxRetry = /^language_mismatch/.test(validation.reason) ? 1 : MAX_RETRY_COUNT;
      if (retryCount > maxRetry) {
        console.warn("Quality check failed after all retries:", validation.reason);
        break;
      }
      console.log("Quality check failed (attempt " + retryCount + "):", validation.reason);
      currentMessage = buildRetryMessage(message, validation.reason, userLang, retryCount, visitorLangRaw);
      currentConvId = void 0;
    }
    const outputStream = createSseStream(result.content, result.conversationId);
    if (kv && result && result.content) {
      const needExtract = shouldExtractInfo(message, result.content, customerProfile);
      if (needExtract) {
        console.log("Triggering profile extraction for:", userId);
        const extractionPromise = asyncExtractAndSave(
          kv,
          userId,
          message,
          result.content,
          customerProfile,
          userLang,
          pat,
          botId
        );
        if (context2.waitUntil) {
          context2.waitUntil(extractionPromise);
        }
      } else {
        const now = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        customerProfile.last_contact = now;
        if (!customerProfile.first_contact) {
          customerProfile.first_contact = now;
        }
        customerProfile.language = userLang;
        if (message) customerProfile.last_message = message.slice(0, 100);
        const touchPromise = saveCustomerProfile(kv, userId, customerProfile);
        if (context2.waitUntil) {
          context2.waitUntil(touchPromise);
        }
      }
    }
    return new Response(outputStream, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
        ...corsHeaders(origin)
      }
    });
  } catch (err) {
    if (err.name === "AbortError") {
      return jsonResponse(499, { code: 499, msg: "Client closed request" }, origin);
    }
    console.error("Chat API error:", err);
    return jsonResponse(502, { code: 502, msg: "Upstream service error", detail: err.message }, origin);
  }
}
__name(onRequestPost3, "onRequestPost");
async function onRequestOptions(context2) {
  const { request } = context2;
  const origin = request.headers.get("origin") || "";
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}
__name(onRequestOptions, "onRequestOptions");

// api/chat-lead.js
var CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400"
};
var KV_PREFIX = "fb:";
var TTL_SECONDS = 90 * 24 * 60 * 60;
var MAX_LEN = {
  email: 200,
  description: 2e3,
  bot_message: 1500,
  user_message: 1e3,
  conversation_id: 120,
  user_id: 120,
  page: 300
};
var TYPE_LABEL = {
  up: "\u{1F44D} \u6709\u5E2E\u52A9",
  down: "\u{1F44E} \u70B9\u8E29\uFF08\u4E0D\u6EE1\u610F\uFF09",
  human: "\u{1F91D} \u8F6C\u4EBA\u5DE5"
};
function clip(str, max) {
  if (!str || typeof str !== "string") return "";
  const s = str.trim();
  return s.length > max ? s.slice(0, max) + "\u2026" : s;
}
__name(clip, "clip");
async function notifyWecom(webhook, record, typeLabel) {
  const visitor = record.visitor_info || {};
  const lang = visitor.language || "";
  const page = clip(visitor.current_page, MAX_LEN.page);
  const lines = [
    `\u{1F514} **\u5BA2\u670D\u7EBF\u7D22 \xB7 ${typeLabel}**`,
    `> \u65F6\u95F4\uFF1A${record.iso}`,
    `> \u8BED\u8A00\uFF1A${lang}${page ? `\uFF5C\u9875\u9762\uFF1A${page}` : ""}`
  ];
  if (record.user_message) lines.push(`
**\u8BBF\u5BA2\u8BF4**\uFF1A
${clip(record.user_message, 400)}`);
  if (record.bot_message) lines.push(`
**\u673A\u5668\u4EBA\u7B54**\uFF1A
${clip(record.bot_message, 500)}`);
  if (record.email) lines.push(`
**\u8054\u7CFB\u65B9\u5F0F**\uFF1A${record.email}`);
  if (record.description) lines.push(`
**\u7559\u8A00/\u9700\u6C42**\uFF1A
${clip(record.description, 800)}`);
  lines.push(`
\u4F1A\u8BDD ID\uFF1A${record.conversation_id || "-"}\uFF08\u636E\u6B64\u5728\u4F01\u4E1A\u5FAE\u4FE1\u5185\u8DDF\u8FDB\u56DE\u8BBF\uFF09`);
  const payload = {
    msgtype: "markdown",
    markdown: { content: lines.join("\n") }
  };
  try {
    const resp = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!resp.ok) {
      console.warn("chat-lead wecom notify failed:", resp.status, await resp.text().catch(() => ""));
    }
  } catch (e) {
    console.warn("chat-lead wecom notify error:", e.message);
  }
}
__name(notifyWecom, "notifyWecom");
async function onRequestOptions2() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
__name(onRequestOptions2, "onRequestOptions");
async function onRequestPost4(context2) {
  const { request, env: env2 } = context2;
  const headers = { "Content-Type": "application/json; charset=utf-8", ...CORS_HEADERS };
  let payload = {};
  try {
    payload = await request.json();
  } catch (e) {
    console.warn("chat-lead bad json:", e.message);
  }
  const type = payload.type === "up" ? "up" : payload.type === "down" ? "down" : "human";
  const now = Date.now();
  const record = {
    type,
    user_id: clip(payload.user_id, MAX_LEN.user_id) || "unknown",
    conversation_id: clip(payload.conversation_id, MAX_LEN.conversation_id),
    ts: now,
    iso: new Date(now).toISOString(),
    email: clip(payload.email, MAX_LEN.email),
    description: clip(payload.description, MAX_LEN.description),
    bot_message: clip(payload.bot_message, MAX_LEN.bot_message),
    user_message: clip(payload.user_message, MAX_LEN.user_message),
    visitor_info: payload.visitor_info && typeof payload.visitor_info === "object" ? payload.visitor_info : null
  };
  const kv = env2.CUSTOMER_MEMORY || null;
  const kvKey = KV_PREFIX + record.user_id + ":" + now;
  if (kv) {
    try {
      await kv.put(kvKey, JSON.stringify(record), { expirationTtl: TTL_SECONDS });
    } catch (e) {
      console.warn("chat-lead kv write failed:", e.message);
    }
  } else {
    console.warn("chat-lead: CUSTOMER_MEMORY KV not bound, record not persisted");
  }
  if (type !== "up") {
    const webhook = (env2.FEEDBACK_WEBHOOK_URL || "").trim();
    if (webhook) {
      await notifyWecom(webhook, record, TYPE_LABEL[type] || type);
    } else {
      console.log("[chat-lead] FEEDBACK_WEBHOOK_URL not configured; type=" + type + " user=" + record.user_id);
    }
  }
  return new Response(JSON.stringify({ ok: true, id: kvKey }), { status: 200, headers });
}
__name(onRequestPost4, "onRequestPost");

// api/quote.js
async function onRequestPost5({ request, env: env2 }) {
  try {
    const formData = await request.formData();
    const fields = {
      name: (formData.get("name") || "").toString().trim(),
      company: (formData.get("company") || "").toString().trim(),
      email: (formData.get("email") || "").toString().trim(),
      country_code: (formData.get("country_code") || "").toString().trim(),
      phone: (formData.get("phone") || "").toString().trim(),
      partName: (formData.get("partName") || "").toString().trim(),
      material: (formData.get("material") || "").toString().trim(),
      material_detail: (formData.get("material_detail") || "").toString().trim(),
      quantity: (formData.get("quantity") || "").toString().trim(),
      tolerance: (formData.get("tolerance") || "").toString().trim(),
      notes: (formData.get("notes") || "").toString().trim()
    };
    if (!fields.name || !fields.email) {
      return Response.json({ ok: false, error: "Missing name or email" }, { status: 400 });
    }
    const drawings = formData.getAll("drawings").filter((f) => f && f.size > 0);
    const MAX_FILE = 25 * 1024 * 1024;
    const MAX_TOTAL = 40 * 1024 * 1024;
    const MAX_FILES = 10;
    if (drawings.length > MAX_FILES) {
      return Response.json({ ok: false, error: "Too many files (max 10)" }, { status: 400 });
    }
    const ALLOWED = ["step", "stp", "iges", "igs", "stl", "pdf", "dxf", "dwg"];
    const attachments = [];
    const stored = [];
    let total = 0;
    for (const file of drawings) {
      if (file.size > MAX_FILE) {
        return Response.json({ ok: false, error: `File "${file.name}" exceeds 25MB` }, { status: 400 });
      }
      const ext = (file.name.split(".").pop() || "").toLowerCase();
      if (!ALLOWED.includes(ext)) {
        return Response.json({ ok: false, error: `Unsupported file type: .${ext}` }, { status: 400 });
      }
      total += file.size;
      if (total > MAX_TOTAL) {
        return Response.json({ ok: false, error: "Total attachment size exceeds 40MB" }, { status: 400 });
      }
      const key = `quotes/${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
      try {
        if (env2.QUOTE_DRAWINGS) {
          await env2.QUOTE_DRAWINGS.put(key, file, {
            httpMetadata: { contentType: file.type || "application/octet-stream" }
          });
          stored.push(key);
        }
      } catch (e) {
      }
      try {
        const buf = await file.arrayBuffer();
        attachments.push({ filename: file.name, content: arrayBufferToBase64(buf) });
      } catch (e) {
      }
    }
    const fromEmail = env2.FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = env2.NOTIFY_EMAIL || "sales@eternalcnc.com";
    const subject = `[Quote Request] ${fields.partName || fields.name} \u2014 EternalCNC`;
    const text = [
      "New quote request from EternalCNC website",
      "",
      `Name: ${fields.name}`,
      `Company: ${fields.company || "N/A"}`,
      `Email: ${fields.email}`,
      `Phone: ${fields.country_code ? fields.country_code + " " : ""}${fields.phone || "N/A"}`,
      "",
      `Part / Drawing No.: ${fields.partName || "N/A"}`,
      `Material: ${fields.material === "per-drawing" ? "As per drawing" : fields.material_detail || fields.material || "N/A"}`,
      `Quantity: ${fields.quantity || "N/A"}`,
      `Tolerance: ${fields.tolerance || "N/A"}`,
      "",
      "Notes:",
      fields.notes || "None",
      "",
      `Drawings stored in R2: ${stored.length} file(s); attached to this email: ${attachments.length} file(s)`
    ].join("\n");
    const resendBody = {
      from: fromEmail,
      to: [toEmail],
      subject,
      text
    };
    if (attachments.length) resendBody.attachments = attachments;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env2.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resendBody)
    });
    if (!res.ok) {
      const errText = await res.text();
      return Response.json({ ok: false, error: "Email send failed: " + errText }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { ok: false, error: String(err && err.message || err) },
      { status: 500 }
    );
  }
}
__name(onRequestPost5, "onRequestPost");
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunk = 32768;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}
__name(arrayBufferToBase64, "arrayBufferToBase64");

// chat-token.js
var ALLOWED_ORIGINS4 = [
  "https://www.eternalcnc.com",
  "https://eternalcnc.com",
  // 本地测试用（上线后可删除）
  "http://localhost:4321",
  "http://localhost:4325",
  "http://localhost:8099",
  "http://localhost:3000",
  "http://localhost:8788"
];
var rateMap = /* @__PURE__ */ new Map();
var RATE_WINDOW_MS = 5 * 60 * 1e3;
var RATE_MAX = 20;
async function onRequest(context2) {
  const { request, env: env2 } = context2;
  const url = new URL(request.url);
  if (request.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  const origin = request.headers.get("Origin") || "";
  const referer = request.headers.get("Referer") || "";
  const refererOrigin = referer ? new URL(referer).origin : "";
  const allowed = ALLOWED_ORIGINS4.includes(origin) || ALLOWED_ORIGINS4.includes(refererOrigin);
  if (!allowed) {
    return new Response("Forbidden", { status: 403 });
  }
  const userId = url.searchParams.get("user_id") || "";
  if (!/^visitor-[A-Za-z0-9_-]{8,64}$/.test(userId)) {
    return new Response("Invalid user_id", { status: 400 });
  }
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const now = Date.now();
  const rec = rateMap.get(ip) || { count: 0, ts: now };
  if (now - rec.ts > RATE_WINDOW_MS) {
    rec.count = 0;
    rec.ts = now;
  }
  rec.count += 1;
  rateMap.set(ip, rec);
  if (rec.count > RATE_MAX) {
    return new Response("Too Many Requests", { status: 429 });
  }
  const pat = env2.COZE_PAT;
  if (!pat) {
    return new Response("Token not configured", { status: 500 });
  }
  return new Response(JSON.stringify({ token: pat }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": origin || "*"
    }
  });
}
__name(onRequest, "onRequest");

// ../.wrangler/tmp/pages-LK26gB/functionsRoutes-0.6211140621314333.mjs
var routes = [
  {
    routePath: "/api/coze/chat",
    mountPath: "/api/coze",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/coze/conversation",
    mountPath: "/api/coze",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  },
  {
    routePath: "/api/chat",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions]
  },
  {
    routePath: "/api/chat",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost3]
  },
  {
    routePath: "/api/chat-lead",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions2]
  },
  {
    routePath: "/api/chat-lead",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost4]
  },
  {
    routePath: "/api/quote",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost5]
  },
  {
    routePath: "/chat-token",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [onRequest]
  }
];

// ../node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count3 = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count3--;
          if (count3 === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count3++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count3)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env2, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context2 = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env: env2,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context2);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env2["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error3) {
      if (isFailOpen) {
        const response = await env2["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error3;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
