var n_col = 11;
var n_row = 11;
var bomb = 15;
var game = new Array();
var mine = new Array();
var flag = new Array();
var unopen = 0;
var firstclick = true;
var dd;
var width;
var height;
var flaggg=false;
var sec=0;



var setValue=function() {
    firstclick = true;
    document.getElementById("game").setAttribute("style","pointer-events: all;");
    var view = document.getElementById("view");
    while (view.hasChildNodes()) {
    view.removeChild(view.childNodes[0]);
    }
    var row = document.getElementById("rows").value;
    var col = document.getElementById("cols").value;
    var bombs = document.getElementById("bomb").value;
    n_row = parseInt(row)+1;
    n_col = parseInt(col)+1;
    bomb = parseInt(bombs);
    unopen = ((n_row-1)*(n_col-1))-bomb;
    width = (((n_row-1)*40)+(n_row*1)+n_row)+"px";
    height = (((n_col-1)*40)+(n_col*1)+n_col)+"px";
    view.style.width = width;
    view.style.height = height;
    sec=0;
    clearInterval(dd);
    assignArray();
    timing();
};
setValue();
function timing(){
    var time = document.getElementById("timer");
    dd=setInterval(function(){
        sec++;
        time.innerHTML=sec;
        // if (flaggg)
        //     clearInterval(dd);
    },1000);
}


function assignArray() {

    for(i=0; i<n_row+1 ; i++)
    {
        mine[i]=[];
        game[i]=[];
        flag[i]=[];
        for(j=0; j<n_col+1; j++)
        {
            mine[i][j]=false;
            game[i][j]=0;
            flag[i][j]=false;
        }
    }
    tableCreate();

}


//----- Function To Create layout ------
function tableCreate(){
   var body = document.getElementById("view");
   for (var i = 1; i < n_row; i++) {
        for (var j=1; j < n_col; j++) {
            var div = document.createElement("DIV");
            div.setAttribute("class","feild");
            div.setAttribute("id","sq-"+i+"-"+j);
            div.setAttribute("onclick","on_click("+i+","+j+")");
            div.setAttribute("oncontextmenu","left_menu("+i+","+j+")");
            div.setAttribute("contextmenu",null);
            body.appendChild(div);
        }
    }
}

//----- MOUSE RIGHT CLICK FUNCTION ------
function on_click(x, y) {
    if (firstclick) {
        placeBomb(x, y);
        placeNumber();
        firstclick=false;
        changeBoard(x, y);
        if (bomb==0)
        {
            unopen--;
        }
    }
    else
     {
        changeBoard(x, y);
     }
     flag[x][y]=true;
     gameWon();   
}


//------ Reveal Board -------
function changeBoard(x, y) {
    var ids = "sq-"+x+"-"+y;
    var id = document.getElementById(ids);
    if(!flag[x][y]) {
        id.setAttribute("class","feild done");
        unopen--;
        if (mine[x][y]==true) {
            gameOver();
        }
        else {

            if(id.innerHTML.length==0) {
                if (game[x][y]!=0) {
                    var text = document.createTextNode(game[x][y]);
                    id.appendChild(text);
                }
                else {
                    distance(x,y);
                }
            }
        }
    }
}


//------ MOUSE LEFT CLICK FUNCTION --------
function left_menu(x, y) {
    var ids = "sq-"+x+"-"+y;
    var id = document.getElementById(ids);
    if(!flag[x][y])
    {
      id.setAttribute("class","feild flag");  
      flag[x][y]=true;
    }
    else
    {
        if(id.innerHTML.length==0)
        {
            id.setAttribute("class","feild");  
            flag[x][y]=false;
        }
    }
}

//------- UNWANTED --------
function distance(x, y) {
    if ((x>0 && x<n_row) && (y>0 && y<n_col)) {
        var ids = "sq-"+x+"-"+y;
        var id = document.getElementById(ids);
         if (!flag[x][y]) {
            id.setAttribute("class","feild done");
            
            if(id.innerHTML.length==0) {
                flag[x][y]=true;
                if (game[x][y]==0) {
                    if (!mine[x][y]) {
                        var text = document.createTextNode(" ");    
                        id.appendChild(text);
                        unopen--;
                    }
                    distance(x-1,y-1);
                    distance(x-1,y);
                    distance(x-1,y+1);
                    distance(x,y-1);
                    distance(x,y+1);
                    distance(x+1,y-1);
                    distance(x+1,y);
                    distance(x+1,y+1);

                    
                }
                else {
                    var text = document.createTextNode(game[x][y]);    
                    id.appendChild(text);
                    unopen--;
                }
            }
        }
    }
}

//----- GENERATE RANDOM NUMBER -------
function generateRandom(min,max) {
    var rad=Math.floor((Math.random()*max)+min);
    return rad;
}

//------ BOMB PLANTING ------
function placeBomb(a, b){
    while(bomb>0) {
        var x = generateRandom(1,n_row-1);
        var y = generateRandom(1,n_col-1);
        if(x!=a || y!=b)
        if(!mine[x][y]) {
            mine[x][y]=true;
            bomb--;
        }
    }
}

//------ NUMBER PLANTING ------
function placeNumber() {
    for(var i=1;i<n_row;i++){
        for(var j=1;j<n_col;j++){

            if (!mine[i][j]) {
                    //---- 1 ------
                    if(mine[i-1][j-1])
                        game[i][j]=game[i][j]+1;
                    
                    //---- 2 ------
                    if (mine[i-1][j])
                        game[i][j]=game[i][j]+1;

                    //---- 3 ------
                    if (mine[i-1][j+1])
                        game[i][j]=game[i][j]+1;

                    //---- 4 ------
                    if (mine[i][j-1])
                        game[i][j]=game[i][j]+1;

                    //---- 6 ------
                    if (mine[i][j+1])
                        game[i][j]=game[i][j]+1;

                    //---- 7 ------
                    if(mine[i+1][j-1])
                        game[i][j]=game[i][j]+1;
                    
                    //---- 8 ------
                    if (mine[i+1][j])
                        game[i][j]=game[i][j]+1;

                    //---- 9 ------
                    if (mine[i+1][j+1])
                        game[i][j]=game[i][j]+1;
            }

        }
    }
}


//------ DISPLAY -------
function display() {
    for(var i=1;i<n_row;i++){
        for(var j=1;j<n_col;j++){
            var ids = "sq-"+i+"-"+j;
            var id = document.getElementById(ids);
            id.setAttribute("class","feild done");
            if(mine[i][j]==true)
            {
                id.setAttribute("class","feild done mine");
            }
            else
            {
               if(id.innerHTML.length==0) {
                    if (game[i][j]!=0) {
                        var text = document.createTextNode(game[i][j]);
                         id.appendChild(text);
                    }
                }
            }
        }
    }
}

//------ GAME OVER ------
function gameOver() {
     clearInterval(dd);
       

     var time = document.getElementById("timer").innerHTML;
     display();
     alert("GAME OVER \n Your Time: "+time+" sec");
      flaggg=true;
     document.getElementById("game").setAttribute("style","pointer-events: none;");
        
}

//------ GAME WON ------
function gameWon() {
    if(unopen<0){
        clearInterval(dd);
        var time = document.getElementById("timer").innerHTML;
        alert("Congratulations!! You Won the Game \n Your Time: "+time+" sec");
         flaggg=true;
        document.getElementById("game").setAttribute("style","pointer-events: none;");
      }
  }
