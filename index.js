$(function(){
  $.get('./songs.json').then(function(response){
    console.log(response)
    console.log(typeof response)
    if(typeof response === 'string'){
      let $div = $('div');
      $div.text(response).appendTo($('#latestMusicList'))
    }
    //在github上response可能是字符串
    let items = response;
    items.forEach(function(i){
      // let $li = $(`<li><a href="./main.html?id=${i.id}" class="songName"><h3>${i.name}</h3></a><p>歌手${i.id}+专辑${i.id}</p><a href="./main.html?id=${i.id}" class="playIcon"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-play"></use></svg></a></li>`);
      let $li = $('<li><a href="./main.html?id=' + i.id + '" class="songName"><h3>' + i.name + '</h3></a><p>歌手' + i.id + '+专辑' + i.id + '</p><a href="./main.html?id=' + i.id +'" class="playIcon"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-play"></use></svg></a></li>');
      $('#latestMusicList').append($li)
    })
    $('.loading').remove()

  },function(){
    alert('请求失败！')
  });

  $('.siteNav').on('click','.tabItems > li',function(e){
    let $li = $(e.currentTarget);
    let index = $li.index();
    $li.addClass('active').siblings().removeClass('active');
    $('.tabContent > li').eq(index).addClass('active').siblings().removeClass('active');
    $li.trigger('tabChange',index)
  });

  $('.siteNav').on('tabChange',function(e,index){
    let $li = $('.tabContent > li').eq(index);
    if($li.attr('data-download') === 'yes'){
      return
    }
    // if(index === 1){
    //   $.get('./page2.json').then(function(response){
    //     $li.text(response.content).attr('data-download','yes');
    //   },function(){
    //     alert('失败了！')
    //   })
    // };
    // if(index === 2){
    //   $.get('./page3.json').then(function(response){
    //     $li.text(response.content).attr('data-download','yes');
    //   },function(){
    //     alert('失败了！')
    //   })
    // }
  })

})


