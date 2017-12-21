exports.responseIssue = (c) => {
  c.write("{'error' : 'FormatIssue','format':'{'fn' :'<function_name>','auth' :'<token>','payload' :'<json_payload>'}'}")
  c.end();
}

exports.notFound = (c,m) => {
  c.write("{'error' : 'FunctionNotFound','message':"+m+"}")
  c.end();
}


exports.sendReply = (c,d) => {
  c.write(d);
  c.end()
}