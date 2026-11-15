var $=function(i){return document.getElementById(i)};
var score=0,player="Ajan";
function addScore(n){score+=n;$("score").textContent=score}
function setRank(r){$("rank").textContent=r}
function step(n){["s1","s2","s3"].forEach(function(id,i){$(id).className="step"+(i+1<n?" done":i+1===n?" on":"")})}
function show(id){["start","m1","m2","m3","end"].forEach(function(x){$(x).classList.toggle("hide",x!==id)})}

$("go").onclick=function(){player=$("name").value.trim()||"Ajan";show("m1");step(1)};

/* GÖREV 1 */
var times=["Anında","1 saniye","12 dakika","6 saat","3 ay","100 yıl"];
var labels=["-","Çok Zayıf","Zayıf","Orta","İyi","Çok Güçlü"];
var cols=["#ff4d6d","#ff4d6d","#ff8a4d","#ffd166","#9be564","#00ff9d"];
$("pw").addEventListener("input",function(){
  var v=this.value;
  var t={len:v.length>=8,up:/[A-ZÇĞİÖŞÜ]/.test(v),lo:/[a-zçğıöşü]/.test(v),num:/[0-9]/.test(v),sym:/[^A-Za-z0-9ÇĞİÖŞÜçğıöşü\s]/.test(v)};
  var n=0;
  document.querySelectorAll("#chk li").forEach(function(li){var ok=t[li.dataset.r];li.classList.toggle("ok",ok);if(ok)n++});
  if(!v)n=0;
  $("pbar").style.width=(n*20)+"%";$("pbar").style.background=cols[n];
  $("plabel").textContent=labels[n];$("crack").textContent=times[n];
  $("done1").disabled=n<5;
});
$("show").onchange=function(){$("pw").type=this.checked?"text":"password"};
$("done1").onclick=function(){addScore(100);show("m2");step(2);loadMail()};

/* GÖREV 2 */
var mails=[
 {from:'destek@garanti-bankasi-guvenlik.com',subj:'ACİL: Hesabınız askıya alınıcak!!',
  body:'Sayın müşterimiz, hesabınızda şüpheli işlem tespit edildi. Hesabınız 24 saat içinde kapatılıcaktır. Bilgilerinizi güncellemek için hemen tıklayın: ',
  link:'http://garanti-giris.xyz/dogrula',trap:true,
  why:'Doğru! Banka adını taklit eden alan adı (.com ile uzun isim), acele ettiren dil, "askıya alınıcak" gibi yazım hataları ve .xyz uzantılı şüpheli bağlantı bunun bir oltalama (phishing) saldırısı olduğunu gösteriyor.',
  hint:'İpucu: Gönderici adresine ve bağlantının uzantısına bak. Bankalar bu şekilde acele ettirmez!'},
 {from:'duyuru@ataturklisesi.meb.k12.tr',subj:'Veli Toplantısı Duyurusu',
  body:'Sevgili velilerimiz, dönem sonu veli toplantımız 20 Kasım Perşembe günü saat 18:00\'de okulumuzda yapılacaktır. Ayrıntılar için okul web sitemizi ziyaret edebilirsiniz: ',
  link:'https://ataturklisesi.meb.k12.tr/duyurular',trap:false,
  why:'Doğru! Gönderici adresi resmi okul alan adını (meb.k12.tr) taşıyor, dil düzgün, bağlantı okulun kendi sitesine gidiyor ve senden şifre ya da para istenmiyor.',
  hint:'İpucu: Gönderici alan adı ve bağlantı resmi bir okul adresine benziyor mu? Yazım hatası var mı?'},
 {from:'odul@insta-kazan-hediye.net',subj:'TEBRİKLER! iPhone kazandınız 🎁',
  body:'Seçilen şanslı kullanıcımızsınız! Ödülünüzü almak için kargo ücreti olarak 50 TL ödeyin ve kart bilgilerinizi grin: ',
  link:'http://bit.ly/hediye-al-123',trap:true,
  why:'Doğru! Bilmediğin bir yerden gelen "ödül" maili, kart bilgisi isteme, "grin" gibi yazım hataları ve kısaltılmış (bit.ly) şüpheli bağlantı tipik bir dolandırıcılık işaretidir.',
  hint:'İpucu: Hiç katılmadığın bir çekilişi nasıl kazanırsın? Üstelik senden para ve kart bilgisi isteniyor!'}
];
var mi=0,locked=false;
function loadMail(){
  var m=mails[mi];locked=false;
  $("mn").textContent=mi+1;
  $("mail").innerHTML='<div><b>Kimden:</b> <span style="color:var(--y)">'+m.from+'</span></div><div><b>Konu:</b> '+m.subj+'</div><div class="body">'+m.body+'<a title="Bağlantı bu oyunda devre dışı">'+m.link+'</a></div>';
  $("mfb").innerHTML="";$("mnext").classList.add("hide");$("mbtns").classList.remove("hide");
}
function guess(isTrap){
  if(locked)return;
  var m=mails[mi];
  if(isTrap===m.trap){
    locked=true;addScore(100);
    $("mfb").innerHTML='<div class="info">✔ '+m.why+' <b>+100 puan!</b></div>';
    $("mbtns").classList.add("hide");
    $("mnext").classList.remove("hide");
    $("mnext").textContent=mi<2?"Sonraki ▶":"Görevi Bitir ▶";
  }else{
    $("mfb").innerHTML='<div class="hint">✘ Yanlış! '+m.hint+' Tekrar dene.</div>';
  }
}
$("safe").onclick=function(){guess(false)};
$("trap").onclick=function(){guess(true)};
$("mnext").onclick=function(){
  if(mi<2){mi++;loadMail()}else{setRank("Uzman");show("m3");step(3);initCaesar()}
};

/* GÖREV 3 */
var A="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function initCaesar(){
  $("cipher").textContent="TJCFS BKBO";
  var t1="<tr><td>Gerçek</td>",t2="<tr><td>Şifreli</td>";
  for(var i=0;i<26;i++){t1+="<td>"+A[i]+"</td>";t2+="<td>"+A[(i+1)%26]+"</td>"}
  $("ruler").innerHTML="<table>"+t1+"</tr>"+t2+"</tr></table>";
}
function norm(s){return s.toLocaleUpperCase("tr-TR").replace(/İ/g,"I").replace(/\s+/g," ").trim()}
function check3(){
  if(norm($("ans").value)==="SIBER AJAN"){
    addScore(150);setRank("Ajan");finish();
  }else{
    $("m3fb").innerHTML='<div class="hint">✘ Henüz değil. İpucu: Şifreli harfin alfabede bir önceki harfini bul. T → S, J → ?</div>';
  }
}
$("chk3").onclick=check3;
$("ans").addEventListener("keydown",function(e){if(e.key==="Enter")check3()});

/* FİNAL */
function finish(){
  step(4);
  $("cname").textContent=player;$("cscore").textContent=score;
  $("cdate").textContent=new Date().toLocaleDateString("tr-TR",{day:"numeric",month:"long",year:"numeric"});
  show("end");confetti();
}
function confetti(){
  var cv=$("cv"),x=cv.getContext("2d");
  cv.width=innerWidth;cv.height=innerHeight;
  var cs=["#00ff9d","#22d3ee","#ffd166","#ff4d6d","#fff"],p=[];
  for(var i=0;i<220;i++)p.push({x:Math.random()*cv.width,y:-Math.random()*cv.height,w:6+Math.random()*6,h:8+Math.random()*8,vy:2+Math.random()*4,vx:-1.5+Math.random()*3,a:Math.random()*6,va:Math.random()*.3,c:cs[i%5]});
  var f=0;
  (function loop(){
    x.clearRect(0,0,cv.width,cv.height);
    p.forEach(function(q){q.y+=q.vy;q.x+=q.vx;q.a+=q.va;
      x.save();x.translate(q.x,q.y);x.rotate(q.a);x.fillStyle=q.c;x.fillRect(-q.w/2,-q.h/2,q.w,q.h);x.restore();
      if(q.y>cv.height&&f<300){q.y=-10;q.x=Math.random()*cv.width}});
    f++;
    if(f<420)requestAnimationFrame(loop);else x.clearRect(0,0,cv.width,cv.height);
  })();
}
