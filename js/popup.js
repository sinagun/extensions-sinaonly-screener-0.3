var popup={tabId:null,ready:function(){$(".capture-visible").on("click",()=>popup.sendMessage({data:"captureVisible"})),$(".capture-all").on("click",()=>popup.sendMessage({data:"captureAll"})),$(".capture-region").on("click",()=>chrome.tabs.sendMessage(popup.tabId,{data:"captureRegion"})),$(".edit-content").on("click",()=>{chrome.tabs.sendMessage(popup.tabId,{data:"editContent"}),window.close()}),$(".show-history").on("click",()=>popup.showHistory()),$("#working, #message").on("click",function(){$(this).fadeOut()}),popup.checkSupport(),popup.translate()},showHistory(){const a=chrome.extension.getURL("history/index.html");chrome.tabs.query({currentWindow:!0},b=>{let c=!1,d=null;b.forEach(b=>{b.url===a&&(c=!0,d=b.id)}),c?chrome.tabs.update(d,{highlighted:!0}):chrome.tabs.create({url:a})})},translate(){$("[tr]").each(function(){var a=$(this).attr("tr"),b=chrome.i18n.getMessage(a);b&&$(this).html(b)})},checkSupport:function(){chrome.tabs.query({active:!0,currentWindow:!0},function(a){const b=a[0];popup.tabId=b.id;var c=b.url;if((c.includes("chrome://")||c.includes("chrome-extension:")||c.includes("https://chrome.google.com"))&&popup.disableScrollSupport(),c.includes("file:")){var d=setTimeout(popup.disableScrollSupport,500);chrome.tabs.sendMessage(b.id,{type:"checkExist"},function(){chrome.runtime.lastError?$("#noall").html("Go to chrome://extensions, and check the box \"Allow access to file URLs\""):clearTimeout(d)})}})},disableScrollSupport:function(){$(".capture-all, .capture-visible, .capture-region, .edit-content").hide(),$("#noall").show()},exec:function(a){switch($("#working, #message").fadeOut(),a.type){case"working":$("#working").fadeIn();break;case"message":$("#message").fadeIn().find(".message-container").text(a.message);}},sendMessage:function(a){chrome.runtime.sendMessage(a,function(a){console.warn("popup_fail",a)})}};$(popup.ready);