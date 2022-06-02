var p=Object.defineProperty;var u=(o,e,s)=>e in o?p(o,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):o[e]=s;var a=(o,e,s)=>(u(o,typeof e!="symbol"?e+"":e,s),s);import{P as h}from"./vendor.c2cc9365.js";const g=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const m of i.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&r(m)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerpolicy&&(i.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?i.credentials="include":t.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}};g();var y={type:h.WEBGL,parent:"game",backgroundColor:"#33A5E7",scale:{width:96*2,height:160*2,mode:h.Scale.FIT,autoCenter:h.Scale.CENTER_BOTH},physics:{default:"arcade",arcade:{gravity:{x:0,y:0}}},fps:10,antialias:!1};const k={path:"assets/img/makoto_ss.png",scale:1,frameW:64,frameH:64,frameStart:0,frameEnd:3,bodySize:{w:40,h:60}},b={path:"assets/img/taki_ss.png",scale:2,frameW:32,frameH:32,frameStart:0,frameEnd:3,bodySize:{w:20,h:30}},S={path:"assets/img/tanikou_kari.png",scale:2,frameW:28,frameH:32,frameStart:0,frameEnd:3,bodySize:{w:20,h:30}},x={path:"assets/img/makiko_ss.png",scale:2,frameW:32,frameH:32,frameStart:0,frameEnd:1,bodySize:{w:20,h:30}},w={path:"assets/img/ranshia_ss.png",scale:2,frameW:32,frameH:32,frameStart:0,frameEnd:1,bodySize:{w:20,h:30}},_={path:"assets/img/konataro_ss.png",scale:2,frameW:32,frameH:32,frameStart:0,frameEnd:1,bodySize:{w:20,h:30}},v={path:"assets/img/watari_ss.png",scale:2,frameW:32,frameH:32,frameStart:0,frameEnd:3,bodySize:{w:20,h:30}};var n={makoto:k,taki:b,tanikou:S,makiko:x,ranshia:w,konataro:_,watari:v};class C extends h.Physics.Arcade.Sprite{constructor(e,s,r,t){super(e,s,r,t);a(this,"charaTween");a(this,"isMove");a(this,"name");a(this,"move_anime");a(this,"idle_anime");return e.add.existing(this),e.physics.add.existing(this),this.isMove=!1,this.name=t,this.changeChara(t),this.setAnime(t,n[t].frameStart,n[t].frameEnd),this}move(e,s){this.charaTween&&(this.charaTween.stop(),this.charaTween.remove()),this.isMove=!0;let r=!1;const t={x:e,y:s};this.x<t.x&&(r=!0),this.flipX=r,this.charaTween=this.scene.tweens.add({targets:this,props:{x:{value:t.x,duration:Math.abs(t.x-this.x)*20},y:{value:t.y,duration:Math.abs(t.y-this.y)*20}},ease:"Sine.easeInOut",callbackScope:this,onComplete:()=>{this.anims.stop(),this.isMove=!1,this.setFrame(0)}})}changeChara(e){this.name=e,this.setTexture(e),this.setScale(n[e].scale),this.body.setSize(n[e].bodySize.w,n[e].bodySize.h),this.anims.remove("move"),this.setAnime(e,n[e].frameStart,n[e].frameEnd)}setAnime(e=this.name,s=0,r=3){this.move_anime=this.scene.anims.create({key:e+"_move",frames:this.anims.generateFrameNumbers(e,{start:s,end:r}),frameRate:10}),this.idle_anime=this.scene.anims.create({key:e+"_idle",frames:this.anims.generateFrameNumbers(e,{start:0,end:1}),frameRate:2,repeat:-1})}preUpdate(e,s){super.preUpdate(e,s),this.isMove?this.anims.play(this.name+"_move",!0):this.anims.play(this.name+"_idle",!0)}}class E extends h.Scene{constructor(){super("GameScene");a(this,"isAnime");a(this,"charaTween");a(this,"player");a(this,"charaName");this.isAnime=!1,this.charaName="taki"}preload(){this.load.image("sky","assets/img/sky.png"),this.load.image("ground","assets/img/ground.png");for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e)){const s=n[e];this.load.spritesheet(e,s.path,{frameWidth:s.frameW,frameHeight:s.frameH})}}create(){const s=this.scale.width/2,r=this.scale.height,t=r/2,i=this.add.image(s,t,"sky"),m=this.add.image(s,r-32,"ground");i.scale=2,m.scale=2,this.player=new C(this,32,100,this.charaName),this.player.setCollideWorldBounds(!0),this.input.on("pointerup",c=>{var l,d;(l=this.player)==null||l.changeChara(h.Utils.Array.GetRandom(Object.keys(n))),(d=this.player)==null||d.move(c.upX,c.upY)},this)}update(){}}class f extends h.GameObjects.Container{constructor(e,s,r,t){super(e,s,r);a(this,"seKey","");a(this,"text");a(this,"sprite");a(this,"frame");a(this,"fill",0);a(this,"stroke",16777215);const{color:i,text:m="",onClick:c}=t;this.scene=e,this.scene.add.existing(this),this.sprite=e.add.sprite(0,0,"btn",1),this.setSize(60,36).setInteractive(),this.sprite.setTint(i),this.sprite.setScale(2),this.frame=e.add.sprite(0,0,"btn_frame",1),this.frame.setScale(2),this.text=e.add.text(0,0,m,{fontSize:"12px",align:"center",color:"#ffffff",fontFamily:"misaki"}),this.text.setAlpha(.9),this.text.setOrigin(.5,.9),this.add([this.sprite,this.frame,this.text]),this.setAnime(),this.on("pointerup",l=>{c&&c(l),this.sprite.anims.play("btn",!0),this.frame.anims.play("btn_frame",!0)})}setSeKey(e){return this.seKey=e,this}setText(e){return this.text.setText(e),this}setAnime(){this.scene.anims.create({key:"btn",frames:this.sprite.anims.generateFrameNumbers("btn",{frames:[1,0,1]}),frameRate:15}),this.scene.anims.create({key:"btn_frame",frames:this.frame.anims.generateFrameNumbers("btn_frame",{frames:[1,0,1]}),frameRate:15})}}class W extends h.Scene{constructor(){super("UIScene");a(this,"score");this.score=0,h.Scene.call(this,{key:"UIScene",active:!0})}preload(){this.load.spritesheet("btn","assets/img/btn_gray2.png",{frameWidth:30,frameHeight:18}),this.load.spritesheet("btn_frame","assets/img/btn_gray_frame.png",{frameWidth:30,frameHeight:18})}create(){new f(this,32,300,{color:16711680,text:"\u3054\u306F\u3093",onClick:()=>{console.log(1)}}),new f(this,96,300,{color:16776960,text:"\u3046\u3093\u3069\u3046",onClick:()=>{console.log(2)}}),new f(this,160,300,{color:39423,text:"\u30C8\u30A4\u30EC",onClick:()=>{console.log(3)}})}}new h.Game(Object.assign(y,{scene:[E,W]}));
