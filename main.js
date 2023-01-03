(function(){
  var snake=document.querySelector('.wrap>.room>.snake');
  var controls=document.querySelector('.wrap>.control').children;
  
  var love=document.querySelector('.wrap>.room>.love');
  var loveTop=0;
  var loveLeft=0;
  var snakeArr=[snake];
  loveMove();
  function loveMove(){//随机移动心形的位置
    loveTop=Math.floor(Math.random()*22)*5;
    love.style.top=loveTop+'vw';
    loveLeft=Math.floor(Math.random()*19)*5;
    love.style.left=loveLeft+'vw';
  }
  
  function inspect(top,left){//判断方格头是否碰到身体
    let err=false;
    snakeArr.forEach((item,index)=>{
      if(item.style.left==left+'vw' && item.style.top==top+'vw'){
        err=true;
      }
    });
    return err;
  }
 for(let i=0;i<controls.length;i++){//给方向键添加按钮事件
     controls[i].addEventListener('touchstart',function(){
     switch(i){
       case 0:if(direction!='bottom'|| snakeArr.length==1) direction='top';break;
       case 1:if(direction!='left' || snakeArr.length==1) direction='right';break;
       case 2:if(direction!='top' || snakeArr.length==1) direction='bottom';break;
       case 3:if(direction!='right' || snakeArr.length==1) direction='left';break;
     }
   });
 }

  var direction='right';
  var carry='left';
  var topCount=0;
  var leftCount=0;
  var count=0;
  var timer=setInterval(function(){
    switch(direction){
      case 'left':leftCount--;/*carry='left'*/;break;
      case 'right':leftCount++;/*carry='left'*/;break;
      case 'bottom':topCount++;/*carry='top'*/;break;
      case 'top':topCount--;/*carry='top'*/;break;
    }
    
    //失败情况处理
    if(leftCount>19 ||leftCount<0|| topCount>22||topCount<0 || inspect(5*topCount,5*leftCount)){
      
      alert('得分:'+snakeArr.length);
      direction='right';
      leftCount=0;
      topCount=0;
      snakeArr[0].style.top='0vw';
      snakeArr[0].style.left='0vw';
      for(let i=1;i<snakeArr.length;i++){
        snakeArr[i].parentNode.removeChild(snakeArr[i]);//删除所有界面元素除第一个以外
      }
      snakeArr.splice(1);//删除除第一个元素以外所有数组元素
    }
    //count=carry=='left'?leftCount:topCount;
   
    //snake.style[carry]=5*count+'vw';
    if(loveLeft==leftCount*5 && loveTop==topCount*5){//吃到红心后添加一个方格
      const snakeBody=snakeArr[0].cloneNode(false);
      //snakeBody.style.top=loveTop;
      //snakeBody.style.left=loveLeft;
      snakeArr[0].parentNode.appendChild(snakeBody);
      snakeArr.push(snakeBody);
      loveMove();
    }
    snakeArr.unshift(snakeArr.pop());//将最后面的snake移动到第一位
     snakeArr[0].style.top=5*topCount+'vw';//将最新的位置赋值给第一个方格
    snakeArr[0].style.left=5*leftCount+'vw';
  },300);
  
  
  
})();

