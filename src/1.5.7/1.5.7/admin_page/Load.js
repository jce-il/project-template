let Load = function() {
    let canvas;
    let count ;
    let stopAnimation;
    let place;
    
    let initModule = function() {
        this.canvas = document.getElementById("canvas");
        this.canvas.width = window.innerWidth - 100;
        this.canvas.height = window.innerHeight - 100;
        this.stopAnimation = false;
        count = 0;
        place = 0;
        loding();
    };
    let loding = function() {
        let context = this.canvas.getContext('2d');
        const r1 = 80 ; 
        const w = this.canvas.width;
        const h = this.canvas.height;
        const x = w/2 ; 
        const y = h/2 ;

        const ADD = Math.PI/12;

        

        context.lineWidth = 15;

        clearScreen();


        context.beginPath();
        context.fillStyle = 'white' ;
        context.arc(x, y, r1 , 0, 2 * Math.PI);
        context.fill();
        context.closePath();


        context.beginPath();
        context.strokeStyle = 'black' ;
        context.fillStyle = 'black' ;
        context.font = '20px Arial';
        context.fillText(count+"%",x-10,y);
        count++;
        context.closePath();


        context.beginPath();
        context.strokeStyle = 'black' ;
        context.arc(x, y, r1 , 0+place, 0.5 * Math.PI+place);
        context.stroke();
        context.closePath();


        context.beginPath();
        context.strokeStyle = 'black' ;
        context.arc(x, y, r1 , Math.PI+place, 1.5 * Math.PI+place);
        context.stroke();
        context.closePath();


        place = place + ADD;
        if (count == 101)
        {
        this.stopAnimation = true;
        clearScreen();
        context.beginPath();
        context.strokeStyle = 'black' ;
        context.fillStyle = 'black' ;
        context.font = '20px Arial';
        context.fillText("loding finish",x-20,y);
        context.closePath();
        }

        if(!this.stopAnimation)
          setTimeout(loding, 100);

        };



        let clearScreen = function() {
        let context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
        
    
    return {initModule};
}();