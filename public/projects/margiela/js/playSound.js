function play_music() {
  if ($("#mc_play").hasClass("on")) {
    console.log("暂停2");
    $("#mc_play audio").get(0).pause();
    $("#mc_play").attr("class", "stop");
  } else {
    console.log("播放2");
    $("#mc_play audio").get(0).play();
    // audioPlay($("#mc_play audio").get(0));
    $("#mc_play").attr("class", "on");
  }
  //   $("#music_play_filter").hide();
  // event.stopPropagation(); //阻止冒泡
}
function just_play(id) {
  audioPlay($("#mc_play audio").get(0));
  $("#mc_play audio").get(0).play();
  $("#mc_play").attr("class", "on");
  //   if (typeof id != "undefined") {
  //     $("#music_play_filter").hide();
  //   }
  // event.stopPropagation(); //阻止冒泡
}
function is_weixn() {
  return;
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}
// var play_filter = document.getElementById("musicBtn");
// play_filter.addEventListener("click", function () {
//   just_play(1);
// });
// play_filter.addEventListener("touchstart", function () {
//   just_play(1);
// });
// play_filter.addEventListener("touchend", function () {
//   just_play(1);
// });
// play_filter.addEventListener("touchmove", function () {
//   just_play(1);
// });
// play_filter.addEventListener("mousedown", function () {
//   just_play(1);
// });
// play_filter.addEventListener("mouseup", function () {
//   just_play(1);
// });
// play_filter.addEventListener("mousemove", function () {
//   just_play(1);
// });
// window.onload = function () {
// if (!is_weixn()){
//     just_play();
// }
//   just_play();
//   play_bgm_music();
// };

//移动端自动播放音频
function audioPlay(ele) {
  // setTimeout(() => {
  ele.play();
  // }, 1000);
  if (window.WeixinJSBridge) {
    WeixinJSBridge.invoke(
      "getNetworkType",
      {},
      function (e) {
        ele.play();
      },
      false
    );
  } else {
    document.addEventListener(
      "WeixinJSBridgeReady",
      function () {
        WeixinJSBridge.invoke("getNetworkType", {}, function (e) {
          ele.play();
        });
      },
      false
    );
  }
}

// 打字
function play_bgm_music() {
  audioPlay($("#music").get(0));
}

function pause_bgm_music() {
  $("#music").get(0).pause();
}
