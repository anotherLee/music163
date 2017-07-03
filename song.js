$(function(){

  var {search} = location;
  console.log('search: ' + search);
  var queryId = search.split('=')[1];
  console.log('queryId: ' + queryId);
  var requestPath
  if(queryId.indexOf('a') >=0){
    requestPath = './albumsong.json';
  }else{
    if(queryId >= 100){
      requestPath = './hotsongs.json';
    }else{
      requestPath = './songs.json';
    }
  }
  console.log(queryId)
  console.log(typeof queryId)
  $.get(requestPath).then(function(response){
    let item = response.filter(function(i){
      if(queryId === i.id){
        return i
      }
    })
    let url = item[0].url;
    let coverImage = item[0].cover;
    let name = item[0].name;
    let lyric = item[0].lyric;

    initCover(coverImage);
    initName(name);
    initLyric(lyric);
    initAudio(url);


    },function(){
    alert('请求失败！')
  })




  function initCover(coverImage){
    var  cover = document.querySelector('.cover');
    cover.src = coverImage
  }

  function initName(name){
    var songName = document.querySelector('.song-description > h2');
    songName.innerText = name
  }

  function initAudio(url){
    var audio = document.createElement('audio');
    audio.src = url;
    audio.oncanplay = function(){
      audio.play()
      $('.dis-container').addClass('playing')
    };
    audio.onended = function(){
      $('.dis-container').removeClass('playing')
    };

    $('.icon-pause').on('click',function(){
      audio.pause();
      $('.dis-container').removeClass('playing')
    });
    $('.icon-play').on('click',function(){
      audio.play();
      $('.dis-container').addClass('playing')
    });


    let timer = setInterval(function(){
      let $allLines = $('.lines > p');

      function transformTime(i){
        let timeArray = $allLines.eq(i).attr('data-time').split(':');
        let compareTime = Number(timeArray[0]) * 60 + Number(timeArray[1]);
        return compareTime
      }

      for(let i=0; i<$allLines.length; i++){
        if(audio.currentTime < transformTime($allLines.length - 1)){
          if(transformTime(i) < audio.currentTime && transformTime(i+1) > audio.currentTime){
            let distance = $allLines.eq(i).offset().top - $('.lines').offset().top - $('.lines').height()/($allLines.length)
            if(distance > 0){
              $('.lines').css('transform',`translateY(${-distance}px)`)
            }
            $allLines.eq(i).css('color','white').siblings().css('color',`rgb(162, 163, 165)`)

          }

        }else{
          $allLines.eq($allLines.length - 1).css('color','white').siblings().css('color',`rgb(162, 163, 165)`)
          clearInterval(timer)

        }

      }
    },300)

  }

  function initLyric(lyric){
    let array = lyric.split('\n');
    let regex = /^\[(.+)\](.*)$/;
    array = array.map(function(string){
      let matches = string.match(regex);
      if(matches){
        return {time:matches[1],words:matches[2]}
      }
    });

    let $lines = $('.lines');
    array.map(function(object){
      if(!object){
        return
      }
      let $p = $('<p>');
      $p.attr('data-time',object.time).text(object.words);
      $p.appendTo($lines)
    })

  }







});