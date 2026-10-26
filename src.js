const $=id=>document.getElementById(id);
const canvas=$('canvas'),ctx=canvas.getContext('2d');
let photo=null,style='love',songUrl=null,busy=false;
const labels={love:'LOVE STORY',cinema:'CINEMATIC',mass:'MASS VIBE',birthday:'HAPPY BIRTHDAY'};
function paint(sec=0){
 const w=canvas.width,h=canvas.height;ctx.fillStyle='#100c17';ctx.fillRect(0,0,w,h);
 if(!photo){ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font='bold 40px system-ui';ctx.fillText('ನಿಮ್ಮ ಫೋಟೋ ಇಲ್ಲಿ',w/2,h/2);ctx.font='26px system-ui';ctx.fillText('Upload a photo',w/2,h/2+48);return;}
 const scale=Math.max(w/photo.width,h/photo.height)*(1+.10*Math.min(1,sec/30));
 const dw=photo.width*scale,dh=photo.height*scale;
 ctx.save();ctx.translate(w/2,h/2);const zoom=1+.012*Math.sin(sec*1.2);ctx.scale(zoom,zoom);ctx.drawImage(photo,-dw/2,-dh/2,dw,dh);ctx.restore();
 const grad=ctx.createLinearGradient(0,0,0,h);grad.addColorStop(0,'rgba(0,0,0,.06)');grad.addColorStop(1,style==='love'?'rgba(100,15,55,.72)':style==='mass'?'rgba(0,0,0,.82)':style==='birthday'?'rgba(75,35,0,.7)':'rgba(0,0,0,.65)');
 ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);
 ctx.textAlign='center';ctx.fillStyle='#fff';ctx.shadowColor='#000';ctx.shadowBlur=16;ctx.font='bold 48px system-ui';ctx.fillText(labels[style],w/2,h-185);ctx.shadowBlur=0;
 ctx.font='24px system-ui';ctx.fillStyle='rgba(255,255,255,.9)';ctx.fillText('UK AI VIDEO EDIT',w/2,h-125);
}
paint();
$('photo').addEventListener('change',e=>{const f=e.target.files?.[0];if(!f)return;const url=URL.createObjectURL(f),im=new Image();im.onload=()=>{photo=im;paint();URL.revokeObjectURL(url);$('status').textContent='ಫೋಟೋ ಸಿದ್ಧವಾಗಿದೆ. ಸ್ಟೈಲ್ ಆಯ್ಕೆ ಮಾಡಿ.'};im.onerror=()=>{$('status').textContent='ಫೋಟೋ ತೆರೆಯಲು ಆಗಲಿಲ್ಲ.'};im.src=url;});
document.querySelectorAll('[data-style]').forEach(b=>b.addEventListener('click',()=>{style=b.dataset.style;document.querySelectorAll('[data-style]').forEach(x=>x.classList.toggle('active',x===b));paint();}));
$('song').addEventListener('change',e=>{if(songUrl)URL.revokeObjectURL(songUrl);songUrl=e.target.files?.[0]?URL.createObjectURL(e.target.files[0]):null;$('status').textContent=songUrl?'ಹಾಡು ಆಯ್ಕೆಯಾಗಿದೆ. ವಿಡಿಯೋದಲ್ಲಿ ಸೇರಿಸಲು ಪ್ರಯತ್ನಿಸಲಾಗುತ್ತದೆ.':'';});
$('make').addEventListener('click',async()=>{
 if(busy)return;if(!photo){$('status').textContent='ಮೊದಲು ಫೋಟೋ ಆಯ್ಕೆ ಮಾಡಿ.';return;}
 if(!canvas.captureStream||!window.MediaRecorder){$('status').textContent='ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ವಿಡಿಯೋ ರಚನೆ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.';return;}
 busy=true;$('make').disabled=true;$('download').hidden=true;let stream,rec,ac,audio,raf;
 $('status').textContent='ವಿಡಿಯೋ ರಚಿಸಲಾಗುತ್ತಿದೆ. 30 ಸೆಕೆಂಡ್ ಕಾಯಿರಿ…';
 try{
  stream=canvas.captureStream(30);ac=null;audio=null;
  if(songUrl&&window.AudioContext){try{ac=new AudioContext();await ac.resume();audio=new Audio(songUrl);audio.loop=true;const src=ac.createMediaElementSource(audio),gain=ac.createGain(),dest=ac.createMediaStreamDestination();gain.gain.value=.8;src.connect(gain);gain.connect(dest);dest.stream.getAudioTracks().forEach(t=>stream.addTrack(t));await audio.play();}catch(e){$('status').textContent='ಹಾಡು ಸೇರಿಸಲಿಲ್ಲ; ವಿಡಿಯೋ ಮುಂದುವರಿಯುತ್ತಿದೆ.';}}
  const mime=['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'].find(x=>MediaRecorder.isTypeSupported(x));if(!mime)throw Error('WebM encoder ಲಭ್ಯವಿಲ್ಲ.');
  rec=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:7000000});const chunks=[];rec.ondataavailable=e=>{if(e.data?.size)chunks.push(e.data)};
  const done=new Promise((resolve,reject)=>{rec.onstop=resolve;rec.onerror=()=>reject(Error('ವಿಡಿಯೋ ರಚನೆ ವಿಫಲವಾಗಿದೆ'))});rec.start(500);
  const start=performance.now();await new Promise(resolve=>{function frame(now){const sec=(now-start)/1000;paint(sec);if(sec>=30){resolve();return;}raf=requestAnimationFrame(frame)}raf=requestAnimationFrame(frame)});
  paint(30);rec.stop();await done;const blob=new Blob(chunks,{type:mime});if(!blob.size)throw Error('ಖಾಲಿ ವಿಡಿಯೋ ಬಂದಿದೆ.');
  const a=$('download');a.href=URL.createObjectURL(blob);a.download='UK-AI-Video-30s.webm';a.hidden=false;$('status').textContent='ವಿಡಿಯೋ ಸಿದ್ಧವಾಗಿದೆ! ಡೌನ್‌ಲೋಡ್ ಬಟನ್ ಒತ್ತಿ.';
 }catch(e){$('status').textContent='ದೋಷ: '+(e.message||'ವಿಡಿಯೋ ರಚಿಸಲಾಗಲಿಲ್ಲ.');}
 finally{cancelAnimationFrame(raf);if(audio){audio.pause();audio=null}if(stream)stream.getTracks().forEach(t=>t.stop());if(ac)try{await ac.close()}catch(e){}busy=false;$('make').disabled=false;}
});