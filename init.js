  var actualCode = `
  console.clear();
  getRewardHistory();

  switch(location.pathname){
    case "/goodiegrab/play":
      setTimeout(function () {
        pickupPrize();
      }, 3000);
    break;
    case "/goodiegrab/winprize":
      var rewardStr = document.getElementsByClassName("reward-description")[0].textContent.trim();
      var cookieData = [];
      console.log("Drawed: "+ rewardStr);
      if(!document.getElementsByTagName("h5")[0].textContent.trim().includes("Your prize is now available as a reward in your account.")){
        setRewardHistory(rewardStr);
      }
      if(rewardStr.includes("1-for-1 Venti Sized Drinks")){
        document.getElementById("btnLogin").click();
      }else{
        setTimeout(function () {
         window.history.back();
       }, 3000);
      }
    break;
  }

  function setRewardHistory(rewardStr){
    try{
      var cookie = getCookie('rewardHistory');
      cookieData = JSON.parse(cookie);
    }catch(Exception){
      console.log(Exception);
    }

    var seen = false;
    for(var i in cookieData){
      if(cookieData[i][0] == rewardStr){
        seen = true;
        cookieData[i][1] += 1;
        setCookie('rewardHistory', JSON.stringify(cookieData), 365);
      }
    }

    if(!seen){
      var data = [rewardStr, 1];
      cookieData.push(data);
      console.log(cookieData);
      setCookie('rewardHistory', JSON.stringify(cookieData), 365);
    }
  }

  function getRewardHistory(){
    try{
      var cookie = getCookie('rewardHistory');
      cookieData = JSON.parse(cookie);
    }catch(Exception){
      console.log(Exception);
    }
    var totalTries = 0;
    for(var i in cookieData){
      //console.log(cookieData[i]);
      totalTries += cookieData[i][1];
    }
    console.log("Total: " + totalTries);
    for(var i in cookieData){
      console.log(Math.round((cookieData[i][1]/totalTries)*100) + "% || " + cookieData[i][0]);
    }
    console.log(cookieData);

  }

  function setCookie(cname, cvalue, exdays) {

      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
      try {
          var name = cname + "=";
          var decodedCookie = decodeURIComponent(document.cookie);
          var ca = decodedCookie.split(';');
          for (var i = 0; i < ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') {
                  c = c.substring(1);
              }
              if (c.indexOf(name) === 0) {
                  return c.substring(name.length, c.length);
              }
          }
          return "";
      } catch (exception) {
          console.log(exception);
      }
  }`;

  var script = document.createElement('script');
  script.textContent = actualCode;
  (document.head || document.documentElement).appendChild(script);
  script.remove();
  // });

  // }
