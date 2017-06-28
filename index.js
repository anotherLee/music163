$(function(){
  $.get('./songs.json').then(function(response){
    console.log(response)
    console.log(typeof response)
    //在github上response可能是字符串
    let items = response;
    items.forEach((i)=>{
      let $li = $(`<li><a href="./main.html?id=${i.id}" class="songName"><h3>${i.name}</h3></a><p>歌手${i.id}+专辑${i.id}</p><a href="./main.html?id=${i.id}" class="playIcon"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-play"></use></svg></a></li>`);

      $('#latestMusicList').append($li)
    })
    $('.loading').remove()




  },function(){
    alert('请求失败！')
  })
})


