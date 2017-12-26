exports.responseIssue = (c) => {
  c.write('{"error" : "FormatIssue","format":{"fn" :"<function_name>","auth" :"<token>","payload" :"<json_payload>"}}')
  c.end();
}

exports.notFound = (c,m) => {
  console.log(m)
  c.write(JSON.stringify({'error' : 'FunctionNotFound','message':m }))
  c.end();
}


exports.sendReply = (c,d) => {
  c.write(JSON.stringify(d));
  c.end()
}