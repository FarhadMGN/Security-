const ANGULAR_HTML_URL = "../dist/extention-prod/index.html";

function getPwdInputs() {
  let ary = [];
  let inputs = document.getElementsByTagName("input");
  for (let i=0; i<inputs.length; i++) {
    if (inputs[i].type.toLowerCase() === "password") {
      ary.push(inputs[i]);
    }
  }
  return ary;
}

inputTest = getPwdInputs();
a = true;

inputTest.forEach(password => {
  password.addEventListener('focus', (event) => {
    event.target.style.background = 'pink';
    setTimeout(() => {
      if (a) {
        window.open('chrome-extension://gabgegdejaonajibbkgklehnoghldeah/dist/extention-prod/index.html');
        a = false;
      }
    }, 1000);
    // chrome.tabs.create({
    //   url: chrome.runtime.getURL(ANGULAR_HTML_URL)
    // });
  });

  password.addEventListener('blur', (event) => {
    event.target.style.background = '';
  });
});


// password.addEventListener('focus', () => {
//   browser.tabs.create({
//     url: browser.runtime.getURL(ANGULAR_HTML_URL)
//   });
// });

// chrome.browserAction.onClicked.addListener(function () {
//   chrome.tabs.create({
//     url: chrome.runtime.getURL(ANGULAR_HTML_URL)
//   });
// });

// chrome.runtime.onMessage.addListener(function(message) {
//   if(message.type == "m1") {
//     console.log("First message: ", message.content);
//   }
//   if(message.type == "m2") {
//     console.log("Second message: ", message.content);
//   }
// })
//

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting === "hello") {
      sendResponse({farewell: sender});
      //clearInterval(ID);
    }
  }
);


function saySaid() {
  console.log('Said')
}

// chrome.runtime.onConnect.addListener(function(port) {
//   console.assert(port.name == "knockknock");
//   port.onMessage.addListener(function(msg) {
//     if (msg.joke == "Knock knock") {
//       port.postMessage({question: "Who's there?"});
//     }
//     else if (msg.answer == "Madame") {
//       port.postMessage({question: "Madame who?"});}
//     else if (msg.answer == "Madame... Bovary") {
//       port.postMessage({question: "I don't get it."});
//     }
//   });
// });

// const ID = setInterval(() => {
//   console.log('hey');
// }, 1000);


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.type == "openTab") {

    // chrome.tabs.create({"url": "http://www.google.com", "selected": true}, function (tab) {
    // });
    //chrome.tabs.executeScript(tab.id, {file: 'content.js'});
    //   chrome.tabs.executeScript({
    //     code: `console.log('location:', window.location.href);`
    //   });
    chrome.tabs.executeScript(null,{code:request.value});
    return true;
  }

});


chrome.storage.onChanged.addListener(() => {
  chrome.storage.local.get(['newPassword'], function(result) {
    console.log('Value currently is ' + result['newPassword']);
    inputTest.forEach(inp => {
      inp.value = result['newPassword'];
    })
    //inputTest[1].value = result['newPassword'];
  });
})
