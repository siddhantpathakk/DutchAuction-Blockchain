const a = {
  stack:
    'Error: cannot estimate gas; transaction may fail or may require manual gas limit [ See: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT ] (reason="Error: VM Exception while processing transaction: reverted with reason string \'Auction time has elapsed\'", method="estimateGas", transaction={"from":"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","to":"0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512","value":{"type":"BigNumber","hex":"0x016345785d8a0000"},"data":"0xa6f2ae3a","accessList":null}, error={"code":-32603,"message":"Internal JSON-RPC error.","data":{"code":-32603,"message":"Error: VM Exception while processing transaction: reverted with reason string \'Auction time has elapsed\'","data":{"message":"Error: VM Exception while processing transaction: reverted with reason string \'Auction time has elapsed\'","data":"0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001841756374696f6e2074696d652068617320656c61707365640000000000000000"}},"stack":"{\\n  \\"code\\": -32603,\\n  \\"message\\": \\"Internal JSON-RPC error.\\",\\n  \\"data\\": {\\n    \\"code\\": -32603,\\n    \\"message\\": \\"Error: VM Exception while processing transaction: reverted with reason string \'Auction time has elapsed\'\\",\\n    \\"data\\": {\\n      \\"message\\": \\"Error: VM Exception while processing transaction: reverted with reason string \'Auction time has elapsed\'\\",\\n      \\"data\\": \\"0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001841756374696f6e2074696d652068617320656c61707365640000000000000000\\"\\n    }\\n  },\\n  \\"stack\\": \\"Error: Internal JSON-RPC error.\\\\n    at i (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:10940)\\\\n    at s (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:13880)\\\\n    at Object.internal (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:14490)\\\\n    at c (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/background-0.js:7:44307)\\\\n    at chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/background-0.js:7:45309\\\\n    at async chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-4.js:19:44453\\"\\n}\\n  at i (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:10940)\\n  at s (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:13880)\\n  at Object.internal (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:14490)\\n  at c (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/background-0.js:7:44307)\\n  at chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/background-0.js:7:45309\\n  at async chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-4.js:19:44453"}, code=UNPREDICTABLE_GAS_LIMIT, version=providers/5.7.2)\n    at Logger.makeError (http://localhost:3000/static/js/bundle.js:7584:19)\n    at Logger.throwError (http://localhost:3000/static/js/bundle.js:7593:16)\n    at checkError (http://localhost:3000/static/js/bundle.js:11010:14)\n    at Web3Provider.<anonymous> (http://localhost:3000/static/js/bundle.js:11533:16)\n    at Generator.throw (<anonymous>)\n    at rejected (http://localhost:3000/static/js/bundle.js:10930:32)',
  message:
    'cannot estimate gas; transaction may fail or may require manual gas limit [ See: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT ] (reason="Error: VM Exception while processing transaction: reverted with reason string \'Auction time has elapsed\'", method="estimateGas", transaction={"from":"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","to":"0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512","value":{"type":"BigNumber","hex":"0x016345785d8a0000"},"data":"0xa6f2ae3a","accessList":null}, error={"code":-32603,"message":"Internal JSON-RPC error.","data":{"code":-32603,"message":"Error: VM Exception while processing transaction: reverted with reason string \'Auction time has elapsed\'","data":{"message":"Error: VM Exception while processing transaction: reverted with reason string \'Auction time has elapsed\'","data":"0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001841756374696f6e2074696d652068617320656c61707365640000000000000000"}},"stack":"{\\n  \\"code\\": -32603,\\n  \\"message\\": \\"Internal JSON-RPC error.\\",\\n  \\"data\\": {\\n    \\"code\\": -32603,\\n    \\"message\\": \\"Error: VM Exception while processing transaction: reverted with reason string \'Auction time has elapsed\'\\",\\n    \\"data\\": {\\n      \\"message\\": \\"Error: VM Exception while processing transaction: reverted with reason string \'Auction time has elapsed\'\\",\\n      \\"data\\": \\"0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001841756374696f6e2074696d652068617320656c61707365640000000000000000\\"\\n    }\\n  },\\n  \\"stack\\": \\"Error: Internal JSON-RPC error.\\\\n    at i (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:10940)\\\\n    at s (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:13880)\\\\n    at Object.internal (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:14490)\\\\n    at c (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/background-0.js:7:44307)\\\\n    at chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/background-0.js:7:45309\\\\n    at async chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-4.js:19:44453\\"\\n}\\n  at i (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:10940)\\n  at s (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:13880)\\n  at Object.internal (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:14490)\\n  at c (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/background-0.js:7:44307)\\n  at chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/background-0.js:7:45309\\n  at async chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-4.js:19:44453"}, code=UNPREDICTABLE_GAS_LIMIT, version=providers/5.7.2)',
  reason:
    "Error: VM Exception while processing transaction: reverted with reason string 'Auction time has elapsed'",
  code: "UNPREDICTABLE_GAS_LIMIT",
  method: "estimateGas",
  transaction: {},
  error: {
    stack:
      '{\n  "code": -32603,\n  "message": "Internal JSON-RPC error.",\n  "data": {\n    "code": -32603,\n    "message": "Error: VM Exception while processing transaction: reverted with reason string \'Auction time has elapsed\'",\n    "data": {\n      "message": "Error: VM Exception while processing transaction: reverted with reason string \'Auction time has elapsed\'",\n      "data": "0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001841756374696f6e2074696d652068617320656c61707365640000000000000000"\n    }\n  },\n  "stack": "Error: Internal JSON-RPC error.\\n    at i (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:10940)\\n    at s (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:13880)\\n    at Object.internal (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:14490)\\n    at c (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/background-0.js:7:44307)\\n    at chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/background-0.js:7:45309\\n    at async chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-4.js:19:44453"\n}\n  at i (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:10940)\n  at s (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:13880)\n  at Object.internal (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:14490)\n  at c (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/background-0.js:7:44307)\n  at chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/background-0.js:7:45309\n  at async chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-4.js:19:44453',
    message: "Internal JSON-RPC error.",
    code: -32603,
  },
};