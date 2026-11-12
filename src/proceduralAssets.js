/* Supplementary functional props absent from the delivered V2 pack.
 * Crisp original canvas drawings, with no V1 artwork or external resources. */
export function createProceduralAssets(){
 const names='ticket_red hat_blue torch_yellow backpack_green key_silver book_brown glove_white umbrella_purple camera_black ball_orange'.split(' ');
 const assets={};for(const name of names){const canvas=document.createElement('canvas');canvas.width=512;canvas.height=512;const c=canvas.getContext('2d');
 const shape=(fill,fn)=>{c.fillStyle=fill;c.beginPath();fn();c.fill();};
 const rr=(x,y,w,h,r,fill)=>{shape(fill,()=>c.roundRect(x,y,w,h,r));};
 const circle=(x,y,r,fill)=>shape(fill,()=>c.arc(x,y,r,0,Math.PI*2));
 const line=(x,y,x2,y2,color,width=14)=>{c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.stroke();};
 const g=c.createLinearGradient(100,80,380,420);const colours={ticket_red:['#fa7a65','#ae253e'],hat_blue:['#55b9ef','#225395'],torch_yellow:['#fff196','#d39e19'],backpack_green:['#8fc985','#2c765d'],key_silver:['#f2f7ff','#8999af'],book_brown:['#c48b5b','#684837'],glove_white:['#ffffff','#d2dce7'],umbrella_purple:['#c593e5','#784893'],camera_black:['#525c70','#121a29'],ball_orange:['#ffd391','#e57a32']};g.addColorStop(0,colours[name][0]);g.addColorStop(1,colours[name][1]);
 c.shadowColor='#17293b44';c.shadowBlur=16;c.shadowOffsetY=12;
 switch(name){
 case'ticket_red':rr(70,158,372,196,30,g);circle(70,256,22,'#fff0d0');circle(442,256,22,'#fff0d0');c.setLineDash([10,12]);line(340,175,340,335,'#ffe0bb',5);c.setLineDash([]);line(114,209,286,209,'#ffd69e',8);line(114,251,258,251,'#ffd69e',8);line(114,293,220,293,'#ffd69e',8);break;
 case'hat_blue':shape(g,()=>{c.moveTo(112,298);c.bezierCurveTo(90,100,360,77,370,298);c.closePath();});shape('#2e77b5',()=>{c.ellipse(269,310,181,52,-.05,0,Math.PI*2);});line(242,137,250,285,'#98d4f5',7);circle(244,128,12,'#27629c');break;
 case'torch_yellow':c.save();c.translate(256,256);c.rotate(-.5);rr(-48,-10,96,209,22,g);shape('#e5b83a',()=>{c.moveTo(-48,8);c.lineTo(-90,-107);c.lineTo(90,-107);c.lineTo(48,8);});rr(-97,-127,194,43,15,'#b48a31');rr(-78,-128,156,25,12,'#fff5cf');rr(-18,37,36,53,10,'#8c7339');c.restore();break;
 case'backpack_green':rr(147,75,214,350,67,'#265f50');rr(175,61,160,46,20,'#a2cc91');rr(131,118,250,307,70,g);rr(159,271,193,123,30,'#407b57');line(174,289,337,289,'#c1d6a0',7);line(161,194,169,236,'#d6dfb1',7);break;
 case'key_silver':c.save();c.translate(255,257);c.rotate(-.6);c.strokeStyle=g;c.lineWidth=38;c.beginPath();c.arc(0,-90,65,0,Math.PI*2);c.stroke();rr(-20,-29,40,229,10,g);rr(0,121,87,30,6,g);rr(0,175,68,29,6,g);c.restore();break;
 case'book_brown':rr(105,96,302,330,22,'#53392e');rr(119,92,265,320,15,g);rr(137,105,14,292,4,'#e9c693');rr(165,130,185,235,12,'#9b6a46');c.strokeStyle='#e5c78e';c.lineWidth=7;c.strokeRect(171,137,172,220);line(186,395,366,395,'#f6e5bb',10);break;
 case'glove_white':rr(175,190,200,218,50,g);for(let i=0;i<4;i++)rr(177+i*46,85+i*12,42,190,21,g);c.save();c.translate(183,260);c.rotate(-.65);rr(-64,-31,69,149,25,g);c.restore();rr(177,375,199,53,13,'#d9e2ed');break;
 case'umbrella_purple':line(256,178,256,381,'#946c3f',16);c.strokeStyle='#946c3f';c.lineWidth=16;c.beginPath();c.arc(226,381,30,0,Math.PI);c.stroke();shape(g,()=>{c.moveTo(65,242);c.bezierCurveTo(106,49,406,49,447,242);c.quadraticCurveTo(393,203,351,242);c.quadraticCurveTo(302,203,256,242);c.quadraticCurveTo(204,203,159,242);c.quadraticCurveTo(108,203,65,242);});line(256,96,256,231,'#dcbeec',5);break;
 case'camera_black':rr(66,165,380,240,39,g);rr(109,130,114,62,15,'#384357');circle(272,283,94,'#111e2d');circle(272,283,71,'#98bac9');circle(272,283,54,'#1f465b');circle(254,262,17,'#bedde3');rr(360,184,57,30,8,'#ffeac1');rr(118,158,46,14,5,'#939faf');break;
 case'ball_orange':circle(256,256,168,g);c.save();c.beginPath();c.arc(256,256,166,0,Math.PI*2);c.clip();line(90,256,422,256,'#a95c31',9);line(256,90,256,422,'#a95c31',9);c.strokeStyle='#a95c31';c.lineWidth=9;c.beginPath();c.ellipse(256,256,76,180,.5,0,Math.PI*2);c.stroke();c.restore();break;
 }
 assets['props/'+name]=canvas.toDataURL('image/png');
 }return assets;
}
