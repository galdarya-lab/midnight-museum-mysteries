/* Explicit scene composition: the art is grounded in the supplied answer data. */
function securityScene(){return '<canvas id="security-canvas" width="1600" height="650" role="img" aria-label="A museum security hall. Inspect the doors, clock, desk, pictures, lamp, guard, bench, window and stairs."></canvas>';}
function drawScenes(){
 const canvas=document.querySelector('#security-canvas');if(canvas)drawSecurity(canvas.getContext('2d'));
 document.querySelectorAll('.suspect-mouse').forEach(c=>drawMouse(c.getContext('2d')));
}
function drawSecurity(c){
 const rect=(x,y,w,h,fill,stroke)=>{c.fillStyle=fill;c.fillRect(x,y,w,h);if(stroke){c.strokeStyle=stroke;c.lineWidth=5;c.strokeRect(x,y,w,h);}};
 const circle=(x,y,r,color)=>{c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fillStyle=color;c.fill();};
 const line=(x,y,x2,y2,color,width=5)=>{c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.strokeStyle=color;c.lineWidth=width;c.stroke();};
 const text=(s,x,y,size=24,color='#203347')=>{c.fillStyle=color;c.font=`${size}px Georgia`;c.textAlign='center';c.fillText(s,x,y);};
 rect(0,0,1600,650,'#efe4cc');rect(0,470,1600,180,'#c3ad8e');rect(0,0,1600,24,'#1d344c');rect(0,456,1600,15,'#7b6551');
 // Two separate doors, each with its own frame and handle.
 [65,1390].forEach(x=>{rect(x-9,140,144,330,'#b99150');rect(x,150,126,310,'#304a60');rect(x+13,169,100,118,'#47667a','#7590a0');rect(x+13,310,100,130,'#47667a','#7590a0');circle(x+105,305,7,'#edc975');});
 // Three framed paintings on the same wall.
 [290,475,660].forEach((x,i)=>{rect(x,130,135,115,'#b98f48');rect(x+9,139,117,97,'#e3eddb');circle(x+92,161,14,'#eec55c');c.fillStyle=['#709378','#657f9e','#967b9c'][i];c.beginPath();c.moveTo(x+9,236);c.lineTo(x+58,165);c.lineTo(x+126,236);c.fill();});
 // Closed, intact window with a visible latch.
 rect(1050,78,225,210,'#ac8555');rect(1061,89,203,188,'#344f70');circle(1225,124,19,'#f2dfa2');line(1163,90,1163,277,'#e2d0b0',8);line(1062,182,1263,182,'#e2d0b0',8);rect(1151,192,23,8,'#d0b366');
 // Clock above the desk.
 circle(905,143,78,'#ae8543');circle(905,143,66,'#fff3d4');for(let n=1;n<=12;n++){let a=n*Math.PI/6;text(n,905+Math.sin(a)*52,150-Math.cos(a)*52,18);}line(905,143,905,103,'#263e51',5);line(905,143,937,143,'#263e51',5);circle(905,143,5,'#263e51');
 // Yellow lamp on desk; two distinct gold keys.
 rect(800,369,245,30,'#79503b');rect(815,399,215,110,'#ac7c56');rect(838,421,75,44,'#c9986d','#79503b');rect(934,421,75,44,'#c9986d','#79503b');
 line(840,368,840,304,'#947040',8);rect(817,359,46,10,'#bd923d');c.fillStyle='#f3ca41';c.beginPath();c.moveTo(814,288);c.lineTo(866,288);c.lineTo(881,326);c.lineTo(799,326);c.closePath();c.fill();
 [931,989].forEach(x=>{c.strokeStyle='#e8bc4b';c.lineWidth=7;c.beginPath();c.arc(x,355,10,0,Math.PI*2);c.stroke();line(x+11,355,x+37,355,'#e8bc4b',6);line(x+28,355,x+28,365,'#e8bc4b',5);});
 // Bench and red ticket beneath it, not on the seat.
 rect(272,385,220,45,'#916046');rect(286,430,17,105,'#684b3a');rect(461,430,17,105,'#684b3a');rect(272,350,220,25,'#a17050');rect(347,496,70,34,'#ce4d4e','#f2d397');text('TICKET',382,519,14,'#fff5df');
 // Chair, with red bag next to it.
 rect(550,348,75,74,'#356078','#b08e58');rect(544,422,87,17,'#356078');rect(552,439,10,90,'#795a3d');rect(612,439,10,90,'#795a3d');
 rect(646,454,70,69,'#c74445','#8b3036');c.strokeStyle='#9d3038';c.lineWidth=9;c.beginPath();c.arc(681,452,21,Math.PI,0);c.stroke();rect(662,476,36,21,'#e17a65');
 // Friendly guard, visibly wearing a blue cap.
 circle(245,330,30,'#d6a57d');rect(213,362,65,95,'#344a6b');rect(219,457,22,77,'#25384e');rect(251,457,22,77,'#25384e');rect(204,297,79,19,'#2d82c2');rect(218,281,54,25,'#2d82c2');circle(245,293,6,'#f2ce74');circle(235,328,3,'#26394d');circle(255,328,3,'#26394d');line(238,344,252,344,'#9e654f',3);circle(247,386,7,'#d6b75c');
 // Stairs and a plant directly beside the lowest step.
 for(let i=0;i<5;i++)rect(1180+i*27,430-i*27,180-i*27,35,'#a39385','#716459');
 rect(1099,441,58,75,'#b27e58');line(1128,443,1128,344,'#517b53',8);[[1100,388],[1150,369],[1107,349],[1151,412]].forEach(([x,y])=>{c.fillStyle='#58845a';c.beginPath();c.ellipse(x,y,28,17,x<1128?.55:-.55,0,Math.PI*2);c.fill();});
}
function drawMouse(c){
 c.clearRect(0,0,400,400);c.fillStyle='#e8dfcd';c.fillRect(0,0,400,400);
 const ellipse=(x,y,rx,ry,fill)=>{c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=fill;c.fill();};
 c.strokeStyle='#9c9496';c.lineWidth=14;c.lineCap='round';c.beginPath();c.moveTo(240,319);c.bezierCurveTo(390,360,377,222,322,258);c.stroke();
 ellipse(195,271,75,91,'#8c9099');ellipse(195,288,48,65,'#c9c4be');ellipse(130,130,61,68,'#858b96');ellipse(260,130,61,68,'#858b96');ellipse(130,130,44,51,'#d3a3a5');ellipse(260,130,44,51,'#d3a3a5');ellipse(195,180,80,78,'#989da6');
 ellipse(165,180,17,24,'#fff7df');ellipse(224,180,17,24,'#fff7df');ellipse(169,184,10,15,'#253447');ellipse(220,184,10,15,'#253447');ellipse(195,209,15,11,'#d19a9b');
 c.strokeStyle='#5b4c4b';c.lineWidth=3;c.beginPath();c.arc(195,220,19,0,Math.PI);c.stroke();
 // Goggles sit above the eyes; no key or crown is shown during the investigation.
 c.strokeStyle='#9e7b43';c.lineWidth=10;for(const x of [165,225]){c.beginPath();c.ellipse(x,130,25,20,-.1,0,Math.PI*2);c.stroke();}c.beginPath();c.moveTo(189,130);c.lineTo(201,130);c.stroke();
 ellipse(151,355,35,14,'#777f8a');ellipse(239,355,35,14,'#777f8a');ellipse(128,275,19,34,'#a7a8ab');ellipse(264,275,19,34,'#a7a8ab');
}
