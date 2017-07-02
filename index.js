$(function(){
  $.get('./songs.json').then(function(response){
    // console.log(response)
    // console.log(typeof response)
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
          if(index <=2 ){ $('.rank').addClass('active') };
          $li.attr('data-download','yes');
        })

      },function(){
        alert('失败了！')
      });

    }

  })




  function search(word){
    return new Promise(function(resolve,reject){
      var database = [
        {"id":1,"name":"长安忆"},
        {"id":2, "name":"Rage Your Dream"},
        {"id":3, "name":"Drowning"},
        {"id":4, "name":"心愿"},
        {"id":5, "name":"传奇"},
        {"id":6, "name":"你曾是少年"},
        {"id":7, "name":"喜欢你"},
        {"id":8, "name":"流年"},
        {"id":9, "name":"相逢是首歌"},
        {"id":10, "name":"爱情转移"},
        {"id":100, "name":"believe"},
        {"id":200, "name":"成都"},
        {"id":300, "name":"七月上"},
        {"id":400, "name":"恋人心"},
        {"id":500, "name":"追光者"},
        {"id":600, "name":"童话镇"},
        {"id":700, "name":"岁月神偷"},
        {"id":800, "name":"Faded"},
        {"id":900, "name":"春风十里"},
        {"id":1000, "name":"历历万乡"}

      ];
      let result = database.filter(function(i){
        return i.name.indexOf(word) >= 0
      });
      if(result.length !== 0){
        setTimeout(function(){
          resolve(result)
        }, ~~Math.random()*1000)
      }else{
        setTimeout(function(){
          reject(result)
        },~~Math.random()*1000)
      }


    })

  }


  let clock = undefined;

  $('.input').on('input',function(e){
    let $input = $(e.currentTarget);
    let value = $input.val().trim();
    if(value === ''){return}

    if(clock){
      clearTimeout(clock)
    }
    clock = setTimeout(function(){
      search(value).then(function(result){
        console.log(result)
        $('.resultList a').text('')
        // let searchResults = result.map((i)=>{return i.name})   //符合条件的搜索结果不只是一个,一会再优化
        result.forEach((item,index)=>{
          $('.resultList a').eq(index).text(item.name).attr('href','main.html?id=' + item.id);
        })
      },function(){
        console.log('没有结果')
        $('.resultList a').text('')
        $('.resultList a').eq(0).text('没有结果');
      })

    },500)
  })


  let $input = $('.input');
  let $inputWrap = $('.inputWrap');
  let $reslutList = $('.resultList');
  let $searchCue = $('.searchCue');

  $input.on('input', function(){
    let value = $input.val().trim();
    $inputWrap.addClass('inputChange');
    $searchCue.text(`搜索：\"${value}\"`)
    $reslutList.addClass('inputChanged')

    if ($input.val() === '') {
      $inputWrap.removeClass('inputChange')
      $reslutList.removeClass('inputChanged')

    }
  });

  $('.iconClose').on('click',function(){
    $input.val('');
    $inputWrap.removeClass('inputChange');
    $reslutList.removeClass('inputChanged')
  })



})


