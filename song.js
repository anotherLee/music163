$(function(){
  $.get('./lyric.json').then(function(response){
    let lyric = response.lyric
    let array = lyric.split('\n')
    let regex = /^\[(.+)\](.*)$/
    array = array.map(function(string){
      let matches = string.match(regex)
      if(matches){
        return {time:matches[1],words:matches[2]}
      }
    })
    console.log(array)
    let $lines = $('.lines');
    array.map(function(object){
      if(!object){
        return
      }
      let $p = $('<p>');
      $p.attr('data-time',object.time).text(object.words)
      $p.appendTo($lines)

    })
  })

  var audio = document.createElement('audio');
  audio.src = 'http://os1d7c0lt.bkt.clouddn.com/rageyourdream.mp3'
  audio.oncanplay = function(){
    audio.play()
    $('.dis-container').addClass('playing')
  }
  audio.onended = function(){
    $('.dis-container').removeClass('playing')
  }

  $('.icon-pause').on('click',function(){
    audio.pause()
    $('.dis-container').removeClass('playing')
  })
  $('.icon-play').on('click',function(){
    audio.play()
    $('.dis-container').addClass('playing')
  })


})