/**
 * https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
 */
 const net = require("net");
 const { parse } = require("url");
 
 const DELIMITER = "\r\n";
 const COMMON_HEADERS = {
   "accept-encoding": "gzip, deflate, br",
   Connection: "keep-alive",
 };
 const EVENT_MAP = { load: "data" };
 
 class XMLHttpRequest {
   constructor() {
     this.socket = null;
     this.httpMsg = "";
     this.data = null;
     this.events = {};
   }
 
   open(method, url) {
     const { host, hostname, path, port } = parse(url);
     this.socket = net.createConnection(
       {
         host: hostname,
         port,
       },
       this.connectListener.bind(this)
     );
     let reqLine = `${method.toUpperCase()} ${path} HTTP/1.1${DELIMITER}`;
     const headers = { ...COMMON_HEADERS, ...{ host } };
     Object.keys(headers).forEach((key) => {
       reqLine += `${key}: ${headers[key]}${DELIMITER}`;
     });
     this.httpMsg = reqLine;
     this.initEvent();
   }
 
   send(body) {
     if (!this.socket) return;
     const { connecting } = this.socket;
     if (connecting) {
       this.data = body;
     } else {
       this.httpMsg += `${DELIMITER}${JSON.stringify(body)}`;
       this.socket.write(this.httpMsg);
     }
   }
 
   addEventListener(event, listener) {
     this.events[event] = listener;
   }
 
   initEvent() {
     Object.keys(this.events).forEach((key) => {
       const eventName = EVENT_MAP[key] || key;
       this.socket.on(eventName, this.events[key]);
     });
   }
 
   connectListener() {
     this.httpMsg += `${DELIMITER}${this.data ? JSON.stringify(this.data) : ""}`;
     console.log(this.httpMsg);
     this.socket.write(this.httpMsg);
   }
 }
 
 const xhr = new XMLHttpRequest();
 xhr.addEventListener("load", (buffer) => {
   console.log(buffer.toString());
 });
 xhr.open("GET", "http://127.0.0.1:8000/");
 xhr.send();
 