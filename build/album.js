$(function(){
  let queryString = location.search
  console.log(queryString)
  let queryId = Number(queryString.split('=')[1][1])


  $.get('./albums.json').then(function(response){
    let information = response[queryId-1][0];
    let songs = response[queryId-1][1];
    console.log(songs)
    let {id,title,author,avataUrl,coverUrl,firstLabel,secondLabel,thirdLabel,introduce} = information
    $('.cover').attr('src',coverUrl);
    $('.layer').css('backgroundImage',`url(${coverUrl})`);
    $('.title').text(title);
    $('.avatar').attr('src',avataUrl);
    $('.authorName').text(author);
    $('.firstLabel').text(firstLabel);
    $('.secondLabel').text(secondLabel);
    $('.thirdLabel').text(thirdLabel);
    $('.textIntroduce').text(introduce);


    $('.songList').children().remove()
    songs.forEach((item)=>{
      let $li = $(`
              <li>
                <span class="rank">${item.rank}</span>
                <div class="songInformation">
                  <h3>
                    <a href="main.html?id=${item.id}"  class="songName">
                      ${item.name}
                    </a>
                  </h3>
                  <p>${item.singer}-${item.name}</p>
                  <a href="main.html?id=${item.id}"></a>
                </div>
              </li>
      `)
      $('.songList').append($li)
    })




  },function(){
    alert('请求失败！')
  })


})