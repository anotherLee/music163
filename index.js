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
    if(index === 1){
      $.get('./hotsongs.json').then(function(response){
        response.forEach(function(i,index){
          let $item = $(`
            <li>
              <span class="rank">${i.rank}</span>
              <div class="songInformation">
                <h3>
                  <a href="main.html?id=" + ${i.id} class="songName">
                    ${i.name}
                  </a>
                </h3>
                <p>演唱者1-${i.name}</p>
                <a href="main.html?id=${i.id}" ></a>
              </div>
            </li>
          `)
          $item.appendTo($('.hotSongs > .songList'));
          if(index <=2 ){ $('.rank').addClass('active') } ;
          $li.attr('data-download','yes');
        })

      },function(){
        alert('失败了！')
      })
    };



    // if(index === 2){
    //   $.get('./page3.json').then(function(response){
    //     $li.text(response.content).attr('data-download','yes');
    //   },function(){
    //     alert('失败了！')
    //   })
    // }
  });

  let $input = $('.input');
  let $inputWrap = $('.inputWrap');
  $input.on('input', function(){
    $inputWrap.addClass('inputChange');
    if ($input.val() === '') {
      $inputWrap.removeClass('inputChange')
    }
  });

  $('.iconClose').on('click',function(){
    $input.val('');
    $inputWrap.removeClass('inputChange');
  })



})


