chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "generateSignature") {
      chrome.storage.sync.get(["name", "signatures"], function(data) { 
        var userName = data.name || ""; 
        var customSignatures = data.signatures || []; 
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: generateSignature,
            args: [userName, customSignatures, request.useCustom] 
          });
        });
      });
    }
  });
  
  function generateSignature(userName, customSignatures, useCustom) {
    var signatures = [
      "You'll never take me alive",
      "Screaming into the void! But you are here. Odd",
      "My work is done here. Yours has barely begun. Have fun",
      "Well, this has been fun",
      "Slowly dying here",
      "Well anyway",
      "Become Ungovernable",
      "I did not receive a birthday gift from you",
      "I regret all of this",
      "You have to break a few eggs to make an omelette. You’re a good egg",
      "Struggling",
      "Hoping we deflect that asteroid",
      "Gambling with your future",
      "I deserve better",
      "Hope is a placebo",
      "Over my dead body",
      "You'll regret this",
      "I have a random generator deleting my contacts. Goodbye",
      "You peaked",
      "Better than you",
      "Please hesitate to reach out to me",
      "Feel 'free' to reach out to 'me'",
      "The government is listening",
      "Your fault",
      "It will be as the prophesies have foretold",
      "Tepidly",
      "You and what army?",
      "Formerly 'best'",
      "We're so back",
      "It's so over",
      "If you have any questions or concerns, please feel free to keep them to yourself",
      "There are so many witty people. Try to be one of them",
      "Disregards",
      "You’re welcome for my time",
      "Yours in eternal vengeance",
      "I'm just here so I don't get fined",
      "Indubitably"
    ];
  
    var oneLiner;
    if (useCustom && customSignatures.length > 0) {
      oneLiner = customSignatures[Math.floor(Math.random() * customSignatures.length)];
    } else {
      oneLiner = signatures[Math.floor(Math.random() * signatures.length)];
    }
  
    var emailBody = document.querySelector("div[aria-label='Message Body']");
    emailBody.innerHTML += "<br>" + "\n\n" + oneLiner + "," + "<br>" + userName + "<br>";
  }
  