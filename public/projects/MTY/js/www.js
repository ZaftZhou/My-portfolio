$(window).load(function () {
    // 文物旋转

    // 拆解按钮


    // 帮助手册
    $('.ww-help, .ww_help').click(function(){
        $('.helpManual').css('display','block')
    })
    $('.closeBtn').click(function(){
        $('.helpManual').css('display','none')
    })
    // 解析按钮


    // 获取文物解读的声音
    var wwMusic = document.getElementById("wwMusic");
    $('.ww-vioce').click(function(){
        if(wwMusic.paused){
            wwMusic.play()
            $(this).removeClass("ww-voiceCl")
        }else{
            wwMusic.pause()
            $(this).addClass("ww-voiceCl")
        }
    });

    $('.ww_vioce').click(function(){
        if(wwMusic.paused){
            wwMusic.play()
            // $(this).removeClass("ww-voiceCl")
        }else{
            wwMusic.pause()
            // $(this).addClass("ww-voiceCl")
        }
    })

    // 电脑版分享
    $('.ww-share').click(function(){
        $('.ww-shareList').fadeIn("slow")
        $('.ww-shareList').css('display','flex')
    }) 
    $('.ww-shareCl').click(function(){
        $('.ww-shareList').hide()
    })
    // 手机版分享
    $('.ww-share1').click(function(){
        $('.phoneShare').css('display','block')
    }) 
    $('.phoneShare').click(function(){
        $(this).css('display','none')
    })

    // 背景音乐大小
    var bgMusic = document.getElementById("bgMusic")
    bgMusic.volume = 0.09
})