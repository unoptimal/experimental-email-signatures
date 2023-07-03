chrome.storage.sync.get(["name", "signatures"], function(data) {
    var savedName = document.getElementById("savedName");
    var savedSignatures = document.getElementById("savedSignatures");
    if (data.name) {
      savedName.textContent = "Saved name: " + data.name;
    } else {
      savedName.textContent = "No name saved.";
    }
    if (data.signatures) {
      savedSignatures.textContent = "Saved signatures: " + data.signatures.join(";");
    } else {
      savedSignatures.textContent = "No signatures saved.";
    }
  });
  
  document.getElementById("generateSignature").addEventListener("click", function() {
    var useCustomSignatures = document.getElementById("useCustomSignatures").checked;
    chrome.runtime.sendMessage({action: "generateSignature", useCustom: useCustomSignatures});
  });
  
  document.getElementById("saveName").addEventListener("click", function() {
    var userName = document.getElementById("userName").value;
    chrome.storage.sync.set({name: userName}, function() {
      var savedName = document.getElementById("savedName");
      savedName.textContent = "Saved name: " + userName;
    });
  });
  
  document.getElementById("saveSignatures").addEventListener("click", function() {
    var signatures = document.getElementById("customSignatures").value.split(";");
    chrome.storage.sync.set({signatures: signatures}, function() {
      var savedSignatures = document.getElementById("savedSignatures");
      savedSignatures.textContent = "Saved signatures: " + signatures.join(",");
    });
  });
  