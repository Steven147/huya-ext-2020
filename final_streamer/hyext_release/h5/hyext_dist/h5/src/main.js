var ws = new WebSocket("ws://106.52.117.231:9090/ws?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdG9yIjoiREVWIiwicm9sZSI6IlAiLCJwcm9maWxlSWQiOiIxMDAwMCIsImV4dElkIjoiZXh0SWQiLCJyb29tSWQiOiIyMjc1MTU2NCIsInVzZXJJZCI6IjEwMDAwIiwiaWF0IjoxNTk1NDY4NzIzLCJleHAiOjE1OTgwNjA3MjMsImFwcElkIjoiNGU3ZDdmNDJjYWQ2Mzc1OSJ9.Pt3Nj5NH4OKZGqlhPeKhzoOAVZ-Crj5H1dGjwckokhI");

ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send( JSON.stringify({"protocol": 111, "payload": "{}"}));
};

ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
};      